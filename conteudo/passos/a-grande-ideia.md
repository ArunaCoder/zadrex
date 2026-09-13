Chegou o capítulo das regras! Parece que vai ser difícil — seis Esquisitos, cada um andando de um jeito. Mas existe um **segredo** que deixa tudo muito mais simples.

## O segredo: todo mundo anda em linha reta

Olhe de novo como os Esquisitos se mexem e repare numa coisa:

- A **Geladeira** anda em linha reta, em 4 direções, até 7 casas.
- A **Sombra** anda em linha reta (na diagonal), em 4 direções, até 7 casas.
- O **Super-Bobo** anda em linha reta, em 8 direções, até 7 casas.
- A **Almofada** anda em linha reta, em 8 direções, até… **1** casa.
- A **Mola** dá um "passo gigante torto" em 8 direções, só **1** vez.

Viu? Eles são todos iguais! A única diferença é **quais direções** e **quantos passos**. Então, em vez de programar seis Esquisitos, a gente programa **um jeito de andar** e depois só escolhe as direções de cada um. 🤯

(E o Zé-Pequeno? Ele é do contra. Vai ganhar um passo só dele.)

## Uma direção são dois números

Pra dizer uma direção pro Scratch, a gente usa dois números:

- `dl` — quanto a **linha** muda a cada passo.
- `dc` — quanto a **coluna** muda a cada passo.

Lembra que a linha 1 fica **em cima**? Então subir é diminuir a linha.

| Direção | `dl` | `dc` |
|---|---|---|
| ⬆️ Cima | -1 | 0 |
| ⬇️ Baixo | 1 | 0 |
| ⬅️ Esquerda | 0 | -1 |
| ➡️ Direita | 0 | 1 |
| ↖️ Diagonal cima-esquerda | -1 | -1 |
| ↗️ Diagonal cima-direita | -1 | 1 |
| ↙️ Diagonal baixo-esquerda | 1 | -1 |
| ↘️ Diagonal baixo-direita | 1 | 1 |

Por que no máximo **7** passos? Porque de uma ponta à outra do tabuleiro, numa linha reta, cabem no máximo 7 passos.

## As regras de parar

Andando numa direção, um Esquisito para quando:

1. **Chega na beirada** do tabuleiro (linha ou coluna menor que 1 ou maior que 8).
2. **Encontra um amigo:** a casa do amigo **não** vale, e para antes dele.
3. **Encontra um inimigo:** a casa do inimigo **vale** (é captura!), mas para ali.
4. **Já andou o máximo** de passos.

<z-diagrama pecas="36:JG 20:JZ 40:CS 60:CM" mover="36" legenda="Pra cima para antes do amigo. Pra direita e pra baixo captura o inimigo. Pra esquerda vai até a beirada."></z-diagrama>

## A lista destinos

Todas as casas pra onde o Esquisito escolhido pode ir vão ser guardadas numa lista nova. No **Cérebro**, crie a lista `destinos` (para todos os atores).

## Bolinhas no tabuleiro

Pra você ver os destinos, a Casa vai mostrar uma **bolinha**. Dê ao ator **Casa** mais duas fantasias:

- `clara-ponto` — a casa clara com uma bolinha no meio
- `escura-ponto` — a casa escura com uma bolinha no meio

:::dica Faça a bolinha com moldura
Quando o destino tem um inimigo, o Esquisito fica **em cima** da bolinha e esconde ela. Por isso desenhe também uma **moldura colorida** na beirada do quadrado: assim dá pra ver que aquele inimigo pode ser capturado.
:::

<p>
<a class="botao botao-contorno" href="recursos/casas/clara-ponto.svg" download>⬇️ clara-ponto.svg</a>
<a class="botao botao-contorno" href="recursos/casas/escura-ponto.svg" download>⬇️ escura-ponto.svg</a>
</p>

Agora os clones da Casa vigiam **duas** coisas: se são a origem, ou se estão na lista de destinos. Troque o [[controle: sempre]] do clone da Casa:

```blocos
eventos: quando eu começar como um clone
aparencia: mostre
aparencia: vá para a camada [de trás ▾]
controle: sempre
  controle: se <operadores: {origem} = {minha casa}> então
    aparencia: mude para a fantasia [escolhida ▾]
  senão
    controle: se <listas: [destinos ▾] contém {minha casa}?> então
      aparencia: mude para a fantasia {operadores: junte {minha cor} com [-ponto]}
    senão
      aparencia: mude para a fantasia {minha cor}
```

:::curiosidade O truque do "junte"
Uma casa clara com bolinha precisa da fantasia `clara-ponto`. Uma escura, de `escura-ponto`. Em vez de perguntar a cor, a gente **junta** `minha cor` com `-ponto` e o nome da fantasia sai certinho nos dois casos.
:::

## Teste sem regras

Mostre a lista `destinos` no palco, rode o jogo e **digite uns números** na lista (clique no **+** da caixinha): 20, 28, 36. Bolinhas apareceram nessas casas? Então o tabuleiro já sabe mostrar destinos. Agora falta calcular eles de verdade.

:::missao Checklist
- [ ] Entendi que todos os Esquisitos (menos o Zé) andam em linha reta
- [ ] Sei o `dl` e o `dc` de pelo menos 4 direções
- [ ] Criei a lista `destinos`
- [ ] A Casa tem as fantasias `clara-ponto` e `escura-ponto`
- [ ] As bolinhas aparecem quando coloco números na lista
- [ ] Salvei
:::
