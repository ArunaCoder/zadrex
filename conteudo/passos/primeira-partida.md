Você e o computador já jogam. Mas a partida nunca acaba! Neste passo a gente coloca um **fim de jogo** e você faz a sua **primeira partida de verdade**. 🏁

## Uma regra de fim provisória

Nas regras completas do Zadrex, a partida acaba na **Almofada Amassada**: quando a Almofada está ameaçada e não tem mais como escapar. Programar isso é coisa de Nível Chefão (e a gente vai chegar lá!).

Por enquanto, vamos usar uma regra mais simples: **quem capturar a Grande Almofada do outro, vence**. Ela funciona muito bem pra jogar e testar tudo.

## 1. O mover percebe a Almofada capturada

Lembra da variável `capturado`, que o bloco `mover` preenche? Ela guarda quem estava na casa de chegada. Se a letra 2 for `A`… uma Almofada acabou de ser capturada!

No **Cérebro**, adicione no **fim** do bloco `mover`, embaixo das duas substituições:

```blocos
controle: se <operadores: {operadores: letra (2) de {capturado}} = [A]> então
  variaveis: mude [vez ▾] para [fim]
  controle: se <operadores: {operadores: letra (1) de {capturado}} = [C]> então
    eventos: transmita [jogador venceu ▾]
  senão
    eventos: transmita [computador venceu ▾]
```

<details>
<summary><b>📋 Como o bloco <code>mover</code> fica agora</b></summary>

```blocos
meusblocos: defina mover de {meusblocos: saída} para {meusblocos: chegada}
variaveis: mude [capturado ▾] para {listas: item {meusblocos: chegada} de [tabuleiro ▾]}
listas: substitua o item {meusblocos: chegada} de [tabuleiro ▾] por {listas: item {meusblocos: saída} de [tabuleiro ▾]}
listas: substitua o item {meusblocos: saída} de [tabuleiro ▾] por [livre]
controle: se <operadores: {operadores: letra (2) de {capturado}} = [A]> então
  variaveis: mude [vez ▾] para [fim]
  controle: se <operadores: {operadores: letra (1) de {capturado}} = [C]> então
    eventos: transmita [jogador venceu ▾]
  senão
    eventos: transmita [computador venceu ▾]
```

</details>

:::curiosidade Lembra da Almofada Fantasma?
Se a casa vazia se chamasse `vazio`, a letra 2 seria `a`, e **toda jogada pra uma casa vazia** ia terminar o jogo. Foi pra isso que a gente escolheu `livre` lá no começo!
:::

## 2. Não passe a vez se o jogo acabou

Tem um detalhe: depois de mover, o script do clique muda a `vez` para `computador` — mesmo se o jogo tiver acabado! Isso ia "ressuscitar" a partida.

No **Cérebro**, nos dois scripts que passam a vez, coloque os dois últimos blocos dentro de um "se o jogo não acabou".

**No clique**, o final da jogada fica assim:

```blocos
controle: se <operadores: não <operadores: {vez} = [fim]>> então
  variaveis: mude [vez ▾] para [computador]
  eventos: transmita [vez do computador ▾]
```

**Na vez do computador**, faça o mesmo com o final:

```blocos
controle: se <operadores: não <operadores: {vez} = [fim]>> então
  variaveis: mude [vez ▾] para [jogador]
  eventos: transmita [vez do jogador ▾]
```

<details>
<summary><b>📋 Como o script do clique fica agora</b></summary>

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
      controle: se <operadores: não <operadores: {vez} = [fim]>> então
        variaveis: mude [vez ▾] para [computador]
        eventos: transmita [vez do computador ▾]
    senão
      variaveis: mude [origem ▾] para (0)
      listas: apague todos os itens de [destinos ▾]
```

</details>

<details>
<summary><b>📋 Como o script da vez do computador fica agora</b></summary>

```blocos
eventos: quando eu receber [vez do computador ▾]
controle: espere (0.5) seg
meusblocos: listar jogadas do time [C]
controle: se <operadores: {listas: tamanho de [todas as saídas ▾]} = (0)> então
  variaveis: mude [vez ▾] para [fim]
  eventos: transmita [computador sem jogadas ▾]
  controle: pare [este script ▾]
variaveis: mude [sorteio ▾] para {operadores: número aleatório entre (1) e {listas: tamanho de [todas as saídas ▾]}}
variaveis: mude [origem ▾] para {listas: item {sorteio} de [todas as saídas ▾]}
listas: adicione {listas: item {sorteio} de [todas as chegadas ▾]} a [destinos ▾]
controle: espere (0.7) seg
meusblocos: mover de {origem} para {listas: item {sorteio} de [todas as chegadas ▾]}
variaveis: mude [origem ▾] para (0)
listas: apague todos os itens de [destinos ▾]
controle: se <operadores: não <operadores: {vez} = [fim]>> então
  variaveis: mude [vez ▾] para [jogador]
  eventos: transmita [vez do jogador ▾]
```

</details>

## 3. O Narrador anuncia

No **Narrador**:

```blocos
eventos: quando eu receber [jogador venceu ▾]
aparencia: diga [VOCÊ VENCEU! A Almofada deles virou travesseiro!]

eventos: quando eu receber [computador venceu ▾]
aparencia: diga [O computador ganhou... no sorteio! Quer revanche?]

eventos: quando eu receber [computador sem jogadas ▾]
aparencia: diga [O computador ficou sem jogadas! Empate!]
```

## 4. Jogue! 🎮

Agora é pra valer. Clique na bandeira e jogue uma partida inteira contra o computador.

:::dica Dicas pra ganhar do computador sorteador
- **Tire os Esquisitos de casa.** Avance uns Zés do meio e solte as Molas e as Sombras.
- **Proteja sua Almofada.** O computador joga no sorteio, mas às vezes o sorteio acerta!
- **Use o Super-Bobo.** Ele alcança o tabuleiro inteiro. Mas cuidado pra não perder ele de bobeira.
- **Vá atrás da Almofada deles.** Quando ela ficar descoberta, é só capturar.
:::

## Diga xis! 📸

Esse é um grande momento: é o primeiro jogo **completo** do Zadrex. Grave um GIF da partida ou tire um print da tela na hora da vitória pra colocar aqui em **Olha só como ficou**.

:::adulto
No Windows, **Win + Shift + S** tira um print de um pedaço da tela; no Mac, **Cmd + Shift + 4**. Para GIF, o ScreenToGif (Windows) é ótimo.
:::

:::missao Checklist
- [ ] O jogo acaba quando uma Almofada é capturada
- [ ] A vez não passa depois que o jogo acaba
- [ ] O Narrador anuncia quem venceu
- [ ] Joguei uma partida inteira contra o computador
- [ ] Ganhei do computador pelo menos uma vez 😎
- [ ] Gravei um GIF ou tirei um print da vitória
- [ ] Salvei (e guardei uma cópia de segurança!)
:::
