import { createHash } from "node:crypto";
import { spawn } from "node:child_process";
import {
  access,
  mkdtemp,
  mkdir,
  readFile,
  readdir,
  rm,
  rmdir,
  stat,
  writeFile,
} from "node:fs/promises";
import { tmpdir } from "node:os";
import { dirname, join, relative, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";

const platformRoot = resolve(dirname(fileURLToPath(import.meta.url)), "../..");
const registryPath = join(platformRoot, "specialists", "registry.json");
const registry = JSON.parse(await readFile(registryPath, "utf8"));
const args = process.argv.slice(2);
const command = args[0] ?? "list";

function option(name) {
  const index = args.indexOf(name);
  return index >= 0 ? args[index + 1] : undefined;
}

function hasFlag(name) {
  return args.includes(name);
}

async function exists(path) {
  try {
    await access(path);
    return true;
  } catch {
    return false;
  }
}

async function readJson(path) {
  return JSON.parse(await readFile(path, "utf8"));
}

async function filesUnder(root) {
  const entries = await readdir(root, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const path = join(root, entry.name);
    if (entry.isDirectory()) files.push(...await filesUnder(path));
    else if (entry.isFile()) files.push(path);
  }
  return files;
}

function hash(content) {
  return createHash("sha256").update(content).digest("hex");
}

function assertInside(parent, child) {
  const rel = relative(parent, child);
  if (!rel || rel.startsWith(`..${sep}`) || rel === ".." || resolve(child) === resolve(parent)) {
    throw new Error(`Caminho fora do escopo permitido: ${child}`);
  }
}

async function resolveConfigDirectory(targetRoot) {
  const canonicalKiro = join(targetRoot, "kiro");
  if (resolve(targetRoot) === platformRoot && await exists(canonicalKiro)) return canonicalKiro;

  const dotKiro = join(targetRoot, ".kiro");
  await mkdir(dotKiro, { recursive: true });
  return dotKiro;
}

async function readInstallState(configDirectory) {
  const path = join(configDirectory, "specialists", "installed.json");
  if (!await exists(path)) return { schemaVersion: 1, packages: {} };
  return readJson(path);
}

async function writeInstallState(configDirectory, state) {
  const path = join(configDirectory, "specialists", "installed.json");
  await mkdir(dirname(path), { recursive: true });
  await writeFile(path, `${JSON.stringify(state, null, 2)}\n`, "utf8");
}

function packageDefinition(name) {
  const definition = registry.packages?.[name];
  if (!definition) throw new Error(`Especialista não registrado: ${name}`);
  return definition;
}

function runGit(args) {
  return new Promise((resolvePromise, rejectPromise) => {
    const child = spawn("git", args, {
      stdio: ["ignore", "pipe", "pipe"],
      windowsHide: true,
    });
    let stdout = "";
    let stderr = "";

    child.stdout.on("data", (chunk) => {
      stdout += chunk;
    });
    child.stderr.on("data", (chunk) => {
      stderr += chunk;
    });
    child.on("error", (error) => {
      rejectPromise(new Error(`Não foi possível executar git: ${error.message}`));
    });
    child.on("close", (code) => {
      if (code === 0) {
        resolvePromise(stdout.trim());
        return;
      }
      rejectPromise(new Error(stderr.trim() || `git encerrou com código ${code}.`));
    });
  });
}

async function sourceDirectory(name, definition) {
  const explicitSource = option("--source");
  if (explicitSource) {
    const path = resolve(process.cwd(), explicitSource);
    return { path, source: path, cleanup: async () => {} };
  }
  if (definition.source?.type === "local" && definition.source.path) {
    const path = resolve(platformRoot, definition.source.path);
    return { path, source: path, cleanup: async () => {} };
  }
  if (definition.source?.type === "github" && definition.source.repository) {
    const temporaryRoot = await mkdtemp(join(tmpdir(), "aisdlc-specialist-"));
    const path = join(temporaryRoot, name);
    const cloneArgs = ["clone", "--depth", "1"];
    if (definition.source.ref) cloneArgs.push("--branch", definition.source.ref);
    cloneArgs.push(definition.source.repository, path);

    try {
      await runGit(cloneArgs);
    } catch (error) {
      await rm(temporaryRoot, { recursive: true, force: true });
      throw new Error(`Falha ao obter '${name}' de ${definition.source.repository}: ${error.message}`);
    }

    const source = definition.source.ref
      ? `${definition.source.repository}#${definition.source.ref}`
      : definition.source.repository;
    return {
      path,
      source,
      cleanup: () => rm(temporaryRoot, { recursive: true, force: true }),
    };
  }
  throw new Error(`Fonte não configurada para '${name}'. Use --source <diretório>.`);
}

async function buildInstallPlan(sourceRoot, configDirectory, manifest) {
  const plan = [];
  for (const artifact of manifest.exports ?? []) {
    const source = resolve(sourceRoot, artifact.source);
    if (!await exists(source)) throw new Error(`Export ausente: ${artifact.source}`);
    for (const sourceFile of await filesUnder(source)) {
      const rel = relative(source, sourceFile);
      const parts = rel.split(/[\\/]/u);
      if (artifact.filePrefix && parts.length === 1) {
        parts[0] = `${artifact.filePrefix}${parts[0]}`;
      }
      const targetFile = resolve(configDirectory, artifact.target, ...parts);
      assertInside(configDirectory, targetFile);
      plan.push({ sourceFile, targetFile, relativeTarget: relative(configDirectory, targetFile) });
    }
  }
  return plan;
}

async function install(name) {
  const definition = packageDefinition(name);
  if (definition.status !== "available") {
    throw new Error(`Especialista '${name}' está com status '${definition.status}'.`);
  }

  const targetRoot = resolve(process.cwd(), option("--target") ?? platformRoot);
  const resolvedSource = await sourceDirectory(name, definition);
  const sourceRoot = resolvedSource.path;

  try {
    const manifestPath = join(sourceRoot, "specialist.json");
    if (!await exists(manifestPath)) throw new Error(`Manifesto ausente: ${manifestPath}`);

    const manifest = await readJson(manifestPath);
    if (manifest.name !== name) {
      throw new Error(`Manifesto '${manifest.name}' não corresponde ao pacote '${name}'.`);
    }

    const configDirectory = await resolveConfigDirectory(targetRoot);
    const state = await readInstallState(configDirectory);
    const previous = state.packages[name];
    const force = hasFlag("--force");
    const plan = await buildInstallPlan(sourceRoot, configDirectory, manifest);
    const previousFiles = new Map((previous?.files ?? []).map((file) => [file.path, file]));

    for (const item of plan) {
      if (!await exists(item.targetFile)) continue;
      const owner = previousFiles.get(item.relativeTarget);
      if (!owner && !force) {
        throw new Error(`Colisão com arquivo não gerenciado: ${item.relativeTarget}`);
      }
      if (owner && !force) {
        const currentHash = hash(await readFile(item.targetFile));
        if (currentHash !== owner.sha256) {
          throw new Error(`Arquivo instalado foi alterado localmente: ${item.relativeTarget}. Use --force para substituir.`);
        }
      }
    }

    const installedFiles = [];
    for (const item of plan) {
      const content = await readFile(item.sourceFile);
      await mkdir(dirname(item.targetFile), { recursive: true });
      await writeFile(item.targetFile, content);
      installedFiles.push({ path: item.relativeTarget, sha256: hash(content) });
    }

    state.packages[name] = {
      version: manifest.version,
      source: resolvedSource.source,
      installedAt: new Date().toISOString(),
      files: installedFiles,
    };
    await writeInstallState(configDirectory, state);
    console.log(`Especialista '${name}' ${manifest.version} instalado em ${configDirectory}.`);
    console.log(`${installedFiles.length} arquivo(s) gerenciado(s).`);
    if ((definition.recommendedWith ?? []).length > 0) {
      console.log(`Companions recomendados: ${definition.recommendedWith.join(", ")}.`);
    }
  } finally {
    await resolvedSource.cleanup();
  }
}

async function removeEmptyParents(path, boundary) {
  let current = dirname(path);
  while (resolve(current) !== resolve(boundary)) {
    assertInside(boundary, current);
    try {
      await rmdir(current);
    } catch {
      break;
    }
    current = dirname(current);
  }
}

async function uninstall(name) {
  packageDefinition(name);
  const targetRoot = resolve(process.cwd(), option("--target") ?? platformRoot);
  const configDirectory = await resolveConfigDirectory(targetRoot);
  const state = await readInstallState(configDirectory);
  const installed = state.packages[name];
  if (!installed) throw new Error(`Especialista '${name}' não está instalado no alvo.`);
  const force = hasFlag("--force");

  for (const file of installed.files) {
    const targetFile = resolve(configDirectory, file.path);
    assertInside(configDirectory, targetFile);
    if (!await exists(targetFile)) continue;
    if (!force && hash(await readFile(targetFile)) !== file.sha256) {
      throw new Error(`Arquivo instalado foi alterado localmente: ${file.path}. Use --force para remover.`);
    }
  }

  for (const file of [...installed.files].reverse()) {
    const targetFile = resolve(configDirectory, file.path);
    if (await exists(targetFile)) {
      await rm(targetFile);
      await removeEmptyParents(targetFile, configDirectory);
    }
  }

  delete state.packages[name];
  await writeInstallState(configDirectory, state);
  console.log(`Especialista '${name}' removido de ${configDirectory}.`);
}

async function findExtension(root, extensions, depth = 0) {
  if (depth > 6) return null;
  const ignored = new Set([".git", ".idea", ".kiro", "build", "dist", "node_modules", "target"]);
  for (const entry of await readdir(root, { withFileTypes: true })) {
    if (ignored.has(entry.name)) continue;
    const path = join(root, entry.name);
    if (entry.isFile() && extensions.some((extension) => entry.name.endsWith(extension))) return path;
    if (entry.isDirectory()) {
      const match = await findExtension(path, extensions, depth + 1);
      if (match) return match;
    }
  }
  return null;
}

async function findFileName(root, fileNames, depth = 0) {
  if (depth > 6) return null;
  const ignored = new Set([".git", ".idea", ".kiro", "build", "dist", "node_modules", "target"]);
  for (const entry of await readdir(root, { withFileTypes: true })) {
    if (ignored.has(entry.name)) continue;
    const path = join(root, entry.name);
    if (entry.isFile() && fileNames.includes(entry.name)) return path;
    if (entry.isDirectory()) {
      const match = await findFileName(path, fileNames, depth + 1);
      if (match) return match;
    }
  }
  return null;
}

async function findContentPattern(root, patterns, depth = 0) {
  if (depth > 6) return null;
  const ignored = new Set([".git", ".idea", ".kiro", ".terraform", "build", "dist", "node_modules", "target"]);
  for (const entry of await readdir(root, { withFileTypes: true })) {
    if (ignored.has(entry.name)) continue;
    const path = join(root, entry.name);
    if (entry.isFile()) {
      for (const pattern of patterns) {
        if (!(pattern.extensions ?? []).some((extension) => entry.name.endsWith(extension))) continue;
        if ((await stat(path)).size > 512 * 1024) continue;
        const content = await readFile(path, "utf8");
        if (new RegExp(pattern.regex, pattern.flags ?? "u").test(content)) return path;
      }
    }
    if (entry.isDirectory()) {
      const match = await findContentPattern(path, patterns, depth + 1);
      if (match) return match;
    }
  }
  return null;
}

async function detect() {
  const targetRoot = resolve(process.cwd(), option("--target") ?? platformRoot);
  let packageJson = {};
  const packageJsonPath = join(targetRoot, "package.json");
  if (await exists(packageJsonPath)) {
    try {
      packageJson = await readJson(packageJsonPath);
    } catch {
      // A malformed project package.json should not prevent file-based detection.
    }
  }
  const dependencies = { ...packageJson.dependencies, ...packageJson.devDependencies };
  const matches = [];

  for (const [name, definition] of Object.entries(registry.packages ?? {})) {
    const reasons = new Set();
    for (const file of definition.detection?.files ?? []) {
      if (await exists(join(targetRoot, file))) reasons.add(`arquivo ${file.replaceAll("\\", "/")}`);
    }
    const fileNames = definition.detection?.fileNames ?? [];
    if (fileNames.length > 0) {
      const match = await findFileName(targetRoot, fileNames);
      if (match) reasons.add(`arquivo ${relative(targetRoot, match).replaceAll("\\", "/")}`);
    }
    for (const dependency of definition.detection?.packageJsonDependencies ?? []) {
      if (dependencies[dependency]) reasons.add(`dependência ${dependency}`);
    }
    const extensions = definition.detection?.extensions ?? [];
    if (extensions.length > 0) {
      const match = await findExtension(targetRoot, extensions);
      if (match) reasons.add(`código ${relative(targetRoot, match).replaceAll("\\", "/")}`);
    }
    const contentPatterns = definition.detection?.contentPatterns ?? [];
    if (contentPatterns.length > 0) {
      const match = await findContentPattern(targetRoot, contentPatterns);
      if (match) reasons.add(`conteúdo ${relative(targetRoot, match).replaceAll("\\", "/")}`);
    }
    if (reasons.size > 0) matches.push({ name, status: definition.status, reasons: [...reasons] });
  }

  if (matches.length === 0) {
    console.log("Nenhum especialista detectado para o projeto.");
    return;
  }
  for (const match of matches) {
    console.log(`${match.name} [${match.status}]: ${match.reasons.join(", ")}`);
  }
}

function list() {
  for (const [name, definition] of Object.entries(registry.packages ?? {})) {
    console.log(`${name}\t${definition.status}\t${definition.version ?? "-"}\t${definition.description}`);
  }
}

function inspect(name) {
  console.log(JSON.stringify(packageDefinition(name), null, 2));
}

try {
  if (command === "list") list();
  else if (command === "inspect") inspect(args[1]);
  else if (command === "detect") await detect();
  else if (command === "install") await install(args[1]);
  else if (command === "uninstall") await uninstall(args[1]);
  else throw new Error(`Comando inválido: ${command}. Use list, inspect, detect, install ou uninstall.`);
} catch (error) {
  console.error(error.message);
  process.exit(1);
}
