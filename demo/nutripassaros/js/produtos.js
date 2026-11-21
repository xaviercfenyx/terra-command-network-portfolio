/* Representante comercial: Francisco Ferre — (11) 98487-1786 */
const WHATSAPP_NUMERO = "5511984871786";
const WHATSAPP_NOME = "Francisco Ferre";
const WHATSAPP_TEL_FMT = "(11) 98487-1786";

const CATEGORIAS = [
  { id: "passaros", nome: "Pássaros", descricao: "Linhas Super Premium e Torneio, misturas, barrinhas, néctar e papinha.", imagem: "img/cat-passaros.webp" },
  { id: "roedores", nome: "Roedores", descricao: "Rações para hamster, chinchila e porquinho-da-índia, além de serragem.", imagem: "img/cat-roedores.webp" },
  { id: "caes-gatos", nome: "Cães e gatos", descricao: "Rações Colosso e Felismax, patês, molhos e petiscos Bifitos.", imagem: "img/cat-caes.webp" },
  { id: "veterinarios", nome: "Veterinários", descricao: "Cantolindo, Matacura e demais produtos de distribuição veterinária.", imagem: "img/cat-vet.webp" },
  { id: "acessorios", nome: "Acessórios", descricao: "Gaiolas, ninhos de madeira, seringas e serragem para psitacídeos.", imagem: "img/cat-acessorios.webp" },
  { id: "jardinagem", nome: "Jardinagem", descricao: "Mata-mato, mata-pulgão, adubos e linha Sempre Verde.", imagem: "img/cat-jardinagem.webp" },
  { id: "sementes", nome: "Sementes de horta", descricao: "Envelopes de hortaliças para o pomar e a horta.", imagem: "img/cat-horta.webp" },
  { id: "aquarismo", nome: "Aquarismo", descricao: "Alimentos Alcon para peixes ornamentais.", imagem: "img/cat-aquarismo.webp" }
];

const PRODUTOS = [
  /* ——— Pássaros ——— */
  { id: "papagaio-mix", nome: "Nutri Papagaio Mix Castanha", linha: "Linha Super Premium", categoria: "passaros", peso: "500g", preco: 16.9, featured: true, imagem: "img/produtos/papagaio-mix.webp",
    descricao: "Ração premium para papagaios e psitacídeos de grande porte, com grãos, frutas e vitaminas essenciais. Promove digestão saudável e fortalece a imunidade, oferecendo nutrição completa." },
  { id: "papagaio-frutas", nome: "Nutri Sup Prem Papagaio Frutas", linha: "Linha Super Premium", categoria: "passaros", peso: "600g", preco: 22.9, featured: true, imagem: "img/produtos/papagaio-frutas.webp",
    descricao: "Ração super premium para papagaios e psitacídeos de grande porte, com mix de extrusados e frutas desidratadas. Enriquecida com vitaminas, probióticos e ovos, oferece digestão saudável e nutrição completa." },
  { id: "psita-grande", nome: "Nutri Psita Grande Porte", linha: "Linha Super Premium", categoria: "passaros", peso: "700g", preco: 24.9, featured: false, imagem: "img/produtos/psita-grande.webp",
    descricao: "Ração premium para psitacídeos de grande porte, com ovos desidratados e ingredientes funcionais. Enriquecida com vitaminas, minerais e probióticos, oferece digestão saudável e nutrição completa." },
  { id: "calopsita-sp", nome: "Nutri Sup Prem Calopsita Frutas", linha: "Linha Super Premium", categoria: "passaros", peso: "300g", preco: 14.9, featured: true, imagem: "img/produtos/calopsita-sp.webp",
    descricao: "Ração premium para calopsitas, composta por um mix de extrusados com frutas cristalizadas e maçã desidratada. Enriquecida com ovos desidratados, vitaminas e minerais essenciais, oferece uma nutrição equilibrada e saudável para aves." },
  { id: "canario", nome: "Nutri Canário", linha: "Linha Super Premium", categoria: "passaros", peso: "350g", preco: 12.9, featured: false, imagem: "img/produtos/canario.webp",
    descricao: "Ração premium para canários, composta por um mix de extrusados. Com ovos desidratados, vitaminas e minerais essenciais, favorece o desenvolvimento saudável e a vitalidade, além de contribuir para uma plumagem brilhante." },
  { id: "nativos", nome: "Nutri Nativos", linha: "Linha Super Premium", categoria: "passaros", peso: "500g", preco: 15.9, featured: false, imagem: "img/produtos/nativos.webp",
    descricao: "Alimento para pássaros nativos, feito com um mix de extrusados e ovos desidratados. Enriquecido com vitaminas e minerais, promove saúde e vitalidade, garantindo uma dieta balanceada e saborosa." },
  { id: "curio-azulao", nome: "Nutri Curió e Azulão", linha: "Linha Super Premium", categoria: "passaros", peso: "325g", preco: 16.9, featured: false, imagem: "img/produtos/curio-azulao.webp",
    descricao: "Alimento para curió e azulão, feito com farelos e ovos desidratados. Enriquecido com vitaminas e minerais, promove saúde e energia, garantindo uma nutrição atrativa e equilibrada." },
  { id: "papagaio-torneio", nome: "Nutri Papagaio Frutas Premium", linha: "Linha Torneio", categoria: "passaros", peso: "500g", preco: 18.9, featured: true, imagem: "img/produtos/papagaio-torneio.webp",
    descricao: "A Papagaios Frutas Premium oferece uma nutrição completa com ingredientes selecionados, como sementes de girassol, amendoim, coco e frutas cristalizadas. Desenvolvida para atender às necessidades nutricionais dos papagaios, promove a saúde e bem-estar dessas aves." },
  { id: "calopsita-torneio", nome: "Nutri Calopsita Frutas Prem", linha: "Linha Torneio", categoria: "passaros", peso: "500g", preco: 14.9, featured: true, imagem: "img/produtos/calopsita-torneio.webp",
    descricao: "A nutri Calopsitas, Agapornis e Rose Faces com frutas combina grãos como alpiste, arroz, painço, milheto, aveia, trigo mourisco e sorgo. Além de frutas cristalizadas, é enriquecida com vitaminas e minerais, garantindo uma nutrição completa e equilibrada para a saúde dessas aves." },
  { id: "oleosa-corr", nome: "Nutri Torneio S Prem Oleosa Corr", linha: "Linha Torneio", categoria: "passaros", peso: "500g", preco: 17.9, featured: false, imagem: "img/produtos/oleosa-corr.webp",
    descricao: "Ração oleosa com extrusado e frutas, ideal para Sabiá, Pássaro Preto e Corrupião, com milho, soja, amendoim e frutas cristalizadas. Nutrição rica em proteínas e vitaminas, promovendo saúde e bem-estar." },
  { id: "pixarro-frutas", nome: "Nutri Pixarro Frutas Torneio", linha: "Linha Torneio", categoria: "passaros", peso: "500g", preco: 17.9, featured: false, imagem: "img/produtos/pixarro-frutas.webp",
    descricao: "Mistura para Pixarro (Trinca Ferro) com frutas, composta de milho, trigo, arroz, aveia, sorgo, alpiste e amendoim. Enriquecida com frutas cristalizadas, oferece nutrição equilibrada para a saúde e bem-estar da ave." },
  { id: "farinhada-calopsita", nome: "Nutri Farinhada Calopsita Frutas", linha: "Linha Torneio", categoria: "passaros", peso: "500g", preco: 16.9, featured: false, imagem: "img/produtos/farinhada-calopsita.webp",
    descricao: "A farinhada para Calopsitas, Agapornis e Rose Faces oferece nutrição completa, com ovo desidratado e frutas cristalizadas. Desenvolvida para garantir a saúde e bem-estar dessas aves." },
  { id: "barrinha-calopsita-frutas", nome: "Barrinha Calopsita Frutas", linha: "Linha Torneio", categoria: "passaros", peso: "2 un", preco: 6.9, featured: false, imagem: "img/produtos/barrinha-calopsita-frutas.webp",
    descricao: "Deliciosa e nutritiva, a barrinha para calopsita é feita com frutas selecionadas e rica em vitaminas e minerais. Fácil de pendurar na gaiola, estimula o forrageio e promove saúde e bem-estar para o seu pet." },
  { id: "barrinha-canario", nome: "Barrinha Canário", linha: "Linha Torneio", categoria: "passaros", peso: "2 un", preco: 6.9, featured: false, imagem: "img/produtos/barrinha-canario.webp",
    descricao: "A barrinha para canário é um petisco saboroso, feito com sementes e ingredientes naturais. Rica em vitaminas e minerais, promove saúde e vitalidade. Prática de pendurar, estimula o forrageio e torna a alimentação mais divertida!" },
  { id: "nectar", nome: "Nutri Néctar", linha: "Linha Torneio", categoria: "passaros", peso: "150g", preco: 12.9, featured: true, imagem: "img/produtos/nectar.webp",
    descricao: "O néctar para beija-flor e colibris é uma mistura rica em açúcares naturais e vitaminas, ideal para atrair e nutrir essas aves. Fácil de preparar, basta misturar com água e colocar em alimentadores, garantindo energia e saúde para os seus visitantes do jardim!" },
  { id: "papinha", nome: "Nutri Papinha", linha: "Linha Torneio", categoria: "passaros", peso: "150g", preco: 13.9, featured: false, imagem: "img/produtos/papinha.webp",
    descricao: "A papinha para filhotes é um alimento nutritivo e de fácil digestão, ideal para o crescimento saudável das aves jovens. Rica em vitaminas e minerais, garante energia e desenvolvimento adequado. Prática de preparar, é perfeita para refeições dos filhotes!" },

  /* ——— Roedores ——— */
  { id: "nutri-chinchila", nome: "Nutri Chinchila e Porquinho da Índia", linha: "Linha Super Premium", categoria: "roedores", peso: "500g", preco: 33.9, featured: true, imagem: "img/produtos/nutri-chinchila.webp",
    descricao: "Alimento completo para Chinchila e Porquinho-da-Índia, formulado para suprir as necessidades nutricionais específicas desses pets. Proporciona uma dieta equilibrada que promove saúde, energia e bem-estar diário, contribuindo para uma vida longa e saudável." },
  { id: "nutri-hamster-500", nome: "Nutri Hamster", linha: "", categoria: "roedores", peso: "500g", preco: 9.9, featured: true, imagem: "img/produtos/nutri-hamster-500.webp",
    descricao: "Ração Nutri Hamster, embalagem de 500 g." },
  { id: "nutri-hamster-10kg", nome: "Nutri Hamster", linha: "", categoria: "roedores", peso: "10kg", preco: 99.9, featured: false, imagem: "img/produtos/nutri-hamster-10kg.webp",
    descricao: "Ração Nutri Hamster, embalagem de 10 kg." },
  { id: "funny-bunny-500", nome: "Funny Bunny", linha: "", categoria: "roedores", peso: "500g", preco: 18.9, featured: true, imagem: "img/produtos/funny-bunny-500.webp",
    descricao: "Alimento Funny Bunny para roedores, embalagem de 500 g." },
  { id: "serragem-fina", nome: "Serragem Fina Hamsters MS Pet", linha: "", categoria: "roedores", peso: "350g", preco: 6.9, featured: true, imagem: "img/produtos/serragem-fina.webp",
    descricao: "Serragem fina para hamsters MS Pet, 350 g." },
  { id: "serragem-prensada", nome: "Serragem Prensada Hamsters MS Pet", linha: "", categoria: "roedores", peso: "800g", preco: 14.9, featured: false, imagem: "img/produtos/serragem-prensada.webp",
    descricao: "Serragem prensada para hamsters MS Pet, 800 g." },

  /* ——— Cães e gatos ——— */
  { id: "colosso-filhotes-carne", nome: "Colosso Premium Cães Filhotes Carne e Arroz", linha: "Colosso Premium", categoria: "caes-gatos", peso: "10,1kg", preco: 119.9, featured: true, imagem: "img/produtos/colosso-filhotes-carne.webp",
    descricao: "Ração Colosso Premium para cães filhotes, sabor carne e arroz. Embalagem de 10,1 kg." },
  { id: "colosso-filhotes-frango", nome: "Colosso Premium Cães Filhotes Frango e Arroz", linha: "Colosso Premium", categoria: "caes-gatos", peso: "10,1kg", preco: 119.9, featured: false, imagem: "img/produtos/colosso-filhotes-frango.webp",
    descricao: "Ração Colosso Premium para cães filhotes, sabor frango e arroz. Embalagem de 10,1 kg." },
  { id: "colosso-racpeq-carne", nome: "Colosso Premium Cães Raças Pequenas Carne e Arroz", linha: "Colosso Premium", categoria: "caes-gatos", peso: "15kg", preco: 154.9, featured: false, imagem: "img/produtos/colosso-racpeq-carne.webp",
    descricao: "Ração Colosso Premium para cães de raças pequenas, sabor carne e arroz. Embalagem de 15 kg." },
  { id: "colosso-adultos-carne", nome: "Colosso Premium Cães Adultos Carne e Arroz", linha: "Colosso Premium", categoria: "caes-gatos", peso: "15kg", preco: 149.9, featured: false, imagem: "img/produtos/colosso-adultos-carne.webp",
    descricao: "Ração Colosso Premium para cães adultos, sabor carne e arroz. Embalagem de 15 kg." },
  { id: "colosso-gato-salmao", nome: "Colosso Premium Gatos Adultos e Filhotes Salmão e Arroz", linha: "Colosso Premium", categoria: "caes-gatos", peso: "10,1kg", preco: 119.9, featured: false, imagem: "img/produtos/colosso-gato-salmao.webp",
    descricao: "Ração Colosso Premium para gatos adultos e filhotes, sabor salmão e arroz. Embalagem de 10,1 kg." },
  { id: "colosso-gato-castrado-salmao", nome: "Colosso Premium Gatos Castrados Salmão e Arroz", linha: "Colosso Premium", categoria: "caes-gatos", peso: "10,1kg", preco: 129.9, featured: true, imagem: "img/produtos/colosso-gato-castrado-salmao.webp",
    descricao: "Ração Colosso Premium para gatos castrados, sabor salmão e arroz. Embalagem de 10,1 kg." },
  { id: "felismax-10", nome: "Felismax Mix", linha: "Felismax", categoria: "caes-gatos", peso: "10,1kg", preco: 99.9, featured: true, imagem: "img/produtos/felismax-10.webp",
    descricao: "Felismax Mix, alimento para gatos sabor carne, frango e peixe. Embalagem de 10,1 kg." },
  { id: "felismax-20", nome: "Felismax Mix", linha: "Felismax", categoria: "caes-gatos", peso: "20kg", preco: 179.9, featured: false, imagem: "img/produtos/felismax-20.webp",
    descricao: "Felismax Mix, alimento para gatos sabor carne, frango e peixe. Embalagem de 20 kg." },
  { id: "pate-adulto-carne", nome: "Patê Colosso Cães Adultos Carne", linha: "Colosso", categoria: "caes-gatos", peso: "280g", preco: 9.9, featured: true, imagem: "img/produtos/pate-adulto-carne.webp",
    descricao: "Patê Colosso para cães adultos, sabor carne. Lata de 280 g." },
  { id: "pate-gato-carne", nome: "Patê Colosso Gatos Carne", linha: "Colosso", categoria: "caes-gatos", peso: "280g", preco: 9.9, featured: false, imagem: "img/produtos/pate-gato-carne.webp",
    descricao: "Patê Colosso para gatos, sabor carne. Lata de 280 g." },
  { id: "molho-churrasco", nome: "Molho Colosso Churrasco", linha: "Colosso", categoria: "caes-gatos", peso: "250g", preco: 9.9, featured: false, imagem: "img/produtos/molho-churrasco.webp",
    descricao: "Molho Colosso sabor churrasco, 250 g." },
  { id: "bifitos-carne", nome: "Bifitos Colosso Carne", linha: "Colosso", categoria: "caes-gatos", peso: "65g", preco: 6.9, featured: true, imagem: "img/produtos/bifitos-carne.webp",
    descricao: "Petisco Bifitos Colosso sabor carne, 65 g." },
  { id: "bifitos-churrasco", nome: "Bifitos Colosso Churrasco", linha: "Colosso", categoria: "caes-gatos", peso: "65g", preco: 6.9, featured: false, imagem: "img/produtos/bifitos-churrasco.webp",
    descricao: "Petisco Bifitos Colosso sabor churrasco, 65 g." },

  /* ——— Veterinários ——— */
  { id: "cantolindo-calcio", nome: "Cantolindo Cálcio", linha: "Cantolindo", categoria: "veterinarios", peso: "20ml", preco: 18.9, featured: true, imagem: "img/produtos/cantolindo-calcio.webp",
    descricao: "Cantolindo Cálcio, 20 ml." },
  { id: "cantolindo-antibiotico", nome: "Cantolindo Antibiótico", linha: "Cantolindo", categoria: "veterinarios", peso: "20ml", preco: 19.9, featured: true, imagem: "img/produtos/cantolindo-antibiotico.webp",
    descricao: "Cantolindo Antibiótico, 20 ml." },
  { id: "cantolindo-antitoxico", nome: "Cantolindo Antitóxico", linha: "Cantolindo", categoria: "veterinarios", peso: "30ml", preco: 21.9, featured: false, imagem: "img/produtos/cantolindo-antitoxico.webp",
    descricao: "Cantolindo Antitóxico, 30 ml." },
  { id: "matacura-sabonete", nome: "Sabonete Matacura Sarnicida e Anti-pulgas", linha: "Matacura", categoria: "veterinarios", peso: "80g", preco: 16.5, featured: true, imagem: "img/produtos/matacura-sabonete.webp",
    descricao: "Sabonete Matacura sarnicida e anti-pulgas, 80 g." },
  { id: "matacura-shampoo", nome: "Shampoo Matacura", linha: "Matacura", categoria: "veterinarios", peso: "200ml", preco: 24.9, featured: true, imagem: "img/produtos/matacura-shampoo.webp",
    descricao: "Shampoo Matacura, 200 ml." },
  { id: "matacura-shampoo-neutro", nome: "Shampoo Matacura Neutro", linha: "Matacura", categoria: "veterinarios", peso: "200ml", preco: 24.9, featured: false, imagem: "img/produtos/matacura-shampoo-neutro.webp",
    descricao: "Shampoo Matacura Neutro, 200 ml." },
  { id: "matacura-condic", nome: "Condicionador Matacura A/P Sarnicida", linha: "Matacura", categoria: "veterinarios", peso: "200ml", preco: 25.9, featured: false, imagem: "img/produtos/matacura-condic.webp",
    descricao: "Condicionador Matacura antiparasitário sarnicida, 200 ml." },

  /* ——— Acessórios ——— */
  { id: "ninho-manon", nome: "Ninho Madeira Manon MS Pet", linha: "MS Pet", categoria: "acessorios", peso: "un", preco: 16.9, featured: true, imagem: "img/produtos/ninho-manon.webp",
    descricao: "Ninho de madeira Manon MS Pet." },
  { id: "ninho-periquito", nome: "Ninho Madeira Periquito MS Pet", linha: "MS Pet", categoria: "acessorios", peso: "un", preco: 18.9, featured: true, imagem: "img/produtos/ninho-periquito.webp",
    descricao: "Ninho de madeira para periquito MS Pet." },
  { id: "gaiola-triangular", nome: "Gaiola Pássaros Triangular", linha: "", categoria: "acessorios", peso: "36×27×20 cm", preco: 89.9, featured: true, imagem: "img/produtos/gaiola-triangular.webp",
    descricao: "Gaiola para pássaros triangular, 36 × 27 × 20 cm." },
  { id: "seringa", nome: "Seringa Plástica para Pássaros MS Pet", linha: "MS Pet", categoria: "acessorios", peso: "un", preco: 7.9, featured: false, imagem: "img/produtos/seringa.webp",
    descricao: "Seringa plástica para pássaros MS Pet." },
  { id: "serragem-psitacideos", nome: "Serragem para Psitacídeos MS Pet", linha: "MS Pet", categoria: "acessorios", peso: "100g", preco: 8.9, featured: false, imagem: "img/produtos/serragem-psitacideos.webp",
    descricao: "Serragem para psitacídeos MS Pet, 100 g." },

  /* ——— Jardinagem ——— */
  { id: "mata-mato-1l", nome: "Mata Mato Mademato Plus", linha: "", categoria: "jardinagem", peso: "1 L", preco: 24.9, featured: true, imagem: "img/produtos/mata-mato-1l.webp",
    descricao: "Mata Mato Mademato Plus, 1 litro." },
  { id: "mata-pulgas", nome: "Mata Pulgas Madepulga", linha: "", categoria: "jardinagem", peso: "12×50g", preco: 29.9, featured: true, imagem: "img/produtos/mata-pulgas.webp",
    descricao: "Mata Pulgas Madepulga, display com 12 × 50 g." },
  { id: "sempre-verde-killer", nome: "Sempre Verde Killer Lagarta e Pulgão", linha: "Sempre Verde", categoria: "jardinagem", peso: "30ml", preco: 14.9, featured: true, imagem: "img/produtos/sempre-verde-killer.webp",
    descricao: "Sempre Verde Killer Lagarta e Pulgão, 30 ml." },
  { id: "sempre-verde-neem", nome: "Sempre Verde Neem", linha: "Sempre Verde", categoria: "jardinagem", peso: "", preco: 16.9, featured: false, imagem: "img/produtos/sempre-verde-neem.webp",
    descricao: "Sempre Verde Neem." },
  { id: "sempre-verde-foliar", nome: "Sempre Verde Foliar 07-07-07", linha: "Sempre Verde", categoria: "jardinagem", peso: "160ml", preco: 12.9, featured: false, imagem: "img/produtos/sempre-verde-foliar.webp",
    descricao: "Sempre Verde Foliar (07-07-07), 160 ml." },
  { id: "adubo-04-14-08", nome: "Adubo 04-14-08 Sempre Verde", linha: "Sempre Verde", categoria: "jardinagem", peso: "", preco: 14.9, featured: false, imagem: "img/produtos/adubo-04-14-08.webp",
    descricao: "Adubo 04-14-08 Sempre Verde / Ultraverde." },
  { id: "adubo-10-10-10", nome: "Adubo 10-10-10 Sempre Verde", linha: "Sempre Verde", categoria: "jardinagem", peso: "1kg", preco: 18.9, featured: false, imagem: "img/produtos/adubo-10-10-10.webp",
    descricao: "Fertilizante fórmula 10-10-10 Sempre Verde / Ultraverde, 1 kg." },

  /* ——— Sementes de horta ——— */
  { id: "semente-alface-mimosa", nome: "Semente Alface Mimosa Salad Bowl", linha: "Topseed", categoria: "sementes", peso: "envelope", preco: 5.9, featured: true, imagem: "img/produtos/semente-alface-mimosa.webp",
    descricao: "Semente de alface mimosa Salad Bowl." },
  { id: "semente-almeirao", nome: "Semente Almeirão Folha Larga", linha: "Topseed", categoria: "sementes", peso: "envelope", preco: 5.9, featured: false, imagem: "img/produtos/semente-almeirao.webp",
    descricao: "Semente de almeirão folha larga (radiche)." },
  { id: "semente-cenoura", nome: "Semente Cenoura Brasília", linha: "Topseed", categoria: "sementes", peso: "envelope", preco: 5.9, featured: true, imagem: "img/produtos/semente-cenoura.webp",
    descricao: "Semente de cenoura Brasília." },
  { id: "semente-coentro", nome: "Semente Coentro Português", linha: "Topseed", categoria: "sementes", peso: "envelope", preco: 5.9, featured: true, imagem: "img/produtos/semente-coentro.webp",
    descricao: "Semente de coentro português." },
  { id: "semente-cebola", nome: "Semente Cebola Baia", linha: "Topseed", categoria: "sementes", peso: "envelope", preco: 5.9, featured: false, imagem: "img/produtos/semente-cebola.webp",
    descricao: "Semente de cebola baia." },

  /* ——— Aquarismo ——— */
  { id: "alcon-basic", nome: "Alcon Basic", linha: "Alcon", categoria: "aquarismo", peso: "20g", preco: 16.9, featured: true, imagem: "img/produtos/alcon-basic.webp",
    descricao: "Alimento Alcon Basic para peixes ornamentais, 20 g." },
  { id: "alcon-bettamix", nome: "Alcon Bettamix", linha: "Alcon", categoria: "aquarismo", peso: "10g", preco: 15.9, featured: true, imagem: "img/produtos/alcon-bettamix.webp",
    descricao: "Alimento Alcon Bettamix, 10 g." },
  { id: "alcon-bottom", nome: "Alcon Bottom Fish", linha: "Alcon", categoria: "aquarismo", peso: "30g", preco: 22.9, featured: true, imagem: "img/produtos/alcon-bottom.webp",
    descricao: "Alimento Alcon Bottom Fish, 30 g." },
  { id: "alcon-colours", nome: "Alcon Colours", linha: "Alcon", categoria: "aquarismo", peso: "", preco: 18.9, featured: false, imagem: "img/produtos/alcon-colours.webp",
    descricao: "Alimento Alcon Colours para peixes ornamentais." }
];

function produtoPorId(id) {
  return PRODUTOS.find((p) => p.id === id);
}

function produtosPorCategoria(catId, onlyFeatured) {
  return PRODUTOS.filter((p) => p.categoria === catId && (!onlyFeatured || p.featured));
}
