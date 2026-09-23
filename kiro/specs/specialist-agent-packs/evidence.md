# Evidências: Pacotes de Agentes Especialistas

## Resumo

- **Resultado:** passed-with-external-pending-steps
- **Ambiente:** Windows, PowerShell, Node.js v22.21.1
- **Data:** 2026-09-23

## Evidências

### EVD-001 - Validação do pacote Kotlin

- **Comando:** `npm run validate` em `C:\Github\ai-kotlin-backend`.
- **Resultado:** sucesso; 7 agents, 8 skills e 1 arquivo de hooks válido.
- **Cobre:** AC-001 a AC-003, AC-012, AC-014 a AC-017.

### EVD-002 - Quality runner sem projeto

- **Comando:** `npm run quality` no repositório do pacote.
- **Resultado:** sucesso controlado com aviso de wrapper ausente, sem executar comando global.
- **Cobre:** AC-017.

### EVD-003 - Registro e detecção

- **Comandos:** `npm run specialist -- list` e `detect` contra fixture Kotlin.
- **Resultado:** Kotlin disponível; React e Angular planejados; Kotlin detectado por build e código.
- **Cobre:** AC-004 a AC-006.

### EVD-004 - Instalação e atualização

- **Comando:** instalar duas vezes no workspace temporário.
- **Resultado:** 26 arquivos gerenciados; atualização idempotente concluída.
- **Cobre:** AC-007 e AC-010.

### EVD-005 - Proteção de alteração local

- **Procedimento:** alterar steering instalado e tentar reinstalar e remover.
- **Resultado:** ambas as operações foram bloqueadas; remoção ocorreu somente com `--force` explícito.
- **Cobre:** AC-008 e AC-009.

### EVD-006 - Limpeza

- **Resultado:** pacote desinstalado e workspace temporário removido sem deixar artefatos.

## Validações não executadas

- Publicação e clone do repositório remoto.
- Execução de `gradlew check` ou `mvnw verify` em um backend real.
- Spawn do subagente no Kiro IDE atual.

## Riscos residuais

- A URL remota ainda não existe no registro.
- O Kiro local permanece anterior à versão usada como referência e `.kiro` ainda depende de privilégio do Windows.
- O quality gate real depende das tarefas configuradas no projeto consumidor.

## Decisão de revisão

- **Decisão:** ready-for-user-review
- **Responsável:** usuário
- **Data:** TBD

