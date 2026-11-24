Bem-vindo ao **Nível Chefão**! 👑 Aqui ficam as regras mais especiais do Zadrex — e as mais esquisitas também. A primeira é a mais feliz de todas: o **Zé-Pequeno cresce**.

## A regra

Quando um Zé-Pequeno consegue atravessar o tabuleiro inteiro e chegar na **última linha** do outro lado, ele dá um **estirão**: vira um **Super-Bobo**! Isso vale mesmo que o time já tenha um Super-Bobo. Dá pra ter dois, três, nove…

- Zé do **Jogador** cresce quando chega na **linha 1** (casas 1 a 8).
- Zé do **Computador** cresce quando chega na **linha 8** (casas 57 a 64).

<z-diagrama pecas="12:JZ 3:CS" mover="12" legenda="Andando pra casa 4 ou capturando a Sombra na casa 3: nos dois casos o Zé cresce!"></z-diagrama>

:::curiosidade
Por que Super-Bobo? Porque ele é o Esquisito mais forte, e todo Zé-Pequeno sonha em ser forte. A gente começa simples, com o estirão sempre virando Super-Bobo. Mas, se quiser deixar o jogador escolher, tem um desafio lá embaixo.
:::

## Um atalho esperto

Não precisa calcular a linha! Olhe os números:

- Linha 1 são as casas de 1 a 8. Ou seja: `chegada < 9`.
- Linha 8 são as casas de 57 a 64. Ou seja: `chegada > 56`.

## No bloco mover

No **Cérebro**, crie a variável `peça movida`. No bloco `mover`, **logo depois** das duas substituições (antes dos sons), adicione:

```blocos
variaveis: mude [peça movida ▾] para {listas: item {meusblocos: chegada} de [tabuleiro ▾]}
controle: se <operadores: {operadores: letra (2) de {peça movida}} = [Z]> então
  controle: se <operadores: <operadores: <operadores: {operadores: letra (1) de {peça movida}} = [J]> e <operadores: {meusblocos: chegada} < (9)>> ou <operadores: <operadores: {operadores: letra (1) de {peça movida}} = [C]> e <operadores: {meusblocos: chegada} > (56)>>> então
    listas: substitua o item {meusblocos: chegada} de [tabuleiro ▾] por ??{operadores: junte {operadores: letra (1) de {peça movida}} com [B]}
    eventos: transmita [zé cresceu ▾]
```

:::robo Em português de robô
Vejo quem acabou de chegar. Se é um Zé, e (é do Jogador e chegou na linha 1) ou (é do Computador e chegou na linha 8): troco ele por um Super-Bobo do mesmo time (`J` + `B` = `JB`) e aviso todo mundo.
:::

<details>
<summary><b>📋 Como o bloco <code>mover</code> fica agora</b></summary>

```blocos
meusblocos: defina mover de {meusblocos: saída} para {meusblocos: chegada}
variaveis: mude [capturado ▾] para {listas: item {meusblocos: chegada} de [tabuleiro ▾]}
listas: substitua o item {meusblocos: chegada} de [tabuleiro ▾] por {listas: item {meusblocos: saída} de [tabuleiro ▾]}
listas: substitua o item {meusblocos: saída} de [tabuleiro ▾] por [livre]
?? variaveis: mude [peça movida ▾] para {listas: item {meusblocos: chegada} de [tabuleiro ▾]}
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
// a Almofada foi capturada? (regra provisória)
controle: se <operadores: {operadores: letra (2) de {capturado}} = [A]> então
  variaveis: mude [vez ▾] para [fim]
  controle: se <operadores: {operadores: letra (1) de {capturado}} = [C]> então
    eventos: transmita [jogador venceu ▾]
  senão
    eventos: transmita [computador venceu ▾]
```

</details>

## O Narrador comemora

No **Narrador**:

```blocos
eventos: quando eu receber [zé cresceu ▾]
controle: espere (0.1) seg
aparencia: diga [O Zé-Pequeno CRESCEU! Agora ele é um Super-Bobo!] por (2) segundos
```

:::dica Pra que esperar 0,1 segundo?
Logo depois do estirão, o Cérebro passa a vez, e o Narrador diz "Sua vez!" ou pensa "Hmm…". Sem a esperinha, essa fala ia tampar a comemoração antes de você ler. Esperando um tiquinho, a comemoração fica por cima.
:::

Que tal um som de "crescendo" também? (Tipo um apito subindo: *fiuuuuuu*!)

## Como testar sem jogar meia hora

Levar um Zé até o outro lado demora. Truque de programador: **mude a lista na mão**! Com o jogo rodando, na sua vez e com a caixinha do `tabuleiro` à mostra, coloque `JZ` no item 12 e `livre` no item 4. Depois é só avançar o Zé. Ele virou Super-Bobo?

Teste também capturando na diagonal até a linha 1. E espere o computador conseguir dar um estirão num Zé dele (pode demorar, ele é sorteador…).

Acabou de testar? Esconda de novo a caixinha do `tabuleiro` (desmarque o quadradinho ao lado dela em Variáveis).

:::desafio Estirão à escolha
Faça o jogo **perguntar** pro jogador em que ele quer transformar o Zé: [[sensores: pergunte [Virar o quê? B, G, S ou M] e espere]]. Dica: faça a pergunta **fora** do bloco `mover` (ele roda sem atualizar a tela, e perguntar lá dentro trava o jogo). O computador pode continuar escolhendo sempre Super-Bobo.
:::

:::missao Checklist
- [ ] Criei a variável `peça movida`
- [ ] O Zé do Jogador vira `JB` na linha 1
- [ ] O Zé do Computador vira `CB` na linha 8
- [ ] O Narrador comemora
- [ ] Testei mudando a lista na mão
- [ ] Salvei (e guardei uma cópia de segurança!)
:::
