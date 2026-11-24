O **Troca-Troca** é a única jogada do Zadrex em que **dois Esquisitos se mexem ao mesmo tempo**. A Almofada e uma Geladeira trocam de lado: a Almofada anda duas casas pro lado, e a Geladeira pula por cima dela e para do outro lado. É o jeito de guardar a Almofada num cantinho protegido.

<z-diagrama pecas="61:JA 64:JG 57:JG" destacar="61" marcar="59 63" legenda="A Almofada pode ir pra 63 (Troca-Troca pequeno) ou pra 59 (Troca-Troca grande)."></z-diagrama>

## Antes e depois

| Troca-Troca | Almofada | Geladeira |
|---|---|---|
| Pequeno, do Jogador | 61 → **63** | 64 → **62** |
| Grande, do Jogador | 61 → **59** | 57 → **60** |
| Pequeno, do Computador | 5 → **7** | 8 → **6** |
| Grande, do Computador | 5 → **3** | 1 → **4** |

Repare: a Geladeira do lado **pequeno** está 3 casas depois da Almofada, e a do lado **grande** está 4 casas antes. Isso vale pros dois times!

## As 5 condições

O Troca-Troca só pode acontecer se **tudo** isso for verdade:

1. A Almofada **nunca** se mexeu.
2. Aquela Geladeira **nunca** se mexeu.
3. As casas **entre** elas estão todas livres.
4. A Almofada **não está** suando frio.
5. A Almofada **não passa** por uma casa atacada e **não termina** numa casa atacada.

## 1. Quem já se mexeu?

Como saber se alguém "nunca se mexeu"? No **Cérebro**, crie a lista `casas que mexeram`. No bloco `mover`, adicione a saída **e** a chegada de toda jogada, logo **antes dos sons**:

```blocos
listas: adicione {meusblocos: saída} a [casas que mexeram ▾]
listas: adicione {meusblocos: chegada} a [casas que mexeram ▾]
```

E no `arrumar os esquisitos`, apague a lista logo no começo, embaixo do [[listas: apague todos os itens de [tabuleiro ▾]]]:

[[listas: apague todos os itens de [casas que mexeram ▾]]]

:::curiosidade Por que guardar a chegada também?
Se alguém **capturar** a sua Geladeira na casa 64 e depois sair dali, a casa 64 vai estar vazia… e depois até pode aparecer outra Geladeira lá! Mas como a 64 entrou na lista quando o inimigo **chegou**, o jogo sabe que aquele canto não vale mais pro Troca-Troca.
:::

## 2. O bloco troca-trocas

No **Cérebro**, crie a variável `tt` e o bloco **`troca-trocas da almofada (casa)`**, sem atualização de tela. Como as distâncias são iguais pros dois times, o mesmo bloco serve pra todo mundo:

```blocos
meusblocos: defina troca-trocas da almofada {meusblocos: casa}
controle: se <operadores: <listas: [casas que mexeram ▾] contém {meusblocos: casa}?> ou <operadores: não <operadores: <operadores: {meusblocos: casa} = (61)> ou <operadores: {meusblocos: casa} = (5)>>>> então
  controle: pare [este script ▾] // já se mexeu ou não está em casa
meusblocos: verificar perigo na casa {meusblocos: casa} do time {meu time}
controle: se <operadores: {perigo} = [sim]> então
  controle: pare [este script ▾] // suando frio não pode
// TROCA-TROCA PEQUENO: Geladeira 3 casas depois
variaveis: mude [tt ▾] para [sim]
controle: se <operadores: <operadores: não <operadores: {listas: item {operadores: {meusblocos: casa} + ??(3)} de [tabuleiro ▾]} = {operadores: junte {meu time} com [G]}>> ou <listas: [casas que mexeram ▾] contém {operadores: {meusblocos: casa} + (3)}?>> então
  variaveis: mude [tt ▾] para [não]
controle: se <operadores: não <operadores: <operadores: {listas: item {operadores: {meusblocos: casa} + (1)} de [tabuleiro ▾]} = [livre]> e <operadores: {listas: item {operadores: {meusblocos: casa} + (2)} de [tabuleiro ▾]} = [livre]>>> então
  variaveis: mude [tt ▾] para [não]
controle: se <operadores: {tt} = [sim]> então
  meusblocos: verificar perigo na casa {operadores: {meusblocos: casa} + (1)} do time {meu time}
  controle: se <operadores: {perigo} = [sim]> então
    variaveis: mude [tt ▾] para [não]
controle: se <operadores: {tt} = [sim]> então
  meusblocos: verificar perigo na casa {operadores: {meusblocos: casa} + (2)} do time {meu time}
  controle: se <operadores: {perigo} = [não]> então
    listas: adicione {operadores: {meusblocos: casa} + (2)} a [destinos ▾]
// TROCA-TROCA GRANDE: Geladeira 4 casas antes
variaveis: mude [tt ▾] para [sim]
controle: se <operadores: <operadores: não <operadores: {listas: item {operadores: {meusblocos: casa} - (4)} de [tabuleiro ▾]} = {operadores: junte {meu time} com [G]}>> ou <listas: [casas que mexeram ▾] contém {operadores: {meusblocos: casa} - (4)}?>> então
  variaveis: mude [tt ▾] para [não]
controle: se <operadores: não <operadores: <operadores: <operadores: {listas: item {operadores: {meusblocos: casa} - (1)} de [tabuleiro ▾]} = [livre]> e <operadores: {listas: item {operadores: {meusblocos: casa} - (2)} de [tabuleiro ▾]} = [livre]>> e <operadores: {listas: item {operadores: {meusblocos: casa} - (3)} de [tabuleiro ▾]} = [livre]>>> então
  variaveis: mude [tt ▾] para [não]
controle: se <operadores: {tt} = [sim]> então
  meusblocos: verificar perigo na casa {operadores: {meusblocos: casa} - (1)} do time {meu time}
  controle: se <operadores: {perigo} = [sim]> então
    variaveis: mude [tt ▾] para [não]
controle: se <operadores: {tt} = [sim]> então
  meusblocos: verificar perigo na casa {operadores: {meusblocos: casa} - (2)} do time {meu time}
  controle: se <operadores: {perigo} = [não]> então
    listas: adicione {operadores: {meusblocos: casa} - (2)} a [destinos ▾]
```

:::robo Troca-Troca grande, em português de robô
- `tt` começa `sim`.
- Se a casa − 4 não tem a Geladeira do meu time, ou ela já mexeu → `não`.
- Se as casas − 1, − 2 **ou** − 3 não estão livres → `não`.
- Se ainda `sim`, verifico perigo na casa − 1. Se tiver → `não`.
- Se ainda `sim`, verifico perigo na casa − 2. Se **não** tiver → adiciono casa − 2 nos destinos.

(A casa − 3 precisa estar livre, mas não precisa estar segura: a Almofada não passa por ela, só a Geladeira.)
:::

:::dica Duplicar ajuda de novo
A parte grande é a parte pequena com outros números. Clique com o botão direito no `mude tt para sim` da parte pequena, escolha **Duplicar** e encaixe a cópia no fim. Depois troque `+ 3` por `- 4`, `+ 1` por `- 1`, `+ 2` por `- 2`, e acrescente a casa `- 3` no "se" das casas livres.
:::

No `calcular destinos`, no "se" da Almofada, chame o Troca-Troca logo depois dos movimentos normais:

```blocos
controle: se <operadores: {operadores: letra (2) de {peça}} = [A]> então
  meusblocos: movimentos da almofada {meusblocos: casa}
  meusblocos: troca-trocas da almofada {meusblocos: casa}
```

<details>
<summary><b>📋 Como o bloco <code>calcular destinos</code> fica agora</b></summary>

```blocos
meusblocos: defina calcular destinos de {meusblocos: casa}
listas: apague todos os itens de [destinos ▾]
variaveis: mude [peça ▾] para {listas: item {meusblocos: casa} de [tabuleiro ▾]}
variaveis: mude [meu time ▾] para {operadores: letra (1) de {peça}}
controle: se <operadores: {operadores: letra (2) de {peça}} = [G]> então
  meusblocos: movimentos da geladeira {meusblocos: casa}
controle: se <operadores: {operadores: letra (2) de {peça}} = [S]> então
  meusblocos: movimentos da sombra {meusblocos: casa}
controle: se <operadores: {operadores: letra (2) de {peça}} = [B]> então
  meusblocos: movimentos da geladeira {meusblocos: casa}
  meusblocos: movimentos da sombra {meusblocos: casa}
controle: se <operadores: {operadores: letra (2) de {peça}} = [A]> então
  meusblocos: movimentos da almofada {meusblocos: casa}
  ?? meusblocos: troca-trocas da almofada {meusblocos: casa}
controle: se <operadores: {operadores: letra (2) de {peça}} = [M]> então
  meusblocos: movimentos da mola {meusblocos: casa}
controle: se <operadores: {operadores: letra (2) de {peça}} = [Z]> então
  meusblocos: movimentos do zé {meusblocos: casa}
meusblocos: filtrar destinos de {meusblocos: casa}
```

</details>

## 3. A Geladeira pula junto

No bloco `mover`, se quem andou foi uma Almofada e ela andou **2 casas**, a Geladeira precisa pular também. Encaixe isto **depois do Estirão do Zé** (ele precisa da `peça movida`, que já foi mudada lá em cima) e antes das `casas que mexeram`:

```blocos
controle: se <operadores: <operadores: {operadores: letra (2) de {peça movida}} = [A]> e <operadores: {operadores: [módulo ▾] de {operadores: {meusblocos: chegada} - {meusblocos: saída}}} = (2)>> então
  controle: se <operadores: {meusblocos: chegada} > {meusblocos: saída}> então
    listas: substitua o item {operadores: {meusblocos: saída} + (1)} de [tabuleiro ▾] por {listas: item {operadores: {meusblocos: saída} + (3)} de [tabuleiro ▾]}
    ?? listas: substitua o item {operadores: {meusblocos: saída} + (3)} de [tabuleiro ▾] por [livre]
  senão
    listas: substitua o item {operadores: {meusblocos: saída} - (1)} de [tabuleiro ▾] por {listas: item {operadores: {meusblocos: saída} - (4)} de [tabuleiro ▾]}
    listas: substitua o item {operadores: {meusblocos: saída} - (4)} de [tabuleiro ▾] por [livre]
  eventos: transmita [troca-troca ▾]
```

:::dica "Módulo" é o tamanho sem sinal
O bloco [[operadores: [módulo ▾] de (-2)]] dá **2**. Assim tanto faz se a Almofada andou 2 casas pra direita (+2) ou pra esquerda (−2).
:::

<details>
<summary><b>📋 Como o bloco <code>mover</code> fica agora</b></summary>

```blocos
meusblocos: defina mover de {meusblocos: saída} para {meusblocos: chegada}
variaveis: mude [capturado ▾] para {listas: item {meusblocos: chegada} de [tabuleiro ▾]}
listas: substitua o item {meusblocos: chegada} de [tabuleiro ▾] por {listas: item {meusblocos: saída} de [tabuleiro ▾]}
listas: substitua o item {meusblocos: saída} de [tabuleiro ▾] por [livre]
variaveis: mude [peça movida ▾] para {listas: item {meusblocos: chegada} de [tabuleiro ▾]}
// Estirão do Zé
controle: se <operadores: {operadores: letra (2) de {peça movida}} = [Z]> então
  controle: se <operadores: <operadores: <operadores: {operadores: letra (1) de {peça movida}} = [J]> e <operadores: {meusblocos: chegada} < (9)>> ou <operadores: <operadores: {operadores: letra (1) de {peça movida}} = [C]> e <operadores: {meusblocos: chegada} > (56)>>> então
    listas: substitua o item {meusblocos: chegada} de [tabuleiro ▾] por {operadores: junte {operadores: letra (1) de {peça movida}} com [B]}
    eventos: transmita [zé cresceu ▾]
// Troca-Troca: a Geladeira pula junto
controle: se <operadores: <operadores: {operadores: letra (2) de {peça movida}} = [A]> e <operadores: {operadores: [módulo ▾] de {operadores: {meusblocos: chegada} - {meusblocos: saída}}} = (2)>> então
  controle: se <operadores: {meusblocos: chegada} > {meusblocos: saída}> então
    listas: substitua o item {operadores: {meusblocos: saída} + (1)} de [tabuleiro ▾] por {listas: item {operadores: {meusblocos: saída} + (3)} de [tabuleiro ▾]}
    listas: substitua o item {operadores: {meusblocos: saída} + (3)} de [tabuleiro ▾] por [livre]
  senão
    listas: substitua o item {operadores: {meusblocos: saída} - (1)} de [tabuleiro ▾] por {listas: item {operadores: {meusblocos: saída} - (4)} de [tabuleiro ▾]}
    listas: substitua o item {operadores: {meusblocos: saída} - (4)} de [tabuleiro ▾] por [livre]
  eventos: transmita [troca-troca ▾]
// quem já se mexeu
?? listas: adicione {meusblocos: saída} a [casas que mexeram ▾]
listas: adicione {meusblocos: chegada} a [casas que mexeram ▾]
// sons
controle: se <operadores: {capturado} = [livre]> então
  som: toque o som [passo ▾]
senão
  som: toque o som {operadores: junte [captura ] com {operadores: letra (2) de {capturado}}}
```

</details>

## Teste!

Tire da frente a Mola, a Sombra (e, pro Troca-Troca grande, o Super-Bobo) mudando a lista na mão, na sua vez: pro pequeno, `livre` nos itens 62 e 63; pro grande, nos itens 58, 59 e 60. Clique na Almofada: aparecem as bolinhas do Troca-Troca? Faça o Troca-Troca e veja a Geladeira pular. Depois teste os casos proibidos:

- Mexa a Almofada e volte pra casa: a bolinha do Troca-Troca sumiu pra sempre? ✅
- Coloque uma Sombra inimiga atacando a casa 62: o Troca-Troca pequeno some? ✅
- Deixe a Almofada suando frio: nenhum Troca-Troca aparece? ✅

Depois dos testes, clique na bandeira pra arrumar o tabuleiro e esconda a caixinha do `tabuleiro`.

:::desafio
Faça o Narrador gritar "TROCA-TROCA!" quando receber a mensagem `troca-troca` e toque um som de mola. E, se quiser caprichar, faça a Geladeira também deslizar (hoje ela se teletransporta).
:::

:::missao Checklist
- [ ] Criei a lista `casas que mexeram` e o `mover` preenche ela
- [ ] Criei o bloco `troca-trocas da almofada` com os lados pequeno e grande
- [ ] A Geladeira pula junto no `mover`
- [ ] Testei os Troca-Trocas dos dois lados
- [ ] Testei os casos proibidos
- [ ] Salvei (e guardei uma cópia de segurança!)
:::
