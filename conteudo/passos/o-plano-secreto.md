Antes de construir uma casa, alguém desenha a planta. Antes de construir um jogo, a gente faz o **plano**. Não precisa decorar nada daqui — é só pra você ter uma ideia de como as partes vão se encaixar.

<z-plano></z-plano>

## 1. A memória: uma lista com 64 itens

O tabuleiro tem 8 linhas × 8 colunas = **64 casas**. No Scratch, a gente vai criar uma **lista** chamada `tabuleiro` com 64 itens. Cada item diz quem está naquela casa:

- `JG` — uma Geladeira do Jogador
- `CZ` — um Zé-Pequeno do Computador
- `livre` — ninguém

Essa lista é a **verdade** do jogo. Se a lista diz que tem uma Mola na casa 58, então tem uma Mola na casa 58. Ponto final.

## 2. O espelho: clones que se vestem

A lista é invisível para quem está jogando. Pra gente **ver** o tabuleiro, vamos criar 64 clones de um ator. Cada clone sabe o número da sua casa e fica olhando pra lista o tempo todo: *"Na minha casa tem `JG`? Então vou vestir a fantasia da Geladeira azul."*

A mágica é essa: **a gente nunca mexe nos desenhos**. A gente só muda a lista, e os clones se ajeitam sozinhos.

## 3. Os cliques

Quando você clica numa casa, o clone daquela casa grita pro resto do jogo: *"Ei! Clicaram na casa 52!"*. Quem escuta é um ator invisível que a gente vai chamar de **Cérebro** 🧠.

## 4. As regras

O Cérebro sabe as regras. Quando você escolhe um Esquisito, ele calcula **todas as casas pra onde ele pode ir** e mostra bolinhas nelas. Se você clicar numa bolinha, ele faz a jogada (mudando a lista, claro).

## 5. O computador

Na vez do computador, o Cérebro faz uma lista gigante com **todas as jogadas possíveis** do time do Computador e… sorteia uma. 🎲

:::robo O jogo inteiro, em português de robô
1. Arrumar as peças na lista `tabuleiro`.
2. Criar os clones que desenham o tabuleiro.
3. Repetir até o jogo acabar:
   - Esperar o jogador escolher uma peça e uma casa permitida.
   - Mudar a lista.
   - Fazer a lista de jogadas do computador.
   - Sortear uma e mudar a lista.
:::

## Palavras que vão aparecer muito

| Palavra | O que é |
|---|---|
| **Ator** | Um personagem ou objeto do Scratch, com seus próprios blocos. |
| **Fantasia** | Cada desenho diferente que um ator pode vestir. |
| **Clone** | Uma cópia de um ator, criada enquanto o jogo roda. |
| **Variável** | Uma caixinha que guarda **um** valor (tipo "de quem é a vez"). |
| **Lista** | Uma fileira de caixinhas numeradas. |
| **Mensagem** | Um recado que um ator transmite e os outros podem receber. |
| **Meus Blocos** | Blocos que **a gente inventa**, juntando outros blocos. |

:::adulto
A arquitetura aqui é o clássico *modelo → visão*: a lista `tabuleiro` é o estado, os clones são uma visão que só lê o estado, e o ator Cérebro concentra a lógica. A geração de lances é pseudo-legal nos capítulos 4 e 5 (vitória por captura da Almofada) e vira legal no capítulo 7, com detecção de xeque. Assim a criança tem um jogo jogável cedo, e as regras difíceis ficam como "nível chefão".
:::

:::missao Checklist
- [ ] Entendi que a lista `tabuleiro` é a memória do jogo
- [ ] Entendi que os clones só "copiam" o que está na lista
- [ ] Conheço as palavras ator, fantasia, clone, variável e lista
:::
