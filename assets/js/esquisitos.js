/*
 * Esquisitos: desenhos (SVG) das peças e os componentes de tabuleiro
 * usados dentro dos textos dos passos.
 *
 *   <z-esquisito tipo="A" time="J"></z-esquisito>
 *   <z-elenco></z-elenco>
 *   <z-diagrama pecas="36:JG 20:CZ" mover="36" numeros></z-diagrama>
 *   <z-diagrama inicial codigos></z-diagrama>
 *   <z-coordenadas></z-coordenadas>
 *   <z-plano></z-plano>
 */
(function (raiz) {
  "use strict";

  var TINTA = "#2B2141";
  var OURO = "#FFC93C";
  var ROSA = "#FF6F91";

  var TIMES = {
    J: { cor: "#4D8DFF", escura: "#2F63D6", nome: "Jogador" },
    C: { cor: "#FF6B4A", escura: "#D4442A", nome: "Computador" }
  };

  // Cor "pessoal" de cada Esquisito quando aparece sem time
  var PESSOAIS = {
    Z: { cor: "#FFB547", escura: "#E08A12" },
    G: { cor: "#5CC8E8", escura: "#2C9CC0" },
    M: { cor: "#7ED957", escura: "#4DAF2A" },
    S: { cor: "#8C7AE6", escura: "#5E4BC4" },
    B: { cor: "#FF7AB6", escura: "#E0458C" },
    A: { cor: "#FF9F5A", escura: "#E57228" }
  };

  var ELENCO = [
    { tipo: "Z", nome: "Zé-Pequeno", xadrez: "Peão", anda: "Anda 1 casa pra frente (2 na primeira vez). Só captura na diagonal.", bio: "Pequeno, corajoso e com uma hélice que não serve pra nada." },
    { tipo: "G", nome: "Geladeira Voadora", xadrez: "Torre", anda: "Voa em linha reta: pra cima, pra baixo e pros lados, quantas casas quiser.", bio: "Ninguém sabe como ela voa. Nem ela." },
    { tipo: "M", nome: "Mola Maluca", xadrez: "Cavalo", anda: "Pula em L: 2 casas pra um lado e 1 pro outro. Salta por cima de todo mundo.", bio: "Boing. Boing. BOING." },
    { tipo: "S", nome: "Sombra", xadrez: "Bispo", anda: "Desliza na diagonal, quantas casas quiser.", bio: "Nunca pisa numa casa de outra cor. Coisa de sombra." },
    { tipo: "B", nome: "Super-Bobo", xadrez: "Dama", anda: "Anda reto ou na diagonal, quantas casas quiser.", bio: "O mais poderoso do tabuleiro. Pena que é bobo." },
    { tipo: "A", nome: "Grande Almofada", xadrez: "Rei", anda: "Anda 1 casa em qualquer direção. Se ficar encurralada, acabou!", bio: "Muito importante. Muito macia. Muito preguiçosa." }
  ];

  function traco(largura) {
    return 'stroke="' + TINTA + '" stroke-width="' + (largura || 3.5) + '" stroke-linejoin="round" stroke-linecap="round"';
  }

  function olho(x, y, r, px, py) {
    return '<circle cx="' + x + '" cy="' + y + '" r="' + r + '" fill="#fff" ' + traco() + "/>" +
      '<circle cx="' + (x + (px || 0)) + '" cy="' + (y + (py || 0)) + '" r="' + (r * 0.45).toFixed(1) + '" fill="' + TINTA + '"/>';
  }

  var DESENHOS = {
    Z: function (p) {
      return '<ellipse cx="40" cy="90" rx="8" ry="4" fill="' + TINTA + '"/>' +
        '<ellipse cx="60" cy="90" rx="8" ry="4" fill="' + TINTA + '"/>' +
        '<circle cx="50" cy="64" r="24" fill="' + p.cor + '" ' + traco() + "/>" +
        '<path d="M30 54 Q50 26 70 54 Q50 46 30 54 Z" fill="' + p.escura + '" ' + traco() + "/>" +
        '<path d="M50 36 V24" ' + traco() + "/>" +
        '<ellipse cx="40" cy="22" rx="10" ry="4" fill="' + OURO + '" ' + traco() + "/>" +
        '<ellipse cx="60" cy="22" rx="10" ry="4" fill="' + OURO + '" ' + traco() + "/>" +
        olho(42, 64, 7, 1, 1) + olho(58, 64, 7, 1, 1) +
        '<path d="M44 76 Q50 81 56 76" fill="none" ' + traco() + "/>";
    },
    G: function (p) {
      return '<path d="M30 40 Q8 28 5 48 Q16 45 18 55 Q24 48 30 53 Z" fill="#fff" ' + traco() + "/>" +
        '<path d="M70 40 Q92 28 95 48 Q84 45 82 55 Q76 48 70 53 Z" fill="#fff" ' + traco() + "/>" +
        '<path d="M41 86 Q45 99 49 86 Z" fill="' + OURO + '" ' + traco() + "/>" +
        '<path d="M51 86 Q55 99 59 86 Z" fill="' + OURO + '" ' + traco() + "/>" +
        '<rect x="29" y="12" width="42" height="74" rx="8" fill="' + p.cor + '" ' + traco() + "/>" +
        '<path d="M29 38 H71" ' + traco() + "/>" +
        '<rect x="61" y="20" width="4" height="11" rx="2" fill="' + TINTA + '"/>' +
        '<rect x="61" y="45" width="4" height="15" rx="2" fill="' + TINTA + '"/>' +
        '<circle cx="39" cy="25" r="4" fill="' + ROSA + '" ' + traco(2.5) + "/>" +
        olho(39, 57, 6, 1, 0) + olho(52, 57, 6, 1, 0) +
        '<path d="M38 71 Q45 77 53 71" fill="none" ' + traco() + "/>";
    },
    M: function (p) {
      var mola = "M36 88 L64 82 L36 76 L64 70 L36 64 L64 58";
      return '<ellipse cx="50" cy="91" rx="19" ry="5" fill="' + TINTA + '"/>' +
        '<path d="' + mola + '" fill="none" stroke="' + TINTA + '" stroke-width="10" stroke-linecap="round" stroke-linejoin="round"/>' +
        '<path d="' + mola + '" fill="none" stroke="' + p.cor + '" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round"/>' +
        '<path d="M50 17 q-7 -7 0 -11 q7 -3 4 5" fill="none" ' + traco() + "/>" +
        '<ellipse cx="50" cy="37" rx="23" ry="20" fill="' + p.cor + '" ' + traco() + ' transform="rotate(-8 50 37)"/>' +
        olho(40, 33, 9, 2, -3) + olho(60, 37, 5.5, -1, 2) +
        '<path d="M50 49 Q54 60 59 50 Z" fill="' + ROSA + '" ' + traco(2.5) + "/>" +
        '<path d="M40 47 Q50 53 61 45" fill="none" ' + traco() + "/>";
    },
    S: function (p) {
      return '<path d="M50 8 Q67 20 71 42 L75 86 Q67 79 61 88 Q55 79 50 88 Q45 79 39 88 Q33 79 25 86 L29 42 Q33 20 50 8 Z" fill="#3B3257" ' + traco() + "/>" +
        '<path d="M58 18 L47 32" stroke="' + p.cor + '" stroke-width="4" stroke-linecap="round"/>' +
        '<ellipse cx="42" cy="48" rx="5.5" ry="8" fill="' + p.cor + '"/>' +
        '<ellipse cx="58" cy="48" rx="5.5" ry="8" fill="' + p.cor + '"/>' +
        '<circle cx="43.5" cy="45" r="2" fill="#fff"/><circle cx="59.5" cy="45" r="2" fill="#fff"/>' +
        '<ellipse cx="50" cy="61" rx="3.5" ry="4.5" fill="' + p.cor + '"/>' +
        '<path d="M28 70 Q50 77 72 70" fill="none" stroke="' + p.cor + '" stroke-width="5" stroke-linecap="round"/>';
    },
    B: function (p) {
      return '<path d="M27 52 Q13 80 19 92 H81 Q87 80 73 52 Z" fill="' + p.escura + '" ' + traco() + "/>" +
        '<rect x="34" y="56" width="32" height="34" rx="12" fill="' + p.cor + '" ' + traco() + "/>" +
        '<path d="M50 64 l3 6 6 1 -4.5 4 1 6 -5.5 -3 -5.5 3 1 -6 -4.5 -4 6 -1 Z" fill="' + OURO + '" ' + traco(2) + "/>" +
        '<path d="M33 37 L25 13 L42 27 L50 6 L58 27 L75 13 L67 37 Z" fill="' + p.cor + '" ' + traco() + "/>" +
        '<circle cx="25" cy="13" r="4.5" fill="' + OURO + '" ' + traco(2.5) + "/>" +
        '<circle cx="50" cy="6" r="4.5" fill="' + OURO + '" ' + traco(2.5) + "/>" +
        '<circle cx="75" cy="13" r="4.5" fill="' + OURO + '" ' + traco(2.5) + "/>" +
        '<circle cx="50" cy="44" r="17" fill="#FFF4E6" ' + traco() + "/>" +
        '<path d="M39 36 Q43 33 47 36 M53 36 Q57 33 61 36" fill="none" ' + traco(2.5) + "/>" +
        '<circle cx="43" cy="42" r="2.8" fill="' + TINTA + '"/><circle cx="57" cy="42" r="2.8" fill="' + TINTA + '"/>' +
        '<circle cx="50" cy="48" r="5" fill="#FF4D6D" ' + traco(2.5) + "/>" +
        '<path d="M40 53 Q50 63 60 53" fill="none" ' + traco() + "/>";
    },
    A: function (p) {
      return '<path d="M33 31 L35 11 L44 21 L50 6 L56 21 L65 11 L67 31 Z" fill="' + OURO + '" ' + traco() + "/>" +
        '<circle cx="50" cy="21" r="3" fill="#FF4D6D"/>' +
        '<path d="M18 40 Q13 33 20 29 Q50 21 80 29 Q87 33 82 40 Q89 62 82 82 Q87 88 80 90 Q50 97 20 90 Q13 88 18 82 Q11 62 18 40 Z" fill="' + p.cor + '" ' + traco() + "/>" +
        '<path d="M25 38 Q50 32 75 38 Q80 60 75 82 Q50 88 25 82 Q20 60 25 38 Z" fill="none" stroke="' + p.escura + '" stroke-width="2.5" stroke-dasharray="4 4"/>' +
        '<circle cx="19" cy="30" r="4.5" fill="' + OURO + '" ' + traco(2.5) + "/>" +
        '<circle cx="81" cy="30" r="4.5" fill="' + OURO + '" ' + traco(2.5) + "/>" +
        '<circle cx="19" cy="89" r="4.5" fill="' + OURO + '" ' + traco(2.5) + "/>" +
        '<circle cx="81" cy="89" r="4.5" fill="' + OURO + '" ' + traco(2.5) + "/>" +
        '<path d="M34 56 Q40 62 46 56 M54 56 Q60 62 66 56" fill="none" ' + traco() + "/>" +
        '<circle cx="33" cy="66" r="4" fill="' + ROSA + '" opacity=".55"/><circle cx="67" cy="66" r="4" fill="' + ROSA + '" opacity=".55"/>' +
        '<path d="M44 68 Q50 73 56 68" fill="none" ' + traco() + "/>";
    }
  };

  /** SVG completo de um Esquisito. opts: { time: "J"|"C", tamanho, titulo } */
  function svg(tipo, opts) {
    opts = opts || {};
    var desenho = DESENHOS[tipo];
    if (!desenho) return "";
    var p = (opts.time && TIMES[opts.time]) || PESSOAIS[tipo];
    var t = opts.tamanho || 100;
    var titulo = opts.titulo ? "<title>" + opts.titulo + "</title>" : "";
    var acessivel = opts.titulo ? 'role="img"' : 'aria-hidden="true"';
    return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="' + t + '" height="' + t + '" ' + acessivel + ">" +
      titulo + desenho(p) + "</svg>";
  }

  function nomeDe(tipo) {
    for (var i = 0; i < ELENCO.length; i++) if (ELENCO[i].tipo === tipo) return ELENCO[i].nome;
    return "";
  }

  /* ---------- Regras (a mesma ideia que vamos montar no Scratch) ---------- */

  var INICIAL = ["CG", "CM", "CS", "CB", "CA", "CS", "CM", "CG"]
    .concat(repetir("CZ", 8), repetir("livre", 32), repetir("JZ", 8))
    .concat(["JG", "JM", "JS", "JB", "JA", "JS", "JM", "JG"]);

  function repetir(v, n) { var a = []; for (var i = 0; i < n; i++) a.push(v); return a; }
  function linhaDe(casa) { return Math.floor((casa - 1) / 8) + 1; }
  function colunaDe(casa) { return ((casa - 1) % 8) + 1; }
  function casaDe(l, c) { return (l - 1) * 8 + c; }

  var RETAS = [[-1, 0], [1, 0], [0, -1], [0, 1]];
  var DIAGONAIS = [[-1, -1], [-1, 1], [1, -1], [1, 1]];
  var PULOS = [[-2, -1], [-2, 1], [-1, -2], [-1, 2], [1, -2], [1, 2], [2, -1], [2, 1]];

  function destinos(tab, casa) {
    var peca = tab[casa - 1];
    if (!peca || peca === "livre") return [];
    var time = peca[0], tipo = peca[1], saida = [];

    function andar(dl, dc, max) {
      var l = linhaDe(casa), c = colunaDe(casa);
      for (var passos = 0; passos < max; passos++) {
        l += dl; c += dc;
        if (l < 1 || l > 8 || c < 1 || c > 8) return;
        var alvo = casaDe(l, c), quem = tab[alvo - 1];
        if (quem === "livre") { saida.push(alvo); continue; }
        if (quem[0] !== time) saida.push(alvo);
        return;
      }
    }
    function todas(dirs, max) { dirs.forEach(function (d) { andar(d[0], d[1], max); }); }

    if (tipo === "G") todas(RETAS, 7);
    if (tipo === "S") todas(DIAGONAIS, 7);
    if (tipo === "B") { todas(RETAS, 7); todas(DIAGONAIS, 7); }
    if (tipo === "A") { todas(RETAS, 1); todas(DIAGONAIS, 1); }
    if (tipo === "M") todas(PULOS, 1);
    if (tipo === "Z") {
      var frente = time === "J" ? -1 : 1, inicio = time === "J" ? 7 : 2;
      var l = linhaDe(casa), c = colunaDe(casa), l2 = l + frente;
      if (l2 >= 1 && l2 <= 8) {
        var um = casaDe(l2, c);
        if (tab[um - 1] === "livre") {
          saida.push(um);
          var dois = casaDe(l + 2 * frente, c);
          if (l === inicio && tab[dois - 1] === "livre") saida.push(dois);
        }
        [-1, 1].forEach(function (dc) {
          var c2 = c + dc;
          if (c2 < 1 || c2 > 8) return;
          var alvo = casaDe(l2, c2), quem = tab[alvo - 1];
          if (quem !== "livre" && quem[0] !== time) saida.push(alvo);
        });
      }
    }
    return saida;
  }

  var API = {
    svg: svg, nomeDe: nomeDe, ELENCO: ELENCO, TIMES: TIMES, PESSOAIS: PESSOAIS,
    INICIAL: INICIAL, destinos: destinos, linhaDe: linhaDe, colunaDe: colunaDe
  };

  if (typeof module !== "undefined" && module.exports) module.exports = API;
  if (!raiz || !raiz.customElements) return;
  raiz.Esquisitos = API;

  /* ---------------------------- Componentes ---------------------------- */

  function lista(attr) {
    return (attr || "").split(/[\s,]+/).filter(Boolean);
  }

  function definir(nome, render) {
    if (customElements.get(nome)) return;
    customElements.define(nome, class extends HTMLElement {
      connectedCallback() { if (!this._pronto) { this._pronto = true; render(this); } }
    });
  }

  definir("z-esquisito", function (el) {
    var tipo = el.getAttribute("tipo");
    el.innerHTML = svg(tipo, {
      time: el.getAttribute("time"),
      tamanho: el.getAttribute("tamanho") || 72,
      titulo: nomeDe(tipo)
    });
  });

  definir("z-elenco", function (el) {
    el.innerHTML = ELENCO.map(function (p) {
      return '<article class="elenco-card" style="--cor:' + PESSOAIS[p.tipo].cor + '">' +
        '<div class="elenco-foto">' + svg(p.tipo, { tamanho: 96 }) + "</div>" +
        '<div class="elenco-texto">' +
        '<h4>' + p.nome + '</h4>' +
        '<p class="elenco-xadrez">No xadrez: <b>' + p.xadrez + '</b> · letra <code>' + p.tipo + "</code></p>" +
        '<p class="elenco-anda">' + p.anda + "</p>" +
        '<p class="elenco-bio">“' + p.bio + "”</p>" +
        "</div></article>";
    }).join("");
  });

  definir("z-diagrama", function (el) {
    var tab = el.hasAttribute("inicial") ? INICIAL.slice() : repetir("livre", 64);
    lista(el.getAttribute("pecas")).forEach(function (par) {
      var partes = par.split(":");
      tab[Number(partes[0]) - 1] = partes[1];
    });
    var marcas = lista(el.getAttribute("marcar")).map(Number);
    var destaques = lista(el.getAttribute("destacar")).map(Number);
    var mover = Number(el.getAttribute("mover")) || 0;
    if (mover) {
      destaques.push(mover);
      marcas = marcas.concat(destinos(tab, mover));
    }
    var numeros = el.getAttribute("numeros");
    var comNumeros = el.hasAttribute("numeros");
    var codigos = el.hasAttribute("codigos");
    var rotulos = el.hasAttribute("rotulos");
    var html = '<div class="diag' + (numeros === "grande" ? " diag-grande" : "") + (rotulos ? " diag-rotulos" : "") + '">';
    if (rotulos) {
      html += '<div class="diag-canto"></div>';
      for (var k = 1; k <= 8; k++) html += '<div class="diag-rot diag-rot-col">col ' + k + "</div>";
    }
    for (var casa = 1; casa <= 64; casa++) {
      var l = linhaDe(casa), c = colunaDe(casa);
      if (rotulos && c === 1) html += '<div class="diag-rot diag-rot-lin">linha ' + l + "</div>";
      var peca = tab[casa - 1];
      var classes = ["diag-casa", (l + c) % 2 === 0 ? "clara" : "escura"];
      if (destaques.indexOf(casa) >= 0) classes.push("destaque");
      var marcada = marcas.indexOf(casa) >= 0;
      if (marcada) classes.push(peca === "livre" ? "ponto" : "captura");
      html += '<div class="' + classes.join(" ") + '">';
      if (peca !== "livre") {
        html += svg(peca[1], { time: peca[0], tamanho: "100%", titulo: nomeDe(peca[1]) + " (" + TIMES[peca[0]].nome + ")" });
        if (codigos) html += '<span class="diag-codigo">' + peca + "</span>";
      }
      if (comNumeros) html += '<span class="diag-num">' + casa + "</span>";
      html += "</div>";
    }
    html += "</div>";
    var legenda = el.getAttribute("legenda");
    if (legenda) html += '<p class="diag-legenda">' + legenda + "</p>";
    el.innerHTML = html;
  });

  definir("z-coordenadas", function (el) {
    var s = "";
    // palco 480x360 → desenhado com 1 unidade = 1 passo do Scratch
    s += '<svg viewBox="-260 -200 520 400" role="img" aria-label="O palco do Scratch com o tabuleiro à esquerda e o Narrador à direita">';
    s += '<rect x="-240" y="-180" width="480" height="360" rx="6" class="co-palco"/>';
    s += '<rect x="100" y="-180" width="140" height="360" class="co-lado"/>';
    s += '<text x="170" y="-150" class="co-txt co-centro">cantinho do</text><text x="170" y="-132" class="co-txt co-centro">Narrador</text>';
    for (var l = 1; l <= 8; l++) {
      for (var c = 1; c <= 8; c++) {
        var x = c * 40 - 240, y = 180 - l * 40;
        s += '<rect x="' + (x - 20) + '" y="' + (-y - 20) + '" width="40" height="40" class="' + ((l + c) % 2 ? "co-escura" : "co-clara") + '"/>';
      }
    }
    s += '<line x1="-250" y1="0" x2="250" y2="0" class="co-eixo"/><line x1="0" y1="-190" x2="0" y2="190" class="co-eixo"/>';
    s += '<text x="244" y="-6" class="co-txt co-fim">x</text><text x="6" y="-186" class="co-txt">y</text>';
    s += '<text x="-236" y="-6" class="co-txt">-240</text><text x="236" y="16" class="co-txt co-fim">240</text>';
    s += '<text x="6" y="-166" class="co-txt">180</text><text x="6" y="176" class="co-txt">-180</text>';
    [[-200, 140, "casa 1", "(-200, 140)"], [80, -140, "casa 64", "(80, -140)"]].forEach(function (p) {
      s += '<circle cx="' + p[0] + '" cy="' + (-p[1]) + '" r="6" class="co-ponto"/>';
      s += '<text x="' + (p[0] + (p[0] < 0 ? 10 : -10)) + '" y="' + (-p[1] + (p[1] > 0 ? 28 : -14)) + '" class="co-txt co-forte' + (p[0] < 0 ? "" : " co-fim") + '">' + p[2] + " " + p[3] + "</text>";
    });
    s += "</svg>";
    el.innerHTML = s;
  });

  definir("z-plano", function (el) {
    var caixas = [
      ["🧠", "Memória", "Uma <b>lista</b> com 64 itens guarda quem está em cada casa."],
      ["🪞", "Espelho", "<b>Clones</b> olham a lista e se vestem com a fantasia certa."],
      ["👆", "Cliques", "Você clica numa casa e o <b>Cérebro</b> recebe o recado."],
      ["📜", "Regras", "Blocos que descobrem pra onde cada Esquisito <b>pode</b> ir."],
      ["🎲", "Computador", "Faz a lista de jogadas possíveis e <b>sorteia</b> uma."]
    ];
    el.innerHTML = '<div class="plano">' + caixas.map(function (c, i) {
      return '<div class="plano-caixa"><span class="plano-emoji">' + c[0] + '</span><b class="plano-titulo">' + (i + 1) + ". " + c[1] + "</b><span>" + c[2] + "</span></div>";
    }).join('<span class="plano-seta" aria-hidden="true">➜</span>') + "</div>";
  });
})(typeof window !== "undefined" ? window : null);
