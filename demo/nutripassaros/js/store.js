/* Estado compartilhado (localStorage) entre catálogo e painel.
   Caminhos de imagem sempre relativos à raiz do site (img/...). */

const STORE_KEY = "nutripassaros-demo-store";
const SESSION_KEY = "nutripassaros-demo-session";
/* Login FICTÍCIO de demonstração: não é autenticação real. Credenciais públicas, sem valor fora deste protótipo. */
const DEMO_USER = { email: "francisco@demo", senha: "demo123", nome: "Francisco Ferre" };
const STORE_VERSION = 5;
/* Preços-base do seed v3 (para saber se o representante editou o valor). */
const PRECOS_SEED_V3 = {"papagaio-mix": 16.9, "papagaio-frutas": 22.9, "psita-grande": 24.9, "calopsita-sp": 14.9, "canario": 12.9, "nativos": 15.9, "curio-azulao": 16.9, "papagaio-torneio": 18.9, "calopsita-torneio": 14.9, "oleosa-corr": 17.9, "pixarro-frutas": 17.9, "farinhada-calopsita": 16.9, "barrinha-calopsita-frutas": 6.9, "barrinha-canario": 6.9, "nectar": 12.9, "papinha": 13.9, "nutri-chinchila": 33.9, "nutri-hamster-500": 9.9, "nutri-hamster-10kg": 99.9, "funny-bunny-500": 18.9, "serragem-fina": 6.9, "serragem-prensada": 14.9, "colosso-filhotes-carne": 119.9, "colosso-filhotes-frango": 119.9, "colosso-racpeq-carne": 154.9, "colosso-adultos-carne": 149.9, "colosso-gato-salmao": 119.9, "colosso-gato-castrado-salmao": 129.9, "felismax-10": 99.9, "felismax-20": 179.9, "pate-adulto-carne": 9.9, "pate-gato-carne": 9.9, "molho-churrasco": 9.9, "bifitos-carne": 6.9, "bifitos-churrasco": 6.9, "cantolindo-calcio": 18.9, "cantolindo-antibiotico": 19.9, "cantolindo-antitoxico": 21.9, "matacura-sabonete": 16.5, "matacura-shampoo": 24.9, "matacura-shampoo-neutro": 24.9, "matacura-condic": 25.9, "ninho-manon": 16.9, "ninho-periquito": 18.9, "gaiola-triangular": 89.9, "seringa": 7.9, "serragem-psitacideos": 8.9, "mata-mato-1l": 24.9, "mata-pulgas": 29.9, "sempre-verde-killer": 14.9, "sempre-verde-neem": 16.9, "sempre-verde-foliar": 12.9, "adubo-04-14-08": 14.9, "adubo-10-10-10": 18.9, "semente-alface-mimosa": 5.9, "semente-almeirao": 5.9, "semente-cenoura": 5.9, "semente-coentro": 5.9, "semente-cebola": 5.9, "alcon-basic": 16.9, "alcon-bettamix": 15.9, "alcon-bottom": 22.9, "alcon-colours": 18.9};
/* Preços de exemplo (v1/v2) — demonstrativos, não oficiais. São mantidos na migração v3;
   valores editados pelo representante também são preservados. */
const PRODUTOS_NOMES_V2 = {"funny-bunny-500": "Funny Bunny", "bifitos-carne": "Bifitos Colosso Carne", "matacura-sabonete": "Sabonete Matacura Sarnicida e Anti-pulgas", "matacura-shampoo": "Shampoo Matacura", "seringa": "Seringa Plástica para Pássaros MS Pet", "sempre-verde-neem": "Sempre Verde Neem", "adubo-04-14-08": "Adubo 04-14-08 Sempre Verde", "adubo-10-10-10": "Adubo 10-10-10 Sempre Verde", "semente-cenoura": "Semente Cenoura Brasília", "semente-cebola": "Semente Cebola Baia"};
const PRECOS_LEGADO = {"papagaio-frutas": 22.9, "psita-grande": 24.9, "calopsita-sp": 14.9, "canario": 12.9, "nativos": 15.9, "curio-azulao": 16.9, "papagaio-torneio": 18.9, "calopsita-torneio": 14.9, "oleosa-corr": 17.9, "pixarro-frutas": 17.9, "farinhada-calopsita": 16.9, "barrinha-calopsita-frutas": 6.9, "barrinha-canario": 6.9, "nectar": 12.9, "papinha": 13.9, "nutri-chinchila": 33.9, "nutri-hamster-500": 9.9, "nutri-hamster-10kg": 99.9, "funny-bunny-500": 18.9, "serragem-fina": 6.9, "serragem-prensada": 14.9, "colosso-filhotes-carne": 119.9, "colosso-filhotes-frango": 119.9, "colosso-racpeq-carne": 154.9, "colosso-adultos-carne": 149.9, "colosso-gato-salmao": 119.9, "colosso-gato-castrado-salmao": 129.9, "felismax-10": 99.9, "felismax-20": 179.9, "pate-adulto-carne": 9.9, "pate-gato-carne": 9.9, "molho-churrasco": 9.9, "bifitos-carne": 6.9, "bifitos-churrasco": 6.9, "cantolindo-calcio": 18.9, "cantolindo-antibiotico": 19.9, "cantolindo-antitoxico": 21.9, "matacura-sabonete": 16.5, "matacura-shampoo": 24.9, "matacura-shampoo-neutro": 24.9, "matacura-condic": 25.9, "ninho-manon": 16.9, "ninho-periquito": 18.9, "gaiola-triangular": 89.9, "seringa": 7.9, "serragem-psitacideos": 8.9, "mata-mato-1l": 24.9, "mata-pulgas": 29.9, "sempre-verde-killer": 14.9, "sempre-verde-neem": 16.9, "sempre-verde-foliar": 12.9, "adubo-04-14-08": 14.9, "adubo-10-10-10": 18.9, "semente-alface-mimosa": 5.9, "semente-almeirao": 5.9, "semente-cenoura": 5.9, "semente-coentro": 5.9, "semente-cebola": 5.9, "alcon-basic": 16.9, "alcon-bettamix": 15.9, "alcon-bottom": 22.9, "alcon-colours": 18.9, "papagaio-mix": 16.9};

/* Mapa de imagens antigas -> novas (v2). Só troca se o produto ainda usa a imagem antiga de fábrica;
   imagens enviadas pelo representante (data:/blob:/outras) são preservadas. */
const LEGACY_CAT_IMG = {
  "img/cat-passaros.webp": "img/cat/passaros.webp", "img/cat-roedores.webp": "img/cat/roedores.webp",
  "img/cat-caes.webp": "img/cat/caes-gatos.webp", "img/cat-vet.webp": "img/cat/veterinarios.webp",
  "img/cat-acessorios.webp": "img/cat/acessorios.webp", "img/cat-jardinagem.webp": "img/cat/jardinagem.webp",
  "img/cat-horta.webp": "img/cat/sementes.webp", "img/cat-aquarismo.webp": "img/cat/aquarismo.webp"
};
function migrateImagePath(path) {
  if (!path) return path;
  const clean = String(path).replace(/^\.\.\//, "");
  const m = clean.match(/^img\/produtos\/([a-z0-9\-]+)\.webp$/i);
  if (m) return "img/p/" + m[1] + ".webp";
  if (LEGACY_CAT_IMG[clean]) return LEGACY_CAT_IMG[clean];
  return path;
}
function migrateStore(store) {
  const v = store.versao || 1;
  if (v >= STORE_VERSION) return false;
  if (v < 2) {
    (store.produtos || []).forEach((p) => {
      p.imagem = migrateImagePath(p.imagem);
      if (!p.imagem && typeof PRODUTOS !== "undefined") {
        const seed = PRODUTOS.find((s) => s.id === p.id);
        if (seed) p.imagem = seed.imagem;
      }
    });
    (store.categorias || []).forEach((c) => { c.imagem = migrateImagePath(c.imagem); });
  }
  if (v < 3) {
    /* v3: dados conferidos com o PDF. Atualiza só campos de fábrica; edições do representante ficam. */
    const seedMap = {};
    (typeof PRODUTOS !== "undefined" ? PRODUTOS : []).forEach((sp) => { seedMap[sp.id] = sp; });
    (store.produtos || []).forEach((p) => {
      const sp = seedMap[p.id];
      if (!sp) return;
      const codigoAntigo = CODIGOS_SEED[p.id];
      if (!p.codigo || p.codigo === codigoAntigo || /^SKU\d+$/.test(p.codigo)) p.codigo = sp.codigo || "";
      if (!p.nome || p.nome === PRODUTOS_NOMES_V2[p.id]) p.nome = sp.nome;
      p.peso = sp.peso; p.pagina = sp.pagina || null; p.variacoes = sp.variacoes || []; p.revisar = sp.revisar || "";
      if (/^(Ração Nutri Hamster, embalagem|Ração Colosso|Felismax Mix, alimento|Patê Colosso|Molho Colosso|Petisco Bifitos|Cantolindo|Sabonete Matacura|Shampoo Matacura|Condicionador Matacura|Ninho de madeira|Gaiola para|Seringa|Serragem|Mata |Sempre Verde|Adubo|Fertilizante|Semente|Alimento Alcon|Alimento Funny)/.test(p.descricao || "")) p.descricao = sp.descricao;
      if (sp.ativo === false && sp.mescladoEm) p.ativo = false;
    });
    (store.tabelas || []).forEach((t) => { if (t.precos) Object.keys(t.precos).forEach((k) => { if (!(Number(t.precos[k]) > 0)) delete t.precos[k]; }); });
    delete store.trial;
  }
  if (v < 4) {
    /* v4: preços demonstrativos por embalagem (coerentes com peso). Mantém valores editados e itens criados. */
    const seedMap = {};
    (typeof PRODUTOS !== "undefined" ? PRODUTOS : []).forEach((sp) => { seedMap[sp.id] = sp; });
    (store.produtos || []).forEach((p) => {
      const sp = seedMap[p.id];
      if (!sp) return;
      if (Number(p.preco) === Number(PRECOS_SEED_V3[p.id]) || !(Number(p.preco) > 0)) p.preco = sp.preco;
      p.variacoes = (sp.variacoes || []).map((x) => Object.assign({}, x));
    });
  }
  if (v < 5) {
    /* v5: 24 itens conferidos com o PDF (pesos lidos nas embalagens do catálogo, Neem 00631).
       Só preenche campos vazios ou de fábrica; edições do representante e itens criados ficam. */
    const seedMap = {};
    (typeof PRODUTOS !== "undefined" ? PRODUTOS : []).forEach((sp) => { seedMap[sp.id] = sp; });
    const NOMES_V4 = { "funny-bunny-500": "Funny Bunny 0,5kg", "sempre-verde-neem": "Sempre Verde Killer Neem" };
    (store.produtos || []).forEach((p) => {
      const sp = seedMap[p.id];
      if (!sp) return;
      p.revisar = sp.revisar || "";
      if (!p.peso) p.peso = sp.peso || "";
      if (!p.codigo) p.codigo = sp.codigo || "";
      if (!p.nome || p.nome === NOMES_V4[p.id]) p.nome = sp.nome;
      if (!Array.isArray(p.variacoes) || !p.variacoes.length) {
        p.variacoes = (sp.variacoes || []).map((x) => Object.assign({}, x));
      } else {
        p.variacoes.forEach((x) => {
          const sv = (sp.variacoes || []).find((y) => y.codigo === x.codigo);
          if (sv && !x.peso) x.peso = sv.peso;
        });
      }
    });
  }
  store.versao = STORE_VERSION;
  return true;
}

const CODIGOS_SEED = {
  "papagaio-mix": "03050", "papagaio-frutas": "06000", "psita-grande": "03027",
  "calopsita-sp": "06100", "canario": "03020", "nativos": "03023", "curio-azulao": "03021",
  "papagaio-torneio": "03310", "calopsita-torneio": "07001", "oleosa-corr": "03082",
  "pixarro-frutas": "07002", "farinhada-calopsita": "03089",
  "barrinha-calopsita-frutas": "06414", "barrinha-canario": "06411",
  "nectar": "03080", "papinha": "03031",
  "nutri-chinchila": "03047", "nutri-hamster-500": "06120", "nutri-hamster-10kg": "00365",
  "funny-bunny-500": "01240", "serragem-fina": "01431", "serragem-prensada": "00017",
  "colosso-filhotes-carne": "09004", "colosso-filhotes-frango": "09005",
  "colosso-racpeq-carne": "09003", "colosso-adultos-carne": "09000",
  "colosso-gato-salmao": "09012", "colosso-gato-castrado-salmao": "09015",
  "felismax-10": "09032", "felismax-20": "09030",
  "pate-adulto-carne": "03804", "pate-gato-carne": "03805",
  "molho-churrasco": "05607", "bifitos-carne": "03102", "bifitos-churrasco": "03104",
  "cantolindo-calcio": "05162", "cantolindo-antibiotico": "05628", "cantolindo-antitoxico": "05630",
  "matacura-sabonete": "01130", "matacura-shampoo": "02088",
  "matacura-shampoo-neutro": "03547", "matacura-condic": "02088-C",
  "ninho-manon": "00019", "ninho-periquito": "00020", "gaiola-triangular": "01003",
  "seringa": "04667", "serragem-psitacideos": "03506",
  "mata-mato-1l": "02669", "mata-pulgas": "02672",
  "sempre-verde-killer": "01242", "sempre-verde-neem": "01243",
  "sempre-verde-foliar": "00534", "adubo-04-14-08": "00009", "adubo-10-10-10": "00010",
  "semente-alface-mimosa": "00054", "semente-almeirao": "00055",
  "semente-cenoura": "00220", "semente-coentro": "00846", "semente-cebola": "00230",
  "alcon-basic": "00026", "alcon-bettamix": "00025", "alcon-bottom": "00027", "alcon-colours": "00040"
};

function inSubfolder() {
  return /\/(painel|sobre)(\/|$)/.test(location.pathname);
}

function assetUrl(path) {
  if (!path) return "";
  if (/^(https?:|data:|blob:)/i.test(path)) return path;
  const clean = String(path).replace(/^\.\.\//, "");
  return (inSubfolder() ? "../" : "") + clean;
}

function catalogAbsUrl() {
  try {
    return new URL(inSubfolder() ? "../catalogo.html" : "catalogo.html", location.href).href;
  } catch (e) {
    return "catalogo.html";
  }
}

function normalizeProduct(p, i) {
  const preco = p.preco === null || p.preco === undefined || p.preco === "" ? null : Number(p.preco);
  return {
    id: p.id,
    nome: p.nome,
    linha: p.linha || "",
    categoria: p.categoria,
    peso: p.peso || "",
    preco: preco === null || isNaN(preco) || preco <= 0 ? null : preco,
    featured: !!p.featured,
    esgotado: !!p.esgotado,
    imagem: p.imagem || "",
    descricao: p.descricao || "",
    codigo: p.codigo || "",
    pagina: p.pagina || null,
    variacoes: Array.isArray(p.variacoes) ? p.variacoes : [],
    revisar: p.revisar || "",
    ativo: p.ativo !== false
  };
}

function seedVisitas() {
  const dias = [];
  const hoje = new Date();
  hoje.setHours(12, 0, 0, 0);
  for (let i = 29; i >= 0; i--) {
    const d = new Date(hoje);
    d.setDate(d.getDate() - i);
    const w = d.getDay();
    const base = w === 0 || w === 6 ? 22 : 38;
    const v = base + ((i * 7 + w * 3) % 28);
    dias.push({ data: d.toISOString().slice(0, 10), visitas: v });
  }
  return dias;
}

function seedStore() {
  const produtos = (typeof PRODUTOS !== "undefined" ? PRODUTOS : []).map(normalizeProduct);
  const categorias = (typeof CATEGORIAS !== "undefined" ? CATEGORIAS : []).map((c, i) => ({
    id: c.id, nome: c.nome, descricao: c.descricao || "", imagem: c.imagem || "", ordem: i
  }));
  return {
    versao: STORE_VERSION,
    produtos: produtos,
    categorias: categorias,
    tabelas: [
      { id: "varejo", nome: "Varejo", tipo: "percent", ajuste: 0, minimo: 0, precos: {}, padrao: true },
      { id: "revenda", nome: "Revenda", tipo: "percent", ajuste: -10, minimo: 250, precos: {} },
      { id: "atacado", nome: "Atacado", tipo: "percent", ajuste: -18, minimo: 500, precos: {} }
    ],
    clientes: [
      { id: "c1", loja: "Pet Shop Exemplo LTDA", cnpj: "12.345.678/0001-90", tabela: "revenda", cidade: "Exemplo — SP", contato: "Ana (exemplo)", exemplo: true },
      { id: "c2", loja: "Agropecuária Demonstração ME", cnpj: "98.765.432/0001-10", tabela: "atacado", cidade: "Exemplo — MG", contato: "Carlos (exemplo)", exemplo: true },
      { id: "c3", loja: "Loja Varejo Modelo", cnpj: "11.222.333/0001-44", tabela: "varejo", cidade: "Exemplo — PR", contato: "Marina (exemplo)", exemplo: true }
    ],
    pedidos: [
      { id: "P-1042", data: "2026-11-18", cliente: "Pet Shop Exemplo LTDA", tabela: "revenda", total: 312.4, status: "Enviado no WhatsApp", itens: 6, exemplo: true },
      { id: "P-1041", data: "2026-11-17", cliente: "Agropecuária Demonstração ME", tabela: "atacado", total: 890.1, status: "Recebido", itens: 14, exemplo: true },
      { id: "P-1040", data: "2026-11-16", cliente: "Consumidor (varejo)", tabela: "varejo", total: 64.7, status: "Demonstração", itens: 3, exemplo: true }
    ],
    metricas: {
      exemplo: true,
      visitas: 1284,
      cliquesWhatsapp: 196,
      pedidos: 47,
      ticketMedio: 186.4,
      visitasDias: seedVisitas(),
      topProdutos: [
        { id: "papagaio-mix", nome: "Nutri Papagaio Mix Castanha", qtd: 42 },
        { id: "calopsita-sp", nome: "Nutri Sup Prem Calopsita Frutas", qtd: 37 },
        { id: "colosso-filhotes-carne", nome: "Colosso Filhotes Carne", qtd: 29 },
        { id: "cantolindo-calcio", nome: "Cantolindo Cálcio", qtd: 24 },
        { id: "nectar", nome: "Nutri Néctar", qtd: 18 }
      ]
    },
    tema: "light"
  };
}

function loadStore() {
  let store;
  try {
    const raw = localStorage.getItem(STORE_KEY);
    store = raw ? JSON.parse(raw) : null;
  } catch (e) {
    store = null;
  }
  if (!store || !store.produtos) {
    store = seedStore();
    saveStore(store);
    return store;
  }
  // incorpora produtos novos do seed sem sobrescrever edições
  const ids = new Set(store.produtos.map((p) => p.id));
  if (typeof PRODUTOS !== "undefined") {
    PRODUTOS.forEach((p, i) => {
      if (!ids.has(p.id)) store.produtos.push(normalizeProduct(p, i));
    });
  }
  if (!store.categorias || !store.categorias.length) {
    store.categorias = seedStore().categorias;
  }
  if (!store.tabelas) store.tabelas = seedStore().tabelas;
  if (!store.clientes) store.clientes = seedStore().clientes;
  if (!store.pedidos) store.pedidos = seedStore().pedidos;
  if (!store.metricas) store.metricas = seedStore().metricas;
  if (migrateStore(store)) { try { saveStore(store); } catch (e) {} }
  return store;
}

function saveStore(store) {
  try {
    localStorage.setItem(STORE_KEY, JSON.stringify(store));
  } catch (e) {
    /* armazenamento cheio ou bloqueado (modo privado): segue sem persistir */
    console.warn("Não foi possível salvar no localStorage:", e);
  }
}

function getStore() {
  return loadStore();
}

function updateStore(mutator) {
  const store = loadStore();
  mutator(store);
  saveStore(store);
  return store;
}

/* Leitura com cache: evita reprocessar o localStorage a cada card (celulares mais simples). */
let __cacheRaw = null, __cacheStore = null;
function readStore() {
  let raw = null;
  try { raw = localStorage.getItem(STORE_KEY); } catch (e) {}
  if (raw && raw === __cacheRaw && __cacheStore) return __cacheStore;
  const st = loadStore();
  try { __cacheRaw = localStorage.getItem(STORE_KEY); } catch (e) { __cacheRaw = null; }
  __cacheStore = st;
  return st;
}

function listProdutos() {
  return readStore().produtos.filter((p) => p.ativo !== false);
}

function produtoPorId(id) {
  return readStore().produtos.find((p) => p.id === id);
}

function listCategorias() {
  return readStore().categorias.slice().sort((a, b) => (a.ordem || 0) - (b.ordem || 0));
}

function produtosPorCategoria(catId, onlyFeatured) {
  return listProdutos().filter((p) => p.categoria === catId && (!onlyFeatured || p.featured));
}

function tabelaPorId(id) {
  const store = readStore();
  return (store.tabelas || []).find((t) => t.id === id) || (store.tabelas || [])[0];
}

function precoNaTabela(produto, tabela) {
  /* Retorna null quando não há preço válido ("Consultar preço"). Valores são demonstrativos. */
  if (!produto) return null;
  if (tabela && tabela.precos && tabela.precos[produto.id] != null && Number(tabela.precos[produto.id]) > 0) {
    return Number(tabela.precos[produto.id]);
  }
  const base = Number(produto.preco);
  if (!(base > 0)) return null;
  if (!tabela) return base;
  const adj = Number(tabela.ajuste) || 0;
  return Math.round(base * (1 + adj / 100) * 100) / 100;
}

/* Preço demonstrativo de uma embalagem: escala o preço-base (já com a tabela aplicada)
   pela proporção da embalagem no seed. Se o representante mudar o preço-base, as demais acompanham. */
function precoVariacao(produto, cod, tabela) {
  const base = precoNaTabela(produto, tabela);
  if (base === null) return null;
  const vs = Array.isArray(produto.variacoes) ? produto.variacoes : [];
  if (!cod || vs.length < 2) return base;
  const ref = vs.find((x) => x.codigo === produto.codigo) || vs[0];
  const v = vs.find((x) => x.codigo === cod);
  if (!v || v === ref || !(Number(v.preco) > 0) || !(Number(ref.preco) > 0)) return base;
  return Math.round(base * Number(v.preco) / Number(ref.preco) * 100) / 100;
}

function getSession() {
  try {
    return JSON.parse(sessionStorage.getItem(SESSION_KEY) || "null");
  } catch (e) {
    return null;
  }
}

function setSession(s) {
  if (s) sessionStorage.setItem(SESSION_KEY, JSON.stringify(s));
  else sessionStorage.removeItem(SESSION_KEY);
}

function registrarPedido(pedido) {
  updateStore((s) => {
    s.pedidos = s.pedidos || [];
    s.pedidos.unshift(pedido);
  });
}
