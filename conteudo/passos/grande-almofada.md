<z-esquisito tipo="A" tamanho="110"></z-esquisito>

A **Grande Almofada** é a peça mais importante do jogo. Se ela cair, o time perde. Justamente por isso, ela é bem… preguiçosa. Anda **uma casinha só**, mas pode ir em **qualquer uma das 8 direções**.

<z-diagrama pecas="36:JA 27:JZ 29:CM" mover="36" legenda="8 direções, só 1 passo. Nada de amigo por cima, mas pode capturar."></z-diagrama>

## O bloco da Almofada

Lembra da grande ideia? A Almofada é igualzinha ao Super-Bobo, só que com **até 1** passo em vez de até 7.

No **Cérebro**, crie o bloco **`movimentos da almofada (casa)`** (entrada `casa`, sem atualização de tela) com as 8 direções da tabela, todas **até 1 passo**:

```blocos
meusblocos: defina movimentos da almofada {meusblocos: casa}
meusblocos: andar de {meusblocos: casa} direção (-1) (0) até ??(1) passos
meusblocos: andar de {meusblocos: casa} direção (1) (0) até (1) passos
meusblocos: andar de {meusblocos: casa} direção (0) (-1) até (1) passos
meusblocos: andar de {meusblocos: casa} direção (0) (1) até (1) passos
meusblocos: andar de {meusblocos: casa} direção (-1) (-1) até (1) passos
meusblocos: andar de {meusblocos: casa} direção (-1) (1) até (1) passos
meusblocos: andar de {meusblocos: casa} direção (1) (-1) até (1) passos
meusblocos: andar de {meusblocos: casa} direção (1) (1) até (1) passos
```

E no fim do `calcular destinos de (casa)`:

```blocos
controle: se <operadores: {operadores: letra (2) de {peça}} = [A]> então
  meusblocos: movimentos da almofada {meusblocos: casa}
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
controle: se <operadores: {operadores: letra (2) de {peça}} = ??[A]> então
  meusblocos: movimentos da almofada {meusblocos: casa}
```

</details>

## Teste!

No começo do jogo a Almofada está cercada de amigos: nenhuma bolinha. Abra espaço com o Modo Bagunça e confira se aparecem bolinhas **só nas casas vizinhas**.

:::atencao A Almofada ainda não tem medo de nada
Nas regras completas do Zadrex, a Almofada **não pode** andar pra uma casa onde seria capturada. Por enquanto, a nossa pode — ela é corajosa demais (ou preguiçosa demais pra pensar). No capítulo **Nível Chefão** a gente ensina ela a ter medo. 😱
:::

:::desafio Desafio do programador preguiçoso
Oito blocos `andar` quase iguais… não parece repetição demais? Tente adicionar uma entrada `máx` nos blocos `movimentos da geladeira` e `movimentos da sombra`. Aí a Almofada vira só *geladeira até 1* + *sombra até 1*, e o Super-Bobo vira *geladeira até 7* + *sombra até 7*!
:::

:::missao Checklist
- [ ] Criei o bloco `movimentos da almofada (casa)` com 8 direções até 1 passo
- [ ] Adicionei a Almofada no `calcular destinos`
- [ ] As bolinhas aparecem só nas casas vizinhas
- [ ] Salvei
:::
