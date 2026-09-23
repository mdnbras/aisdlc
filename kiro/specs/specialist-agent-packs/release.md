# Release: Pacotes de Agentes Especialistas

## Estado

`ready-for-review`

## Resumo

Adiciona arquitetura de pacotes especialistas ao AISDLC e entrega `ai-kotlin-backend`, `ai-web-react` e `ai-web-angular` como pacotes independentes.

## Impacto

O núcleo ganha registro, detecção, composição e delegação. Nenhum pacote é instalado automaticamente em projetos existentes. React e Angular podem coexistir no mesmo workspace sem compartilhar contexto específico de framework.

## Ativação

1. Revisar e publicar os três repositórios especialistas em `C:\MyPath`.
2. Atualizar suas URLs em `specialists/registry.json`.
3. Atualizar o Kiro e ativar `.kiro` no projeto consumidor.
4. Executar `npm run specialist -- detect --target <projeto>`.
5. Instalar o pacote recomendado e validar `/config` no Kiro.
6. Delegar uma tarefa real ao orquestrador correspondente à stack.

## Rollback

Execute `npm run specialist -- uninstall <pacote> --target <projeto>`. O comando remove apenas arquivos gerenciados e preserva alterações locais salvo `--force` explícito.

## Aprovação

- **Decisão:** ready-for-user-review
- **Responsável:** usuário
- **Data:** TBD
