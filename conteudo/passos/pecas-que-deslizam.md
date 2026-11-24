Hoje os Esquisitos se **teletransportam**: somem de uma casa e aparecem na outra. Funciona, mas não tem graça. Neste passo eles vão **deslizar** pelo tabuleiro. A Geladeira vai voar de verdade! 🧊✈️

## O problema

Os Esquisitos do tabuleiro são clones parados, cada um preso na sua casa. Nenhum deles pode sair andando por aí. Então como fazer um Esquisito atravessar o tabuleiro?

## A solução: um dublê

Nos filmes, quando a cena é perigosa, entra um **dublê** no lugar do ator. A gente vai fazer igual:

1. O clone da casa de saída fica **invisível**.
2. Um ator dublê, o **Voador**, veste a mesma fantasia, aparece na casa de saída e **desliza** até a casa de chegada.
3. Só quando o Voador chega, o jogo faz o `mover` de verdade na lista.
4. O Voador some. Ninguém percebe a troca. 🎬

## 1. Crie o Voador

Clique com o botão direito no ator **Peça** e escolha **duplicar**. Renomeie a cópia para **Voador** e **apague todos os scripts** dela. Assim ele já nasce com as 13 fantasias e o mesmo tamanho da Peça.

Crie as variáveis `voo saída` e `voo chegada` (para todos os atores), e no Voador as variáveis `vx` e `vy` (apenas para este ator).

## 2. O Voador sabe onde fica cada casa

No Voador, crie um bloco **`calcular posição da casa (casa)`** que usa as fórmulas do começo do projeto. Esse pode marcar **Executar sem atualização de tela**: ele só faz contas.

```blocos
meusblocos: defina calcular posição da casa {meusblocos: casa}
variaveis: mude [vx ▾] para {operadores: {operadores: {operadores: {operadores: resto de {operadores: {meusblocos: casa} - (1)} por (8)} + (1)} * (40)} - (240)}
variaveis: mude [vy ▾] para {operadores: (180) - {operadores: {operadores: {operadores: [arredondamento para baixo de ▾] de {operadores: {operadores: {meusblocos: casa} - (1)} / (8)}} + (1)} * (40)}}
```

## 3. O voo

Ainda no Voador:

```blocos
eventos: quando ⚑ for clicado
aparencia: esconda

eventos: quando eu receber [voar ▾]
aparencia: mude para a fantasia {listas: item {voo saída} de [tabuleiro ▾]}
meusblocos: calcular posição da casa {voo saída}
movimento: vá para x: {vx} y: {vy}
aparencia: vá para a camada [da frente ▾]
aparencia: mostre
meusblocos: calcular posição da casa {voo chegada}
?? movimento: deslize por (0.3) segs. até x: {vx} y: {vy}

eventos: quando eu receber [pousou ▾]
aparencia: esconda
```

## 4. O clone da saída fica invisível

No ator **Peça**, o clone precisa saber que, se a casa dele é a de saída de um voo, ele deve se esconder. O script de clone da Peça fica assim:

```blocos
eventos: quando eu começar como um clone
aparencia: mostre
aparencia: vá para a camada [da frente ▾]
controle: sempre
  controle: se ??<operadores: {minha casa} = {voo saída}> então
    aparencia: mude para a fantasia [livre ▾]
  senão
    aparencia: mude para a fantasia {listas: item {minha casa} de [tabuleiro ▾]}
```

E no script da bandeira do **Cérebro**, coloque [[variaveis: mude [voo saída ▾] para (0)]] logo depois do [[aparencia: esconda]].

<details>
<summary><b>📋 Como o script da bandeira do Cérebro fica agora</b></summary>

```blocos
eventos: quando ⚑ for clicado
aparencia: esconda
?? variaveis: mude [voo saída ▾] para (0)
variaveis: mude [vez ▾] para [fim]
variaveis: mude [origem ▾] para (0)
listas: apague todos os itens de [destinos ▾]
meusblocos: arrumar os esquisitos
eventos: transmita [montar tabuleiro ▾] e espere
eventos: transmita [boas-vindas ▾] e espere
variaveis: mude [vez ▾] para [jogador]
eventos: transmita [vez do jogador ▾]
```

</details>

## 5. O bloco deslizar

No **Cérebro**, crie o bloco **`deslizar de (saída) para (chegada)`** — e dessa vez **sem** marcar "executar sem atualização de tela", porque a gente quer **ver** a animação:

```blocos
meusblocos: defina deslizar de {meusblocos: saída} para {meusblocos: chegada}
variaveis: mude [voo chegada ▾] para {meusblocos: chegada}
variaveis: mude [voo saída ▾] para {meusblocos: saída}
?? eventos: transmita [voar ▾] e espere
meusblocos: mover de {meusblocos: saída} para {meusblocos: chegada}
variaveis: mude [voo saída ▾] para (0)
eventos: transmita [pousou ▾]
```

Agora, **no clique e na vez do computador**, troque o bloco [[meusblocos: mover de ( ) para ( )]] por [[meusblocos: deslizar de ( ) para ( )]].

:::dica Por que o mover acontece depois do voo?
Se a lista mudasse antes, o Esquisito já ia aparecer na chegada enquanto o dublê ainda está voando. Ia ter dois Esquisitos iguais no tabuleiro por um instante. Primeiro voa, depois muda a lista!
:::

## 6. Nada de clique apressado

O voo demora um pouquinho. E se você clicar de novo **durante** o voo? O Scratch **recomeça do zero** o script "quando eu receber clique" do Cérebro. O voo é cortado no meio, o `mover` nunca acontece, o Esquisito volta pro lugar e a vez não passa. 😵

A solução: trancar os cliques **antes** de voar. São duas mudanças.

**No ator Casa e no ator Peça**, o clone só avisa o clique se for a vez do jogador. Troque o script de clique dos **dois** atores por este:

```blocos
eventos: quando este ator for clicado
controle: se <operadores: {vez} = [jogador]> então
  variaveis: mude [casa clicada ▾] para ??{minha casa}
  eventos: transmita [clique ▾]
```

**No Cérebro**, no script do clique, a vez muda para `computador` **antes** de deslizar:

1. Pegue um bloco [[variaveis: mude [vez ▾] para [computador]]] novo e encaixe logo **antes** do `deslizar`.
2. Lá embaixo, dentro do "se o jogo não acabou", clique com o botão direito no [[variaveis: mude [vez ▾] para [computador]]] antigo e escolha **Apagar bloco**. O `transmita` continua lá.

Fica assim:

```blocos
eventos: quando eu receber [clique ▾]
controle: se <operadores: {vez} = [jogador]> então
  controle: se <operadores: {operadores: letra (1) de {listas: item {casa clicada} de [tabuleiro ▾]}} = [J]> então
    variaveis: mude [origem ▾] para {casa clicada}
    meusblocos: calcular destinos de {origem}
  senão
    controle: se <operadores: <operadores: {origem} > (0)> e <listas: [destinos ▾] contém {casa clicada}?>> então
      variaveis: mude [vez ▾] para [computador] // tranca os cliques
      ?? meusblocos: deslizar de {origem} para {casa clicada}
      variaveis: mude [origem ▾] para (0)
      listas: apague todos os itens de [destinos ▾]
      controle: se <operadores: não <operadores: {vez} = [fim]>> então
        eventos: transmita [vez do computador ▾]
    senão
      variaveis: mude [origem ▾] para (0)
      listas: apague todos os itens de [destinos ▾]
```

:::robo Em português de robô
A jogada vale? Tranco a porta (`vez` = `computador`), faço o voo e mudo a lista. Se o jogo não acabou, aviso o computador. A porta já está trancada, então nenhum clique atrapalha o voo.
:::

A vez do computador não precisa de tranca nova: durante ela a `vez` já é `computador`. Ela só troca o `mover` pelo `deslizar`:

<details>
<summary><b>📋 Como o script da vez do computador fica agora</b></summary>

```blocos
eventos: quando eu receber [vez do computador ▾]
controle: espere (0.5) seg
meusblocos: listar jogadas do time [C]
controle: se <operadores: {listas: tamanho de [todas as saídas ▾]} = (0)> então
  variaveis: mude [vez ▾] para [fim]
  eventos: transmita [computador sem jogadas ▾]
  controle: pare [este script ▾]
variaveis: mude [sorteio ▾] para {operadores: número aleatório entre (1) e {listas: tamanho de [todas as saídas ▾]}}
variaveis: mude [origem ▾] para {listas: item {sorteio} de [todas as saídas ▾]}
listas: adicione {listas: item {sorteio} de [todas as chegadas ▾]} a [destinos ▾]
controle: espere (0.7) seg
?? meusblocos: deslizar de {origem} para {listas: item {sorteio} de [todas as chegadas ▾]}
variaveis: mude [origem ▾] para (0)
listas: apague todos os itens de [destinos ▾]
controle: se <operadores: não <operadores: {vez} = [fim]>> então
  variaveis: mude [vez ▾] para [jogador]
  eventos: transmita [vez do jogador ▾]
```

</details>

## Teste!

Jogue umas rodadas. Os Esquisitos deslizam? A Mola atravessa por cima dos outros? A Geladeira voa pelo tabuleiro inteiro?

Agora o teste do apressado: faça uma jogada e, **enquanto** o Esquisito voa, clique várias vezes no tabuleiro. Ele chega no destino e a vez passa pro computador? ✅

Achou rápido ou devagar demais? Brinque com o tempo do [[movimento: deslize por (0.3) segs. até x: ( ) y: ( )]].

:::desafio Voo com estilo
- Faça a **Mola** dar pulinhos no caminho (mudando o tamanho enquanto desliza).
- Faça a **Geladeira** girar um pouquinho no ar.
- Faça o Esquisito capturado dar uma "tremidinha" antes de sumir.
:::

:::missao Checklist
- [ ] Criei o Voador duplicando a Peça (sem os scripts)
- [ ] O Voador calcula a posição de qualquer casa
- [ ] O clone da casa de saída some durante o voo
- [ ] O bloco `deslizar` substituiu o `mover` no clique e no computador
- [ ] A Casa e a Peça só avisam o clique na vez do jogador
- [ ] A vez muda para `computador` antes do `deslizar`
- [ ] Clicar durante o voo não estraga a jogada
- [ ] Os Esquisitos deslizam pelo tabuleiro
- [ ] Salvei (e guardei uma cópia de segurança!)
:::
