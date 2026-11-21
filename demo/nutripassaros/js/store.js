/* Estado compartilhado (localStorage) entre catálogo e painel.
   Caminhos de imagem sempre relativos à raiz do site (img/...). */

const STORE_KEY = "nutripassaros-demo-store";
const SESSION_KEY = "nutripassaros-demo-session";
const DEMO_USER = { email: "francisco@demo", senha: "demo123", nome: "Francisco Ferre" };

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
  return {
    id: p.id,
    nome: p.nome,
    linha: p.linha || "",
    categoria: p.categoria,
    peso: p.peso || "",
    preco: Number(p.preco) || 0,
    featured: !!p.featured,
    esgotado: !!p.esgotado,
    imagem: p.imagem || "",
    descricao: p.descricao || "",
    codigo: p.codigo || CODIGOS_SEED[p.id] || ("SKU" + String(1000 + (i || 0))),
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
    versao: 1,
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
    trial: null,
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
  if (store.trial === undefined) store.trial = null;
  return store;
}

function saveStore(store) {
  localStorage.setItem(STORE_KEY, JSON.stringify(store));
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

function listProdutos() {
  return loadStore().produtos.filter((p) => p.ativo !== false);
}

function produtoPorId(id) {
  return loadStore().produtos.find((p) => p.id === id);
}

function listCategorias() {
  return loadStore().categorias.slice().sort((a, b) => (a.ordem || 0) - (b.ordem || 0));
}

function produtosPorCategoria(catId, onlyFeatured) {
  return listProdutos().filter((p) => p.categoria === catId && (!onlyFeatured || p.featured));
}

function tabelaPorId(id) {
  const store = loadStore();
  return (store.tabelas || []).find((t) => t.id === id) || (store.tabelas || [])[0];
}

function precoNaTabela(produto, tabela) {
  if (!produto) return 0;
  const base = Number(produto.preco) || 0;
  if (!tabela) return base;
  if (tabela.precos && tabela.precos[produto.id] != null && tabela.precos[produto.id] !== "") {
    return Number(tabela.precos[produto.id]);
  }
  const adj = Number(tabela.ajuste) || 0;
  return Math.round(base * (1 + adj / 100) * 100) / 100;
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

function trialRestantes(trial) {
  if (!trial || !trial.ativadoEm) return 0;
  const inicio = new Date(trial.ativadoEm).getTime();
  const fim = inicio + (trial.dias || 7) * 24 * 60 * 60 * 1000;
  const ms = fim - Date.now();
  if (ms <= 0) return 0;
  return Math.ceil(ms / (24 * 60 * 60 * 1000));
}

function registrarPedido(pedido) {
  updateStore((s) => {
    s.pedidos = s.pedidos || [];
    s.pedidos.unshift(pedido);
  });
}
