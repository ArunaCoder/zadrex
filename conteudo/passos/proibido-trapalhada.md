Agora o jogo sabe quando uma Almofada está em perigo. Só que ainda deixa você fazer **trapalhadas**: andar com a Almofada pra uma casa perigosa, ou ignorar um Suando Frio. No Zadrex completo isso é **proibido**. Nenhuma jogada pode deixar a sua própria Almofada em perigo.

## As três trapalhadas proibidas

**1. Almofada suicida.** A Almofada não pode andar pra uma casa atacada.

<z-diagrama pecas="60:JA 43:CG" destacar="60" marcar="52 53 61" legenda="A Geladeira vigia a coluna 3: as casas 51 e 59 ficaram proibidas."></z-diagrama>

**2. Ignorar o Suando Frio.** Se a sua Almofada está suando frio, a sua jogada **tem** que resolver isso: fugir, bloquear o ataque ou capturar quem está atacando.

**3. Abandonar o posto.** Às vezes um Esquisito está bem na frente da Almofada, protegendo ela de um ataque. Se ele sair dali, a Almofada fica exposta. No Zadrex, a gente diz que ele virou **chiclete**: tá grudado ali.

<z-diagrama pecas="61:JA 45:JM 13:CG" destacar="45" legenda="A Mola virou chiclete: se ela pular, a Geladeira captura a Almofada."></z-diagrama>

## O truque: jogada de mentirinha 🤞

Como saber se uma jogada é trapalhada? A gente **testa de mentirinha**:

1. Faz a jogada na lista.
2. Pergunta: "a minha Almofada está em perigo agora?"
3. **Desfaz** a jogada, deixando tudo como estava.
4. Se não tinha perigo, a jogada é segura.

Isso tudo acontece dentro de um bloco que roda **sem atualizar a tela**, então ninguém vê as jogadas de mentirinha acontecendo. É como pensar com a cabeça antes de mexer a mão.

## 1. O bloco filtrar

Crie a lista `destinos seguros`, as variáveis `f`, `f chegada` e `f guardado`, e o bloco **`filtrar destinos de (casa)`** — sem atualização de tela:

```blocos
meusblocos: defina filtrar destinos de {meusblocos: casa}
listas: apague todos os itens de [destinos seguros ▾]
variaveis: mude [f ▾] para (1)
controle: repita {listas: tamanho de [destinos ▾]} vezes
  variaveis: mude [f chegada ▾] para {listas: item {f} de [destinos ▾]}
  // 1) jogada de mentirinha
  variaveis: mude [f guardado ▾] para {listas: item {f chegada} de [tabuleiro ▾]}
  listas: substitua o item {f chegada} de [tabuleiro ▾] por {listas: item {meusblocos: casa} de [tabuleiro ▾]}
  listas: substitua o item {meusblocos: casa} de [tabuleiro ▾] por [livre]
  // 2) a minha Almofada ficou em perigo?
  meusblocos: verificar perigo na casa {listas: item # de {operadores: junte {meu time} com [A]} em [tabuleiro ▾]} do time {meu time}
  // 3) desfaz tudo
  listas: substitua o item {meusblocos: casa} de [tabuleiro ▾] por {listas: item {f chegada} de [tabuleiro ▾]}
  listas: substitua o item {f chegada} de [tabuleiro ▾] por {f guardado}
  // 4) sem perigo? é segura!
  controle: se <operadores: {perigo} = [não]> então
    listas: adicione {f chegada} a [destinos seguros ▾]
  variaveis: adicione (1) a [f ▾]
// troca os destinos pelos seguros
listas: apague todos os itens de [destinos ▾]
variaveis: mude [f ▾] para (1)
controle: repita {listas: tamanho de [destinos seguros ▾]} vezes
  listas: adicione {listas: item {f} de [destinos seguros ▾]} a [destinos ▾]
  variaveis: adicione (1) a [f ▾]
```

:::atencao A ordem do "desfaz"
Pra desfazer, primeiro devolva o Esquisito pra casa de saída (pegando ele da chegada), e **só depois** coloque de volta quem estava na chegada (o `f guardado`). Se inverter, o Esquisito some e aparece um clone do capturado. Trapalhada ao quadrado!
:::

:::dica E se a Almofada for quem está andando?
Não tem problema nenhum! Por isso a gente procura a Almofada com [[listas: item # de [JA] em [tabuleiro ▾]]] **depois** da jogada de mentirinha: se ela andou, o bloco acha ela na casa nova.
:::

## 2. Ligue no calcular destinos

No **fim** do bloco `calcular destinos de (casa)`, depois de todos os "se", adicione:

[[meusblocos: filtrar destinos de {meusblocos: casa}]]

Pronto! Como tanto o seu clique quanto a lista de jogadas do computador usam o `calcular destinos`, **os dois times** passam a obedecer a regra de uma vez só.

## Teste!

- Deixe uma Geladeira inimiga vigiando uma coluna do lado da sua Almofada: as bolinhas da Almofada somem daquela coluna? ✅
- Deixe a sua Almofada suando frio (mudando a lista): só aparecem bolinhas nas jogadas que salvam ela? ✅
- Monte uma Mola-chiclete: ela fica sem bolinha nenhuma? ✅
- Jogue uma partida normal: o computador nunca mais faz trapalhada? ✅

:::atencao O jogo ficou lento?
Agora o computador faz **muitas** jogadas de mentirinha antes de sortear. Se ficar lento, confira se **todos** os blocos inventados estão com "executar sem atualização de tela". E dá pra ligar o **Modo Turbo** no menu Editar.
:::

:::missao Checklist
- [ ] Criei a lista `destinos seguros` e o bloco `filtrar destinos`
- [ ] O `calcular destinos` chama o filtro no final
- [ ] A Almofada não anda mais pra casas atacadas
- [ ] Com a Almofada suando frio, só aparecem jogadas que salvam a Almofada
- [ ] Esquisitos-chiclete não podem sair
- [ ] Salvei (e guardei uma cópia de segurança!)
:::
