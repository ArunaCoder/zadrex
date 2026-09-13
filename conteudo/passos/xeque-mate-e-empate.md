Com as trapalhadas proibidas, aconteceu uma coisa curiosa: **ninguém consegue mais capturar uma Almofada**. Afinal, ninguém pode deixar a própria Almofada em perigo! Então a regra provisória "capturou a Almofada, venceu" nunca mais vai acontecer. Chegou a hora da regra de verdade.

## Xeque-mate: a Almofada Amassada

Quando a Almofada está **em xeque** e o time dela **não tem nenhuma jogada** que salve, é **xeque-mate**. Fim de jogo: a Almofada foi amassada. 🫓

<z-diagrama pecas="7:CA 14:CZ 15:CZ 16:CZ 1:JG 61:JA" destacar="7" marcar="2 3 4 5 6" legenda="Xeque-mate! A Geladeira ataca pela linha e os próprios Zés prendem a Almofada."></z-diagrama>

## Afogamento: o Empate Sonolento

E se o time **não tem nenhuma jogada**, mas a Almofada **não está** em xeque? Aí não é vitória de ninguém: é **empate por afogamento**. A Almofada não está sendo atacada, mas qualquer passo que ela der seria uma trapalhada. Então ela fica ali… e dorme. 😴

<z-diagrama pecas="8:CA 23:JB 64:JA" destacar="8" legenda="Empate Sonolento: a Almofada não está em xeque, mas não tem pra onde ir."></z-diagrama>

:::curiosidade
O afogamento pega muita gente de surpresa! Às vezes o jogador está ganhando **muito**, com um monte de Esquisitos a mais, e se distrai… e deixa o adversário sem jogadas. Empate! Quem está ganhando precisa sempre deixar uma saída pra Almofada inimiga — até dar o xeque-mate.
:::

## A pergunta mágica

Depois de cada jogada, o jogo precisa olhar pro **outro** time e perguntar:

| Tem jogadas? | Almofada em perigo? | Resultado |
|---|---|---|
| Sim | Não | O jogo continua |
| Sim | Sim | Xeque! O jogo continua |
| Não | Sim | **Xeque-mate!** |
| Não | Não | **Empate Sonolento** |

E a gente já tem tudo pra responder: o `listar jogadas do time` e o `verificar perigo`!

## 1. O bloco verificar situação

Transforme o bloco `anunciar xeque` num bloco mais completo: **`verificar situação do time (time)`**.

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
    eventos: transmita [xeque ▾]
```

:::atencao Primeiro listar, depois verificar o perigo
O `listar jogadas` usa o filtro, e o filtro usa o `verificar perigo` um montão de vezes — mudando a variável `perigo` a cada jogada de mentirinha. Se você verificar o perigo **antes** de listar, o valor vai estar bagunçado quando chegar no "se". Por isso: primeiro lista, **depois** verifica.
:::

## 2. Troque os blocos

1. Onde estava [[meusblocos: anunciar xeque no time [C]]], coloque [[meusblocos: verificar situação do time [C]]]. Faça o mesmo com o `J`.
2. No bloco `mover`, **apague** a parte provisória que via se a Almofada foi capturada.
3. Na vez do computador, apague a parte que transmitia `computador sem jogadas` (agora quem cuida disso é o `verificar situação`).
4. No Narrador e na Placa, troque `computador sem jogadas` por `empate`, e mude a fala: "Empate Sonolento! A Almofada dormiu…".

E a fala da vitória pode ficar ainda melhor:

```blocos
eventos: quando eu receber [jogador venceu ▾]
aparencia: diga [XEQUE-MATE! A Almofada deles foi amassada!]
```

## Teste! O laboratório 🧪

Chegar num xeque-mate jogando contra o sorteio pode levar uma eternidade. Programadores têm um truque pra isso: um **laboratório**, um script que monta na hora o tabuleiro que eles querem testar.

No Cérebro, crie este script (é só pra testes, depois pode apagar):

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

Repare que os Zés do computador ainda **podem andar**… mas andar com eles não salva a Almofada. Como o filtro só deixa as jogadas que salvam, o computador fica com **zero** jogadas. Xeque-mate!

Agora duplique o laboratório com a tecla **e** pra testar o **empate**: só a Almofada do computador na casa **8**, seu Super-Bobo na casa **31** e sua Almofada na **64**. Leve o Super-Bobo pra casa **23**. Apareceu o Empate Sonolento? ✅

:::desafio
Invente outros laboratórios: um xeque-mate com a Mola, um em que o computador consegue fugir do xeque capturando quem atacou, e um em que **você** leva xeque-mate.
:::

:::missao Checklist
- [ ] Criei o bloco `verificar situação do time`
- [ ] Ele é chamado depois das jogadas dos dois times
- [ ] Apaguei a regra provisória da Almofada capturada
- [ ] Xeque-mate mostra vitória ou derrota
- [ ] Afogamento mostra o Empate Sonolento
- [ ] Testei os dois tabuleiros deste passo
- [ ] Salvei (e guardei uma cópia de segurança!)
:::
