---
name: design-solution
description: Projete a solução técnica de uma spec, cobrindo arquitetura, componentes, interfaces, dados, segurança, operação, testes e riscos.
---

# Desenhar solução

1. Leia `requirements.md`, steering e arquitetura existente do projeto.
2. Inspecione os componentes afetados antes de propor novos padrões.
3. Defina fluxo, responsabilidades, interfaces e estados de erro.
4. Trate dados, migração, compatibilidade, segurança, privacidade e observabilidade.
5. Derive a estratégia de testes dos riscos e critérios.
6. Compare alternativas apenas para decisões materialmente diferentes.
7. Registre decisões como `DEC-nnn` em `design.md`.
8. Liste riscos, mitigação, rollout e rollback quando aplicável.

## Gate

Pare para aprovação antes de consolidar nova tecnologia, contrato público, custo recorrente, migração irreversível ou mudança arquitetural ampla.

