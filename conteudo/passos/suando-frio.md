No Zadrex, a Almofada nunca é pega de surpresa. Quando alguém ameaça capturar ela, o jogo avisa: **"Suando Frio!"** — que quer dizer "cuidado, sua Almofada está em perigo". Neste passo o jogo aprende a perceber quando uma Almofada está ameaçada.

<z-diagrama pecas="5:CA 37:JG" destacar="5" marcar="13 21 29" legenda="Suando Frio! A Geladeira ameaça a Almofada pela coluna."></z-diagrama>

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

Tudo deste passo é no **Cérebro**. O primeiro bloco é quase igual ao `andar`. Crie em **Meus Blocos** o bloco novo:

**`espiar de (casa) direção (dl) (dc) até (máx) procurando (tipo 1) (tipo 2)`** — sem atualização de tela.

Crie as variáveis `perigo`, `time amigo`, `el`, `ec`, `epassos`, `ealvo` e `equem` (as do espiar começam com **e**, pra não misturar com as do `andar`).

:::dica Copiando do andar
No `defina andar…`, clique com o botão direito no **primeiro** bloco embaixo do chapéu e escolha **Duplicar**. Encaixe a cópia embaixo do `defina espiar…`. Depois troque `l` por `el`, `c` por `ec`, `passos` por `epassos`, `alvo` por `ealvo` e `quem está lá` por `equem`. E troque o final, que é diferente. Confira tudo com os blocos abaixo.
:::

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
// pulos em L: Mola
meusblocos: espiar de {meusblocos: casa} direção (-2) (-1) até (1) procurando [M] [M]
meusblocos: espiar de {meusblocos: casa} direção (-2) (1) até (1) procurando [M] [M]
meusblocos: espiar de {meusblocos: casa} direção (-1) (-2) até (1) procurando [M] [M]
meusblocos: espiar de {meusblocos: casa} direção (-1) (2) até (1) procurando [M] [M]
meusblocos: espiar de {meusblocos: casa} direção (1) (-2) até (1) procurando [M] [M]
meusblocos: espiar de {meusblocos: casa} direção (1) (2) até (1) procurando [M] [M]
meusblocos: espiar de {meusblocos: casa} direção (2) (-1) até (1) procurando [M] [M]
meusblocos: espiar de {meusblocos: casa} direção (2) (1) até (1) procurando [M] [M]
// casas vizinhas: Almofada
meusblocos: espiar de {meusblocos: casa} direção (-1) (0) até (1) procurando [A] [A]
meusblocos: espiar de {meusblocos: casa} direção (1) (0) até (1) procurando [A] [A]
meusblocos: espiar de {meusblocos: casa} direção (0) (-1) até (1) procurando [A] [A]
meusblocos: espiar de {meusblocos: casa} direção (0) (1) até (1) procurando [A] [A]
meusblocos: espiar de {meusblocos: casa} direção (-1) (-1) até (1) procurando [A] [A]
meusblocos: espiar de {meusblocos: casa} direção (-1) (1) até (1) procurando [A] [A]
meusblocos: espiar de {meusblocos: casa} direção (1) (-1) até (1) procurando [A] [A]
meusblocos: espiar de {meusblocos: casa} direção (1) (1) até (1) procurando [A] [A]
// Zés inimigos: eles atacam na diagonal da frente DELES
controle: se <operadores: {meusblocos: time} = [J]> então
  variaveis: mude [frente do inimigo ▾] para (-1)
senão
  variaveis: mude [frente do inimigo ▾] para (1)
meusblocos: espiar de {meusblocos: casa} direção {frente do inimigo} (-1) até (1) procurando [Z] [Z]
meusblocos: espiar de {meusblocos: casa} direção {frente do inimigo} (1) até (1) procurando [Z] [Z]
```

:::dica São 26 blocos espiar!
Monte um, clique com o botão direito nele e use **Duplicar**. Depois é só trocar os números e as letras. Os pulos da Mola e as vizinhas da Almofada são as mesmas tabelas dos passos da Mola e da Almofada.
:::

:::curiosidade Por que o Zé é "ao contrário"?
Um Zé do **Computador** anda pra baixo, então ele ataca as diagonais **de baixo** dele. Isso quer dizer que, olhando **da sua Almofada**, ele está numa diagonal **de cima** (linha − 1). Por isso, quando o time é `J`, a gente espia com -1.
:::

## 3. Anunciar o Suando Frio

Crie a variável `casa da almofada` e o bloco **`anunciar perigo no time (time)`** (sem atualização de tela). O truque é o bloco [[listas: item # de [CA] em [tabuleiro ▾]]], que diz **em qual casa** está um item da lista:

```blocos
meusblocos: defina anunciar perigo no time {meusblocos: time}
variaveis: mude [casa da almofada ▾] para {listas: item # de {operadores: junte {meusblocos: time} com [A]} em [tabuleiro ▾]}
meusblocos: verificar perigo na casa {casa da almofada} do time {meusblocos: time}
controle: se <operadores: {perigo} = [sim]> então
  eventos: transmita [suando frio ▾]
```

Agora é chamar o anúncio depois de cada jogada. Ele entra **dentro** do "se o jogo não acabou", logo antes de passar a vez:

- no clique: [[meusblocos: anunciar perigo no time [C]]] (você acabou de jogar, a Almofada em perigo pode ser a do computador);
- na vez do computador: [[meusblocos: anunciar perigo no time [J]]].

<details>
<summary><b>📋 Como o script do clique fica agora</b></summary>

```blocos
eventos: quando eu receber [clique ▾]
controle: se <operadores: {vez} = [jogador]> então
  controle: se <operadores: {operadores: letra (1) de {listas: item {casa clicada} de [tabuleiro ▾]}} = [J]> então
    variaveis: mude [origem ▾] para {casa clicada}
    meusblocos: calcular destinos de {origem}
  senão
    controle: se <operadores: <operadores: {origem} > (0)> e <listas: [destinos ▾] contém {casa clicada}?>> então
      variaveis: mude [vez ▾] para [computador]
      meusblocos: deslizar de {origem} para {casa clicada}
      variaveis: mude [origem ▾] para (0)
      listas: apague todos os itens de [destinos ▾]
      controle: se <operadores: não <operadores: {vez} = [fim]>> então
        meusblocos: anunciar perigo no time [C]
        eventos: transmita [vez do computador ▾]
    senão
      variaveis: mude [origem ▾] para (0)
      listas: apague todos os itens de [destinos ▾]
```

</details>

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
meusblocos: deslizar de {origem} para {listas: item {sorteio} de [todas as chegadas ▾]}
variaveis: mude [origem ▾] para (0)
listas: apague todos os itens de [destinos ▾]
controle: se <operadores: não <operadores: {vez} = [fim]>> então
  meusblocos: anunciar perigo no time [J]
  variaveis: mude [vez ▾] para [jogador]
  eventos: transmita [vez do jogador ▾]
```

</details>

E no **Narrador** (com a mesma esperinha do Estirão, pra fala não ser tampada pelo "Sua vez!"):

```blocos
eventos: quando eu receber [suando frio ▾]
controle: espere (0.1) seg
aparencia: diga [SUANDO FRIO! A Almofada tá em perigo!] por (2) segundos
```

## Teste!

Monte situações mudando a lista na mão (é bem mais rápido). Por exemplo: deixe a coluna 5 livre entre a Almofada do computador (casa 5) e uma Geladeira sua, e faça uma jogada qualquer. O Narrador grita "Suando Frio"? Teste com uma Sombra, uma Mola, um Zé e o Super-Bobo também.

Terminou? Clique na bandeira pra arrumar o tabuleiro e esconda a caixinha do `tabuleiro`.

:::missao Checklist
- [ ] Criei o bloco `espiar` (duplicando o `andar`)
- [ ] Criei o bloco `verificar perigo` com as 26 espiadas
- [ ] Criei o bloco `anunciar perigo`
- [ ] O Narrador avisa o Suando Frio dos dois times
- [ ] Testei o Suando Frio com cada tipo de Esquisito
- [ ] Salvei (e guardei uma cópia de segurança!)
:::
