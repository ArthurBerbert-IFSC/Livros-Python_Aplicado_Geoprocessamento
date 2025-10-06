1. Objetivo Geral

A tarefa do agente é uniformizar e atualizar o layout de todas as páginas HTML do livro digital da disciplina PAG014903 — Programação Aplicada ao Geoprocessamento (IFSC), aplicando o padrão IFSC Digital Book Style.

O resultado deve ser um livro digital interativo, responsivo e totalmente offline, com:

Design institucional e claro (verde IFSC como cor base);

Modo escuro opcional (controlado por botão, não automático);

Sumário lateral dinâmico (TOC);

Botão de cópia de código;

Barra de progresso de leitura;

Cabeçalho e rodapé padronizados.

2. Arquivos-alvo

O agente deve localizar todos os arquivos:

*.html


Exceto:

template_base.html
partials-header.html


Cada arquivo identificado deve ser reescrito de acordo com o modelo descrito neste documento.

3. Estrutura Final de Pastas
/livro-programacao/
│-- index.html
│-- A Base de Tudo - Variáveis e Dados Simples.html
│-- Estruturas_de_Dados_Essenciais.html
│-- Dando Inteligência ao Código - Decisões e Loops.html
│-- GeoPandas.html
│-- estilos.v2.css
│-- main.v2.js
│-- /imagens/
│   └── (logotipos e ilustrações)

4. Diretrizes de Reescrita
4.1. Cabeçalho (<head>)

Definir:

<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="color-scheme" content="light dark">


Manter o título no formato:

{{Título do capítulo}} — IFSC Digital Book


Incluir:

<script src="https://cdn.tailwindcss.com"></script>
<link href="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/themes/prism-okaidia.min.css" rel="stylesheet">
<link rel="stylesheet" href="estilos.v2.css">
<script>
  tailwind.config = {
    darkMode: 'class',
    theme: {
      extend: {
        colors: {
          'ifsc-green': '#1B5E20',
          'ifsc-soft': '#E6F4EA',
          'ifsc-gray': '#374151'
        },
        fontFamily: { sans: ['Inter', 'system-ui', 'sans-serif'] }
      }
    }
  }
</script>

4.2. Corpo do Documento (<body>)

O corpo de cada página deve seguir esta hierarquia:

<body>
├─ div#reading-progress
├─ header
│  ├─ logos institucionais
│  ├─ nome da disciplina
│  └─ botão de alternância de tema
├─ main
│  ├─ aside (TOC dinâmico)
│  └─ article (conteúdo do capítulo)
└─ footer (rodapé padronizado)
</body>

5. Componentes Obrigatórios
5.1. Barra de progresso de leitura

Inserir logo após <body>:

<div id="reading-progress" class="fixed top-0 left-0 h-1 w-full bg-ifsc-green/80 scale-x-0 transition-transform duration-200 origin-left z-50"></div>

5.2. Cabeçalho padronizado

Deve conter quatro logotipos e um botão de tema:

<header class="bg-white/95 backdrop-blur shadow-md sticky top-0 z-40 dark:bg-slate-900/90">
  <div class="border-b border-slate-200/60 dark:border-slate-700/60">
    <div class="container mx-auto px-6 py-4 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div class="flex flex-wrap items-center justify-center gap-4 md:justify-start">
        <img src="imagens/logotipos/logo_IFSC.png" alt="Logotipo IFSC" class="h-10 w-auto opacity-80">
        <img src="imagens/logotipos/logo_DACC.jpg" alt="Logotipo DACC" class="h-10 w-auto opacity-80">
        <img src="imagens/logotipos/Logo_Curso_Geoprocessamento.jpg" alt="Curso de Geoprocessamento" class="h-10 w-auto opacity-80">
        <img src="imagens/logotipos/logo_Disciplina.png" alt="Disciplina PAG014903" class="h-16 w-auto ring-2 ring-ifsc-green rounded-md shadow-md">
      </div>
      <div class="flex items-center gap-3 justify-center md:justify-end">
        <div class="text-center md:text-right">
          <p class="text-lg font-semibold text-ifsc-green dark:text-emerald-300">Fundamentos de Programação em Python</p>
          <p class="text-xs text-gray-500 dark:text-slate-300/80">v0.0.1</p>
        </div>
        <button id="theme-toggle" type="button" class="theme-toggle" aria-pressed="false" aria-label="Alternar tema">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"></path>
          </svg>
          <span data-mode-text>LIGHT</span>
        </button>
      </div>
    </div>
  </div>
</header>

5.3. Estrutura principal (<main>)
<main class="container mx-auto px-6 py-12">
  <div class="flex flex-col gap-10 lg:grid lg:grid-cols-[280px_minmax(0,1fr)]">

    <!-- TOC -->
    <aside class="order-2 lg:order-1">
      <div class="sticky top-32 space-y-6 rounded-3xl border border-slate-200/70 bg-white/70 p-6 shadow-md backdrop-blur dark:border-slate-700/60 dark:bg-slate-900/60">
        <h2 class="flex items-center gap-3 text-lg font-semibold text-ifsc-green dark:text-emerald-300">Navegue pelo conteúdo</h2>
        <nav><ul id="toc-list" class="space-y-2 text-sm"><li class="text-slate-400">Carregando seções...</li></ul></nav>
      </div>
    </aside>

    <!-- Conteúdo -->
    <article class="order-1 lg:order-2 rounded-3xl border border-slate-200/80 bg-white/95 shadow-xl backdrop-blur dark:border-slate-700/60 dark:bg-slate-900/80">
      <div class="space-y-12 p-6 md:p-10">
        {{conteudo_do_capitulo}}
      </div>
    </article>
  </div>
</main>

5.4. Rodapé padronizado
<footer class="mt-8 bg-white shadow-inner dark:bg-slate-900/90">
  <div class="container mx-auto px-6 py-8 text-center text-gray-600 dark:text-slate-300">
    <p class="text-base font-semibold text-ifsc-green">PAG014903 - PROGRAMAÇÃO APLICADA AO GEOPROCESSAMENTO</p>
    <p class="text-sm">Curso Técnico em Geoprocessamento · DACC - IFSC Florianópolis</p>
    <p class="text-sm">Professor responsável: Arthur Berbert</p>
    <p class="text-xs text-gray-400 mt-2">Versão 2025-2</p>
  </div>
</footer>

6. Inclusões Obrigatórias de Script

Antes do fechamento de </body>, incluir:

<script src="main.v2.js"></script>
<script>lucide.createIcons();</script>

7. Funções esperadas no main.v2.js

Alternância de tema (Claro → Escuro → Sistema);

Geração automática de TOC com base em <h2> e <h3>;

Atualização da barra de progresso de leitura;

Botão de cópia de código;

Sincronização com localStorage para manter preferência do usuário.

8. Estilo Institucional
Função	Cor Base	Classe Tailwind
Verde IFSC principal	#1B5E20	bg-ifsc-green
Fundo claro	#F8FAFC	bg-slate-50
Texto neutro	#374151	text-gray-700
Fundo escuro	#0F172A	dark:bg-slate-950

Fonte: Inter (Google Fonts).
Tamanho base: text-base leading-relaxed.

9. Validação Final

Após reescrever os arquivos, o agente deve:

Validar se todas as páginas têm:

<header> institucional completo;

<aside> com #toc-list;

<footer> padronizado;

referências corretas a main.v2.js e estilos.v2.css;

tag <meta charset="UTF-8">.

Testar alternância de tema e persistência.

Verificar TOC, barra de leitura e botões “Copiar”.

Garantir acessibilidade AA e responsividade mobile-first.

10. Saída Esperada

Todas as páginas HTML terão layout idêntico ao modelo.

O modo escuro estará desativado por padrão, mas ativável pelo usuário.

O projeto permanecerá 100% funcional offline.

O estilo seguirá integralmente o padrão IFSC Digital Book Style.

11. Normalização de Codificação e Acentuação (UTF-8)
11.1. Objetivo

Garantir que todos os arquivos HTML utilizem UTF-8 (sem BOM) e exibam corretamente acentos e cedilhas. Inserir <meta charset="UTF-8"> no <head> (antes de qualquer outro conteúdo). 

A Base de Tudo - Variáveis e Da…

11.2. Detecção de “mojibake”

O agente deve varrer o texto bruto procurando sequências típicas de decodificação incorreta (ex.: Ã¡, Ã©, Ã­, Ã³, Ã£, Ã§, â€“, â€œ, â€). Se a frequência for >0,1% dos caracteres ou houver termos previstos com corrupção (p.ex. “ProgramaÃ§Ã£o”), classificar como possível UTF-8 decodificado como Latin-1/Windows-1252. 

Página principal

11.3. Procedimento de correção (heurística sem dependências externas)

Ler como bytes (rb).

Tentar decodificar como UTF-8.
2.1. Se sucesso e não houver “mojibake” → manter.
2.2. Se houver “mojibake” → aplicar passo 3.

Hipótese 1 (UTF-8 → mal lido como Latin-1/CP1252):

Converter o texto incorreto de volta para bytes em Latin-1 e decodificar em UTF-8:

texto_corrigido = texto_incorreto.encode('latin-1', 'strict').decode('utf-8', 'strict')


Se falhar, testar o inverso (CP1252):

texto_corrigido = texto_incorreto.encode('cp1252', 'strict').decode('utf-8', 'strict')


Hipótese 2 (arquivo salvo originalmente em Latin-1/CP1252):

Decodificar os bytes originais diretamente como cp1252 (ou iso-8859-1) e regravar em UTF-8.

Validar: após a correção, confirmar ausência das sequências conhecidas e presença correta de grafias (“Variáveis”, “Programação”, “Florianópolis” etc.).

Persistir: salvar sempre em UTF-8 (sem BOM) e assegurar a presença de:

<meta charset="UTF-8">

11.4. Exemplo mínimo (script que o agente pode embutir)
from pathlib import Path

TRIGGERS = ('Ã¡','Ã©','Ã­','Ã³','Ãº','Ã£','Ãµ','Ã§','â€“','â€œ','â€\x9d')

def fix_encoding_bytes(data: bytes) -> str:
    # 1) tentativa direta
    try:
        txt = data.decode('utf-8')
        if any(t in txt for t in TRIGGERS):
            raise UnicodeDecodeError('utf-8','',0,1,'mojibake')
        return txt
    except Exception:
        pass
    # 2) hipótese utf8->latin1
    for enc in ('latin-1','cp1252'):
        try:
            wrong = data.decode(enc)
            fixed = wrong.encode(enc).decode('utf-8')
            if not any(t in fixed for t in TRIGGERS):
                return fixed
        except Exception:
            continue
    # 3) arquivo originalmente single-byte
    for enc in ('cp1252','latin-1','iso-8859-1'):
        try:
            fixed = data.decode(enc)
            return fixed
        except Exception:
            continue
    # fallback
    return data.decode('utf-8', 'replace')

for p in Path('.').glob('*.html'):
    raw = p.read_bytes()
    txt = fix_encoding_bytes(raw)
    if '<meta charset="UTF-8">' not in txt:
        txt = txt.replace('<head>', '<head>\n  <meta charset="UTF-8">', 1)
    p.write_text(txt, encoding='utf-8', newline='\n')


Observação: se nomes de arquivos estiverem corrompidos, o agente deve renomeá-los para a forma correta (p.ex., A Base de Tudo - Variáveis e Dados Simples.html) e atualizar todos os links internos que apontem para eles (sumário e navegação). 

GeoPandas

12. Robustez do Cabeçalho: ocultar logos ausentes (sem “link quebrado”)
12.1. Objetivo

Evitar a exibição do ícone/contorno de imagem quebrada quando algum arquivo de logotipo estiver ausente, preservando a acessibilidade (atributo alt) e a estética do cabeçalho.

12.2. Marcação recomendada

Em cada <img> de logotipo, acrescentar onerror="this.style.display='none'".
Exemplo (estrutura sugerida no header padronizado do documento base):

<div class="flex flex-wrap items-center justify-center gap-4 md:justify-start">
  <img src="imagens/logotipos/logo_IFSC.png"
       alt="Logotipo do IFSC"
       class="h-10 w-auto opacity-80"
       loading="lazy"
       onerror="this.style.display='none'">

  <img src="imagens/logotipos/logo_DACC.jpg"
       alt="Logotipo do DACC"
       class="h-10 w-auto opacity-80"
       loading="lazy"
       onerror="this.style.display='none'">

  <img src="imagens/logotipos/Logo_Curso_Geoprocessamento.jpg"
       alt="Logotipo do Curso de Geoprocessamento"
       class="h-10 w-auto opacity-80"
       loading="lazy"
       onerror="this.style.display='none'">

  <img src="imagens/logotipos/logo_Disciplina.png"
       alt="Logotipo da disciplina PAG014903"
       class="h-16 w-auto ring-2 ring-ifsc-green rounded-md shadow-md"
       loading="lazy"
       onerror="this.style.display='none'">
</div>

12.3. Fallback opcional (JS não intrusivo)

Para colapsar espaços caso todas as imagens falhem, pode-se complementar no script principal:

<script>
document.addEventListener('DOMContentLoaded', () => {
  const wrap = document.querySelector('header .flex.flex-wrap');
  if (!wrap) return;
  const imgs = [...wrap.querySelectorAll('img')];
  const visibles = imgs.filter(img => img.complete && img.naturalWidth > 0 && img.style.display !== 'none');
  if (visibles.length === 0) {
    wrap.style.display = 'none'; // colapsa a área de logos
  }
});
</script>

12.4. Boas práticas adicionais

Manter alt descritivo para acessibilidade (mesmo com display:none em erro).

Evitar que a ausência de logos afete a navegação (o bloco com links “Início/Capítulos/Sobre” permanece).

Preservar o funcionamento offline (caminhos relativos, sem chamadas externas a imagens remotas). 

A Base de Tudo - Variáveis e Da…

13. Checklist de conformidade (após aplicar 11–12)

UTF-8 em todos os HTMLs, sem mojibake; <meta charset="UTF-8"> presente.

Links e nomes de arquivos com acentuação correta (ex.: “Variáveis”). 

GeoPandas

Cabeçalho padronizado; logos ausentes não exibem “link quebrado”; layout não deforma.

Modo escuro opcional permanece funcional (toggle), conforme diretriz geral.

Projeto segue offline-first e estrutura multi-arquivo conforme especificação.

14. Validação do Sumário e da Navegação (com auto-reparo)
14.1 Objetivo

Garantir que:

Todos os links do sumário (em index.html) apontem para capítulos existentes (após correções de acentuação/nomes).

Todos os links de navegação “Anterior/Próximo” e “Voltar aos capítulos” funcionem.

Todas as âncoras internas usadas pelo TOC (id em seções com data-toc="section") existam e sejam únicas.

Ausência de mojibake em href e id (ex.: “VariÃ¡veis”). 

GeoPandas

14.2 Rotina — Visão Geral

Inventariar capítulos: listar *.html (excluindo templates) e extrair o título canônico presente no <h1> de cada capítulo.

Normalizar nomes: aplicar NFC/NFKC, corrigir mojibake (seção 11), e sincronizar nomes de arquivos e títulos (p.ex., renomear arquivo para “A Base de Tudo - Variáveis e Dados Simples.html” e atualizar todos os href). 

GeoPandas

Construir mapa de resolução {titulo↔arquivo} e, adicionalmente, um mapa de slugs (remover espaços duplicados, substituir espaços por hífens ou preservar o padrão atual, respeitando acentos).

Varredura de links:

Sumário (index.html): coletar todos os href que apontam para capítulos; checar existência do arquivo alvo. 

Estruturas_de_Dados_Essenciais

Navegação nos capítulos: localizar blocos “Voltar aos capítulos” e “Anterior/Próximo”; validar cada href e reparar se necessário.

Varredura de âncoras internas:

Construir conjunto de id válidos para o TOC a partir dos elementos com data-toc="section"; garantir unicidade.

Verificar que cada item do TOC (#toc-list) corresponde a um id existente (quando houver TOC pré-gerado no HTML).

Auto-reparo:

Ajustar href quebrados mapeando pelo título canônico (quando o nome do arquivo mudou por correção de acento/slug).

Em último caso, procurar por similaridade (distância de edição) entre o href alvo e a lista inventariada de arquivos corrigidos.

Relatório:

Emitir relatório com: (i) links corrigidos; (ii) links irrecuperáveis; (iii) âncoras duplicadas/ausentes; (iv) arquivos que exigiram renomeação por acentuação.

14.3 Heurísticas de Reparo

Correção por título: se href antigo não existir, extrair o texto do link adjacente (ou título do card no sumário) e resolver via {titulo↔arquivo}.

Correção por mojibake: substituir sequências típicas (Ã¡, Ã©, Ã£, Ã§, etc.) por caracteres UTF-8 corretos antes de comparar e resolver href. (Ver seção 11.)

Preservação de acentos: manter acentuação nos nomes de arquivos quando já padronizada; caso padronize com hífens/sem acentos, padronizar todos e atualizar todos os href de forma consistente.

TOC: se seção não possuir id, criar id determinístico via slug do texto do <h2>/<h3> (normalizado em minúsculas, acentos preservados ou removidos de forma consistente).

14.4 Pseudocódigo (alto nível)
files = listar_htmls_excluindo_templates()
capitulos = []
for f in files:
  html = ler_corrigindo_charset(f)  # ver §11
  titulo = extrair_h1(html)
  capitulos.append({arquivo:f, titulo:normalizar(titulo)})

map_titulo_arquivo = construir_mapa(capitulos)
index = carregar('index.html')

# 1) Sumário
links_index = extrair_links(index)
for a in links_index:
  alvo = a.href
  if not existe(alvo):
    candidato = resolver_por_titulo_ou_slug(a.texto, map_titulo_arquivo)
    if candidato: a.href = candidato; registrar_correcao(...)
    else: marcar_quebrado(...)

# 2) Navegação capítulos
for cap in capitulos:
  doc = carregar(cap.arquivo)
  for a in extrair_links_navegacao(doc):
    if not existe(a.href):
       candidato = resolver_por_titulo_ou_slug(texto_associado(a), map_titulo_arquivo)
       if candidato: a.href = candidato; registrar_correcao(...)
       else: marcar_quebrado(...)

# 3) TOC/Âncoras
for cap in capitulos:
  doc = carregar(cap.arquivo)
  ids = set()
  for sec in selecionar('[data-toc="section"]'):
    if not sec.id: sec.id = slugify(titulo_da_secao(sec))
    if sec.id in ids: sec.id = desambiguar_com_sufixo(sec.id)
    ids.add(sec.id)
  validar_toc_vs_ids(doc)  # se existir lista estática
  salvar(doc)

emitir_relatorio()

14.5 Implementação de referência (Python)

O agente pode adaptar o exemplo abaixo (sem dependências externas).

from pathlib import Path
import re
import unicodedata

HTML_GLOB = '*.html'
EXCLUDES = {'template_base.html', 'partials-header.html'}

def nfc(s): return unicodedata.normalize('NFC', s)

def slugify(text):
    t = nfc(text).strip().lower()
    # opção A (preserva acentos e substitui espaços):
    t = re.sub(r'\s+', '-', t)
    # opção B (remover acentos):
    # t = unicodedata.normalize('NFD', t)
    # t = ''.join(ch for ch in t if unicodedata.category(ch) != 'Mn')
    t = re.sub(r'[^a-z0-9\-_.áéíóúâêôãõç]', '-', t)
    t = re.sub(r'-{2,}', '-', t).strip('-')
    return t or 'secao'

def extrair_titulo_h1(txt):
    m = re.search(r'<h1[^>]*>(.*?)</h1>', txt, flags=re.I|re.S)
    if not m: return None
    return re.sub(r'<[^>]+>', '', m.group(1)).strip()

def extrair_ancoras_sumario(txt):
    return re.findall(r'href="([^"]+\.html)"', txt, flags=re.I)

def substituir_href(txt, antigo, novo):
    return re.sub(rf'href="{re.escape(antigo)}"', f'href="{novo}"', txt)

def ids_toc_sections(txt):
    # captura blocos com data-toc="section"
    return re.findall(r'<(?:section|div)[^>]*data-toc="section"[^>]*id="([^"]*)"', txt, flags=re.I)

def garantir_ids_para_sections(txt):
    # adiciona id onde faltar (simplificado)
    def repl(m):
        tag, attrs, inner = m.group('tag'), m.group('attrs'), m.group('inner')
        have_id = re.search(r'id="[^"]*"', attrs, flags=re.I)
        if not have_id:
            # tentar extrair título interno (h2/h3)
            title_m = re.search(r'<h[23][^>]*>(.*?)</h[23]>', inner, flags=re.I|re.S)
            base = extrair_texto_plano(title_m.group(1)) if title_m else 'secao'
            new_id = slugify(base)
            attrs = attrs + f' id="{new_id}"'
        return f'<{tag}{attrs}>{inner}</{tag}>'
    def extrair_texto_plano(s): return re.sub(r'<[^>]+>', '', s).strip()
    pattern = r'<(?P<tag>section|div)(?P<attrs>[^>]*)data-toc="section"(?P<attrs2>[^>]*)>(?P<inner>.*?)</(?P=tag)>'
    return re.sub(pattern, repl, txt, flags=re.I|re.S)

# 1) carregar e corrigir charset (usar rotina do §11)
def load_fix_utf8(p: Path) -> str:
    b = p.read_bytes()
    # usar a função fix_encoding_bytes do §11 se já implementada
    try:
        t = b.decode('utf-8')
    except UnicodeDecodeError:
        t = b.decode('latin-1')  # fallback mínimo; recomenda-se a heurística do §11
    return t

# Inventário
caps = []
for path in Path('.').glob(HTML_GLOB):
    if path.name in EXCLUDES: continue
    txt = load_fix_utf8(path)
    title = extrair_titulo_h1(txt) or path.stem
    caps.append((path, nfc(title)))

map_titulo_arquivo = {title: path.name for path, title in caps}

# 2) Correção do index.html
idx = Path('index.html')
if idx.exists():
    txt = load_fix_utf8(idx)
    for href in set(extrair_ancoras_sumario(txt)):
        if not Path(href).exists():
            # tentar resolver por título a partir do texto do link (simplificado: usa nome do arquivo sem .html)
            titulo_bruto = nfc(Path(href).stem.replace('-', ' '))
            # aproximação: título capitalizado
            candidato = map_titulo_arquivo.get(titulo_bruto) or map_titulo_arquivo.get(titulo_bruto.title())
            if candidato:
                txt = substituir_href(txt, href, candidato)
    idx.write_text(txt, encoding='utf-8', newline='\n')

# 3) Correção nos capítulos (navegação + TOC)
for path, title in caps:
    txt = load_fix_utf8(path)
    # garantir ids p/ sections do TOC
    txt = garantir_ids_para_sections(txt)
    # corrigir links de navegação comuns
    for href in re.findall(r'href="([^"]+\.html)"', txt, flags=re.I):
        if not Path(href).exists():
            base = nfc(Path(href).stem.replace('-', ' '))
            candidato = map_titulo_arquivo.get(base) or map_titulo_arquivo.get(base.title())
            if candidato:
                txt = substituir_href(txt, href, candidato)
    path.write_text(txt, encoding='utf-8', newline='\n')

14.6 Critérios de sucesso

index.html lista apenas href válidos para capítulos (sem 404 local). 

Estruturas_de_Dados_Essenciais

Cada capítulo possui navegação funcional (“Voltar aos capítulos”, “Anterior”, “Próximo”).

Todas as seções destinadas ao TOC têm id único e consistente com o texto do <h2>/<h3>.

Não há ocorrências visíveis de mojibake em href, id, títulos e conteúdo. 
