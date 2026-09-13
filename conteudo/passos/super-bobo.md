<z-esquisito tipo="B" tamanho="110"></z-esquisito>

O **Super-Bobo** é o Esquisito mais poderoso do tabuleiro. Ele anda reto **e** na diagonal, quantas casas quiser. Programar ele deve ser difícil, né?

Não. É o passo mais **fácil** do capítulo. 😎

<z-diagrama pecas="36:JB 12:CZ 39:JZ 50:CS" mover="36" legenda="8 direções, até 7 passos."></z-diagrama>

## O segredo: reutilizar

Pense bem: o Super-Bobo anda como a Geladeira (reto) **mais** como a Sombra (diagonal). E a gente já tem os dois blocos prontos!

Então, no `calcular destinos de (casa)`, é só adicionar:

```blocos
controle: se <operadores: {operadores: letra (2) de {peça}} = [B]> então
  meusblocos: movimentos da geladeira {meusblocos: casa}
  meusblocos: movimentos da sombra {meusblocos: casa}
```

Pronto. Acabou. Pode ir tomar água. 🥤

:::curiosidade A regra de ouro dos programadores
Programadores têm um ditado: **"Não se repita"**. Quando você já resolveu um problema uma vez, não resolva de novo — **reutilize**. Foi exatamente o que você fez aqui: em vez de escrever 8 blocos `andar`, usou dois blocos que já existiam.

E tem um bônus: se um dia você descobrir um erro no bloco da Geladeira e consertar, o Super-Bobo fica consertado junto!
:::

## Teste!

Abra caminho na frente do Super-Bobo (mova o Zé-Pequeno da coluna 4, e talvez um vizinho da diagonal) e clique nele. As bolinhas formam uma **estrela**?

:::desafio
Sem olhar o tabuleiro: se o Super-Bobo estiver sozinho na casa 28, pra quantas casas ele pode ir? Depois confira no jogo usando o Modo Bagunça pra limpar o caminho. (Dica: conte as bolinhas com calma, são muitas!)
:::

:::missao Checklist
- [ ] Adicionei o Super-Bobo no `calcular destinos` usando os blocos da Geladeira e da Sombra
- [ ] As bolinhas do Super-Bobo formam uma estrela
- [ ] Entendi o que quer dizer "não se repita"
- [ ] Salvei
:::
