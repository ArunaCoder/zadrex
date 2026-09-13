Todo jogo precisa de um elenco. O nosso é… esquisito. Cada time tem **16 peças**: 8 Zé-Pequenos, 2 Geladeiras Voadoras, 2 Molas Malucas, 2 Sombras, 1 Super-Bobo e 1 Grande Almofada.

<z-elenco></z-elenco>

## Como cada um se mexe

Nos tabuleiros abaixo, a peça está na casa amarela. As **bolinhas** mostram para onde ela pode ir. Um **círculo vermelho** em volta de uma peça inimiga quer dizer que dá pra capturá-la.

### 🧊 Geladeira Voadora — linhas retas

Voa pra cima, pra baixo, pra esquerda e pra direita, quantas casas quiser. Mas não atravessa ninguém: se tiver alguém no caminho, ela para. Se esse alguém for inimigo, ela pode capturar.

<z-diagrama pecas="36:JG 12:JZ 39:CS" mover="36" legenda="A Geladeira não passa pelo amigo lá em cima, mas pode capturar a Sombra inimiga."></z-diagrama>

### 👤 Sombra — diagonais

Desliza na diagonal, quantas casas quiser. Repare numa coisa curiosa: a Sombra que começa numa casa clara **passa o jogo inteiro** em casas claras.

<z-diagrama pecas="36:JS" mover="36"></z-diagrama>

### 🤡 Super-Bobo — tudo junto

É a Geladeira e a Sombra ao mesmo tempo: anda reto **e** na diagonal. É a peça mais forte do jogo.

<z-diagrama pecas="36:JB" mover="36"></z-diagrama>

### 👑 Grande Almofada — devagarinho

Anda só **uma casa**, mas em qualquer direção. É a peça mais importante: se ela for encurralada sem saída, o time dela perde.

<z-diagrama pecas="36:JA" mover="36"></z-diagrama>

### 🌀 Mola Maluca — pula em L

Pula duas casas pra um lado e uma pro outro, formando um **L**. É a única que **pula por cima** das outras peças, sejam amigas ou inimigas.

<z-diagrama pecas="36:JM 28:JZ 35:CZ 37:JZ 44:CZ" mover="36" legenda="Cercada de gente? Não tem problema: boing!"></z-diagrama>

### 🧒 Zé-Pequeno — pra frente, sempre

O Zé anda **uma casa pra frente** (nunca pra trás!). Na primeira vez que se mexe, pode andar **duas**. E tem uma mania: ele só captura **na diagonal**, uma casa pra frente.

<z-diagrama pecas="52:JZ 43:CM 45:CZ" mover="52" legenda="Andar pra frente (1 ou 2 casas) ou capturar na diagonal."></z-diagrama>

:::curiosidade
O Zé-Pequeno parece o mais simples, mas é o **mais complicado** de programar. Ele tem um monte de regrinhas especiais. Por isso ele vai ser o último a ganhar vida no capítulo das regras.
:::

## Os dois times

- **Time do Jogador** (você) — começa embaixo e faz a primeira jogada.
- **Time do Computador** — começa em cima.

Nesta página o seu time aparece em **azul** e o do computador em **vermelho**, mas no seu jogo você escolhe as cores que quiser. Só precisa dar pra diferenciar bem os dois times.

:::missao Checklist
- [ ] Conheço os seis Esquisitos pelo nome
- [ ] Sei qual peça do xadrez cada um é
- [ ] Já escolhi as cores dos dois times
:::

:::desafio
Pegue um tabuleiro de xadrez de verdade (ou desenhe um num papel) e jogue uma partida com alguém usando os nomes dos Esquisitos. "Minha Mola Maluca captura seu Super-Bobo!" soa bem melhor que "cavalo toma dama".
:::
