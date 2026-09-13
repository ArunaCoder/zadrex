O palco do Scratch é como uma folha de papel quadriculado invisível. Todo ponto tem um **endereço** com dois números: o **x** e o **y**.

## O mapa do x e do y

- O **x** diz se o ponto está mais pra **esquerda** ou pra **direita**. Vai de **-240** (beirada esquerda) até **240** (beirada direita).
- O **y** diz se o ponto está mais pra **cima** ou pra **baixo**. Vai de **-180** (lá embaixo) até **180** (lá em cima).
- Bem no meio do palco fica o ponto **x: 0, y: 0**.

Então o palco tem 480 passos de largura e 360 de altura.

<z-coordenadas></z-coordenadas>

## Onde vai ficar o tabuleiro

Cada casa do nosso tabuleiro vai ter **40 passos** de lado. Oito casas × 40 passos = **320 passos**. Isso cabe direitinho na altura do palco (que tem 360), sobrando um pouquinho em cima e embaixo.

Vamos colocar o tabuleiro **encostado na esquerda**. Assim sobra um cantinho à direita pra um personagem que vai narrar o jogo ("Sua vez!", "Xeque!", "A Geladeira voou!").

Olhe no mapa acima: o centro da **casa 1** (a do canto de cima, na esquerda) fica em **x: -200, y: 140**. O centro da **casa 64** (canto de baixo, na direita) fica em **x: 80, y: -140**. No passo seguinte a gente descobre como calcular o centro de qualquer casa.

## Missão: pintar o cenário

1. Embaixo, à direita, clique no **Palco**.
2. Vá na aba **Cenários**.
3. Pinte o fundo com uma cor de que você goste. Dica: use a ferramenta **Retângulo** e cubra o palco inteiro.
4. No cantinho da direita (a parte depois do x: 100), capriche: escreva **ZADREX** com a ferramenta **Texto**, desenhe umas estrelinhas, uma geladeira voando lá longe…
5. Dê o nome **jogo** para esse cenário.

:::dica Não pinte o tabuleiro!
Os quadradinhos do tabuleiro **não** vão ser desenhados no cenário. Eles vão ser clones — e é justamente assim que o jogo vai saber em qual casa você clicou. Deixe a área da esquerda com uma cor lisa.
:::

## Experimento rápido

Quer ver o x e o y funcionando? Escolha qualquer ator da biblioteca, arraste ele pelo palco e olhe os números **x** e **y** mudando embaixo do palco. Arraste até o cantinho de cima na esquerda: os números chegam perto de -240 e 180? Depois pode apagar esse ator.

:::missao Checklist
- [ ] Sei que o x vai de -240 a 240 e o y de -180 a 180
- [ ] Pintei o cenário e deixei espaço para o tabuleiro na esquerda
- [ ] Decorei o cantinho da direita
- [ ] Salvei
:::
