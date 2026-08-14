# Terra Command Network — Portfólio de soluções digitais

Portfólio estático, preparado para publicar na Vercel.

## Executar

```powershell
cd "C:\painel terra perdida\pizzaria-artesanal-template"
python -m http.server 8080
```

Abra a URL exibida pelo servidor local.

## Personalização centralizada

- `js/portfolio-config.js`: marca, logo futuro, WhatsApp, e-mail, redes sociais, domínio, CTA e cor principal.
- `js/demo-data.js`: conteúdo, cores e imagens de cada demonstração.

## Rotas

- `/`
- `/demo/pizzaria`
- `/demo/clinica`
- `/demo/estetica`
- `/demo/advocacia`
- `/demo/imobiliaria`
- `/demo/academia`
- `/demo/servicos`
- `/demo/empresa`

## Publicar na Vercel

1. Crie um projeto novo na Vercel e conecte este repositório/pasta.
2. Use o preset **Other**: não há comando de build e o diretório de publicação é `.`.
3. Faça o deploy. O arquivo `vercel.json` já mantém URLs limpas e as rotas por diretório funcionam em acessos diretos.
4. Configure seu domínio quando tiver um e atualize `domain` em `js/portfolio-config.js`.

Antes de publicar, substitua imagens demonstrativas por mídia licenciada/aprovada, preencha o WhatsApp autorizado e revise Open Graph para o domínio definitivo.
