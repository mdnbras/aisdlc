# Design: Especialistas AWS e Kubernetes

## Ownership

- AISDLC: fluxo SDLC, requisitos, autonomia, gates, evidências e release.
- AWS: serviços, contas, regiões, IAM, rede, Well-Architected e operação cloud.
- Kubernetes: clusters, add-ons, policies, workloads e lifecycle.
- Terraform: módulos, HCL, providers, state, testes e plan.

## Colaboração

Os manifestos usam `companions`; o registry usa `recommendedWith`. Orquestradores podem delegar para namespaces companions quando todos estiverem instalados. O instalador apenas informa recomendações.

## Detecção

Além de arquivos e dependências, o compositor lê arquivos pequenos e procura padrões registrados. Isso identifica provider AWS em HCL e objetos Kubernetes em YAML, com profundidade e diretórios ignorados limitados.

## Segurança

Runners não executam AWS CLI mutável, Terraform apply ou kubectl/Helm mutável. Quality AWS e Kubernetes podem encadear a validação local do Terraform.

