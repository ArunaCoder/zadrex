/*
 * Zadrex — a página da trilha.
 * Lê conteudo/trilha.js, monta a árvore da esquerda e mostra cada passo.
 */
(function () {
  "use strict";

  var DADOS = window.ZADREX;
  var STATUS = {
    feito: { icone: "✅", rotulo: "Feito!" },
    fazendo: { icone: "🔨", rotulo: "Fazendo agora" },
    falta: { icone: "💤", rotulo: "Ainda não" }
  };
  var CAIXAS = {
    dica: { icone: "💡", titulo: "Dica" },
    atencao: { icone: "⚠️", titulo: "Cuidado!" },
    desafio: { icone: "🏆", titulo: "Desafio extra" },
    robo: { icone: "🤖", titulo: "Em português de robô" },
    missao: { icone: "🎯", titulo: "Checklist" },
    curiosidade: { icone: "🧐", titulo: "Você sabia?" },
    adulto: { icone: "🧑‍🏫", titulo: "Para o adulto" }
  };

  /* ------------------------------ Dados ------------------------------ */

  var passos = [];
  DADOS.capitulos.forEach(function (cap, ci) {
    cap.numero = ci;
    cap.passos.forEach(function (p, pi) {
      p.status = STATUS[p.status] ? p.status : "falta";
      p.capitulo = cap;
      p.numero = ci + "." + (pi + 1);
      p.indice = passos.length;
      p.midia = p.midia || [];
      passos.push(p);
    });
  });

  var porId = {};
  passos.forEach(function (p) { porId[p.id] = p; });

  function contar(lista) {
    var c = { feito: 0, fazendo: 0, falta: 0, total: lista.length };
    lista.forEach(function (p) { c[p.status]++; });
    return c;
  }

  function passoAtual() {
    for (var i = 0; i < passos.length; i++) if (passos[i].status === "fazendo") return passos[i];
    for (var j = 0; j < passos.length; j++) if (passos[j].status !== "feito") return passos[j];
    return null;
  }

  /* ----------------------------- Markdown ----------------------------- */

  var md = new marked.Marked({ gfm: true });
  md.use({
    extensions: [
      {
        name: "caixa",
        level: "block",
        start: function (src) {
          var m = /^:::/m.exec(src);
          return m ? m.index : undefined;
        },
        tokenizer: function (src) {
          var m = /^:::([a-z]+)[ \t]*([^\n]*)\n([\s\S]*?)\n:::[ \t]*(?:\n+|$)/.exec(src);
          if (!m) return;
          var token = { type: "caixa", raw: m[0], tipo: m[1], tokens: [], tituloTokens: [] };
          if (m[2]) token.tituloTokens = this.lexer.inlineTokens(m[2]);
          this.lexer.blockTokens(m[3], token.tokens);
          return token;
        },
        renderer: function (token) {
          var info = CAIXAS[token.tipo] || { icone: "📌", titulo: token.tipo };
          var titulo = token.tituloTokens.length ? this.parser.parseInline(token.tituloTokens) : info.titulo;
          return '<aside class="caixa caixa-' + token.tipo + '"><div class="caixa-rotulo"><span aria-hidden="true">' +
            info.icone + "</span> " + titulo + '</div><div class="caixa-corpo">' + this.parser.parse(token.tokens) + "</div></aside>";
        }
      },
      {
        name: "blocoScratch",
        level: "inline",
        start: function (src) {
          var i = src.indexOf("[[");
          return i < 0 ? undefined : i;
        },
        tokenizer: function (src) {
          if (src.slice(0, 2) !== "[[") return;
          var profundidade = 0;
          for (var i = 2; i < src.length; i++) {
            var ch = src[i];
            if (ch === "\n") return;
            if (ch === "[") profundidade++;
            else if (ch === "]") {
              if (profundidade > 0) profundidade--;
              else if (src[i + 1] === "]") return { type: "blocoScratch", raw: src.slice(0, i + 2), texto: src.slice(2, i) };
            }
          }
        },
        renderer: function (token) { return Blocos.inline(token.texto); }
      }
    ],
    renderer: {
      code: function (token) {
        if ((token.lang || "").trim() === "blocos") return Blocos.pilha(token.text);
        return false;
      },
      link: function (token) {
        if (/^https?:/.test(token.href)) {
          return '<a href="' + token.href + '" target="_blank" rel="noopener">' + this.parser.parseInline(token.tokens) + "</a>";
        }
        return false;
      }
    }
  });

  var cache = {};
  function buscarTexto(url) {
    if (!cache[url]) {
      cache[url] = fetch(url, { cache: "no-cache" }).then(function (r) {
        if (!r.ok) throw new Error(r.status);
        return r.text();
      });
      cache[url].catch(function () { delete cache[url]; });
    }
    return cache[url];
  }

  /* ------------------------------ Trilha ------------------------------ */

  var listaEl = document.getElementById("trilha-lista");
  var abertos = {};

  function htmlPimentas(n) {
    var s = "";
    for (var i = 1; i <= 3; i++) s += '<span class="' + (i <= n ? "" : "apagada") + '">🌶️</span>';
    return '<span class="pimentas" title="Dificuldade: ' + n + ' de 3">' + s + "</span>";
  }

  function montarTrilha() {
    listaEl.innerHTML = DADOS.capitulos.map(function (cap) {
      var c = contar(cap.passos);
      var completo = c.feito === c.total;
      return '<li class="cap' + (completo ? " cap-completo" : "") + '" data-cap="' + cap.id + '">' +
        '<button class="cap-botao" aria-expanded="false">' +
        '<span class="cap-emoji" aria-hidden="true">' + cap.emoji + "</span>" +
        '<span class="cap-nome"><small>Capítulo ' + cap.numero + "</small>" + cap.titulo + "</span>" +
        '<span class="cap-conta">' + c.feito + "/" + c.total + "</span>" +
        '<span class="cap-seta" aria-hidden="true"></span>' +
        "</button>" +
        '<ol class="cap-passos">' + cap.passos.map(function (p) {
          return '<li><a class="passo-link pl-' + p.status + '" href="#/' + p.id + '" data-id="' + p.id + '">' +
            '<i class="st st-' + p.status + '" aria-label="' + STATUS[p.status].rotulo + '"></i>' +
            '<span class="passo-link-num">' + p.numero + "</span>" +
            '<span class="passo-link-nome">' + p.titulo + "</span></a></li>";
        }).join("") + "</ol></li>";
    }).join("");

    listaEl.querySelectorAll(".cap-botao").forEach(function (b) {
      b.addEventListener("click", function () {
        var id = b.parentElement.getAttribute("data-cap");
        abrirCapitulo(id, !abertos[id]);
      });
    });

    var t = contar(passos);
    var pct = Math.round((t.feito / t.total) * 100);
    document.getElementById("topo-progresso").innerHTML =
      '<span class="topo-progresso-txt"><b>' + t.feito + "</b>/" + t.total + " passos</span>" +
      '<span class="barra barra-mini" role="progressbar" aria-valuenow="' + pct + '" aria-valuemin="0" aria-valuemax="100" aria-label="Progresso"><span style="width:' + pct + '%"></span></span>';
  }

  function abrirCapitulo(id, abrir) {
    abertos[id] = abrir;
    var li = listaEl.querySelector('[data-cap="' + id + '"]');
    if (!li) return;
    li.classList.toggle("aberto", abrir);
    li.querySelector(".cap-botao").setAttribute("aria-expanded", String(abrir));
  }

  function marcarNaTrilha(passo) {
    listaEl.querySelectorAll(".passo-link").forEach(function (a) {
      var ativo = passo && a.getAttribute("data-id") === passo.id;
      a.classList.toggle("ativo", ativo);
      if (ativo) a.setAttribute("aria-current", "page"); else a.removeAttribute("aria-current");
    });
    if (passo) {
      abrirCapitulo(passo.capitulo.id, true);
      var ativo = listaEl.querySelector(".passo-link.ativo");
      if (ativo && ativo.scrollIntoView) ativo.scrollIntoView({ block: "nearest" });
    }
  }

  /* ------------------------------ Telas ------------------------------ */

  var palco = document.getElementById("conteudo");

  function mostrarPainel() {
    var t = contar(passos);
    var pct = Math.round((t.feito / t.total) * 100);
    var atual = passoAtual();
    var botao = atual
      ? '<a class="botao botao-grande" href="#/' + atual.id + '">' + (atual.status === "fazendo" ? "🔨 Continuar" : (t.feito ? "▶ Próxima missão" : "▶ Começar a aventura")) +
        ' <small>' + atual.numero + " · " + atual.titulo + "</small></a>"
      : '<a class="botao botao-grande" href="#/' + passos[passos.length - 1].id + '">🏆 Terminamos tudo!</a>';

    var arte = ["Z", "G", "M", "S", "B", "A"].map(function (tipo, i) {
      return '<div class="heroi-casa ' + (i % 2 ? "escura" : "clara") + '">' + Esquisitos.svg(tipo, { tamanho: "100%", titulo: Esquisitos.nomeDe(tipo) }) + "</div>";
    }).join("");

    var capitulos = DADOS.capitulos.map(function (cap) {
      var c = contar(cap.passos);
      var p = Math.round((c.feito / c.total) * 100);
      var alvo = cap.passos.filter(function (x) { return x.status !== "feito"; })[0] || cap.passos[0];
      return '<a class="cap-card' + (c.feito === c.total ? " cap-card-completo" : "") + '" href="#/' + alvo.id + '">' +
        '<span class="cap-card-emoji" aria-hidden="true">' + cap.emoji + "</span>" +
        '<span class="cap-card-num">Capítulo ' + cap.numero + "</span>" +
        '<b class="cap-card-nome">' + cap.titulo + "</b>" +
        '<span class="barra"><span style="width:' + p + '%"></span></span>' +
        '<span class="cap-card-conta">' + c.feito + " de " + c.total + " passos" + (c.fazendo ? " · 🔨 em andamento" : "") + "</span></a>";
    }).join("");

    palco.innerHTML =
      '<div class="painel">' +
      '<section class="heroi">' +
      '<div class="heroi-texto">' +
      '<p class="heroi-sobre">Um jogo de tabuleiro inédito feito no Scratch</p>' +
      '<h1 class="heroi-titulo">Zadrex<span>Guerra dos Esquisitos</span></h1>' +
      '<p class="heroi-lead">Aqui fica o mapa da nossa construção: cada passo tem a missão e, quando tem mão na massa, o diário do que a gente fez e GIFs ou prints da tela mostrando como ficou. No final, você vai jogar Zadrex contra o computador — com geladeiras voadoras.</p>' +
      botao +
      "</div>" +
      '<div class="heroi-arte" aria-hidden="false">' + arte + "</div>" +
      "</section>" +

      '<section class="painel-progresso">' +
      '<div class="painel-progresso-num"><b>' + pct + '%</b><span>da aventura</span></div>' +
      '<div class="painel-progresso-barra">' +
      '<span class="barra barra-grande" role="progressbar" aria-valuenow="' + pct + '" aria-valuemin="0" aria-valuemax="100" aria-label="Progresso total"><span style="width:' + pct + '%"></span></span>' +
      '<ul class="painel-contas">' +
      '<li><i class="st st-feito"></i><b>' + t.feito + "</b> feitos</li>" +
      '<li><i class="st st-fazendo"></i><b>' + t.fazendo + "</b> fazendo</li>" +
      '<li><i class="st st-falta"></i><b>' + t.falta + "</b> faltam</li>" +
      "</ul></div></section>" +

      '<section class="painel-secao"><h2 class="painel-h2">Conheça os Esquisitos</h2><z-elenco></z-elenco></section>' +
      '<section class="painel-secao"><h2 class="painel-h2">A trilha</h2><div class="cap-cards">' + capitulos + "</div></section>" +
      "</div>";

    document.title = "Zadrex: Guerra dos Esquisitos";
    marcarNaTrilha(null);
  }

  function htmlVazio(titulo, texto, extraClasse) {
    return '<div class="vazio ' + (extraClasse || "") + '">' +
      '<div class="vazio-arte" aria-hidden="true">' + Esquisitos.svg("A", { tamanho: 88 }) + '<span class="vazio-zzz">z<span>z</span><span>z</span></span></div>' +
      '<div><p class="vazio-titulo">' + titulo + "</p><p>" + texto + "</p></div></div>";
  }

  function htmlMidia(passo) {
    if (!passo.midia.length) {
      return '<div class="midia-vazia">' +
        '<div class="midia-icone" aria-hidden="true">📸</div>' +
        '<p class="vazio-titulo">Ainda não chegamos aqui!</p>' +
        "<p>Quando terminarmos este passo, vamos colocar aqui um GIF ou um print da tela mostrando como ficou.</p></div>";
    }
    return '<div class="midia-lista">' + passo.midia.map(function (item) {
      var src = typeof item === "string" ? item : item.src;
      var legenda = typeof item === "string" ? "" : (item.legenda || "");
      return '<figure><img src="' + src + '" alt="' + (legenda || "Como ficou o passo " + passo.titulo) + '" loading="lazy">' +
        (legenda ? "<figcaption>" + legenda + "</figcaption>" : "") + "</figure>";
    }).join("") + "</div>";
  }

  function ativarCheckboxes(container, passo) {
    var chave = "zadrex:checks:" + passo.id;
    var salvos = [];
    try { salvos = JSON.parse(localStorage.getItem(chave) || "[]"); } catch (e) { salvos = []; }
    var caixas = container.querySelectorAll('input[type="checkbox"]');
    caixas.forEach(function (cb, i) {
      cb.disabled = false;
      if (salvos[i]) cb.checked = true;
      var li = cb.closest("li");
      if (li) {
        li.classList.add("tarefa");
        li.classList.toggle("tarefa-feita", cb.checked);
      }
      cb.addEventListener("change", function () {
        if (li) li.classList.toggle("tarefa-feita", cb.checked);
        var estado = Array.prototype.map.call(caixas, function (c) { return c.checked; });
        try { localStorage.setItem(chave, JSON.stringify(estado)); } catch (e) { /* sem memória, tudo bem */ }
      });
    });
  }

  function mostrarPasso(passo) {
    var anterior = passos[passo.indice - 1];
    var proximo = passos[passo.indice + 1];
    var st = STATUS[passo.status];

    palco.innerHTML =
      '<article class="passo-pagina">' +
      '<header class="passo-cabeca">' +
      '<p class="passo-migalha"><span aria-hidden="true">' + passo.capitulo.emoji + "</span> Capítulo " + passo.capitulo.numero + " · " + passo.capitulo.titulo + "</p>" +
      '<div class="passo-titulo-linha"><span class="passo-numero">' + passo.numero + '</span><h1>' + passo.titulo + "</h1></div>" +
      '<div class="passo-meta"><span class="selo selo-' + passo.status + '">' + st.icone + " " + st.rotulo + "</span>" + htmlPimentas(passo.nivel || 1) + "</div>" +
      "</header>" +

      '<section class="secao secao-missao" aria-labelledby="h-missao">' +
      '<h2 id="h-missao" class="secao-titulo"><span aria-hidden="true">🎯</span> A missão</h2>' +
      '<div class="md" id="md-missao"><p class="carregando">Abrindo o envelope da missão…</p></div>' +
      "</section>" +

      (passo.leitura ? "" :
        '<section class="secao secao-diario" aria-labelledby="h-diario">' +
        '<h2 id="h-diario" class="secao-titulo"><span aria-hidden="true">📓</span> Diário de bordo <small>o que a gente fez</small></h2>' +
        '<div class="md" id="md-diario"></div>' +
        "</section>" +

        '<section class="secao secao-midia" aria-labelledby="h-midia">' +
        '<h2 id="h-midia" class="secao-titulo"><span aria-hidden="true">📸</span> Olha só como ficou</h2>' +
        htmlMidia(passo) +
        "</section>") +

      '<nav class="passo-nav" aria-label="Navegar entre passos">' +
      (anterior ? '<a class="botao botao-contorno" href="#/' + anterior.id + '" rel="prev"><small>← Passo ' + anterior.numero + "</small>" + anterior.titulo + "</a>" : '<a class="botao botao-contorno" href="#/"><small>←</small>Painel da missão</a>') +
      (proximo ? '<a class="botao botao-proximo" href="#/' + proximo.id + '" rel="next"><small>Passo ' + proximo.numero + " →</small>" + proximo.titulo + "</a>" : '<a class="botao botao-proximo" href="#/"><small>Fim da trilha →</small>Voltar ao painel</a>') +
      "</nav>" +
      "</article>";

    document.title = passo.numero + " " + passo.titulo + " · Zadrex";
    marcarNaTrilha(passo);

    var missaoEl = document.getElementById("md-missao");
    buscarTexto("conteudo/passos/" + passo.id + ".md").then(function (texto) {
      if (rotaAtual !== passo.id) return;
      missaoEl.innerHTML = md.parse(texto);
      ativarCheckboxes(missaoEl, passo);
    }).catch(function () {
      if (rotaAtual !== passo.id) return;
      missaoEl.innerHTML = '<p class="erro">Ops! Não achei o texto desta missão (<code>conteudo/passos/' + passo.id + ".md</code>). " +
        (location.protocol === "file:" ? "Abrindo direto do computador o navegador bloqueia a leitura: use um servidorzinho local (veja o README)." : "") + "</p>";
    });

    if (passo.leitura) return;

    var diarioEl = document.getElementById("md-diario");
    var vazioFalta = htmlVazio("Ainda não chegamos aqui!", "Quando a gente fizer este passo, aqui vão aparecer os blocos que montamos, as descobertas e as trapalhadas.");
    if (passo.status === "falta") {
      diarioEl.innerHTML = vazioFalta;
    } else {
      diarioEl.innerHTML = '<p class="carregando">Folheando o diário…</p>';
      buscarTexto("conteudo/diario/" + passo.id + ".md").then(function (texto) {
        if (rotaAtual !== passo.id) return;
        diarioEl.innerHTML = md.parse(texto);
      }).catch(function () {
        if (rotaAtual !== passo.id) return;
        diarioEl.innerHTML = passo.status === "fazendo"
          ? htmlVazio("Estamos construindo isso agora!", "As mãos estão no teclado. Daqui a pouco tem novidade aqui. 🔨", "vazio-fazendo")
          : htmlVazio("Feito, mas ninguém escreveu o diário…", "O passo está pronto! Só falta contar aqui como foi.", "vazio-fazendo");
      });
    }
  }

  function mostrarPerdido() {
    palco.innerHTML = '<div class="perdido">' + Esquisitos.svg("M", { tamanho: 140 }) +
      "<h1>Boing! Pulei pra casa errada.</h1><p>Esse passo não existe (ainda). Que tal voltar pro painel?</p>" +
      '<a class="botao" href="#/">🏠 Voltar ao painel</a></div>';
    document.title = "Perdido · Zadrex";
    marcarNaTrilha(null);
  }

  /* ------------------------------ Rotas ------------------------------ */

  var rotaAtual = null;

  function rotear() {
    var id = decodeURIComponent(location.hash.replace(/^#\/?/, ""));
    rotaAtual = id;
    fecharMenu();
    if (!id) mostrarPainel();
    else if (porId[id]) mostrarPasso(porId[id]);
    else mostrarPerdido();
    window.scrollTo(0, 0);
    palco.scrollTop = 0;
    palco.focus({ preventScroll: true });
  }

  /* --------------------------- Menu (celular) --------------------------- */

  var botaoMenu = document.getElementById("botao-menu");
  var trilha = document.getElementById("trilha");
  var fundo = document.getElementById("trilha-fundo");

  function fecharMenu() {
    document.body.classList.remove("menu-aberto");
    botaoMenu.setAttribute("aria-expanded", "false");
    fundo.hidden = true;
  }
  botaoMenu.addEventListener("click", function () {
    var abrir = !document.body.classList.contains("menu-aberto");
    document.body.classList.toggle("menu-aberto", abrir);
    botaoMenu.setAttribute("aria-expanded", String(abrir));
    fundo.hidden = !abrir;
    if (abrir) trilha.querySelector("a, button").focus();
  });
  fundo.addEventListener("click", fecharMenu);

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") fecharMenu();
    if (e.altKey || e.ctrlKey || e.metaKey || /input|textarea|select/i.test(e.target.tagName)) return;
    var passo = porId[rotaAtual];
    if (e.key === "ArrowRight") {
      var prox = passo ? passos[passo.indice + 1] : passos[0];
      if (prox) location.hash = "#/" + prox.id;
    } else if (e.key === "ArrowLeft" && passo) {
      var ant = passos[passo.indice - 1];
      location.hash = ant ? "#/" + ant.id : "#/";
    }
  });

  montarTrilha();
  window.addEventListener("hashchange", rotear);
  rotear();
})();
