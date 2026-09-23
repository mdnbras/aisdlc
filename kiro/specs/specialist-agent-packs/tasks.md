# Plano de Implementação: Pacotes de Agentes Especialistas

- [x] 1. Definir contrato e registro de especialistas
  - Requisitos: REQ-001, REQ-002
  - Resultado: manifesto, catálogo, estados e sinais de detecção
  - Validação: parse e validação estrutural

- [x] 2. Implementar compositor seguro
  - Requisitos: REQ-003
  - Dependências: 1
  - Resultado: comandos list, inspect, detect, install e uninstall
  - Validação: smoke test completo com projeto Kotlin temporário

- [x] 3. Integrar delegação ao AISDLC
  - Requisitos: REQ-004
  - Dependências: 1
  - Resultado: skill `use-specialist` e subagent no orquestrador
  - Validação: frontmatter e restrição `specialists/*`

- [x] 4. Criar pacote ai-kotlin-backend
  - Requisitos: REQ-001, REQ-005
  - Dependências: 1
  - Resultado: repositório independente com 7 agentes, 8 skills, 7 steerings, hooks e runtime
  - Validação: `npm run validate` no pacote

- [x] 5. Validar proteção de alterações locais
  - Requisitos: REQ-003
  - Dependências: 2, 4
  - Resultado: atualização e remoção bloqueiam arquivo modificado; `--force` explícito funciona
  - Validação: smoke test e limpeza do workspace temporário

- [x] 6. Criar pacote ai-web-react
  - Requisitos: REQ-001, REQ-006
  - Dependências: 1
  - Resultado: repositório independente com 7 agentes, 8 skills, 8 steerings, hooks e runtime
  - Validação: `npm run validate` no pacote

- [x] 7. Criar pacote ai-web-angular
  - Requisitos: REQ-001, REQ-006
  - Dependências: 1
  - Resultado: repositório independente com 7 agentes, 8 skills, 8 steerings, hooks e runtime
  - Validação: `npm run validate` no pacote

- [x] 8. Validar composição conjunta dos especialistas web
  - Requisitos: REQ-002, REQ-003, REQ-006
  - Dependências: 2, 6, 7
  - Resultado: detecção, instalação, quality gates e remoção sem colisões
  - Validação: smoke test em workspace híbrido temporário

- [ ] 9. Publicar repositórios e atualizar origens remotas
  - Requisitos: REQ-001
  - Dependências: 4 a 8
  - Resultado: remotes Git oficiais registrados no AISDLC
  - Validação: clone limpo e instalação pelo caminho publicado

- [ ] 10. Validar delegação no Kiro IDE atual
  - Requisitos: REQ-004, REQ-005, REQ-006
  - Dependências: 2 a 9
  - Resultado: tarefas reais executadas pelos subagentes Kotlin, React e Angular
  - Validação: Kiro atualizado, `.kiro` ativo e evidências na spec
