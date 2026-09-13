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

No Voador, crie um bloco **`calcular posição da casa (casa)`** que usa as fórmulas do começo do projeto:

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
movimento: deslize por (0.3) segs. até x: {vx} y: {vy}

eventos: quando eu receber [pousou ▾]
aparencia: esconda
```

## 4. O clone da saída fica invisível

No ator **Peça**, o clone precisa saber que, se a casa dele é a de saída de um voo, ele deve se esconder. Troque o [[controle: sempre]] do clone por:

```blocos
controle: sempre
  controle: se <operadores: {minha casa} = {voo saída}> então
    aparencia: mude para a fantasia [livre ▾]
  senão
    aparencia: mude para a fantasia {listas: item {minha casa} de [tabuleiro ▾]}
```

E no script da bandeira do Cérebro, coloque [[variaveis: mude [voo saída ▾] para (0)]] logo no começo.

## 5. O bloco deslizar

No **Cérebro**, crie o bloco **`deslizar de (saída) para (chegada)`** — e dessa vez **sem** marcar "executar sem atualização de tela", porque a gente quer **ver** a animação:

```blocos
meusblocos: defina deslizar de {meusblocos: saída} para {meusblocos: chegada}
variaveis: mude [voo chegada ▾] para {meusblocos: chegada}
variaveis: mude [voo saída ▾] para {meusblocos: saída}
eventos: transmita [voar ▾] e espere
meusblocos: mover de {meusblocos: saída} para {meusblocos: chegada}
variaveis: mude [voo saída ▾] para (0)
eventos: transmita [pousou ▾]
```

Agora, **no clique e na vez do computador**, troque o bloco [[meusblocos: mover de ( ) para ( )]] por [[meusblocos: deslizar de ( ) para ( )]].

:::dica Por que o mover acontece depois do voo?
Se a lista mudasse antes, o Esquisito já ia aparecer na chegada enquanto o dublê ainda está voando. Ia ter dois Esquisitos iguais no tabuleiro por um instante. Primeiro voa, depois muda a lista!
:::

## Teste!

Jogue umas rodadas. Os Esquisitos deslizam? A Mola atravessa por cima dos outros? A Geladeira voa pelo tabuleiro inteiro?

Achou rápido ou devagar demais? Brinque com o tempo do [[movimento: deslize por (0.3) segs. até x: ( ) y: ( )]].

:::desafio Voo com estilo
- Faça a **Mola** dar pulinhos no caminho (mudando o tamanho enquanto desliza).
- Faça a **Geladeira** girar um pouquinho no ar.
- Faça o Esquisito capturado dar um "tremidinha" antes de sumir.
:::

:::missao Checklist
- [ ] Criei o Voador duplicando a Peça (sem os scripts)
- [ ] O Voador calcula a posição de qualquer casa
- [ ] O clone da casa de saída some durante o voo
- [ ] O bloco `deslizar` substituiu o `mover` no clique e no computador
- [ ] Os Esquisitos deslizam pelo tabuleiro
- [ ] Salvei (e baixei uma cópia!)
:::
