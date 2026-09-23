# Release: Fundação do AISDLC

## Estado

`ready-for-review`

## Resumo

Primeira fundação operacional do AISDLC para Kiro IDE, com ciclo completo, governança e automações locais.

## Impacto

Adiciona somente documentação e configuração. Não altera ambiente externo e não possui dependências de runtime.

## Pré-requisitos

- Node.js 18 ou superior.
- Kiro IDE 1.x ou Kiro CLI 3.x.
- Link simbólico `.kiro` criado conforme README.

## Plano de ativação

1. Criar o link `.kiro`.
2. Executar `npm run validate`.
3. Abrir a raiz no Kiro.
4. Confirmar agents, steering, skills e hooks no painel.
5. Criar uma spec piloto de produto.

## Smoke test

- Selecionar `sdlc-orchestrator`.
- Executar `/run-sdlc` para uma demanda pequena.
- Confirmar criação e atualização dos artefatos da spec.

## Rollback

Remover somente o link simbólico `.kiro` desativa a plataforma no workspace sem apagar a fonte `kiro/`.

## Aprovação

- **Decisão:** pending-review
- **Responsável:** usuário
- **Data:** TBD
