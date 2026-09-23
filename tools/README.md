# Tools

Ferramentas determinísticas complementam o julgamento dos agentes.

## Scripts locais

### Criar uma spec

```bash
npm run spec:new -- nome-da-feature "Título da feature"
```

O script valida o slug, impede sobrescrita e instancia todos os templates em `kiro/specs/<slug>/`.

### Validar a plataforma

```bash
npm run validate
```

A validação verifica estrutura obrigatória, frontmatter de agents e skills, JSON de hooks e MCP, artefatos das specs e configuração do link simbólico.

## Integrações

Servidores externos são configurados em `kiro/settings/mcp.json`. Os servidores iniciais são Jira, pelo Atlassian MCP v2 com OAuth, e GitHub Remote MCP com token fornecido em `GITHUB_PERSONAL_ACCESS_TOKEN`.

Nenhum tool está em `autoApprove`. Consultas e escritas continuam sujeitas às confirmações do Kiro e aos gates definidos em `kiro/steering/integrations.md`.

As instruções de autenticação, permissões e diagnóstico estão em `docs/integrations.md`.
