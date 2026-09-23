---
inclusion: always
---

# Engenharia

## Antes de alterar

- Leia a spec ativa e os padrões do projeto alvo.
- Inspecione o estado atual e mudanças existentes.
- Confirme escopo, critérios de aceite e forma de validação.
- Identifique risco e gate aplicável.

## Durante a implementação

- Faça a menor mudança coerente que complete a tarefa.
- Siga padrões já existentes antes de criar abstrações.
- Preserve alterações do usuário e trabalhos não relacionados.
- Mantenha compatibilidade salvo requisito explícito em contrário.
- Adicione comentários apenas quando a intenção não for evidente pelo código.
- Atualize teste e documentação junto do comportamento.

## Ao concluir

- Execute validações proporcionais ao risco.
- Registre comandos, resultados e limitações em `evidence.md`.
- Atualize `tasks.md` somente quando a Definition of Done estiver atendida.
- Resuma arquivos afetados, comportamento e riscos residuais.

## Proibições

- Não invente resultado de teste ou aprovação.
- Não esconda falhas com fallback silencioso.
- Não altere escopo para acomodar uma implementação mais fácil.
- Não exponha credenciais ou dados sensíveis.

