# Requisitos: Integração MCP com Jira e GitHub

## REQ-001 - Acesso ao Jira

Como agente do SDLC, quero consultar work items do Jira pelo MCP oficial da Atlassian, para usar a demanda como contexto e fonte de estado.

- `AC-001`: `mcp.json` declara `jira` em `https://mcp.atlassian.com/v2/mcp`.
- `AC-002`: autenticação usa OAuth e não exige segredo versionado.
- `AC-003`: escritas no Jira não são autoaprovadas.

## REQ-002 - Acesso ao GitHub

Como agente técnico, quero consultar repositórios, issues e pull requests pelo MCP oficial do GitHub, para implementar e revisar mudanças com contexto.

- `AC-004`: `mcp.json` declara `github` em `https://api.githubcopilot.com/mcp/`.
- `AC-005`: autenticação usa `GITHUB_PERSONAL_ACCESS_TOKEN` por variável de ambiente.
- `AC-006`: toolsets estão limitados a contexto, issues, pull requests e repositórios.
- `AC-007`: lockdown está habilitado e não existe autoaprovação ampla.

## REQ-003 - Governança de operações externas

Como responsável pela entrega, quero gates para alterações externas, para evitar mudanças não autorizadas em Jira e GitHub.

- `AC-008`: steering trata conteúdo MCP como entrada não confiável.
- `AC-009`: escritas exigem alvo, efeito, gate, confirmação e evidência.
- `AC-010`: merge, release e produção continuam exigindo autorização específica.

## REQ-004 - Operação e diagnóstico

Como desenvolvedor, quero instruções de autenticação e troubleshooting, para ativar os MCPs sem expor credenciais.

- `AC-011`: README e documentação explicam autenticação nos sistemas suportados.
- `AC-012`: o validador confere os servidores e impede token GitHub hardcoded.

## Requisitos não funcionais

- `NFR-001`: nenhum segredo pode ser persistido no repositório.
- `NFR-002`: a configuração deve usar HTTP remoto suportado pelo Kiro.
- `NFR-003`: as permissões devem seguir privilégio mínimo.

## Matriz de rastreabilidade

| Objetivo | Requisitos | Critérios |
| --- | --- | --- |
| OBJ-001 | REQ-001, REQ-002 | AC-001 a AC-007 |
| OBJ-002 | REQ-003, REQ-004 | AC-008 a AC-012 |

## Aprovação

- **Decisão:** requested-by-user
- **Responsável:** usuário
- **Data:** 2026-09-23

