# Requisitos: Pacotes de Agentes Especialistas

## REQ-001 - Pacote independente

Como mantenedor, quero cada especialista em repositório próprio com `.kiro`, para versionar e publicar sua evolução separadamente.

- `AC-001`: o pacote possui `specialist.json`, README e validação própria.
- `AC-002`: agentes, skills, steering, hooks e runtime ficam sob `.kiro`.
- `AC-003`: nomes de agentes e skills não colidem com o núcleo.

## REQ-002 - Registro e detecção

Como orquestrador, quero identificar especialistas pela stack real do projeto, para ativar contexto somente quando necessário.

- `AC-004`: o registro contém status, capacidades e sinais de detecção.
- `AC-005`: Kotlin é detectado por arquivos de build ou código `.kt`.
- `AC-006`: React e Angular estão registrados como planejados.

## REQ-003 - Composição segura

Como desenvolvedor, quero instalar e remover um especialista no `.kiro` do projeto alvo, para que hooks e agentes operem no root correto.

- `AC-007`: instalação aplica namespace e registra arquivos com checksum.
- `AC-008`: reinstalação não sobrescreve alteração local sem `--force`.
- `AC-009`: remoção não apaga arquivo modificado sem `--force`.
- `AC-010`: colisões com arquivos não gerenciados são bloqueadas.

## REQ-004 - Delegação

Como AISDLC, quero delegar tarefas ao orquestrador do pacote, para usar especialidade sem perder governança.

- `AC-011`: o agente principal possui a ferramenta `subagent` restrita a `specialists/*`.
- `AC-012`: o pacote expõe um entry agent e especialistas internos.
- `AC-013`: resultado retorna ao AISDLC para gates e evidências.

## REQ-005 - Especialista Kotlin

Como time backend, quero suporte a arquitetura, implementação, API, persistência, testes e revisão Kotlin.

- `AC-014`: existem agentes para todas essas responsabilidades.
- `AC-015`: skills cobrem análise, design, implementação, API, persistência, testes, revisão e build.
- `AC-016`: steering cobre Kotlin, arquitetura, API, dados, testes, segurança, build e operação.
- `AC-017`: hook executa `check` ou `verify` após tarefa.

## Matriz de rastreabilidade

| Objetivo | Requisitos | Critérios |
| --- | --- | --- |
| OBJ-001 | REQ-001 | AC-001 a AC-003 |
| OBJ-002 | REQ-002, REQ-003 | AC-004 a AC-010 |
| OBJ-003 | REQ-004, REQ-005 | AC-011 a AC-017 |
| OBJ-004 | REQ-002 | AC-006 |

## Aprovação

- **Decisão:** requested-by-user
- **Responsável:** usuário
- **Data:** 2026-09-23

