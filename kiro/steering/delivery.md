---
inclusion: always
---

# Entrega

## Mudança

- Mantenha commits e pull requests focados em uma intenção coerente.
- Não inclua reformatações ou refatorações não necessárias.
- Explique breaking changes, migrações e impacto operacional.
- Changelog descreve efeito para o usuário, não apenas arquivos alterados.

## Release readiness

Uma entrega está pronta quando requisitos, design, tarefas, evidências, documentação e plano de release concordam entre si.

`release.md` deve conter:

- resumo e impacto;
- pré-requisitos;
- passos de deploy;
- smoke test;
- sinais de observabilidade;
- rollback acionável;
- aprovação aplicável.

## Limites

Preparar release não autoriza publicar, fazer deploy, criar tag, mergear ou alterar produção. Essas ações exigem solicitação explícita ou política externa previamente aprovada.

