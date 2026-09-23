# Business Brief: Integração MCP com Jira e GitHub

- **Spec:** `jira-github-mcp`
- **Estado:** validating
- **Criado em:** 2026-09-23
- **Responsável:** mantenedor do AISDLC
- **Jira:** não aplicável à configuração inicial
- **GitHub:** workspace local ainda sem repositório Git associado

## Problema

O AISDLC possui agentes e fluxo, mas ainda não acessa as duas fontes externas centrais do desenvolvimento: demandas no Jira e código, issues e pull requests no GitHub.

## Objetivo

- `OBJ-001`: permitir que agentes consultem contexto de Jira e GitHub durante todo o SDLC.
- `OBJ-002`: permitir operações externas controladas sem versionar credenciais nem autoaprovar escritas.

## Não objetivos

- Configurar CI/CD ou deploy.
- Conceder acesso global a todas as organizações e repositórios.
- Executar autenticação em nome do usuário.
- Autorizar merge, release ou transições automaticamente.

## Métricas de sucesso

- Os dois servidores estão declarados em `mcp.json` com endpoints oficiais.
- A autenticação não contém segredos versionados.
- Agents carregam os MCPs do workspace.
- Uso, permissões e diagnóstico estão documentados.
- O validador detecta ausência, endpoint incorreto, autoaprovação ampla e token hardcoded.

## Restrições e riscos

- Jira requer OAuth e pode depender de permissão administrativa da organização.
- GitHub requer token com permissões adequadas.
- Conteúdo remoto pode conter instruções maliciosas e deve ser tratado como dado não confiável.
- O Kiro local precisa ser atualizado e o link `.kiro` ainda depende de privilégio do Windows.

## Aprovação

- **Decisão:** requested-by-user
- **Responsável:** usuário
- **Data:** 2026-09-23
- **Ressalvas:** autenticação e permissões permanecem sob controle do usuário

