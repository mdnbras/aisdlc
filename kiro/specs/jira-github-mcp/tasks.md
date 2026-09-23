# Plano de Implementação: Integração MCP com Jira e GitHub

- [x] 1. Configurar os servidores remotos
  - Requisitos: REQ-001, REQ-002
  - Resultado: Jira e GitHub declarados em `kiro/settings/mcp.json`
  - Validação: parse JSON e endpoints oficiais

- [x] 2. Definir governança das integrações
  - Requisitos: REQ-003
  - Dependências: 1
  - Resultado: steering de integrações e catálogo de tools
  - Validação: revisão das políticas de leitura, escrita e conteúdo não confiável

- [x] 3. Integrar MCPs ao fluxo e às skills
  - Requisitos: REQ-001 a REQ-003
  - Dependências: 1, 2
  - Resultado: skills usam Jira e GitHub nos pontos apropriados
  - Validação: rastreabilidade no fluxo operacional

- [x] 4. Documentar autenticação e diagnóstico
  - Requisitos: REQ-004
  - Dependências: 1
  - Resultado: README e `docs/integrations.md`
  - Validação: instruções sem segredo persistido

- [x] 5. Ampliar validação determinística
  - Requisitos: REQ-004
  - Dependências: 1
  - Resultado: validador confere servidores, endpoints, token e autoaprovação
  - Validação: `npm run validate`

- [ ] 6. Autenticar e executar smoke tests remotos
  - Requisitos: REQ-001, REQ-002
  - Dependências: 1 a 5
  - Resultado: leitura de baixo risco em Jira e GitHub, com confirmação de escrita
  - Validação: evidências registradas após atualizar o Kiro, criar `.kiro` e autenticar as contas

