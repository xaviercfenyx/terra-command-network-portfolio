/* Representante comercial: Francisco Ferre — (11) 98487-1786 */
const WHATSAPP_NUMERO = "5511984871786";
const WHATSAPP_NOME = "Francisco Ferre";
const WHATSAPP_TEL_FMT = "(11) 98487-1786";

const CATEGORIAS = [
  { id: "passaros", nome: "Pássaros", descricao: "Linhas Super Premium e Torneio, misturas, barrinhas, néctar e papinha.", imagem: "img/cat/passaros.webp" },
  { id: "roedores", nome: "Roedores", descricao: "Rações para hamster, chinchila e porquinho-da-índia, além de serragem.", imagem: "img/cat/roedores.webp" },
  { id: "caes-gatos", nome: "Cães e gatos", descricao: "Rações Colosso e Felismax, patês, molhos e petiscos Bifitos.", imagem: "img/cat/caes-gatos.webp" },
  { id: "veterinarios", nome: "Veterinários", descricao: "Cantolindo, Matacura e demais produtos de distribuição veterinária.", imagem: "img/cat/veterinarios.webp" },
  { id: "acessorios", nome: "Acessórios", descricao: "Gaiolas, ninhos de madeira, seringas e serragem para psitacídeos.", imagem: "img/cat/acessorios.webp" },
  { id: "jardinagem", nome: "Jardinagem", descricao: "Mata-mato, mata-pulgão, adubos e linha Sempre Verde.", imagem: "img/cat/jardinagem.webp" },
  { id: "sementes", nome: "Sementes de horta", descricao: "Envelopes de hortaliças para o pomar e a horta.", imagem: "img/cat/sementes.webp" },
  { id: "aquarismo", nome: "Aquarismo", descricao: "Alimentos Alcon para peixes ornamentais.", imagem: "img/cat/aquarismo.webp" }
];

const PRODUTOS = [
  /* ——— Pássaros ——— */
  { id: "papagaio-mix", nome: "Nutri Papagaio Mix Castanha", linha: "Linha Super Premium", categoria: "passaros", peso: "500g", preco: 16.9, featured: true, imagem: "img/p/papagaio-mix.webp", codigo: "03050", pagina: 4, variacoes: [{"codigo":"03050","peso":"500g","preco":16.9},{"codigo":"03052","peso":"5kg","preco":140.9},{"codigo":"03051","peso":"6x500g","preco":95.9}],
    descricao: "Ração premium para papagaios e psitacídeos de grande porte, com grãos, frutas e vitaminas essenciais. Promove digestão saudável e fortalece a imunidade, oferecendo nutrição completa." },
  { id: "papagaio-frutas", nome: "Nutri Sup Prem Papagaio Frutas", linha: "Linha Super Premium", categoria: "passaros", peso: "600g", preco: 22.9, featured: true, imagem: "img/p/papagaio-frutas.webp", codigo: "06000", pagina: 4, variacoes: [{"codigo":"06000","peso":"600g","preco":22.9},{"codigo":"06001","peso":"6x600g","preco":130.9}],
    descricao: "Ração super premium para papagaios e psitacídeos de grande porte, com mix de extrusados e frutas desidratadas. Enriquecida com vitaminas, probióticos e ovos, oferece digestão saudável e nutrição completa." },
  { id: "psita-grande", nome: "Nutri Psita Grande Porte", linha: "Linha Super Premium", categoria: "passaros", peso: "700g", preco: 24.9, featured: false, imagem: "img/p/psita-grande.webp", codigo: "03027", pagina: 4, variacoes: [{"codigo":"03027","peso":"700g","preco":24.9},{"codigo":"03004","peso":"5kg","preco":151.9},{"codigo":"03008","peso":"6x700g","preco":141.9}],
    descricao: "Ração premium para psitacídeos de grande porte, com ovos desidratados e ingredientes funcionais. Enriquecida com vitaminas, minerais e probióticos, oferece digestão saudável e nutrição completa." },
  { id: "calopsita-sp", nome: "Nutri Sup Prem Calopsita Frutas", linha: "Linha Super Premium", categoria: "passaros", peso: "300g", preco: 14.9, featured: true, imagem: "img/p/calopsita-sp.webp", codigo: "06100", pagina: 4, variacoes: [{"codigo":"06100","peso":"300g","preco":14.9}],
    descricao: "Ração premium para calopsitas, composta por um mix de extrusados com frutas cristalizadas e maçã desidratada. Enriquecida com ovos desidratados, vitaminas e minerais essenciais, oferece uma nutrição equilibrada e saudável para aves." },
  { id: "canario", nome: "Nutri Canário", linha: "Linha Super Premium", categoria: "passaros", peso: "350g", preco: 12.9, featured: false, imagem: "img/p/canario.webp", codigo: "03020", pagina: 4, variacoes: [{"codigo":"03020","peso":"350g","preco":12.9},{"codigo":"03041","peso":"5kg","preco":148.9},{"codigo":"03010","peso":"6x350g","preco":73.9}],
    descricao: "Ração premium para canários, composta por um mix de extrusados. Com ovos desidratados, vitaminas e minerais essenciais, favorece o desenvolvimento saudável e a vitalidade, além de contribuir para uma plumagem brilhante." },
  { id: "nativos", nome: "Nutri Nativos", linha: "Linha Super Premium", categoria: "passaros", peso: "500g", preco: 15.9, featured: false, imagem: "img/p/nativos.webp", codigo: "03023", pagina: 5, variacoes: [{"codigo":"03023","peso":"500g","preco":15.9},{"codigo":"03001","peso":"5kg","preco":131.9},{"codigo":"03000","peso":"6x500g","preco":90.9}],
    descricao: "Alimento para pássaros nativos, feito com um mix de extrusados e ovos desidratados. Enriquecido com vitaminas e minerais, promove saúde e vitalidade, garantindo uma dieta balanceada e saborosa." },
  { id: "curio-azulao", nome: "Nutri Curió e Azulão", linha: "Linha Super Premium", categoria: "passaros", peso: "325g", preco: 16.9, featured: false, imagem: "img/p/curio-azulao.webp", codigo: "03021", pagina: 5, variacoes: [{"codigo":"03021","peso":"325g","preco":16.9},{"codigo":"03006","peso":"6x325g","preco":95.9}],
    descricao: "Alimento para curió e azulão, feito com farelos e ovos desidratados. Enriquecido com vitaminas e minerais, promove saúde e energia, garantindo uma nutrição atrativa e equilibrada." },
  { id: "papagaio-torneio", nome: "Nutri Papagaio Frutas Premium", linha: "Linha Torneio", categoria: "passaros", peso: "500g", preco: 18.9, featured: true, imagem: "img/p/papagaio-torneio.webp", codigo: "03310", pagina: 5, variacoes: [{"codigo":"03310","peso":"500g","preco":18.9}],
    descricao: "A Papagaios Frutas Premium oferece uma nutrição completa com ingredientes selecionados, como sementes de girassol, amendoim, coco e frutas cristalizadas. Desenvolvida para atender às necessidades nutricionais dos papagaios, promove a saúde e bem-estar dessas aves." },
  { id: "calopsita-torneio", nome: "Nutri Calopsita Frutas Prem", linha: "Linha Torneio", categoria: "passaros", peso: "500g", preco: 14.9, featured: true, imagem: "img/p/calopsita-torneio.webp", codigo: "07001", pagina: 6, variacoes: [{"codigo":"07001","peso":"500g","preco":14.9}],
    descricao: "A nutri Calopsitas, Agapornis e Rose Faces com frutas combina grãos como alpiste, arroz, painço, milheto, aveia, trigo mourisco e sorgo. Além de frutas cristalizadas, é enriquecida com vitaminas e minerais, garantindo uma nutrição completa e equilibrada para a saúde dessas aves." },
  { id: "oleosa-corr", nome: "Nutri Torneio S Prem Oleosa Corr", linha: "Linha Torneio", categoria: "passaros", peso: "500g", preco: 17.9, featured: false, imagem: "img/p/oleosa-corr.webp", codigo: "03082", pagina: 6, variacoes: [{"codigo":"03082","peso":"500g","preco":17.9},{"codigo":"03083","peso":"12x500g","preco":203.9}],
    descricao: "Ração oleosa com extrusado e frutas, ideal para Sabiá, Pássaro Preto e Corrupião, com milho, soja, amendoim e frutas cristalizadas. Nutrição rica em proteínas e vitaminas, promovendo saúde e bem-estar." },
  { id: "pixarro-frutas", nome: "Nutri Pixarro Frutas Torneio", linha: "Linha Torneio", categoria: "passaros", peso: "500g", preco: 17.9, featured: false, imagem: "img/p/pixarro-frutas.webp", codigo: "07002", pagina: 6, variacoes: [{"codigo":"07002","peso":"500g","preco":17.9},{"codigo":"07003","peso":"12x500g","preco":203.9}],
    descricao: "Mistura para Pixarro (Trinca Ferro) com frutas, composta de milho, trigo, arroz, aveia, sorgo, alpiste e amendoim. Enriquecida com frutas cristalizadas, oferece nutrição equilibrada para a saúde e bem-estar da ave." },
  { id: "farinhada-calopsita", nome: "Nutri Farinhada Calopsita Frutas", linha: "Linha Torneio", categoria: "passaros", peso: "500g", preco: 16.9, featured: false, imagem: "img/p/farinhada-calopsita.webp", codigo: "03089", pagina: 5, variacoes: [{"codigo":"03089","peso":"500g","preco":16.9},{"codigo":"03087","peso":"12x500g","preco":192.9}],
    descricao: "A farinhada para Calopsitas, Agapornis e Rose Faces oferece nutrição completa, com ovo desidratado e frutas cristalizadas. Desenvolvida para garantir a saúde e bem-estar dessas aves." },
  { id: "barrinha-calopsita-frutas", nome: "Barrinha Calopsita Frutas", linha: "Linha Torneio", categoria: "passaros", peso: "2 un", preco: 6.9, featured: false, imagem: "img/p/barrinha-calopsita-frutas.webp", codigo: "06414", pagina: 7, variacoes: [{"codigo":"06414","peso":"2u","preco":6.9},{"codigo":"06524","peso":"24x2u","preco":156.9}],
    descricao: "Deliciosa e nutritiva, a barrinha para calopsita é feita com frutas selecionadas e rica em vitaminas e minerais. Fácil de pendurar na gaiola, estimula o forrageio e promove saúde e bem-estar para o seu pet." },
  { id: "barrinha-canario", nome: "Barrinha Canário", linha: "Linha Torneio", categoria: "passaros", peso: "2 un", preco: 6.9, featured: false, imagem: "img/p/barrinha-canario.webp", codigo: "06411", pagina: 7, variacoes: [{"codigo":"06411","peso":"2u","preco":6.9},{"codigo":"06521","peso":"24x2u","preco":156.9}],
    descricao: "A barrinha para canário é um petisco saboroso, feito com sementes e ingredientes naturais. Rica em vitaminas e minerais, promove saúde e vitalidade. Prática de pendurar, estimula o forrageio e torna a alimentação mais divertida!" },
  { id: "nectar", nome: "Nutri Néctar", linha: "Linha Torneio", categoria: "passaros", peso: "150g", preco: 12.9, featured: true, imagem: "img/p/nectar.webp", codigo: "03080", pagina: 7, variacoes: [{"codigo":"03080","peso":"150g","preco":12.9}],
    descricao: "O néctar para beija-flor e colibris é uma mistura rica em açúcares naturais e vitaminas, ideal para atrair e nutrir essas aves. Fácil de preparar, basta misturar com água e colocar em alimentadores, garantindo energia e saúde para os seus visitantes do jardim!" },
  { id: "papinha", nome: "Nutri Papinha", linha: "Linha Torneio", categoria: "passaros", peso: "150g", preco: 13.9, featured: false, imagem: "img/p/papinha.webp", codigo: "03031", pagina: 7, variacoes: [{"codigo":"03031","peso":"150g","preco":13.9}],
    descricao: "A papinha para filhotes é um alimento nutritivo e de fácil digestão, ideal para o crescimento saudável das aves jovens. Rica em vitaminas e minerais, garante energia e desenvolvimento adequado. Prática de preparar, é perfeita para refeições dos filhotes!" },

  /* ——— Roedores ——— */
  { id: "nutri-chinchila", nome: "Nutri Chinchila e Porquinho da Índia", linha: "Linha Super Premium", categoria: "roedores", peso: "500g", preco: 19.9, featured: true, imagem: "img/p/nutri-chinchila.webp", codigo: "03047", pagina: 27, variacoes: [{"codigo":"03047","peso":"500g","preco":19.9},{"codigo":"03048","peso":"6x500g","preco":112.9}],
    descricao: "Alimento completo para Chinchila e Porquinho-da-Índia, formulado para suprir as necessidades nutricionais específicas desses pets. Proporciona uma dieta equilibrada que promove saúde, energia e bem-estar diário, contribuindo para uma vida longa e saudável." },
  { id: "nutri-hamster-500", nome: "Nutri Hamster", linha: "", categoria: "roedores", peso: "500g", preco: 9.9, featured: true, imagem: "img/p/nutri-hamster-500.webp", codigo: "06120", pagina: 27, variacoes: [{"codigo":"06120","peso":"500g","preco":9.9},{"codigo":"01185","peso":"20x500g","preco":187.9},{"codigo":"00365","peso":"10kg","preco":155.9}],
    descricao: "Ração Nutri Hamster." },
  { id: "nutri-hamster-10kg", nome: "Nutri Hamster", linha: "", categoria: "roedores", peso: "10kg", preco: 155.9, featured: false, imagem: "img/p/nutri-hamster-10kg.webp", codigo: "00365", pagina: 27, variacoes: [{"codigo":"06120","peso":"500g","preco":9.9},{"codigo":"01185","peso":"20x500g","preco":187.9},{"codigo":"00365","peso":"10kg","preco":155.9}], ativo: false, mescladoEm: "nutri-hamster-500",
    descricao: "Ração Nutri Hamster." },
  { id: "funny-bunny-500", nome: "Funny Bunny Delícias da Horta 0,5kg", linha: "", categoria: "roedores", peso: "0,5kg", preco: 18.9, featured: true, imagem: "img/p/funny-bunny-500.webp", codigo: "01240", pagina: 27, variacoes: [{"codigo":"01240","peso":"0,5kg","preco":18.9}], revisar: "No catálogo, o código 01240 aparece para duas versões de 0,5 kg (Delícias da Horta e “B”). Confirmar com o representante o código desta versão.",
    descricao: "Alimento Funny Bunny para roedores." },
  { id: "serragem-fina", nome: "Serragem Fina Hamsters MS Pet", linha: "", categoria: "roedores", peso: "350g", preco: 6.9, featured: true, imagem: "img/p/serragem-fina.webp", codigo: "01431", pagina: 49, variacoes: [{"codigo":"01431","peso":"350g","preco":6.9}],
    descricao: "Serragem fina para hamsters MS Pet." },
  { id: "serragem-prensada", nome: "Serragem Prensada Hamsters MS Pet", linha: "", categoria: "roedores", peso: "800g", preco: 14.9, featured: false, imagem: "img/p/serragem-prensada.webp", codigo: "00017", pagina: 49, variacoes: [{"codigo":"00017","peso":"800g","preco":14.9}],
    descricao: "Serragem prensada para hamsters MS Pet." },

  /* ——— Cães e gatos ——— */
  { id: "colosso-filhotes-carne", nome: "Colosso Premium Cães Filhotes Carne e Arroz", linha: "Colosso Premium", categoria: "caes-gatos", peso: "10,1kg", preco: 119.9, featured: true, imagem: "img/p/colosso-filhotes-carne.webp", codigo: "09004", pagina: 19, variacoes: [{"codigo":"09004","peso":"10,1kg","preco":119.9}], revisar: "",
    descricao: "Ração Colosso Premium para cães filhotes, sabor carne e arroz." },
  { id: "colosso-filhotes-frango", nome: "Colosso Premium Cães Filhotes Frango e Arroz", linha: "Colosso Premium", categoria: "caes-gatos", peso: "10,1kg", preco: 119.9, featured: false, imagem: "img/p/colosso-filhotes-frango.webp", codigo: "09005", pagina: 19, variacoes: [{"codigo":"09005","peso":"10,1kg","preco":119.9}], revisar: "",
    descricao: "Ração Colosso Premium para cães filhotes, sabor frango e arroz." },
  { id: "colosso-racpeq-carne", nome: "Colosso Premium Cães Raças Pequenas Carne e Arroz", linha: "Colosso Premium", categoria: "caes-gatos", peso: "15kg", preco: 154.9, featured: false, imagem: "img/p/colosso-racpeq-carne.webp", codigo: "09003", pagina: 19, variacoes: [{"codigo":"09003","peso":"15kg","preco":154.9}], revisar: "No catálogo, o código 09003 aparece para Raças Pequenas Carne e também para Raças Pequenas Frango. Confirmar o código com o representante.",
    descricao: "Ração Colosso Premium para cães de raças pequenas, sabor carne e arroz." },
  { id: "colosso-adultos-carne", nome: "Colosso Premium Cães Adultos Carne e Arroz", linha: "Colosso Premium", categoria: "caes-gatos", peso: "15kg", preco: 149.9, featured: false, imagem: "img/p/colosso-adultos-carne.webp", codigo: "09000", pagina: 19, variacoes: [{"codigo":"09000","peso":"15kg","preco":149.9}], revisar: "",
    descricao: "Ração Colosso Premium para cães adultos, sabor carne e arroz." },
  { id: "colosso-gato-salmao", nome: "Colosso Premium Gatos Adultos e Filhotes Salmão e Arroz", linha: "Colosso Premium", categoria: "caes-gatos", peso: "10,1kg", preco: 119.9, featured: false, imagem: "img/p/colosso-gato-salmao.webp", codigo: "09012", pagina: 19, variacoes: [{"codigo":"09012","peso":"10,1kg","preco":119.9}], revisar: "",
    descricao: "Ração Colosso Premium para gatos adultos e filhotes, sabor salmão e arroz." },
  { id: "colosso-gato-castrado-salmao", nome: "Colosso Premium Gatos Castrados Salmão e Arroz", linha: "Colosso Premium", categoria: "caes-gatos", peso: "10,1kg", preco: 129.9, featured: true, imagem: "img/p/colosso-gato-castrado-salmao.webp", codigo: "09015", pagina: 20, variacoes: [{"codigo":"09015","peso":"10,1kg","preco":129.9}], revisar: "",
    descricao: "Ração Colosso Premium para gatos castrados, sabor salmão e arroz." },
  { id: "felismax-10", nome: "Felismax Mix", linha: "Felismax", categoria: "caes-gatos", peso: "10,1kg", preco: 99.9, featured: true, imagem: "img/p/felismax-10.webp", codigo: "09032", pagina: 20, variacoes: [{"codigo":"09032","peso":"10,1kg","preco":99.9},{"codigo":"09030","peso":"20kg","preco":186.9}],
    descricao: "Felismax Mix, alimento para gatos sabor carne, frango e peixe." },
  { id: "felismax-20", nome: "Felismax Mix", linha: "Felismax", categoria: "caes-gatos", peso: "20kg", preco: 179.9, featured: false, imagem: "img/p/felismax-20.webp", codigo: "09030", pagina: 20, variacoes: [{"codigo":"09030","peso":"20kg","preco":179.9}], ativo: false, mescladoEm: "felismax-10",
    descricao: "Felismax Mix, alimento para gatos sabor carne, frango e peixe." },
  { id: "pate-adulto-carne", nome: "Patê Colosso Cães Adultos Carne", linha: "Colosso", categoria: "caes-gatos", peso: "280g", preco: 9.9, featured: true, imagem: "img/p/pate-adulto-carne.webp", codigo: "03804", pagina: 22, variacoes: [{"codigo":"03804","peso":"280g","preco":9.9}], revisar: "",
    descricao: "Patê Colosso para cães adultos, sabor carne." },
  { id: "pate-gato-carne", nome: "Patê Colosso Gatos Carne", linha: "Colosso", categoria: "caes-gatos", peso: "280g", preco: 9.9, featured: false, imagem: "img/p/pate-gato-carne.webp", codigo: "03805", pagina: 22, variacoes: [{"codigo":"03805","peso":"280g","preco":9.9}], revisar: "",
    descricao: "Patê Colosso para gatos, sabor carne." },
  { id: "molho-churrasco", nome: "Molho Colosso Churrasco", linha: "Colosso", categoria: "caes-gatos", peso: "250g", preco: 9.9, featured: false, imagem: "img/p/molho-churrasco.webp", codigo: "05607", pagina: 23, variacoes: [{"codigo":"05607","peso":"250g","preco":9.9}], revisar: "",
    descricao: "Molho Colosso sabor churrasco." },
  { id: "bifitos-carne", nome: "Bifitos Colosso Filhote Carne", linha: "Colosso", categoria: "caes-gatos", peso: "65g", preco: 6.9, featured: true, imagem: "img/p/bifitos-carne.webp", codigo: "03102", pagina: 24, variacoes: [{"codigo":"03102","peso":"65g","preco":6.9}], revisar: "",
    descricao: "Petisco Bifitos Colosso para filhotes, sabor carne." },
  { id: "bifitos-churrasco", nome: "Bifitos Colosso Churrasco", linha: "Colosso", categoria: "caes-gatos", peso: "65g", preco: 6.9, featured: false, imagem: "img/p/bifitos-churrasco.webp", codigo: "03104", pagina: 24, variacoes: [{"codigo":"03104","peso":"65g","preco":6.9}], revisar: "",
    descricao: "Petisco Bifitos Colosso sabor churrasco." },

  /* ——— Veterinários ——— */
  { id: "cantolindo-calcio", nome: "Cantolindo Cálcio", linha: "Cantolindo", categoria: "veterinarios", peso: "20ml", preco: 18.9, featured: true, imagem: "img/p/cantolindo-calcio.webp", codigo: "05162", pagina: 114, variacoes: [{"codigo":"05162","peso":"20ml","preco":18.9}],
    descricao: "Cantolindo Cálcio." },
  { id: "cantolindo-antibiotico", nome: "Cantolindo Antibiótico", linha: "Cantolindo", categoria: "veterinarios", peso: "20ml", preco: 19.9, featured: true, imagem: "img/p/cantolindo-antibiotico.webp", codigo: "05628", pagina: 114, variacoes: [{"codigo":"05628","peso":"20ml","preco":19.9}],
    descricao: "Cantolindo Antibiótico." },
  { id: "cantolindo-antitoxico", nome: "Cantolindo Antitóxico", linha: "Cantolindo", categoria: "veterinarios", peso: "30ml", preco: 21.9, featured: false, imagem: "img/p/cantolindo-antitoxico.webp", codigo: "05630", pagina: 114, variacoes: [{"codigo":"05630","peso":"30ml","preco":21.9}],
    descricao: "Cantolindo Antitóxico." },
  { id: "matacura-sabonete", nome: "Sabão Matacura Sarnicida", linha: "Matacura", categoria: "veterinarios", peso: "80g", preco: 16.5, featured: true, imagem: "img/p/matacura-sabonete.webp", codigo: "00522", pagina: 36, variacoes: [{"codigo":"00522","peso":"80g","preco":16.5}], revisar: "",
    descricao: "Sabão Matacura sarnicida." },
  { id: "matacura-shampoo", nome: "Shampoo Matacura Antipulgas Sarnicida", linha: "Matacura", categoria: "veterinarios", peso: "200ml", preco: 24.9, featured: true, imagem: "img/p/matacura-shampoo.webp", codigo: "02512", pagina: 36, variacoes: [{"codigo":"02512","peso":"200ml","preco":24.9}], revisar: "",
    descricao: "Shampoo Matacura antipulgas sarnicida." },
  { id: "matacura-shampoo-neutro", nome: "Shampoo Matacura Neutro", linha: "Matacura", categoria: "veterinarios", peso: "200ml", preco: 24.9, featured: false, imagem: "img/p/matacura-shampoo-neutro.webp", codigo: "03547", pagina: 37, variacoes: [{"codigo":"03547","peso":"200ml","preco":24.9}],
    descricao: "Shampoo Matacura Neutro." },
  { id: "matacura-condic", nome: "Condicionador Matacura A/P Sarnicida", linha: "Matacura", categoria: "veterinarios", peso: "200ml", preco: 25.9, featured: false, imagem: "img/p/matacura-condic.webp", codigo: "02088", pagina: 36, variacoes: [{"codigo":"02088","peso":"200ml","preco":25.9}], revisar: "",
    descricao: "Condicionador Matacura antiparasitário sarnicida." },

  /* ——— Acessórios ——— */
  { id: "ninho-manon", nome: "Ninho Madeira Manon MS Pet", linha: "MS Pet", categoria: "acessorios", peso: "", preco: 16.9, featured: true, imagem: "img/p/ninho-manon.webp", codigo: "00019", pagina: 51, variacoes: [{"codigo":"00019","peso":"","preco":16.9}],
    descricao: "Ninho de madeira Manon MS Pet." },
  { id: "ninho-periquito", nome: "Ninho Madeira Periquito MS Pet", linha: "MS Pet", categoria: "acessorios", peso: "", preco: 18.9, featured: true, imagem: "img/p/ninho-periquito.webp", codigo: "00020", pagina: 51, variacoes: [{"codigo":"00020","peso":"","preco":18.9}],
    descricao: "Ninho de madeira para periquito MS Pet." },
  { id: "gaiola-triangular", nome: "Gaiola Pássaros Triangular", linha: "", categoria: "acessorios", peso: "", preco: 89.9, featured: true, imagem: "img/p/gaiola-triangular.webp", codigo: "01003", pagina: 52, variacoes: [{"codigo":"01003","peso":"","preco":89.9}], revisar: "O catálogo traz a mesma medida (36x27x20 cm) para a gaiola oval e a triangular e não tem foto da triangular. Confirmar medida e modelo com o representante.",
    descricao: "Gaiola para pássaros, modelo triangular." },
  { id: "seringa", nome: "Seringa Plástica Grande para Pássaros MS Pet", linha: "MS Pet", categoria: "acessorios", peso: "", preco: 7.9, featured: false, imagem: "img/p/seringa.webp", codigo: "04667", pagina: 52, variacoes: [{"codigo":"04667","peso":"","preco":7.9}], revisar: "",
    descricao: "Seringa plástica para pássaros MS Pet." },
  { id: "serragem-psitacideos", nome: "Serragem para Psitacídeos MS Pet", linha: "MS Pet", categoria: "acessorios", peso: "100g", preco: 8.9, featured: false, imagem: "img/p/serragem-psitacideos.webp", codigo: "03506", pagina: 49, variacoes: [{"codigo":"03506","peso":"100g","preco":8.9}],
    descricao: "Serragem para psitacídeos MS Pet." },

  /* ——— Jardinagem ——— */
  { id: "mata-mato-1l", nome: "Mata Mato Mademato Plus", linha: "", categoria: "jardinagem", peso: "1 L", preco: 24.9, featured: true, imagem: "img/p/mata-mato-1l.webp", codigo: "02669", pagina: 67, variacoes: [{"codigo":"02669","peso":"1 L","preco":24.9}],
    descricao: "Mata Mato Mademato Plus." },
  { id: "mata-pulgas", nome: "Mata Pulgas Madepulga", linha: "", categoria: "jardinagem", peso: "12×50g", preco: 29.9, featured: true, imagem: "img/p/mata-pulgas.webp", codigo: "02672", pagina: 67, variacoes: [{"codigo":"02672","peso":"12×50g","preco":29.9}],
    descricao: "Mata Pulgas Madepulga." },
  { id: "sempre-verde-killer", nome: "Sempre Verde Killer Lagarta e Pulgão", linha: "Sempre Verde", categoria: "jardinagem", peso: "30ml", preco: 14.9, featured: true, imagem: "img/p/sempre-verde-killer.webp", codigo: "01242", pagina: 71, variacoes: [{"codigo":"01242","peso":"30ml","preco":14.9}],
    descricao: "Sempre Verde Killer Lagarta e Pulgão." },
  { id: "sempre-verde-neem", nome: "Sempre Verde Killer Neem Pronto Uso", linha: "Sempre Verde", categoria: "jardinagem", peso: "750ml", preco: 16.9, featured: false, imagem: "img/p/sempre-verde-neem.webp", codigo: "00631", pagina: 70, variacoes: [{"codigo":"00631","peso":"750ml","preco":16.9}], revisar: "",
    descricao: "Sempre Verde Neem." },
  { id: "sempre-verde-foliar", nome: "Sempre Verde Foliar 07-07-07", linha: "Sempre Verde", categoria: "jardinagem", peso: "160ml", preco: 12.9, featured: false, imagem: "img/p/sempre-verde-foliar.webp", codigo: "00534", pagina: 70, variacoes: [{"codigo":"00534","peso":"160ml","preco":12.9}],
    descricao: "Sempre Verde Foliar (07-07-07)." },
  { id: "adubo-04-14-08", nome: "Adubo 04-14-08 Ultra Verde", linha: "Sempre Verde", categoria: "jardinagem", peso: "1kg", preco: 14.9, featured: false, imagem: "img/p/adubo-04-14-08.webp", codigo: "00009", pagina: 70, variacoes: [{"codigo":"00009","peso":"1kg","preco":14.9}], revisar: "",
    descricao: "Adubo 04-14-08 Ultra Verde." },
  { id: "adubo-10-10-10", nome: "Adubo 10-10-10 Ultra Verde", linha: "Sempre Verde", categoria: "jardinagem", peso: "1kg", preco: 18.9, featured: false, imagem: "img/p/adubo-10-10-10.webp", codigo: "00011", pagina: 70, variacoes: [{"codigo":"00011","peso":"1kg","preco":18.9}], revisar: "",
    descricao: "Fertilizante fórmula 10-10-10 Ultra Verde." },

  /* ——— Sementes de horta ——— */
  { id: "semente-alface-mimosa", nome: "Semente Alface Mimosa Salad Bowl", linha: "Topseed", categoria: "sementes", peso: "", preco: 5.9, featured: true, imagem: "img/p/semente-alface-mimosa.webp", codigo: "00055", pagina: 77, variacoes: [{"codigo":"00055","peso":"","preco":5.9}], revisar: "",
    descricao: "Semente de alface mimosa Salad Bowl." },
  { id: "semente-almeirao", nome: "Semente Almeirão Folha Larga", linha: "Topseed", categoria: "sementes", peso: "", preco: 5.9, featured: false, imagem: "img/p/semente-almeirao.webp", codigo: "00058", pagina: 77, variacoes: [{"codigo":"00058","peso":"","preco":5.9}], revisar: "",
    descricao: "Semente de almeirão folha larga (radiche)." },
  { id: "semente-cenoura", nome: "Semente Cenoura Brasília Alta Seleção", linha: "Topseed", categoria: "sementes", peso: "", preco: 5.9, featured: true, imagem: "img/p/semente-cenoura.webp", codigo: "00157", pagina: 77, variacoes: [{"codigo":"00157","peso":"","preco":5.9}], revisar: "",
    descricao: "Semente de cenoura Brasília." },
  { id: "semente-coentro", nome: "Semente Coentro Português", linha: "Topseed", categoria: "sementes", peso: "", preco: 5.9, featured: true, imagem: "img/p/semente-coentro.webp", codigo: "00165", pagina: 77, variacoes: [{"codigo":"00165","peso":"","preco":5.9}], revisar: "",
    descricao: "Semente de coentro português." },
  { id: "semente-cebola", nome: "Semente Cebola Baia Periforme", linha: "Topseed", categoria: "sementes", peso: "", preco: 5.9, featured: false, imagem: "img/p/semente-cebola.webp", codigo: "00154", pagina: 77, variacoes: [{"codigo":"00154","peso":"","preco":5.9}], revisar: "",
    descricao: "Semente de cebola baia." },

  /* ——— Aquarismo ——— */
  { id: "alcon-basic", nome: "Alcon Basic", linha: "Alcon", categoria: "aquarismo", peso: "20g", preco: 14.9, featured: true, imagem: "img/p/alcon-basic.webp", codigo: "00026", pagina: 29, variacoes: [{"codigo":"00025","peso":"10g","preco":7.9},{"codigo":"00026","peso":"20g","preco":14.9},{"codigo":"00027","peso":"50g","preco":34.9}],
    descricao: "Alimento Alcon Basic para peixes ornamentais." },
  { id: "alcon-bettamix", nome: "Alcon Bettamix", linha: "Alcon", categoria: "aquarismo", peso: "10g", preco: 10.9, featured: true, imagem: "img/p/alcon-bettamix.webp", codigo: "00028", pagina: 29, variacoes: [{"codigo":"00028","peso":"10g","preco":10.9}], revisar: "",
    descricao: "Alimento Alcon Bettamix." },
  { id: "alcon-bottom", nome: "Alcon Bottom Fish", linha: "Alcon", categoria: "aquarismo", peso: "30g", preco: 19.9, featured: true, imagem: "img/p/alcon-bottom.webp", codigo: "00043", pagina: 29, variacoes: [{"codigo":"00043","peso":"30g","preco":19.9}], revisar: "",
    descricao: "Alimento Alcon Bottom Fish." },
  { id: "alcon-colours", nome: "Alcon Colours", linha: "Alcon", categoria: "aquarismo", peso: "10g", preco: 12.9, featured: false, imagem: "img/p/alcon-colours.webp", codigo: "00029", pagina: 29, variacoes: [{"codigo":"00029","peso":"10g","preco":12.9},{"codigo":"00030","peso":"20g","preco":23.9},{"codigo":"00031","peso":"50g","preco":56.9}], revisar: "No catálogo, o código 00029 aparece para Colours 10 g e também para Mini Betta 25 g. Confirmar o código da embalagem de 10 g com o representante.",
    descricao: "Alimento Alcon Colours para peixes ornamentais." }
];

function produtoPorId(id) {
  return PRODUTOS.find((p) => p.id === id);
}

function produtosPorCategoria(catId, onlyFeatured) {
  return PRODUTOS.filter((p) => p.categoria === catId && (!onlyFeatured || p.featured));
}
