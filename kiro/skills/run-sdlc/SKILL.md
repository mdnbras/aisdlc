---
name: run-sdlc
description: Conduza uma demanda ou spec pelo ciclo completo do AISDLC. Use quando o usuário pedir para iniciar, continuar, executar ou concluir uma entrega de ponta a ponta.
---

# Executar o SDLC

1. Leia `docs/development-flow.md`, `configs/workflow.yaml` e `configs/autonomy-levels.yaml`.
2. Localize a spec informada. Se não existir, crie-a com `npm run spec:new -- <slug> "<título>"`.
3. Quando houver chave Jira ou referência GitHub, leia o contexto pelos MCPs e registre os vínculos no business brief.
4. Determine o estado pelos artefatos e checkboxes existentes.
5. Identifique a primeira etapa cuja Definition of Done não está atendida.
6. Ative a skill dessa etapa e complete tudo que estiver dentro da autonomia atual.
7. Aplique o gate. Se depender de decisão humana, registre `pending`, faça uma pergunta objetiva e não presuma aprovação.
8. Continue pelas próximas etapas enquanto entradas e gates permitirem.
9. Sincronize estado externo somente após o gate correspondente e registre a evidência.
10. Execute `npm run validate` ao alterar a plataforma.

## Saída

Informe:

- spec e estado alcançado;
- artefatos criados ou alterados;
- validações executadas;
- decisões e riscos pendentes;
- próxima ação ou gate.

Nunca execute merge ou deploy apenas porque a spec chegou a `release-ready`.
