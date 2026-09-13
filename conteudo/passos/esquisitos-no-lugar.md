A lista sabe onde cada Esquisito está. Os desenhos estão prontos. Agora é juntar as duas coisas: fazer os Esquisitos **aparecerem** no tabuleiro.

## A ideia do espelho 🪞

O ator Peça vai ter uma fábrica igualzinha à da Casa: 64 clones, um em cada casa. A diferença está no que cada clone faz depois de nascer. Ele fica o tempo todo repetindo:

> "Qual é o item da minha casa na lista `tabuleiro`? `JM`? Então vou vestir a fantasia `JM`."

Isso quer dizer que **ninguém nunca precisa mover um desenho**. Pra mover uma Mola da casa 58 pra casa 43, basta mudar a lista. O clone da casa 58 vê `livre` e fica invisível; o clone da casa 43 vê `JM` e vira Mola. Parece mágica, mas é só espelho.

## 1. Copie a fábrica

Não precisa montar tudo de novo! No ator **Casa**, arraste o script da fábrica (segurando pelo chapéu [[eventos: quando eu receber [montar tabuleiro ▾]]]) e solte **em cima do ator Peça** na lista de atores. O ator Peça vai dar uma sacudidinha: pronto, ele ganhou uma cópia.

Depois, no ator **Peça**:

1. Confira se as variáveis `minha linha`, `minha coluna` e `minha casa` apareceram **apenas para este ator**. Se não, crie.
2. **Tire** a parte da cor (o [[controle: se <> então]] da cor e o [[aparencia: mude para a fantasia {minha cor}]]). A Peça não precisa disso.

## 2. O clone espelho

No ator Peça, o script de clone fica assim:

```blocos
eventos: quando eu começar como um clone
aparencia: mostre
aparencia: vá para a camada [da frente ▾]
controle: sempre
  aparencia: mude para a fantasia {listas: item {minha casa} de [tabuleiro ▾]}
```

:::robo Em português de robô
Eu sou o clone da casa `minha casa`. Pra sempre: olho na lista qual é o item da minha casa e visto a fantasia com esse nome.
:::

## Teste!

Clique na bandeira. Os 32 Esquisitos apareceram, cada um no seu lugar? 🎉

- **Os Esquisitos estão grandes demais?** Diminua o **Tamanho** do ator Peça.
- **Os Esquisitos sumiram atrás das casas?** Confira o "vá para a camada da frente" na Peça e o "vá para a camada de trás" na Casa.
- **Um Esquisito errado apareceu?** Confira o nome da fantasia e o item da lista.
- **Um Esquisito "grudou" numa casa vazia?** Confira se a fantasia `livre` existe e está escrita certinho.

## O experimento mais legal de todos

Mostre a caixinha da lista `tabuleiro` no palco (marque o quadradinho ao lado dela). Com o jogo rodando, **clique no item 36** da caixinha e digite `JB`. Aperte Enter.

Um Super-Bobo apareceu do nada no meio do tabuleiro, não foi? Agora mude o item 52 para `livre`. Um Zé-Pequeno sumiu!

Isso é o espelho funcionando: **mudou a lista, mudou o tabuleiro**. Todo o resto do jogo vai ser só isso — decidir **como** mudar a lista.

:::curiosidade
Neste momento o palco tem **128 clones** trabalhando juntos: 64 casas e 64 peças. O Scratch deixa ter até 300 clones ao mesmo tempo. Ainda sobra espaço!
:::

:::missao Checklist
- [ ] O ator Peça tem sua fábrica de 64 clones
- [ ] Cada clone veste a fantasia do item da sua casa
- [ ] Os 32 Esquisitos aparecem na posição inicial
- [ ] Fiz o experimento de mudar a lista e ver o tabuleiro mudar
- [ ] Salvei (e baixei uma cópia!)
:::
