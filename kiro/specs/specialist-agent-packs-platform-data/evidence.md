# Evidências: Especialistas de Plataforma e Dados

## Estado

- **Resultado:** passed-with-external-pending-steps
- **Ambiente:** Windows, PowerShell, Node.js v22.21.1
- **Data:** 2026-09-23

## Evidências

### EVD-001 - Contratos dos pacotes

- **Comando:** `npm run validate` em cada novo repositório.
- **Resultado:** quatro pacotes válidos; cada um com 7 agents, 8 skills e 1 arquivo de hooks.
- **Cobre:** AC-001 a AC-015.

### EVD-002 - Comportamento sem projeto alvo

- **Comando:** `npm run quality` em cada repositório de pacote.
- **Resultado:** encerramento controlado com aviso; nenhuma operação externa ou ferramenta global executada.
- **Cobre:** AC-005, AC-009, AC-011, AC-014, AC-015.

### EVD-003 - Registry

- **Comando:** `npm run specialist -- list`.
- **Resultado:** sete especialistas disponíveis, incluindo os quatro desta spec.
- **Cobre:** AC-016.

### EVD-004 - Composição conjunta

- **Procedimento:** detectar os quatro domínios em fixture híbrida, instalar todos, executar os quatro runners, verificar checksums e desinstalar em sequência.
- **Resultado:** somente os quatro especialistas esperados foram detectados; 26 arquivos por pacote, 104 no total, zero divergências; todos os runners passaram e a remoção foi concluída sem colisões.
- **Cobre:** AC-017, AC-018.

### EVD-005 - Correção de falsos positivos web

- **Resultado:** `package.json` isolado deixou de detectar React e Angular; esses especialistas agora exigem dependência ou artefato característico.
- **Cobre:** AC-017.

## Pendências externas

- Publicação e clone dos repositórios remotos.
- Delegação real no Kiro IDE.
- Quality gates contra projetos reais e credenciais controladas.

## Decisão de revisão

- **Decisão:** ready-for-user-review
- **Responsável:** usuário
- **Data:** TBD
