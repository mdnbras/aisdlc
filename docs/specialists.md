# Agentes Especialistas

Especialistas são pacotes Kiro independentes mantidos em repositórios próprios. Cada pacote possui agentes, skills, steering, hooks, ferramentas e um `specialist.json` que declara como seus componentes são compostos no workspace consumidor.

## Por que compor

Abrir o especialista como segunda raiz do workspace ajuda na indexação, mas hooks de arquivo permanecem limitados ao root onde foram definidos. A composição instala os componentes no `.kiro` do projeto alvo, fazendo com que hooks e contexto atuem sobre o código correto.

## Ciclo de uso

```text
detectar stack -> selecionar pacote -> instalar no .kiro do alvo
-> delegar ao subagente -> validar -> atualizar ou remover pacote
```

## Registro

`specialists/registry.json` é o catálogo do AISDLC:

- `available`: pacote implementado e instalável.
- `planned`: reservado no roadmap, ainda sem fonte instalável.
- `deprecated`: mantido apenas para migração.

O registro contém capacidade e sinais de detecção. A origem local pode ser substituída por `--source` até que o repositório remoto seja publicado.

## Comandos

```powershell
npm run specialist -- list
npm run specialist -- detect --target C:\MyPath\meu-servico
npm run specialist -- install ai-kotlin-backend --target C:\MyPath\meu-servico
npm run specialist -- install ai-web-react --target C:\MyPath\meu-app-react
npm run specialist -- install ai-web-angular --target C:\MyPath\meu-app-angular
npm run specialist -- install ai-kotlin-android --target C:\MyPath\meu-app-android
npm run specialist -- install ai-database --target C:\MyPath\meu-servico
npm run specialist -- install ai-sre --target C:\MyPath\meu-servico
npm run specialist -- install ai-terraform --target C:\MyPath\minha-infra
npm run specialist -- uninstall ai-kotlin-backend --target C:\MyPath\meu-servico
```

Para usar outro clone do pacote:

```powershell
npm run specialist -- install ai-kotlin-backend --source C:\repos\ai-kotlin-backend --target C:\MyPath\meu-servico
```

O instalador nunca sobrescreve colisões ou arquivos instalados que foram editados localmente. `--force` existe para atualização ou remoção intencional, e deve ser usado somente após revisar as diferenças.

## Layout de um pacote

```text
ai-web-react/
  specialist.json
  .kiro/
    agents/
    skills/
    steering/
    hooks/
    specialists/ai-web-react/tools/
```

Agents são instalados em `.kiro/agents/specialists/<pacote>/`, usando o suporte do Kiro a agentes aninhados. Skills mantêm nomes globalmente únicos. Steering e hooks recebem prefixo do pacote. Ferramentas auxiliares ficam sob `.kiro/specialists/<pacote>/`.

## Delegação

O `sdlc-orchestrator` possui a ferramenta `subagent` e só pode delegar para agentes cujo nome começa com `specialists/`. Cada pacote expõe um orquestrador próprio e devolve o controle ao AISDLC para gates, evidências e release.

Subagentes não são confiados automaticamente; o Kiro continua pedindo aprovação conforme suas permissões.

## Pacotes disponíveis

- `ai-kotlin-backend`: disponível.
- `ai-web-react`: disponível.
- `ai-web-angular`: disponível.
- `ai-kotlin-android`: disponível.
- `ai-database`: disponível.
- `ai-sre`: disponível.
- `ai-terraform`: disponível.

Mais de um pacote pode ser instalado no mesmo workspace. Os namespaces dos agentes e os prefixos de steering e hooks evitam colisões, enquanto skills usam nomes exclusivos por stack.
