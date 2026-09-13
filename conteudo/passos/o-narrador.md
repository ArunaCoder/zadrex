Todo jogo fica melhor com alguém comentando. Neste passo, o Zadrex ganha um **Narrador** e aprende uma coisa muito importante: **de quem é a vez**.

## 1. Escolha o Narrador

Crie um ator novo e dê o nome **Narrador**. Pode escolher da biblioteca (um papagaio, um robô, um dinossauro de terno…) ou desenhar. Ele vai morar no **cantinho da direita** do palco, fora do tabuleiro.

Diminua o tamanho dele até caber direitinho lá, tipo em x: 170, y: -110.

## 2. A variável vez

Crie a variável `vez`, **para todos os atores**. Ela vai guardar uma destas três palavras:

| Valor | Quer dizer |
|---|---|
| `jogador` | É a sua vez. Os cliques valem. |
| `computador` | O computador está jogando. Seus cliques são ignorados. |
| `fim` | A partida acabou. |

## 3. O maestro dá as ordens

O Cérebro continua sendo o maestro. Aumente o script da bandeira dele:

```blocos
eventos: quando ⚑ for clicado
aparencia: esconda
variaveis: mude [vez ▾] para [fim] // ninguém joga enquanto arruma
meusblocos: arrumar os esquisitos
eventos: transmita [montar tabuleiro ▾] e espere
eventos: transmita [boas-vindas ▾] e espere
variaveis: mude [vez ▾] para [jogador]
eventos: transmita [vez do jogador ▾]
```

:::dica Por que começar com "fim"?
Enquanto o tabuleiro está sendo montado e o Narrador fala, ninguém deveria poder jogar. Colocar `fim` no começo é como deixar a porta fechada até tudo estar pronto.
:::

## 4. O Narrador fala

No ator **Narrador**:

```blocos
eventos: quando ⚑ for clicado
movimento: vá para x: (170) y: (-110)
aparencia: vá para a camada [da frente ▾]

eventos: quando eu receber [boas-vindas ▾]
aparencia: diga [Bem-vindo à Guerra dos Esquisitos!] por (2) segundos

eventos: quando eu receber [vez do jogador ▾]
aparencia: diga [Sua vez! Escolha um Esquisito.]
```

Repare no truque: como o Cérebro usou **transmita e espere** nas boas-vindas, ele só passa a vez depois que o Narrador termina de falar.

## Teste!

Clique na bandeira. O tabuleiro aparece, o Narrador dá boas-vindas e, dois segundos depois, avisa que é a sua vez?

:::desafio Narrador com personalidade
Crie uma lista `frases de boas-vindas` com várias frases malucas ("A Almofada acordou de mau humor hoje…", "Cuidado com a Mola, ela não tomou o remédio!"). Nas boas-vindas, faça o Narrador dizer um [[listas: item {operadores: número aleatório entre (1) e {listas: tamanho de [frases de boas-vindas ▾]}} de [frases de boas-vindas ▾]]].
:::

:::missao Checklist
- [ ] Criei o ator **Narrador** e ele fica no cantinho da direita
- [ ] Criei a variável `vez`
- [ ] O Cérebro controla a ordem: arrumar, montar, boas-vindas, vez do jogador
- [ ] O Narrador fala nas boas-vindas e na vez do jogador
- [ ] Salvei
:::
