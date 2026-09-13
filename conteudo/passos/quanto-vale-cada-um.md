O computador guloso captura qualquer coisa. Mas capturar um Zé-Pequeno e capturar um Super-Bobo não é a mesma coisa, né? Neste passo o computador aprende que **cada Esquisito tem um valor**. E aprende a escolher a **melhor** captura.

## A tabela de valores

Os jogadores de xadrez usam uma tabela famosa pra comparar as peças. Traduzida pro Zadrex:

| Esquisito | Valor |
|---|---|
| <z-esquisito tipo="Z" tamanho="30"></z-esquisito> Zé-Pequeno | **1** |
| <z-esquisito tipo="M" tamanho="30"></z-esquisito> Mola Maluca | **3** |
| <z-esquisito tipo="S" tamanho="30"></z-esquisito> Sombra | **3** |
| <z-esquisito tipo="G" tamanho="30"></z-esquisito> Geladeira Voadora | **5** |
| <z-esquisito tipo="B" tamanho="30"></z-esquisito> Super-Bobo | **9** |
| <z-esquisito tipo="A" tamanho="30"></z-esquisito> Grande Almofada | **não tem preço** (ela nunca é capturada) |

Então uma Geladeira vale mais ou menos o mesmo que uma Mola e dois Zés (3 + 1 + 1 = 5). E um Super-Bobo vale quase duas Geladeiras!

## A nova estratégia

> Olho todas as jogadas. Dou uma **nota** pra cada uma: o valor de quem ela captura (0 se não captura ninguém). Fico só com as jogadas de **nota mais alta** e sorteio entre elas.

O mais legal: isso **substitui** o guloso. Quando não tem captura, todas as jogadas têm nota 0, empatam, e ele sorteia entre todas — igualzinho ao começo!

## 1. O bloco valor

Crie a variável `valor` e o bloco **`valor de (código)`**, sem atualização de tela:

```blocos
meusblocos: defina valor de {meusblocos: código}
variaveis: mude [valor ▾] para (0)
controle: se <operadores: {operadores: letra (2) de {meusblocos: código}} = [Z]> então
  variaveis: mude [valor ▾] para (1)
controle: se <operadores: <operadores: {operadores: letra (2) de {meusblocos: código}} = [M]> ou <operadores: {operadores: letra (2) de {meusblocos: código}} = [S]>> então
  variaveis: mude [valor ▾] para (3)
controle: se <operadores: {operadores: letra (2) de {meusblocos: código}} = [G]> então
  variaveis: mude [valor ▾] para (5)
controle: se <operadores: {operadores: letra (2) de {meusblocos: código}} = [B]> então
  variaveis: mude [valor ▾] para (9)
```

(Pro `livre`, a letra 2 é `i`, então o valor fica 0. A Almofada Fantasma manda lembranças.)

## 2. Guardar só as melhores

Crie as listas `melhores saídas` e `melhores chegadas`, a variável `melhor nota` e o bloco **`escolher melhores jogadas`**:

:::robo Em português de robô
1. Apagar as listas das melhores. A melhor nota começa em -1.
2. Para cada jogada `j`:
   - Calcular o valor de quem está na chegada.
   - Se o valor é **maior** que a melhor nota: apagar as listas das melhores, a melhor nota vira esse valor, e essa jogada entra na lista.
   - Senão, se o valor é **igual** à melhor nota: essa jogada entra na lista também.
:::

```blocos
meusblocos: defina escolher melhores jogadas
listas: apague todos os itens de [melhores saídas ▾]
listas: apague todos os itens de [melhores chegadas ▾]
variaveis: mude [melhor nota ▾] para (-1)
variaveis: mude [j ▾] para (1)
controle: repita {listas: tamanho de [todas as saídas ▾]} vezes
  meusblocos: valor de {listas: item {listas: item {j} de [todas as chegadas ▾]} de [tabuleiro ▾]}
  controle: se <operadores: {valor} > {melhor nota}> então
    listas: apague todos os itens de [melhores saídas ▾]
    listas: apague todos os itens de [melhores chegadas ▾]
    variaveis: mude [melhor nota ▾] para {valor}
  controle: se <operadores: {valor} = {melhor nota}> então
    listas: adicione {listas: item {j} de [todas as saídas ▾]} a [melhores saídas ▾]
    listas: adicione {listas: item {j} de [todas as chegadas ▾]} a [melhores chegadas ▾]
  variaveis: adicione (1) a [j ▾]
```

:::dica Um truque escondido
Repare que não tem "senão" ali. Quando o valor é maior, a gente apaga as listas e **muda a melhor nota pra esse valor**. Aí o segundo "se" (valor = melhor nota) fica verdadeiro na hora, e a jogada entra na lista. Dois coelhos, uma cajadada.
:::

Na vez do computador, troque o `separar capturas` e o sorteio guloso por: [[meusblocos: escolher melhores jogadas]] e um sorteio dentro de `melhores saídas` / `melhores chegadas`.

## Teste!

Com o laboratório (lembra da tecla que monta tabuleiros?), deixe o computador com duas opções: capturar um Zé seu **ou** capturar o seu Super-Bobo. Ele escolhe o Super-Bobo sempre? ✅

## Desafio chefão: o computador medroso 😨

O computador agora captura o que vale mais… mas ainda cai em isca! Pra ficar esperto de verdade, ele precisa pensar: *"se eu capturar aqui, eles me capturam de volta?"*

Ideia: na nota de cada jogada, faça uma **jogada de mentirinha** (igual no filtro), use o `verificar perigo` na casa de chegada e, se ela ficar em perigo, **tire da nota** o valor do Esquisito que se mexeu. Assim, capturar um Zé (+1) com o Super-Bobo numa casa vigiada (−9) dá nota **−8**. Nem pensar!

:::curiosidade Como os computadores campeões pensam
Os programas que vencem os campeões mundiais usam essa mesma ideia de notas, só que olham **milhões** de jogadas pra frente, imaginando as respostas do adversário, e as respostas das respostas… O nome disso é **minimax**. Você acabou de dar o primeiro passo nessa direção.
:::

:::missao Checklist
- [ ] Criei o bloco `valor de (código)`
- [ ] Criei o bloco `escolher melhores jogadas`
- [ ] O computador sempre escolhe a captura mais valiosa
- [ ] Sem capturas, ele continua sorteando entre todas
- [ ] (Chefão) Tentei o computador medroso
- [ ] Salvei (e baixei uma cópia!)
:::
