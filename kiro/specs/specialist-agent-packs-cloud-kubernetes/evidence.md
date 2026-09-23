# Evidências: Especialistas AWS e Kubernetes

## Estado

- **Resultado:** passed-with-external-pending-steps
- **Ambiente:** Windows, PowerShell, Node.js v22.21.1
- **Data:** 2026-09-23

## Evidências

### EVD-001 - Contratos

- `ai-aws`: válido com 7 agents, 8 skills e 1 hook file.
- `ai-kubernetes`: válido com 8 agents, 8 skills e 1 hook file.
- `ai-terraform`: válido após integração bidirecional.

### EVD-002 - Composição

- **Procedimento:** detectar AWS, Terraform e Kubernetes em fixture híbrida; instalar os três; executar runners AWS/Kubernetes com companion Terraform; verificar checksums e remover os pacotes.
- **Resultado:** somente os três especialistas esperados foram detectados; 81 arquivos instalados, zero divergências; scripts e runner Terraform encadeado passaram sem operação mutável.

### EVD-003 - Diagrama

- **Artefato:** `docs/assets/aisdlc-agentic-architecture.png`.
- **Resultado:** imagem 16:9 gerada, correção ortográfica aplicada, copiada para o workspace e inspecionada em alta resolução.

## Decisão de revisão

- **Decisão:** ready-for-user-review
- **Responsável:** usuário
- **Data:** TBD

## Pendências externas

- Publicação dos remotes.
- Execução em contas AWS e clusters controlados.
- Delegação real no Kiro IDE.
