# Integrações MCP

O AISDLC usa dois servidores MCP remotos no workspace: Jira pelo Atlassian MCP v2 e GitHub pelo GitHub Remote MCP. A configuração canônica está em `kiro/settings/mcp.json` e é carregada pelos agentes com `includeMcpJson: true`. Os perfis listam `@jira` e `@github` explicitamente, evitando herdar automaticamente servidores adicionados no futuro.

## Jira

### Configuração

- Servidor: `jira`.
- Endpoint: `https://mcp.atlassian.com/v2/mcp`.
- Autenticação: OAuth 2.1 conduzido pelo Kiro no navegador.
- Escopo efetivo: permissões do usuário e políticas da organização Atlassian.

Ao abrir o workspace, acesse o painel MCP do Kiro, conecte `jira` e conclua o login. Um administrador Atlassian pode precisar permitir o domínio ou habilitar o acesso ao MCP.

Para manter o escopo do AISDLC, use o servidor apenas para Jira, mesmo que a conta conectada também exponha outros produtos Atlassian. Restrinja permissões de escrita no Atlassian Admin quando o time desejar operação somente leitura.

## GitHub

### Configuração

- Servidor: `github`.
- Endpoint: `https://api.githubcopilot.com/mcp/`.
- Autenticação: bearer token obtido de `GITHUB_PERSONAL_ACCESS_TOKEN`.
- Toolsets: `context`, `issues`, `pull_requests` e `repos`.
- Lockdown: habilitado como camada adicional contra conteúdo malicioso.

Crie um fine-grained personal access token restrito aos repositórios necessários. Conceda somente permissões compatíveis com o fluxo pretendido, normalmente leitura de metadata e contents, além de issues e pull requests quando o agente precisar atualizá-los.

No PowerShell, inicie o Kiro na mesma sessão que contém a variável:

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

O valor não deve ser escrito em `mcp.json`, arquivos `.env`, specs, logs ou evidências. O Kiro solicitará aprovação para expandir a variável na primeira utilização.

## Mapeamento do SDLC

| Etapa | Jira | GitHub |
| --- | --- | --- |
| Refinamento | Ler demanda, comentários e contexto | Consultar issue relacionada quando existir |
| Requisitos | Vincular critérios e registrar decisão aprovada | Referenciar discussão técnica relevante |
| Design | Registrar links e dependências | Consultar código, histórico e contratos |
| Planejamento | Relacionar tarefas à work item | Relacionar issues e dependências |
| Implementação | Atualizar status após gate | Consultar repositório e preparar mudança |
| Validação | Registrar resumo aprovado | Ler checks e resultados do pull request |
| Revisão | Vincular decisão | Ler diff, review e checks; preparar PR quando autorizado |
| Release | Atualizar status após autorização | Preparar release ou PR; publicar somente com autorização específica |

## Política de escrita

Leituras podem ocorrer dentro do contexto da demanda. Criar, editar, comentar, transicionar, fechar, mergear ou publicar altera estado externo e requer:

1. alvo exato e vínculo com a spec;
2. conteúdo ou ação apresentado de forma compreensível;
3. gate correspondente resolvido;
4. confirmação do Kiro, pois `autoApprove` permanece vazio;
5. registro do resultado em `evidence.md`.

Merge, release e alterações em produção continuam exigindo autorização específica no momento da ação.

## Verificação

1. Abra o painel MCP do Kiro.
2. Confirme que `jira` e `github` aparecem conectados.
3. Faça uma leitura de baixo risco em cada servidor.
4. Verifique se uma escrita solicita confirmação.
5. Execute `npm run validate` para conferir a configuração versionada.

## Diagnóstico

- Jira sem autenticar: reconecte o servidor e confira políticas do Atlassian Admin.
- GitHub com `401`: confirme variável, validade, escopo e acesso do token ao repositório.
- Variável não expandida: aprove `GITHUB_PERSONAL_ACCESS_TOKEN` em `Mcp Approved Env Vars` nas configurações do Kiro.
- Ferramenta ausente: confirme os toolsets enviados no header `X-MCP-Toolsets`.
- Escrita indisponível: confira permissões do usuário/token e políticas organizacionais antes de ampliar qualquer escopo.
