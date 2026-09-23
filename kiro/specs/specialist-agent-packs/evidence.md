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
- **Resultado:** Kotlin, React e Angular disponíveis; cada stack detectada por seus sinais próprios.
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

### EVD-007 - Validação dos pacotes web

- **Comandos:** `npm run validate` e `npm run quality` em `ai-web-react` e `ai-web-angular`.
- **Resultado:** ambos válidos, cada um com 7 agents, 8 skills e 1 arquivo de hooks; ausência de scripts no repositório do pacote tratada como aviso controlado.
- **Cobre:** AC-001 a AC-003, AC-012, AC-018 a AC-020.

### EVD-008 - Composição web conjunta

- **Procedimento:** detectar React e Angular em fixture híbrida, instalar ambos, executar seus quality runners e desinstalar os dois.
- **Resultado:** os dois pacotes foram detectados e instalados com 26 arquivos cada; `lint`, `typecheck`, `test:ci` e `build` passaram nos dois runners; zero divergências de checksum; remoção concluída sem colisões.
- **Cobre:** AC-004 a AC-010, AC-021.

## Validações não executadas

- Publicação e clone do repositório remoto.
- Execução de quality gates em projetos Kotlin, React e Angular reais.
- Spawn do subagente no Kiro IDE atual.

## Riscos residuais

- As URLs remotas ainda não existem no registro.
- O Kiro local permanece anterior à versão usada como referência e `.kiro` ainda depende de privilégio do Windows.
- O quality gate real depende das tarefas configuradas no projeto consumidor.

## Decisão de revisão

- **Decisão:** ready-for-user-review
- **Responsável:** usuário
- **Data:** TBD
