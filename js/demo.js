(() => {
  const slug = document.documentElement.dataset.demo;
  const data = window.DEMO_DATA && window.DEMO_DATA[slug];
  const portfolio = window.PORTFOLIO_CONFIG && window.PORTFOLIO_CONFIG.studio;
  if (!data || !portfolio) return;
  const wa = `https://wa.me/${String(portfolio.whatsappNumber || "").replace(/\D/g, "")}?text=${encodeURIComponent(`${portfolio.whatsappMessage}\n\nTenho interesse na demonstração ${data.name}.`)}`;
  document.documentElement.style.setProperty("--accent", data.accent);
  document.body.classList.add(`theme-${data.theme}`);
  document.title = `${data.name} — Demonstração | ${portfolio.name}`;
  document.querySelector('meta[name="description"]').content = `Demonstração de landing page para ${data.name}. Projeto fictício do portfólio ${portfolio.name}.`;
  document.querySelector("main").innerHTML = `
    <section class="hero"><div class="hero-copy"><p class="eyebrow">${data.eyebrow}</p><h1>${data.hero}</h1><p>${data.copy}</p><a class="cta wa-link" href="${wa}" target="_blank" rel="noopener">${data.cta} <span>→</span></a></div><div class="hero-img"><img src="${data.image}" alt="Imagem demonstrativa para ${data.name}" fetchpriority="high"></div></section>
    <div class="proof">${data.proof}</div>
    <section class="section"><div class="w"><div class="intro"><div><p class="eyebrow">Como podemos ajudar</p><h2>Um atendimento pensado<br>para o seu <em>momento.</em></h2></div><p>Uma demonstração de estrutura, conteúdo e chamadas que podem ser adaptados à realidade da sua empresa.</p></div><div class="items">${data.items.map(([title,text],i)=>`<article class="item"><b>0${i+1}</b><h3>${title}</h3><p>${text}</p></article>`).join("")}</div></div></section>
    <section class="feature"><div class="w feature-grid"><div><p class="eyebrow">Atendimento com intenção</p><h2>${data.featureTitle}</h2></div><p>${data.feature}</p></div></section>
    <section class="section reviews"><div class="w"><p class="eyebrow">Uma boa experiência fica</p><h2 class="title">O que as pessoas diriam.</h2><div class="review-grid">${data.reviews.map((review)=>`<blockquote class="review">${review}<small>Depoimento demonstrativo</small></blockquote>`).join("")}</div></div></section>
    <section class="section"><div class="w contact"><div><p class="eyebrow">Vamos conversar</p><h2 class="title">Pronto para dar o próximo passo?</h2></div><div><p>${data.location}</p><a class="cta wa-link" href="${wa}" target="_blank" rel="noopener">${data.cta} <span>→</span></a></div></div></section>`;
  document.querySelectorAll(".wa-link, .wa").forEach((node)=>node.href=wa);
  document.querySelector("[data-note]").textContent = data.note;
})();
