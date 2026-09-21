# Desafio Pior UX — Cadastro Normal™

Projeto acadêmico inspirado no conceito de **User Inyerface**, criado para estudar UI (Interface do Usuário) e UX (Experiência do Usuário) por meio da construção proposital de uma experiência ruim.

## Sobre o projeto

O usuário precisa completar um cadastro aparentemente simples. O fluxo continua funcional, porém utiliza mensagens confusas, botões com ações inesperadas, validações pouco intuitivas e decisões propositalmente contraditórias.

A regra principal do projeto é: **irritante, mas vencível**.

## Principais erros de UX/UI

- Botões com aparência que não corresponde à ação esperada.
- Botão "Cancelar" podendo avançar no fluxo.
- Textos longos e desnecessariamente confusos.
- Mensagens de feedback que não ajudam diretamente o usuário.
- Validações apresentadas somente depois de uma tentativa.
- Escolha correta escrita de forma contraditória.
- Hierarquia visual exagerada.
- Elementos que parecem importantes sem necessariamente serem importantes.
- Microtextos que aumentam a dúvida em vez de orientar.

## Heurísticas e princípios violados

### Consistência e padrões
Os botões não seguem o padrão esperado de ação. A cor e o texto podem induzir o usuário ao erro.

**Como corrigir:** usar rótulos claros e manter aparência e comportamento consistentes.

### Visibilidade do status do sistema
O sistema utiliza mensagens como "piorando" e "perigosamente perto do fim", que não informam objetivamente o estado da operação.

**Como corrigir:** mostrar mensagens diretas como "Etapa 2 de 3".

### Prevenção de erros
As regras da senha e outras exigências aparecem tarde demais.

**Como corrigir:** apresentar os requisitos antes do preenchimento e validar de maneira clara.

### Reconhecimento em vez de memorização
O usuário precisa interpretar frases contraditórias para descobrir o que fazer.

**Como corrigir:** utilizar instruções objetivas, exemplos e opções claramente descritas.

### Acessibilidade
Contraste, excesso de elementos e textos pouco claros podem dificultar a leitura e a compreensão.

**Como corrigir:** usar contraste adequado, hierarquia visual, textos objetivos e controles acessíveis.

## Como executar

Basta abrir `index.html` em um navegador.

Para publicar:

1. Crie um repositório público no GitHub.
2. Envie `index.html`, `style.css`, `script.js` e `README.md`.
3. Acesse **Settings → Pages**.
4. Selecione a branch `main` e a pasta `/root`.
5. Salve e aguarde o GitHub Pages publicar o endereço.

## Estrutura

```text
pior-ux/
├── index.html
├── style.css
├── script.js
└── README.md
```

## Objetivo pedagógico

Depois de experimentar o fluxo, a equipe deve conseguir identificar quais decisões tornaram a navegação ruim e explicar como cada uma poderia ser corrigida em uma interface profissional.
