Este é o bloco **mais importante** do jogo inteiro. Ele vai ser usado por cinco Esquisitos, pelo computador e até pelas regras do nível chefão. Respire fundo, pegue um lanchinho e vamos lá. 🍪

## O que o bloco faz

A gente vai criar o bloco:

[[meusblocos: andar de ( ) direção ( ) ( ) até ( ) passos]]

Ele recebe **a casa de onde sai**, a **direção** (`dl` e `dc`) e o **máximo de passos**. Aí ele vai andando, casa por casa, e coloca na lista `destinos` todas as casas que valem, obedecendo as regras de parar.

## 1. Crie o bloco

No **Cérebro**: **Meus Blocos → Criar um Bloco**. Monte o nome com entradas e rótulos:

| O que clicar | O que escrever |
|---|---|
| (nome) | `andar de` |
| Adicionar uma entrada | `casa` |
| Adicionar um rótulo | `direção` |
| Adicionar uma entrada | `dl` |
| Adicionar uma entrada | `dc` |
| Adicionar um rótulo | `até` |
| Adicionar uma entrada | `máx` |
| Adicionar um rótulo | `passos` |

Marque **Executar sem atualização de tela** e clique em OK.

## 2. Crie as variáveis de trabalho

O bloco precisa de umas caixinhas pra fazer as contas. Crie no Cérebro: `meu time`, `l`, `c`, `passos`, `alvo` e `quem está lá`.

:::atencao Cada bloco com suas próprias variáveis
Mais pra frente vão existir outros blocos rodando um dentro do outro. Se dois blocos usarem a **mesma** variável pra coisas diferentes, um bagunça as contas do outro. Por isso essas variáveis são **só** do bloco andar. Não use o `l` ou o `passos` em outro lugar!
:::

## 3. O que acontece dentro

:::robo Em português de robô
1. Descobrir a linha (`l`) e a coluna (`c`) da casa de saída. *(Fórmula 2!)*
2. Zerar o contador de `passos`.
3. Repetir até `passos` chegar no `máx`:
   - Andar um passo: somar `dl` na linha e `dc` na coluna. Contar mais um passo.
   - Se saiu pela beirada de cima ou de baixo → **parar**.
   - Se saiu pela beirada da esquerda ou da direita → **parar**.
   - Calcular o número da casa `alvo`. *(Fórmula 1!)*
   - Ver `quem está lá`.
   - Se estiver `livre` → o alvo vale. Continua andando.
   - Senão (tem alguém):
     - Se a letra 1 de quem está lá **não** é `meu time` → é inimigo, o alvo vale.
     - Seja amigo ou inimigo → **parar**.
:::

E em blocos:

```blocos
meusblocos: defina andar de {meusblocos: casa} direção {meusblocos: dl} {meusblocos: dc} até {meusblocos: máx} passos
variaveis: mude [l ▾] para {operadores: {operadores: [arredondamento para baixo de ▾] de {operadores: {operadores: {meusblocos: casa} - (1)} / (8)}} + (1)}
variaveis: mude [c ▾] para {operadores: {operadores: resto de {operadores: {meusblocos: casa} - (1)} por (8)} + (1)}
variaveis: mude [passos ▾] para (0)
controle: repita até que <operadores: {passos} = {meusblocos: máx}>
  variaveis: adicione {meusblocos: dl} a [l ▾]
  variaveis: adicione {meusblocos: dc} a [c ▾]
  variaveis: adicione (1) a [passos ▾]
  controle: se <operadores: <operadores: {l} < (1)> ou <operadores: {l} > (8)>> então
    controle: pare [este script ▾] // saiu por cima ou por baixo
  controle: se <operadores: <operadores: {c} < (1)> ou <operadores: {c} > (8)>> então
    controle: pare [este script ▾] // saiu pelos lados
  variaveis: mude [alvo ▾] para {operadores: {operadores: {operadores: {l} - (1)} * (8)} + {c}}
  variaveis: mude [quem está lá ▾] para {listas: item {alvo} de [tabuleiro ▾]}
  controle: se <operadores: {quem está lá} = [livre]> então
    listas: adicione {alvo} a [destinos ▾]
  senão
    controle: se <operadores: não <operadores: {operadores: letra (1) de {quem está lá}} = {meu time}>> então
      listas: adicione {alvo} a [destinos ▾] // inimigo: captura!
    controle: pare [este script ▾]
```

:::curiosidade "Pare este script" dentro de um bloco inventado
Quando o [[controle: pare [este script ▾]]] está dentro de um bloco inventado, ele **não** para o jogo. Ele só termina aquele bloco e volta pra quem chamou. É como dizer "acabou essa direção, pode me pedir a próxima".
:::

## 4. Teste com uma tecla

Ainda não tem nenhum Esquisito usando esse bloco. Então vamos testar com um script temporário no Cérebro:

```blocos
eventos: quando a tecla [t ▾] for pressionada
listas: apague todos os itens de [destinos ▾]
variaveis: mude [meu time ▾] para [J]
meusblocos: andar de (36) direção (-1) (0) até (7) passos
```

Rode o jogo e aperte **t**. A casa 36 fica no meio do tabuleiro (linha 5, coluna 4). Andando pra cima, o bloco deve encontrar: 28 livre, 20 livre e… 12, onde tem um Zé-Pequeno do computador. Captura!

<z-diagrama inicial marcar="28 20 12" destacar="36" legenda="O resultado esperado: bolinhas em 28 e 20, e o CZ da casa 12 marcado para captura."></z-diagrama>

Agora brinque de trocar os números do teste:

- `direção (1) (0)` → pra baixo: 44 livre, depois 52 é seu amigo. Só **44**.
- `direção (-1) (1) até (7)` → diagonal: 29, 22, 15 (inimigo!).
- `até (1)` em vez de 7 → só uma casa em cada teste.
- Troque `meu time` para `C` → agora os inimigos são os seus Zés!

Deu tudo certo? **Parabéns**: o bloco mais difícil do capítulo está pronto. Pode apagar o script de teste. 🎉

:::missao Checklist
- [ ] Criei o bloco `andar de (casa) direção (dl) (dc) até (máx) passos`
- [ ] Criei as variáveis `meu time`, `l`, `c`, `passos`, `alvo` e `quem está lá`
- [ ] O teste da tecla **t** mostra bolinhas em 28 e 20 e marca o 12
- [ ] Testei outras direções e outros máximos
- [ ] Salvei (e baixei uma cópia!)
:::
