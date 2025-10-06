# 🧭 DIRETRIZES PARA IA

## Geração de um Livro Digital Interativo de Programação (Estilo IFSC Digital Book)

---

## 1. Objetivo Principal

Atuar como **desenvolvedor web especialista em conteúdo educacional**, transformando o conteúdo de um documento fonte (`.docx`, `.txt`, `.md`, etc.) em um **livro digital interativo, leve, responsivo e funcional offline**, com foco em **clareza didática, design moderno e consistência institucional (IFSC)**.

O projeto final deve ser um **conjunto de páginas HTML** (uma por capítulo), navegáveis offline, com **blocos visuais dinâmicos, ícones Lucide, código interativo (Prism.js)** e **modo escuro opcional**.

---

## 2. Princípios Inegociáveis

1. **Offline-First:**
   Toda a navegação deve funcionar sem conexão à internet.
   Somente os CDNs do **Tailwind**, **Prism.js** e **Lucide Icons** são permitidos.

2. **Estrutura Multi-Arquivo Limpa:**
   Cada capítulo deve ter seu próprio arquivo (`capitulo1.html`, `capitulo2.html`, etc.), com caminhos relativos.
   Organização simples, intuitiva e compatível com uso local (pendrive, site estático, GitHub Pages).

3. **Responsividade:**
   O layout deve se adaptar perfeitamente a celulares, tablets e desktops, utilizando as classes utilitárias do Tailwind.

4. **Clareza e Legibilidade:**
   O design deve ser limpo, espaçado e visualmente confortável.
   O foco é a leitura fluida, não o enfeite visual.

5. **Semântica HTML5:**
   Utilizar tags semânticas: `<header>`, `<main>`, `<article>`, `<nav>`, `<section>`, `<footer>` e `<aside>`.

6. **Identidade Visual IFSC:**
   Manter o tom institucional com verde IFSC, cinza neutro e fundo claro, equilibrado com elementos didáticos leves e ícones ilustrativos.

---

## 3. Estrutura de Arquivos

```
/livro-programacao/
│-- index.html
│-- capitulo1.html
│-- capitulo2.html
│-- ...
│-- estilos.css
│-- /scripts/
│   └── main.js
│-- /imagens/
│   └── (subpastas opcionais por capítulo)
```

Todos os arquivos devem utilizar **caminhos relativos** e funcionar **sem servidor**.

---

## 4. Processo de Geração Passo a Passo

### Etapa 1: Análise e Mapeamento do Conteúdo

* Ler o documento fonte completo.
* Identificar seções principais → definir capítulos.
* Gerar lista de capítulos para o sumário do `index.html`.

### Etapa 2: Criação do `index.html`

* Usar o **template de sumário** (ver abaixo).
* Inserir links para cada capítulo.
* Garantir compatibilidade offline.

### Etapa 3: Criação dos Capítulos (`capituloN.html`)

* Cada capítulo deve usar o **template IFSC Digital Book**.
* Inserir o conteúdo na área `<article>`.
* Respeitar a estrutura modular abaixo:

| Ordem | Seção             | Descrição                              |
| ----- | ----------------- | -------------------------------------- |
| 1     | Introdução / Hero | Apresentação visual com ícone e resumo |
| 2     | Conceito Central  | Bloco explicativo principal            |
| 3     | Dica do Professor | Caixa verde com boas práticas          |
| 4     | Atenção           | Caixa amarela com avisos               |
| 5     | Código Interativo | Bloco de código com botão “Copiar”     |
| 6     | Curiosidade       | Acordeão com informações extras        |
| 7     | Exercício Rápido  | Lista numerada de tarefas              |
| 8     | Conclusão         | Síntese do capítulo                    |
| 9     | Navegação         | Links “Anterior / Próximo”             |

### Etapa 4: Criação dos Arquivos `estilos.css` e `scripts/main.js`

* Ambos devem funcionar offline.
* `main.js` deve conter as funções:

  * copiar código;
  * atualizar barra de progresso;
  * alternar modo escuro;
  * gerar sumário lateral automaticamente.

---

## 5. Diretrizes Visuais e de Estilo

### 🎨 Paleta de Cores

| Função               | Cor       | Classe Tailwind  |
| -------------------- | --------- | ---------------- |
| Verde IFSC principal | `#1B5E20` | `bg-ifsc-green`  |
| Verde secundário     | `#2E7D32` | `bg-emerald-600` |
| Cinza texto          | `#374151` | `text-gray-700`  |
| Fundo neutro         | `#F8FAFC` | `bg-slate-50`    |

### 🔤 Tipografia

* Fonte: `Inter` (Google Fonts).
* Tamanho base: 18px (`text-base`, `leading-relaxed`).
* Limite: 70 caracteres por linha.
* Parágrafos curtos, frases diretas e espaçamento vertical (`my-6`).

### 🧭 Hierarquia Visual

* `<h1>`: título principal com ícone.
* `<h2>`: seções principais, cor de destaque.
* `<h3>`: subtópicos com ícone lateral.

### 🧩 Componentes Didáticos

| Tipo              | Classe Tailwind                                   | Ícone Lucide     | Observação            |
| ----------------- | ------------------------------------------------- | ---------------- | --------------------- |
| Conceito          | `bg-white border-l-4 border-ifsc-green p-6`       | `lightbulb`      | Explicação principal  |
| Dica do Professor | `bg-emerald-50 border-l-4 border-emerald-500 p-4` | `graduation-cap` | Sugestão pedagógica   |
| Atenção           | `bg-amber-50 border-l-4 border-amber-500 p-4`     | `alert-triangle` | Aviso importante      |
| Código            | `bg-slate-900 text-slate-100 rounded-xl p-4`      | `terminal`       | Inclui botão “Copiar” |
| Curiosidade       | `<details><summary>...</summary></details>`       | `sparkles`       | Informações extras    |
| Exercício         | `bg-white border rounded-xl p-6`                  | `check-circle-2` | Atividade prática     |
| Conclusão         | texto leve com ícone `flag`                       | —                | Fechamento conceitual |

---

## 6. Recursos Interativos

A IA deve incluir:

1. **Botão "Copiar código"** (usando `navigator.clipboard.writeText`).
2. **Acordeões `<details>`** para curiosidades e explicações extras.
3. **Scroll suave** (`scroll-smooth` no `<html>`).
4. **TOC (sumário lateral)** gerado dinamicamente a partir dos `<h2>`.
5. **Progress bar de leitura** no topo da página.
6. **Modo escuro automático** (Tailwind `dark:` + toggle em JS).
7. **Links “Anterior / Próximo”** para navegar entre capítulos.

---

## 7. Ilustrações e Ícones

* Usar **Lucide** (`https://unpkg.com/lucide@latest`).
* Ícones recomendados:
  💡 `lightbulb` ⚙️ `terminal` 🧭 `map` 🎓 `graduation-cap` ⚠️ `alert-triangle` ✅ `check-circle-2` 🏁 `flag`
* Imagens SVG leves com legenda curta (*Figura 1 – Variáveis como caixinhas*).
* Usar `loading="lazy"` e `alt` descritivo.
* Evitar imagens grandes (>200 KB).

---

## 8. Acessibilidade

* Contraste mínimo AA (texto/fundo).
* `alt` obrigatório em imagens.
* `aria-label` em botões de ícones.
* Foco visível para navegação por teclado.

---

## 9. Testes e Validação

* Testar renderização em **mobile, tablet e desktop**.
* Verificar botão “Copiar código”.
* Validar barra de progresso e modo escuro.
* Confirmar ícones Lucide (`lucide.createIcons()`).
* Validar HTML (W3C Validator).

---

## 10. Automação e Padronização

A IA deve:

1. Localizar todos os arquivos `capitulo*.html`.
2. Aplicar o template IFSC Digital Book.
3. Atualizar automaticamente:

   * Título, numeração e navegação.
   * IDs de seções (`id="conceito"`, etc.).
   * Sumário lateral (TOC).
   * Estrutura didática completa.
4. Validar responsividade e interatividade.
5. Gerar relatório final de consistência (capítulos, links e erros).

---

## 11. Estrutura de Templates Obrigatórios

O agente deve gerar e manter **quatro arquivos principais**:

1. `index.html` — Sumário com links para capítulos.
2. `capituloN.html` — Páginas de conteúdo (modelo interativo).
3. `estilos.css` — Folha de estilo offline.
4. `scripts/main.js` — Script de interatividade.

---

## 12. Nome do Estilo

> **IFSC Digital Book Style**
> Combina o rigor institucional (verde IFSC, fontes formais, clareza visual) com leveza didática (blocos coloridos, ícones, caixas interativas e ritmo fluido de leitura).

---

## 13. Considerações Finais

* O produto final deve ser **leve, modular e 100% offline**.
* A leitura deve ser **prazerosa e didática**, com foco em clareza conceitual e visual.
* A linguagem deve permanecer **acadêmica e neutra**.
* O layout deve seguir o mesmo padrão em todos os capítulos.
* A estética deve reforçar o caráter **institucional e educacional** do IFSC.

---