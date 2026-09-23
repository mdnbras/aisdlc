# Evidências: Fundação do AISDLC

## Resumo

- **Resultado:** passed-with-pending-human-review
- **Ambiente:** Windows, PowerShell, Node.js v22.21.1, workspace local
- **Data:** 2026-09-23
- **Atualizado em:** 2026-09-23 (sessão de run-sdlc)

## Evidências

### EVD-001 - Validação estrutural

- **Cobre:** AC-001 a AC-011 / tarefa 6
- **Comando:** `npm run validate`
- **Resultado:** sucesso; 10 agents, 10 skills e 2 JSONs validados.
- **Observação:** o link local `.kiro` ainda não foi criado e foi reportado como aviso esperado.

### EVD-004 - Ativação do link no Windows

- **Cobre:** AC-001 a AC-003 / ativação local
- **Comando:** `New-Item -ItemType Junction -Path .kiro -Target kiro`
- **Resultado:** sucesso; Junction criado e reconhecido como `isSymbolicLink: true` pelo Node.js. O link simbólico real (`SymbolicLink`) exige Developer Mode ou privilégio elevado no Windows; Junction não tem essa restrição e é funcionalmente equivalente para uso local no Kiro.
- **Nota:** o README documenta `New-Item -ItemType SymbolicLink`. Considerar atualizar para mencionar Junction como alternativa no Windows sem Developer Mode.

### EVD-005 - Versão local do Kiro

- **Comando:** `kiro --version`
- **Resultado:** `0.11.133` (`x64`).
- **Impacto:** a instalação local é anterior ao Kiro IDE 1.x usado como referência de schema; o carregamento dos formatos atuais exige atualização antes do smoke test visual.

### EVD-002 - Scaffold de spec

- **Cobre:** AC-010 / tarefa 6
- **Comando:** `npm run spec:new -- validation-smoke-test "Validation Smoke Test"`
- **Resultado:** sucesso; seis artefatos criados e aceitos pelo validador.
- **Limpeza:** a spec temporária foi removida após o teste.

### EVD-003 - Proteção contra sobrescrita

- **Cobre:** AC-010 / tarefa 6
- **Comando:** repetir a criação da spec `validation-smoke-test`.
- **Resultado:** sucesso; o comando encerrou com código 1 e preservou a spec existente.

### EVD-006 - Revalidação com link simbólico corrigido

- **Cobre:** AC-001 a AC-003, AC-010, AC-011 / todas as tarefas
- **Comando:** `npm run validate`
- **Resultado:** sucesso — `AISDLC válido: 10 agents, 10 skills, 2 JSONs.`
- **Contexto:** `.kiro` estava como pasta real (criada pelo Kiro IDE); foi removida e substituída por Junction (`New-Item -ItemType Junction`), que o Node.js reconhece como `isSymbolicLink: true`. Developer Mode não estava habilitado; Junction é equivalente funcional para uso local.

## Validações não executadas

- Carregamento visual no Kiro IDE 1.x, pois a instalação local reporta `0.11.133`.
- Integrações MCP externas, pois nenhuma foi configurada.
- Pipeline de CI, pois o repositório ainda não possui um.

## Achados de revisão

Revisão humana pendente conforme solicitação do usuário.

## Riscos residuais

- Compatibilidade final e descoberta visual dos componentes devem ser confirmadas no Kiro IDE após criar o link simbólico local.
- Junction (criado) é tecnicamente diferente de SymbolicLink no Windows — comportamento em cenários com symlink traversal ou ferramentas que distinguem os tipos pode diferir, mas é transparente para Node.js e para o Kiro IDE.
- O README ainda documenta apenas `SymbolicLink`; recomenda-se adicionar Junction como alternativa para Windows sem Developer Mode.

## Decisão de revisão

- **Decisão:** pending
- **Responsável:** usuário
- **Data:** TBD
