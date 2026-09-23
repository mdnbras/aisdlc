# Design: Especialistas de Plataforma e Dados

## Arquitetura

Cada especialista é um repositório independente com o contrato de exports do AISDLC. Na composição, agentes entram em `.kiro/agents/specialists/<pacote>`, skills mantêm nomes globais exclusivos e steering/hooks recebem prefixo do pacote.

## Detecção

O registry combina caminhos conhecidos, dependências, sufixos e nomes de arquivo. O compositor ganhou busca recursiva limitada a seis níveis e ignora `.git`, `.kiro`, build outputs e dependências.

## Quality runners

- Android: executa somente Gradle Wrapper com tarefas configuradas.
- Database: executa scripts de banco declarados no projeto ou comandos explicitamente configurados.
- SRE: executa scripts operacionais declarados ou comandos explicitamente configurados.
- Terraform: executa fmt; validate somente após init existente ou init sem backend opt-in; testes são opt-in.

## Decisões

### DEC-001 - Especialistas separados

Os domínios possuem risco, vocabulário e ferramentas distintos. Separação reduz contexto irrelevante e permite evolução independente.

### DEC-002 - Operação segura por padrão

Runners validam artefatos locais e nunca executam produção, migração, apply ou state mutation. Operações externas permanecem em gates humanos.

### DEC-003 - Detecção recursiva limitada

Arquivos relevantes frequentemente vivem em módulos e diretórios operacionais. A busca limitada melhora cobertura sem varrer caches ou árvores ilimitadas.

