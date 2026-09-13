/*
 * ============================================================
 *  TRILHA DO ZADREX — o mapa de todos os passos
 * ============================================================
 *
 *  Para marcar o progresso, mude o "status" de cada passo:
 *
 *    "falta"   → ainda não começamos   (💤)
 *    "fazendo" → estamos nele agora    (🔨)
 *    "feito"   → terminado!            (✅)
 *
 *  Diário de bordo ("O que a gente fez"):
 *    crie o arquivo  conteudo/diario/<id-do-passo>.md
 *    (ele só é carregado quando o status é "fazendo" ou "feito").
 *
 *  Vídeo / GIF ("Olha só como ficou"):
 *    coloque o arquivo na pasta midia/ e adicione em "midia", por exemplo:
 *      midia: ["midia/fabrica-de-clones.gif"]
 *      midia: ["midia/primeira-partida.mp4"]
 *      midia: ["https://youtu.be/xxxxxxxxxxx"]
 *      midia: [{ src: "midia/sorteio.gif", legenda: "O computador jogando!" }]
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
        { id: "o-que-e-o-zadrex", titulo: "O que é o Zadrex?", nivel: 1, status: "falta", midia: [] },
        { id: "conheca-os-esquisitos", titulo: "Conheça os Esquisitos", nivel: 1, status: "falta", midia: [] },
        { id: "o-plano-secreto", titulo: "O plano secreto", nivel: 1, status: "falta", midia: [] }
      ]
    },
    {
      id: "terreno",
      emoji: "🏗️",
      titulo: "Preparando o terreno",
      passos: [
        { id: "criando-o-projeto", titulo: "Criando o projeto", nivel: 1, status: "falta", midia: [] },
        { id: "o-palco", titulo: "O palco e o mapa do x e y", nivel: 1, status: "falta", midia: [] },
        { id: "endereco-das-casas", titulo: "O endereço de cada casa", nivel: 2, status: "falta", midia: [] },
        { id: "o-ator-casa", titulo: "O ator Casa", nivel: 1, status: "falta", midia: [] },
        { id: "fabrica-de-clones", titulo: "A fábrica de clones", nivel: 2, status: "falta", midia: [] }
      ]
    },
    {
      id: "esquisitos",
      emoji: "👾",
      titulo: "Os Esquisitos chegam",
      passos: [
        { id: "o-codigo-secreto", titulo: "O código secreto das peças", nivel: 1, status: "falta", midia: [] },
        { id: "desenhando-os-esquisitos", titulo: "Desenhando os Esquisitos", nivel: 1, status: "falta", midia: [] },
        { id: "a-memoria-do-jogo", titulo: "A memória do jogo", nivel: 2, status: "falta", midia: [] },
        { id: "esquisitos-no-lugar", titulo: "Cada Esquisito no seu lugar", nivel: 2, status: "falta", midia: [] }
      ]
    },
    {
      id: "clicar",
      emoji: "👆",
      titulo: "Clicar e mexer",
      passos: [
        { id: "quem-foi-clicado", titulo: "Quem foi clicado?", nivel: 1, status: "falta", midia: [] },
        { id: "o-narrador", titulo: "O Narrador e a vez de jogar", nivel: 1, status: "falta", midia: [] },
        { id: "escolhendo-um-esquisito", titulo: "Escolhendo um Esquisito", nivel: 2, status: "falta", midia: [] },
        { id: "modo-bagunca", titulo: "Modo Bagunça", nivel: 2, status: "falta", midia: [] }
      ]
    },
    {
      id: "regras",
      emoji: "📜",
      titulo: "As regras de cada Esquisito",
      passos: [
        { id: "a-grande-ideia", titulo: "A grande ideia: andar em linha reta", nivel: 2, status: "falta", midia: [] },
        { id: "o-bloco-andar", titulo: "O bloco mágico \"andar\"", nivel: 3, status: "falta", midia: [] },
        { id: "geladeira-voadora", titulo: "Geladeira Voadora", nivel: 2, status: "falta", midia: [] },
        { id: "sombra", titulo: "Sombra", nivel: 1, status: "falta", midia: [] },
        { id: "super-bobo", titulo: "Super-Bobo", nivel: 1, status: "falta", midia: [] },
        { id: "grande-almofada", titulo: "Grande Almofada", nivel: 1, status: "falta", midia: [] },
        { id: "mola-maluca", titulo: "Mola Maluca", nivel: 2, status: "falta", midia: [] },
        { id: "ze-pequeno", titulo: "Zé-Pequeno", nivel: 3, status: "falta", midia: [] },
        { id: "juntando-tudo", titulo: "Juntando tudo", nivel: 2, status: "falta", midia: [] }
      ]
    },
    {
      id: "computador",
      emoji: "🤖",
      titulo: "O computador entra no jogo",
      passos: [
        { id: "passando-a-vez", titulo: "Passando a vez", nivel: 1, status: "falta", midia: [] },
        { id: "a-lista-de-jogadas", titulo: "A lista de todas as jogadas", nivel: 3, status: "falta", midia: [] },
        { id: "o-grande-sorteio", titulo: "O grande sorteio", nivel: 2, status: "falta", midia: [] },
        { id: "primeira-partida", titulo: "Primeira partida de verdade!", nivel: 2, status: "falta", midia: [] }
      ]
    },
    {
      id: "capricho",
      emoji: "✨",
      titulo: "Capricho",
      passos: [
        { id: "barulhos-esquisitos", titulo: "Barulhos esquisitos", nivel: 1, status: "falta", midia: [] },
        { id: "pecas-que-deslizam", titulo: "Peças que deslizam", nivel: 2, status: "falta", midia: [] },
        { id: "telas-de-inicio-e-fim", titulo: "Telas de início e de fim", nivel: 2, status: "falta", midia: [] }
      ]
    },
    {
      id: "chefao",
      emoji: "👑",
      titulo: "Nível Chefão: regras especiais",
      passos: [
        { id: "ze-pequeno-cresceu", titulo: "Zé-Pequeno cresceu! (promoção)", nivel: 2, status: "falta", midia: [] },
        { id: "xeque", titulo: "Xeque! A Almofada em perigo", nivel: 3, status: "falta", midia: [] },
        { id: "proibido-trapalhada", titulo: "Proibido fazer trapalhada", nivel: 3, status: "falta", midia: [] },
        { id: "xeque-mate-e-empate", titulo: "Xeque-mate e empate", nivel: 2, status: "falta", midia: [] },
        { id: "roque", titulo: "Roque: o troca-troca", nivel: 3, status: "falta", midia: [] },
        { id: "en-passant", titulo: "En passant: pega no pulo", nivel: 3, status: "falta", midia: [] }
      ]
    },
    {
      id: "aventuras",
      emoji: "🚀",
      titulo: "Próximas aventuras",
      passos: [
        { id: "grande-estreia", titulo: "A grande estreia e o desafio da família", nivel: 1, status: "falta", midia: [] },
        { id: "computador-guloso", titulo: "Computador guloso", nivel: 2, status: "falta", midia: [] },
        { id: "quanto-vale-cada-um", titulo: "Quanto vale cada Esquisito?", nivel: 3, status: "falta", midia: [] },
        { id: "ideias-malucas", titulo: "Ideias malucas", nivel: 1, status: "falta", midia: [] }
      ]
    }
  ]
};
