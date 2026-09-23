# Requisitos: Fundação do AISDLC

## REQ-001 - Fonte de verdade compatível com Kiro

Como mantenedor, quero versionar a configuração em `kiro/` e expô-la como `.kiro` por link simbólico, para manter uma pasta visível sem perder compatibilidade.

- `AC-001`: o README contém comandos de criação do link para PowerShell, Command Prompt e sistemas Unix.
- `AC-002`: `.kiro` está no `.gitignore`.
- `AC-003`: arquivos de runtime referenciam os caminhos `.kiro` esperados pelo Kiro.

## REQ-002 - Componentes centralizados

Como usuário do Kiro, quero agentes, skills, steering, hooks, specs e MCP organizados, para operar a plataforma a partir de uma configuração compartilhada.

- `AC-004`: existem perfis para orquestração e todas as etapas do SDLC.
- `AC-005`: cada skill possui frontmatter Agent Skills válido.
- `AC-006`: hooks usam o schema v1 e MCP possui configuração de workspace válida.

## REQ-003 - Fluxo completo e governado

Como líder de engenharia, quero entradas, saídas, gates e autonomia explícitos, para permitir execução autônoma sem decisões críticas implícitas.

- `AC-007`: o fluxo cobre refinamento, requisitos, design, planejamento, implementação, validação, revisão, documentação e release.
- `AC-008`: ações destrutivas, segredos, produção e merge protegido nunca são implicitamente autorizados.
- `AC-009`: artefatos mantêm rastreabilidade por identificadores.

## REQ-004 - Operação reproduzível

Como desenvolvedor, quero criar e validar specs por comandos locais, para reduzir erros manuais.

- `AC-010`: um comando cria os seis artefatos sem sobrescrever uma spec existente.
- `AC-011`: um comando valida estrutura, metadados e JSONs sem dependências externas.

## Requisitos não funcionais

- `NFR-001`: os scripts devem funcionar em Node.js 18 ou superior.
- `NFR-002`: nenhuma credencial deve ser versionada.
- `NFR-003`: perfis não devem fixar um modelo comercial específico.

## Matriz de rastreabilidade

| Objetivo | Requisitos | Critérios |
| --- | --- | --- |
| OBJ-001 | REQ-001, REQ-002, REQ-004 | AC-001 a AC-006, AC-010, AC-011 |
| OBJ-002 | REQ-002, REQ-003 | AC-004 a AC-009 |

## Aprovação

- **Decisão:** pending-review
- **Responsável:** usuário
- **Data:** TBD

