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
npm run specialist -- detect --target C:\Github\meu-servico
npm run specialist -- install ai-kotlin-backend --target C:\Github\meu-servico
npm run specialist -- uninstall ai-kotlin-backend --target C:\Github\meu-servico
```

Para usar outro clone do pacote:

```powershell
npm run specialist -- install ai-kotlin-backend --source C:\repos\ai-kotlin-backend --target C:\Github\meu-servico
```

O instalador nunca sobrescreve colisões ou arquivos instalados que foram editados localmente. `--force` existe para atualização ou remoção intencional, e deve ser usado somente após revisar as diferenças.

## Layout de um pacote

```text
ai-kotlin-backend/
  specialist.json
  .kiro/
    agents/
    skills/
    steering/
    hooks/
    specialists/ai-kotlin-backend/tools/
```

Agents são instalados em `.kiro/agents/specialists/<pacote>/`, usando o suporte do Kiro a agentes aninhados. Skills mantêm nomes globalmente únicos. Steering e hooks recebem prefixo do pacote. Ferramentas auxiliares ficam sob `.kiro/specialists/<pacote>/`.

## Delegação

O `sdlc-orchestrator` possui a ferramenta `subagent` e só pode delegar para agentes cujo nome começa com `specialists/`. O pacote Kotlin expõe um orquestrador próprio e agentes focados em arquitetura, API, persistência, testes e revisão.

Subagentes não são confiados automaticamente; o Kiro continua pedindo aprovação conforme suas permissões.

## Roadmap

- `ai-kotlin-backend`: disponível.
- `ai-web-react`: planejado.
- `ai-web-angular`: planejado.

