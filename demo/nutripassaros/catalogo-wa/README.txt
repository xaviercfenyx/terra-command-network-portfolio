CATÁLOGO DIGITAL NUTRIPÁSSAROS – PEDIDO PELO WHATSAPP
=====================================================

O que é
- Página estática (HTML/CSS/JS), sem servidor, sem pagamento e sem checkout.
- O cliente busca por nome/código/embalagem, filtra por linha, escolhe a
  quantidade e:
    * "Comprar"   -> adiciona o item à lista de pedido (salva no navegador).
    * "Orçamento" -> abre o WhatsApp na hora pedindo preço e disponibilidade
                     só daquele item (não entra na lista).
- A lista de pedido mostra preço unitário, subtotal e total ESTIMADO e envia
  tudo para o WhatsApp do representante.

PREÇOS
- O PDF não tem preços. Todos os valores (campo "demoPrice" em products.json)
  são FICTÍCIOS, gerados só para demonstração, proporcionais à embalagem.
  Aparecem na página como "preço demonstrativo" e na mensagem como
  "(valores demonstrativos)". Para usar preços reais, substitua o campo
  demoPrice em products.json e regenere assets/products.js (ver abaixo).

NÚMERO DO WHATSAPP  (IMPORTANTE)
- Fica em UM lugar só: assets/app.js, primeira constante do arquivo:
      const WHATSAPP_NUMBER = '5511984871786';
  Substitua pelo número real do Francisco (formato 55 + DDD + número, só
  dígitos) antes de publicar.
- Link usado: https://wa.me/<WHATSAPP_NUMBER>?text=<mensagem codificada>

Arquivos
- index.html            página
- assets/style.css      visual (mobile-first)
- assets/app.js         lógica + CONFIGURAÇÃO (número do WhatsApp)
- assets/products.js    produtos embutidos (permite abrir o index.html direto,
                        sem servidor)
- products.json         base de produtos extraída do PDF (mesmo conteúdo)
- PENDENCIAS.txt        linhas ambíguas do PDF para conferir com o Francisco
- pendencias.json       idem, em JSON

Atualizar produtos
- Edite products.json e gere de novo o assets/products.js com:
    python3 -c "import json;d=json.load(open('products.json'));open('assets/products.js','w').write('window.NP_PRODUCTS='+json.dumps(d,ensure_ascii=False)+';')"

Imagens
- Não há fotos de produtos: os cards usam ilustrações por categoria
  (as fotos do PDF não ficam alinhadas aos códigos em várias páginas).
