# AISDLC

Plataforma de agentes de IA para conduzir o ciclo completo de desenvolvimento de software no Kiro IDE, do refinamento de negócio à implementação autônoma, com governança, evidências e pontos explícitos de decisão humana.

## Estado

Esta é a fundação executável da plataforma. Ela inclui agentes especializados, skills reutilizáveis, steering, hooks, configurações de autonomia, templates, ferramentas locais e uma spec piloto que documenta o próprio bootstrap.

## Princípio de instalação

`kiro/` é a fonte de verdade versionada. O Kiro procura configurações em `.kiro/`, portanto cada clone deve criar um link simbólico local chamado `.kiro` apontando para `kiro/`.

O link não deve ser commitado e já está coberto pelo `.gitignore`.

### Windows PowerShell

Execute na raiz do projeto:

```powershell
New-Item -ItemType SymbolicLink -Path .kiro -Target kiro
```

Se o Windows negar a criação por falta de Developer Mode ou privilégios, use uma Junction como alternativa:

```powershell
New-Item -ItemType Junction -Path .kiro -Target kiro
```

Junction não exige Developer Mode e é reconhecida como link simbólico pelo Node.js e pelo Kiro IDE. A diferença principal é que Junction não funciona em caminhos de rede; para uso local é equivalente.

### Windows Command Prompt

```bat
mklink /D .kiro kiro
```

### Linux e macOS

```bash
ln -s kiro .kiro
```

Não mantenha uma pasta real `.kiro` em paralelo. Isso criaria duas fontes de configuração com risco de divergência.

## Início rápido

1. Crie o link simbólico correspondente ao seu sistema operacional.
2. Copie `kiro/settings/mcp.sample.json` para `kiro/settings/mcp.json` e configure a autenticação dos MCPs conforme `docs/integrations.md`.
3. Valide a instalação com `npm run validate`.
4. Abra a raiz do repositório no Kiro IDE e autentique o Jira quando solicitado.
5. Selecione o agente `sdlc-orchestrator`.
6. Inicie uma demanda com `/run-sdlc` ou crie uma spec com `npm run spec:new -- minha-feature "Minha feature"`.
7. Revise os gates humanos indicados nos artefatos da spec.
8. Execute tarefas pelo painel de Specs do Kiro ou com `/spec run <nome>` no Kiro CLI.

O projeto não possui dependências npm; os scripts usam apenas APIs nativas do Node.js.

## Fluxo operacional

```text
Demanda
  -> Refinamento de negócio
  -> Requisitos e critérios de aceite
  -> Desenho da solução
  -> Plano técnico
  -> Implementação autônoma
  -> Validação e testes
  -> Revisão independente
  -> Documentação
  -> Preparação de release
```

Cada demanda vive em `kiro/specs/<slug>/`. Os três artefatos nativos do Kiro são `requirements.md`, `design.md` e `tasks.md`. O AISDLC acrescenta `business-brief.md`, `evidence.md` e `release.md` para manter rastreabilidade de ponta a ponta.

O contrato detalhado de entradas, saídas e gates está em [docs/development-flow.md](docs/development-flow.md).

## Agentes

| Agente | Responsabilidade principal | Autonomia padrão |
| --- | --- | --- |
| `sdlc-orchestrator` | Conduzir a demanda pelo fluxo completo e aplicar os gates | 3 |
| `business-refiner` | Transformar uma demanda em problema, objetivo e métricas | 1 |
| `product-analyst` | Especificar requisitos e critérios de aceite | 1 |
| `solution-architect` | Definir solução, interfaces, riscos e decisões | 1 |
| `tech-lead` | Produzir tarefas executáveis e estratégia de entrega | 2 |
| `implementation-agent` | Implementar tarefas aprovadas com testes | 2 |
| `test-agent` | Validar comportamento e registrar evidências | 2 |
| `review-agent` | Revisar bugs, regressões, segurança e aderência | 1 |
| `documentation-agent` | Atualizar documentação técnica e de uso | 2 |
| `release-agent` | Preparar release, deploy e rollback | 1 |

Os perfis ficam em `kiro/agents/`. Eles não fixam um modelo específico: herdam o modelo configurado no Kiro, enquanto `configs/ai-profiles.yaml` define o perfil de capacidade esperado para cada papel.

## Skills

Skills ficam em `kiro/skills/<nome>/SKILL.md`, seguem o padrão Agent Skills e aparecem como comandos `/nome` no Kiro:

- `run-sdlc`
- `refine-business`
- `write-requirements`
- `design-solution`
- `plan-implementation`
- `implement-task`
- `validate-change`
- `review-change`
- `document-feature`
- `prepare-release`
- `use-specialist`

Cada skill determina pré-condições, procedimento, formato de saída e critério de conclusão. Artefatos detalhados são carregados sob demanda para manter o contexto enxuto.

## Especialistas

Stacks específicas são atendidas por pacotes independentes com seu próprio contexto `.kiro`. O AISDLC detecta a tecnologia, instala o pacote no workspace consumidor e delega tarefas ao seu orquestrador como subagente.

```powershell
npm run specialist -- list
npm run specialist -- detect --target C:\Github\meu-servico
npm run specialist -- install ai-kotlin-backend --target C:\Github\meu-servico
npm run specialist -- install ai-web-react --target C:\Github\meu-app-react
npm run specialist -- install ai-web-angular --target C:\Github\meu-app-angular
npm run specialist -- install ai-kotlin-android --target C:\Github\meu-app-android
npm run specialist -- install ai-database --target C:\Github\meu-servico
npm run specialist -- install ai-sre --target C:\Github\meu-servico
npm run specialist -- install ai-terraform --target C:\Github\minha-infra
```

Os pacotes disponíveis cobrem backend Kotlin, Android/Kotlin, React, Angular, bancos de dados, SRE e Terraform. Todos vivem em repositórios irmãos com agentes, skills, steering, hooks e quality gates próprios, preservando tecnologias e convenções do projeto consumidor. Veja [docs/specialists.md](docs/specialists.md).

## Steering

Os arquivos de `kiro/steering/` carregam o contexto persistente da plataforma:

- `product.md`: propósito, usuários e resultados esperados.
- `tech.md`: tecnologias e portabilidade.
- `structure.md`: organização e convenções de arquivos.
- `architecture.md`: limites e decisões arquiteturais.
- `engineering.md`: disciplina de implementação.
- `quality.md`: estratégia de testes e evidências.
- `delivery.md`: regras de mudança e release.
- `autonomy.md`: limites de autonomia e escalonamento.
- `integrations.md`: uso seguro de Jira e GitHub via MCP.
- `workflow.md`: estados e transições do SDLC.

Custom agents não recebem steering automaticamente no Kiro. Por isso, todos os perfis declaram explicitamente `file://.kiro/steering/**/*.md` em `resources`.

## Configuração e governança

Os contratos legíveis por máquina ficam em `configs/`:

- `workflow.yaml`: etapas, donos, artefatos e gates.
- `autonomy-levels.yaml`: ações permitidas em cada nível.
- `ai-profiles.yaml`: capacidade, ferramentas e restrições por agente.

As regras centrais são:

- mudanças destrutivas, produção, segredos e merge nunca são presumidos;
- requisitos e solução exigem aprovação quando alteram escopo, contrato ou arquitetura;
- implementação autônoma só começa com tarefa pronta e critério verificável;
- nenhuma tarefa é concluída sem evidência proporcional ao risco;
- falhas não são escondidas: risco residual e validação ausente devem ser registrados.

Veja [docs/governance.md](docs/governance.md) e [configs/autonomy-levels.yaml](configs/autonomy-levels.yaml).

## Tools e integrações

`tools/catalog.yaml` registra as categorias de ferramentas e suas políticas. Scripts determinísticos ficam em `tools/scripts/`:

```bash
npm run validate
npm run spec:new -- checkout-expresso "Checkout expresso"
```

Integrações MCP de workspace são declaradas em `kiro/settings/mcp.json`:

- `jira`: Atlassian MCP v2 remoto, autenticado por OAuth no navegador.
- `github`: GitHub Remote MCP, autenticado pela variável `GITHUB_PERSONAL_ACCESS_TOKEN`.

O arquivo `mcp.json` é **local e não vai para o repositório** (já coberto pelo `.gitignore`). O repositório inclui `kiro/settings/mcp.sample.json` como referência. Para ativar os MCPs após clonar:

```bash
cp kiro/settings/mcp.sample.json kiro/settings/mcp.json
```

Edite `mcp.json` conforme necessário. A estrutura esperada é:

```json
{
  "mcpServers": {
    "nome-do-servidor": {
      "url": "https://endpoint-do-mcp",
      "disabled": false,
      "autoApprove": []
    }
  }
}
```

Nunca coloque tokens ou segredos diretamente no arquivo. Use variáveis de ambiente expandidas pelo Kiro, como `"Bearer ${GITHUB_PERSONAL_ACCESS_TOKEN}"`. O validador rejeita tokens hardcoded com prefixos conhecidos (`ghp_`, `github_pat_`) e bloqueia `autoApprove: ["*"]`.

Nenhuma ferramenta externa é autoaprovada. O GitHub usa apenas os toolsets `context`, `issues`, `pull_requests` e `repos`, com lockdown habilitado. Nunca versione tokens.

No PowerShell, defina o token apenas para a sessão que iniciará o Kiro:

```powershell
$env:GITHUB_PERSONAL_ACCESS_TOKEN = Read-Host "GitHub token"
kiro .
```

No Linux ou macOS:

```bash
read -s GITHUB_PERSONAL_ACCESS_TOKEN
export GITHUB_PERSONAL_ACCESS_TOKEN
kiro .
```

O Kiro pedirá aprovação para expandir a variável de ambiente. Prefira um fine-grained PAT limitado aos repositórios e permissões necessários. Veja [docs/integrations.md](docs/integrations.md).

## Hooks

`kiro/hooks/quality-gates.json` contém dois hooks compatíveis com o formato v1 do Kiro:

- validação determinística da plataforma após alterações em arquivos gerenciados;
- verificação de evidências ao concluir uma tarefa de spec.

O hook não substitui CI. Ele antecipa feedback dentro do IDE.

## Estrutura

```text
aisdlc/
  README.md
  configs/
  docs/
  kiro/                     # fonte de verdade
    agents/
    hooks/
    settings/
    skills/
    specs/
    steering/
  templates/
  tools/
    scripts/
  .kiro -> kiro             # link local, ignorado pelo Git
```

## Spec piloto

`kiro/specs/platform-bootstrap/` demonstra o ciclo completo aplicado à própria fundação do AISDLC. Ela contém requisitos, design, tarefas concluídas e evidências de validação, servindo como exemplo para as próximas demandas.

## Evolução recomendada

1. Revisar o fluxo e adaptar nomes, gates e níveis de autonomia ao processo real do time.
2. Configurar MCPs usados pelo time, como repositório, backlog e documentação.
3. Criar a primeira spec de produto com `npm run spec:new`.
4. Executá-la com o `sdlc-orchestrator` e registrar onde houve atrito.
5. Transformar padrões recorrentes em novas skills ou validações determinísticas.

## Referências do Kiro

- [Custom Agents](https://kiro.dev/docs/cli/custom-agents/creating/)
- [Agent Skills](https://kiro.dev/docs/skills/)
- [Steering](https://kiro.dev/docs/steering/)
- [Specs](https://kiro.dev/docs/specs/)
- [Hooks](https://kiro.dev/docs/hooks/)
- [MCP](https://kiro.dev/docs/mcp/configuration/)
- [Atlassian MCP](https://support.atlassian.com/atlassian-ai-gateway/docs/get-started-with-the-atlassian-remote-mcp-server/)
- [GitHub MCP Server](https://github.com/github/github-mcp-server)
