Agora o segundo clique: **pra onde** o Esquisito vai. Só que, antes de ensinar as regras de cada um, a gente vai fazer uma coisa proibidíssima: deixar **qualquer Esquisito ir pra qualquer lugar**. Bem-vindo ao **Modo Bagunça**. 🌪️

Por que isso? Porque assim a gente testa a parte de **mover** separada da parte das **regras**. Se algo der errado, fica mais fácil descobrir onde.

## 1. O bloco mover

Mover um Esquisito é só mexer na lista. Pra ir da casa 58 pra casa 43:

1. Copiar o item 58 para o item 43.
2. Escrever `livre` no item 58.

:::atencao A ordem importa (muito)
Se você fizer o passo 2 antes do passo 1, a casa 58 vira `livre`… e depois você copia `livre` pra casa 43. O Esquisito **evapora**. 💨
:::

Vamos criar um bloco inventado pra isso. No **Cérebro**, vá em **Meus Blocos → Criar um Bloco** e monte assim:

1. Escreva `mover de`.
2. Clique em **Adicionar uma entrada** (numérica ou texto) e chame de `saída`.
3. Clique em **Adicionar um rótulo** e escreva `para`.
4. Adicione outra entrada e chame de `chegada`.
5. Marque **Executar sem atualização de tela** e clique em OK.

Crie também a variável `capturado` (para todos os atores). Ela vai guardar quem estava na casa de chegada — assim, depois, a gente sabe se alguém foi capturado.

```blocos
meusblocos: defina mover de {meusblocos: saída} para {meusblocos: chegada}
variaveis: mude [capturado ▾] para {listas: item {meusblocos: chegada} de [tabuleiro ▾]}
listas: substitua o item {meusblocos: chegada} de [tabuleiro ▾] por {listas: item {meusblocos: saída} de [tabuleiro ▾]}
listas: substitua o item {meusblocos: saída} de [tabuleiro ▾] por [livre]
```

:::dica Como pegar o "saída" e o "chegada"
As entradas aparecem como bolinhas rosa dentro do bloco [[meusblocos: defina mover de {meusblocos: saída} para {meusblocos: chegada}]]. É só **arrastar** a bolinha de lá pra onde você precisa. Ela vira uma cópia.
:::

## 2. O segundo clique

Agora aumente o script do clique no Cérebro. Se o clique **não** foi num Esquisito seu, e **já tem** uma origem escolhida, então é hora de mover:

```blocos
eventos: quando eu receber [clique ▾]
controle: se <operadores: {vez} = [jogador]> então
  controle: se <operadores: {operadores: letra (1) de {listas: item {casa clicada} de [tabuleiro ▾]}} = [J]> então
    variaveis: mude [origem ▾] para {casa clicada}
  senão
    controle: se <operadores: {origem} > (0)> então
      meusblocos: mover de {origem} para {casa clicada}
      variaveis: mude [origem ▾] para (0)
```

## Teste! (e bagunce)

Clique na bandeira. Escolha um Esquisito e clique em qualquer outra casa:

- Numa casa vazia → ele **vai** pra lá. 🎉
- Em cima de um Esquisito do computador → ele **captura**! O inimigo some.
- Leve uma Geladeira pra lá e pra cá, faça a Almofada atravessar o tabuleiro, capture o Super-Bobo do computador com um Zé-Pequeno. Hoje pode tudo.

:::curiosidade Por que não dá pra capturar os seus próprios Esquisitos?
Olha o script de novo: se você clica numa casa com `J`, o Cérebro acha que você quer **trocar** a escolha. Sem querer, a gente já criou a primeira regra do xadrez: ninguém captura o próprio time!
:::

O computador ainda não joga, e os Esquisitos ainda não têm regras. Mas o jogo já **mexe**. Guarde bem o bloco `mover`: ele vai trabalhar até o último passo.

:::missao Checklist
- [ ] Criei o bloco `mover de (saída) para (chegada)`
- [ ] Criei a variável `capturado`
- [ ] Consigo mover um Esquisito para uma casa vazia
- [ ] Consigo capturar um Esquisito do computador
- [ ] Bagunçei bastante o tabuleiro 😄
- [ ] Salvei (e guardei uma cópia de segurança!)
:::
