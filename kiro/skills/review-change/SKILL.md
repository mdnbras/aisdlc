---
name: review-change
description: Revise uma mudança ou pull request procurando bugs, regressões, riscos de segurança, divergência da spec e testes ausentes.
---

# Revisar mudança

1. Leia requisitos, design, tarefas, evidências e diff completo; quando houver pull request, consulte também checks e reviews pelo GitHub MCP.
2. Verifique correção funcional e casos de borda antes de estilo.
3. Avalie regressões, compatibilidade, segurança, dados e operação.
4. Confirme se os testes realmente cobrem os critérios e o código alterado.
5. Para cada achado, informe prioridade `P0` a `P3`, localização, cenário e impacto.
6. Diferencie bloqueio de sugestão.
7. Registre achados e decisão em `evidence.md`.

## Decisão

- `approved`: sem achados bloqueantes e evidência suficiente.
- `approved-with-risks`: risco explícito aceito pelo responsável adequado.
- `rework`: existe defeito, regressão ou lacuna bloqueante.

Se não houver achados, declare isso e mencione testes não executados ou riscos residuais.
