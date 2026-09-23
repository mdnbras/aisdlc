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

- [ ] 6. Publicar repositório e atualizar origem remota
  - Requisitos: REQ-001
  - Dependências: 4, 5
  - Resultado: remote Git oficial registrado no AISDLC
  - Validação: clone limpo e instalação pelo caminho publicado

- [ ] 7. Validar delegação no Kiro IDE atual
  - Requisitos: REQ-004, REQ-005
  - Dependências: 2 a 6
  - Resultado: tarefa Kotlin real executada pelo subagente
  - Validação: Kiro atualizado, `.kiro` ativo e evidências na spec

