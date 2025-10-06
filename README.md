# IFSC Digital Book — Programação Aplicada ao Geoprocessamento

Livro digital responsivo que reúne os capítulos da disciplina PAG014903. O projeto agora está pronto para ser publicado como uma aplicação web progressiva (PWA) no GitHub Pages, permitindo leitura offline e instalação em dispositivos compatíveis.

## Pré-requisitos

- Conta no GitHub com o repositório deste projeto.
- Node ou Python **não são necessários**; todo o site é estático.

## Estrutura

```
├── Página principal.html
├── A Base de Tudo - Variáveis e Dados Simples.html
├── Estruturas_de_Dados_Essenciais.html
├── Dando Inteligência ao Código - Decisões e Loops.html
├── Do Endereço ao Mapa - Geocodificação com Geopy.html
├── GeoPandas.html
├── Mapas Interativos com Python.html
├── estilos.v2.css
├── main.v2.js
├── manifest.webmanifest
├── service-worker.js
├── offline.html
└── icons/
    ├── icon.svg
    └── icon-maskable.svg
```

## Como publicar no GitHub Pages

1. Faça *push* de todos os arquivos para o branch `main` (ou o branch padrão do repositório).
2. No GitHub, acesse **Settings → Pages**.
3. Em **Build and deployment**, selecione:
   - **Source**: `Deploy from a branch`
   - **Branch**: `main` (pasta `/root`)
4. Clique em **Save**. Após alguns minutos, o site estará disponível em `https://<seu-usuario>.github.io/<nome-do-repo>/`.

## Testando o PWA localmente

Abra um servidor HTTP simples na raiz do projeto (evite `file://` para que o *service worker* funcione). Exemplo usando Python:

```powershell
python -m http.server 8000
```

Depois, acesse `http://localhost:8000` no navegador. Ao abrir, verifique:

- A solicitação para instalar o aplicativo (em navegadores que suportam PWA).
- A disponibilidade do conteúdo mesmo sem conexão (desative a rede após carregar uma página e recarregue).

## Personalização

- Atualize `manifest.webmanifest` com nome, descrição e ícones personalizados se desejar.
- O cache pré-carrega todos os capítulos e ativos listados. Ajuste `CORE_ASSETS` em `service-worker.js` caso adicione novos arquivos.
- O `offline.html` define a experiência de fallback quando nenhum recurso em cache está disponível.

## Boas práticas

- Sempre incremente `CACHE_VERSION` em `service-worker.js` quando alterar arquivos críticos para garantir a atualização do cache nos dispositivos dos estudantes.
- Mantenha os arquivos HTML salvos com codificação UTF-8.

Com isso, o livro digital fica pronto para ser instalado em desktops e dispositivos móveis, oferecendo leitura offline para a turma.
