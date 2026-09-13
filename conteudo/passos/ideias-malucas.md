A trilha acabou… mas o Zadrex é **seu**. Todo jogo bom continua crescendo depois de pronto. Aqui vai uma lista de ideias pra quando bater vontade de programar mais. Escolha uma, e ela vira um passo novo nesta página!

## Ideias pra jogar com gente

- 🌶️ **Modo 2 jogadores.** Uma tela inicial com dois botões: "Contra o computador" e "Contra um amigo". No modo amigo, a `vez` alterna entre `jogador` e… outro jogador! Dica: o clique precisa aceitar a letra `C` quando for a vez do time de cima.
- 🌶️ **Placar da família.** Uma lista com nomes e vitórias. No começo, o jogo pergunta "Quem vai jogar?".
- 🌶️🌶️ **Relógio de xadrez.** Cada jogador tem 5 minutos no total. Acabou o tempo, perdeu! Use o [[sensores: cronômetro]].

## Ideias pra deixar mais esquisito

- 🌶️ **Fantasias de festa.** Esquisitos de Natal, de Halloween, de férias… Use nomes como `natal JG` e junte o tema com o código na hora de vestir.
- 🌶️🌶️ **Poderes especiais** (uma vez por partida):
  - 🧊 A **Geladeira** congela um inimigo por uma rodada.
  - 🌀 A **Mola** dá um pulo duplo.
  - 👤 A **Sombra** fica invisível pro computador por uma jogada.
  - 🤡 O **Super-Bobo** faz uma palhaçada e troca dois Esquisitos inimigos de lugar.
- 🌶️🌶️ **Zadrex Mini.** Um tabuleiro 6 × 6, com menos Esquisitos, pra partidas rápidas. Quais fórmulas precisam mudar?

## Ideias pra ajudar quem joga

- 🌶️ **Diário da partida.** No cantinho do Narrador, uma lista mostrando as jogadas: "Mola 58 → 43", "Zé 12 → 28"…
- 🌶️🌶️ **Botão desfazer.** Guarde a lista `tabuleiro` inteira antes de cada jogada. Apertou desfazer, copia de volta. (Bom pra quem está aprendendo!)
- 🌶️🌶️ **Botão dica.** Mostra uma jogada boa pro jogador, usando o `escolher melhores jogadas` com o time `J`.
- 🌶️ **Ameaças visíveis.** Um botão que pinta de vermelho as casas onde seus Esquisitos podem ser capturados.

## Ideias de programador chefão

- 🌶️🌶️🌶️ **Computador que pensa duas jogadas.** Pra cada jogada dele, imaginar a **melhor resposta** sua, e escolher a jogada em que a sua melhor resposta é a menos pior pra ele. É o começo do minimax.
- 🌶️🌶️🌶️ **Aberturas famosas.** Ensine o computador a começar a partida com jogadas que os campeões usam, guardadas numa lista.
- 🌶️🌶️🌶️ **As regras de empate que faltaram.** Repetição de posição 3 vezes, 50 jogadas sem captura e material insuficiente.

:::adulto Como adicionar um passo novo
1. Em `conteudo/trilha.js`, adicione um passo num capítulo (ou crie um capítulo novo, por exemplo `{ id: "extras", emoji: "🧪", titulo: "Invenções nossas", passos: [...] }`).
2. Crie `conteudo/passos/<id>.md` com a missão. Dá para usar as caixas `:::dica`, os blocos em ` ```blocos ` e os diagramas `<z-diagrama>` (veja o README).
3. A árvore, a numeração e a barra de progresso se ajustam sozinhas.
:::

:::missao Checklist
- [ ] Li todas as ideias
- [ ] Escolhi a próxima invenção
- [ ] Pedi pra transformar ela num passo novo na trilha
:::
