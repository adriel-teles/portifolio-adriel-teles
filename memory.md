# Memory & Histórico de Alterações — Portfólio Adriel Teles

Este arquivo serve como **registro oficial da memória do projeto** e **histórico de alterações**. Todas as modificações, implementações de novas funcionalidades, correções de bugs e refatorações efetuadas no projeto de portfólio devem ser documentadas aqui para facilitar futuras consultas e rastreabilidade.

---

## 📌 Visão Geral do Projeto

- **Proprietário**: Adriel Teles
- **Área de Atuação**: Profissional de TI (Suporte, Infraestrutura, Monitoramento, Redes e Segurança da Informação)
- **Conceito de Design**: Inspirado em "Dashboard de NOC / Terminal Cyber" (Tema Grafite com acentos verde terminal e amarelo/âmbar)
- **Tech Stack**: HTML5 Semântico, Vanilla CSS (com variáveis CSS e suporte a Light/Dark Mode), Vanilla JavaScript (ES6+, sem frameworks).

---

## 📁 Estrutura de Arquivos

- `index.html`: Estrutura HTML5 semântica (Header com navegação responsiva, Seções: Hero, Sobre mim, Formação, Portfólio, Contato com formulário acessível, e Footer).
- `style.css`: Estilização responsiva, tokens de design CSS, paleta NOC (dark mode padrão, light mode via `data-theme`).
- `script.js`: Lógica de interatividade (menu hambúrguer mobile, alternância de tema claro/escuro com `localStorage`, validação/simulação do formulário de contato, ano dinâmico no footer).
- `README.md`: Documentação principal do repositório, instruções de visualização e direcionamento para este arquivo.
- `memory.md`: Registro contínuo de alterações e memória do desenvolvimento.

---

## 📜 Histórico de Alterações

### [2026-08-25] — Correção de Layout e Alinhamento do Hero (Texto à Esquerda)
- **Descrição**:
  - Ajustada a estrutura HTML em `index.html` e o CSS em `style.css` para garantir que todo o texto do Hero (`hero__content`) permaneça estritamente alinhado à esquerda da tela dentro do container.
  - Reduzida a largura máxima do bloco de texto para `520px` e reposicionado o container do Globo 3D (`hero__globe-container`) na metade direita da tela (`width: 50%; right: -2%`), eliminando qualquer sobreposição do globo com o texto da Hero section.
- **Arquivos modificados / criados**:
  - `index.html` (Modificado)
  - `style.css` (Modificado)
  - `memory.md` (Modificado)

### [2026-08-25] — Redesign Estético & Interativo Completo (NOC + Dithering + Vitoriano-Cyberpunk + Globo 3D)
- **Descrição**:
  - **Globo 3D de Partículas (Three.js)**: Adicionado elemento 3D no Hero com esferas de partículas conectadas estilo topologia de rede/matriz global, rotação contínua, efeito parallax interativo ao mouse e ajuste automático de densidade de partículas em dispositivos móveis.
  - **Logo Vitoriano-Cyberpunk em Dourado**: Criado monograma "AT" em SVG combinando ornamentação clássica vitoriana e trilhas de circuitos integrados com gradiente metálico dourado (`#D4AF37`).
  - **Visual Dashboard NOC / Zabbix & Retrô-Dithering**: Adicionada barra de status no topo (`SYSTEM STATUS: ONLINE`, latência, SIEM e Shield), badges pulsantes e texturas em retícula halftone/dithering em background e divisores.
  - **Tipografia & Temas**: Integradas as fontes `Cinzel`, `Fira Code` e `Inter`. Redesenho completo dos temas Escuro e Claro com alto contraste, preservando a alternância via `themeToggle` e sincronizando a cor do globo 3D com o tema escolhido.
  - **Interatividade & Animações**: Efeito de escaneamento (*scanline*) nos cards de portfólio no hover, animação de *scroll reveal* progressivo em todas as seções e preservação integral de todos os textos, dados e formulário de contato.
- **Arquivos modificados / criados**:
  - `index.html` (Modificado)
  - `style.css` (Modificado)
  - `script.js` (Modificado)
  - `memory.md` (Modificado)

### [2026-08-25] — Criação da Memória do Projeto e Atualização da Documentação
- **Descrição**:
  - Análise completa da estrutura do portfólio de Adriel Teles (`index.html`, `style.css`, `script.js`).
  - Criação do arquivo `memory.md` para acompanhamento e registro de modificações passadas e futuras.
  - Atualização do `README.md` com visão detalhada do projeto, instrução explícita para consulta do `memory.md` para manter-se atualizado sobre o progresso e instruções de uso.
- **Arquivos modificados / criados**:
  - `memory.md` (Criado)
  - `README.md` (Modificado)

---

## 📝 Instruções para Registro de Novas Alterações

Ao realizar qualquer nova alteração no projeto, adicione um novo bloco no topo da seção **Histórico de Alterações** utilizando o seguinte formato:

```markdown
### [YYYY-MM-DD] — Título Breve da Alteração
- **Descrição**:
  - Detalhe da alteração 1
  - Detalhe da alteração 2
- **Arquivos modificados / criados**:
  - `arquivo.ext` (Modificado/Criado/Removido)
```
