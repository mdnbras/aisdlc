# Release: Especialistas AWS e Kubernetes

## Estado

`ready-for-review`

## Resumo

Adiciona especialistas AWS e Kubernetes e colaboração explícita com Terraform, preservando ownership e gates de infraestrutura.

## Ativação

1. Detectar o projeto e revisar companions recomendados.
2. Instalar somente os pacotes necessários.
3. Revisar contexto de conta, cluster, backend e ambiente.
4. Delegar decisões por domínio e retornar ao AISDLC para aprovação.
5. Validar localmente; deploy/apply permanecem no pipeline aprovado.

## Rollback

Desinstale cada pacote com `npm run specialist -- uninstall <pacote> --target <projeto>`. Arquivos alterados localmente são protegidos por checksum.
