---
inclusion: always
---

# Estrutura do Projeto

## Diretórios

- `kiro/`: fonte de verdade para arquivos consumidos por `.kiro`.
- `kiro/agents/`: perfis de custom agents.
- `kiro/skills/`: skills no padrão Agent Skills.
- `kiro/steering/`: contexto persistente.
- `kiro/specs/`: uma pasta por demanda.
- `kiro/hooks/`: hooks v1 do Kiro.
- `kiro/settings/`: configuração MCP do workspace.
- `configs/`: contratos centrais de workflow, autonomia e perfis.
- `templates/`: modelos para novos artefatos.
- `tools/`: catálogo e scripts determinísticos.
- `docs/`: arquitetura, fluxo e governança.

## Convenções

- Nomes de diretório e arquivos operacionais usam `kebab-case`.
- Uma skill é uma pasta com `SKILL.md`.
- Uma spec deve conter `requirements.md`, `design.md` e `tasks.md`.
- O AISDLC adiciona `business-brief.md`, `evidence.md` e `release.md` à spec.
- Links em documentação devem apontar para a fonte `kiro/`, não para o link `.kiro`.
- Configurações internas dos agentes usam `.kiro` porque esse é o caminho resolvido pelo runtime do Kiro.

## Fonte única

Nunca crie conteúdo diferente em `kiro/` e `.kiro/`. `.kiro` deve ser apenas um link simbólico para `kiro/`.

