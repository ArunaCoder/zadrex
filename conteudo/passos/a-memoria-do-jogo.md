Os Esquisitos estão desenhados, mas o jogo ainda não sabe **onde** cada um está. Neste passo a gente cria a memória do jogo e o ator que manda em tudo: o **Cérebro**. 🧠

## 1. Crie o ator Cérebro

Crie um ator novo com **Pintar** e dê o nome **Cérebro**. Pode desenhar um cérebro, uma lâmpada ou deixar vazio — ele vai ficar **escondido** o jogo inteiro. O trabalho dele é pensar, não aparecer.

## 2. Crie a lista tabuleiro

Com o Cérebro selecionado, vá em **Variáveis → Criar uma Lista**. Dê o nome `tabuleiro` e deixe marcado **Para todos os atores** (a Casa e a Peça também vão precisar ler essa lista).

Uma caixinha com a lista vai aparecer no palco. Ela está vazia, com "Comprimento 0". Vamos encher!

## 3. Seu primeiro bloco inventado

O Scratch deixa a gente **inventar blocos**. Vá em **Meus Blocos → Criar um Bloco**, dê o nome `arrumar os esquisitos` e, antes de clicar em OK, marque a opção **Executar sem atualização de tela** (assim ele trabalha muito rápido).

Vai aparecer um bloco rosa [[meusblocos: defina arrumar os esquisitos]]. Tudo que você encaixar embaixo dele é o que o bloco novo faz.

Lembra da ordem dos 64 itens do passo do código secreto? Agora é colocar isso em blocos:

```blocos
meusblocos: defina arrumar os esquisitos
listas: apague todos os itens de [tabuleiro ▾]
listas: adicione [CG] a [tabuleiro ▾]
listas: adicione [CM] a [tabuleiro ▾]
listas: adicione [CS] a [tabuleiro ▾]
listas: adicione [CB] a [tabuleiro ▾]
listas: adicione [CA] a [tabuleiro ▾]
listas: adicione [CS] a [tabuleiro ▾]
listas: adicione [CM] a [tabuleiro ▾]
listas: adicione [CG] a [tabuleiro ▾]
controle: repita (8) vezes
  listas: adicione [CZ] a [tabuleiro ▾]
controle: repita (32) vezes
  listas: adicione [livre] a [tabuleiro ▾]
controle: repita (8) vezes
  listas: adicione [JZ] a [tabuleiro ▾]
listas: adicione [JG] a [tabuleiro ▾] // e a última fileira continua...
listas: adicione [JM] a [tabuleiro ▾]
listas: adicione [JS] a [tabuleiro ▾]
listas: adicione [JB] a [tabuleiro ▾]
listas: adicione [JA] a [tabuleiro ▾]
listas: adicione [JS] a [tabuleiro ▾]
listas: adicione [JM] a [tabuleiro ▾]
listas: adicione [JG] a [tabuleiro ▾]
```

:::dica Por que "apague todos os itens" no começo?
Sem ele, cada vez que você clicasse na bandeira a lista ia ganhar mais 64 itens: 128, 192, 256… O jogo ia ficar maluco (mais maluco).
:::

## 4. A ordem das coisas importa

Agora pense: a Casa e a Peça vão criar seus clones quando a bandeira for clicada. Mas e se os clones da Peça forem ler a lista **antes** do Cérebro terminar de arrumá-la? Eles iam ler uma lista vazia!

A solução é o Cérebro ser o **maestro**: primeiro ele arruma a lista, e só depois avisa todo mundo que pode montar o tabuleiro. No Cérebro:

```blocos
eventos: quando ⚑ for clicado
aparencia: esconda
meusblocos: arrumar os esquisitos
eventos: transmita [montar tabuleiro ▾] e espere
```

(Para criar a mensagem `montar tabuleiro`, abra o menu do bloco [[eventos: transmita [mensagem 1 ▾]]] e escolha **Nova mensagem**.)

E agora uma mudança no ator **Casa**: troque o chapéu da fábrica. Tire o [[eventos: quando ⚑ for clicado]] e coloque no lugar:

```blocos
eventos: quando eu receber [montar tabuleiro ▾]
aparencia: esconda
// ...o resto da fábrica continua igual
```

:::curiosidade "Transmita" e "transmita e espere"
O [[eventos: transmita [montar tabuleiro ▾]]] grita o recado e segue a vida. Já o [[eventos: transmita [montar tabuleiro ▾] e espere]] grita o recado e **espera** todo mundo que ouviu terminar o que tinha pra fazer. Pro maestro, esperar é melhor.
:::

## Teste!

Clique na bandeira. O tabuleiro continua aparecendo? E a caixinha da lista no palco mostra **Comprimento 64**? Role a lista e confira: o item 1 é `CG`, o item 5 é `CA`, o item 61 é `JA`?

Depois de conferir, pode esconder a caixinha da lista desmarcando o quadradinho ao lado de `tabuleiro` na categoria Variáveis.

:::desafio Desafio do programador preguiçoso
Programador bom é programador preguiçoso: ele odeia repetir blocos. Crie uma variável `fileira` com o valor `GMSBASMG` e use um [[controle: repita (8) vezes]] com [[operadores: junte [C] com {operadores: letra {i} de {fileira}}]] para adicionar a primeira fileira inteira com poucos blocos. Depois faça o mesmo com o `J`.
:::

:::missao Checklist
- [ ] Criei o ator **Cérebro**
- [ ] Criei a lista `tabuleiro` para todos os atores
- [ ] Criei o bloco `arrumar os esquisitos` e ele coloca 64 itens na lista
- [ ] O Cérebro transmite `montar tabuleiro` e a Casa recebe essa mensagem
- [ ] Conferi alguns itens da lista
- [ ] Salvei
:::
