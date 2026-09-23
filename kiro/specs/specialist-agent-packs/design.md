# Design: Pacotes de Agentes Especialistas

## Visão

O núcleo mantém um registro e um compositor. O pacote especialista mantém sua `.kiro` completa. Na instalação, exports são copiados para o contexto Kiro do projeto consumidor com namespace previsível. O estado da instalação registra origem, versão e SHA-256 de cada arquivo.

## Componentes

- `specialists/registry.json`: catálogo e detecção.
- `tools/scripts/specialist.mjs`: list, inspect, detect, install e uninstall.
- `kiro/skills/use-specialist`: procedimento de seleção e delegação.
- `sdlc-orchestrator`: parent agent com acesso restrito a subagentes `specialists/*`.
- `specialist.json`: contrato de exports de cada pacote.
- `<kiro-config>/specialists/installed.json`: estado local gerenciado.

## Composição

- Agents: `.kiro/agents/specialists/<pacote>/`.
- Skills: `.kiro/skills/<nome-globalmente-único>/`.
- Steering: arquivos diretos com prefixo do pacote.
- Hooks: arquivos diretos com prefixo do pacote.
- Runtime: `.kiro/specialists/<pacote>/`.

## Segurança e integridade

- Fonte externa deve ser revisada antes da primeira instalação.
- Colisão não gerenciada falha sem escrever.
- Atualização compara checksum da instalação anterior.
- Remoção verifica checksum e apaga apenas arquivos registrados.
- `--force` é explícito e não é usado automaticamente.
- Remover pacote não reverte código produzido por seus agentes.

## Multi-root

Multi-root é útil para indexação, mas hooks de arquivo são ligados ao root de origem. Por isso não é o mecanismo principal de ativação. A composição coloca hooks no root do projeto consumidor.

## Kotlin

O pacote não fixa Spring ou Ktor, nem Gradle ou Maven. Ele inspeciona a stack e reutiliza padrões locais. O quality runner escolhe wrapper e executa comandos configuráveis em `quality.json`.

## Web

React e Angular são pacotes separados, mas compartilham o mesmo contrato de composição. Cada quality runner detecta npm, pnpm, Yarn ou Bun e executa somente scripts declarados pelo projeto consumidor. O especialista React não fixa framework, roteador ou biblioteca de estado; o Angular respeita a versão e só usa APIs modernas quando suportadas pelo workspace.

## Decisões

### DEC-001 - Copiar exports com estado gerenciado

- **Alternativas:** Git submodule dentro de `.kiro`, multi-root ou configuração global.
- **Decisão:** composição determinística com checksums.
- **Consequência:** hooks funcionam no root correto e instalação é auditável; existe uma cópia local gerada.

### DEC-002 - Namespace de agentes

- **Decisão:** `specialists/<pacote>/<agente>`.
- **Consequência:** seleção e delegação são previsíveis e não colidem com agentes do projeto.

### DEC-003 - React e Angular separados

- **Decisão:** pacotes diferentes em vez de um especialista web genérico.
- **Consequência:** steering, build, testes e arquitetura podem evoluir sem condicionais excessivas.

### DEC-004 - Quality gates orientados pelo projeto

- **Decisão:** detectar o gerenciador e executar apenas scripts existentes no `package.json`.
- **Consequência:** o pacote não introduz ferramentas globais nem presume Vitest, Jest, Karma, Playwright ou Cypress.

## Aprovação

- **Decisão:** requested-by-user
- **Responsável:** usuário
- **Data:** 2026-09-23
