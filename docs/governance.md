# Governança

## Classificação de risco

| Risco | Exemplos | Gate mínimo |
| --- | --- | --- |
| Baixo | documentação, teste isolado, refatoração interna pequena | validação automática |
| Médio | comportamento de feature, dependência, alteração de API interna | plano e revisão |
| Alto | autenticação, dados pessoais, migração, contrato público, infraestrutura | aprovação humana antes da implementação |
| Crítico | produção, segredos, exclusão de dados, política de acesso, merge protegido | autorização explícita no momento da ação |

## Invariantes

- Um agente não declara sucesso sem informar o que foi validado.
- Ausência de teste, acesso ou ferramenta deve aparecer como limitação, não como aprovação implícita.
- Alterações existentes no workspace são preservadas e consideradas parte do contexto.
- Nenhum agente expõe ou persiste segredos em arquivos, logs, prompts ou evidências.
- Operações destrutivas precisam de alvo exato, impacto conhecido e autorização compatível.
- Produção e merge não fazem parte da autonomia padrão do workspace.

## Aprovações

Uma aprovação deve registrar objeto, responsável, decisão, data e ressalvas no artefato correspondente. Aprovação de um documento não autoriza automaticamente uma ação operacional posterior.

## Exceções

Uma exceção deve conter justificativa, prazo, risco aceito, responsável e ação de regularização. Exceções permanentes devem virar uma decisão arquitetural ou alteração explícita de política.

## Auditoria mínima

Para cada entrega, preserve:

- intenção e critérios de aceite;
- decisões e alternativas relevantes;
- tarefas executadas;
- comandos e resultados de validação;
- achados de revisão e riscos aceitos;
- plano de release e rollback.

