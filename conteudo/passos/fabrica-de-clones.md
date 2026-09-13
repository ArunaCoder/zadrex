Agora vem uma das partes mais legais: fazer o Scratch **construir o tabuleiro sozinho**. A gente não vai arrastar 64 quadradinhos. Vamos montar uma fábrica que faz isso em menos de um segundo.

## A ideia

O ator Casa original vai ficar **escondido** e vai trabalhar como uma fábrica:

1. Vai pra posição da casa 1, veste a fantasia certa e cria um clone.
2. Vai pra posição da casa 2, veste a fantasia certa e cria um clone.
3. … e assim até a casa 64.

Cada clone nasce **igualzinho** ao original no momento em que foi criado: mesma posição, mesma fantasia. Por isso, depois de criado, ele fica paradinho no lugar certo.

## As variáveis "crachá"

Cada clone precisa lembrar **qual é a sua casa**. Para isso, crie estas variáveis no ator Casa (categoria **Variáveis → Criar uma Variável**) marcando a opção **Apenas para este ator**:

- `minha linha`
- `minha coluna`
- `minha casa`
- `minha cor`

:::atencao Apenas para este ator!
Isso é muito importante. Uma variável "apenas para este ator" funciona como um **crachá**: cada clone ganha a sua própria cópia, com o seu próprio valor. Se você criar como "para todos os atores", os 64 clones vão dividir o mesmo crachá — e ninguém vai saber onde mora.
:::

## Dois "repita", um dentro do outro

Pra passar por todas as casas, a gente usa um [[controle: repita (8) vezes]] (as linhas) com **outro** [[controle: repita (8) vezes]] dentro (as colunas). Oito vezes oito: 64 casas!

:::robo A fábrica, em português de robô
1. Esconder a fábrica.
2. Linha começa em 1.
3. Repetir 8 vezes:
   - Coluna começa em 1.
   - Repetir 8 vezes:
     - Calcular o número da casa (Fórmula 1).
     - Ir para o x e y da casa (Fórmula 3).
     - Se linha + coluna for par, a cor é `clara`, senão é `escura`.
     - Vestir a fantasia da cor.
     - Criar um clone.
     - Coluna aumenta 1.
   - Linha aumenta 1.
:::

Aqui vai uma ajuda de como fica em blocos. Tente montar olhando pra ela — e tente entender cada pedaço, principalmente as fórmulas do passo anterior aparecendo ali dentro:

```blocos
eventos: quando ⚑ for clicado
aparencia: esconda
variaveis: mude [minha linha ▾] para (1)
controle: repita (8) vezes
  variaveis: mude [minha coluna ▾] para (1)
  controle: repita (8) vezes
    variaveis: mude [minha casa ▾] para {operadores: {operadores: {operadores: {minha linha} - (1)} * (8)} + {minha coluna}}
    movimento: vá para x: {operadores: {operadores: {minha coluna} * (40)} - (240)} y: {operadores: (180) - {operadores: {minha linha} * (40)}}
    controle: se <operadores: {operadores: resto de {operadores: {minha linha} + {minha coluna}} por (2)} = (0)> então
      variaveis: mude [minha cor ▾] para [clara]
    senão
      variaveis: mude [minha cor ▾] para [escura]
    aparencia: mude para a fantasia {minha cor}
    controle: crie clone de [este ator ▾]
    variaveis: adicione (1) a [minha coluna ▾]
  variaveis: adicione (1) a [minha linha ▾]

eventos: quando eu começar como um clone
aparencia: mostre
aparencia: vá para a camada [de trás ▾]
```

:::dica Por que o clone precisa do "mostre"?
A fábrica está escondida. Como o clone nasce igualzinho a ela… ele também nasce escondido! Por isso o primeiro trabalho de todo clone é se mostrar. E ele vai pra camada de trás porque os Esquisitos vão ficar **em cima** das casas.
:::

## Teste!

Clique na bandeira verde. O tabuleiro apareceu? 🎉

- **Tem frestinha entre as casas?** Aumente um pouco o **Tamanho** do ator Casa (embaixo do palco).
- **As casas estão umas por cima das outras?** Diminua o Tamanho.
- **Apareceu tudo numa casa só?** Confira se a fórmula do "vá para" usa `minha coluna` no x e `minha linha` no y.
- **O tabuleiro ficou listrado em vez de quadriculado?** Confira o "resto de (linha + coluna) por 2".

:::curiosidade
Toda vez que você clica na bandeira verde, o Scratch **apaga todos os clones antigos** automaticamente. Por isso não aparecem 128, 192, 256 casas…
:::

:::desafio
Quer conferir se cada clone recebeu o crachá certo? Faça o clone **dizer** o número da casa dele: adicione [[aparencia: diga {minha casa}]] no script do clone e veja o tabuleiro inteiro falando! Depois tire, senão fica uma bagunça.
:::

:::missao Checklist
- [ ] Criei as 4 variáveis "apenas para este ator"
- [ ] Montei a fábrica com dois "repita" um dentro do outro
- [ ] O tabuleiro aparece quadriculado quando clico na bandeira
- [ ] Não tem frestinha entre as casas
- [ ] Salvei (e guardei uma cópia de segurança!)
:::
