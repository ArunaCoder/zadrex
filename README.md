# Zadrex: Guerra dos Esquisitos

Diário de construção do **Zadrex**, um jogo de tabuleiro inédito feito no Scratch, em família. A página mostra uma trilha de passos: cada passo tem a missão (explicada para uma criança de 9 anos), um diário do que foi feito e um espaço para GIF/vídeo do resultado.

O jogo é feito no **Scratch instalado no computador** (o Scratch App offline), sem conta no Scratch e sem internet: o projeto é um arquivo `.sb3` salvo no próprio computador. Por isso a trilha não usa nada que dependa de conta, como salvar na nuvem, compartilhar ou embutir projetos do site do Scratch.

| Esquisito | Código |
|---|---|
| Zé-Pequeno | `Z` |
| Geladeira Voadora | `G` |
| Mola Maluca | `M` |
| Sombra | `S` |
| Super-Bobo | `B` |
| Grande Almofada | `A` |

## Como atualizar o progresso

Tudo fica em [`conteudo/trilha.js`](conteudo/trilha.js). Para cada passo:

```js
{ id: "fabrica-de-clones", titulo: "A fábrica de clones", nivel: 2, status: "feito", midia: ["midia/fabrica-de-clones.gif"] }
```

- **`status`**: `"falta"`, `"fazendo"` ou `"feito"`. A barra de progresso, a árvore e o painel se atualizam sozinhos.
- **Diário de bordo**: crie `conteudo/diario/<id>.md` (copie o [`_modelo.md`](conteudo/diario/_modelo.md)). Ele só é carregado quando o status é `"fazendo"` ou `"feito"`; antes disso aparece "Ainda não chegamos aqui!".
- **Mídia**: coloque o arquivo em `midia/` e liste em `midia`. Aceita:
  - imagens e GIFs (`.gif`, `.png`, `.jpg`, `.webp`)
  - vídeos (`.mp4`, `.webm`)
  - links do YouTube (`https://youtu.be/...`)
  - com legenda: `{ src: "midia/sorteio.gif", legenda: "O computador jogando!" }`

As missões ficam em `conteudo/passos/<id>.md`.

## Ver no computador

Como a página carrega os arquivos `.md` com `fetch`, abrir o `index.html` direto (file://) não funciona. Use um servidor local na pasta do projeto:

```bash
python -m http.server 8000
# ou
npx serve .
```

e abra `http://localhost:8000`.

## Publicar no GitHub Pages

1. Faça push para o GitHub.
2. Em **Settings → Pages**, escolha **Deploy from a branch**, branch `main`, pasta `/ (root)`.
3. Em alguns minutos a página fica em `https://<usuario>.github.io/zadrex/`.

Não tem build: é HTML, CSS e JavaScript puros. O arquivo `.nojekyll` evita que o GitHub processe o site com Jekyll.

## Recursos extras do Markdown

Os textos aceitam Markdown normal (com tabelas e checklists `- [ ]`, que viram caixinhas clicáveis salvas no navegador) e mais alguns truques:

**Caixas coloridas**

```md
:::dica Título opcional
Texto da dica.
:::
```

Tipos: `dica`, `atencao`, `desafio`, `robo` (pseudocódigo), `missao` (checklist), `curiosidade`, `adulto`.

**Bloco do Scratch no meio do texto**

```md
Use o bloco [[eventos: quando ⚑ for clicado]] para começar.
```

**Pilha de blocos**

````md
```blocos
eventos: quando ⚑ for clicado
controle: repita (8) vezes
  movimento: mova (10) passos // comentário amarelo
  controle: se <operadores: {x} > (8)> então
    aparencia: diga [Oi!]
  senão
    variaveis: mude [vez ▾] para [jogador]
```
````

- Categorias: `movimento`, `aparencia`, `som`, `eventos`, `controle`, `sensores`, `operadores`, `variaveis`, `listas`, `meusblocos`, `caneta`
- `(10)` espaço branco · `[texto]` campo de texto · `[vez ▾]` menu · `{variável}` bolinha laranja · `{operadores: ...}` bloco redondo · `<operadores: ...>` bloco hexagonal
- Indentação de 2 espaços coloca o bloco dentro do bloco de cima; linha em branco separa scripts.

**Tabuleiros e personagens**

```html
<z-diagrama pecas="36:JG 12:CZ" mover="36" legenda="Texto embaixo"></z-diagrama>
<z-diagrama inicial codigos></z-diagrama>
<z-diagrama numeros="grande" rotulos destacar="28"></z-diagrama>
<z-esquisito tipo="M" time="C" tamanho="80"></z-esquisito>
<z-elenco></z-elenco>
```

As casas vão de 1 (canto superior esquerdo) a 64 (canto inferior direito), igual ao projeto no Scratch. `mover` calcula sozinho as casas possíveis da peça.

## Estrutura

```
index.html                 página única
assets/css/                estilos (tema + blocos/tabuleiros)
assets/js/app.js           trilha, rotas e seções
assets/js/blocos.js        desenho dos blocos estilo Scratch
assets/js/esquisitos.js    desenhos das peças e diagramas
assets/vendor/marked.umd.js  Markdown (marked v18, licença MIT)
conteudo/trilha.js         capítulos, passos e progresso
conteudo/passos/           missões
conteudo/diario/           o que a gente fez
midia/                     GIFs e vídeos
recursos/                  fantasias SVG prontas para carregar no Scratch
```
