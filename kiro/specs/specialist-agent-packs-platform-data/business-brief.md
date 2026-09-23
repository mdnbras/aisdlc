# Business Brief: Especialistas de Plataforma e Dados

- **Spec:** `specialist-agent-packs-platform-data`
- **Estado:** release-ready
- **Criado em:** 2026-09-23
- **Responsável:** mantenedor do AISDLC
- **Jira:** não informado
- **GitHub:** repositórios remotos ainda não publicados

## Problema

O AISDLC precisa delegar trabalho de Android, bancos, confiabilidade e infraestrutura sem carregar permanentemente contexto profundo desses domínios e sem permitir que automação atravesse gates operacionais críticos.

## Objetivos

- `OBJ-001`: entregar `ai-kotlin-android` com cobertura do ciclo técnico de aplicações Android.
- `OBJ-002`: entregar `ai-database` com evolução e operação segura de dados.
- `OBJ-003`: entregar `ai-sre` com SLOs, observabilidade, incidentes e resiliência.
- `OBJ-004`: entregar `ai-terraform` com módulos, state, segurança e testes.
- `OBJ-005`: detectar e compor os quatro pacotes sem colisão no mesmo workspace.

## Não objetivos

- Executar mudanças de produção, banco, state ou infraestrutura sem aprovação.
- Fixar cloud, banco, vendor de observabilidade, arquitetura Android ou pipeline.
- Publicar os repositórios remotos nesta entrega local.

## Métricas de sucesso

- Cada pacote possui manifesto, 7 agentes, 8 skills, steering, hooks e quality runner.
- Detecção encontra sinais aninhados de cada domínio.
- Instalação conjunta preserva namespaces e checksums.
- Quality runners não inferem nem executam operações destrutivas.

## Aprovação

- **Decisão:** requested-by-user
- **Responsável:** usuário
- **Data:** 2026-09-23
