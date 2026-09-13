/*
 * Blocos: desenha blocos parecidos com os do Scratch a partir de texto.
 *
 * Um bloco solto no meio do texto (Markdown):
 *   [[eventos: quando ⚑ for clicado]]
 *
 * Uma pilha de blocos (bloco de código com a linguagem "blocos"):
 *   ```blocos
 *   eventos: quando ⚑ for clicado
 *   controle: repita (8) vezes
 *     movimento: mova (10) passos
 *   ```
 *
 * Dentro do texto de um bloco:
 *   (10)                 → espaço branco para digitar
 *   [vez ▾]              → menu de escolher
 *   {minha casa}         → variável (bolinha laranja)
 *   {operadores: ...}    → bloco redondo de outra categoria
 *   <operadores: ...>    → bloco de verdadeiro/falso (hexágono)
 *   ⚑                    → bandeira verde
 *   // comentário        → recadinho amarelo no fim da linha
 *   Linhas com mais espaços na frente ficam DENTRO do bloco de cima.
 *   Linha em branco separa scripts diferentes.
 */
(function (raiz) {
  "use strict";

  var CATEGORIAS = {
    movimento: "Movimento", aparencia: "Aparência", som: "Som", eventos: "Eventos",
    controle: "Controle", sensores: "Sensores", operadores: "Operadores",
    variaveis: "Variáveis", listas: "Listas", meusblocos: "Meus Blocos", caneta: "Caneta"
  };

  var BANDEIRA = '<svg class="bk-bandeira" viewBox="0 0 16 16" aria-label="bandeira verde" role="img">' +
    '<path d="M3.5 1.5v13" stroke="#45993D" stroke-width="1.6" stroke-linecap="round"/>' +
    '<path d="M3.5 2.3c2.8-1.9 5.4 1.8 9.6 0v6.8c-4.2 1.9-6.8-1.9-9.6 0z" fill="#4CBF56" stroke="#45993D" stroke-width="1" stroke-linejoin="round"/></svg>';

  function esc(s) {
    return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  }

  function normalizar(nome) {
    return nome.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/\s+/g, "");
  }

  /** Separa "categoria: resto". Devolve null se não houver categoria conhecida. */
  function separarCategoria(texto) {
    var m = /^\s*([A-Za-zÀ-ú ]{2,14}):\s?([\s\S]*)$/.exec(texto);
    if (!m) return null;
    var cat = normalizar(m[1]);
    return CATEGORIAS[cat] ? { cat: cat, resto: m[2] } : null;
  }

  function temCategoriaNaFrente(s) {
    var m = /^([A-Za-zÀ-ú ]{2,14}):/.exec(s);
    return !!(m && CATEGORIAS[normalizar(m[1])]);
  }

  /**
   * Lê o texto a partir de "pos" até achar "fim".
   * Devolve { html, pos, soUmElemento }.
   */
  function analisar(s, pos, fim) {
    var html = "", texto = "", pedacos = 0, elementos = 0;

    function soltarTexto() {
      if (!texto) return;
      if (texto.trim()) pedacos++;
      html += esc(texto).replace(/⚑/g, function () { pedacos++; return BANDEIRA; });
      texto = "";
    }
    function elemento(h) { soltarTexto(); html += h; pedacos++; elementos++; }

    while (pos < s.length) {
      var ch = s[pos];

      if (fim && ch === fim && (fim !== ">" || s[pos - 1] !== " ")) {
        soltarTexto();
        return { html: html, pos: pos + 1, soUmElemento: pedacos === 1 && elementos === 1 };
      }

      if (ch === "(") {
        var dentro = analisar(s, pos + 1, ")");
        elemento(dentro.soUmElemento ? dentro.html : '<span class="bk-slot">' + (dentro.html || "&nbsp;") + "</span>");
        pos = dentro.pos;
        continue;
      }

      if (ch === "[") {
        var fecha = s.indexOf("]", pos);
        if (fecha > pos) {
          var conteudo = s.slice(pos + 1, fecha);
          var menu = /▾\s*$/.test(conteudo);
          elemento('<span class="' + (menu ? "bk-menu" : "bk-texto") + '">' + esc(conteudo) + "</span>");
          pos = fecha + 1;
          continue;
        }
      }

      if (ch === "{") {
        var rep = analisarReporter(s, pos + 1, "}", "bk-rep");
        elemento(rep.html);
        pos = rep.pos;
        continue;
      }

      if (ch === "<" && temCategoriaNaFrente(s.slice(pos + 1))) {
        var bool = analisarReporter(s, pos + 1, ">", "bk-bool");
        elemento(bool.html);
        pos = bool.pos;
        continue;
      }

      texto += ch;
      pos++;
    }
    soltarTexto();
    return { html: html, pos: pos, soUmElemento: pedacos === 1 && elementos === 1 };
  }

  function analisarReporter(s, pos, fim, classe) {
    var cat = "variaveis";
    var m = /^([A-Za-zÀ-ú ]{2,14}):\s?/.exec(s.slice(pos));
    if (m && CATEGORIAS[normalizar(m[1])]) {
      cat = normalizar(m[1]);
      pos += m[0].length;
    }
    var r = analisar(s, pos, fim);
    return { html: '<span class="bk ' + classe + " bk-" + cat + '">' + r.html + "</span>", pos: r.pos };
  }

  function conteudoDoBloco(texto) {
    return analisar(texto, 0, null).html;
  }

  /** Um bloco solto no meio do texto. */
  function inline(texto) {
    var sep = separarCategoria(texto);
    var cat = sep ? sep.cat : "variaveis";
    var corpo = sep ? sep.resto : texto;
    return '<span class="bk bk-chip bk-' + cat + '" title="Categoria: ' + CATEGORIAS[cat] + '">' + conteudoDoBloco(corpo) + "</span>";
  }

  /* ------------------------------ Pilhas ------------------------------ */

  function lerLinhas(texto) {
    var raizNo = { filhos: [] };
    var abertos = [{ nivel: -1, alvo: raizNo.filhos }];

    texto.split("\n").forEach(function (linhaBruta) {
      if (!linhaBruta.trim()) return;
      var expandida = linhaBruta.replace(/\t/g, "  ");
      var nivel = Math.floor(expandida.match(/^ */)[0].length / 2);
      var conteudo = expandida.trim();

      var comentario = "";
      var iComentario = conteudo.indexOf(" // ");
      if (iComentario >= 0) {
        comentario = conteudo.slice(iComentario + 4);
        conteudo = conteudo.slice(0, iComentario);
      } else if (conteudo.indexOf("// ") === 0) {
        comentario = conteudo.slice(3);
        conteudo = "";
      }

      while (abertos[abertos.length - 1].nivel >= nivel) abertos.pop();
      var pai = abertos[abertos.length - 1];

      var sep = separarCategoria(conteudo);
      var cat = sep ? sep.cat : "controle";
      var corpo = sep ? sep.resto : conteudo;

      if (/^sen[aã]o$/i.test(corpo.trim())) {
        var ultimo = pai.alvo[pai.alvo.length - 1];
        if (ultimo) {
          ultimo.senao = [];
          abertos.push({ nivel: nivel, alvo: ultimo.senao });
          return;
        }
      }

      var no = { cat: sep ? cat : (conteudo ? "controle" : "comentario"), texto: corpo, comentario: comentario, filhos: [], senao: null };
      pai.alvo.push(no);
      abertos.push({ nivel: nivel, alvo: no.filhos });
    });
    return raizNo.filhos;
  }

  function desenharNo(no) {
    if (no.cat === "comentario") {
      return '<div class="bk-coment bk-coment-solto">' + esc(no.comentario) + "</div>";
    }
    var t = no.texto.trim();
    var ehC = no.filhos.length > 0 || no.senao || /^(sempre|repita|se |enquanto|para cada)/.test(t);
    var ehChapeu = /^(quando|defina)\b/.test(t);
    var classes = ["bk", "bk-bloco", "bk-" + no.cat];
    if (ehC) classes.push("bk-c");
    if (ehChapeu) classes.push("bk-chapeu");
    if (no.cat === "meusblocos" && /^defina\b/.test(t)) classes.push("bk-defina");

    var coment = no.comentario ? '<span class="bk-coment">' + esc(no.comentario) + "</span>" : "";
    var html = '<div class="' + classes.join(" ") + '">';
    html += '<div class="bk-linha"><span class="bk-corpo">' + conteudoDoBloco(t) + "</span>" + coment + "</div>";
    if (ehC) {
      html += '<div class="bk-boca">' + no.filhos.map(desenharNo).join("") + "</div>";
      if (no.senao) {
        html += '<div class="bk-linha bk-meio"><span class="bk-corpo">senão</span></div>';
        html += '<div class="bk-boca">' + no.senao.map(desenharNo).join("") + "</div>";
      }
      html += '<div class="bk-pe"></div>';
    }
    return html + "</div>";
  }

  function pilha(texto) {
    var scripts = texto.replace(/\r/g, "").split(/\n\s*\n/).filter(function (s) { return s.trim(); });
    return '<div class="bk-area">' + scripts.map(function (s) {
      return '<div class="bk-pilha">' + lerLinhas(s).map(desenharNo).join("") + "</div>";
    }).join("") + "</div>";
  }

  raiz.Blocos = { inline: inline, pilha: pilha, CATEGORIAS: CATEGORIAS };
})(window);
