<z-esquisito tipo="G" tamanho="110"></z-esquisito>

A primeira a ganhar regras é ela: a **Geladeira Voadora**. Ninguém sabe como ela voa, mas todo mundo sabe **pra onde**: em linha reta, pra cima, pra baixo e pros lados.

<z-diagrama pecas="35:JG 11:CZ 33:JZ 38:CM" mover="35" legenda="4 direções, até 7 passos cada. Para no amigo, captura o inimigo."></z-diagrama>

## 1. O bloco da Geladeira

Com o bloco `andar` pronto, a Geladeira fica fácil. No Cérebro, crie o bloco **`movimentos da geladeira (casa)`** (com uma entrada chamada `casa`, e sem atualização de tela):

```blocos
meusblocos: defina movimentos da geladeira {meusblocos: casa}
meusblocos: andar de {meusblocos: casa} direção (-1) (0) até (7) passos // cima
meusblocos: andar de {meusblocos: casa} direção (1) (0) até (7) passos // baixo
meusblocos: andar de {meusblocos: casa} direção (0) (-1) até (7) passos // esquerda
meusblocos: andar de {meusblocos: casa} direção (0) (1) até (7) passos // direita
```

Só isso! Quatro direções da tabela, cada uma até 7 passos.

## 2. O bloco que chama todo mundo

Agora a gente precisa de um bloco que olha **qual Esquisito** está na casa e chama os movimentos certos. Ele vai crescer a cada passo deste capítulo. Crie no Cérebro a variável `peça` e o bloco **`calcular destinos de (casa)`**:

```blocos
meusblocos: defina calcular destinos de {meusblocos: casa}
listas: apague todos os itens de [destinos ▾]
variaveis: mude [peça ▾] para {listas: item {meusblocos: casa} de [tabuleiro ▾]}
variaveis: mude [meu time ▾] para {operadores: letra (1) de {peça}}
controle: se <operadores: {operadores: letra (2) de {peça}} = [G]> então
  meusblocos: movimentos da geladeira {meusblocos: casa}
```

:::dica Por que o meu time é calculado aqui?
Assim o bloco funciona pros **dois** times. Se a peça for `CG`, o meu time vira `C`, e o bloco andar vai achar que os Esquisitos com `J` são os inimigos. Isso vai ser essencial quando o computador jogar.
:::

## 3. Ligue no clique

No script do clique do Cérebro, logo depois de escolher a origem, calcule os destinos. E, depois de mover, apague as bolinhas:

```blocos
eventos: quando eu receber [clique ▾]
controle: se <operadores: {vez} = [jogador]> então
  controle: se <operadores: {operadores: letra (1) de {listas: item {casa clicada} de [tabuleiro ▾]}} = [J]> então
    variaveis: mude [origem ▾] para {casa clicada}
    meusblocos: calcular destinos de {origem}
  senão
    controle: se <operadores: {origem} > (0)> então
      meusblocos: mover de {origem} para {casa clicada}
      variaveis: mude [origem ▾] para (0)
      listas: apague todos os itens de [destinos ▾]
```

## Teste!

No começo do jogo, as Geladeiras estão presas no canto, cercadas de amigos. Clicando nelas… nenhuma bolinha. Tá certo!

Mas o Modo Bagunça ainda está ligado — então **use a bagunça a seu favor**: leve uma Geladeira pro meio do tabuleiro e clique nela de novo. Bolinhas em cruz? 🎉

- Coloque um Zé seu no caminho: as bolinhas param antes dele?
- Leve a Geladeira pra perto de um inimigo: a casa do inimigo ganhou moldura?

:::missao Checklist
- [ ] Criei o bloco `movimentos da geladeira (casa)`
- [ ] Criei a variável `peça` e o bloco `calcular destinos de (casa)`
- [ ] Clicar numa Geladeira mostra os destinos certos
- [ ] Depois de mover, as bolinhas somem
- [ ] Salvei
:::
