# Fluxo de Desenvolvimento

Este documento define o contrato operacional do AISDLC. Uma etapa só avança quando suas saídas obrigatórias existem, os critérios de conclusão foram verificados e o gate aplicável foi resolvido.

## Estados de uma demanda

`intake -> refining -> specified -> designed -> planned -> implementing -> validating -> reviewing -> documenting -> release-ready -> done`

Estados excepcionais:

- `blocked`: existe impedimento externo ou decisão pendente.
- `rework`: uma validação ou revisão exige retorno a uma etapa anterior.
- `cancelled`: a demanda foi encerrada por decisão humana registrada.

## 1. Intake e refinamento de negócio

**Entrada:** ideia, problema, oportunidade, incidente ou feedback.

**Responsável:** `business-refiner`.

**Saída:** `business-brief.md` com problema, contexto, usuários, objetivo, não objetivos, hipóteses, métricas, restrições, riscos e perguntas abertas.

**Definition of Ready:** a origem e o responsável pela demanda são conhecidos.

**Definition of Done:** o problema está separado da solução, o resultado desejado é mensurável e incertezas relevantes estão visíveis.

**Gate:** aprovação humana quando objetivo, prioridade, custo ou política de negócio ainda não estão definidos.

## 2. Especificação de produto

**Entrada:** business brief suficientemente estável.

**Responsável:** `product-analyst`.

**Saída:** `requirements.md` com histórias, requisitos, critérios de aceite, regras, casos de borda e requisitos não funcionais.

**Definition of Ready:** objetivo, público e limites de escopo estão claros.

**Definition of Done:** cada requisito é testável, tem identificador estável e mantém vínculo com o objetivo de negócio.

**Gate:** aprovação humana para mudanças de escopo, comportamento público, compliance ou experiência crítica.

## 3. Desenho da solução

**Entrada:** requisitos aprovados ou explicitamente marcados como provisórios.

**Responsável:** `solution-architect`.

**Saída:** `design.md` com contexto, arquitetura, componentes, dados, interfaces, segurança, observabilidade, migração, alternativas e riscos.

**Definition of Ready:** requisitos funcionais e não funcionais relevantes existem.

**Definition of Done:** decisões importantes têm justificativa, impactos são conhecidos e a solução é verificável.

**Gate:** aprovação humana para nova tecnologia, contrato externo, migração irreversível, custo recorrente ou mudança arquitetural ampla.

## 4. Planejamento técnico

**Entrada:** design aprovado.

**Responsável:** `tech-lead`.

**Saída:** `tasks.md` com tarefas pequenas, dependências, critérios de conclusão e validações.

**Definition of Ready:** componentes afetados e estratégia de teste estão definidos.

**Definition of Done:** cada tarefa pode ser executada e validada isoladamente; dependências permitem paralelismo seguro.

**Gate:** aprovação humana antes de iniciar mudanças de alto risco ou grande abrangência.

## 5. Implementação autônoma

**Entrada:** tarefa pronta e aprovada conforme seu risco.

**Responsável:** `implementation-agent`.

**Saída:** código e configuração mínimos para satisfazer a tarefa, testes correspondentes e atualização do status em `tasks.md`.

**Definition of Ready:** objetivo, arquivos prováveis, critérios de aceite e comando de validação são conhecidos.

**Definition of Done:** comportamento implementado, verificações locais executadas e nenhuma alteração fora do escopo foi introduzida.

**Gate:** interromper antes de ações destrutivas, acesso a segredos, produção, mudança irreversível ou expansão material de escopo.

## 6. Validação

**Entrada:** implementação candidata.

**Responsável:** `test-agent`.

**Saída:** `evidence.md` com comandos, resultados, cobertura relevante, testes não executados e riscos residuais.

**Definition of Done:** critérios de aceite possuem evidência; falhas foram corrigidas ou explicitamente aceitas.

**Gate:** nenhuma mudança segue para release com falha crítica conhecida.

## 7. Revisão

**Entrada:** diff e evidências.

**Responsável:** `review-agent`.

**Saída:** achados priorizados e decisão `approved`, `approved-with-risks` ou `rework` registrada em `evidence.md`.

**Definition of Done:** revisão cobre correção, regressão, segurança, manutenibilidade, testes e aderência à spec.

**Gate:** achados bloqueantes levam a `rework`.

## 8. Documentação

**Entrada:** mudança validada e revisada.

**Responsável:** `documentation-agent`.

**Saída:** documentação de usuário, técnica e operacional atualizada no mesmo conjunto de mudanças.

**Definition of Done:** uma pessoa que não participou da implementação consegue operar e manter a mudança.

## 9. Preparação de release

**Entrada:** implementação aprovada e documentada.

**Responsável:** `release-agent`.

**Saída:** `release.md` com resumo, impacto, pré-requisitos, deploy, smoke test, observabilidade e rollback.

**Definition of Done:** versão é reproduzível, riscos são conhecidos e rollback é acionável.

**Gate:** deploy em ambiente compartilhado ou produção e merge na branch protegida dependem de autorização humana ou política externa explícita.

## Rastreabilidade

Use identificadores estáveis:

- Objetivos: `OBJ-001`.
- Requisitos: `REQ-001`.
- Critérios de aceite: `AC-001`.
- Decisões: `DEC-001`.
- Tarefas: numeração hierárquica do Kiro.
- Evidências: `EVD-001`.

Toda tarefa deve citar ao menos um requisito. Toda evidência deve citar o critério ou tarefa que comprova.

