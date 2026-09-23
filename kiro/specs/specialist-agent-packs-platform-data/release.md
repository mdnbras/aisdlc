# Release: Especialistas de Plataforma e Dados

## Estado

`ready-for-review`

## Resumo

Adiciona especialistas independentes para Android/Kotlin, bancos, SRE e Terraform, além de detecção recursiva de sinais tecnológicos.

## Ativação

1. Revisar os quatro repositórios irmãos.
2. Publicar e registrar URLs remotas.
3. Detectar stacks com `npm run specialist -- detect --target <projeto>`.
4. Instalar somente os pacotes necessários.
5. Revisar o `quality.json` composto antes da primeira execução em projeto real.
6. Delegar pelo `sdlc-orchestrator` e manter gates humanos de produção.

## Rollback

Execute `npm run specialist -- uninstall <pacote> --target <projeto>`. O compositor remove somente arquivos registrados e bloqueia alterações locais sem `--force`.
