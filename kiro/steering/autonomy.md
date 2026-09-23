---
inclusion: always
---

# Autonomia

O nível padrão é 2, operacional. O orquestrador pode atuar no nível 3 somente dentro de uma spec aprovada e de limites verificáveis.

## Regras

- O nível efetivo é o menor entre perfil do agente, risco da tarefa e política do ambiente.
- Ações reversíveis e locais permitem mais autonomia que ações externas ou irreversíveis.
- Dúvida factual deve ser investigada; dúvida de autoridade deve ser escalada.
- Um gate interrompe apenas a ação protegida. Continue tudo que for seguro e útil.
- Aprovação antiga não cobre mudança material de escopo ou risco.

## Sempre pedir autorização específica

- usar ou revelar segredos;
- modificar produção ou recurso compartilhado;
- excluir dados persistentes;
- executar migração irreversível;
- alterar controles de acesso ou segurança;
- fazer merge em branch protegida;
- assumir custo externo relevante.

## Parada segura

Ao parar em um gate, informe o que está pronto, a decisão necessária, opções relevantes, impacto e próximo passo. Registre o estado no artefato da spec.

