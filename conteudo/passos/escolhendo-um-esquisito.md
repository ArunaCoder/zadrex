Uma jogada do Zadrex tem dois cliques: primeiro você **escolhe** o Esquisito, depois escolhe **pra onde** ele vai. Neste passo a gente faz o primeiro clique: escolher. E a casa escolhida vai ficar **amarelinha** pra você não esquecer.

## 1. A variável origem

Crie a variável `origem`, para todos os atores. Ela guarda **o número da casa do Esquisito escolhido**. Quando ninguém estiver escolhido, ela vale `0` (não existe casa 0, então 0 quer dizer "nenhuma").

No script da bandeira do Cérebro, logo depois de [[variaveis: mude [vez ▾] para [fim]]], adicione:

[[variaveis: mude [origem ▾] para (0)]]

## 2. O Cérebro decide

Quando alguém clica, o Cérebro precisa fazer duas perguntas:

1. **É a vez do jogador?** Se não for, ignora o clique.
2. **Tem um Esquisito do time do Jogador nessa casa?** Se tiver, ele passa a ser a origem.

Pra segunda pergunta, lembra do código secreto? A letra 1 do item diz o time!

```blocos
eventos: quando eu receber [clique ▾]
controle: se <operadores: {vez} = [jogador]> então
  controle: se <operadores: {operadores: letra (1) de {listas: item {casa clicada} de [tabuleiro ▾]}} = [J]> então
    variaveis: mude [origem ▾] para {casa clicada}
```

:::robo Em português de robô
Recebi um clique. Se for a vez do jogador: pego o item da casa clicada na lista, olho a primeira letra, e se for `J`, essa casa vira a origem.
:::

## 3. A casa escolhida fica amarela

Dê ao ator **Casa** uma fantasia nova chamada `escolhida`: um quadrado de 40 × 40 amarelo (ou da cor que você quiser, desde que chame atenção). Se preferir, baixe pronto:

<p><a class="botao botao-contorno" href="recursos/casas/escolhida.svg" download>⬇️ escolhida.svg</a></p>

Agora, os clones da Casa vão ficar vigiando a variável `origem`. Troque o script de clone da Casa por este:

```blocos
eventos: quando eu começar como um clone
aparencia: mostre
aparencia: vá para a camada [de trás ▾]
controle: sempre
  controle: se <operadores: {origem} = {minha casa}> então
    aparencia: mude para a fantasia [escolhida ▾]
  senão
    aparencia: mude para a fantasia {minha cor}
```

É o mesmo truque do espelho: ninguém manda a casa ficar amarela. A casa **percebe sozinha** que é a origem.

## Teste!

Clique na bandeira e espere a sua vez.

- Clique num Esquisito **seu**: a casa fica amarela? ✅
- Clique em outro Esquisito seu: o amarelo muda de lugar? ✅
- Clique num Esquisito **do computador**: nada acontece? ✅
- Clique numa casa vazia: nada acontece? ✅

:::desafio
Faça o Narrador dizer quem foi escolhido: "Você escolheu a Mola Maluca!". Dica: no Cérebro, depois de mudar a origem, olhe a **letra 2** do item e use alguns [[controle: se <> então]] para descobrir o nome. Depois transmita uma mensagem pro Narrador.
:::

:::missao Checklist
- [ ] Criei a variável `origem` e ela começa em 0
- [ ] O Cérebro só aceita escolher Esquisitos com a letra `J`
- [ ] A Casa tem a fantasia `escolhida`
- [ ] A casa escolhida fica amarela
- [ ] Salvei
:::
