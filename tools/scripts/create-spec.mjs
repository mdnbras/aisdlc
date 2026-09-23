import { mkdir, readFile, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "../..");
const [slug, suppliedTitle] = process.argv.slice(2);

if (!slug || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) {
  console.error("Uso: npm run spec:new -- <slug-kebab-case> [\"Título\"]");
  process.exit(1);
}

const target = join(root, "kiro", "specs", slug);
if (existsSync(target)) {
  console.error(`A spec '${slug}' já existe em ${target}.`);
  process.exit(1);
}

const title = suppliedTitle ?? slug
  .split("-")
  .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
  .join(" ");
const date = new Date().toISOString().slice(0, 10);
const templateNames = [
  "business-brief.md",
  "requirements.md",
  "design.md",
  "tasks.md",
  "evidence.md",
  "release.md",
];

await mkdir(target, { recursive: false });

for (const templateName of templateNames) {
  const templatePath = join(root, "templates", templateName);
  const outputPath = join(target, templateName);
  const template = await readFile(templatePath, "utf8");
  const content = template
    .replaceAll("{{slug}}", slug)
    .replaceAll("{{title}}", title)
    .replaceAll("{{date}}", date);
  await writeFile(outputPath, content, "utf8");
}

console.log(`Spec criada em kiro/specs/${slug}/`);
console.log("Próximo passo: execute /refine-business no Kiro.");

