# Design: Integração MCP com Jira e GitHub

## Visão da solução

Os dois servidores remotos são declarados no MCP JSON do workspace. Todos os agents já usam `includeMcpJson: true` e expõem a categoria `@mcp`, portanto não é necessária duplicação de configuração por perfil.

## Jira

O servidor `jira` aponta para o Atlassian MCP v2. O Kiro inicia OAuth 2.1 e o acesso efetivo respeita permissões do usuário e políticas da organização Atlassian. Não há header ou token no repositório.

## GitHub

O servidor `github` aponta para o GitHub Remote MCP. O header Authorization expande `GITHUB_PERSONAL_ACCESS_TOKEN` no ambiente local. `X-MCP-Toolsets` reduz a superfície a `context`, `issues`, `pull_requests` e `repos`; `X-MCP-Lockdown` habilita filtragem adicional.

## Permissões

`autoApprove` é um array vazio nos dois servidores. Steering e documentação exigem gate antes de qualquer escrita. A permissão final também depende do usuário OAuth ou do token GitHub.

## Segurança

- Tokens não são armazenados em arquivos.
- Conteúdo remoto é dado não confiável e não substitui instruções locais.
- Fine-grained PAT e restrição por repositório são recomendados.
- Lockdown complementa, mas não substitui, validação humana.
- Alterações externas são registradas sem incluir dados sensíveis.

## Validação

- Parse do JSON.
- Verificação dos nomes e endpoints.
- Verificação do placeholder do token.
- Rejeição de `autoApprove: ["*"]`.
- Busca por prefixos comuns de token hardcoded.
- Smoke test de conexão pendente até autenticação e atualização do Kiro.

## Decisões

### DEC-001 - Usar Atlassian MCP v2 remoto

- **Decisão:** usar `https://mcp.atlassian.com/v2/mcp` com OAuth.
- **Consequência:** sem segredo local; acesso depende de políticas Atlassian e pode consumir créditos Rovo conforme o plano.

### DEC-002 - Usar GitHub Remote MCP com token de ambiente

- **Decisão:** usar o endpoint hospedado com fine-grained PAT injetado por variável.
- **Alternativa:** executar o servidor local por binário ou Docker.
- **Consequência:** setup simples; rotação e escopo do token ficam sob responsabilidade do usuário.

### DEC-003 - Não autoaprovar ferramentas MCP

- **Decisão:** manter `autoApprove` vazio.
- **Consequência:** maior fricção inicial, com confirmação explícita para operações externas.

## Aprovação

- **Decisão:** requested-by-user
- **Responsável:** usuário
- **Data:** 2026-09-23

