# Design: Fundação do AISDLC

## Visão da solução

A plataforma usa o runtime nativo do Kiro e arquivos versionados como protocolo. `kiro/` contém configurações de runtime; `.kiro` é um link local. Agentes consomem steering, configurações e skills explicitamente. Specs preservam o estado de cada entrega.

## Componentes

- Agentes Markdown com frontmatter do Kiro.
- Skills em diretórios com `SKILL.md`.
- Steering persistente com inclusão `always`.
- Hooks JSON v1 para validação e evidências.
- MCP JSON vazio e opt-in.
- Contratos YAML de workflow e autonomia.
- Templates Markdown e scripts Node.js sem dependências.

## Fluxo

O `sdlc-orchestrator` determina o estado da spec e ativa a skill da próxima etapa. Cada skill atualiza um artefato. Gates interrompem somente ações protegidas. A conclusão de tarefas aciona revisão de evidências.

## Segurança

- MCP começa sem servidores.
- Segredos são proibidos em arquivos versionados.
- Perfis não recebem autoaprovação ampla.
- Produção, exclusão persistente e merge protegido exigem autorização específica.

## Testes

- Parse de todos os JSONs.
- Verificação de estrutura e arquivos obrigatórios.
- Verificação de frontmatter mínimo de agents e skills.
- Teste do scaffold em slug temporário, seguido de remoção controlada.
- Verificação documental dos comandos de link simbólico.

## Decisões

### DEC-001 - Usar link simbólico para compatibilidade

- **Decisão:** versionar `kiro/` e criar `.kiro -> kiro` localmente.
- **Alternativas:** versionar `.kiro` diretamente ou duplicar pastas.
- **Consequências:** melhor visibilidade; requer uma etapa local de instalação.

### DEC-002 - Usar artefatos como estado

- **Decisão:** manter estado e handoff nos arquivos da spec.
- **Alternativas:** serviço de orquestração e banco de workflow.
- **Consequências:** início simples e auditável; coordenação distribuída limitada nesta fase.

### DEC-003 - Herdar o modelo do ambiente

- **Decisão:** omitir `model` nos agentes.
- **Consequências:** configuração portátil e menos sujeita à obsolescência.

## Riscos

- Alterações futuras de schema do Kiro exigirão evolução do validador.
- Hooks locais podem não refletir políticas de CI do projeto consumidor.
- Times devem adaptar gates e perfis ao próprio risco.

## Aprovação

- **Decisão:** pending-review
- **Responsável:** usuário
- **Data:** TBD

