---
name: validate-change
description: Valide uma implementação contra requisitos e riscos, execute testes e registre evidências reproduzíveis. Use após implementar ou corrigir uma tarefa.
---

# Validar mudança

1. Leia requisitos, design, tarefas e diff da mudança.
2. Mapeie critérios de aceite para testes ou procedimentos de verificação.
3. Execute primeiro verificações focadas e depois a regressão apropriada.
4. Cubra erros, limites, permissões, concorrência e compatibilidade quando relevantes.
5. Registre cada evidência como `EVD-nnn`, com comando, resultado, ambiente e item coberto.
6. Liste validações não executadas e motivo.
7. Classifique falhas e riscos residuais.
8. Atualize `evidence.md`; nunca apague evidência histórica relevante.

## Resultado

Use `passed`, `failed` ou `partial`. `partial` exige explicação do risco e decisão pendente.

