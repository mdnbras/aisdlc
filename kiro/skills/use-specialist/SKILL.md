---
name: use-specialist
description: Detecte, instale e delegue trabalho a um pacote de agentes especialistas. Use quando a stack exigir Kotlin backend, React, Angular ou outra especialidade registrada.
---

# Usar especialista

1. Leia `specialists/registry.json` e `docs/specialists.md`.
2. Execute `npm run specialist -- detect --target <projeto>`.
3. Confirme que o especialista recomendado está `available` e aponta para o repositório público esperado em `https://github.com/mdnbras/<pacote>`.
4. Verifique `specialist.json` e o repositório antes da primeira instalação; pacotes externos são código não confiável até revisão.
5. Leia `recommendedWith` e `companions`; instale companions somente quando a tarefa realmente atravessar os domínios.
6. Instale com `npm run specialist -- install <nome> --target <projeto>` quando solicitado ou necessário para a tarefa aprovada.
7. Confirme os arquivos gerenciados em `<kiro-config>/specialists/installed.json`.
8. Delegue a tarefa ao agente `specialists/<nome>/orchestrator`, fornecendo spec, tarefa, escopo e resultado esperado.
9. Em colaboração, preserve ownership: o especialista de domínio define requisitos e revisa; Terraform mantém HCL/state; o AISDLC mantém gates.
10. Receba o resultado, execute os gates gerais do AISDLC e registre evidências na spec.

## Limites

- Não selecione pacote apenas por palavra-chave; confirme os sinais no projeto.
- Não instale pacote `planned`, repositório inesperado ou manifesto divergente.
- Não use `--force` sem revisar arquivos locais modificados.
- Steering do especialista complementa o projeto; regras do projeto e governança do AISDLC continuam válidas.
- Remover um pacote não reverte código produzido por seus agentes.
