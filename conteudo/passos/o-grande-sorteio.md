Chegou o momento que você esperava: o computador vai **jogar**! 🎲

Ele não pensa, não planeja e não tem estratégia nenhuma. Ele faz a lista de jogadas possíveis e tira uma no sorteio. Mas, como a lista só tem jogadas **permitidas**, ele sempre joga seguindo as regras.

## O sorteio

Imagine que cada jogada da lista é um bilhete de rifa numerado. Se tem 20 jogadas, os bilhetes vão de 1 a 20. O computador sorteia um número e faz a jogada daquele bilhete.

No Scratch, o sorteio é o bloco [[operadores: número aleatório entre (1) e (10)]]. No lugar do 10, vai o **tamanho** da lista de jogadas.

## O script do computador

Crie a variável `sorteio` e **troque** aquele script preguiçoso da vez do computador por este:

```blocos
eventos: quando eu receber [vez do computador ▾]
controle: espere (0.5) seg
meusblocos: listar jogadas do time [C]
controle: se <operadores: {listas: tamanho de [todas as saídas ▾]} = (0)> então
  variaveis: mude [vez ▾] para [fim]
  eventos: transmita [computador sem jogadas ▾]
  controle: pare [este script ▾]
variaveis: mude [sorteio ▾] para {operadores: número aleatório entre (1) e {listas: tamanho de [todas as saídas ▾]}}
// mostra qual Esquisito foi sorteado e pra onde vai
variaveis: mude [origem ▾] para {listas: item {sorteio} de [todas as saídas ▾]}
listas: adicione {listas: item {sorteio} de [todas as chegadas ▾]} a [destinos ▾]
controle: espere (0.7) seg
meusblocos: mover de {origem} para {listas: item {sorteio} de [todas as chegadas ▾]}
variaveis: mude [origem ▾] para (0)
listas: apague todos os itens de [destinos ▾]
variaveis: mude [vez ▾] para [jogador]
eventos: transmita [vez do jogador ▾]
```

:::robo Em português de robô
1. Esperar um pouquinho (fingir que pensa).
2. Fazer a lista de todas as jogadas do Computador.
3. Se a lista está vazia, o computador não tem o que fazer: o jogo acaba.
4. Sortear um número de 1 até o tamanho da lista.
5. **Mostrar** a jogada: a casa de saída fica amarela e a de chegada ganha bolinha.
6. Esperar pra dar tempo de você ver.
7. Mover, limpar tudo e devolver a vez.
:::

:::dica O truque do "mostrar antes de mover"
Sem os passos 5 e 6, as peças do computador iam mudar de lugar num piscar de olhos e você nem ia perceber o que aconteceu. Usando a mesma `origem` e a mesma lista `destinos` que você usa, o computador mostra a jogada dele do mesmo jeitinho que o jogo mostra a sua.
:::

## Teste!

Faça sua primeira jogada e observe. O computador…

- espera um pouco ✅
- deixa uma casa amarela e mostra uma bolinha ✅
- move o Esquisito dele ✅
- e devolve a vez ✅

Jogue várias rodadas. Toda jogada do computador segue as regras? Os Zés dele andam **pra baixo**? A Mola dele pula em L?

:::atencao Se o computador fizer algo estranho
Normalmente o culpado é o `meu time`. Confira se o `calcular destinos` calcula o `meu time` pela letra 1 da peça (e não deixa fixo `J`). E confira se a `frente` do Zé é **1** para o time `C`.
:::

:::desafio
Faça o Narrador comentar a jogada do computador. Por exemplo, se o `capturado` não for `livre` depois de mover, ele diz algo como "Nhac! Peguei um dos seus!".
:::

:::missao Checklist
- [ ] Criei a variável `sorteio`
- [ ] O computador faz a lista, sorteia e joga
- [ ] Dá pra ver qual jogada o computador escolheu antes dele mover
- [ ] Joguei várias rodadas e o computador sempre seguiu as regras
- [ ] Salvei (e guardei uma cópia de segurança!)
:::
