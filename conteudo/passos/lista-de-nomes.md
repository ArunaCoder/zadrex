Esta página é uma **cola**. Quando um passo falar de uma variável ou de uma mensagem e você não lembrar onde ela mora, olhe aqui. 📚

Os nomes precisam ser escritos **exatamente** assim: com os espaços, os acentos e as letras minúsculas.

## Variáveis e listas

Na coluna **Para quem**:

- **todos** → marque *Para todos os atores*. Outros atores leem essa variável.
- **este ator** → marque *Apenas para este ator*. Cada clone ganha a sua cópia (é o "crachá").
- **tanto faz** → só o Cérebro usa. Crie com o **Cérebro selecionado** e as duas opções funcionam. Na dúvida, deixe o padrão: *Para todos os atores*.

| Nome | O que é | Em qual ator criar | Para quem | Nasce no passo |
|---|---|---|---|---|
| `minha linha`, `minha coluna`, `minha casa`, `minha cor` | variáveis | Casa | este ator | [A fábrica de clones](#/fabrica-de-clones) |
| `minha linha`, `minha coluna`, `minha casa` | variáveis | Peça | este ator | [Cada Esquisito no seu lugar](#/esquisitos-no-lugar) (vêm com a cópia da fábrica) |
| `tabuleiro` | lista | Cérebro | todos | [A memória do jogo](#/a-memoria-do-jogo) |
| `casa clicada` | variável | Cérebro | todos | [Quem foi clicado?](#/quem-foi-clicado) |
| `vez` | variável | Cérebro | todos | [O Narrador e a vez de jogar](#/o-narrador) |
| `origem` | variável | Cérebro | todos | [Escolhendo um Esquisito](#/escolhendo-um-esquisito) |
| `capturado` | variável | Cérebro | todos | [Modo Bagunça](#/modo-bagunca) |
| `destinos` | lista | Cérebro | todos | [A grande ideia](#/a-grande-ideia) |
| `meu time`, `l`, `c`, `passos`, `alvo`, `quem está lá` | variáveis | Cérebro | tanto faz | [O bloco mágico "andar"](#/o-bloco-andar) |
| `peça` | variável | Cérebro | tanto faz | [Geladeira Voadora](#/geladeira-voadora) |
| `frente`, `linha de largada`, `zl`, `zc`, `z alvo`, `z quem` | variáveis | Cérebro | tanto faz | [Zé-Pequeno](#/ze-pequeno) |
| `todas as saídas`, `todas as chegadas` | listas | Cérebro | tanto faz | [A lista de todas as jogadas](#/a-lista-de-jogadas) |
| `i`, `k` | variáveis | Cérebro | tanto faz | [A lista de todas as jogadas](#/a-lista-de-jogadas) |
| `sorteio` | variável | Cérebro | tanto faz | [O grande sorteio](#/o-grande-sorteio) |
| `voo saída`, `voo chegada` | variáveis | Cérebro | todos | [Peças que deslizam](#/pecas-que-deslizam) |
| `vx`, `vy` | variáveis | Voador | este ator | [Peças que deslizam](#/pecas-que-deslizam) |
| `tabuleiro montado` | variável | Cérebro | tanto faz | [Telas de início e de fim](#/telas-de-inicio-e-fim) |
| `peça movida` | variável | Cérebro | tanto faz | [O Estirão do Zé-Pequeno](#/ze-pequeno-cresceu) |
| `perigo`, `time amigo`, `el`, `ec`, `epassos`, `ealvo`, `equem`, `frente do inimigo`, `casa da almofada` | variáveis | Cérebro | tanto faz | [Suando Frio!](#/suando-frio) |
| `destinos seguros` | lista | Cérebro | tanto faz | [Proibido fazer trapalhada](#/proibido-trapalhada) |
| `f`, `f chegada`, `f guardado` | variáveis | Cérebro | tanto faz | [Proibido fazer trapalhada](#/proibido-trapalhada) |
| `casas que mexeram` | lista | Cérebro | tanto faz | [O Troca-Troca](#/troca-troca) |
| `tt` | variável | Cérebro | tanto faz | [O Troca-Troca](#/troca-troca) |
| `casa do pulo` | variável | Cérebro | tanto faz | [Pega no Pulo](#/pega-no-pulo) |
| `capturas saídas`, `capturas chegadas` | listas | Cérebro | tanto faz | [Computador guloso](#/computador-guloso) |
| `j`, `sorteio saída`, `sorteio chegada` | variáveis | Cérebro | tanto faz | [Computador guloso](#/computador-guloso) |
| `valor`, `melhor nota` | variáveis | Cérebro | tanto faz | [Quanto vale cada Esquisito?](#/quanto-vale-cada-um) |
| `melhores saídas`, `melhores chegadas` | listas | Cérebro | tanto faz | [Quanto vale cada Esquisito?](#/quanto-vale-cada-um) |

:::dica Criei no ator errado!
Uma variável "para todos os atores" funciona em qualquer ator, então tudo bem. Já uma "apenas para este ator" criada no ator errado não funciona: apague (botão direito nela, na categoria Variáveis) e crie de novo no ator certo.
:::

## Mensagens

Pra criar uma mensagem nova, abra o menu de um bloco [[eventos: transmita [mensagem 1 ▾]]] e escolha **Nova mensagem**.

| Mensagem | Quem transmite | Quem recebe | Nasce no passo |
|---|---|---|---|
| `montar tabuleiro` | Cérebro (transmita e espere) | Casa e Peça | [A memória do jogo](#/a-memoria-do-jogo) |
| `clique` | clones da Casa e da Peça | Cérebro | [Quem foi clicado?](#/quem-foi-clicado) |
| `boas-vindas` | Cérebro (transmita e espere) | Narrador | [O Narrador e a vez de jogar](#/o-narrador) |
| `vez do jogador` | Cérebro | Narrador | [O Narrador e a vez de jogar](#/o-narrador) |
| `vez do computador` | Cérebro (no script do clique) | Cérebro (o computador joga) e Narrador | [Passando a vez](#/passando-a-vez) |
| `computador sem jogadas` | Cérebro (vez do computador) | Narrador e Placa | [O grande sorteio](#/o-grande-sorteio) · sai em [Almofada Amassada](#/almofada-amassada), onde vira `empate` |
| `jogador venceu`, `computador venceu` | Cérebro (no `mover`; depois, no `verificar situação`) | Narrador e Placa | [Primeira partida de verdade!](#/primeira-partida) |
| `voar` | Cérebro (no `deslizar`, transmita e espere) | Voador | [Peças que deslizam](#/pecas-que-deslizam) |
| `pousou` | Cérebro (no `deslizar`) | Voador | [Peças que deslizam](#/pecas-que-deslizam) |
| `começar` | Botão Jogar e Placa | Cérebro e Narrador | [Telas de início e de fim](#/telas-de-inicio-e-fim) |
| `zé cresceu` | Cérebro (no `mover`) | Narrador | [O Estirão do Zé-Pequeno](#/ze-pequeno-cresceu) |
| `suando frio` | Cérebro (no `anunciar perigo`; depois, no `verificar situação`) | Narrador | [Suando Frio!](#/suando-frio) |
| `empate` | Cérebro (no `verificar situação`) | Narrador e Placa | [Almofada Amassada](#/almofada-amassada) |
| `troca-troca` | Cérebro (no `mover`) | Narrador (no desafio) | [O Troca-Troca](#/troca-troca) |

## Meus Blocos

Quase todos os blocos inventados fazem contas, e ficam bem mais rápidos com **Executar sem atualização de tela**. Os dois de animação **não podem** ter essa opção, senão a animação some.

| Bloco | Ator | Sem atualização de tela? | Nasce no passo |
|---|---|---|---|
| `arrumar os esquisitos` | Cérebro | ✅ sim | [A memória do jogo](#/a-memoria-do-jogo) |
| `mover de (saída) para (chegada)` | Cérebro | ✅ sim | [Modo Bagunça](#/modo-bagunca) |
| `andar de (casa) direção (dl) (dc) até (máx) passos` | Cérebro | ✅ sim | [O bloco mágico "andar"](#/o-bloco-andar) |
| `movimentos da geladeira (casa)` | Cérebro | ✅ sim | [Geladeira Voadora](#/geladeira-voadora) |
| `calcular destinos de (casa)` | Cérebro | ✅ sim | [Geladeira Voadora](#/geladeira-voadora) |
| `movimentos da sombra (casa)` | Cérebro | ✅ sim | [Sombra](#/sombra) |
| `movimentos da almofada (casa)` | Cérebro | ✅ sim | [Grande Almofada](#/grande-almofada) |
| `movimentos da mola (casa)` | Cérebro | ✅ sim | [Mola Maluca](#/mola-maluca) |
| `movimentos do zé (casa)` | Cérebro | ✅ sim | [Zé-Pequeno](#/ze-pequeno) |
| `listar jogadas do time (time)` | Cérebro | ✅ sim | [A lista de todas as jogadas](#/a-lista-de-jogadas) |
| `calcular posição da casa (casa)` | Voador | tanto faz | [Peças que deslizam](#/pecas-que-deslizam) |
| `deslizar de (saída) para (chegada)` | Cérebro | ❌ **não!** | [Peças que deslizam](#/pecas-que-deslizam) |
| `aparecer` | Placa | ❌ **não!** | [Telas de início e de fim](#/telas-de-inicio-e-fim) |
| `espiar de (casa) direção (dl) (dc) até (máx) procurando (tipo 1) (tipo 2)` | Cérebro | ✅ sim | [Suando Frio!](#/suando-frio) |
| `verificar perigo na casa (casa) do time (time)` | Cérebro | ✅ sim | [Suando Frio!](#/suando-frio) |
| `anunciar perigo no time (time)` | Cérebro | ✅ sim | [Suando Frio!](#/suando-frio) · sai em [Almofada Amassada](#/almofada-amassada) |
| `filtrar destinos de (casa)` | Cérebro | ✅ sim | [Proibido fazer trapalhada](#/proibido-trapalhada) |
| `verificar situação do time (time)` | Cérebro | ✅ sim | [Almofada Amassada](#/almofada-amassada) |
| `troca-trocas da almofada (casa)` | Cérebro | ✅ sim | [O Troca-Troca](#/troca-troca) |
| `separar capturas` | Cérebro | ✅ sim | [Computador guloso](#/computador-guloso) · sai em [Quanto vale](#/quanto-vale-cada-um) |
| `valor de (código)` | Cérebro | ✅ sim | [Quanto vale cada Esquisito?](#/quanto-vale-cada-um) |
| `escolher melhores jogadas` | Cérebro | ✅ sim | [Quanto vale cada Esquisito?](#/quanto-vale-cada-um) |

:::dica Esqueci de marcar!
Clique com o botão direito no bloco `defina` e escolha **Editar**. A caixinha "Executar sem atualização de tela" aparece lá embaixo.
:::

## Outros nomes exatos

| Onde | Nomes |
|---|---|
| Fantasias da Casa | `clara`, `escura`, `escolhida`, `clara-ponto`, `escura-ponto` |
| Fantasias da Peça (e do Voador) | `livre`, `JZ`, `JG`, `JM`, `JS`, `JB`, `JA`, `CZ`, `CG`, `CM`, `CS`, `CB`, `CA` |
| Fantasias da Placa | `vitória`, `derrota`, `empate` |
| Cenários do Palco | `jogo`, `tela inicial` |
| Sons do Cérebro | `passo`, `captura Z`, `captura G`, `captura M`, `captura S`, `captura B`, `captura A` |
| Sons do Narrador | `vitória`, `derrota` |
| Atores | Casa, Peça, Cérebro, Narrador, Voador, Botão Jogar, Placa |

:::missao Checklist
- [ ] Sei que esta página existe e onde ela fica
- [ ] Sei achar o nome exato de uma variável, lista ou mensagem aqui
:::
