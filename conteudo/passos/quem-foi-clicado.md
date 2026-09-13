O tabuleiro está lindo, mas ainda é só um quadro na parede. Pra virar jogo, ele precisa **perceber os cliques**. E não basta saber que alguém clicou: o jogo precisa saber **em qual casa**.

## A ideia

Cada clone tem um crachá com o número da sua casa (`minha casa`). Então, quando um clone é clicado, ele pode anotar esse número numa variável que todo mundo enxerga e **gritar** pro resto do jogo que houve um clique.

## 1. Crie a variável casa clicada

Crie a variável `casa clicada`, desta vez **Para todos os atores** (o Cérebro precisa ler o que os clones escreveram).

## 2. Ensine os clones a avisar

Coloque este script **no ator Casa** e **também no ator Peça** (dá pra arrastar de um pro outro):

```blocos
eventos: quando este ator for clicado
variaveis: mude [casa clicada ▾] para {minha casa}
eventos: transmita [clique ▾]
```

:::curiosidade Por que nos dois atores?
Pense numa casa com um Esquisito em cima. Quando você clica, quem recebe o clique é o clone da **Peça**, que está na frente. Agora pense numa casa `livre`: o clone da Peça está invisível, então o clique atravessa e chega no clone da **Casa**, que está atrás. Com o script nos dois, qualquer clique funciona.
:::

## Teste!

Na categoria Variáveis, marque o quadradinho ao lado de `casa clicada` pra ela aparecer no palco. Clique na bandeira e depois clique em várias casas:

- Clicou na Almofada do seu time? Tem que aparecer **61**.
- Clicou no canto de cima, na esquerda? **1**.
- Clicou numa casa vazia bem no meio? Algum número entre 17 e 48.

Se o número estiver certo em todas, funcionou! Pode esconder a variável do palco de novo.

:::atencao Arrastei uma peça sem querer!
Dentro do editor do Scratch, dá pra arrastar os atores com o mouse. Se isso acontecer, é só clicar na bandeira de novo. Quando o jogo roda em **tela cheia** (o botão de quadradinho em cima do palco), ninguém consegue arrastar nada.
:::

:::missao Checklist
- [ ] Criei a variável `casa clicada` para todos os atores
- [ ] A Casa e a Peça transmitem `clique` quando são clicadas
- [ ] Testei clicando em casas vazias e em casas com Esquisitos
- [ ] Salvei
:::
