No xadrez de verdade, ninguém captura o rei. Antes disso, alguém avisa: **"Xeque!"** — que quer dizer "cuidado, sua Almofada está em perigo". Neste passo o jogo aprende a perceber quando uma Almofada está ameaçada.

<z-diagrama pecas="5:CA 37:JG" destacar="5" marcar="13 21 29" legenda="Xeque! A Geladeira ameaça a Almofada pela coluna."></z-diagrama>

## Pensando ao contrário 🔄

Como descobrir se alguém pode capturar a Almofada? Um jeito seria calcular os destinos de **todos** os inimigos e ver se a casa dela aparece. Funciona, mas dá um trabalhão.

Existe um jeito muito mais esperto: **olhar a partir da Almofada**.

- Olhando em **linha reta** (4 direções), o primeiro Esquisito que aparece é uma **Geladeira** ou um **Super-Bobo** inimigo? Perigo!
- Olhando nas **diagonais**, o primeiro que aparece é uma **Sombra** ou um **Super-Bobo** inimigo? Perigo!
- Nas 8 casas de **pulo em L**, tem uma **Mola** inimiga? Perigo!
- Nas 8 casas **vizinhas**, tem a **Almofada** inimiga? Perigo!
- Nas duas **diagonais da frente**, tem um **Zé** inimigo? Perigo!

Faz sentido: se a Almofada "enxerga" uma Geladeira pela linha reta, a Geladeira também enxerga a Almofada! 👀

## 1. O bloco espiar

Ele é quase igual ao bloco `andar`. Clique com o botão direito no `defina andar…`, escolha **Duplicar** e transforme num bloco novo:

**`espiar de (casa) direção (dl) (dc) até (máx) procurando (tipo 1) (tipo 2)`** — sem atualização de tela.

Crie as variáveis `perigo`, `time amigo`, `el`, `ec`, `epassos`, `ealvo` e `equem` (as do espiar começam com **e**, pra não misturar com as do `andar`).

```blocos
meusblocos: defina espiar de {meusblocos: casa} direção {meusblocos: dl} {meusblocos: dc} até {meusblocos: máx} procurando {meusblocos: tipo 1} {meusblocos: tipo 2}
variaveis: mude [el ▾] para {operadores: {operadores: [arredondamento para baixo de ▾] de {operadores: {operadores: {meusblocos: casa} - (1)} / (8)}} + (1)}
variaveis: mude [ec ▾] para {operadores: {operadores: resto de {operadores: {meusblocos: casa} - (1)} por (8)} + (1)}
variaveis: mude [epassos ▾] para (0)
controle: repita até que <operadores: {epassos} = {meusblocos: máx}>
  variaveis: adicione {meusblocos: dl} a [el ▾]
  variaveis: adicione {meusblocos: dc} a [ec ▾]
  variaveis: adicione (1) a [epassos ▾]
  controle: se <operadores: <operadores: {el} < (1)> ou <operadores: {el} > (8)>> então
    controle: pare [este script ▾]
  controle: se <operadores: <operadores: {ec} < (1)> ou <operadores: {ec} > (8)>> então
    controle: pare [este script ▾]
  variaveis: mude [ealvo ▾] para {operadores: {operadores: {operadores: {el} - (1)} * (8)} + {ec}}
  variaveis: mude [equem ▾] para {listas: item {ealvo} de [tabuleiro ▾]}
  controle: se <operadores: não <operadores: {equem} = [livre]>> então
    controle: se <operadores: <operadores: não <operadores: {operadores: letra (1) de {equem}} = {time amigo}>> e <operadores: <operadores: {operadores: letra (2) de {equem}} = {meusblocos: tipo 1}> ou <operadores: {operadores: letra (2) de {equem}} = {meusblocos: tipo 2}>>> então
      variaveis: mude [perigo ▾] para [sim]
    controle: pare [este script ▾] // achou alguém: essa direção acabou
```

## 2. O bloco verificar perigo

Agora o bloco que espia em **todas** as direções: **`verificar perigo na casa (casa) do time (time)`** — sem atualização de tela. Crie também a variável `frente do inimigo`.

```blocos
meusblocos: defina verificar perigo na casa {meusblocos: casa} do time {meusblocos: time}
variaveis: mude [perigo ▾] para [não]
variaveis: mude [time amigo ▾] para {meusblocos: time}
// linhas retas: Geladeira ou Super-Bobo
meusblocos: espiar de {meusblocos: casa} direção (-1) (0) até (7) procurando [G] [B]
meusblocos: espiar de {meusblocos: casa} direção (1) (0) até (7) procurando [G] [B]
meusblocos: espiar de {meusblocos: casa} direção (0) (-1) até (7) procurando [G] [B]
meusblocos: espiar de {meusblocos: casa} direção (0) (1) até (7) procurando [G] [B]
// diagonais: Sombra ou Super-Bobo
meusblocos: espiar de {meusblocos: casa} direção (-1) (-1) até (7) procurando [S] [B]
meusblocos: espiar de {meusblocos: casa} direção (-1) (1) até (7) procurando [S] [B]
meusblocos: espiar de {meusblocos: casa} direção (1) (-1) até (7) procurando [S] [B]
meusblocos: espiar de {meusblocos: casa} direção (1) (1) até (7) procurando [S] [B]
// pulos em L: Mola (os mesmos 8 pulos do bloco da Mola, até 1, procurando [M] [M])
// vizinhas: Almofada (as mesmas 8 direções da Almofada, até 1, procurando [A] [A])
// Zés inimigos: eles atacam na diagonal da frente DELES
controle: se <operadores: {meusblocos: time} = [J]> então
  variaveis: mude [frente do inimigo ▾] para (-1)
senão
  variaveis: mude [frente do inimigo ▾] para (1)
meusblocos: espiar de {meusblocos: casa} direção {frente do inimigo} (-1) até (1) procurando [Z] [Z]
meusblocos: espiar de {meusblocos: casa} direção {frente do inimigo} (1) até (1) procurando [Z] [Z]
```

:::dica Os comentários amarelos
Onde está escrito "pulos em L" e "vizinhas", monte os 16 blocos `espiar` seguindo as tabelas dos passos da Mola e da Almofada. São 26 blocos `espiar` no total. Use bastante o **Duplicar**!
:::

:::curiosidade Por que o Zé é "ao contrário"?
Um Zé do **Computador** anda pra baixo, então ele ataca as diagonais **de baixo** dele. Isso quer dizer que, olhando **da sua Almofada**, ele está numa diagonal **de cima** (linha − 1). Por isso, quando o time é `J`, a gente espia com -1.
:::

## 3. Anunciar o xeque

Crie a variável `casa da almofada` e o bloco **`anunciar xeque no time (time)`**. O truque é o bloco [[listas: item # de [CA] em [tabuleiro ▾]]], que diz **em qual casa** está um item da lista:

```blocos
meusblocos: defina anunciar xeque no time {meusblocos: time}
variaveis: mude [casa da almofada ▾] para {listas: item # de {operadores: junte {meusblocos: time} com [A]} em [tabuleiro ▾]}
meusblocos: verificar perigo na casa {casa da almofada} do time {meusblocos: time}
controle: se <operadores: {perigo} = [sim]> então
  eventos: transmita [xeque ▾]
```

Chame [[meusblocos: anunciar xeque no time [C]]] depois da **sua** jogada (antes de passar a vez) e [[meusblocos: anunciar xeque no time [J]]] depois da jogada do **computador**.

E o Narrador:

```blocos
eventos: quando eu receber [xeque ▾]
aparencia: diga [XEQUE! A Almofada tá suando frio!] por (2) segundos
```

## Teste!

Monte situações mudando a lista na mão (é bem mais rápido). Por exemplo: deixe a coluna 5 livre entre a Almofada do computador (casa 5) e uma Geladeira sua, e faça uma jogada qualquer. O Narrador grita "Xeque"? Teste com uma Sombra, uma Mola, um Zé e o Super-Bobo também.

:::missao Checklist
- [ ] Criei o bloco `espiar` (duplicando o `andar`)
- [ ] Criei o bloco `verificar perigo` com as 26 espiadas
- [ ] Criei o bloco `anunciar xeque`
- [ ] O Narrador avisa o xeque dos dois times
- [ ] Testei o xeque com cada tipo de Esquisito
- [ ] Salvei (e guardei uma cópia de segurança!)
:::
