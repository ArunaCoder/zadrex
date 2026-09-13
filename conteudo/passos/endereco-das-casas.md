Este passo é só de **pensar** (e fazer umas continhas). Mas ele é a chave de tudo: se você entender o endereço das casas, o resto do jogo fica muito mais fácil.

## Cada casa tem um número

Imagine as poltronas de um cinema. A gente começa a contar pela fileira de cima, da esquerda pra direita. Acabou a fileira? Desce pra próxima e continua contando.

<z-diagrama numeros="grande" rotulos destacar="28" legenda="A casa 28 fica na linha 4, coluna 4."></z-diagrama>

Então:

- A **casa 1** fica no canto de cima, na esquerda.
- A **casa 8** fica no canto de cima, na direita.
- A **casa 9** é a primeira da segunda linha.
- A **casa 64** é a última de todas.

Cada casa também tem uma **linha** (de 1 a 8, de cima pra baixo) e uma **coluna** (de 1 a 8, da esquerda pra direita).

## Fórmula 1: da linha e coluna para o número da casa

Pense assim: pra chegar na linha 4, você passou por **3 linhas inteiras** antes. Cada linha inteira tem 8 casas. Então já contou 3 × 8 = 24 casas. Aí anda mais 4 colunas: 24 + 4 = **28**. 🎉

> **casa = (linha − 1) × 8 + coluna**

## Fórmula 2: do número da casa para linha e coluna

Agora ao contrário. Pra isso a gente usa uma ideia chamada **resto**.

:::curiosidade O que é "resto"?
Se você tem 27 balas e divide em saquinhos com 8 balas, consegue fazer 3 saquinhos cheios e **sobram 3 balas**. Esse 3 que sobrou é o **resto**. No Scratch ele é o bloco [[operadores: resto de (27) por (8)]].
:::

> **linha = arredondado para baixo de ((casa − 1) ÷ 8) + 1**
>
> **coluna = resto de (casa − 1) por 8, + 1**

Testando com a casa 28: (28 − 1) ÷ 8 = 3,375. Arredondando pra baixo, dá 3. Mais 1: **linha 4** ✅. E o resto de 27 por 8 é 3. Mais 1: **coluna 4** ✅.

Os blocos que fazem isso ficam em **Operadores**:

- [[operadores: [arredondamento para baixo de ▾] de ( )]] (ele começa mostrando "módulo", troque no menu)
- [[operadores: resto de ( ) por ( )]]

## Fórmula 3: onde a casa fica no palco

Lembra que cada casa tem 40 passos, e que o centro da casa 1 fica em x: -200, y: 140? Juntando tudo:

> **x = coluna × 40 − 240**
>
> **y = 180 − linha × 40**

Repare no y: quanto **maior** a linha, **mais baixo** a casa fica — por isso a gente tira do 180.

| Casa | Linha | Coluna | x | y |
|---|---|---|---|---|
| 1 | 1 | 1 | -200 | 140 |
| 8 | 1 | 8 | 80 | 140 |
| 28 | 4 | 4 | -80 | 20 |
| 57 | 8 | 1 | -200 | -140 |
| 64 | 8 | 8 | 80 | -140 |

:::desafio Desafio do detetive
A **Grande Almofada do Jogador** começa na **casa 61**. Descubra a linha, a coluna, o x e o y dela. (Resposta escondida aqui embaixo, não vale espiar antes!)
:::

<details>
<summary><b>👀 Ver a resposta</b></summary>

Linha 8, coluna 5, x: -40, y: -140.

</details>

:::missao Checklist
- [ ] Sei contar as casas de 1 a 64
- [ ] Entendi o que é o resto de uma divisão
- [ ] Consegui calcular a linha, a coluna, o x e o y de pelo menos uma casa
:::
