/* Catálogo, busca, carrinho e pedido pelo WhatsApp. Sem pagamento online.
   Preços: só aparecem se o representante cadastrar um valor no painel (sempre "valor demonstrativo");
   caso contrário, "Consultar preço". Códigos e embalagens vêm do Catálogo Nutripássaros (PDF). */

const CART_KEY = "nutripassaros-demo-cart";
const TABELA_KEY = "nutripassaros-demo-tabela";
const CLIENTE_KEY = "nutripassaros-demo-cliente";

function formatBRL(valor) {
  return (Number(valor) || 0).toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}
function escapeHtml(s) {
  return String(s == null ? "" : s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}
function waLink(texto) {
  return "https://wa.me/" + WHATSAPP_NUMERO + "?text=" + encodeURIComponent(texto);
}
function img(p) { return typeof assetUrl === "function" ? assetUrl(p) : p; }
function tabelaAtiva() { return typeof tabelaPorId === "function" ? tabelaPorId(window.__tabelaId) : null; }
function precoAtual(p, cod) {
  if (cod === undefined) { const vs = variacoesDe(p); cod = vs[0] ? vs[0].codigo : null; }
  const v = typeof precoVariacao === "function" ? precoVariacao(p, cod, tabelaAtiva()) : p.preco;
  return Number(v) > 0 ? Number(v) : null;
}
function nomeCategoria(id) {
  const c = (typeof listCategorias === "function" ? listCategorias() : []).find((x) => x.id === id);
  return c ? c.nome : "";
}

/* ——— variações (embalagens) ——— */
function variacoesDe(p) {
  if (p.variacoes && p.variacoes.length) return p.variacoes;
  return [{ codigo: p.codigo || "", peso: p.peso || "" }];
}
function variacao(p, cod) {
  const vs = variacoesDe(p);
  return vs.find((v) => v.codigo === cod) || vs[0];
}
function rotuloVar(v) {
  return [v.peso, v.codigo ? "cód. " + v.codigo : ""].filter(Boolean).join(" · ");
}

/* ——— carrinho ——— */
function getCart() {
  let items = [];
  try { items = JSON.parse(localStorage.getItem(CART_KEY) || "[]"); } catch (e) { items = []; }
  if (!Array.isArray(items)) items = [];
  // migra itens antigos {id, qty} e produtos mesclados
  return items.map((i) => {
    let p = produtoPorId(i.id);
    let cod = i.cod;
    if (p && p.ativo === false && p.mescladoEm) { cod = cod || p.codigo; p = produtoPorId(p.mescladoEm); }
    if (!p) return null;
    const v = variacao(p, cod || p.codigo);
    return { id: p.id, cod: v.codigo, qty: Math.max(1, Math.min(999, parseInt(i.qty, 10) || 1)) };
  }).filter(Boolean);
}
function setCart(items) {
  try { localStorage.setItem(CART_KEY, JSON.stringify(items)); } catch (e) {}
  updateCartBadge();
  renderCart();
}
function addToCart(id, cod, qty) {
  const p = produtoPorId(id);
  if (!p || p.esgotado) return;
  const v = variacao(p, cod);
  const items = getCart();
  const found = items.find((i) => i.id === id && i.cod === v.codigo);
  if (found) found.qty = Math.min(999, found.qty + (qty || 1));
  else items.push({ id: id, cod: v.codigo, qty: qty || 1 });
  setCart(items);
  toast("Adicionado: " + p.nome + (v.peso ? " (" + v.peso + ")" : ""));
}
function setQty(key, qty) {
  const [id, cod] = key.split("|");
  let items = getCart();
  if (qty <= 0) items = items.filter((i) => !(i.id === id && i.cod === cod));
  else items.forEach((i) => { if (i.id === id && i.cod === cod) i.qty = Math.min(999, qty); });
  setCart(items);
}
function cartCount(items) { return items.reduce((s, i) => s + i.qty, 0); }
function cartTotal(items) {
  /* total só existe se TODOS os itens tiverem valor cadastrado */
  let total = 0;
  for (const i of items) {
    const p = produtoPorId(i.id);
    const pr = p ? precoAtual(p, i.cod) : null;
    if (pr === null) return null;
    total += pr * i.qty;
  }
  return total;
}
function updateCartBadge() {
  const n = cartCount(getCart());
  document.querySelectorAll("[data-cart-count]").forEach((el) => {
    el.textContent = String(n);
    el.classList.toggle("is-on", n > 0);
  });
  document.body.classList.toggle("has-cart-bar", n > 0);
  document.querySelectorAll("[data-cart-bar]").forEach((el) => {
    el.hidden = n === 0;
    const t = el.querySelector("[data-cart-bar-text]");
    if (t) t.textContent = n + (n === 1 ? " item no pedido" : " itens no pedido");
  });
}

let toastTimer = null;
function toast(msg) {
  let el = document.getElementById("toast");
  if (!el) {
    el = document.createElement("div");
    el.id = "toast"; el.className = "toast"; el.setAttribute("role", "status"); el.setAttribute("aria-live", "polite");
    document.body.appendChild(el);
  }
  el.textContent = msg;
  el.classList.add("is-on");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el.classList.remove("is-on"), 2200);
}

/* ——— cards ——— */
function precoHTML(p, cod) {
  const pr = precoAtual(p, cod);
  if (pr === null) return '<p class="preco preco-consultar">Consultar preço</p>';
  return '<p class="preco" data-preco-for="' + p.id + '"><span data-preco-valor>' + formatBRL(pr) + '</span> <span class="preco-demo">valor demonstrativo</span></p>';
}
function seletorVar(p, ctx) {
  const vs = variacoesDe(p);
  if (vs.length <= 1) {
    const v = vs[0];
    return v && (v.peso || v.codigo) ? '<p class="peso">' + escapeHtml(rotuloVar(v)) + "</p>" : "";
  }
  const sid = "var-" + ctx + "-" + p.id;
  return '<label class="var-label" for="' + sid + '">Embalagem</label>' +
    '<select class="var-select" id="' + sid + '" data-var-for="' + p.id + '">' +
    vs.map((v) => '<option value="' + escapeHtml(v.codigo) + '">' + escapeHtml(rotuloVar(v)) + "</option>").join("") +
    "</select>";
}
function cardHTML(p) {
  const linha = p.linha ? '<p class="tag">' + escapeHtml(p.linha) + "</p>" : "";
  const badge = (p.esgotado ? '<p><span class="badge-esgotado">Indisponível</span></p>' : "") +
    (p.revisar ? '<p><span class="badge-rev" title="Dados em conferência com o catálogo">Em conferência</span></p>' : "");
  const buy = p.esgotado
    ? '<button class="btn btn-gold btn-sm" type="button" disabled>Indisponível</button>'
    : '<button class="btn btn-gold btn-sm" type="button" data-add="' + p.id + '">Adicionar ao pedido</button>';
  return (
    '<article class="card' + (p.esgotado ? " esgotado" : "") + '" data-product="' + p.id + '" data-cat="' + p.categoria + '">' +
      '<button class="card-img" type="button" data-detail="' + p.id + '" aria-label="Ver detalhes de ' + escapeHtml(p.nome) + '">' +
        '<img src="' + img(p.imagem) + '" alt="' + escapeHtml(p.nome) + '" width="400" height="400" loading="lazy" decoding="async" onerror="this.closest(\'.card-img\').classList.add(\'sem-foto\');this.remove()">' +
      "</button>" +
      '<div class="card-body">' + linha +
        '<h3><button type="button" class="link-detail" data-detail="' + p.id + '">' + escapeHtml(p.nome) + "</button></h3>" +
        seletorVar(p, "c") + badge + precoHTML(p) +
        '<div class="card-actions">' + buy + "</div>" +
      "</div>" +
    "</article>"
  );
}

function textoBusca(p) {
  const vs = variacoesDe(p);
  return [p.nome, p.linha, p.codigo, p.peso, p.descricao, nomeCategoria(p.categoria)]
    .concat(vs.map((v) => v.codigo + " " + v.peso)).join(" ")
    .toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}
function normQ(q) { return String(q || "").trim().toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, ""); }
function bate(p, q) {
  if (!q) return true;
  const hay = textoBusca(p);
  return q.split(/\s+/).every((t) => hay.indexOf(t) !== -1);
}

/* Produtos cuja foto exata ainda não foi encontrada (mostram o placeholder elegante) */
const SEM_FOTO_REAL = new Set(["gaiola-triangular", "mata-pulgas"]);

function renderFeaturedSections() {
  document.querySelectorAll("[data-cat-grid]").forEach((el) => {
    const cat = el.getAttribute("data-cat-grid");
    // Destaques: só produtos com dados confirmados no PDF e com foto real da embalagem
    const todos = cat.split(",").reduce((acc, c) => acc.concat(produtosPorCategoria(c.trim(), false)), []).filter((p) => !p.revisar && !SEM_FOTO_REAL.has(p.id));
    const list = todos.filter((p) => p.featured).concat(todos.filter((p) => !p.featured)).slice(0, 4);
    el.innerHTML = list.map(cardHTML).join("");
  });
}

let __renderTimer = null;
function renderCatalogGrid(cat, query) {
  const el = document.querySelector("[data-catalog-grid]");
  if (!el) return;
  const q = normQ(query);
  const list = listProdutos().filter((p) => (!cat || cat === "todos" || p.categoria === cat) && bate(p, q));
  const info = document.querySelector("[data-result-info]");
  if (info) info.textContent = list.length + (list.length === 1 ? " produto" : " produtos") + (q ? ' para "' + query.trim() + '"' : "") + (cat && cat !== "todos" ? " em " + nomeCategoria(cat) : "");
  const ok = list.filter((p) => !p.revisar), rev = list.filter((p) => p.revisar);
  const revHTML = rev.length ? '<div class="rev-head" role="note"><h3>Em conferência com o catálogo <span>(' + rev.length + ')</span></h3>' +
    '<p>Itens do catálogo com um dado ainda a confirmar com o representante (veja o detalhe de cada produto). Mostramos apenas o que consta no PDF.</p></div>' + rev.map(cardHTML).join("") : "";
  el.innerHTML = list.length ? ok.map(cardHTML).join("") + revHTML
    : '<div class="no-results"><p><strong>Nenhum produto encontrado.</strong></p><p>Tente outro nome ou código (ex.: 03050), ou <button type="button" class="link-btn" data-limpar-busca>limpe a busca</button>.</p></div>';
}
function catalogoAtual() {
  const on = document.querySelector(".filtros .chip.is-on");
  return on ? on.getAttribute("data-filter") : "todos";
}
function refreshCatalog() {
  const input = document.querySelector("#busca-catalogo") || document.querySelector("[data-search]");
  renderCatalogGrid(catalogoAtual(), input ? input.value : "");
}

/* ——— detalhe do produto ——— */
function openDetail(id) {
  const p = produtoPorId(id);
  const m = document.getElementById("detalhe");
  if (!p || !m) return;
  const box = m.querySelector("[data-detalhe-body]");
  box.innerHTML =
    '<div class="detalhe-grid">' +
      '<div class="detalhe-img"><img src="' + img(p.imagem) + '" alt="' + escapeHtml(p.nome) + '" width="800" height="800" decoding="async"></div>' +
      "<div>" +
        (p.linha ? '<p class="tag">' + escapeHtml(p.linha) + "</p>" : "") +
        '<h2 id="detalhe-titulo">' + escapeHtml(p.nome) + "</h2>" +
        '<p class="muted small">' + escapeHtml(nomeCategoria(p.categoria)) + "</p>" +
        (p.descricao ? "<p>" + escapeHtml(p.descricao) + "</p>" : "") +
        seletorVar(p, "d") +
        precoHTML(p) +
        '<div class="qty-row"><span class="var-label">Quantidade</span><div class="qty">' +
          '<button type="button" data-dqty="-1" aria-label="Diminuir quantidade">−</button>' +
          '<input type="number" inputmode="numeric" min="1" max="999" value="1" data-dqty-input aria-label="Quantidade">' +
          '<button type="button" data-dqty="1" aria-label="Aumentar quantidade">+</button></div></div>' +
        (p.esgotado ? '<p class="badge-esgotado">Indisponível</p>' :
          '<button class="btn btn-gold btn-block" type="button" data-add-detail="' + p.id + '">Adicionar ao pedido</button>') +
        (p.revisar ? '<p class="fine rev-note"><strong>Em conferência:</strong> ' + escapeHtml(p.revisar) + "</p>" : "") +
        '<p class="fine" style="margin-top:10px">Código e embalagens conforme o catálogo Nutripássaros' + (p.pagina ? " (pág. " + p.pagina + ")" : "") + ". Preço e disponibilidade: confirmar com o representante.</p>" +
      "</div>" +
    "</div>";
  showModal(m);
}

/* ——— modais / gaveta ——— */
let __lastFocus = null;
function showModal(m) {
  __lastFocus = document.activeElement;
  document.getElementById("overlay").classList.add("is-on");
  m.classList.add("is-open");
  m.setAttribute("aria-hidden", "false");
  document.body.classList.add("no-scroll");
  const f = m.querySelector("input, select, button:not(.close-x)") || m.querySelector("button");
  if (f) setTimeout(() => f.focus({ preventScroll: true }), 30);
}
function hideModal(m) {
  if (!m) return;
  m.classList.remove("is-open");
  m.setAttribute("aria-hidden", "true");
}
function closeAll() {
  document.querySelectorAll(".modal.is-open").forEach(hideModal);
  closeDrawer();
  document.getElementById("overlay").classList.remove("is-on");
  document.body.classList.remove("no-scroll");
  if (__lastFocus && __lastFocus.focus) try { __lastFocus.focus({ preventScroll: true }); } catch (e) {}
}
function openDrawer() {
  const d = document.getElementById("carrinho");
  if (!d) return;
  __lastFocus = document.activeElement;
  renderCart();
  d.classList.add("is-open");
  d.setAttribute("aria-hidden", "false");
  document.getElementById("overlay").classList.add("is-on");
  document.body.classList.add("no-scroll");
  const c = d.querySelector(".close-x");
  if (c) c.focus({ preventScroll: true });
}
function closeDrawer() {
  const d = document.getElementById("carrinho");
  if (!d) return;
  d.classList.remove("is-open");
  d.setAttribute("aria-hidden", "true");
}

/* ——— carrinho (render) ——— */
function renderCart() {
  const body = document.querySelector("[data-cart-body]");
  const foot = document.querySelector("[data-cart-foot]");
  if (!body) return;
  const items = getCart();
  if (!items.length) {
    body.innerHTML = '<div class="empty-cart"><p><strong>Seu pedido está vazio.</strong></p><p>Busque pelo nome ou código, escolha a embalagem e toque em “Adicionar ao pedido”.</p>' +
      (document.querySelector("[data-catalog-grid]") ? "" : '<p><a class="btn btn-outline btn-sm" href="catalogo.html">Abrir o catálogo</a></p>') + "</div>";
    if (foot) foot.hidden = true;
    return;
  }
  if (foot) foot.hidden = false;
  body.innerHTML = items.map((i) => {
    const p = produtoPorId(i.id);
    const v = variacao(p, i.cod);
    const key = i.id + "|" + i.cod;
    const pr = precoAtual(p, i.cod);
    return '<div class="cart-item">' +
      '<img src="' + img(p.imagem) + '" alt="" width="64" height="64" loading="lazy">' +
      '<div class="cart-info"><strong>' + escapeHtml(p.nome) + "</strong>" +
        '<div class="peso">' + escapeHtml(rotuloVar(v)) + "</div>" +
        (pr === null ? "" : '<div class="cart-unit">' + formatBRL(pr) + " / un.</div>") +
      "</div>" +
      '<div class="cart-preco">' + (pr === null ? '<span class="muted small">Consultar</span>' : formatBRL(pr * i.qty)) + "</div>" +
      '<div class="cart-actions">' +
        '<div class="qty stepper" role="group" aria-label="Quantidade de ' + escapeHtml(p.nome) + '">' +
          '<button type="button" data-qty="' + key + '" data-delta="-1" aria-label="Diminuir quantidade de ' + escapeHtml(p.nome) + '">−</button>' +
          '<span aria-live="polite">' + i.qty + "</span>" +
          '<button type="button" data-qty="' + key + '" data-delta="1" aria-label="Aumentar quantidade de ' + escapeHtml(p.nome) + '">+</button>' +
        "</div>" +
        '<button type="button" class="remove" data-remove="' + key + '" aria-label="Remover ' + escapeHtml(p.nome) + ' do pedido">' +
          '<svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><path fill="currentColor" d="M9 3h6l1 2h4v2H4V5h4l1-2zm-3 6h12l-1 12H7L6 9zm4 2v8h2v-8h-2zm4 0v8h2v-8h-2z"/></svg>' +
          "<span>Remover</span></button>" +
      "</div>" +
    "</div>";
  }).join("");
  const total = cartTotal(items);
  const tEl = document.querySelector("[data-cart-total]");
  const tRow = document.querySelector("[data-cart-total-row]");
  if (tRow) tRow.hidden = total === null;
  if (tEl && total !== null) tEl.textContent = formatBRL(total) + " (demonstrativo)";
  const nota = document.querySelector("[data-cart-nota]");
  if (nota) nota.textContent = total === null
    ? "Preços e disponibilidade são confirmados pelo representante no WhatsApp. Não há pagamento neste site."
    : "Valores demonstrativos, sujeitos à confirmação do representante. Não há pagamento neste site.";
  const minimo = minimoAtingido();
  const aviso = document.querySelector("[data-minimo-aviso]");
  if (aviso) {
    aviso.hidden = minimo.ok;
    if (!minimo.ok) aviso.textContent = "Pedido mínimo da tabela " + (tabelaAtiva().nome || "") + ": " + formatBRL(minimo.min) + " (valor demonstrativo).";
  }
}
function minimoAtingido() {
  const t = tabelaAtiva();
  const min = t && t.minimo ? Number(t.minimo) : 0;
  const total = cartTotal(getCart());
  /* sem preços cadastrados não dá para validar mínimo: não bloqueia */
  return { ok: min <= 0 || total === null || total >= min, min: min, total: total };
}

/* ——— pedido / WhatsApp ——— */
function getCliente() { try { return JSON.parse(localStorage.getItem(CLIENTE_KEY) || "{}"); } catch (e) { return {}; } }
function lerCliente(form) {
  const g = (n) => ((form.elements.namedItem(n) || {}).value || "").trim();
  return { nome: g("nome"), loja: g("loja"), cnpj: g("cnpj"), cidade: g("cidade"), telefone: g("telefone"), obs: g("obs") };
}
function mensagemPedido(cli) {
  const items = getCart();
  const t = tabelaAtiva();
  const total = cartTotal(items);
  let txt = "Olá, " + WHATSAPP_NOME + "! Pedido pelo catálogo digital Nutripássaros:\n\n";
  items.forEach((i, n) => {
    const p = produtoPorId(i.id);
    const v = variacao(p, i.cod);
    const pr = precoAtual(p, i.cod);
    txt += (n + 1) + ". " + p.nome + "\n";
    txt += "   " + [v.codigo ? "Cód. " + v.codigo : "", v.peso ? "Emb. " + v.peso : "", "Qtd: " + i.qty].filter(Boolean).join(" | ");
    if (pr !== null) txt += " | " + formatBRL(pr) + " (demo)";
    txt += "\n";
  });
  txt += "\nTotal de itens: " + cartCount(items);
  if (total !== null) txt += "\nTotal (valores demonstrativos): " + formatBRL(total);
  else txt += "\nPreços: favor informar.";
  if (t && t.id !== "varejo") txt += "\nTabela: " + t.nome;
  txt += "\n\nDados do comprador:";
  txt += "\nNome: " + (cli.nome || "—");
  if (cli.loja) txt += "\nLoja / razão social: " + cli.loja;
  if (cli.cnpj) txt += "\nCNPJ: " + cli.cnpj;
  txt += "\nCidade: " + (cli.cidade || "—");
  if (cli.telefone) txt += "\nTelefone: " + cli.telefone;
  if (cli.obs) txt += "\nObservações: " + cli.obs;
  return txt;
}
function salvarPedidoLocal(cli) {
  const items = getCart();
  if (!items.length || typeof registrarPedido !== "function") return;
  const t = tabelaAtiva();
  registrarPedido({
    id: "L-" + Date.now().toString().slice(-6),
    data: new Date().toISOString().slice(0, 10),
    cliente: cli.loja || cli.nome || "Cliente do catálogo",
    tabela: t ? t.id : "varejo",
    total: cartTotal(items),
    status: "Enviado ao WhatsApp (demo local)",
    itens: cartCount(items),
    exemplo: false,
    local: true,
    detalhe: items.map((i) => {
      const p = produtoPorId(i.id); const v = variacao(p, i.cod);
      return { id: i.id, nome: p.nome, codigo: v.codigo, peso: v.peso, qtd: i.qty };
    })
  });
}
function openCheckout() {
  if (!getCart().length) return;
  const m = document.getElementById("checkout");
  closeDrawer();
  const form = document.getElementById("form-checkout");
  const prev = document.getElementById("checkout-preview");
  form.hidden = false; prev.hidden = true;
  const c = getCliente();
  ["nome", "loja", "cnpj", "cidade", "telefone"].forEach((k) => { const el = form.elements.namedItem(k); if (el && !el.value && c[k]) el.value = c[k]; });
  showModal(m);
}

function renderCategoryNavExtras() {
  const grade = document.getElementById("grade-categorias");
  if (grade) {
    grade.innerHTML = listCategorias().map((c) =>
      '<a class="cat-card" href="catalogo.html#' + c.id + '"><span class="cat-media"><img src="' + img(c.imagem) + '" alt="" width="800" height="600" loading="lazy" decoding="async"></span><span class="cat-text"><strong>' + escapeHtml(c.nome) + '</strong>' + (c.descricao ? '<small>' + escapeHtml(c.descricao) + '</small>' : '') + '<em aria-hidden="true">Ver produtos →</em></span></a>'
    ).join("");
  }
  const filtros = document.querySelector(".filtros");
  if (filtros) {
    const cur = catalogoAtual();
    filtros.innerHTML = '<button class="chip' + (cur === "todos" ? " is-on" : "") + '" type="button" data-filter="todos" aria-pressed="' + (cur === "todos") + '">Todos</button>' +
      listCategorias().map((c) => '<button class="chip' + (cur === c.id ? " is-on" : "") + '" type="button" data-filter="' + c.id + '" aria-pressed="' + (cur === c.id) + '">' + escapeHtml(c.nome) + "</button>").join("");
  }
}
function setFiltro(cat) {
  document.querySelectorAll(".filtros [data-filter]").forEach((b) => {
    const on = b.getAttribute("data-filter") === cat;
    b.classList.toggle("is-on", on);
    b.setAttribute("aria-pressed", on ? "true" : "false");
  });
  refreshCatalog();
}

/* ——— tabelas de preço (B2B, demonstrativo) ——— */
function detectTabelaInicial() {
  const params = new URLSearchParams(location.search);
  const q = (params.get("tabela") || "").toLowerCase();
  if (q) return q;
  try { return localStorage.getItem(TABELA_KEY) || "varejo"; } catch (e) { return "varejo"; }
}
function aplicarTabela(id) {
  const t = tabelaPorId(id) || tabelaPorId("varejo");
  window.__tabelaId = t.id;
  try { localStorage.setItem(TABELA_KEY, t.id); } catch (e) {}
  const url = new URL(location.href);
  if (t.id !== "varejo") url.searchParams.set("tabela", t.id); else url.searchParams.delete("tabela");
  history.replaceState({}, "", url);
  renderTabelaBanner(); renderFeaturedSections(); refreshCatalog(); renderCart();
}
function renderTabelaBanner() {
  const el = document.querySelector("[data-tabela-banner]");
  if (!el) return;
  const t = tabelaAtiva();
  const temPreco = listProdutos().some((p) => precoAtual(p) !== null);
  const store = getStore();
  const opts = (store.tabelas || []).map((tb) => '<option value="' + tb.id + '"' + (tb.id === t.id ? " selected" : "") + ">" + escapeHtml(tb.nome) + "</option>").join("");
  el.innerHTML = '<div><strong>Tabela: ' + escapeHtml(t.nome) + "</strong> — " +
    (temPreco ? "valores demonstrativos cadastrados no painel." : "preços sob consulta com o representante.") + "</div>" +
    '<label class="visually-hidden" for="sel-tabela">Tabela de preços</label><select id="sel-tabela">' + opts + "</select>";
  el.querySelector("#sel-tabela").addEventListener("change", (ev) => aplicarTabela(ev.target.value));
}

/* ——— eventos ——— */
function bindUI() {
  document.addEventListener("change", (ev) => {
    const sel = ev.target.closest && ev.target.closest("[data-var-for]");
    if (!sel) return;
    const p = produtoPorId(sel.getAttribute("data-var-for"));
    const box = sel.closest(".card") || sel.closest(".modal-card");
    const el = box && box.querySelector("[data-preco-valor]");
    const pr = p ? precoAtual(p, sel.value) : null;
    if (el && pr !== null) el.textContent = formatBRL(pr);
  });
  document.addEventListener("click", (ev) => {
    const t = ev.target;
    const add = t.closest("[data-add]");
    if (add) {
      const id = add.getAttribute("data-add");
      const card = add.closest(".card");
      const sel = card && card.querySelector("[data-var-for]");
      addToCart(id, sel ? sel.value : null, 1);
      return;
    }
    const addD = t.closest("[data-add-detail]");
    if (addD) {
      const m = document.getElementById("detalhe");
      const sel = m.querySelector("[data-var-for]");
      const q = parseInt((m.querySelector("[data-dqty-input]") || {}).value, 10) || 1;
      addToCart(addD.getAttribute("data-add-detail"), sel ? sel.value : null, Math.max(1, Math.min(999, q)));
      closeAll();
      return;
    }
    const dq = t.closest("[data-dqty]");
    if (dq) {
      const inp = document.querySelector("#detalhe [data-dqty-input]");
      inp.value = Math.max(1, Math.min(999, (parseInt(inp.value, 10) || 1) + Number(dq.getAttribute("data-dqty"))));
      return;
    }
    const det = t.closest("[data-detail]");
    if (det) { openDetail(det.getAttribute("data-detail")); return; }
    const qty = t.closest("[data-qty]");
    if (qty) {
      const key = qty.getAttribute("data-qty");
      const [id, cod] = key.split("|");
      const cur = getCart().find((i) => i.id === id && i.cod === cod);
      setQty(key, (cur ? cur.qty : 0) + Number(qty.getAttribute("data-delta")));
      return;
    }
    const rm = t.closest("[data-remove]");
    if (rm) { setQty(rm.getAttribute("data-remove"), 0); return; }
    if (t.closest("[data-clear-cart]")) { if (confirm("Esvaziar o pedido?")) setCart([]); return; }
    if (t.closest("[data-open-cart]")) { ev.preventDefault(); openDrawer(); return; }
    if (t.closest("[data-close-cart]") || t.closest("[data-close-modal]")) { closeAll(); return; }
    if (t.closest("[data-checkout]")) { openCheckout(); return; }
    if (t.closest("[data-voltar-form]")) {
      document.getElementById("form-checkout").hidden = false;
      document.getElementById("checkout-preview").hidden = true;
      return;
    }
    if (t.closest("[data-limpar-busca]")) {
      document.querySelectorAll("[data-search]").forEach((i) => { i.value = ""; });
      setFiltro("todos");
      return;
    }
    const f = t.closest(".filtros [data-filter]");
    if (f) { setFiltro(f.getAttribute("data-filter")); return; }
    const send = t.closest("[data-wa-send]");
    if (send) {
      salvarPedidoLocal(getCliente());
      // o link abre normalmente (href já montado); limpa o carrinho depois
      setTimeout(() => {
        setCart([]);
        const ok = document.getElementById("checkout-ok");
        if (ok) { document.getElementById("checkout-preview").hidden = true; ok.hidden = false; }
      }, 300);
    }
  });

  document.addEventListener("change", (ev) => {
    const sel = ev.target.closest("[data-var-for]");
    if (sel) {
      const p = produtoPorId(sel.getAttribute("data-var-for"));
      if (p) sel.setAttribute("aria-label", "Embalagem: " + rotuloVar(variacao(p, sel.value)));
    }
  });

  document.getElementById("overlay").addEventListener("click", closeAll);
  document.addEventListener("keydown", (ev) => { if (ev.key === "Escape") closeAll(); });

  const form = document.getElementById("form-checkout");
  if (form) {
    form.addEventListener("submit", (ev) => {
      ev.preventDefault();
      const cli = lerCliente(form);
      const erro = form.querySelector("[data-form-erro]");
      if (!cli.nome || !cli.cidade) {
        erro.hidden = false;
        erro.textContent = "Preencha pelo menos nome e cidade.";
        (cli.nome ? form.elements.namedItem("cidade") : form.elements.namedItem("nome")).focus();
        return;
      }
      erro.hidden = true;
      try { localStorage.setItem(CLIENTE_KEY, JSON.stringify(Object.assign({}, cli, { obs: "" }))); } catch (e) {}
      const txt = mensagemPedido(cli);
      const prev = document.getElementById("checkout-preview");
      prev.querySelector("[data-msg]").textContent = txt;
      prev.querySelector("[data-wa-send]").setAttribute("href", waLink(txt));
      form.hidden = true; prev.hidden = false;
      prev.querySelector("[data-wa-send]").focus({ preventScroll: true });
    });
  }

  let deb = null;
  document.querySelectorAll("[data-search]").forEach((input) => {
    input.addEventListener("input", () => {
      clearTimeout(deb);
      deb = setTimeout(() => {
        const grid = document.querySelector("[data-catalog-grid]");
        if (grid) {
          document.querySelectorAll("[data-search]").forEach((o) => { if (o !== input) o.value = input.value; });
          refreshCatalog();
        }
      }, 120);
    });
    // na página inicial, a busca leva ao catálogo
    if (!document.querySelector("[data-catalog-grid]")) {
      input.addEventListener("keydown", (ev) => {
        if (ev.key === "Enter" && input.value.trim()) location.href = "catalogo.html?q=" + encodeURIComponent(input.value.trim());
      });
    }
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
      const h = a.getAttribute("href") || "";
      if (h.indexOf("catalogo.html#") === 0 && document.querySelector("[data-catalog-grid]")) setTimeout(lerHash, 0);
    }));
  }

  document.querySelectorAll("[data-float-wa]").forEach((a) => {
    a.setAttribute("href", waLink("Olá, " + WHATSAPP_NOME + "! Gostaria de fazer um pedido pelo catálogo digital da Nutripássaros."));
  });
}

function lerHash() {
  const h = decodeURIComponent((location.hash || "").slice(1));
  if (h && listCategorias().some((c) => c.id === h)) setFiltro(h);
}

document.addEventListener("DOMContentLoaded", () => {
  window.__tabelaId = detectTabelaInicial();
  renderCategoryNavExtras();
  renderTabelaBanner();
  renderFeaturedSections();
  if (document.querySelector("[data-catalog-grid]")) {
    const q = new URLSearchParams(location.search).get("q");
    if (q) document.querySelectorAll("[data-search]").forEach((i) => { i.value = q; });
    lerHash();
    refreshCatalog();
    window.addEventListener("hashchange", lerHash);
  }
  updateCartBadge();
  renderCart();
  bindUI();
});
