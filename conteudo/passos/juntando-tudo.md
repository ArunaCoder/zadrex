Os seis Esquisitos já sabem pra onde podem ir. Mas o Modo Bagunça ainda está ligado: dá pra ignorar as bolinhas e mandar qualquer um pra qualquer lugar. Chegou a hora de **desligar a bagunça** e deixar o jogo sério. 🧐

## 1. Confira o calcular destinos

O bloco que chama todo mundo deve estar assim, com **seis** "se":

```blocos
meusblocos: defina calcular destinos de {meusblocos: casa}
listas: apague todos os itens de [destinos ▾]
variaveis: mude [peça ▾] para {listas: item {meusblocos: casa} de [tabuleiro ▾]}
variaveis: mude [meu time ▾] para {operadores: letra (1) de {peça}}
controle: se <operadores: {operadores: letra (2) de {peça}} = [Z]> então
  meusblocos: movimentos do zé {meusblocos: casa}
controle: se <operadores: {operadores: letra (2) de {peça}} = [G]> então
  meusblocos: movimentos da geladeira {meusblocos: casa}
controle: se <operadores: {operadores: letra (2) de {peça}} = [M]> então
  meusblocos: movimentos da mola {meusblocos: casa}
controle: se <operadores: {operadores: letra (2) de {peça}} = [S]> então
  meusblocos: movimentos da sombra {meusblocos: casa}
controle: se <operadores: {operadores: letra (2) de {peça}} = [B]> então
  meusblocos: movimentos da geladeira {meusblocos: casa}
  meusblocos: movimentos da sombra {meusblocos: casa}
controle: se <operadores: {operadores: letra (2) de {peça}} = [A]> então
  meusblocos: movimentos da almofada {meusblocos: casa}
```

## 2. Só pode ir onde tem bolinha

A mudança é pequena, mas muda tudo. No script do clique, o Cérebro só pode mover se a casa clicada **estiver na lista de destinos**. E, se você clicar numa casa que não vale, ele "solta" o Esquisito escolhido:

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
```

:::robo Em português de robô
Recebi um clique na vez do jogador.
- Foi num Esquisito meu? Escolho ele e calculo os destinos.
- Não foi? Então, se tem alguém escolhido **e** a casa clicada está nos destinos, eu movo. Movendo ou não, solto a escolha e apago as bolinhas.
:::

Tchau, Modo Bagunça. Foi divertido. 👋🌪️

## 3. O grande teste das regras

Faça esta lista de testes com calma. Se algum falhar, volte no passo daquele Esquisito.

| Teste | Esperado |
|---|---|
| Clicar num Zé no começo | 2 bolinhas pra frente |
| Clicar numa Mola no começo | 2 bolinhas em L |
| Clicar na Geladeira, Sombra, Super-Bobo ou Almofada no começo | Nenhuma bolinha (estão presos) |
| Escolher um Zé e clicar 3 casas pra frente | Não move e solta o Zé |
| Mover um Zé e depois clicar na Sombra de trás dele | A Sombra ganha bolinhas na diagonal que abriu |
| Escolher um Esquisito e clicar num amigo | Troca a escolha pro amigo |

:::atencao Problemas comuns
- **"A Mola não pula por cima"** → confira se os pulos estão com **até 1**.
- **"O Zé anda pra trás"** → confira o sinal da `frente` (Jogador é **-1**).
- **"Um Esquisito sumiu depois de mover"** → confira a ordem dos blocos dentro do `mover`.
- **"Aparecem bolinhas em casas estranhas do outro lado"** → confira as checagens de beirada no `andar` e no Zé.
- **"Nada tem bolinha"** → confira se o `calcular destinos` apaga a lista **no começo**, não no fim.
:::

## Você acabou de programar as regras do xadrez 🏆

Pense no que você fez: **todas** as regras de movimento das peças do xadrez, com capturas e bloqueios, funcionando no Scratch. Ainda faltam umas regras especiais (elas estão no Nível Chefão), mas o coração do jogo está pronto.

Só tem um probleminha: você está jogando sozinho. O computador ainda nem acordou. Próximo capítulo! 🤖

:::missao Checklist
- [ ] O `calcular destinos` tem os seis Esquisitos
- [ ] Só dá pra mover pra casas com bolinha
- [ ] Clicar numa casa sem bolinha solta o Esquisito
- [ ] Fiz todos os testes da tabela
- [ ] Salvei (e baixei uma cópia!)
:::
