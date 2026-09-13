<z-esquisito tipo="Z" tamanho="110"></z-esquisito>

Ele é o menor. Ele é o mais numeroso. Ele parece o mais simples. E ele é… o **mais complicado de programar**. O **Zé-Pequeno** não aceita o bloco `andar` porque tem um monte de regrinhas só dele.

## As 4 manias do Zé

1. **Só anda pra frente.** Nunca pra trás, nunca pro lado.
2. **Anda 1 casa**, mas só se ela estiver **livre**. (Ele não captura andando reto!)
3. **Na largada, pode andar 2 casas**, se as duas estiverem livres.
4. **Só captura na diagonal**, uma casa pra frente.

<z-diagrama pecas="52:JZ 43:CM 45:CZ" mover="52" legenda="Na largada: 1 ou 2 casas pra frente, e captura nas diagonais."></z-diagrama>

<z-diagrama pecas="36:JZ 28:CZ" mover="36" legenda="Um inimigo bem na frente? O Zé fica travado."></z-diagrama>

## E o que é "frente"?

Depende do time! O Zé do **Jogador** começa embaixo e anda **pra cima** (a linha diminui). O Zé do **Computador** começa em cima e anda **pra baixo** (a linha aumenta).

| Time | `frente` | Linha de largada |
|---|---|---|
| `J` | -1 | 7 |
| `C` | 1 | 2 |

E tem um atalho legal: andar uma linha pra frente é o mesmo que somar `frente × 8` no número da casa. Da casa 52, uma pra frente (Jogador) é 52 + (-1 × 8) = **44**. Duas pra frente é 52 + (-1 × 16) = **36**.

## O bloco do Zé

Crie as variáveis `frente`, `linha de largada`, `zl`, `zc`, `z alvo` e `z quem` (as do Zé começam com **z** pra não misturar com as do `andar`). Depois crie o bloco **`movimentos do zé (casa)`**.

:::robo Em português de robô
1. Descobrir `frente` e `linha de largada` pelo `meu time`.
2. Descobrir `zl` e `zc` (linha e coluna da casa).
3. Se a linha da frente sai do tabuleiro → parar.
4. **Andar:** se a casa da frente está livre, ela vale. E, se o Zé está na largada e a casa duas pra frente também está livre, essa também vale.
5. **Capturar pra esquerda:** se a coluna não é a 1, olhar a casa da frente-esquerda. Se tem alguém e não é do meu time, vale.
6. **Capturar pra direita:** igual, se a coluna não é a 8.
:::

```blocos
meusblocos: defina movimentos do zé {meusblocos: casa}
controle: se <operadores: {meu time} = [J]> então
  variaveis: mude [frente ▾] para (-1)
  variaveis: mude [linha de largada ▾] para (7)
senão
  variaveis: mude [frente ▾] para (1)
  variaveis: mude [linha de largada ▾] para (2)
variaveis: mude [zl ▾] para {operadores: {operadores: [arredondamento para baixo de ▾] de {operadores: {operadores: {meusblocos: casa} - (1)} / (8)}} + (1)}
variaveis: mude [zc ▾] para {operadores: {operadores: resto de {operadores: {meusblocos: casa} - (1)} por (8)} + (1)}
controle: se <operadores: <operadores: {operadores: {zl} + {frente}} < (1)> ou <operadores: {operadores: {zl} + {frente}} > (8)>> então
  controle: pare [este script ▾]
// 1) andar pra frente
variaveis: mude [z alvo ▾] para {operadores: {meusblocos: casa} + {operadores: {frente} * (8)}}
controle: se <operadores: {listas: item {z alvo} de [tabuleiro ▾]} = [livre]> então
  listas: adicione {z alvo} a [destinos ▾]
  variaveis: mude [z alvo ▾] para {operadores: {meusblocos: casa} + {operadores: {frente} * (16)}}
  controle: se <operadores: <operadores: {zl} = {linha de largada}> e <operadores: {listas: item {z alvo} de [tabuleiro ▾]} = [livre]>> então
    listas: adicione {z alvo} a [destinos ▾] // 2 casas na largada
// 2) capturar na diagonal da esquerda
controle: se <operadores: {zc} > (1)> então
  variaveis: mude [z alvo ▾] para {operadores: {operadores: {meusblocos: casa} + {operadores: {frente} * (8)}} - (1)}
  variaveis: mude [z quem ▾] para {listas: item {z alvo} de [tabuleiro ▾]}
  controle: se <operadores: <operadores: não <operadores: {z quem} = [livre]>> e <operadores: não <operadores: {operadores: letra (1) de {z quem}} = {meu time}>>> então
    listas: adicione {z alvo} a [destinos ▾]
// 3) capturar na diagonal da direita
controle: se <operadores: {zc} < (8)> então
  variaveis: mude [z alvo ▾] para {operadores: {operadores: {meusblocos: casa} + {operadores: {frente} * (8)}} + (1)}
  variaveis: mude [z quem ▾] para {listas: item {z alvo} de [tabuleiro ▾]}
  controle: se <operadores: <operadores: não <operadores: {z quem} = [livre]>> e <operadores: não <operadores: {operadores: letra (1) de {z quem}} = {meu time}>>> então
    listas: adicione {z alvo} a [destinos ▾]
```

:::dica Por que checar a coluna antes da diagonal?
Um Zé na coluna 1 não tem diagonal da esquerda. Sem essa checagem, a conta "casa da frente − 1" ia dar numa casa **do outro lado do tabuleiro**, na linha de cima! O Zé ia capturar alguém lá longe. Um Zé teletransportador. 🌀
:::

E no `calcular destinos de (casa)`:

```blocos
controle: se <operadores: {operadores: letra (2) de {peça}} = [Z]> então
  meusblocos: movimentos do zé {meusblocos: casa}
```

## Teste!

- Clique num Zé no começo do jogo: bolinhas nas **duas** casas da frente? ✅
- Mova ele uma casa e clique de novo: agora só **uma** bolinha? ✅
- Avance o seu Zé (a bagunça ainda ajuda) até ficar na diagonal de um Zé inimigo e clique nele: aparece a moldura de captura? ✅
- Coloque o Zé bem de frente pra um inimigo: ele fica travado, sem bolinha na frente? ✅
- Teste um Zé da coluna 1 e um da coluna 8: nada de capturas malucas do outro lado? ✅

:::curiosidade O Zé tem mais duas manias
Sim, ainda tem mais! Quando chega do outro lado, o Zé **cresce** e vira Super-Bobo. E existe uma captura esquisitíssima chamada **Pega no Pulo**. As duas ficaram guardadas para o **Nível Chefão**.
:::

:::missao Checklist
- [ ] Criei as variáveis do Zé (`frente`, `linha de largada`, `zl`, `zc`, `z alvo`, `z quem`)
- [ ] Criei o bloco `movimentos do zé (casa)`
- [ ] Adicionei o Zé no `calcular destinos`
- [ ] O Zé anda 1 ou 2 na largada e só 1 depois
- [ ] O Zé só captura na diagonal
- [ ] Testei os Zés das colunas 1 e 8
- [ ] Salvei (e guardei uma cópia de segurança!)
:::
