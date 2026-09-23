# Evidências: Integração MCP com Jira e GitHub

## Resumo

- **Resultado:** pending-local-authentication
- **Ambiente:** Windows, PowerShell, workspace local
- **Data:** 2026-09-23

## Evidências

### EVD-001 - Configuração versionada

- **Cobre:** AC-001 a AC-012 / tarefas 1 a 5
- **Comando:** `npm run validate`
- **Resultado observado:** sucesso; 10 agents com MCP habilitado, 10 skills e 2 JSONs válidos. Endpoints, placeholder do token e política de autoaprovação foram aceitos.
- **Status:** passed

### EVD-002 - Pré-condições locais

- **Procedimento:** verificar apenas a existência da variável e do link, sem ler segredo.
- **Resultado observado:** `GITHUB_PERSONAL_ACCESS_TOKEN` não está configurado na sessão atual. `.kiro` agora existe como Junction apontando para `kiro/` — criado com `New-Item -ItemType Junction`. Node.js reporta `isSymbolicLink: true`; `npm run validate` passa com sucesso.
- **Status:** link-resolved / token-pending

## Validações não executadas

- Login OAuth da Atlassian.
- Conexão autenticada ao GitHub.
- Leitura real de work item, repositório, issue ou pull request.
- Confirmação interativa antes de escrita.

Esses testes dependem de ação do usuário: definir `GITHUB_PERSONAL_ACCESS_TOKEN` na sessão do Kiro e concluir OAuth Atlassian após iniciar o IDE.

## Operações externas

Nenhuma operação externa foi executada.

## Riscos residuais

- Permissões efetivas dependem das contas e políticas organizacionais.
- A instalação local do Kiro reporta versão anterior ao requisito da plataforma; smoke tests visuais dependem de atualização.
- O link `.kiro` está ativo (Junction). Token GitHub e OAuth Atlassian permanecem pendentes.

## Decisão de revisão

- **Decisão:** pending-smoke-test
- **Responsável:** usuário
- **Data:** TBD
