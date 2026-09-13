Esta é a regra mais esquisita do xadrez — perfeita pra um jogo de Esquisitos. Ela tem um nome em francês, ***en passant*** (se fala "an passân"), que quer dizer **"de passagem"**. No Zadrex a gente chama de **Pega no Pulo**. 🐸

## A história

Lembra que o Zé-Pequeno pode andar **2 casas** na largada? Imagine um Zé do computador que usa esse pulo duplo pra passar **do lado** do seu Zé, escapando da captura.

Pois o xadrez diz: **não vale fugir assim!** Na jogada **logo em seguida**, o seu Zé pode capturar o espertinho como se ele tivesse andado só **uma** casa — indo pra casa que ele pulou.

<z-diagrama pecas="28:JZ 29:CZ" destacar="29" marcar="21" legenda="O Zé do computador pulou da casa 13 pra 29. O seu Zé pode ir pra 21 e capturar ele!"></z-diagrama>

## As regras do Pega no Pulo

1. O Zé inimigo acabou de andar **2 casas** (na jogada imediatamente anterior).
2. Ele parou **ao lado** do seu Zé.
3. O seu Zé anda **na diagonal** pra casa que o inimigo **pulou**.
4. O Zé inimigo é capturado, mesmo não estando na casa de chegada.
5. É **agora ou nunca**: se você fizer outra jogada, perdeu a chance.

## 1. Lembrar do pulo

Crie a variável `casa do pulo`. Ela guarda a casa que foi **pulada** na última jogada (ou `0` se ninguém pulou). Ponha [[variaveis: mude [casa do pulo ▾] para (0)]] no `arrumar os esquisitos`.

Se um Zé foi da casa 13 pra casa 29, a casa pulada é a do meio: (13 + 29) ÷ 2 = **21**.

## 2. O mover faz o Pega no Pulo

No bloco `mover`, depois das substituições e de mudar a `peça movida`, adicione (a ordem dos dois "se" importa!):

```blocos
// A) foi um Pega no Pulo? Então remove o Zé que pulou
controle: se <operadores: <operadores: {operadores: letra (2) de {peça movida}} = [Z]> e <operadores: {meusblocos: chegada} = {casa do pulo}>> então
  controle: se <operadores: {operadores: letra (1) de {peça movida}} = [J]> então
    variaveis: mude [capturado ▾] para {listas: item {operadores: {meusblocos: chegada} + (8)} de [tabuleiro ▾]}
    listas: substitua o item {operadores: {meusblocos: chegada} + (8)} de [tabuleiro ▾] por [livre]
  senão
    variaveis: mude [capturado ▾] para {listas: item {operadores: {meusblocos: chegada} - (8)} de [tabuleiro ▾]}
    listas: substitua o item {operadores: {meusblocos: chegada} - (8)} de [tabuleiro ▾] por [livre]
// B) guarda o pulo desta jogada (ou zera)
variaveis: mude [casa do pulo ▾] para (0)
controle: se <operadores: <operadores: {operadores: letra (2) de {peça movida}} = [Z]> e <operadores: {operadores: [módulo ▾] de {operadores: {meusblocos: chegada} - {meusblocos: saída}}} = (16)>> então
  variaveis: mude [casa do pulo ▾] para {operadores: {operadores: {meusblocos: saída} + {meusblocos: chegada}} / (2)}
```

:::robo Por que + 8 e − 8?
Se o **seu** Zé (que anda pra cima) capturou de passagem, o Zé inimigo ficou **uma linha abaixo** da chegada: chegada + 8. Se foi o Zé do **computador** (que anda pra baixo), o seu Zé ficou uma linha **acima**: chegada − 8.
:::

:::atencao Primeiro A, depois B
Se você zerar a `casa do pulo` antes de checar o Pega no Pulo, o jogo esquece o pulo antes de usar. O Zé inimigo escapa e ainda ri da sua cara. 😜
:::

## 3. O Zé enxerga a chance

No bloco `movimentos do zé`, nas **duas** checagens de captura na diagonal, a condição fica um pouco maior: vale capturar se tem inimigo **ou** se a casa é a `casa do pulo`.

```blocos
controle: se <operadores: <operadores: <operadores: não <operadores: {z quem} = [livre]>> e <operadores: não <operadores: {operadores: letra (1) de {z quem}} = {meu time}>>> ou <operadores: {z alvo} = {casa do pulo}>> então
  listas: adicione {z alvo} a [destinos ▾]
```

## Teste!

Mudando a lista na mão: coloque seu Zé na casa 28 e deixe o Zé do computador na casa 13, com a 21 e a 29 livres. Agora espere o sorteio fazer ele pular pra 29… o que pode demorar! Mais rápido: coloque o `CZ` direto na 29 e mude a `casa do pulo` pra 21 na mão (clicando duas vezes na variável no palco, ou com um bloco solto).

- Clique no seu Zé: aparece bolinha na casa 21? ✅
- Capture: o Zé da casa 29 some? ✅
- Faça outra jogada em vez de capturar: na próxima vez a chance sumiu? ✅

## 🏆 Você programou o xadrez inteiro

Com o Pega no Pulo, o Zadrex tem **todas as regras de movimento do xadrez**: movimentos de cada peça, capturas, promoção, xeque, jogadas proibidas, xeque-mate, afogamento, roque e *en passant*. Tem muito adulto que joga xadrez há anos e não sabe todas essas regras. Você não só sabe: você **ensinou** elas pro computador.

:::curiosidade As regras que ficaram de fora
Existem umas regras de empate raríssimas que nem os campeonatos de escola usam muito: empate quando a mesma posição se repete 3 vezes, empate depois de 50 jogadas sem captura e sem mexer Zé, e empate quando não sobram Esquisitos suficientes pra dar xeque-mate. Se um dia der vontade, fica de desafio!
:::

:::adulto
A simulação do filtro de lances legais não remove o peão capturado *en passant*. Isso só importa num caso raríssimo (rei e torre adversária na mesma fileira dos dois peões, com o *en passant* expondo o rei). Para um projeto desses, dá para ignorar tranquilamente — ou tratar como desafio extra.
:::

:::missao Checklist
- [ ] Criei a variável `casa do pulo`
- [ ] O `mover` faz o Pega no Pulo e guarda os pulos
- [ ] O Zé mostra a bolinha do Pega no Pulo
- [ ] Testei capturar e deixar passar a chance
- [ ] Comemorei ter programado o xadrez inteiro 🎉
- [ ] Salvei (e baixei uma cópia!)
:::
