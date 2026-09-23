---
inclusion: always
---

# Arquitetura

## Diretrizes

- Use artefatos persistentes como contrato entre etapas e agentes.
- Mantenha agentes especializados, com missão e fronteiras explícitas.
- Coloque comportamento recorrente em skills e regras universais em steering.
- Use scripts para validações determinísticas e agentes para julgamento contextual.
- Integrações externas entram por MCP e começam com privilégio mínimo.
- Preserve compatibilidade com os formatos públicos do Kiro.

## Decisões

- `kiro/` é versionado; `.kiro` é um link local de compatibilidade.
- O orquestrador coordena pelo workflow e pelas skills, sem depender de um serviço próprio.
- O estado de cada entrega está nos artefatos da spec.
- Aprovações são registros, não inferências feitas a partir de conversa.
- O modelo de IA é herdado do ambiente para evitar acoplamento a IDs voláteis.

## Evolução

Antes de adicionar um novo tipo de agente, verifique se a necessidade é um papel com fronteiras próprias, uma skill reutilizável ou apenas uma regra de steering. Prefira a menor unidade que preserve clareza.

