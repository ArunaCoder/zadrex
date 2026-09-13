<z-esquisito tipo="S" tamanho="110"></z-esquisito>

A **Sombra** é quase igual à Geladeira. A diferença? Ela só anda **na diagonal**. Como o bloco `andar` já sabe fazer tudo, este passo é rapidinho.

<z-diagrama pecas="36:JS 18:CZ 54:JZ" mover="36" legenda="4 diagonais, até 7 passos."></z-diagrama>

## 1. O bloco da Sombra

Crie o bloco **`movimentos da sombra (casa)`**. Pegue as quatro diagonais da tabela de direções:

| Diagonal | `dl` | `dc` |
|---|---|---|
| ↖️ | -1 | -1 |
| ↗️ | -1 | 1 |
| ↙️ | 1 | -1 |
| ↘️ | 1 | 1 |

:::dica Não precisa montar do zero
Clique com o botão direito no bloco `defina movimentos da geladeira` e escolha **Duplicar**. Aí é só colocar o chapéu novo e trocar os números.
:::

Tente montar sozinho antes de olhar! Se travar, a resposta está aqui:

<details>
<summary><b>👀 Ver os blocos da Sombra</b></summary>

```blocos
meusblocos: defina movimentos da sombra {meusblocos: casa}
meusblocos: andar de {meusblocos: casa} direção (-1) (-1) até (7) passos
meusblocos: andar de {meusblocos: casa} direção (-1) (1) até (7) passos
meusblocos: andar de {meusblocos: casa} direção (1) (-1) até (7) passos
meusblocos: andar de {meusblocos: casa} direção (1) (1) até (7) passos
```

</details>

## 2. Avise o calcular destinos

No bloco `calcular destinos de (casa)`, adicione mais um "se":

```blocos
controle: se <operadores: {operadores: letra (2) de {peça}} = [S]> então
  meusblocos: movimentos da sombra {meusblocos: casa}
```

## Teste!

Clique na bandeira, **abra caminho** movendo um Zé-Pequeno que está na frente da Sombra (a bagunça ainda ajuda) e clique nela. As bolinhas aparecem em forma de **X**?

:::curiosidade O mistério das cores
Olhe as bolinhas da Sombra: estão **todas** em casas da mesma cor que a casa dela! Uma Sombra que nasce em casa clara vai passar a vida inteira em casas claras. É por isso que cada time tem duas Sombras: uma pra cada cor.
:::

:::missao Checklist
- [ ] Criei o bloco `movimentos da sombra (casa)`
- [ ] Adicionei a Sombra no `calcular destinos`
- [ ] As bolinhas da Sombra aparecem em X
- [ ] Salvei
:::
