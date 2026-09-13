O computador sorteador tem um defeito engraçado: às vezes ele pode capturar o seu Super-Bobo de graça… e prefere mexer um Zé-Pequeno lá no canto. Vamos dar a ele um pouquinho de **cérebro**. Só um pouquinho: ele vai ficar **guloso**. 🍩

## A nova estratégia

> Se eu posso capturar alguém, eu capturo. Se não posso, sorteio qualquer jogada.

Continua sendo sorteio — mas agora ele sorteia **entre as capturas** quando elas existem.

## Como descobrir se uma jogada é captura?

Fácil: olhe o que tem na casa de chegada. Se não for `livre`, é captura!

Pra cada jogada da lista, a gente olha a chegada. As capturas vão pra duas listas novas, que andam juntas como as outras duas:

:::robo Em português de robô
1. Fazer a lista de todas as jogadas (isso já existe).
2. Apagar as listas de capturas.
3. Para cada jogada `j`:
   - Se o item da chegada no tabuleiro **não** é `livre`, copiar a saída e a chegada pras listas de capturas.
4. Se a lista de capturas tem alguma coisa, sortear **dentro dela**.
5. Senão, sortear na lista de todas as jogadas, como antes.
:::

## 1. Separe as capturas

Crie as listas `capturas saídas` e `capturas chegadas`, as variáveis `j`, `sorteio saída` e `sorteio chegada`, e o bloco **`separar capturas`** (sem atualização de tela):

```blocos
meusblocos: defina separar capturas
listas: apague todos os itens de [capturas saídas ▾]
listas: apague todos os itens de [capturas chegadas ▾]
variaveis: mude [j ▾] para (1)
controle: repita {listas: tamanho de [todas as saídas ▾]} vezes
  controle: se <operadores: não <operadores: {listas: item {listas: item {j} de [todas as chegadas ▾]} de [tabuleiro ▾]} = [livre]>> então
    listas: adicione {listas: item {j} de [todas as saídas ▾]} a [capturas saídas ▾]
    listas: adicione {listas: item {j} de [todas as chegadas ▾]} a [capturas chegadas ▾]
  variaveis: adicione (1) a [j ▾]
```

## 2. O sorteio guloso

Na vez do computador, troque a parte do sorteio. Em vez de sortear direto, primeiro separe as capturas e escolha **de qual lista** sortear. As variáveis `sorteio saída` e `sorteio chegada` guardam a jogada escolhida, venha de onde vier:

```blocos
meusblocos: separar capturas
controle: se <operadores: {listas: tamanho de [capturas saídas ▾]} > (0)> então
  variaveis: mude [sorteio ▾] para {operadores: número aleatório entre (1) e {listas: tamanho de [capturas saídas ▾]}}
  variaveis: mude [sorteio saída ▾] para {listas: item {sorteio} de [capturas saídas ▾]}
  variaveis: mude [sorteio chegada ▾] para {listas: item {sorteio} de [capturas chegadas ▾]}
senão
  variaveis: mude [sorteio ▾] para {operadores: número aleatório entre (1) e {listas: tamanho de [todas as saídas ▾]}}
  variaveis: mude [sorteio saída ▾] para {listas: item {sorteio} de [todas as saídas ▾]}
  variaveis: mude [sorteio chegada ▾] para {listas: item {sorteio} de [todas as chegadas ▾]}
```

Depois, no resto do script, use `sorteio saída` e `sorteio chegada` no lugar dos antigos "item sorteio de…" (pra mostrar a bolinha e pra deslizar).

## Teste!

Deixe um Esquisito seu na frente de um inimigo, de propósito. O computador captura **sempre**? Jogue uma partida inteira: ele ficou mais difícil?

## Armadilhas pro guloso 🪤

Ser guloso tem um problema: ele captura **qualquer coisa**, mesmo quando é uma cilada. Tente isso:

1. Deixe um Zé-Pequeno seu **protegido** por outro Esquisito (por exemplo, com uma Sombra sua vigiando a casa dele).
2. Coloque ele onde o Super-Bobo do computador possa capturar.
3. O computador guloso vai lá, captura o Zé… e você captura o Super-Bobo dele! Trocou um Zé por um Super-Bobo. 😈

Isso se chama **isca**, e os jogadores de xadrez de verdade usam o tempo todo.

:::missao Checklist
- [ ] Criei as listas de capturas e o bloco `separar capturas`
- [ ] O computador sorteia entre as capturas quando existem
- [ ] Testei deixando um Esquisito ameaçado
- [ ] Armei uma isca e o computador caiu
- [ ] Salvei (e baixei uma cópia!)
:::
