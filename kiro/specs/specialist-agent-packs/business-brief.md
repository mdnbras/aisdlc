# Business Brief: Pacotes de Agentes Especialistas

- **Spec:** `specialist-agent-packs`
- **Estado:** release-ready
- **Criado em:** 2026-09-23
- **Responsável:** mantenedor do AISDLC
- **Jira:** não informado
- **GitHub:** repositórios remotos ainda não publicados

## Problema

O AISDLC governa o ciclo completo, mas seus agentes generalistas não devem carregar permanentemente todo o conhecimento de cada stack. Especialidades como Kotlin, React e Angular precisam evoluir de forma independente sem inflar ou acoplar o núcleo.

## Objetivo

- `OBJ-001`: definir um contrato para especialistas Kiro mantidos em repositórios próprios.
- `OBJ-002`: detectar e compor especialistas no workspace consumidor quando necessários.
- `OBJ-003`: entregar o primeiro pacote funcional, `ai-kotlin-backend`.
- `OBJ-004`: reservar `ai-web-react` e `ai-web-angular` no roadmap.

## Não objetivos

- Implementar React e Angular nesta entrega.
- Baixar ou executar automaticamente código remoto não revisado.
- Tornar especialistas responsáveis por decisões de produto ou release.

## Métricas de sucesso

- Um pacote declara exports em `specialist.json` e mantém sua própria `.kiro`.
- O AISDLC lista, detecta, instala, atualiza e remove pacotes sem sobrescrever mudanças locais silenciosamente.
- O orquestrador pode delegar a agentes sob o namespace `specialists/`.
- O pacote Kotlin possui agentes, skills, steering, hooks e quality gate próprios.

## Aprovação

- **Decisão:** requested-by-user
- **Responsável:** usuário
- **Data:** 2026-09-23

