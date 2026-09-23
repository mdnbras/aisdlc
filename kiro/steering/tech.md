---
inclusion: always
---

# Tecnologia

## Runtime

- Kiro IDE 1.x ou Kiro CLI 3.x.
- Node.js 18 ou superior para scripts locais determinísticos.
- Markdown para agentes, steering, skills, specs e documentação.
- JSON para hooks e MCP.
- YAML para contratos de governança do AISDLC.

## Dependências

Prefira APIs nativas e ferramentas já presentes no projeto. Uma nova dependência precisa resolver complexidade real, ter manutenção adequada e ser registrada no design quando afetar runtime, segurança ou distribuição.

## Portabilidade

- Não assuma um shell único em instruções de produto.
- Scripts de automação compartilhados devem ser portáveis quando viável.
- Caminhos persistidos no repositório usam `/`.
- Segredos nunca entram em arquivos versionados.

## Modelos

Agentes herdam a seleção de modelo do Kiro. Escolha concreta de modelo é configuração do ambiente; o repositório descreve apenas capacidade e nível de raciocínio esperados.

