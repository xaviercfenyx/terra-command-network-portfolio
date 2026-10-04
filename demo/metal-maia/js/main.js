/* ==========================================================================
   METAL MAIA — comportamento da página (JavaScript puro, sem dependências)
   ÍNDICE
     1. CONFIGURAÇÃO EDITÁVEL  → WhatsApp, contatos do rodapé, catálogo de portões
     2. Utilidades
     3. Cabeçalho, menu mobile e link ativo
     4. Animações de entrada (scroll reveal)
     5. Lightbox (acessível, teclado + swipe)
     6. Catálogo de portões (filtros)
     7. Comparador antes/depois e ângulos
     8. Números (contagem opcional)
     9. Formulário → WhatsApp
    10. Rodapé / dados estruturados / botão flutuante
   ========================================================================== */

/* ==========================================================================
   1. CONFIGURAÇÃO EDITÁVEL
   ========================================================================== */

/* >>> WHATSAPP <<<
   Coloque o número com código do país + DDD, só dígitos. Ex.: "5511999999999".
   Enquanto estiver vazio, o formulário mostra um aviso amigável e nenhum link quebrado é aberto. */
const WHATSAPP_NUMBER = "5511947312604";
const WHATSAPP_NUMBER_2 = "5511986056294";

/* >>> CONTATOS DO RODAPÉ <<<
   Preencha o que tiver; campos vazios continuam aparecendo como [Marcador] no rodapé.
   instagram: apenas o usuário, sem @ (ex.: "metalmaia"). */
const CONTACT = {
  telefone:  "",   // ex.: "(11) 3333-4444"
  whatsapp:  "(11) 94731-2604",
  whatsapp2: "(11) 98605-6294",   // exibição, ex.: "(11) 99999-9999" (o link usa WHATSAPP_NUMBER)
  instagram: "",
  email:     "metalartes.maia@gmail.com",
  endereco:  "Av. José Joaquim Seabra, 810",
  regiao:    "",   // ex.: "Atendemos a cidade X e região"
  horario:   ""    // ex.: "Seg a Sex, 8h às 18h"
};

/* >>> CATÁLOGO DE PORTÕES <<<
   Cada item = 1 foto do catálogo. Para trocar a foto: sobrescreva assets/img/<img>.webp
   (miniatura ~900px de largura) e assets/img/<img>-lg.webp (versão grande ~1600px).
   tags: artisticos | classicos | modernos | residenciais | comerciais | personalizados
   example: true → exibe a etiqueta "Exemplo ilustrativo" (placeholder gerado, não é foto real). */
const GATES = [
  { img: "portao-01", title: "Clássico em ferro trabalhado", style: "Pilares de tijolo aparente", tags: ["classicos", "artisticos", "residenciais"], alt: "Portão clássico em ferro trabalhado entre pilares de tijolo, com entrada arborizada" },
  { img: "portao-02", title: "Ornamental com arabescos",     style: "Ornamental",                  tags: ["artisticos", "classicos", "residenciais"], alt: "Portão ornamental alto em ferro escuro com arabescos e motivos florais" },
  { img: "portao-03", title: "Ornamental em arco de pedra",  style: "Ornamental clássico",         tags: ["artisticos", "classicos"], alt: "Portão ornamental branco com ferro trabalhado sob fachada clássica" },
  { img: "portao-04", title: "Aplicações artísticas sob medida", style: "Personalizado",           tags: ["artisticos", "personalizados", "residenciais"], alt: "Portão preto em arco de pedra com aplicações decorativas artísticas" },
  { img: "portao-05", title: "Arabescos em portão de jardim", style: "Arabescos · chácara",        tags: ["artisticos", "classicos", "residenciais"], alt: "Portão de jardim em ferro com arabescos preso a pilar de pedra" },
  { img: "portao-06", title: "Corações e volutas forjadas",  style: "Arabescos",                   tags: ["artisticos", "classicos"], alt: "Detalhe de portão ornamental com volutas e corações em ferro" },
  { img: "portao-07", title: "Portão com pilares de pedra",  style: "Casa de alto padrão",         tags: ["classicos", "residenciais"], alt: "Portão elegante de ferro entre pilares de pedra e vegetação" },
  { img: "portao-08", title: "Portão e gradil com ponteiras", style: "Casa de alto padrão",        tags: ["classicos", "residenciais", "artisticos"], alt: "Entrada de villa com portão de ferro esbelto, ponteiras e lanternas" },
  { img: "portao-09", title: "Gradil minimalista",           style: "Casa moderna",                tags: ["modernos", "residenciais"], alt: "Casa contemporânea com gradil e portão metálicos pretos de linhas limpas" },
  { img: "portao-10", title: "Linhas horizontais",           style: "Moderno minimalista",         tags: ["modernos", "residenciais"], alt: "Portão moderno em aço com linhas horizontais finas em frente a casa branca" },
  { img: "portao-11", title: "Portão em arco com folhagem",  style: "Residencial",                 tags: ["classicos", "residenciais", "personalizados"], alt: "Portão escuro em arco aplicado em parede branca com folhagem" },
  { img: "portao-12", title: "Portão preto fosco",           style: "Residencial",                 tags: ["residenciais", "personalizados"], alt: "Portão metálico preto de entrada residencial" },
  { img: "portao-13", title: "Portão de correr",             style: "Casa moderna",                tags: ["modernos", "residenciais"], alt: "Portão de correr preto em muro de bloco aparente" },
  { img: "portao-14", title: "Garagem contemporânea",        style: "Casa moderna",                tags: ["modernos", "residenciais"], alt: "Casa moderna de alto padrão com entrada de garagem ampla" },
  { img: "portao-15", title: "Fechamento em aço",            style: "Casa de alto padrão",         tags: ["residenciais", "modernos"], alt: "Residência de alto padrão com gradil escuro de aço na frente" },
  { img: "portao-16", title: "Entrada de chácara",           style: "Chácara",                     tags: ["residenciais"], alt: "Portão de entrada de chácara em frente à casa" },
  { img: "portao-17", title: "Portão rústico de quintal",    style: "Chácara",                     tags: ["residenciais", "personalizados"], alt: "Portão metálico rústico de acesso ao quintal" },
  { img: "portao-18", title: "Portão reforçado",             style: "Rural / comercial",           tags: ["comerciais"], alt: "Portão metálico cinza reforçado em área aberta" },
  { img: "portao-19", title: "Acesso comercial",             style: "Comercial",                   tags: ["comerciais", "modernos"], alt: "Entrada industrial moderna com fechamento metálico escuro" },
  { img: "portao-20", title: "Restauro e releitura",         style: "Personalizado",               tags: ["classicos", "personalizados"], alt: "Portão antigo de ferro com patina, referência para restauro" },
  { img: "portao-21", title: "Portão ripado",                style: "Ripado",                      tags: ["modernos", "residenciais"], alt: "Ilustração de portão ripado em aço escovado com puxador em cobre", example: true },
  { img: "portao-22", title: "Portão geométrico",            style: "Geométrico",                  tags: ["modernos", "artisticos", "personalizados"], alt: "Ilustração de portão com desenho geométrico em losangos", example: true },
  { img: "portao-23", title: "Portão de condomínio",         style: "Condomínio",                  tags: ["residenciais", "comerciais"], alt: "Ilustração de portão de condomínio com grades verticais entre pilares", example: true },
  { img: "portao-24", title: "Portão comercial",             style: "Comercial",                   tags: ["comerciais"], alt: "Ilustração de portão comercial com travamento em X", example: true }
];

/* ==========================================================================
   2. UTILIDADES
   ========================================================================== */
const $  = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const digitsOnly = (s) => String(s || '').replace(/\D+/g, '');

function showToast(message, ms = 6000) {
  const t = $('#toast');
  t.textContent = message;
  t.hidden = false;
  clearTimeout(showToast._t);
  showToast._t = setTimeout(() => { t.hidden = true; }, ms);
}

/* ==========================================================================
   3. CABEÇALHO, MENU MOBILE, LINK ATIVO
   ========================================================================== */
(function header() {
  const header = $('.site-header');
  const toggle = $('.nav-toggle');
  const nav = $('#menu');

  const onScroll = () => header.classList.toggle('is-solid', window.scrollY > 40);
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  const setMenu = (open) => {
    nav.classList.toggle('is-open', open);
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
    document.body.classList.toggle('no-scroll', open);
    if (open) header.classList.add('is-solid');
    else onScroll();
  };
  toggle.addEventListener('click', () => setMenu(!nav.classList.contains('is-open')));
  $$('a', nav).forEach(a => a.addEventListener('click', () => setMenu(false)));
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && nav.classList.contains('is-open')) { setMenu(false); toggle.focus(); } });
  window.matchMedia('(min-width: 1101px)').addEventListener('change', (e) => { if (e.matches) setMenu(false); });

  // Link ativo conforme a seção visível
  const map = {
    inicio: 'inicio', excelencia: 'inicio', especialidades: 'inicio',
    portoes: 'portoes', arte: 'arte', estruturas: 'estruturas', processo: 'estruturas',
    projetos: 'projetos', numeros: 'projetos', sobre: 'sobre', orcamento: 'orcamento'
  };
  const links = $$('[data-nav]', nav);
  const spy = new IntersectionObserver((entries) => {
    entries.forEach(en => {
      if (!en.isIntersecting) return;
      const key = map[en.target.id];
      links.forEach(l => l.classList.toggle('is-current', l.dataset.nav === key));
      links.forEach(l => l.toggleAttribute('aria-current', l.dataset.nav === key));
    });
  }, { rootMargin: '-45% 0px -50% 0px' });
  Object.keys(map).forEach(id => { const el = document.getElementById(id); if (el) spy.observe(el); });
})();

/* ==========================================================================
   4. SCROLL REVEAL (IntersectionObserver) — respeita prefers-reduced-motion
   ========================================================================== */
const revealObserver = ('IntersectionObserver' in window && !prefersReducedMotion)
  ? new IntersectionObserver((entries, obs) => {
      entries.forEach(en => { if (en.isIntersecting) { en.target.classList.add('is-visible'); obs.unobserve(en.target); } });
    }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' })
  : null;
function observeReveal(root = document) {
  $$('.reveal:not(.is-visible)', root).forEach(el => revealObserver ? revealObserver.observe(el) : el.classList.add('is-visible'));
}
observeReveal();

/* ==========================================================================
   5. LIGHTBOX — role="dialog", foco preso, ESC, setas, swipe
   ========================================================================== */
const Lightbox = (function () {
  const root = $('#lightbox');
  const img = $('.lb__img', root);
  const titleEl = $('.lb__title', root);
  const countEl = $('.lb__count', root);
  const btnClose = $('.lb__close', root);
  const btnPrev = $('.lb__prev', root);
  const btnNext = $('.lb__next', root);
  let items = [], index = 0, lastFocus = null, closeTimer = null;

  function show(i) {
    index = (i + items.length) % items.length;
    const it = items[index];
    img.classList.add('is-loading');
    const done = () => img.classList.remove('is-loading');
    img.onload = done; img.onerror = done;
    img.src = it.src;
    img.alt = it.alt || it.caption || '';
    titleEl.textContent = it.caption || '';
    countEl.textContent = items.length > 1 ? `${index + 1} / ${items.length}` : '';
    const multi = items.length > 1;
    btnPrev.hidden = btnNext.hidden = !multi;
    if (img.complete && img.naturalWidth) done();
    // pré-carrega vizinhas
    if (multi) [index + 1, index - 1].forEach(n => { const p = items[(n + items.length) % items.length]; if (p) { const im = new Image(); im.src = p.src; } });
  }
  function open(list, i, trigger) {
    if (!list.length) return;
    items = list; lastFocus = trigger || document.activeElement;
    clearTimeout(closeTimer);
    root.hidden = false;
    root.setAttribute('aria-hidden', 'false');
    document.body.classList.add('no-scroll');
    show(i);
    requestAnimationFrame(() => root.classList.add('is-open'));
    btnClose.focus();
  }
  function close() {
    root.classList.remove('is-open');
    root.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('no-scroll');
    closeTimer = setTimeout(() => { root.hidden = true; img.removeAttribute('src'); }, prefersReducedMotion ? 0 : 350);
    if (lastFocus && lastFocus.focus) lastFocus.focus({ preventScroll: true });
  }
  const isOpen = () => !root.hidden && root.classList.contains('is-open');

  btnClose.addEventListener('click', close);
  btnPrev.addEventListener('click', () => show(index - 1));
  btnNext.addEventListener('click', () => show(index + 1));
  root.addEventListener('click', (e) => { if (e.target === root || e.target.classList.contains('lb__stage') || e.target.classList.contains('lb__fig')) close(); });

  document.addEventListener('keydown', (e) => {
    if (!isOpen()) return;
    if (e.key === 'Escape') { e.preventDefault(); close(); }
    else if (e.key === 'ArrowRight') { e.preventDefault(); show(index + 1); }
    else if (e.key === 'ArrowLeft')  { e.preventDefault(); show(index - 1); }
    else if (e.key === 'Tab') {                         // focus trap
      const f = $$('button:not([hidden])', root);
      if (!f.length) return;
      const first = f[0], last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      else if (!root.contains(document.activeElement)) { e.preventDefault(); first.focus(); }
    }
  });

  // Swipe (toque) — arraste horizontal troca de imagem
  let sx = 0, sy = 0, st = 0;
  root.addEventListener('touchstart', (e) => { const t = e.changedTouches[0]; sx = t.clientX; sy = t.clientY; st = Date.now(); }, { passive: true });
  root.addEventListener('touchend', (e) => {
    const t = e.changedTouches[0], dx = t.clientX - sx, dy = t.clientY - sy;
    if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) * 1.4 && Date.now() - st < 800) show(index + (dx < 0 ? 1 : -1));
  }, { passive: true });

  return { open, close, isOpen };
})();

// Grupos estáticos de imagens (Arte em Ferro, Estruturas, Projetos): data-lightbox-group
$$('[data-lightbox-group]').forEach(group => {
  const btns = $$('.zoomable', group);
  const list = btns.map(b => {
    const im = $('img', b);
    return { src: b.dataset.lbSrc || im.src, alt: im.alt, caption: b.dataset.lbCaption || im.alt };
  });
  btns.forEach((b, i) => {
    b.setAttribute('aria-haspopup', 'dialog');
    b.setAttribute('aria-label', 'Ampliar imagem: ' + (b.dataset.lbCaption || ''));
    b.addEventListener('click', () => Lightbox.open(list, i, b));
  });
});

/* ==========================================================================
   6. CATÁLOGO DE PORTÕES + FILTROS
   ========================================================================== */
(function catalog() {
  const grid = $('#gate-grid');
  const filters = $('#gate-filters');
  const countEl = $('#gate-count');
  if (!grid) return;

  grid.innerHTML = '';
  const nodes = GATES.map((g, i) => {
    const el = document.createElement('article');
    el.className = 'gate reveal';
    el.dataset.tags = g.tags.join(' ');
    el.innerHTML =
      `<button type="button" aria-haspopup="dialog" aria-label="Ampliar: ${g.title}">` +
        `<img src="assets/img/${g.img}.webp" width="900" height="1125" loading="lazy" decoding="async" alt="${g.alt}">` +
        (g.example ? '<span class="gate__badge">Exemplo ilustrativo</span>' : '') +
        '<span class="gate__zoom" aria-hidden="true"></span>' +
        `<span class="gate__cap"><b>${g.title}</b><span>${g.style}</span></span>` +
      '</button>';
    el.querySelector('button').addEventListener('click', (e) => {
      const visible = nodes.filter(n => !n.el.hidden);
      const list = visible.map(n => ({
        src: `assets/img/${n.data.img}-lg.webp`, alt: n.data.alt,
        caption: `${n.data.title} — ${n.data.style}${n.data.example ? ' (exemplo ilustrativo)' : ''}`
      }));
      Lightbox.open(list, visible.findIndex(n => n.el === el), e.currentTarget);
    });
    grid.appendChild(el);
    return { el, data: g };
  });
  observeReveal(grid);

  function updateCount(n, label) {
    countEl.textContent = `${n} ${n === 1 ? 'modelo' : 'modelos'}${label ? ' · ' + label : ''}`;
  }
  updateCount(GATES.length, 'Todos');

  filters.addEventListener('click', (e) => {
    const btn = e.target.closest('.chip');
    if (!btn) return;
    $$('.chip', filters).forEach(c => { const on = c === btn; c.classList.toggle('is-active', on); c.setAttribute('aria-pressed', String(on)); });
    const f = btn.dataset.filter;
    let n = 0;
    nodes.forEach(({ el }) => {
      const match = f === 'todos' || el.dataset.tags.split(' ').includes(f);
      if (match) {
        n++;
        if (el.hidden) { el.hidden = false; el.classList.add('is-hiding'); requestAnimationFrame(() => requestAnimationFrame(() => el.classList.remove('is-hiding'))); }
        else el.classList.remove('is-hiding');
      } else if (!el.hidden) {
        el.classList.add('is-hiding');
        setTimeout(() => { if (el.classList.contains('is-hiding')) el.hidden = true; }, prefersReducedMotion ? 0 : 420);
      }
    });
    // contagem imediata (os ocultos saem após a animação)
    updateCount(n, btn.textContent.trim());
  });
})();

/* ==========================================================================
   7. ANTES/DEPOIS (comparador arrastável) e ÂNGULOS DA MESMA OBRA
   ========================================================================== */
(function compare() {
  const box = $('#compare');
  if (!box) return;
  const range = $('.compare__range', box);
  const set = (v) => box.style.setProperty('--pos', v + '%');
  range.addEventListener('input', () => set(range.value));
  set(range.value);
})();

(function angles() {
  const wrap = $('#angles');
  if (!wrap) return;
  const main = $('#angles-main');
  const tabs = $$('[role="tab"]', wrap);
  tabs.forEach(tab => tab.addEventListener('click', () => {
    tabs.forEach(t => t.setAttribute('aria-selected', String(t === tab)));
    if (prefersReducedMotion) { main.src = tab.dataset.src; main.alt = tab.dataset.alt; return; }
    main.classList.add('is-swapping');
    setTimeout(() => { main.src = tab.dataset.src; main.alt = tab.dataset.alt; main.onload = () => main.classList.remove('is-swapping'); }, 220);
  }));
})();

/* ==========================================================================
   8. NÚMEROS — contagem animada só quando data-count tiver um valor numérico
   ========================================================================== */
(function stats() {
  const els = $$('.stat__value[data-count]').filter(el => /^\d+$/.test(el.dataset.count || ''));
  if (!els.length) return;
  els.forEach(el => { el.textContent = (el.dataset.prefix || '') + el.dataset.count; });   // valor final já no HTML/leitores
  if (prefersReducedMotion || !('IntersectionObserver' in window)) return;
  const io = new IntersectionObserver((entries, obs) => entries.forEach(en => {
    if (!en.isIntersecting) return;
    obs.unobserve(en.target);
    const el = en.target, end = parseInt(el.dataset.count, 10), pre = el.dataset.prefix || '';
    const t0 = performance.now(), dur = 1600;
    (function tick(t) {
      const p = Math.min(1, (t - t0) / dur), e = 1 - Math.pow(1 - p, 3);
      el.textContent = pre + Math.round(end * e);
      if (p < 1) requestAnimationFrame(tick);
    })(t0);
  }), { threshold: 0.6 });
  els.forEach(el => io.observe(el));
})();

/* ==========================================================================
   9. FORMULÁRIO → WHATSAPP
   ========================================================================== */
function whatsappUrl(text) {
  const n = digitsOnly(WHATSAPP_NUMBER);
  return n ? `https://wa.me/${n}?text=${encodeURIComponent(text)}` : '';
}

(function quoteForm() {
  const form = $('#quote-form');
  if (!form) return;
  const notice = $('#wa-notice');
  const errorBox = $('#form-error');
  const fileInput = $('#f-file');
  const fileList = $('#file-list');
  const select = $('#f-tipo');

  // Cartões de especialidade pré-selecionam o tipo de projeto
  $$('[data-project]').forEach(a => a.addEventListener('click', () => {
    const v = a.dataset.project;
    const opt = Array.from(select.options).find(o => o.value === v || o.textContent === v);
    if (opt) select.value = opt.value || opt.textContent;
  }));

  // Prévia dos arquivos escolhidos (nome + miniatura)
  let urls = [];
  fileInput.addEventListener('change', () => {
    urls.forEach(u => URL.revokeObjectURL(u)); urls = [];
    fileList.innerHTML = '';
    Array.from(fileInput.files).forEach(f => {
      const li = document.createElement('li');
      const kb = f.size > 1048576 ? (f.size / 1048576).toFixed(1) + ' MB' : Math.max(1, Math.round(f.size / 1024)) + ' KB';
      if (f.type.startsWith('image/')) {
        const u = URL.createObjectURL(f); urls.push(u);
        const im = document.createElement('img'); im.src = u; im.alt = ''; li.appendChild(im);
      } else {
        const d = document.createElement('span'); d.className = 'pdf'; d.textContent = (f.name.split('.').pop() || 'arq').slice(0, 4).toUpperCase(); li.appendChild(d);
      }
      const s = document.createElement('span'); s.className = 'n'; s.textContent = `${f.name} (${kb})`; li.appendChild(s);
      fileList.appendChild(li);
    });
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    notice.hidden = true; errorBox.hidden = true;
    const data = Object.fromEntries(new FormData(form).entries());
    const nome = (data.nome || '').trim(), tel = (data.telefone || '').trim();

    $$('.is-invalid', form).forEach(el => el.classList.remove('is-invalid'));
    const missing = [];
    if (!nome) { missing.push('nome'); $('#f-nome').classList.add('is-invalid'); }
    if (digitsOnly(tel).length < 8) { missing.push('telefone / WhatsApp'); $('#f-tel').classList.add('is-invalid'); }
    if (missing.length) {
      errorBox.textContent = 'Por favor, preencha: ' + missing.join(' e ') + '.';
      errorBox.hidden = false;
      ($('.is-invalid', form) || form).focus();
      return;
    }

    const nFiles = fileInput.files.length;
    const lines = [
      'Olá, Metal Maia! Gostaria de solicitar um orçamento.',
      '',
      `*Nome:* ${nome}`,
      `*Telefone / WhatsApp:* ${tel}`,
      data.cidade && data.cidade.trim() ? `*Cidade:* ${data.cidade.trim()}` : '',
      data.tipo ? `*Tipo de projeto:* ${data.tipo}` : '',
      data.mensagem && data.mensagem.trim() ? `*Mensagem:* ${data.mensagem.trim()}` : '',
      nFiles ? `\nTenho ${nFiles} foto(s)/referência(s) para enviar aqui na conversa.` : ''
    ].filter((l, i, arr) => l !== '' || (i > 0 && arr[i - 1] !== ''));
    const url = whatsappUrl(lines.join('\n'));

    if (!url) {                       // número ainda não configurado
      notice.hidden = false;
      notice.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth', block: 'center' });
      return;
    }
    const w = window.open(url, '_blank', 'noopener');
    if (!w) window.location.href = url;
  });
})();

/* ==========================================================================
   10. RODAPÉ, SCHEMA.ORG E BOTÃO FLUTUANTE
   ========================================================================== */
(function footerAndMeta() {
  $('#year').textContent = new Date().getFullYear();

  // Preenche os contatos do rodapé a partir de CONTACT
  const fillers = {
    telefone:  (v) => `<a href="tel:+${digitsOnly(v).replace(/^55(?=\d{10,11}$)/, '55')}">${v}</a>`,
    whatsapp:  (v) => { const n = digitsOnly(WHATSAPP_NUMBER); return n ? `<a href="https://wa.me/${n}" target="_blank" rel="noopener">${v}</a>` : v; },
    whatsapp2: (v) => `<a href="https://wa.me/${digitsOnly(WHATSAPP_NUMBER_2)}" target="_blank" rel="noopener">${v}</a>`,
    instagram: (v) => { const u = v.replace(/^@/, ''); return `<a href="https://instagram.com/${u}" target="_blank" rel="noopener">@${u}</a>`; },
    email:     (v) => `<a href="mailto:${v}">${v}</a>`
  };
  $$('[data-contact]').forEach(el => {
    const key = el.dataset.contact, v = (CONTACT[key] || '').trim();
    if (!v) return;
    el.classList.remove('ph');
    el.innerHTML = fillers[key] ? fillers[key](v) : v.replace(/[<>&]/g, c => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;' }[c]));
  });

  // Enriquece o JSON-LD apenas com dados reais (URL/logo da página e contatos preenchidos)
  try {
    const s = $('#ld-json'), ld = JSON.parse(s.textContent);
    if (/^https?:$/.test(location.protocol)) {
      ld.url = location.origin + location.pathname.replace(/index\.html$/, '');
      ld.logo = new URL('assets/logo-full.webp', location.href).href;
      ld.image = new URL('assets/img/hero-portao.webp', location.href).href;
    }
    if (CONTACT.telefone) ld.telephone = CONTACT.telefone;
    if (CONTACT.email) ld.email = CONTACT.email;
    if (CONTACT.endereco) ld.address.streetAddress = CONTACT.endereco;
    if (CONTACT.regiao) ld.areaServed = CONTACT.regiao;
    if (CONTACT.horario) ld.openingHours = CONTACT.horario;
    if (CONTACT.instagram) ld.sameAs = ['https://instagram.com/' + CONTACT.instagram.replace(/^@/, '')];
    s.textContent = JSON.stringify(ld);
  } catch (err) { /* sem JSON-LD válido: ignora */ }

  // Botão flutuante do WhatsApp
  const fab = $('#wa-float');
  const url = whatsappUrl('Olá, Metal Maia! Gostaria de solicitar um orçamento.');
  if (url) {
    fab.href = url; fab.target = '_blank'; fab.rel = 'noopener';
  } else {
    fab.addEventListener('click', () => showToast('O WhatsApp da Metal Maia ainda não foi configurado (veja WHATSAPP_NUMBER em js/main.js). Enquanto isso, use o formulário.'));
  }
})();
