Até agora você jogou sozinho, uma jogada atrás da outra. Mas no Zadrex cada time joga **uma vez**. Neste passo o jogo aprende a **passar a vez** — mesmo que o computador ainda não saiba fazer nada com ela.

## A ideia

Depois que você faz uma jogada, três coisas precisam acontecer:

1. A variável `vez` muda para `computador`. (Assim seus cliques passam a ser ignorados.)
2. O Cérebro transmite a mensagem `vez do computador`.
3. Quando o computador terminar, a `vez` volta pra `jogador` e o Cérebro transmite `vez do jogador`.

## 1. Passe a vez depois da sua jogada

No script do clique do Cérebro, reorganize a parte de mover assim:

```blocos
eventos: quando eu receber [clique ▾]
controle: se <operadores: {vez} = [jogador]> então
  controle: se <operadores: {operadores: letra (1) de {listas: item {casa clicada} de [tabuleiro ▾]}} = [J]> então
    variaveis: mude [origem ▾] para {casa clicada}
    meusblocos: calcular destinos de {origem}
  senão
    controle: se <operadores: <operadores: {origem} > (0)> e <listas: [destinos ▾] contém {casa clicada}?>> então
      meusblocos: mover de {origem} para {casa clicada}
      variaveis: mude [origem ▾] para (0)
      listas: apague todos os itens de [destinos ▾]
      variaveis: mude [vez ▾] para [computador]
      eventos: transmita [vez do computador ▾]
    senão
      variaveis: mude [origem ▾] para (0)
      listas: apague todos os itens de [destinos ▾]
```

:::dica Por que limpar antes de transmitir?
É uma questão de arrumação: primeiro a gente termina o que estava fazendo (soltar a escolha, apagar as bolinhas), e só depois avisa o computador. Assim ninguém tropeça nas coisas de ninguém.
:::

## 2. Um computador preguiçoso (por enquanto)

Ainda não sabemos fazer o computador jogar. Então, por enquanto, ele só finge que pensa e devolve a vez. No Cérebro:

```blocos
eventos: quando eu receber [vez do computador ▾]
controle: espere (1) seg // "pensando"...
variaveis: mude [vez ▾] para [jogador]
eventos: transmita [vez do jogador ▾]
```

## 3. O Narrador comenta

No Narrador:

```blocos
eventos: quando eu receber [vez do computador ▾]
aparencia: pense [Hmm... deixa eu pensar...]
```

## Teste!

Faça uma jogada. O Narrador pensa por um segundo, depois diz "Sua vez!"? E, **durante** esse segundo, tente clicar nos seus Esquisitos: nada acontece, certo? É a variável `vez` protegendo o turno do computador.

:::curiosidade
Todo jogo de turnos funciona assim: jogo da velha, dominó, Pokémon, Uno. Sempre existe algum lugar guardando **de quem é a vez**. No nosso jogo, é uma variável com uma palavra dentro.
:::

:::missao Checklist
- [ ] Depois da minha jogada, a `vez` muda para `computador`
- [ ] Não consigo jogar enquanto é a vez do computador
- [ ] O computador devolve a vez depois de 1 segundo
- [ ] O Narrador pensa na vez do computador e avisa na minha vez
- [ ] Salvei
:::
