Um jogo sem som é como um bolo sem cobertura: dá pra comer, mas não é a mesma coisa. Neste passo os Esquisitos ganham **barulhos**. E, sendo esquisitos, os barulhos também vão ser. 🔊

## A ideia: um som pra cada situação

| Situação | Nome do som | Sugestão |
|---|---|---|
| Um Esquisito anda pra uma casa livre | `passo` | Um "plop" ou "tuc" curtinho |
| Capturaram um Zé-Pequeno | `captura Z` | Um "ai!" fininho |
| Capturaram uma Geladeira | `captura G` | Um "CLANG" de metal |
| Capturaram uma Mola | `captura M` | "Boing!" |
| Capturaram uma Sombra | `captura S` | Um "uuuuh" de fantasma |
| Capturaram um Super-Bobo | `captura B` | Uma buzina de palhaço |
| Capturaram uma Almofada | `captura A` | Um "PUF" fofo |
| Vitória | `vitória` | Uma fanfarra |
| Derrota | `derrota` | Um trombone triste: *uón uón uóóón* |

## 1. Arrume os sons

Os sons vão morar no **Cérebro** (atores escondidos também tocam som). Na aba **Sons** do Cérebro, você pode:

- **Escolher da biblioteca:** tem muita coisa boa lá, procure por palavras como *boing*, *pop*, *drum*, *crash*…
- **Gravar a sua voz:** escolha **gravar...** e faça você mesmo o barulho da geladeira sendo capturada. (Esse é o jeito mais divertido. Sério.)

Renomeie cada som **exatamente** com os nomes da tabela.

## 2. O truque do nome montado

Lembra que os clones vestem a fantasia com o **nome** que está na lista? Com sons dá pra fazer igual! Em vez de seis "se" (um pra cada Esquisito), a gente **monta** o nome do som juntando `captura ` com a letra 2 do capturado.

No fim do bloco `mover` (antes da parte da Almofada), adicione:

```blocos
controle: se <operadores: {capturado} = [livre]> então
  som: toque o som [passo ▾]
senão
  som: toque o som {operadores: junte [captura ] com {operadores: letra (2) de {capturado}}}
```

:::atencao O espaço escondido
Repare que é `captura ` **com um espaço** no final, antes de juntar a letra. Sem o espaço, o nome vira `capturaG` e o Scratch não acha o som.
:::

:::dica Toque o som, não "toque até o fim"
Dentro do `mover` (que roda sem atualizar a tela), use [[som: toque o som [passo ▾]]] e **não** [[som: toque o som [passo ▾] até o fim]]. O "até o fim" faria o jogo inteiro esperar o som acabar.
:::

## 3. Vitória e derrota

No **Narrador**, dá pra tocar os sons de fim também. Copie os sons `vitória` e `derrota` pro Narrador (arraste o som da aba Sons e solte em cima do ator Narrador) e adicione:

```blocos
eventos: quando eu receber [jogador venceu ▾]
som: toque o som [vitória ▾]

eventos: quando eu receber [computador venceu ▾]
som: toque o som [derrota ▾]
```

(Pode encaixar direto nos scripts que já existem, junto com o "diga".)

## Teste!

Jogue uma partida e preste atenção nos ouvidos. Cada captura tem o som certo? Se algum som não tocar, confira o nome dele letra por letra — inclusive o espaço.

:::desafio
Faça o Narrador ter uma **fala diferente** pra cada captura, usando o mesmo truque do nome montado. Crie uma lista `falas de captura` e… bom, isso fica pra sua imaginação. 😏
:::

:::missao Checklist
- [ ] O Cérebro tem os sons `passo` e os seis `captura`
- [ ] Gravei pelo menos um som com a minha voz
- [ ] O `mover` toca o som certo usando o nome montado
- [ ] Vitória e derrota têm som
- [ ] Salvei
:::
