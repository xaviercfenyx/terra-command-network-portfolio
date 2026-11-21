/* Painel de demonstração do representante. Estado em localStorage. */

function $(sel, root) { return (root || document).querySelector(sel); }
function $$(sel, root) { return Array.from((root || document).querySelectorAll(sel)); }
function fmt(v) { return (Number(v) || 0).toLocaleString("pt-BR", { style: "currency", currency: "BRL" }); }
function esc(s) {
  return String(s == null ? "" : s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;");
}

let view = "dashboard";
let editingId = null;

function applyTema(tema) {
  document.documentElement.setAttribute("data-tema", tema === "dark" ? "dark" : "light");
  updateStore((s) => { s.tema = tema === "dark" ? "dark" : "light"; });
}

function showLogin(show) {
  $("#tela-login").hidden = !show;
  $("#tela-app").hidden = show;
}

function refreshTrialBadge() {
  const store = getStore();
  const left = trialRestantes(store.trial);
  $$("[data-trial-badge]").forEach((el) => {
    if (store.trial && left > 0) {
      el.textContent = "Teste · " + left + " dia" + (left === 1 ? "" : "s") + " restante" + (left === 1 ? "" : "s");
      el.classList.add("is-on");
    } else if (store.trial && left <= 0) {
      el.textContent = "Teste encerrado (demonstração)";
      el.classList.add("is-on");
    } else {
      el.classList.remove("is-on");
    }
  });
}

function openTrial() {
  $("#trial-form-wrap").hidden = false;
  $("#trial-ok").hidden = true;
  $("#modal-trial").classList.add("is-on");
  const f = $("#form-trial");
  if (f && getSession()) {
    f.nome.value = getSession().nome || "";
    f.email.value = getSession().email || DEMO_USER.email;
  }
}

function closeTrial() {
  $("#modal-trial").classList.remove("is-on");
}

function enterApp() {
  showLogin(false);
  const store = getStore();
  applyTema(store.tema || "light");
  refreshTrialBadge();
  navigate(view || "dashboard");
}

function navigate(name) {
  view = name;
  $$("[data-view]").forEach((b) => b.classList.toggle("is-on", b.getAttribute("data-view") === name));
  const main = $("#conteudo");
  const pages = { dashboard: renderDashboard, produtos: renderProdutos, categorias: renderCategorias, importar: renderImportar, tabelas: renderTabelas, clientes: renderClientes, pedidos: renderPedidos, qr: renderQR, produtoForm: renderProdutoForm };
  (pages[name] || renderDashboard)(main);
  $("#sidebar").classList.remove("is-open");
  window.scrollTo(0, 0);
}

/* ——— Dashboard ——— */
function renderDashboard(el) {
  const s = getStore();
  const m = s.metricas || {};
  el.innerHTML =
    '<div class="page-title"><div><h2>Painel</h2><p>Olá, ' + esc(DEMO_USER.nome) + '. Visão geral do catálogo digital — demonstração.</p></div></div>' +
    '<p class="example-tag">Dados de exemplo — números ilustrativos deste protótipo</p>' +
    '<div class="kpis">' +
      kpi("Visitas", m.visitas, "últimos 30 dias") +
      kpi("Cliques no WhatsApp", m.cliquesWhatsapp, "dados de exemplo") +
      kpi("Pedidos", m.pedidos, "dados de exemplo") +
      kpi("Ticket médio", fmt(m.ticketMedio), "dados de exemplo") +
    "</div>" +
    '<div class="grid-2">' +
      '<section class="panel"><h3>Visitas nos últimos 30 dias</h3><p class="example-tag">Dados de exemplo</p>' + sparkline(m.visitasDias || []) + "</section>" +
      '<section class="panel"><h3>Produtos mais pedidos</h3><p class="example-tag">Dados de exemplo</p>' + bars(m.topProdutos || []) + "</section>" +
    "</div>";
}
function kpi(label, value, note) {
  return '<div class="kpi"><span>' + esc(label) + "</span><strong>" + esc(String(value)) + "</strong><em>" + esc(note) + "</em></div>";
}
function sparkline(dias) {
  if (!dias.length) return "<p>Sem dados.</p>";
  const w = 560, h = 180, p = 24;
  const max = Math.max.apply(null, dias.map((d) => d.visitas)) || 1;
  const step = (w - p * 2) / Math.max(dias.length - 1, 1);
  const pts = dias.map((d, i) => {
    const x = p + i * step;
    const y = h - p - (d.visitas / max) * (h - p * 2);
    return x + "," + y;
  }).join(" ");
  const last = dias[dias.length - 1];
  const first = dias[0];
  return '<svg viewBox="0 0 ' + w + " " + h + '" width="100%" height="180" role="img" aria-label="Gráfico de visitas de exemplo">' +
    '<polyline fill="none" stroke="#3f7a43" stroke-width="3" points="' + pts + '"/>' +
    '<text x="' + p + '" y="' + (h - 6) + '" font-size="11" fill="currentColor">' + first.data.slice(5) + "</text>" +
    '<text x="' + (w - p - 40) + '" y="' + (h - 6) + '" font-size="11" fill="currentColor">' + last.data.slice(5) + "</text>" +
    "</svg>";
}
function bars(items) {
  const max = Math.max.apply(null, items.map((i) => i.qtd).concat([1]));
  return items.map((i) => {
    const pct = Math.round((i.qtd / max) * 100);
    return '<div style="margin:8px 0"><div style="display:flex;justify-content:space-between;font-size:.85rem"><span>' + esc(i.nome) + "</span><strong>" + i.qtd + '</strong></div>' +
      '<div style="background:var(--bg);border-radius:99px;height:8px"><div style="width:' + pct + '%;background:var(--brand);height:8px;border-radius:99px"></div></div></div>';
  }).join("");
}

/* ——— Products ——— */
function renderProdutos(el) {
  const s = getStore();
  const q = (el.querySelector("[data-psearch]") && el.querySelector("[data-psearch]").value) || window.__pq || "";
  const cat = (el.querySelector("[data-pcat]") && el.querySelector("[data-pcat]").value) || window.__pcat || "";
  window.__pq = q; window.__pcat = cat;
  let list = s.produtos.slice();
  if (cat) list = list.filter((p) => p.categoria === cat);
  if (q) {
    const n = q.toLowerCase();
    list = list.filter((p) => (p.nome + " " + (p.codigo || "") + " " + (p.linha || "")).toLowerCase().indexOf(n) !== -1);
  }
  const catOpts = '<option value="">Todas as categorias</option>' + s.categorias.map((c) => '<option value="' + c.id + '"' + (cat === c.id ? " selected" : "") + ">" + esc(c.nome) + "</option>").join("");
  el.innerHTML =
    '<div class="page-title"><div><h2>Produtos</h2><p>' + s.produtos.length + " itens no catálogo. Edições aparecem no catálogo deste navegador.</p></div>" +
    '<button class="btn btn-primary" type="button" data-new-prod>Novo produto</button></div>' +
    '<div class="toolbar"><input type="search" data-psearch placeholder="Buscar nome ou código" value="' + esc(q) + '"><select data-pcat>' + catOpts + "</select></div>" +
    '<div class="panel" style="overflow:auto"><table><thead><tr><th></th><th>Código</th><th>Produto</th><th>Categoria</th><th>Embalagem</th><th>Preço base</th><th></th><th></th></tr></thead><tbody>' +
    list.map((p) => {
      return "<tr>" +
        '<td><img class="thumb" src="' + assetUrl(p.imagem) + '" alt=""></td>' +
        "<td>" + esc(p.codigo || "—") + "</td>" +
        "<td><strong>" + esc(p.nome) + "</strong>" + (p.esgotado ? ' <span class="badge-demo">Esgotado</span>' : "") + (p.featured ? ' <span class="badge-demo">Destaque</span>' : "") + "</td>" +
        "<td>" + esc((s.categorias.find((c) => c.id === p.categoria) || {}).nome || p.categoria) + "</td>" +
        "<td>" + esc(p.peso || "—") + "</td>" +
        "<td>" + fmt(p.preco) + "</td>" +
        '<td class="row-actions"><button class="btn btn-ghost btn-sm" data-edit="' + p.id + '">Editar</button></td>' +
        '<td><button class="btn btn-danger btn-sm" data-del="' + p.id + '">Excluir</button></td>' +
      "</tr>";
    }).join("") +
    "</tbody></table></div>";

  $("[data-psearch]", el).addEventListener("input", () => { window.__pq = $("[data-psearch]", el).value; renderProdutos(el); });
  $("[data-pcat]", el).addEventListener("change", () => { window.__pcat = $("[data-pcat]", el).value; renderProdutos(el); });
}

function renderProdutoForm(el) {
  const s = getStore();
  const p = editingId ? s.produtos.find((x) => x.id === editingId) : {
    id: "", nome: "", linha: "", categoria: (s.categorias[0] || {}).id, peso: "", preco: 0,
    featured: false, esgotado: false, imagem: "", descricao: "", codigo: ""
  };
  const cats = s.categorias.map((c) => '<option value="' + c.id + '"' + (p.categoria === c.id ? " selected" : "") + ">" + esc(c.nome) + "</option>").join("");
  el.innerHTML =
    '<div class="page-title"><div><h2>' + (editingId ? "Editar produto" : "Novo produto") + '</h2><p>A pré-visualização é a mesma carta do catálogo.</p></div>' +
    '<button class="btn btn-ghost" type="button" data-view="produtos">Voltar</button></div>' +
    '<form id="form-prod" class="form-grid two">' +
      '<div class="panel">' +
        '<div class="field"><label>Nome</label><input name="nome" required value="' + esc(p.nome) + '"></div>' +
        '<div class="field"><label>Código (SKU)</label><input name="codigo" value="' + esc(p.codigo || "") + '"></div>' +
        '<div class="field"><label>Categoria</label><select name="categoria">' + cats + "</select></div>" +
        '<div class="field"><label>Linha</label><input name="linha" value="' + esc(p.linha || "") + '"></div>' +
        '<div class="field"><label>Embalagem / peso</label><input name="peso" value="' + esc(p.peso || "") + '" placeholder="ex.: 500g"></div>' +
        '<div class="field"><label>Preço base (R$)</label><input name="preco" type="number" min="0" step="0.01" value="' + (p.preco || 0) + '"></div>' +
        '<div class="field"><label>Descrição</label><textarea name="descricao" rows="4">' + esc(p.descricao || "") + "</textarea></div>" +
        '<div class="field"><label>Foto (recorte automático ao centro, formato quadrado)</label>' +
          '<input type="file" accept="image/*" name="foto">' +
          '<input type="hidden" name="imagem" value="">' +
        "</div>" +
        '<label class="switch"><input type="checkbox" name="featured"' + (p.featured ? " checked" : "") + "> Destaque na página inicial</label>" +
        '<label class="switch"><input type="checkbox" name="esgotado"' + (p.esgotado ? " checked" : "") + "> Esgotado</label>" +
        '<div style="display:flex;gap:8px;margin-top:12px"><button class="btn btn-primary" type="submit">Salvar</button>' +
        '<button class="btn btn-ghost" type="button" data-view="produtos">Cancelar</button></div>' +
      "</div>" +
      '<div class="panel preview-card"><h3>Pré-visualização no catálogo</h3><div id="live-preview"></div></div>' +
    "</form>";

  const form = $("#form-prod");
  form.imagem.value = p.imagem || "";
  const live = () => {
    const draft = readProdForm(form, p);
    $("#live-preview").innerHTML = previewCard(draft);
  };
  form.addEventListener("input", live);
  form.addEventListener("change", live);
  form.foto.addEventListener("change", () => {
    const file = form.foto.files[0];
    if (!file) return;
    centerCropSquare(file, 640, (data) => { form.imagem.value = data; live(); });
  });
  form.addEventListener("submit", (ev) => {
    ev.preventDefault();
    const draft = readProdForm(form, p);
    if (!draft.nome) return;
    updateStore((st) => {
      if (editingId) {
        const i = st.produtos.findIndex((x) => x.id === editingId);
        if (i >= 0) st.produtos[i] = Object.assign({}, st.produtos[i], draft, { id: editingId });
      } else {
        draft.id = slugId(draft.nome);
        st.produtos.push(normalizeProduct(draft, st.produtos.length));
      }
    });
    editingId = null;
    navigate("produtos");
  });
  live();
}

function readProdForm(form, prev) {
  return {
    id: prev.id,
    nome: form.nome.value.trim(),
    codigo: form.codigo.value.trim(),
    categoria: form.categoria.value,
    linha: form.linha.value.trim(),
    peso: form.peso.value.trim(),
    preco: Number(form.preco.value) || 0,
    descricao: form.descricao.value.trim(),
    imagem: form.imagem.value || prev.imagem || "",
    featured: form.featured.checked,
    esgotado: form.esgotado.checked,
    ativo: true
  };
}

function previewCard(p) {
  const img = assetUrl(p.imagem);
  return '<article class="card" style="background:var(--bg-2);border:1px solid var(--line);border-radius:16px;overflow:hidden">' +
    '<div style="aspect-ratio:1;display:grid;place-items:center;padding:12px;background:#fff"><img src="' + img + '" alt="" style="max-height:180px;width:auto"></div>' +
    '<div style="padding:14px">' +
      (p.linha ? '<p style="font-size:11px;font-weight:800;letter-spacing:.06em;text-transform:uppercase;color:var(--brand);margin:0 0 4px">' + esc(p.linha) + "</p>" : "") +
      "<h3 style='margin:0 0 4px;font-size:1.05rem'>" + esc(p.nome || "Nome do produto") + "</h3>" +
      '<p style="margin:0;color:var(--ink-soft);font-size:.85rem">' + esc([p.codigo, p.peso].filter(Boolean).join(" · ")) + "</p>" +
      (p.esgotado ? '<p><span class="badge-demo">Esgotado</span></p>' : "") +
      '<p style="font-size:.9rem">' + esc(p.descricao || "") + "</p>" +
      '<p style="font-family:Fraunces,Georgia,serif;font-size:1.3rem;margin:6px 0">' + fmt(p.preco) + "</p>" +
      '<div style="display:flex;gap:8px;flex-wrap:wrap"><span class="btn btn-gold btn-sm">Comprar</span><span class="btn btn-primary btn-sm">Pedir no WhatsApp</span></div>' +
    "</div></article>";
}

function centerCropSquare(file, size, cb) {
  const img = new Image();
  img.onload = () => {
    const s = Math.min(img.width, img.height);
    const sx = (img.width - s) / 2, sy = (img.height - s) / 2;
    const c = document.createElement("canvas");
    c.width = c.height = size;
    c.getContext("2d").drawImage(img, sx, sy, s, s, 0, 0, size, size);
    cb(c.toDataURL("image/jpeg", 0.86));
    URL.revokeObjectURL(img.src);
  };
  img.src = URL.createObjectURL(file);
}

function slugId(nome) {
  const base = (nome || "produto").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || "produto";
  let id = base, n = 2;
  const ids = new Set(getStore().produtos.map((p) => p.id));
  while (ids.has(id)) { id = base + "-" + n; n++; }
  return id;
}

/* ——— Categories ——— */
function renderCategorias(el) {
  const cats = listCategorias();
  el.innerHTML =
    '<div class="page-title"><div><h2>Categorias</h2><p>Arraste para reordenar. A ordem vale no catálogo deste navegador.</p></div>' +
    '<button class="btn btn-primary" type="button" id="nova-cat">Nova categoria</button></div>' +
    '<div id="cat-list">' + cats.map(catItem).join("") + "</div>";
  bindCatDrag($("#cat-list"));
  $("#nova-cat").addEventListener("click", () => {
    const nome = prompt("Nome da categoria");
    if (!nome) return;
    updateStore((s) => {
      const id = slugId(nome);
      s.categorias.push({ id: id, nome: nome, descricao: "", imagem: "", ordem: s.categorias.length });
    });
    renderCategorias(el);
  });
}
function catItem(c) {
  return '<div class="cat-item" draggable="true" data-id="' + c.id + '"><span class="handle" aria-hidden="true">⋮⋮</span>' +
    '<input data-catname="' + c.id + '" value="' + esc(c.nome) + '" style="flex:1;border:1px solid var(--line);border-radius:8px;padding:6px 8px;background:var(--surf)">' +
    '<button class="btn btn-danger btn-sm" data-delcat="' + c.id + '">Excluir</button></div>';
}
function bindCatDrag(list) {
  let drag = null;
  list.addEventListener("dragstart", (e) => {
    const it = e.target.closest(".cat-item");
    if (!it) return;
    drag = it; it.style.opacity = ".5";
  });
  list.addEventListener("dragend", () => { if (drag) drag.style.opacity = "1"; drag = null; persistCatOrder(list); });
  list.addEventListener("dragover", (e) => {
    e.preventDefault();
    const over = e.target.closest(".cat-item");
    if (!drag || !over || over === drag) return;
    const items = $$(".cat-item", list);
    const di = items.indexOf(drag), oi = items.indexOf(over);
    if (di < oi) list.insertBefore(drag, over.nextSibling);
    else list.insertBefore(drag, over);
  });
}
function persistCatOrder(list) {
  const ids = $$(".cat-item", list).map((el) => el.getAttribute("data-id"));
  updateStore((s) => {
    ids.forEach((id, i) => {
      const c = s.categorias.find((x) => x.id === id);
      if (c) c.ordem = i;
    });
  });
}

/* ——— Import ——— */
function renderImportar(el) {
  el.innerHTML =
    '<div class="page-title"><div><h2>Importar planilha</h2><p>Envie um CSV ou cole os dados. Depois associe as colunas e confira a prévia.</p></div>' +
    '<a class="btn btn-ghost" id="dl-template" href="#">Baixar modelo CSV</a></div>' +
    '<div class="panel"><div class="field"><label>Arquivo CSV</label><input type="file" id="csv-file" accept=".csv,text/csv"></div>' +
    '<div class="field"><label>Ou cole o conteúdo</label><textarea id="csv-paste" rows="6" placeholder="codigo,nome,categoria,peso,preco"></textarea></div>' +
    '<button class="btn btn-primary" type="button" id="csv-parse">Ler planilha</button></div>' +
    '<div id="csv-map"></div>';
  $("#dl-template").addEventListener("click", (e) => {
    e.preventDefault();
    const csv = "codigo,nome,categoria,linha,peso,preco,descricao,destaque,esgotado\n03050,Nutri Papagaio Mix Castanha,passaros,Linha Super Premium,500g,16.90,Ração premium para papagaios,sim,nao\n";
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "modelo-produtos-nutripassaros.csv";
    a.click();
  });
  const go = () => {
    const file = $("#csv-file").files[0];
    if (file) {
      const r = new FileReader();
      r.onload = () => showCsvMap(el, parseCsv(String(r.result)));
      r.readAsText(file);
    } else showCsvMap(el, parseCsv($("#csv-paste").value));
  };
  $("#csv-parse").addEventListener("click", go);
}

function parseCsv(text) {
  const rows = [];
  let row = [], cur = "", q = false;
  const src = String(text || "").replace(/\r/g, "");
  for (let i = 0; i < src.length; i++) {
    const ch = src[i];
    if (q) {
      if (ch === '"' && src[i + 1] === '"') { cur += '"'; i++; }
      else if (ch === '"') q = false;
      else cur += ch;
    } else if (ch === '"') q = true;
    else if (ch === ",") { row.push(cur); cur = ""; }
    else if (ch === "\n") { row.push(cur); rows.push(row); row = []; cur = ""; }
    else cur += ch;
  }
  if (cur || row.length) { row.push(cur); rows.push(row); }
  if (!rows.length) return { headers: [], rows: [] };
  return { headers: rows[0].map((h) => h.trim()), rows: rows.slice(1).filter((r) => r.some((c) => c && c.trim())) };
}

function showCsvMap(page, data) {
  const box = $("#csv-map", page);
  if (!data.headers.length) { box.innerHTML = "<p>Não foi possível ler o CSV.</p>"; return; }
  const fields = [
    ["codigo", "Código (SKU)"], ["nome", "Nome"], ["categoria", "Categoria (id)"],
    ["linha", "Linha"], ["peso", "Embalagem/peso"], ["preco", "Preço base"],
    ["descricao", "Descrição"], ["destaque", "Destaque (sim/não)"], ["esgotado", "Esgotado (sim/não)"]
  ];
  const guess = (key) => {
    const aliases = { codigo: ["codigo","código","sku","cod"], nome: ["nome","produto","name"], categoria: ["categoria","category"], linha: ["linha"], peso: ["peso","embalagem","gramatura"], preco: ["preco","preço","price","valor"], descricao: ["descricao","descrição","desc"], destaque: ["destaque","featured"], esgotado: ["esgotado","estoque"] };
    const al = aliases[key] || [key];
    const i = data.headers.findIndex((h) => al.indexOf(h.toLowerCase().trim()) !== -1);
    return i >= 0 ? String(i) : "";
  };
  box.innerHTML =
    '<div class="panel" style="margin-top:16px"><h3>Associar colunas</h3>' +
    fields.map(([k, lab]) => {
      const opts = '<option value="">— ignorar —</option>' + data.headers.map((h, i) => '<option value="' + i + '"' + (guess(k) === String(i) ? " selected" : "") + ">" + esc(h) + "</option>").join("");
      return '<div class="map-row"><label>' + esc(lab) + '</label><select data-map="' + k + '">' + opts + "</select></div>";
    }).join("") +
    '<div class="csv-preview" style="margin:12px 0" id="csv-prev"></div>' +
    '<button class="btn btn-primary" type="button" id="csv-import">Importar ' + data.rows.length + " linhas</button></div>";
  const preview = () => {
    const map = {};
    $$("[data-map]", box).forEach((s) => { if (s.value !== "") map[s.getAttribute("data-map")] = Number(s.value); });
    const sample = data.rows.slice(0, 5).map((r) => {
      const o = {};
      Object.keys(map).forEach((k) => { o[k] = r[map[k]] || ""; });
      return o;
    });
    $("#csv-prev", box).innerHTML = "<p>Prévia (5 primeiras linhas)</p><table><thead><tr>" + Object.keys(sample[0] || {}).map((k) => "<th>" + esc(k) + "</th>").join("") + "</tr></thead><tbody>" +
      sample.map((o) => "<tr>" + Object.keys(o).map((k) => "<td>" + esc(o[k]) + "</td>").join("") + "</tr>").join("") + "</tbody></table>";
    box.__map = map;
  };
  $$("[data-map]", box).forEach((s) => s.addEventListener("change", preview));
  preview();
  $("#csv-import", box).addEventListener("click", () => {
    const map = box.__map || {};
    let n = 0;
    updateStore((st) => {
      data.rows.forEach((r) => {
        const get = (k) => (map[k] != null ? String(r[map[k]] || "").trim() : "");
        const nome = get("nome");
        if (!nome) return;
        const yes = (v) => /^(sim|s|yes|true|1|destaque)$/i.test(v);
        const prod = normalizeProduct({
          id: slugId(get("codigo") || nome),
          nome: nome,
          codigo: get("codigo"),
          categoria: get("categoria") || "passaros",
          linha: get("linha"),
          peso: get("peso"),
          preco: Number(String(get("preco")).replace(",", ".")) || 0,
          descricao: get("descricao"),
          featured: yes(get("destaque")),
          esgotado: yes(get("esgotado")),
          imagem: ""
        }, st.produtos.length);
        const i = st.produtos.findIndex((p) => p.codigo && prod.codigo && p.codigo === prod.codigo);
        if (i >= 0) st.produtos[i] = Object.assign({}, st.produtos[i], prod, { id: st.produtos[i].id, imagem: st.produtos[i].imagem });
        else st.produtos.push(prod);
        n++;
      });
    });
    alert(n + " linhas importadas para este navegador (demonstração).");
    navigate("produtos");
  });
}

/* ——— Price tables ——— */
function renderTabelas(el) {
  const s = getStore();
  el.innerHTML =
    '<div class="page-title"><div><h2>Tabelas de preço B2B</h2><p>Varejo, revenda e atacado. O catálogo aceita <code>?tabela=revenda</code>.</p></div></div>' +
    s.tabelas.map((t) => {
      return '<section class="panel" style="margin-bottom:14px"><h3>' + esc(t.nome) + ' <small style="font-weight:600;color:var(--ink-soft)">(?tabela=' + esc(t.id) + ")</small></h3>" +
        '<div class="toolbar"><label>Ajuste % <input type="number" data-ajuste="' + t.id + '" value="' + t.ajuste + '" style="width:90px"></label>' +
        '<label>Pedido mínimo (R$) <input type="number" data-minimo="' + t.id + '" value="' + (t.minimo || 0) + '" style="width:120px"></label>' +
        '<button class="btn btn-primary btn-sm" data-save-tab="' + t.id + '">Salvar tabela</button></div>' +
        '<p style="font-size:.85rem;color:var(--ink-soft)">Deixe o preço em branco para usar o percentual sobre o preço base. Preencha para um preço específico deste item.</p>' +
        '<div style="overflow:auto"><table><thead><tr><th>Código</th><th>Produto</th><th>Base</th><th>Calculado</th><th>Preço desta tabela</th></tr></thead><tbody>' +
        s.produtos.slice(0, 80).map((p) => {
          const calc = precoNaTabela(p, Object.assign({}, t, { precos: {} }));
          const over = t.precos && t.precos[p.id] != null ? t.precos[p.id] : "";
          return "<tr><td>" + esc(p.codigo || "") + "</td><td>" + esc(p.nome) + "</td><td>" + fmt(p.preco) + "</td><td>" + fmt(calc) + '</td><td><input type="number" step="0.01" data-over="' + t.id + '" data-pid="' + p.id + '" value="' + over + '" style="width:110px"></td></tr>';
        }).join("") + "</tbody></table></div></section>";
    }).join("");
}

/* ——— Clients ——— */
function renderClientes(el) {
  const s = getStore();
  const tabs = s.tabelas.map((t) => '<option value="' + t.id + '">' + esc(t.nome) + "</option>").join("");
  el.innerHTML =
    '<div class="page-title"><div><h2>Clientes</h2><p>Cadastros de exemplo e os que você incluir neste navegador.</p></div></div>' +
    '<form id="form-cli" class="panel" style="margin-bottom:16px"><h3>Novo cliente</h3>' +
      '<div class="toolbar"><input name="loja" placeholder="Loja" required><input name="cnpj" placeholder="CNPJ (exemplo)"><select name="tabela">' + tabs + '</select><input name="cidade" placeholder="Cidade"><input name="contato" placeholder="Contato"><button class="btn btn-primary" type="submit">Adicionar</button></div></form>' +
    '<div class="panel" style="overflow:auto"><table><thead><tr><th>Loja</th><th>CNPJ</th><th>Tabela</th><th>Cidade</th><th>Contato</th><th></th></tr></thead><tbody>' +
    s.clientes.map((c) => {
      const tab = (s.tabelas.find((t) => t.id === c.tabela) || {}).nome || c.tabela;
      return "<tr><td>" + esc(c.loja) + (c.exemplo ? ' <span class="badge-demo">Exemplo</span>' : "") + "</td><td>" + esc(c.cnpj) + "</td><td>" + esc(tab) + "</td><td>" + esc(c.cidade || "") + "</td><td>" + esc(c.contato || "") + '</td><td><button class="btn btn-danger btn-sm" data-delcli="' + c.id + '">Excluir</button></td></tr>';
    }).join("") + "</tbody></table></div>";
  $("#form-cli").addEventListener("submit", (ev) => {
    ev.preventDefault();
    const f = ev.target;
    updateStore((st) => {
      st.clientes.push({ id: "c" + Date.now(), loja: f.loja.value, cnpj: f.cnpj.value, tabela: f.tabela.value, cidade: f.cidade.value, contato: f.contato.value, exemplo: false });
    });
    renderClientes(el);
  });
}

/* ——— Orders ——— */
function renderPedidos(el) {
  const s = getStore();
  el.innerHTML =
    '<div class="page-title"><div><h2>Pedidos</h2><p>Pedidos enviados pelo catálogo neste navegador e registros de exemplo.</p></div></div>' +
    '<div class="panel" style="overflow:auto"><table><thead><tr><th>Pedido</th><th>Data</th><th>Cliente</th><th>Tabela</th><th>Itens</th><th>Total</th><th>Status</th></tr></thead><tbody>' +
    (s.pedidos || []).map((p) => {
      const tab = (s.tabelas.find((t) => t.id === p.tabela) || {}).nome || p.tabela;
      return "<tr><td>" + esc(p.id) + (p.exemplo ? ' <span class="badge-demo">Exemplo</span>' : "") + "</td><td>" + esc(p.data) + "</td><td>" + esc(p.cliente) + "</td><td>" + esc(tab) + "</td><td>" + (p.itens || "—") + "</td><td>" + fmt(p.total) + "</td><td>" + esc(p.status) + "</td></tr>";
    }).join("") + "</tbody></table></div>";
}

/* ——— QR ——— */
function renderQR(el) {
  const url0 = catalogAbsUrl();
  el.innerHTML =
    '<div class="page-title"><div><h2>QR do catálogo</h2><p>Gere um código para imprimir e colar na loja. O endereço aponta para o catálogo desta pasta.</p></div>' +
    '<button class="btn btn-primary" type="button" id="qr-print">Imprimir cartão</button></div>' +
    '<div class="grid-2"><div class="panel">' +
      '<div class="field"><label>URL do catálogo</label><input id="qr-url" value="' + esc(url0) + '"></div>' +
      '<div class="field"><label>Tabela (opcional)</label><select id="qr-tab"><option value="">(varejo / nenhuma)</option>' +
        getStore().tabelas.map((t) => '<option value="' + t.id + '">' + esc(t.nome) + "</option>").join("") +
      "</select></div>" +
      '<div class="field"><label>Formato</label><select id="qr-fmt"><option value="a6">Cartão A6</option><option value="a4">Folha A4</option></select></div>' +
      '<button class="btn btn-gold" type="button" id="qr-gen">Gerar QR</button>' +
    '</div><div class="panel"><h3>Pré-visualização</h3><div class="qr-stage" id="qr-stage"></div></div></div>';
  const build = () => {
    let url = $("#qr-url").value.trim() || url0;
    const tab = $("#qr-tab").value;
    if (tab) {
      const u = new URL(url, location.href);
      u.searchParams.set("tabela", tab);
      url = u.href;
    }
    if (typeof qrcode !== "function") { $("#qr-stage").textContent = "Biblioteca de QR indisponível."; return url; }
    const qr = qrcode(0, "M");
    qr.addData(url);
    qr.make();
    $("#qr-stage").innerHTML = qr.createSvgTag(5, 8);
    return url;
  };
  $("#qr-gen").addEventListener("click", build);
  $("#qr-tab").addEventListener("change", build);
  $("#qr-url").addEventListener("change", build);
  build();
  $("#qr-print").addEventListener("click", () => {
    const url = build();
    const fmt = $("#qr-fmt").value;
    const svg = $("#qr-stage").innerHTML;
    $("#print-sheet").innerHTML =
      '<div class="card-' + fmt + '">' +
        '<img src="../img/logo.png" alt="Nutripássaros" style="height:64px;margin:0 auto 12px">' +
        "<h2 style='font-family:Georgia,serif;margin:0 0 8px'>Escaneie e faça seu pedido</h2>" +
        "<p>Catálogo digital Nutripássaros 2025 · Representante Francisco Ferre</p>" +
        '<div style="width:200px;margin:16px auto">' + svg + "</div>" +
        '<p style="font-size:12px;word-break:break-all">' + esc(url) + "</p>" +
        '<p style="font-size:11px;opacity:.7">Demonstração — Catálogo 2025</p>' +
      "</div>";
    window.print();
  });
}

/* ——— Events ——— */
document.addEventListener("click", (ev) => {
  const viewBtn = ev.target.closest("[data-view]");
  if (viewBtn) { navigate(viewBtn.getAttribute("data-view")); return; }
  if (ev.target.closest("[data-open-trial]")) { openTrial(); return; }
  if (ev.target.closest("[data-close-trial]")) {
    closeTrial();
    if (ev.target.closest("[data-enter-after-trial]") && !getSession()) {
      setSession({ email: DEMO_USER.email, nome: (getStore().trial && getStore().trial.nome) || DEMO_USER.nome });
      enterApp();
    }
    return;
  }
  if (ev.target.closest("[data-toggle-side]")) { $("#sidebar").classList.toggle("is-open"); return; }
  if (ev.target.closest("[data-toggle-tema]")) {
    applyTema(document.documentElement.getAttribute("data-tema") === "dark" ? "light" : "dark");
    return;
  }
  if (ev.target.closest("[data-logout]")) { setSession(null); showLogin(true); return; }
  const edit = ev.target.closest("[data-edit]");
  if (edit) { editingId = edit.getAttribute("data-edit"); navigate("produtoForm"); return; }
  if (ev.target.closest("[data-new-prod]")) { editingId = null; navigate("produtoForm"); return; }
  const del = ev.target.closest("[data-del]");
  if (del && confirm("Excluir este produto do catálogo neste navegador?")) {
    const id = del.getAttribute("data-del");
    updateStore((s) => { s.produtos = s.produtos.filter((p) => p.id !== id); });
    navigate("produtos");
    return;
  }
  const delc = ev.target.closest("[data-delcat]");
  if (delc && confirm("Excluir esta categoria?")) {
    const id = delc.getAttribute("data-delcat");
    updateStore((s) => { s.categorias = s.categorias.filter((c) => c.id !== id); });
    navigate("categorias");
    return;
  }
  const delcli = ev.target.closest("[data-delcli]");
  if (delcli) {
    const id = delcli.getAttribute("data-delcli");
    updateStore((s) => { s.clientes = s.clientes.filter((c) => c.id !== id); });
    navigate("clientes");
    return;
  }
  const saveTab = ev.target.closest("[data-save-tab]");
  if (saveTab) {
    const id = saveTab.getAttribute("data-save-tab");
    updateStore((s) => {
      const t = s.tabelas.find((x) => x.id === id);
      if (!t) return;
      t.ajuste = Number($('[data-ajuste="' + id + '"]').value) || 0;
      t.minimo = Number($('[data-minimo="' + id + '"]').value) || 0;
      t.precos = t.precos || {};
      $$('[data-over="' + id + '"]').forEach((inp) => {
        if (inp.value === "") delete t.precos[inp.getAttribute("data-pid")];
        else t.precos[inp.getAttribute("data-pid")] = Number(inp.value);
      });
    });
    alert("Tabela salva neste navegador.");
  }
});

document.addEventListener("change", (ev) => {
  const name = ev.target.getAttribute("data-catname");
  if (name) {
    updateStore((s) => {
      const c = s.categorias.find((x) => x.id === name);
      if (c) c.nome = ev.target.value;
    });
  }
});

$("#form-login").addEventListener("submit", (ev) => {
  ev.preventDefault();
  const email = $("#login-email").value.trim();
  const senha = $("#login-senha").value;
  if (email === DEMO_USER.email && senha === DEMO_USER.senha) {
    $("#login-erro").textContent = "";
    setSession({ email: email, nome: DEMO_USER.nome });
    enterApp();
  } else {
    $("#login-erro").textContent = "Use as credenciais de demonstração: francisco@demo / demo123.";
  }
});

$("#form-trial").addEventListener("submit", (ev) => {
  ev.preventDefault();
  const f = ev.target;
  updateStore((s) => {
    s.trial = {
      nome: f.nome.value.trim(),
      loja: f.loja.value.trim(),
      whatsapp: f.whatsapp.value.trim(),
      email: f.email.value.trim(),
      ativadoEm: new Date().toISOString(),
      dias: 7
    };
  });
  $("#trial-form-wrap").hidden = true;
  $("#trial-ok").hidden = false;
  refreshTrialBadge();
});

document.addEventListener("DOMContentLoaded", () => {
  const store = getStore();
  applyTema(store.tema || "light");
  refreshTrialBadge();
  const params = new URLSearchParams(location.search);
  if (params.get("entrar") === "demo") {
    setSession({ email: DEMO_USER.email, nome: DEMO_USER.nome });
  }
  const hash = (location.hash || "").replace(/^#/, "");
  if (hash && hash !== "login") view = hash;
  if (params.get("trial") === "ativado" || params.get("trial") === "badge") {
    updateStore((s) => {
      if (!s.trial) {
        s.trial = {
          nome: "Francisco Ferre",
          loja: "Pet Shop Demonstração",
          whatsapp: "(11) 98487-1786",
          email: "francisco@demo",
          ativadoEm: new Date().toISOString(),
          dias: 7
        };
      }
    });
  }
  if (getSession()) enterApp();
  else showLogin(true);
  if (params.get("trial") === "ativado") {
    openTrial();
    $("#trial-form-wrap").hidden = true;
    $("#trial-ok").hidden = false;
    refreshTrialBadge();
  } else if (params.get("trial") === "1") {
    openTrial();
  }
});
