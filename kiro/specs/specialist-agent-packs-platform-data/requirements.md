# Requisitos: Especialistas de Plataforma e Dados

## REQ-001 - Contrato comum

- `AC-001`: cada pacote possui `specialist.json`, README, `.kiro` e validação própria.
- `AC-002`: agentes incluem Jira/GitHub MCP e carregam steering/skills explicitamente.
- `AC-003`: entry agent e artefatos usam namespace exclusivo.

## REQ-002 - Android

- `AC-004`: cobre arquitetura, UI, dados offline, plataforma, testes e revisão.
- `AC-005`: quality gate usa somente Gradle Wrapper e tarefas configuradas.
- `AC-006`: permissões, SDK, assinatura e publicação possuem gates explícitos.

## REQ-003 - Database

- `AC-007`: cobre modelagem, schema, migrações, integridade, consultas, recuperação e segurança.
- `AC-008`: não presume engine, ORM ou migrator.
- `AC-009`: DDL destrutivo e operações de produção exigem aprovação.

## REQ-004 - SRE

- `AC-010`: cobre SLOs, observabilidade, incidentes, capacidade, resiliência e delivery.
- `AC-011`: separa análise, proposta e ação; produção permanece humana.
- `AC-012`: incidentes preservam timeline, ownership e postmortem sem culpa.

## REQ-005 - Terraform

- `AC-013`: cobre módulos, providers, state, segurança, testes e plan review.
- `AC-014`: quality gate seguro executa fmt e validação local sem apply.
- `AC-015`: test, plan remoto e mutações de state/infra exigem gate.

## REQ-006 - Integração

- `AC-016`: registry expõe os quatro pacotes como disponíveis.
- `AC-017`: detecção suporta arquivos característicos em subdiretórios.
- `AC-018`: os quatro pacotes podem coexistir sem colisões e ser removidos com integridade.

## Rastreabilidade

| Objetivo | Requisitos | Critérios |
| --- | --- | --- |
| OBJ-001 | REQ-001, REQ-002 | AC-001 a AC-006 |
| OBJ-002 | REQ-001, REQ-003 | AC-001 a AC-003, AC-007 a AC-009 |
| OBJ-003 | REQ-001, REQ-004 | AC-001 a AC-003, AC-010 a AC-012 |
| OBJ-004 | REQ-001, REQ-005 | AC-001 a AC-003, AC-013 a AC-015 |
| OBJ-005 | REQ-006 | AC-016 a AC-018 |

