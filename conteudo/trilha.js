/*
 * ============================================================
 *  TRILHA DO ZADREX — o mapa de todos os passos
 * ============================================================
 *
 *  O progresso de quem usa o site vem do checklist de cada passo,
 *  salvo no navegador: algumas caixinhas marcadas → "fazendo",
 *  todas marcadas → "feito". Não precisa mexer em nada aqui pra isso.
 *
 *  O "status" abaixo é o progresso oficial da família. Ele vale pra
 *  todo mundo que abrir o site (e ganha das caixinhas se estiver mais
 *  adiantado):
 *
 *    "falta"   → ainda não começamos   (💤)
 *    "fazendo" → estamos nele agora    (🔨)
 *    "feito"   → terminado!            (✅)
 *
 *  nivel = dificuldade, de 1 a 3 pimentas 🌶️
 */

window.ZADREX = {
  capitulos: [
    {
      id: "boas-vindas",
      emoji: "🎬",
      titulo: "Bem-vindo ao Zadrex",
      passos: [
        { id: "o-que-e-o-zadrex", titulo: "O que é o Zadrex?", nivel: 1, status: "falta" },
        { id: "conheca-os-esquisitos", titulo: "Conheça os Esquisitos", nivel: 1, status: "falta" },
        { id: "o-plano-secreto", titulo: "O plano secreto", nivel: 1, status: "falta" }
      ]
    },
    {
      id: "terreno",
      emoji: "🏗️",
      titulo: "Preparando o terreno",
      passos: [
        { id: "criando-o-projeto", titulo: "Criando o projeto", nivel: 1, status: "falta" },
        { id: "o-palco", titulo: "O palco e o mapa do x e y", nivel: 1, status: "falta" },
        { id: "endereco-das-casas", titulo: "O endereço de cada casa", nivel: 2, status: "falta" },
        { id: "o-ator-casa", titulo: "O ator Casa", nivel: 1, status: "falta" },
        { id: "fabrica-de-clones", titulo: "A fábrica de clones", nivel: 2, status: "falta" }
      ]
    },
    {
      id: "esquisitos",
      emoji: "👾",
      titulo: "Os Esquisitos chegam",
      passos: [
        { id: "o-codigo-secreto", titulo: "O código secreto das peças", nivel: 1, status: "falta" },
        { id: "desenhando-os-esquisitos", titulo: "Desenhando os Esquisitos", nivel: 1, status: "falta" },
        { id: "a-memoria-do-jogo", titulo: "A memória do jogo", nivel: 2, status: "falta" },
        { id: "esquisitos-no-lugar", titulo: "Cada Esquisito no seu lugar", nivel: 2, status: "falta" }
      ]
    },
    {
      id: "clicar",
      emoji: "👆",
      titulo: "Clicar e mexer",
      passos: [
        { id: "quem-foi-clicado", titulo: "Quem foi clicado?", nivel: 1, status: "falta" },
        { id: "o-narrador", titulo: "O Narrador e a vez de jogar", nivel: 1, status: "falta" },
        { id: "escolhendo-um-esquisito", titulo: "Escolhendo um Esquisito", nivel: 2, status: "falta" },
        { id: "modo-bagunca", titulo: "Modo Bagunça", nivel: 2, status: "falta" }
      ]
    },
    {
      id: "regras",
      emoji: "📜",
      titulo: "As regras de cada Esquisito",
      passos: [
        { id: "a-grande-ideia", titulo: "A grande ideia: andar em linha reta", nivel: 2, status: "falta" },
        { id: "o-bloco-andar", titulo: "O bloco mágico \"andar\"", nivel: 3, status: "falta" },
        { id: "geladeira-voadora", titulo: "Geladeira Voadora", nivel: 2, status: "falta" },
        { id: "sombra", titulo: "Sombra", nivel: 1, status: "falta" },
        { id: "super-bobo", titulo: "Super-Bobo", nivel: 1, status: "falta" },
        { id: "grande-almofada", titulo: "Grande Almofada", nivel: 1, status: "falta" },
        { id: "mola-maluca", titulo: "Mola Maluca", nivel: 2, status: "falta" },
        { id: "ze-pequeno", titulo: "Zé-Pequeno", nivel: 3, status: "falta" },
        { id: "juntando-tudo", titulo: "Juntando tudo", nivel: 2, status: "falta" }
      ]
    },
    {
      id: "computador",
      emoji: "🤖",
      titulo: "O computador entra no jogo",
      passos: [
        { id: "passando-a-vez", titulo: "Passando a vez", nivel: 1, status: "falta" },
        { id: "a-lista-de-jogadas", titulo: "A lista de todas as jogadas", nivel: 3, status: "falta" },
        { id: "o-grande-sorteio", titulo: "O grande sorteio", nivel: 2, status: "falta" },
        { id: "primeira-partida", titulo: "Primeira partida de verdade!", nivel: 2, status: "falta" }
      ]
    },
    {
      id: "capricho",
      emoji: "✨",
      titulo: "Capricho",
      passos: [
        { id: "barulhos-esquisitos", titulo: "Barulhos esquisitos", nivel: 1, status: "falta" },
        { id: "pecas-que-deslizam", titulo: "Peças que deslizam", nivel: 2, status: "falta" },
        { id: "telas-de-inicio-e-fim", titulo: "Telas de início e de fim", nivel: 2, status: "falta" }
      ]
    },
    {
      id: "chefao",
      emoji: "👑",
      titulo: "Nível Chefão: regras especiais",
      passos: [
        { id: "ze-pequeno-cresceu", titulo: "O Estirão do Zé-Pequeno", nivel: 2, status: "falta" },
        { id: "suando-frio", titulo: "Suando Frio! A Almofada em perigo", nivel: 3, status: "falta" },
        { id: "proibido-trapalhada", titulo: "Proibido fazer trapalhada", nivel: 3, status: "falta" },
        { id: "almofada-amassada", titulo: "Almofada Amassada e Empate Sonolento", nivel: 2, status: "falta" },
        { id: "troca-troca", titulo: "O Troca-Troca", nivel: 3, status: "falta" },
        { id: "pega-no-pulo", titulo: "Pega no Pulo", nivel: 3, status: "falta" }
      ]
    },
    {
      id: "aventuras",
      emoji: "🚀",
      titulo: "Próximas aventuras",
      passos: [
        { id: "grande-estreia", titulo: "A grande estreia e o desafio da família", nivel: 1, status: "falta" },
        { id: "computador-guloso", titulo: "Computador guloso", nivel: 2, status: "falta" },
        { id: "quanto-vale-cada-um", titulo: "Quanto vale cada Esquisito?", nivel: 3, status: "falta" },
        { id: "ideias-malucas", titulo: "Ideias malucas", nivel: 1, status: "falta" }
      ]
    },
    {
      id: "consulta",
      emoji: "📚",
      titulo: "Consulta rápida",
      passos: [
        { id: "lista-de-nomes", titulo: "Lista de variáveis, listas e mensagens", nivel: 1, status: "falta" }
      ]
    }
  ]
};
