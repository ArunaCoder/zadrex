A memória do jogo vai ser uma lista com 64 itens, um para cada casa. Mas o que a gente escreve em cada item? "Geladeira Voadora do time do Computador" é comprido demais. A gente precisa de um **código secreto** curtinho.

## Duas letras dizem tudo

Cada Esquisito vai ser representado por **duas letras**:

- A **primeira letra** diz o **time**: `J` de **J**ogador ou `C` de **C**omputador.
- A **segunda letra** diz **quem é**.

| Letra | Esquisito |
|---|---|
| `Z` | <z-esquisito tipo="Z" tamanho="36"></z-esquisito> **Z**é-Pequeno |
| `G` | <z-esquisito tipo="G" tamanho="36"></z-esquisito> **G**eladeira Voadora |
| `M` | <z-esquisito tipo="M" tamanho="36"></z-esquisito> **M**ola Maluca |
| `S` | <z-esquisito tipo="S" tamanho="36"></z-esquisito> **S**ombra |
| `B` | <z-esquisito tipo="B" tamanho="36"></z-esquisito> Super-**B**obo |
| `A` | <z-esquisito tipo="A" tamanho="36"></z-esquisito> Grande **A**lmofada |

Então `JG` é uma Geladeira do Jogador, `CZ` é um Zé-Pequeno do Computador, e assim por diante. E uma casa sem ninguém vai ser escrita como `livre`.

## Os 12 códigos

| Time do Jogador | Time do Computador |
|---|---|
| <z-esquisito tipo="Z" time="J" tamanho="32"></z-esquisito> `JZ` | <z-esquisito tipo="Z" time="C" tamanho="32"></z-esquisito> `CZ` |
| <z-esquisito tipo="G" time="J" tamanho="32"></z-esquisito> `JG` | <z-esquisito tipo="G" time="C" tamanho="32"></z-esquisito> `CG` |
| <z-esquisito tipo="M" time="J" tamanho="32"></z-esquisito> `JM` | <z-esquisito tipo="M" time="C" tamanho="32"></z-esquisito> `CM` |
| <z-esquisito tipo="S" time="J" tamanho="32"></z-esquisito> `JS` | <z-esquisito tipo="S" time="C" tamanho="32"></z-esquisito> `CS` |
| <z-esquisito tipo="B" time="J" tamanho="32"></z-esquisito> `JB` | <z-esquisito tipo="B" time="C" tamanho="32"></z-esquisito> `CB` |
| <z-esquisito tipo="A" time="J" tamanho="32"></z-esquisito> `JA` | <z-esquisito tipo="A" time="C" tamanho="32"></z-esquisito> `CA` |

## Por que duas letras é tão esperto?

Porque no Scratch existe o bloco [[operadores: letra (1) de [JG]]]. Com ele, o jogo consegue perguntar:

- **De que time é essa peça?** → `letra 1` do código. Dá `J`.
- **Que Esquisito é esse?** → `letra 2` do código. Dá `G`.

Isso vai ser usado o tempo todo nas regras.

## O tabuleiro no começo do jogo

Assim fica a lista quando a partida começa. O Computador em cima, o Jogador embaixo:

<z-diagrama inicial codigos legenda="Casa 1 = CG, casa 5 = CA, casa 60 = JB, casa 61 = JA."></z-diagrama>

Em forma de lista, os 64 itens são:

- **Casas 1 a 8:** `CG` `CM` `CS` `CB` `CA` `CS` `CM` `CG`
- **Casas 9 a 16:** oito `CZ`
- **Casas 17 a 48:** trinta e dois `livre`
- **Casas 49 a 56:** oito `JZ`
- **Casas 57 a 64:** `JG` `JM` `JS` `JB` `JA` `JS` `JM` `JG`

:::curiosidade Regra de ouro do xadrez
O Super-Bobo (a dama) começa sempre **na casa da cor dele**… no xadrez de verdade, "dama branca em casa branca". No nosso tabuleiro, os dois Super-Bobos ficam na **coluna 4**, bem de frente um pro outro.
:::

## ⚠️ O mistério da Almofada Fantasma

Tem uma coisa MUITO curiosa sobre o Scratch: **ele não liga para maiúsculas e minúsculas**. Pra ele, `a` e `A` são a mesma coisa. `j` e `J` também.

Agora imagine que a gente tivesse escrito as casas vazias como `vazio`. Qual é a letra 2 de `vazio`? É `a`! E o Scratch ia achar que é `A`… de **Almofada**. O jogo ia ver Almofadas fantasmas em todas as casas vazias. 👻

Por isso a casa vazia se chama `livre`: a letra 1 é `l` e a letra 2 é `i`, que não se confundem com nenhum time nem com nenhum Esquisito.

:::desafio
Invente outra palavra que também funcionaria no lugar de `livre`. E uma que **não** funcionaria (além de `vazio`). Por quê?
:::

:::missao Checklist
- [ ] Sei o que a primeira e a segunda letra do código querem dizer
- [ ] Sei escrever os 12 códigos
- [ ] Entendi por que a casa vazia se chama `livre`
:::
