# Release: Pacotes de Agentes Especialistas

## Estado

`ready-for-review`

## Resumo

Adiciona arquitetura de pacotes especialistas ao AISDLC e entrega `ai-kotlin-backend` como primeiro pacote independente.

## Impacto

O núcleo ganha registro, detecção, composição e delegação. Nenhum pacote é instalado automaticamente em projetos existentes. React e Angular aparecem apenas como roadmap.

## Ativação

1. Revisar e publicar `C:\Github\ai-kotlin-backend`.
2. Atualizar sua URL em `specialists/registry.json`.
3. Atualizar o Kiro e ativar `.kiro` no projeto consumidor.
4. Executar `npm run specialist -- detect --target <projeto>`.
5. Instalar o pacote recomendado e validar `/config` no Kiro.
6. Delegar uma tarefa real ao orquestrador Kotlin.

## Rollback

Execute `npm run specialist -- uninstall ai-kotlin-backend --target <projeto>`. O comando remove apenas arquivos gerenciados e preserva alterações locais salvo `--force` explícito.

## Aprovação

- **Decisão:** ready-for-user-review
- **Responsável:** usuário
- **Data:** TBD

