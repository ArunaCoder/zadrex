<z-esquisito tipo="S" tamanho="110"></z-esquisito>

A **Sombra** é quase igual à Geladeira. A diferença? Ela só anda **na diagonal**. Como o bloco `andar` já sabe fazer tudo, este passo é rapidinho.

<z-diagrama pecas="36:JS 18:CZ 54:JZ" mover="36" legenda="4 diagonais, até 7 passos."></z-diagrama>

## 1. O bloco da Sombra

No **Cérebro**, crie o bloco **`movimentos da sombra (casa)`** (com uma entrada `casa` e sem atualização de tela). Pegue as quatro diagonais da tabela de direções:

| Diagonal | `dl` | `dc` |
|---|---|---|
| ↖️ | -1 | -1 |
| ↗️ | -1 | 1 |
| ↙️ | 1 | -1 |
| ↘️ | 1 | 1 |

:::dica Não precisa montar do zero
Depois de criar o bloco novo, vá no `defina movimentos da geladeira` e clique com o botão direito no **primeiro** `andar` embaixo dele. Escolha **Duplicar**: vem ele e todos os de baixo. Encaixe a cópia embaixo do `defina movimentos da sombra` e troque os números.
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

No bloco `calcular destinos de (casa)`, no Cérebro, adicione mais um "se" no fim:

```blocos
controle: se <operadores: {operadores: letra (2) de {peça}} = [S]> então
  meusblocos: movimentos da sombra {meusblocos: casa}
```

<details>
<summary><b>📋 Como o bloco <code>calcular destinos</code> fica agora</b></summary>

```blocos
meusblocos: defina calcular destinos de {meusblocos: casa}
listas: apague todos os itens de [destinos ▾]
variaveis: mude [peça ▾] para {listas: item {meusblocos: casa} de [tabuleiro ▾]}
variaveis: mude [meu time ▾] para {operadores: letra (1) de {peça}}
controle: se <operadores: {operadores: letra (2) de {peça}} = [G]> então
  meusblocos: movimentos da geladeira {meusblocos: casa}
controle: se <operadores: {operadores: letra (2) de {peça}} = [S]> então
  meusblocos: movimentos da sombra {meusblocos: casa}
```

</details>

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
