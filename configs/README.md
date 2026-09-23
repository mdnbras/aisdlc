# Configurações

Estes arquivos são contratos de governança consumidos pelos agentes como recursos. Eles não substituem as configurações internas do Kiro.

- `workflow.yaml` define a máquina de estados e os donos de cada etapa.
- `autonomy-levels.yaml` define limites progressivos de ação.
- `ai-profiles.yaml` descreve capacidades esperadas sem fixar um modelo comercial.

Mudanças nesses contratos devem ser refletidas no steering e validadas com `npm run validate`.

