# Arquitetura da Plataforma

## Visão geral

O AISDLC é uma camada de configuração e governança sobre o runtime de agentes do Kiro. Ele não implementa um orquestrador externo nesta fase; a coordenação acontece por agentes, skills, specs e artefatos versionados.

```text
Usuário / Time
      |
Kiro IDE ou CLI
      |
.kiro -> kiro/
      |
Agents + Steering + Skills + Hooks + Specs + MCP
      |
Código, testes, documentação e sistemas externos
```

## Camadas

### Experiência

O Kiro IDE e o Kiro CLI fornecem chat, seleção de agentes, execução de specs, permissões e interação humana.

### Orquestração

`sdlc-orchestrator` conduz os estados do fluxo. Os demais agentes representam especializações selecionáveis. A orquestração depende de artefatos persistentes, e não da memória de uma conversa.

### Conhecimento

Steering contém regras persistentes. Skills contêm procedimentos ativados sob demanda. Specs contêm o contexto específico de cada entrega.

### Governança

Os YAMLs de `configs/` expressam política de forma central. Hooks antecipam verificações. Gates humanos protegem decisões que não podem ser inferidas com segurança.

### Integração

Ferramentas nativas do Kiro operam no workspace. MCP conecta serviços externos. Scripts locais cuidam de tarefas determinísticas como scaffolding e validação estrutural.

## Decisões arquiteturais

### `kiro/` como fonte de verdade

O diretório visível é versionado e pode ser reutilizado por automações convencionais. `.kiro` é apenas a interface de compatibilidade exigida pelo Kiro.

### Artefatos como protocolo

Agentes não dependem de comunicação direta entre si. Eles produzem e consomem arquivos com contratos definidos, permitindo auditoria, retomada e substituição de agentes.

### Configuração sem modelo fixo

Perfis não fixam IDs de modelo, evitando obsolescência e respeitando disponibilidade da organização. `ai-profiles.yaml` especifica características esperadas e deixa a seleção concreta para o ambiente.

### Automação progressiva

O nível de autonomia é atribuído por risco e ação, não por confiança genérica no agente. Quanto maior a consequência, mais explícito é o gate.

### Integrações explícitas

Jira e GitHub são os MCPs iniciais. Cada integração declara finalidade, autenticação, escopo e política de escrita. Jira usa OAuth e GitHub usa um token fornecido por variável de ambiente; nenhuma credencial é versionada e nenhuma ferramenta externa é autoaprovada.

## Limitações atuais

- Não há serviço persistente de workflow nem banco de estado; o estado está nos arquivos.
- A troca entre agentes especializados é conduzida pelo usuário ou simulada pelo orquestrador por meio das skills.
- CI/CD e outras fontes corporativas ainda dependem de integrações adicionais.
- Os hooks locais complementam, mas não substituem, políticas protegidas no servidor de Git e no pipeline.
