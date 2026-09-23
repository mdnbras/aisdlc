# Business Brief: Fundação do AISDLC

- **Spec:** `platform-bootstrap`
- **Estado:** release-ready
- **Criado em:** 2026-09-23
- **Responsável:** mantenedor do AISDLC

## Problema

O uso de IA no desenvolvimento tende a ficar fragmentado entre prompts, decisões implícitas e ferramentas sem política comum, dificultando repetição, autonomia segura e auditoria.

## Usuários afetados

Desenvolvedores e times que usam o Kiro IDE para conduzir entregas de software.

## Objetivo

- `OBJ-001`: disponibilizar uma fundação versionada capaz de conduzir uma demanda do refinamento à preparação de release.
- `OBJ-002`: centralizar agentes, skills, steering, tools e configurações com limites explícitos de autonomia.

## Não objetivos

- Implementar um serviço externo de workflow.
- Configurar integrações corporativas específicas.
- Executar deploy ou merge automático.

## Métricas de sucesso

- Todos os estágios possuem agente, skill, artefato e gate definidos.
- Uma nova spec pode ser criada por comando determinístico.
- A configuração estrutural pode ser validada sem dependências externas.
- O Kiro pode consumir `kiro/` por meio do link `.kiro`.

## Restrições e riscos

- Os formatos devem permanecer compatíveis com Kiro IDE 1.x e CLI 3.x.
- O link simbólico depende de configuração local do sistema operacional.
- Integrações externas permanecem desabilitadas até configuração explícita.

## Aprovação

- **Decisão:** pending-review
- **Responsável:** usuário
- **Data:** TBD
- **Ressalvas:** revisão completa solicitada após a criação inicial

