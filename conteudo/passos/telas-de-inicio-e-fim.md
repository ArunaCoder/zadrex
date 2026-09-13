Jogo de verdade tem **tela de início** com o nome bem grande e um botão de jogar. E tem **tela de fim**, com festa ou choro, e um botão pra jogar de novo. Vamos deixar o Zadrex com cara de jogo profissional. ✨

## 1. A tela de início

No **Palco**, crie um cenário novo chamado `tela inicial`. Capriche! Algumas ideias:

- **ZADREX** bem grande, com letras gordas.
- **Guerra dos Esquisitos** embaixo, menor.
- Os Esquisitos espalhados pela tela, fazendo pose.
- Um fundo de tabuleiro torto, estrelas, raios…

:::dica Use seus próprios desenhos
Na aba Fantasias da Peça, clique com o botão direito numa fantasia e escolha **exportar**. Depois, no cenário, use **Carregar Cenário**… ou simplesmente redesenhe os Esquisitos gigantes na tela inicial.
:::

## 2. O botão Jogar

Crie um ator **Botão Jogar** (um retângulo arredondado escrito JOGAR, por exemplo):

```blocos
eventos: quando ⚑ for clicado
movimento: vá para x: (0) y: (-120)
aparencia: mostre

eventos: quando este ator for clicado
aparencia: esconda
eventos: transmita [começar ▾]
```

## 3. O Cérebro espera o botão

Até agora, o Cérebro começava a partida assim que a bandeira era clicada. Agora ele vai mostrar a tela inicial e **esperar** o botão.

Crie a variável `tabuleiro montado`. Depois divida o script da bandeira do Cérebro em dois:

```blocos
eventos: quando ⚑ for clicado
aparencia: esconda
variaveis: mude [vez ▾] para [fim]
variaveis: mude [tabuleiro montado ▾] para [não]
aparencia: mude para o cenário [tela inicial ▾]

eventos: quando eu receber [começar ▾]
aparencia: mude para o cenário [jogo ▾]
variaveis: mude [vez ▾] para [fim]
variaveis: mude [origem ▾] para (0)
variaveis: mude [voo saída ▾] para (0)
listas: apague todos os itens de [destinos ▾]
meusblocos: arrumar os esquisitos
controle: se <operadores: {tabuleiro montado} = [não]> então
  eventos: transmita [montar tabuleiro ▾] e espere
  variaveis: mude [tabuleiro montado ▾] para [sim]
eventos: transmita [boas-vindas ▾] e espere
variaveis: mude [vez ▾] para [jogador]
eventos: transmita [vez do jogador ▾]
```

:::atencao Por que "tabuleiro montado"?
Quando você jogar de novo, o `começar` vai ser transmitido outra vez. Se o `montar tabuleiro` fosse transmitido de novo, **cada um dos 128 clones** ia ouvir a mensagem e criar mais clones… e mais clones… até o Scratch travar no limite de 300. 💥

Mas não precisa montar de novo: o tabuleiro já existe! Como os clones são espelhos da lista, basta **arrumar a lista** e todos os Esquisitos voltam pro lugar sozinhos.
:::

O **Narrador** também deve ficar escondido na tela inicial: esconda ele na bandeira e mostre quando receber `começar`.

## 4. A placa de fim

Crie um ator **Placa** com três fantasias: `vitória`, `derrota` e `empate`. Desenhe placas bem chamativas: "VOCÊ VENCEU!", "O SORTEIO VENCEU…", "EMPATE!". E escreva embaixo, em todas: *clique pra jogar de novo*.

```blocos
eventos: quando ⚑ for clicado
aparencia: esconda

eventos: quando eu receber [jogador venceu ▾]
aparencia: mude para a fantasia [vitória ▾]
meusblocos: aparecer

eventos: quando eu receber [computador venceu ▾]
aparencia: mude para a fantasia [derrota ▾]
meusblocos: aparecer

eventos: quando eu receber [computador sem jogadas ▾]
aparencia: mude para a fantasia [empate ▾]
meusblocos: aparecer

eventos: quando este ator for clicado
aparencia: esconda
eventos: transmita [começar ▾]
```

E o bloco `aparecer`, que faz a placa "pular" na tela:

```blocos
meusblocos: defina aparecer
controle: espere (1) seg // dá tempo de ver a jogada final
movimento: vá para x: (-60) y: (0)
aparencia: vá para a camada [da frente ▾]
aparencia: defina o tamanho como (10) %
aparencia: mostre
controle: repita (10) vezes
  aparencia: mude (10) no tamanho
```

## Teste!

1. Clique na bandeira: aparece a tela inicial e o botão? ✅
2. Clique em Jogar: o tabuleiro aparece e a partida começa? ✅
3. Jogue até o fim (vale capturar a Almofada rapidinho com a ajuda da sorte): a placa aparece? ✅
4. Clique na placa: o tabuleiro volta pro começo e dá pra jogar de novo? ✅
5. Jogue de novo **várias vezes**: o jogo continua rápido e sem clones sobrando? ✅

:::desafio Placar
Crie as variáveis `vitórias` e `derrotas`, mostre elas no cantinho do Narrador e some 1 no fim de cada partida. Quantas vezes seguidas você consegue ganhar do sorteio?
:::

:::missao Checklist
- [ ] Criei o cenário `tela inicial`
- [ ] O Botão Jogar começa a partida
- [ ] O Cérebro só monta o tabuleiro uma vez
- [ ] A Placa aparece no fim com a fantasia certa
- [ ] Clicar na Placa começa outra partida
- [ ] Salvei (e baixei uma cópia!)
:::
