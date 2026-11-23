/* =====================================================================
   CONFIGURAÇÃO
   WHATSAPP_NUMBER: número que recebe os pedidos (formato internacional,
   só dígitos: 55 + DDD + número).
   >>> SUBSTITUA pelo número real do Francisco (representante) antes de publicar. <<<
   ===================================================================== */
const WHATSAPP_NUMBER = '5511984871786';
const REP_NAME = 'Francisco';
const PAGE_SIZE = 36;            // produtos renderizados por vez (lazy rendering)
const STORAGE_KEY = 'np_pedido_v1';

(function () {
  'use strict';
  const PRODUCTS = (window.NP_PRODUCTS || []);
  const byId = new Map(PRODUCTS.map(p => [p.id, p]));
  const $ = s => document.querySelector(s);
  const brl = v => 'R$ ' + v.toFixed(2).replace('.', ',').replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  const norm = s => (s || '').toString().normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
  const codeLabel = p => p.code ? p.code : 'S/ CÓD';
  const itemLine = (p, q) => `${q} x ${codeLabel(p)} - ${p.name}${p.packaging ? ' - ' + p.packaging : ''}`;

  /* ---------- categorias / placeholders ---------- */
  const CATS = [
    ['Pássaros', '#2e6b3d', '#f4c430', '<path d="M14 38c4-13 15-19 28-17-4 3-6 6-7 10 5 0 8 2 10 5-10 3-21 4-31 2z" fill="#fff"/><circle cx="37" cy="26" r="1.8" fill="#2e6b3d"/>'],
    ['Cães e Gatos', '#8a4b2a', '#f2b880', '<ellipse cx="32" cy="38" rx="9" ry="7" fill="#fff"/><circle cx="20" cy="27" r="4" fill="#fff"/><circle cx="28" cy="21" r="4" fill="#fff"/><circle cx="36" cy="21" r="4" fill="#fff"/><circle cx="44" cy="27" r="4" fill="#fff"/>'],
    ['Roedores', '#7a5c3e', '#e8cfa6', '<ellipse cx="34" cy="36" rx="14" ry="10" fill="#fff"/><circle cx="22" cy="28" r="5" fill="#fff"/><circle cx="46" cy="36" r="1.6" fill="#7a5c3e"/>'],
    ['Aquarismo', '#1d6fa3', '#9fd3f0', '<path d="M14 32c6-8 18-10 26-2l8-6v16l-8-6c-8 8-20 6-26-2z" fill="#fff"/><circle cx="22" cy="31" r="1.6" fill="#1d6fa3"/>'],
    ['Piscina', '#0e7c8c', '#a7e3ea', '<path d="M10 36c4 0 4 3 8 3s4-3 8-3 4 3 8 3 4-3 8-3 4 3 8 3M10 44c4 0 4 3 8 3s4-3 8-3 4 3 8 3 4-3 8-3 4 3 8 3" stroke="#fff" stroke-width="3" fill="none" stroke-linecap="round"/><circle cx="32" cy="22" r="6" fill="#fff"/>'],
    ['Pets – Higiene e Acessórios', '#6b4fa0', '#d6c8f0', '<rect x="22" y="18" width="20" height="30" rx="6" fill="#fff"/><rect x="27" y="12" width="10" height="7" rx="2" fill="#fff"/><circle cx="32" cy="34" r="4" fill="#6b4fa0"/>'],
    ['Jardinagem e Controle de Pragas', '#4a7a1e', '#cfe8a8', '<path d="M32 50V28" stroke="#fff" stroke-width="3" stroke-linecap="round"/><path d="M32 32c-10 0-14-8-14-14 8 0 14 4 14 14zM32 28c0-9 6-14 14-14 0 7-4 14-14 14z" fill="#fff"/>'],
    ['Medicamentos Veterinários', '#b0343a', '#f5c2c4', '<rect x="16" y="26" width="32" height="12" rx="6" fill="#fff"/><rect x="28" y="14" width="8" height="36" rx="3" fill="#fff" opacity=".55"/><path d="M32 22v20M22 32h20" stroke="#b0343a" stroke-width="0"/><path d="M29 29h6M32 26v6" stroke="#b0343a" stroke-width="2.5" stroke-linecap="round"/>']
  ];
  const CAT_MAP = new Map(CATS.map(c => [c[0], c]));
  function phHTML(cat) {
    const c = CAT_MAP.get(cat) || ['', '#2e6b3d', '#cfe3d4', ''];
    return `<div class="ph" style="background:linear-gradient(135deg,${c[1]} 0%,${c[1]}cc 55%,${c[2]} 140%)"><svg viewBox="0 0 64 64" aria-hidden="true">${c[3]}</svg><span class="ph-txt">Foto indisponível</span></div>`;
  }
  function thumbHTML(p) {
    const cat = p.category;
    const tag = `<span class="cat-tag">${esc(cat)}</span>`;
    if (!p.image) return `<div class="thumb no-img">${phHTML(cat)}${tag}</div>`;
    const small = p.image.replace(/\.webp$/, '-300.webp');
    return `<div class="thumb"><img src="${esc(p.image)}" srcset="${esc(small)} 300w, ${esc(p.image)} 600w" sizes="(min-width:900px) 160px, 104px" width="600" height="600" loading="lazy" decoding="async" alt="${esc(p.name + (p.packaging ? ' – ' + p.packaging : ''))}">${tag}</div>`;
  }
  /* foto que falhar ao carregar vira o placeholder da categoria */
  document.addEventListener('error', e => {
    const img = e.target;
    if (!(img instanceof HTMLImageElement) || !img.closest('.thumb')) return;
    const th = img.closest('.thumb'); const card = img.closest('.card');
    const p = card && PRODUCTS.find(x => x.id === card.dataset.id);
    img.remove(); th.classList.add('no-img'); th.insertAdjacentHTML('afterbegin', phHTML(p ? p.category : ''));
  }, true);
  function esc(s) { return (s == null ? '' : String(s)).replace(/[&<>"']/g, ch => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[ch])); }

  /* ---------- índice de busca ---------- */
  PRODUCTS.forEach(p => { p._s = norm([p.code, p.name, p.packaging, p.family, p.subcategory, p.category].join(' ')); });

  /* ---------- estado ---------- */
  const state = { q: '', cat: '', sub: '', shown: 0, list: [] };
  let cart = load();
  function load() { try { const v = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}'); return { items: v.items || {}, name: v.name || '', store: v.store || '' }; } catch (e) { return { items: {}, name: '', store: '' }; } }
  function save() { try { localStorage.setItem(STORAGE_KEY, JSON.stringify(cart)); } catch (e) { } }

  /* ---------- filtros ---------- */
  function counts(list) { const m = {}; list.forEach(p => m[p.category] = (m[p.category] || 0) + 1); return m; }
  function renderChips() {
    const base = state.q ? PRODUCTS.filter(matchQ) : PRODUCTS;
    const c = counts(base);
    const chips = [['', 'Todos', base.length]].concat(CATS.map(x => [x[0], x[0], c[x[0]] || 0]));
    $('#chips').innerHTML = chips.map(([v, l, n]) => `<button class="chip" role="tab" data-cat="${esc(v)}" aria-selected="${state.cat === v}">${esc(l)} <span class="n">${n}</span></button>`).join('');
  }
  function renderSub() {
    const sel = $('#subFilter');
    if (!state.cat) { sel.hidden = true; state.sub = ''; return; }
    const subs = [...new Set(PRODUCTS.filter(p => p.category === state.cat && p.subcategory).map(p => p.subcategory))];
    if (!subs.length) { sel.hidden = true; state.sub = ''; return; }
    sel.hidden = false;
    sel.innerHTML = `<option value="">Todas as linhas</option>` + subs.map(s => `<option ${s === state.sub ? 'selected' : ''}>${esc(s)}</option>`).join('');
  }
  let tokens = [];
  function matchQ(p) { return tokens.every(t => p._s.includes(t)); }
  function applyFilters() {
    tokens = norm(state.q).split(/\s+/).filter(Boolean);
    state.list = PRODUCTS.filter(p => (!state.cat || p.category === state.cat) && (!state.sub || p.subcategory === state.sub) && (!tokens.length || matchQ(p)));
    // código exato primeiro
    if (tokens.length === 1 && /^\d{3,6}$/.test(tokens[0])) state.list.sort((a, b) => (b.code === tokens[0]) - (a.code === tokens[0]));
    state.shown = 0;
    $('#grid').innerHTML = '';
    $('#resultCount').textContent = `${state.list.length} produto${state.list.length === 1 ? '' : 's'}`;
    $('#empty').hidden = state.list.length > 0;
    renderChips();
    renderMore();
  }
  function renderMore() {
    const slice = state.list.slice(state.shown, state.shown + PAGE_SIZE);
    const frag = document.createElement('div');
    frag.innerHTML = slice.map(cardHTML).join('');
    const grid = $('#grid');
    while (frag.firstChild) grid.appendChild(frag.firstChild);
    state.shown += slice.length;
    $('#loadMore').hidden = state.shown >= state.list.length;
  }
  function cardHTML(p) {
    const inCart = cart.items[p.id];
    return `<article class="card" data-id="${p.id}">
      ${thumbHTML(p)}
      <div class="card-body">
        <span class="code ${p.code ? '' : 'nocode'}" title="Código do produto">${p.code ? 'Cód. ' + esc(p.code) : 'Sem código'}</span>
        <h3 class="pname">${esc(p.name)}</h3>
        <div class="meta">${p.packaging ? `<span class="pack">${esc(p.packaging)}</span>` : ''}<span>${esc(p.subcategory || p.category)}</span></div>
        ${p.description ? `<p class="desc">${esc(p.description)}</p>` : ''}
        <div class="price-row"><span class="price">${brl(p.demoPrice)}</span><span class="price-tag">preço demonstrativo</span></div>
        <div class="actions">
          <div class="qty"><button type="button" data-act="dec" aria-label="Diminuir">−</button><input type="number" min="1" max="9999" value="1" inputmode="numeric" aria-label="Quantidade"><button type="button" data-act="inc" aria-label="Aumentar">+</button></div>
          <button type="button" class="btn-buy ${inCart ? 'added' : ''}" data-act="buy">${inCart ? 'Comprar +' : 'Comprar'}</button>
          <button type="button" class="btn-quote" data-act="quote">Orçamento</button>
        </div>
      </div>
    </article>`;
  }

  /* ---------- WhatsApp ---------- */
  function waUrl(msg) { return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`; }
  function openWa(msg) {
    const url = waUrl(msg);
    window.__npLastWaUrl = url;   // usado nos testes automatizados
    const w = window.open(url, '_blank');
    if (w) { try { w.opener = null; } catch (e) { } } else { location.href = url; }
    return url;
  }
  function custLines() {
    const l = [];
    if (cart.name.trim()) l.push(`Cliente: ${cart.name.trim()}`);
    if (cart.store.trim()) l.push(`Loja: ${cart.store.trim()}`);
    return l;
  }
  function buildOrderMessage() {
    const ids = Object.keys(cart.items).filter(id => byId.has(id));
    let total = 0;
    const lines = ids.map(id => {
      const p = byId.get(id), q = cart.items[id], sub = p.demoPrice * q; total += sub;
      return `• ${itemLine(p, q)} | unit. ${brl(p.demoPrice)} | subtotal ${brl(sub)}`;
    });
    const head = [`Olá, ${REP_NAME}! Gostaria de fazer um pedido pelo catálogo digital Nutripássaros.`];
    const cl = custLines();
    return [...head, '', ...(cl.length ? [...cl, ''] : []), 'Itens:', ...lines, '',
      `Total estimado: ${brl(total)} (valores demonstrativos)`, '',
      'Por favor, confirme preço e disponibilidade. Obrigado!'].join('\n');
  }
  function buildQuoteMessage(p, q) {
    const cl = custLines();
    return [`Olá, ${REP_NAME}! Gostaria de um orçamento (preço e disponibilidade) do item abaixo, do catálogo digital Nutripássaros:`, '',
      itemLine(p, q), '', ...(cl.length ? [...cl, ''] : []), 'Obrigado!'].join('\n');
  }
  window.NP = { buildOrderMessage, buildQuoteMessage, waUrl, WHATSAPP_NUMBER };

  /* ---------- lista de pedido ---------- */
  function cartCount() { return Object.values(cart.items).reduce((a, b) => a + b, 0); }
  function renderCart() {
    const ids = Object.keys(cart.items).filter(id => byId.has(id));
    let total = 0;
    $('#cartList').innerHTML = ids.map(id => {
      const p = byId.get(id), q = cart.items[id], sub = p.demoPrice * q; total += sub;
      return `<li class="cart-item" data-id="${id}">
        <div><div class="ci-name">${esc(p.name)}</div><div class="ci-meta">${p.code ? 'Cód. ' + esc(p.code) : 'Sem código'}${p.packaging ? ' · ' + esc(p.packaging) : ''}</div></div>
        <div class="ci-right"><div class="ci-meta">${brl(p.demoPrice)} un.*</div><div class="ci-sub">${brl(sub)}</div></div>
        <div class="ci-controls"><div class="qty"><button type="button" data-act="cdec" aria-label="Diminuir">−</button><input type="number" min="1" max="9999" value="${q}" data-act="cset" aria-label="Quantidade"><button type="button" data-act="cinc" aria-label="Aumentar">+</button></div><button class="ci-remove" data-act="crem">Remover</button></div>
      </li>`;
    }).join('');
    $('#cartEmpty').hidden = ids.length > 0;
    $('#cartTotal').textContent = brl(total);
    $('#cartCount').textContent = cartCount();
    $('#sendOrder').disabled = ids.length === 0;
  }
  function setQty(id, q) { q = Math.max(0, Math.min(9999, parseInt(q, 10) || 0)); if (q === 0) delete cart.items[id]; else cart.items[id] = q; save(); renderCart(); syncCardButtons(id); }
  function syncCardButtons(id) { const b = document.querySelector(`.card[data-id="${id}"] .btn-buy`); if (b) { const on = !!cart.items[id]; b.classList.toggle('added', on); b.textContent = on ? 'Comprar +' : 'Comprar'; } }
  function openCart() { $('#drawer').classList.add('open'); $('#drawer').setAttribute('aria-hidden', 'false'); $('#overlay').hidden = false; }
  function closeCart() { $('#drawer').classList.remove('open'); $('#drawer').setAttribute('aria-hidden', 'true'); $('#overlay').hidden = true; }
  let tt; function toast(m) { const t = $('#toast'); t.textContent = m; t.classList.add('show'); clearTimeout(tt); tt = setTimeout(() => t.classList.remove('show'), 1800); }

  /* ---------- eventos ---------- */
  let deb;
  $('#search').addEventListener('input', e => { state.q = e.target.value; $('#clearSearch').hidden = !state.q; clearTimeout(deb); deb = setTimeout(applyFilters, 120); });
  $('#clearSearch').addEventListener('click', () => { $('#search').value = ''; state.q = ''; $('#clearSearch').hidden = true; applyFilters(); $('#search').focus(); });
  $('#chips').addEventListener('click', e => { const b = e.target.closest('.chip'); if (!b) return; state.cat = b.dataset.cat; state.sub = ''; renderSub(); applyFilters(); });
  $('#subFilter').addEventListener('change', e => { state.sub = e.target.value; applyFilters(); });
  $('#loadMore').addEventListener('click', renderMore);
  if ('IntersectionObserver' in window) new IntersectionObserver(es => { if (es[0].isIntersecting && state.shown < state.list.length) renderMore(); }, { rootMargin: '600px' }).observe($('#sentinel'));

  $('#grid').addEventListener('click', e => {
    const btn = e.target.closest('button[data-act]'); if (!btn) return;
    const card = btn.closest('.card'), id = card.dataset.id, p = byId.get(id), inp = card.querySelector('.qty input');
    const q = Math.max(1, Math.min(9999, parseInt(inp.value, 10) || 1));
    if (btn.dataset.act === 'inc') inp.value = Math.min(9999, q + 1);
    else if (btn.dataset.act === 'dec') inp.value = Math.max(1, q - 1);
    else if (btn.dataset.act === 'buy') { setQty(id, (cart.items[id] || 0) + q); inp.value = 1; toast(`${q} x ${p.name} adicionado ao pedido`); }
    else if (btn.dataset.act === 'quote') openWa(buildQuoteMessage(p, q));
  });
  $('#cartList').addEventListener('click', e => {
    const btn = e.target.closest('button[data-act]'); if (!btn) return;
    const id = btn.closest('.cart-item').dataset.id, q = cart.items[id] || 0;
    if (btn.dataset.act === 'cinc') setQty(id, q + 1);
    else if (btn.dataset.act === 'cdec') setQty(id, Math.max(1, q - 1));
    else if (btn.dataset.act === 'crem') setQty(id, 0);
  });
  $('#cartList').addEventListener('change', e => { if (e.target.dataset.act === 'cset') { const id = e.target.closest('.cart-item').dataset.id; setQty(id, Math.max(1, parseInt(e.target.value, 10) || 1)); } });
  $('#custName').addEventListener('input', e => { cart.name = e.target.value; save(); });
  $('#storeName').addEventListener('input', e => { cart.store = e.target.value; save(); });
  $('#openCart').addEventListener('click', openCart);
  $('#closeCart').addEventListener('click', closeCart);
  $('#overlay').addEventListener('click', closeCart);
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeCart(); });
  $('#sendOrder').addEventListener('click', () => { if (Object.keys(cart.items).length) openWa(buildOrderMessage()); });
  $('#clearCart').addEventListener('click', () => { if (confirm('Limpar todos os itens da lista?')) { const ids = Object.keys(cart.items); cart.items = {}; save(); renderCart(); ids.forEach(syncCardButtons); } });
  $('#waFloat').addEventListener('click', e => { e.preventDefault(); openWa(Object.keys(cart.items).length ? buildOrderMessage() : `Olá, ${REP_NAME}! Vim pelo catálogo digital Nutripássaros e gostaria de atendimento.`); });
  $('#emptyQuote').addEventListener('click', () => openWa(`Olá, ${REP_NAME}! Procurei no catálogo digital Nutripássaros por "${state.q}" e não encontrei. Vocês trabalham com esse produto?`));

  /* ---------- init ---------- */
  $('#custName').value = cart.name; $('#storeName').value = cart.store;
  renderSub(); applyFilters(); renderCart();
})();
