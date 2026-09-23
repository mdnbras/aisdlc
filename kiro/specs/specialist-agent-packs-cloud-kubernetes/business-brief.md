# Business Brief: Especialistas AWS e Kubernetes

- **Spec:** `specialist-agent-packs-cloud-kubernetes`
- **Estado:** release-ready
- **Criado em:** 2026-09-23
- **Responsável:** mantenedor do AISDLC

## Problema

O AISDLC precisa criar e revisar plataformas AWS e Kubernetes sem misturar decisões de cloud, contratos de cluster e implementação Terraform, e sem permitir operações mutáveis fora dos gates.

## Objetivos

- `OBJ-001`: entregar `ai-aws` alinhado aos seis pilares AWS Well-Architected.
- `OBJ-002`: integrar `ai-aws` e `ai-terraform` para recursos e módulos.
- `OBJ-003`: entregar `ai-kubernetes` para EKS e clusters on-premises.
- `OBJ-004`: compor AWS, Kubernetes e Terraform com ownership explícito.
- `OBJ-005`: produzir diagrama visual da arquitetura agentica AISDLC.

## Não objetivos

- Executar deploy, apply, kubectl mutável ou mudança em contas/clusters.
- Impor cloud, distribuição Kubernetes, GitOps ou módulos universais.
- Publicar remotes antes da revisão do usuário.

## Métricas

- Pacotes válidos, detectáveis e instaláveis sem colisão.
- AWS avalia os seis pilares e delega HCL/state ao Terraform.
- Kubernetes distingue EKS e on-premises e delega integrações AWS/Terraform.
- Quality runners executam somente validações locais e configuradas.
