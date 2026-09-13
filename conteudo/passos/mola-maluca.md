<z-esquisito tipo="M" tamanho="110"></z-esquisito>

Boing! A **Mola Maluca** é a única que **pula por cima** dos outros Esquisitos. Ela dá um salto em forma de **L**: duas casas pra um lado e uma pro outro.

<z-diagrama pecas="36:JM 27:JZ 28:CZ 29:JZ 35:CS 37:JZ 43:CZ 44:JZ 45:CG" mover="36" legenda="Cercada por todos os lados? A Mola nem liga."></z-diagrama>

## Os 8 pulos

Um pulo em L também é uma "direção" — só que torta e gigante. Olhe o diagrama e conte: são **8 pulos** possíveis.

| Pulo | `dl` | `dc` |
|---|---|---|
| 2 pra cima, 1 pra esquerda | -2 | -1 |
| 2 pra cima, 1 pra direita | -2 | 1 |
| 1 pra cima, 2 pra esquerda | -1 | -2 |
| 1 pra cima, 2 pra direita | -1 | 2 |
| 1 pra baixo, 2 pra esquerda | 1 | -2 |
| 1 pra baixo, 2 pra direita | 1 | 2 |
| 2 pra baixo, 1 pra esquerda | 2 | -1 |
| 2 pra baixo, 1 pra direita | 2 | 1 |

## E como ela pula por cima?

Esse é o truque mais bonito do jogo. O bloco `andar` só olha as casas onde ele **para**. Com **até 1 passo**, ele faz um único salto de `dl` e `dc`, direto pra casa final — sem nunca olhar as casas do meio. Então, pro bloco `andar`, não existe "alguém no caminho". A Mola pula de graça! 🎉

E quando o pulo sai do tabuleiro (tipo 2 colunas pra esquerda estando na coluna 1)? O bloco `andar` já sabe parar na beirada.

## O bloco da Mola

Crie **`movimentos da mola (casa)`** com os 8 pulos da tabela, todos **até 1 passo**. Tente montar sozinho!

<details>
<summary><b>👀 Ver os blocos da Mola</b></summary>

```blocos
meusblocos: defina movimentos da mola {meusblocos: casa}
meusblocos: andar de {meusblocos: casa} direção (-2) (-1) até (1) passos
meusblocos: andar de {meusblocos: casa} direção (-2) (1) até (1) passos
meusblocos: andar de {meusblocos: casa} direção (-1) (-2) até (1) passos
meusblocos: andar de {meusblocos: casa} direção (-1) (2) até (1) passos
meusblocos: andar de {meusblocos: casa} direção (1) (-2) até (1) passos
meusblocos: andar de {meusblocos: casa} direção (1) (2) até (1) passos
meusblocos: andar de {meusblocos: casa} direção (2) (-1) até (1) passos
meusblocos: andar de {meusblocos: casa} direção (2) (1) até (1) passos
```

</details>

E no `calcular destinos de (casa)`:

```blocos
controle: se <operadores: {operadores: letra (2) de {peça}} = [M]> então
  meusblocos: movimentos da mola {meusblocos: casa}
```

## Teste!

Essa é boa: **não precisa de bagunça**! A Mola é a única peça (além dos Zés) que consegue se mexer logo no começo do jogo. Clique na Mola da casa 58: devem aparecer bolinhas nas casas **41** e **43**.

<z-diagrama inicial mover="58" numeros></z-diagrama>

:::curiosidade
Os jogadores de xadrez dizem que o cavalo (a nossa Mola) é a peça mais **traiçoeira**, porque ela ataca de um jeito que ninguém espera. Quem tem Mola Maluca perto da Almofada inimiga é perigoso!
:::

:::missao Checklist
- [ ] Criei o bloco `movimentos da mola (casa)` com os 8 pulos até 1 passo
- [ ] Adicionei a Mola no `calcular destinos`
- [ ] A Mola da casa 58 mostra bolinhas em 41 e 43
- [ ] Entendi por que a Mola consegue pular por cima
- [ ] Salvei
:::
