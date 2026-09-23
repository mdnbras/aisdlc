import { lstat, readdir, readFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "../..");
const errors = [];
const warnings = [];

const requiredFiles = [
  "README.md",
  "configs/workflow.yaml",
  "configs/autonomy-levels.yaml",
  "configs/ai-profiles.yaml",
  "docs/development-flow.md",
  "docs/specialists.md",
  "specialists/registry.json",
  "tools/scripts/specialist.mjs",
  "kiro/skills/use-specialist/SKILL.md",
  "kiro/agents/sdlc-orchestrator.md",
  "kiro/steering/product.md",
  "kiro/steering/tech.md",
  "kiro/steering/structure.md",
  "kiro/steering/integrations.md",
  "kiro/hooks/quality-gates.json",
  "kiro/settings/mcp.json",
];

for (const relativePath of requiredFiles) {
  if (!existsSync(join(root, relativePath))) {
    errors.push(`Arquivo obrigatório ausente: ${relativePath}`);
  }
}

async function filesUnder(relativeDirectory, predicate = () => true) {
  const absoluteDirectory = join(root, relativeDirectory);
  if (!existsSync(absoluteDirectory)) return [];

  const entries = await readdir(absoluteDirectory, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const relativePath = join(relativeDirectory, entry.name);
    if (entry.isDirectory()) {
      files.push(...await filesUnder(relativePath, predicate));
    } else if (predicate(entry.name)) {
      files.push(relativePath);
    }
  }
  return files;
}

function frontmatter(content) {
  return content.match(/^---\r?\n([\s\S]*?)\r?\n---/u)?.[1] ?? null;
}

const agentFiles = await filesUnder("kiro/agents", (name) => name.endsWith(".md"));
for (const relativePath of agentFiles) {
  const content = await readFile(join(root, relativePath), "utf8");
  const metadata = frontmatter(content);
  if (!metadata) {
    errors.push(`Agent sem frontmatter: ${relativePath}`);
    continue;
  }
  for (const field of ["name", "description", "tools", "resources", "includeMcpJson"]) {
    if (!new RegExp(`^${field}:`, "m").test(metadata)) {
      errors.push(`Agent sem '${field}': ${relativePath}`);
    }
  }
  if (!/^includeMcpJson:\s*true\s*$/mu.test(metadata)) {
    errors.push(`Agent não inclui o MCP JSON do workspace: ${relativePath}`);
  }
  for (const serverTool of ["@jira", "@github"]) {
    if (!metadata.includes(`"${serverTool}"`) && !metadata.includes(`'${serverTool}'`)) {
      errors.push(`Agent sem acesso explícito a ${serverTool}: ${relativePath}`);
    }
  }
}

const orchestratorPath = join(root, "kiro", "agents", "sdlc-orchestrator.md");
if (existsSync(orchestratorPath)) {
  const orchestrator = await readFile(orchestratorPath, "utf8");
  if (!orchestrator.includes('"subagent"') || !orchestrator.includes("specialists/**/*")) {
    errors.push("SDLC orchestrator não está configurado para delegar a especialistas.");
  }
}

const skillFiles = await filesUnder("kiro/skills", (name) => name === "SKILL.md");
for (const relativePath of skillFiles) {
  const content = await readFile(join(root, relativePath), "utf8");
  const metadata = frontmatter(content);
  if (!metadata) {
    errors.push(`Skill sem frontmatter: ${relativePath}`);
    continue;
  }
  for (const field of ["name", "description"]) {
    if (!new RegExp(`^${field}:`, "m").test(metadata)) {
      errors.push(`Skill sem '${field}': ${relativePath}`);
    }
  }
}

const jsonFiles = [
  ...await filesUnder("kiro/hooks", (name) => name.endsWith(".json")),
  ...await filesUnder("kiro/settings", (name) => name.endsWith(".json")),
  ...await filesUnder("specialists", (name) => name.endsWith(".json")),
];
for (const relativePath of jsonFiles) {
  try {
    JSON.parse(await readFile(join(root, relativePath), "utf8"));
  } catch (error) {
    errors.push(`JSON inválido em ${relativePath}: ${error.message}`);
  }
}

const registryPath = join(root, "specialists", "registry.json");
if (existsSync(registryPath)) {
  try {
    const specialistRegistry = JSON.parse(await readFile(registryPath, "utf8"));
    const requiredSpecialists = {
      "ai-kotlin-backend": "available",
      "ai-web-react": "planned",
      "ai-web-angular": "planned",
    };
    for (const [name, expectedStatus] of Object.entries(requiredSpecialists)) {
      const specialist = specialistRegistry.packages?.[name];
      if (!specialist) {
        errors.push(`Especialista obrigatório ausente do registro: ${name}`);
      } else if (specialist.status !== expectedStatus) {
        errors.push(`Status inesperado para '${name}': ${specialist.status}`);
      }
    }

    const kotlinSource = specialistRegistry.packages?.["ai-kotlin-backend"]?.source;
    if (kotlinSource?.type === "local" && kotlinSource.path) {
      const localSource = resolve(root, kotlinSource.path);
      if (!existsSync(localSource)) {
        warnings.push(`Fonte local do ai-kotlin-backend não encontrada em ${localSource}. Use --source ao instalar.`);
      }
    }
  } catch (error) {
    errors.push(`Registro de especialistas inválido: ${error.message}`);
  }
}

const mcpPath = join(root, "kiro", "settings", "mcp.json");
if (existsSync(mcpPath)) {
  try {
    const rawMcpConfig = await readFile(mcpPath, "utf8");
    const mcpConfig = JSON.parse(rawMcpConfig);
    const expectedServers = {
      jira: "https://mcp.atlassian.com/v2/mcp",
      github: "https://api.githubcopilot.com/mcp/",
    };

    for (const [name, url] of Object.entries(expectedServers)) {
      const server = mcpConfig.mcpServers?.[name];
      if (!server) {
        errors.push(`MCP obrigatório ausente: ${name}`);
        continue;
      }
      if (server.url !== url) {
        errors.push(`Endpoint inesperado para MCP '${name}': ${server.url ?? "ausente"}`);
      }
      if (server.autoApprove?.includes("*")) {
        errors.push(`MCP '${name}' não pode autoaprovar todas as ferramentas.`);
      }
    }

    const githubAuthorization = mcpConfig.mcpServers?.github?.headers?.Authorization;
    if (githubAuthorization !== "Bearer ${GITHUB_PERSONAL_ACCESS_TOKEN}") {
      errors.push("GitHub MCP deve usar GITHUB_PERSONAL_ACCESS_TOKEN, sem token versionado.");
    }
    if (/github_pat_|ghp_[A-Za-z0-9]/u.test(rawMcpConfig)) {
      errors.push("Possível token GitHub versionado em mcp.json.");
    }
  } catch (error) {
    errors.push(`Não foi possível validar os MCPs: ${error.message}`);
  }
}

const specRoot = join(root, "kiro", "specs");
if (existsSync(specRoot)) {
  const specs = (await readdir(specRoot, { withFileTypes: true }))
    .filter((entry) => entry.isDirectory());
  const expectedArtifacts = [
    "business-brief.md",
    "requirements.md",
    "design.md",
    "tasks.md",
    "evidence.md",
    "release.md",
  ];
  for (const spec of specs) {
    for (const artifact of expectedArtifacts) {
      if (!existsSync(join(specRoot, spec.name, artifact))) {
        errors.push(`Spec '${spec.name}' sem ${artifact}`);
      }
    }
  }
}

const readme = await readFile(join(root, "README.md"), "utf8");
if (!readme.includes("New-Item -ItemType SymbolicLink") || !readme.includes("ln -s kiro .kiro")) {
  errors.push("README sem instruções completas para o link simbólico .kiro.");
}

const gitignore = await readFile(join(root, ".gitignore"), "utf8");
if (!gitignore.split(/\r?\n/u).includes(".kiro")) {
  errors.push(".gitignore deve ignorar o link local .kiro.");
}

const linkPath = join(root, ".kiro");
if (!existsSync(linkPath)) {
  warnings.push("Link .kiro ainda não foi criado; siga o README antes de abrir no Kiro.");
} else {
  const link = await lstat(linkPath);
  if (!link.isSymbolicLink()) {
    errors.push(".kiro existe, mas não é um link simbólico para kiro/.");
  }
}

for (const warning of warnings) console.warn(`WARN: ${warning}`);
for (const error of errors) console.error(`ERROR: ${error}`);

if (errors.length > 0) {
  console.error(`Validação falhou com ${errors.length} erro(s).`);
  process.exit(1);
}

console.log(`AISDLC válido: ${agentFiles.length} agents, ${skillFiles.length} skills, ${jsonFiles.length} JSONs.`);
