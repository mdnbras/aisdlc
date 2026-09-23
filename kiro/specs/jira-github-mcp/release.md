# Release: Integração MCP com Jira e GitHub

## Estado

`blocked-on-local-activation`

## Resumo

Adiciona Jira e GitHub como fontes externas do SDLC por servidores MCP oficiais, com autenticação segura e gates para escrita.

## Impacto

O Kiro tentará inicializar os dois servidores ao abrir o workspace. Jira solicitará OAuth; GitHub exige `GITHUB_PERSONAL_ACCESS_TOKEN` no ambiente e aprovação da variável pelo Kiro.

## Pré-requisitos

- Kiro compatível com MCP HTTP remoto.
- Link `.kiro -> kiro` ativo.
- Conta Atlassian com acesso ao Jira e MCP permitido.
- Fine-grained GitHub PAT com repositórios e permissões mínimas necessárias.

## Ativação

1. Atualizar o Kiro.
2. Criar o link simbólico `.kiro`.
3. Definir `GITHUB_PERSONAL_ACCESS_TOKEN` sem persistir o valor no projeto.
4. Iniciar o Kiro a partir do mesmo ambiente.
5. Aprovar a expansão da variável e concluir OAuth Atlassian.
6. Executar os smoke tests descritos em `docs/integrations.md`.

## Rollback

Definir `disabled: true` no servidor afetado ou reverter suas entradas em `mcp.json`. Revogar o OAuth Atlassian e o token GitHub encerra o acesso externo.

## Aprovação

- **Decisão:** pending-local-activation
- **Responsável:** usuário
- **Data:** TBD

