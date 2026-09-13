Pro computador sortear uma jogada, primeiro ele precisa saber **todas** as jogadas que pode fazer. Todas mesmo: de todos os Esquisitos dele, pra todas as casas possíveis. Parece muito trabalho? Pra gente, sim. Pro Scratch, é um piscar de olhos.

## A ideia

Uma jogada tem duas partes: **de onde sai** e **pra onde chega**. Então a gente vai usar **duas listas** que andam juntas, como duas colunas de uma tabela:

| Nº | `todas as saídas` | `todas as chegadas` | Que jogada é essa |
|---|---|---|---|
| 1 | 2 | 17 | Mola da casa 2 pula pra casa 17 |
| 2 | 2 | 19 | Mola da casa 2 pula pra casa 19 |
| 3 | 7 | 22 | Mola da casa 7 pula pra casa 22 |
| 4 | 7 | 24 | Mola da casa 7 pula pra casa 24 |
| 5 | 9 | 17 | Zé da casa 9 anda uma casa |
| … | … | … | … |

A jogada número 5 é o item 5 de uma lista **junto com** o item 5 da outra. Elas nunca podem se desencontrar!

## Como fazer a lista

E aqui vem a parte bonita: a gente **já tem** o bloco que descobre os destinos de um Esquisito. É só usar ele em todos os Esquisitos do computador, um por um.

:::robo Em português de robô
1. Apagar as duas listas.
2. Para cada casa `i`, de 1 até 64:
   - Se tem um Esquisito do time nessa casa:
     - Calcular os destinos dele.
     - Para cada destino `k` da lista `destinos`:
       - Adicionar `i` em `todas as saídas`.
       - Adicionar o destino em `todas as chegadas`.
3. No fim, apagar a lista `destinos` (pra não sobrar bolinha no tabuleiro).
:::

## 1. Crie as listas e variáveis

No Cérebro, crie as listas `todas as saídas` e `todas as chegadas`, e as variáveis `i` e `k`.

## 2. Crie o bloco

Crie o bloco **`listar jogadas do time (time)`**, com uma entrada chamada `time` e **sem atualização de tela**:

```blocos
meusblocos: defina listar jogadas do time {meusblocos: time}
listas: apague todos os itens de [todas as saídas ▾]
listas: apague todos os itens de [todas as chegadas ▾]
variaveis: mude [i ▾] para (1)
controle: repita (64) vezes
  controle: se <operadores: {operadores: letra (1) de {listas: item {i} de [tabuleiro ▾]}} = {meusblocos: time}> então
    meusblocos: calcular destinos de {i}
    variaveis: mude [k ▾] para (1)
    controle: repita {listas: tamanho de [destinos ▾]} vezes
      listas: adicione {i} a [todas as saídas ▾]
      listas: adicione {listas: item {k} de [destinos ▾]} a [todas as chegadas ▾]
      variaveis: adicione (1) a [k ▾]
  variaveis: adicione (1) a [i ▾]
listas: apague todos os itens de [destinos ▾]
```

:::dica Por que o time é uma entrada?
Hoje a gente só precisa das jogadas do Computador. Mas no Nível Chefão vamos precisar saber se **você** ainda tem jogadas (pra descobrir o xeque-mate). Com o time como entrada, o mesmo bloco serve pros dois!
:::

## Teste!

Crie um teste temporário no Cérebro:

```blocos
eventos: quando a tecla [l ▾] for pressionada
meusblocos: listar jogadas do time [C]
```

Mostre as duas listas no palco, rode o jogo e aperte **l** logo no começo da partida. Quantas jogadas apareceram?

<details>
<summary><b>👀 Quantas deveriam ser?</b></summary>

**20 jogadas.** Cada um dos 8 Zés pode andar 1 ou 2 casas (8 × 2 = 16) e cada uma das 2 Molas tem 2 pulos (2 × 2 = 4). 16 + 4 = 20. É exatamente o número de primeiros lances possíveis no xadrez de verdade!

</details>

Agora faça umas jogadas e aperte **l** de novo: o número mudou? Troque o `[C]` por `[J]` e veja as **suas** jogadas. Depois pode apagar o teste.

:::curiosidade Números gigantes
Com 20 jogadas pra cada lado, depois de só **uma rodada** (você e o computador) já existem 400 partidas diferentes. Depois de 5 rodadas, são quase **70 trilhões**. É por isso que o xadrez nunca fica repetido.
:::

:::missao Checklist
- [ ] Criei as listas `todas as saídas` e `todas as chegadas`
- [ ] Criei as variáveis `i` e `k`
- [ ] Criei o bloco `listar jogadas do time (time)`
- [ ] No começo da partida, o Computador tem 20 jogadas
- [ ] Salvei (e baixei uma cópia!)
:::
