---
inclusion: always
---

# Workflow SDLC

Use `configs/workflow.yaml` e `docs/development-flow.md` como contratos canônicos.

## Operação

1. Localize ou crie a pasta da spec.
2. Determine o estado real pelos artefatos, não apenas pelo relato da conversa.
3. Valide a Definition of Ready da etapa atual.
4. Execute a skill correspondente.
5. Atualize o artefato e registre decisões.
6. Verifique a Definition of Done.
7. Resolva o gate e avance o estado.

## Rework

Quando validação ou revisão falhar:

1. registre o achado e o requisito afetado;
2. retorne à menor etapa capaz de corrigir a causa;
3. preserve histórico e decisões anteriores;
4. repita as validações afetadas;
5. atualize evidências e risco residual.

## Conclusão

Uma demanda termina em `done` apenas quando a mudança está implementada, validada, revisada, documentada e tem decisão de release registrada. `release-ready` não significa que o deploy ocorreu.

