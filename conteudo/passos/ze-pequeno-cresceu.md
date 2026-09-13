Bem-vindo ao **Nível Chefão**! 👑 Aqui ficam as regras especiais do xadrez — as que muita gente que joga nem conhece. A primeira é a mais feliz de todas: o **Zé-Pequeno cresce**.

## A regra

Quando um Zé-Pequeno consegue atravessar o tabuleiro inteiro e chegar na **última linha** do outro lado, ele é **promovido**: vira um **Super-Bobo**! Isso vale mesmo que o time já tenha um Super-Bobo. Dá pra ter dois, três, nove…

- Zé do **Jogador** cresce quando chega na **linha 1** (casas 1 a 8).
- Zé do **Computador** cresce quando chega na **linha 8** (casas 57 a 64).

<z-diagrama pecas="12:JZ 3:CS" mover="12" legenda="Andando pra casa 4 ou capturando a Sombra na casa 3: nos dois casos o Zé cresce!"></z-diagrama>

:::curiosidade
No xadrez de verdade, o peão pode virar dama, torre, bispo ou cavalo — quem escolhe é o jogador. Quase todo mundo escolhe a dama, porque é a mais forte. No Zadrex, a gente começa simples: sempre Super-Bobo.
:::

## Um atalho esperto

Não precisa calcular a linha! Olhe os números:

- Linha 1 são as casas de 1 a 8. Ou seja: `chegada < 9`.
- Linha 8 são as casas de 57 a 64. Ou seja: `chegada > 56`.

## No bloco mover

Crie a variável `peça movida`. No bloco `mover`, **logo depois** das duas substituições (antes dos sons), adicione:

```blocos
variaveis: mude [peça movida ▾] para {listas: item {meusblocos: chegada} de [tabuleiro ▾]}
controle: se <operadores: {operadores: letra (2) de {peça movida}} = [Z]> então
  controle: se <operadores: <operadores: <operadores: {operadores: letra (1) de {peça movida}} = [J]> e <operadores: {meusblocos: chegada} < (9)>> ou <operadores: <operadores: {operadores: letra (1) de {peça movida}} = [C]> e <operadores: {meusblocos: chegada} > (56)>>> então
    listas: substitua o item {meusblocos: chegada} de [tabuleiro ▾] por {operadores: junte {operadores: letra (1) de {peça movida}} com [B]}
    eventos: transmita [zé cresceu ▾]
```

:::robo Em português de robô
Vejo quem acabou de chegar. Se é um Zé, e (é do Jogador e chegou na linha 1) ou (é do Computador e chegou na linha 8): troco ele por um Super-Bobo do mesmo time (`J` + `B` = `JB`) e aviso todo mundo.
:::

## O Narrador comemora

```blocos
eventos: quando eu receber [zé cresceu ▾]
aparencia: diga [O Zé-Pequeno CRESCEU! Agora ele é um Super-Bobo!] por (2) segundos
```

Que tal um som de "crescendo" também? (Tipo um apito subindo: *fiuuuuuu*!)

## Como testar sem jogar meia hora

Levar um Zé até o outro lado demora. Truque de programador: **mude a lista na mão**! Com o jogo rodando e a caixinha do `tabuleiro` à mostra, coloque `JZ` no item 12 e `livre` no item 4. Depois é só avançar o Zé. Ele virou Super-Bobo?

Teste também capturando na diagonal até a linha 1. E espere o computador conseguir promover um Zé dele (pode demorar, ele é sorteador…).

:::desafio Escolha a promoção
Faça o jogo **perguntar** pro jogador em que ele quer transformar o Zé: [[sensores: pergunte [Virar o quê? B, G, S ou M] e espere]]. Dica: faça a pergunta **fora** do bloco `mover` (ele roda sem atualizar a tela, e perguntar lá dentro trava o jogo). O computador pode continuar escolhendo sempre Super-Bobo.
:::

:::missao Checklist
- [ ] Criei a variável `peça movida`
- [ ] O Zé do Jogador vira `JB` na linha 1
- [ ] O Zé do Computador vira `CB` na linha 8
- [ ] O Narrador comemora
- [ ] Testei mudando a lista na mão
- [ ] Salvei (e baixei uma cópia!)
:::
