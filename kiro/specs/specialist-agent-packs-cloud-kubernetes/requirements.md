# Requisitos: Especialistas AWS e Kubernetes

## REQ-001 - AWS

- `AC-001`: possui agentes para arquitetura, segurança, rede, serviços, confiabilidade/custo e revisão.
- `AC-002`: steering cobre os seis pilares Well-Architected.
- `AC-003`: nenhuma ação mutável AWS é executada automaticamente.

## REQ-002 - Colaboração Terraform

- `AC-004`: AWS e Terraform declaram relação companion bidirecional.
- `AC-005`: AWS define requisitos e revisa; Terraform mantém HCL, providers, state e testes.
- `AC-006`: quality AWS reutiliza o runner Terraform quando instalado.

## REQ-003 - Kubernetes

- `AC-007`: cobre plataforma, workloads, rede/segurança, confiabilidade, EKS, on-premises e revisão.
- `AC-008`: EKS integra AWS e Terraform sem misturar ownership.
- `AC-009`: on-premises cobre control plane, etcd, PKI, CNI/CSI, load balancing, upgrades e recuperação.
- `AC-010`: operações mutáveis de cluster exigem gate.

## REQ-004 - Integração AISDLC

- `AC-011`: registry detecta AWS em Terraform/CDK/SAM e Kubernetes em Helm/Kustomize/manifests.
- `AC-012`: companions são informados, nunca instalados automaticamente.
- `AC-013`: os três pacotes coexistem com checksums íntegros.
- `AC-014`: diagrama representa núcleo, fluxo, especialistas, MCPs e gates.

