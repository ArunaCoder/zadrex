Com as trapalhadas proibidas, aconteceu uma coisa curiosa: **ninguém consegue mais capturar uma Almofada**. Afinal, ninguém pode deixar a própria Almofada em perigo! Então a regra provisória "capturou a Almofada, venceu" nunca mais vai acontecer. Chegou a hora da regra de verdade.

## A Almofada Amassada

Quando a Almofada está **suando frio** e o time dela **não tem nenhuma jogada** que salve, ela é **amassada**. Fim de jogo! 🫓

<z-diagrama pecas="7:CA 14:CZ 15:CZ 16:CZ 1:JG 61:JA" destacar="7" marcar="2 3 4 5 6" legenda="Almofada Amassada! A Geladeira ataca pela linha e os próprios Zés prendem a Almofada."></z-diagrama>

## O Empate Sonolento

E se o time **não tem nenhuma jogada**, mas a Almofada **não está** suando frio? Aí não é vitória de ninguém: é o **Empate Sonolento**. A Almofada não está sendo atacada, mas qualquer passo que ela der seria uma trapalhada. Então ela fica ali… e dorme. 😴

<z-diagrama pecas="8:CA 23:JB 64:JA" destacar="8" legenda="Empate Sonolento: a Almofada não está suando frio, mas não tem pra onde ir."></z-diagrama>

:::curiosidade
O Empate Sonolento pega muita gente de surpresa! Às vezes o jogador está ganhando **muito**, com um monte de Esquisitos a mais, e se distrai… e deixa o adversário sem jogadas. Empate! Quem está ganhando precisa sempre deixar uma saída pra Almofada inimiga — até conseguir amassar ela.
:::

## A pergunta mágica

Depois de cada jogada, o jogo precisa olhar pro **outro** time e perguntar:

| Tem jogadas? | Almofada em perigo? | Resultado |
|---|---|---|
| Sim | Não | O jogo continua |
| Sim | Sim | Suando Frio! O jogo continua |
| Não | Sim | **Almofada Amassada!** |
| Não | Não | **Empate Sonolento** |

E a gente já tem tudo pra responder: o `listar jogadas do time` e o `verificar perigo`!

## 1. O bloco verificar situação

No **Cérebro**, crie um bloco mais completo que o `anunciar perigo`: **`verificar situação do time (time)`** (sem atualização de tela).

```blocos
meusblocos: defina verificar situação do time {meusblocos: time}
meusblocos: listar jogadas do time {meusblocos: time}
variaveis: mude [casa da almofada ▾] para {listas: item # de {operadores: junte {meusblocos: time} com [A]} em [tabuleiro ▾]}
meusblocos: verificar perigo na casa {casa da almofada} do time {meusblocos: time}
controle: se <operadores: {listas: tamanho de [todas as saídas ▾]} = (0)> então
  variaveis: mude [vez ▾] para [fim]
  controle: se <operadores: {perigo} = [sim]> então
    controle: se <operadores: {meusblocos: time} = [C]> então
      eventos: transmita [jogador venceu ▾]
    senão
      eventos: transmita [computador venceu ▾]
  senão
    eventos: transmita [empate ▾]
senão
  controle: se <operadores: {perigo} = [sim]> então
    eventos: transmita [suando frio ▾]
```

:::atencao Primeiro listar, depois verificar o perigo
O `listar jogadas` usa o filtro, e o filtro usa o `verificar perigo` um montão de vezes — mudando a variável `perigo` a cada jogada de mentirinha. Se você verificar o perigo **antes** de listar, o valor vai estar bagunçado quando chegar no "se". Por isso: primeiro lista, **depois** verifica.
:::

## 2. Troque os blocos

1. No script do clique, **apague** o [[meusblocos: anunciar perigo no time [C]]] e coloque [[meusblocos: verificar situação do time [C]]] **antes** do "se o jogo não acabou" (e não dentro dele). Faça o mesmo na vez do computador, com o `J`.
2. No bloco `mover`, **apague** a parte provisória que via se a Almofada foi capturada (o último "se").
3. Na vez do computador, apague o "se" que transmitia `computador sem jogadas`, inteirinho. Agora quem cuida disso é o `verificar situação`.
4. No Narrador e na Placa, troque `computador sem jogadas` por `empate`, e mude a fala: "Empate Sonolento! A Almofada dormiu…".
5. Pode apagar o `defina anunciar perigo`: ninguém usa mais ele.

:::atencao Por que antes do "se"?
O `verificar situação` pode **acabar** o jogo (mudando a `vez` pra `fim`). Então ele tem que vir antes da pergunta "o jogo acabou?". Se ficar dentro do "se", a pergunta já foi feita, e a vez passa mesmo com a Almofada amassada.
:::

Os três scripts do Cérebro ficam assim:

<details>
<summary><b>📋 Como o bloco <code>mover</code> fica agora</b></summary>

```blocos
meusblocos: defina mover de {meusblocos: saída} para {meusblocos: chegada}
variaveis: mude [capturado ▾] para {listas: item {meusblocos: chegada} de [tabuleiro ▾]}
listas: substitua o item {meusblocos: chegada} de [tabuleiro ▾] por {listas: item {meusblocos: saída} de [tabuleiro ▾]}
listas: substitua o item {meusblocos: saída} de [tabuleiro ▾] por [livre]
variaveis: mude [peça movida ▾] para {listas: item {meusblocos: chegada} de [tabuleiro ▾]}
// Estirão do Zé
controle: se <operadores: {operadores: letra (2) de {peça movida}} = [Z]> então
  controle: se <operadores: <operadores: <operadores: {operadores: letra (1) de {peça movida}} = [J]> e <operadores: {meusblocos: chegada} < (9)>> ou <operadores: <operadores: {operadores: letra (1) de {peça movida}} = [C]> e <operadores: {meusblocos: chegada} > (56)>>> então
    listas: substitua o item {meusblocos: chegada} de [tabuleiro ▾] por {operadores: junte {operadores: letra (1) de {peça movida}} com [B]}
    eventos: transmita [zé cresceu ▾]
// sons
controle: se <operadores: {capturado} = [livre]> então
  som: toque o som [passo ▾]
senão
  som: toque o som {operadores: junte [captura ] com {operadores: letra (2) de {capturado}}}
```

</details>

<details>
<summary><b>📋 Como o script do clique fica agora</b></summary>

```blocos
eventos: quando eu receber [clique ▾]
controle: se <operadores: {vez} = [jogador]> então
  controle: se <operadores: {operadores: letra (1) de {listas: item {casa clicada} de [tabuleiro ▾]}} = [J]> então
    variaveis: mude [origem ▾] para {casa clicada}
    meusblocos: calcular destinos de {origem}
  senão
    controle: se <operadores: <operadores: {origem} > (0)> e <listas: [destinos ▾] contém {casa clicada}?>> então
      variaveis: mude [vez ▾] para [computador]
      meusblocos: deslizar de {origem} para {casa clicada}
      variaveis: mude [origem ▾] para (0)
      listas: apague todos os itens de [destinos ▾]
      meusblocos: verificar situação do time [C]
      controle: se <operadores: não <operadores: {vez} = [fim]>> então
        eventos: transmita [vez do computador ▾]
    senão
      variaveis: mude [origem ▾] para (0)
      listas: apague todos os itens de [destinos ▾]
```

</details>

<details>
<summary><b>📋 Como o script da vez do computador fica agora</b></summary>

```blocos
eventos: quando eu receber [vez do computador ▾]
controle: espere (0.5) seg
meusblocos: listar jogadas do time [C]
variaveis: mude [sorteio ▾] para {operadores: número aleatório entre (1) e {listas: tamanho de [todas as saídas ▾]}}
variaveis: mude [origem ▾] para {listas: item {sorteio} de [todas as saídas ▾]}
listas: adicione {listas: item {sorteio} de [todas as chegadas ▾]} a [destinos ▾]
controle: espere (0.7) seg
meusblocos: deslizar de {origem} para {listas: item {sorteio} de [todas as chegadas ▾]}
variaveis: mude [origem ▾] para (0)
listas: apague todos os itens de [destinos ▾]
meusblocos: verificar situação do time [J]
controle: se <operadores: não <operadores: {vez} = [fim]>> então
  variaveis: mude [vez ▾] para [jogador]
  eventos: transmita [vez do jogador ▾]
```

</details>

:::curiosidade E se o computador ficar sem jogadas?
Não tem perigo: o `verificar situação do time [C]`, depois da sua jogada, já acaba o jogo nesse caso. Aí a vez do computador nem começa.
:::

No **Narrador**, os scripts do fim ficam assim (a fala da vitória pode ficar ainda melhor):

```blocos
eventos: quando eu receber [jogador venceu ▾]
aparencia: diga [AMASSADA! A Almofada deles virou panqueca!]
som: toque o som [vitória ▾]

eventos: quando eu receber [computador venceu ▾]
aparencia: diga [O computador ganhou... no sorteio! Quer revanche?]
som: toque o som [derrota ▾]

eventos: quando eu receber [empate ▾]
aparencia: diga [Empate Sonolento! A Almofada dormiu...]
```

E na **Placa**:

```blocos
eventos: quando eu receber [empate ▾]
aparencia: mude para a fantasia [empate ▾]
meusblocos: aparecer
```

## Teste! O laboratório 🧪

Amassar uma Almofada jogando contra o sorteio pode levar uma eternidade. Programadores têm um truque pra isso: um **laboratório**, um script que monta na hora o tabuleiro que eles querem testar.

No **Cérebro**, crie este script (é só pra testes):

```blocos
eventos: quando a tecla [m ▾] for pressionada
listas: apague todos os itens de [tabuleiro ▾]
controle: repita (64) vezes
  listas: adicione [livre] a [tabuleiro ▾]
listas: substitua o item (7) de [tabuleiro ▾] por [CA]
listas: substitua o item (14) de [tabuleiro ▾] por [CZ]
listas: substitua o item (15) de [tabuleiro ▾] por [CZ]
listas: substitua o item (16) de [tabuleiro ▾] por [CZ]
listas: substitua o item (57) de [tabuleiro ▾] por [JG]
listas: substitua o item (61) de [tabuleiro ▾] por [JA]
```

Comece uma partida, aperte **m** e jogue a sua Geladeira da casa 57 pra casa **1**. A placa de vitória apareceu? ✅

Repare que os Zés do computador ainda **podem andar**… mas andar com eles não salva a Almofada. Como o filtro só deixa as jogadas que salvam, o computador fica com **zero** jogadas. Amassada!

Agora duplique o laboratório e troque a tecla para **e**, pra testar o **empate**: só a Almofada do computador na casa **8**, seu Super-Bobo na casa **31** e sua Almofada na **64**.

```blocos
eventos: quando a tecla [e ▾] for pressionada
listas: apague todos os itens de [tabuleiro ▾]
controle: repita (64) vezes
  listas: adicione [livre] a [tabuleiro ▾]
listas: substitua o item (8) de [tabuleiro ▾] por [CA]
listas: substitua o item (31) de [tabuleiro ▾] por [JB]
listas: substitua o item (64) de [tabuleiro ▾] por [JA]
```

Comece uma partida, aperte **e** e leve o Super-Bobo pra casa **23**. Apareceu o Empate Sonolento? ✅

Os dois laboratórios funcionaram? Então **apague os scripts das teclas m e e**. Se esquecer deles, apertar m ou e no meio de uma partida de verdade bagunça o tabuleiro inteiro!

:::desafio
Invente outros laboratórios: uma Almofada amassada pela Mola, um em que o computador tira a Almofada do Suando Frio capturando quem atacou, e um em que é a **sua** Almofada que acaba amassada.
:::

:::missao Checklist
- [ ] Criei o bloco `verificar situação do time`
- [ ] Ele é chamado depois das jogadas dos dois times
- [ ] Apaguei a regra provisória da Almofada capturada
- [ ] A Almofada Amassada mostra vitória ou derrota
- [ ] Sem jogadas e sem Suando Frio, aparece o Empate Sonolento
- [ ] Testei os dois tabuleiros deste passo
- [ ] Salvei (e guardei uma cópia de segurança!)
:::
