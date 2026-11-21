/* Carrinho, busca, WhatsApp, B2B e checkout de demonstração. Caminhos relativos. */

const CART_KEY = "nutripassaros-demo-cart";
const TABELA_KEY = "nutripassaros-demo-tabela";

function formatBRL(valor) {
  return (Number(valor) || 0).toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

function waLink(texto) {
  return "https://wa.me/" + WHATSAPP_NUMERO + "?text=" + encodeURIComponent(texto);
}

function tabelaAtiva() {
  const id = window.__tabelaId;
  return typeof tabelaPorId === "function" ? tabelaPorId(id) : null;
}

function precoAtual(p) {
  return typeof precoNaTabela === "function" ? precoNaTabela(p, tabelaAtiva()) : (p.preco || 0);
}

function mensagemProduto(p) {
  const peso = p.peso ? " " + p.peso : "";
  const cod = p.codigo ? " (cód. " + p.codigo + ")" : "";
  return "Olá, tenho interesse em " + p.nome + peso + cod + ".";
}

function getCart() {
  try {
    const raw = localStorage.getItem(CART_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    return [];
  }
}

function setCart(items) {
  localStorage.setItem(CART_KEY, JSON.stringify(items));
  updateCartBadge();
  renderCart();
}

function addToCart(id, qty) {
  const p = produtoPorId(id);
  if (!p || p.esgotado) return;
  const items = getCart();
  const found = items.find((i) => i.id === id);
  if (found) found.qty += qty || 1;
  else items.push({ id: id, qty: qty || 1 });
  setCart(items);
  openDrawer();
}

function setQty(id, qty) {
  let items = getCart();
  if (qty <= 0) items = items.filter((i) => i.id !== id);
  else {
    const found = items.find((i) => i.id === id);
    if (found) found.qty = qty;
  }
  setCart(items);
}

function cartTotal(items) {
  return items.reduce((sum, i) => {
    const p = produtoPorId(i.id);
    return sum + (p ? precoAtual(p) * i.qty : 0);
  }, 0);
}

function cartCount(items) {
  return items.reduce((s, i) => s + i.qty, 0);
}

function minimoAtingido() {
  const t = tabelaAtiva();
  const min = t && t.minimo ? Number(t.minimo) : 0;
  return { ok: cartTotal(getCart()) >= min || min <= 0, min: min, total: cartTotal(getCart()) };
}

function updateCartBadge() {
  const n = cartCount(getCart());
  document.querySelectorAll("[data-cart-count]").forEach((el) => {
    el.textContent = String(n);
    el.classList.toggle("is-on", n > 0);
    el.setAttribute("aria-label", n + " itens no carrinho");
  });
}

function cardHTML(p) {
  const preco = precoAtual(p);
  const linha = p.linha ? '<p class="tag">' + escapeHtml(p.linha) + "</p>" : "";
  const peso = p.peso ? '<p class="peso">' + escapeHtml((p.codigo ? p.codigo + " · " : "") + p.peso) + "</p>" : (p.codigo ? '<p class="peso">' + escapeHtml(p.codigo) + "</p>" : "");
  const esg = p.esgotado ? ' esgotado' : "";
  const badge = p.esgotado ? '<p><span class="badge-esgotado">Esgotado</span></p>' : "";
  const buy = p.esgotado
    ? '<button class="btn btn-gold btn-sm" type="button" disabled>Indisponível</button>'
    : '<button class="btn btn-gold btn-sm" type="button" data-add="' + p.id + '">Comprar</button>' +
      '<a class="btn btn-whats btn-sm" href="' + waLink(mensagemProduto(p)) + '" target="_blank" rel="noopener noreferrer">Pedir no WhatsApp</a>';
  const img = typeof assetUrl === "function" ? assetUrl(p.imagem) : p.imagem;
  return (
    '<article class="card' + esg + '" data-product="' + p.id + '" data-cat="' + p.categoria + '" data-name="' + escapeHtml((p.nome + " " + (p.linha || "") + " " + (p.codigo || "") + " " + (p.peso || "")).toLowerCase()) + '">' +
      '<div class="card-img"><img src="' + img + '" alt="' + escapeHtml(p.nome) + '"></div>' +
      '<div class="card-body">' +
        linha +
        "<h3>" + escapeHtml(p.nome) + "</h3>" +
        peso +
        badge +
        '<p class="desc">' + escapeHtml(p.descricao || "") + "</p>" +
        '<p class="preco">' + formatBRL(preco) + "</p>" +
        '<div class="card-actions">' + buy + "</div>" +
      "</div>" +
    "</article>"
  );
}

function escapeHtml(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function renderFeaturedSections() {
  document.querySelectorAll("[data-cat-grid]").forEach((el) => {
    const cat = el.getAttribute("data-cat-grid");
    const featured = el.getAttribute("data-featured") !== "false";
    const list = produtosPorCategoria(cat, featured);
    el.innerHTML = list.map(cardHTML).join("");
  });
}

function renderCatalogGrid(cat, query) {
  const el = document.querySelector("[data-catalog-grid]");
  if (!el) return;
  const q = (query || "").trim().toLowerCase();
  const list = listProdutos().filter((p) => {
    if (cat && cat !== "todos" && p.categoria !== cat) return false;
    if (!q) return true;
    const hay = (p.nome + " " + (p.linha || "") + " " + (p.peso || "") + " " + (p.codigo || "") + " " + (p.descricao || "")).toLowerCase();
    return hay.indexOf(q) !== -1;
  });
  el.innerHTML = list.length ? list.map(cardHTML).join("") : '<p class="no-results">Nenhum produto encontrado.</p>';
}

function renderCart() {
  const body = document.querySelector("[data-cart-body]");
  const foot = document.querySelector("[data-cart-foot]");
  if (!body) return;
  const items = getCart();
  if (!items.length) {
    body.innerHTML = '<p class="empty-cart">Seu carrinho está vazio. Escolha um produto e toque em Comprar.</p>';
    if (foot) foot.hidden = true;
    return;
  }
  if (foot) foot.hidden = false;
  body.innerHTML = items.map((i) => {
    const p = produtoPorId(i.id);
    if (!p) return "";
    const img = typeof assetUrl === "function" ? assetUrl(p.imagem) : p.imagem;
    return (
      '<div class="cart-item">' +
        '<img src="' + img + '" alt="">' +
        "<div>" +
          "<strong>" + escapeHtml(p.nome) + "</strong>" +
          '<div class="peso">' + escapeHtml([p.codigo, p.peso].filter(Boolean).join(" · ")) + "</div>" +
          '<div class="qty">' +
            '<button type="button" data-qty="' + p.id + '" data-delta="-1" aria-label="Diminuir">−</button>' +
            "<span>" + i.qty + "</span>" +
            '<button type="button" data-qty="' + p.id + '" data-delta="1" aria-label="Aumentar">+</button>' +
          "</div>" +
        "</div>" +
        "<div><strong>" + formatBRL(precoAtual(p) * i.qty) + "</strong></div>" +
      "</div>"
    );
  }).join("");
  const totalEl = document.querySelector("[data-cart-total]");
  if (totalEl) totalEl.textContent = formatBRL(cartTotal(items));
  const check = minimoAtingido();
  const aviso = document.querySelector("[data-minimo-aviso]");
  if (aviso) {
    if (!check.ok) {
      aviso.hidden = false;
      aviso.textContent = "Pedido mínimo da tabela " + (tabelaAtiva().nome || "") + ": " + formatBRL(check.min) + " (faltam " + formatBRL(check.min - check.total) + ").";
    } else {
      aviso.hidden = true;
    }
  }
  document.querySelectorAll("[data-checkout], [data-wa-cart]").forEach((el) => {
    el.classList.toggle("is-disabled", !check.ok);
    if (el.tagName === "BUTTON") el.disabled = !check.ok;
    else if (!check.ok) el.setAttribute("aria-disabled", "true");
    else el.removeAttribute("aria-disabled");
  });
}

function mensagemCarrinho(obs) {
  const items = getCart();
  const t = tabelaAtiva();
  const isB2b = t && t.id && t.id !== "varejo";
  const linhas = items.map((i) => {
    const p = produtoPorId(i.id);
    if (!p) return "";
    const preco = precoAtual(p);
    if (isB2b) {
      return "• " + (p.codigo || "—") + " | " + p.nome + " | " + (p.peso || "—") + " | " + i.qty + " un | " + formatBRL(preco) + " | " + formatBRL(preco * i.qty);
    }
    const peso = p.peso ? " " + p.peso : "";
    return "• " + i.qty + "x " + p.nome + peso + " (" + formatBRL(preco) + ")";
  }).filter(Boolean);

  const cliente = (document.getElementById("nome") && document.getElementById("nome").value) || "";
  let txt;
  if (isB2b) {
    txt = "Pedido B2B — Nutripássaros\n";
    txt += "Representante: " + WHATSAPP_NOME + "\n";
    if (cliente) txt += "Cliente: " + cliente + "\n";
    txt += "Tabela: " + t.nome + "\n\n";
    txt += "Itens (código | produto | embalagem | qtd | preço | subtotal):\n";
    txt += linhas.join("\n");
    txt += "\n\nTotal: " + formatBRL(cartTotal(items));
    if (t.minimo) txt += "\nPedido mínimo da tabela: " + formatBRL(t.minimo);
  } else {
    txt = "Olá, " + WHATSAPP_NOME + "! Gostaria de fazer um pedido:\n\n" + linhas.join("\n") + "\n\nTotal: " + formatBRL(cartTotal(items));
  }
  if (obs) txt += "\nObservações: " + obs;
  txt += "\n\n(Pedido pelo catálogo digital — protótipo)";
  return txt;
}

function salvarPedidoLocal(origem, extras) {
  const items = getCart();
  if (!items.length || typeof registrarPedido !== "function") return;
  const t = tabelaAtiva();
  registrarPedido({
    id: "P-" + Date.now().toString().slice(-6),
    data: new Date().toISOString().slice(0, 10),
    cliente: (extras && extras.cliente) || "Cliente do catálogo",
    tabela: t ? t.id : "varejo",
    total: cartTotal(items),
    status: origem,
    itens: cartCount(items),
    exemplo: false,
    detalhe: items.map((i) => {
      const p = produtoPorId(i.id);
      return { id: i.id, qtd: i.qty, nome: p ? p.nome : i.id, codigo: p ? p.codigo : "", preco: p ? precoAtual(p) : 0 };
    })
  });
}

function openDrawer() {
  const d = document.getElementById("carrinho");
  const o = document.getElementById("overlay");
  if (!d) return;
  d.classList.add("is-open");
  if (o) o.classList.add("is-on");
  d.setAttribute("aria-hidden", "false");
  const close = d.querySelector(".close-x");
  if (close) close.focus();
}

function closeDrawer() {
  const d = document.getElementById("carrinho");
  const o = document.getElementById("overlay");
  if (d) {
    d.classList.remove("is-open");
    d.setAttribute("aria-hidden", "true");
  }
  if (o && !document.getElementById("checkout").classList.contains("is-open")) o.classList.remove("is-on");
}

function openModal() {
  const m = document.getElementById("checkout");
  if (!m) return;
  if (!getCart().length) return;
  if (!minimoAtingido().ok) return;
  closeDrawer();
  document.getElementById("overlay").classList.add("is-on");
  m.classList.add("is-open");
  m.setAttribute("aria-hidden", "false");
  const form = document.getElementById("form-checkout");
  const ok = document.getElementById("checkout-ok");
  if (form) form.hidden = false;
  if (ok) ok.hidden = true;
  const first = m.querySelector("input, button");
  if (first) first.focus();
}

function closeModal() {
  const m = document.getElementById("checkout");
  const o = document.getElementById("overlay");
  if (m) {
    m.classList.remove("is-open");
    m.setAttribute("aria-hidden", "true");
  }
  if (o) o.classList.remove("is-on");
}

function filterLanding(query) {
  const q = (query || "").trim().toLowerCase();
  let visible = 0;
  document.querySelectorAll(".prod-grid .card").forEach((card) => {
    const name = card.getAttribute("data-name") || "";
    const show = !q || name.indexOf(q) !== -1;
    card.hidden = !show;
    if (show) visible += 1;
  });
  document.querySelectorAll("[data-search-empty]").forEach((el) => {
    el.hidden = !q || visible > 0;
  });
}

function aplicarTabela(id, persist) {
  const t = tabelaPorId(id) || tabelaPorId("varejo");
  window.__tabelaId = t.id;
  if (persist !== false) {
    try { localStorage.setItem(TABELA_KEY, t.id); } catch (e) {}
    const url = new URL(location.href);
    if (t.id && t.id !== "varejo") url.searchParams.set("tabela", t.id);
    else url.searchParams.delete("tabela");
    history.replaceState({}, "", url);
  }
  renderTabelaBanner();
  renderFeaturedSections();
  const catBtn = document.querySelector(".chip.is-on");
  if (document.querySelector("[data-catalog-grid]")) {
    const q = (document.querySelector("[data-search]") || {}).value || "";
    renderCatalogGrid(catBtn ? catBtn.getAttribute("data-filter") : "todos", q);
  }
  renderCart();
}

function renderTabelaBanner() {
  const el = document.querySelector("[data-tabela-banner]");
  if (!el) return;
  const t = tabelaAtiva();
  const store = getStore();
  const opts = (store.tabelas || []).map((tb) => {
    return '<option value="' + tb.id + '"' + (tb.id === t.id ? " selected" : "") + ">" + escapeHtml(tb.nome) + "</option>";
  }).join("");
  const min = t.minimo ? " Pedido mínimo: " + formatBRL(t.minimo) + "." : "";
  const ajuste = t.ajuste ? " " + (t.ajuste > 0 ? "+" : "") + t.ajuste + "% sobre o preço base." : " Preços de varejo.";
  el.innerHTML =
    "<div><strong>Tabela: " + escapeHtml(t.nome) + "</strong> — " + ajuste + min +
    ' Use o link <code>?tabela=' + escapeHtml(t.id) + "</code> ou escolha abaixo.</div>" +
    '<label class="visually-hidden" for="sel-tabela">Tabela de preços</label>' +
    '<select id="sel-tabela">' + opts + "</select>";
  const sel = el.querySelector("#sel-tabela");
  if (sel) sel.addEventListener("change", () => aplicarTabela(sel.value));
}

function bindUI() {
  document.addEventListener("click", (ev) => {
    const add = ev.target.closest("[data-add]");
    if (add) {
      addToCart(add.getAttribute("data-add"), 1);
      return;
    }
    const qty = ev.target.closest("[data-qty]");
    if (qty) {
      const id = qty.getAttribute("data-qty");
      const delta = Number(qty.getAttribute("data-delta"));
      const cur = getCart().find((i) => i.id === id);
      setQty(id, (cur ? cur.qty : 0) + delta);
      return;
    }
    if (ev.target.closest("[data-open-cart]")) { openDrawer(); return; }
    if (ev.target.closest("[data-close-cart]")) { closeDrawer(); return; }
    if (ev.target.closest("[data-close-modal]")) { closeModal(); return; }
    if (ev.target.closest("[data-checkout]")) { openModal(); return; }
    if (ev.target.closest("[data-wa-cart]")) {
      ev.preventDefault();
      if (!getCart().length || !minimoAtingido().ok) return;
      const obs = (document.getElementById("obs") && document.getElementById("obs").value) || "";
      salvarPedidoLocal("Enviado no WhatsApp", { cliente: (document.getElementById("nome") || {}).value });
      window.open(waLink(mensagemCarrinho(obs)), "_blank", "noopener,noreferrer");
    }
  });

  const overlay = document.getElementById("overlay");
  if (overlay) overlay.addEventListener("click", () => { closeDrawer(); closeModal(); });
  document.addEventListener("keydown", (ev) => {
    if (ev.key === "Escape") { closeDrawer(); closeModal(); }
  });

  document.querySelectorAll("[data-search]").forEach((input) => {
    input.addEventListener("input", () => {
      const catalog = document.querySelector("[data-catalog-grid]");
      if (catalog) {
        const catBtn = document.querySelector(".chip.is-on");
        renderCatalogGrid(catBtn ? catBtn.getAttribute("data-filter") : "todos", input.value);
      } else filterLanding(input.value);
    });
  });

  document.querySelectorAll("[data-filter]").forEach((btn) => {
    btn.addEventListener("click", () => {
      document.querySelectorAll("[data-filter]").forEach((b) => b.classList.remove("is-on"));
      btn.classList.add("is-on");
      const q = (document.querySelector("[data-search]") || {}).value || "";
      renderCatalogGrid(btn.getAttribute("data-filter"), q);
    });
  });

  const navToggle = document.querySelector("[data-nav-toggle]");
  const nav = document.getElementById("site-nav");
  if (navToggle && nav) {
    navToggle.addEventListener("click", () => {
      const open = nav.classList.toggle("is-open");
      navToggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    nav.querySelectorAll("a").forEach((a) => a.addEventListener("click", () => {
      nav.classList.remove("is-open");
      navToggle.setAttribute("aria-expanded", "false");
    }));
  }

  const form = document.getElementById("form-checkout");
  if (form) {
    form.addEventListener("submit", (ev) => {
      ev.preventDefault();
      if (!minimoAtingido().ok) return;
      const nome = (form.elements.namedItem("nome") || {}).value || "";
      salvarPedidoLocal("Pedido de demonstração", { cliente: nome || "Cliente do catálogo" });
      form.hidden = true;
      const ok = document.getElementById("checkout-ok");
      if (ok) {
        ok.hidden = false;
        const saud = nome ? nome.trim().split(" ")[0] + ", " : "";
        const p = ok.querySelector("[data-ok-text]");
        if (p) p.textContent = saud + "recebemos o seu pedido de demonstração. Nenhum pagamento foi cobrado e nenhuma encomenda real foi enviada.";
      }
    });
  }

  const floatWa = document.querySelector("[data-float-wa]");
  if (floatWa) {
    floatWa.setAttribute("href", waLink("Olá, " + WHATSAPP_NOME + "! Gostaria de fazer um pedido pelo catálogo digital da Nutripássaros."));
  }
}

function detectTabelaInicial() {
  const params = new URLSearchParams(location.search);
  const q = (params.get("tabela") || params.get("codigo") || "").toLowerCase();
  if (q) return q;
  try { return localStorage.getItem(TABELA_KEY) || "varejo"; } catch (e) { return "varejo"; }
}

function renderCategoryNavExtras() {
  const grade = document.getElementById("grade-categorias");
  if (grade && typeof listCategorias === "function") {
    grade.innerHTML = listCategorias().map((c) => {
      const img = typeof assetUrl === "function" ? assetUrl(c.imagem) : c.imagem;
      return '<a class="cat-card" href="#' + c.id + '"><img src="' + img + '" alt=""><span>' + escapeHtml(c.nome) + "</span></a>";
    }).join("");
  }
  const filtros = document.querySelector(".filtros");
  if (filtros && typeof listCategorias === "function") {
    const atual = filtros.querySelector(".chip.is-on");
    const cur = atual ? atual.getAttribute("data-filter") : "todos";
    filtros.innerHTML = '<button class="chip' + (cur === "todos" ? " is-on" : "") + '" type="button" data-filter="todos">Todos</button>' +
      listCategorias().map((c) => '<button class="chip' + (cur === c.id ? " is-on" : "") + '" type="button" data-filter="' + c.id + '">' + escapeHtml(c.nome) + "</button>").join("");
    filtros.querySelectorAll("[data-filter]").forEach((btn) => {
      btn.addEventListener("click", () => {
        filtros.querySelectorAll("[data-filter]").forEach((b) => b.classList.remove("is-on"));
        btn.classList.add("is-on");
        const q = (document.querySelector("[data-search]") || {}).value || "";
        renderCatalogGrid(btn.getAttribute("data-filter"), q);
      });
    });
  }
}

document.addEventListener("DOMContentLoaded", () => {
  window.__tabelaId = detectTabelaInicial();
  renderCategoryNavExtras();
  renderTabelaBanner();
  renderFeaturedSections();
  if (document.querySelector("[data-catalog-grid]")) renderCatalogGrid("todos", "");
  updateCartBadge();
  renderCart();
  bindUI();
});
