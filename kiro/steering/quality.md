---
inclusion: always
---

# Qualidade

## Estratégia

Teste o comportamento no nível mais baixo que ofereça confiança suficiente e complemente com testes de integração ou ponta a ponta quando o risco atravessar fronteiras.

## Mínimos

- Cada critério de aceite deve ter uma evidência ou justificativa explícita.
- Correções de bug devem incluir teste de regressão quando tecnicamente viável.
- Mudanças de contrato exigem teste de compatibilidade ou migração documentada.
- Fluxos críticos exigem casos de erro, autorização e recuperação.
- Validações não executadas e riscos residuais devem ser listados.

## Revisão

Priorize achados por impacto:

- `P0`: perda grave, exposição ou indisponibilidade crítica.
- `P1`: bug ou regressão relevante que bloqueia entrega.
- `P2`: problema real de menor abrangência ou manutenibilidade arriscada.
- `P3`: melhoria não bloqueante.

Uma revisão sem achados deve declarar isso e ainda mencionar lacunas de teste ou risco residual.

## Evidência

Registre comando ou procedimento, resultado observado, requisito coberto, ambiente e data. Não use apenas afirmações genéricas como "testado com sucesso".

