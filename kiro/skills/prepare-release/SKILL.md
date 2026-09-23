---
name: prepare-release
description: Avalie prontidão e prepare resumo, deploy, smoke test, observabilidade e rollback de uma entrega validada.
---

# Preparar release

1. Confirme que requisitos, design e tarefas estão consistentes.
2. Verifique `evidence.md`, decisão de revisão e riscos residuais.
3. Confirme documentação e requisitos operacionais.
4. Resuma a mudança em linguagem orientada ao impacto.
5. Descreva pré-requisitos e passos ordenados de deploy.
6. Defina smoke test e sinais que indicam saúde ou degradação.
7. Escreva rollback acionável, incluindo limites de reversibilidade.
8. Atualize `release.md` e classifique como `blocked`, `ready-for-approval` ou `approved`.
9. Após autorização, sincronize o estado da work item Jira e prepare as ações GitHub solicitadas, registrando os resultados.

## Limite

Não execute merge, tag, publicação ou deploy sem autorização específica. Preparar uma ação externa não concede permissão para realizá-la.
