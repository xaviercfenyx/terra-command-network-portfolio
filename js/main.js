(() => {
  const config = window.LANDING_CONFIG;
  if (!config) return;
  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
  const { business, brand, images, products, benefits, testimonials, offer, navigation } = config;

  const escapeHtml = (text) => String(text).replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;" })[char]);
  const whatsappUrl = (message) => {
    const number = String(business.whatsappNumber || "").replace(/\D/g, "");
    const encoded = encodeURIComponent(message || business.whatsappMessage);
    return number ? `https://wa.me/${number}?text=${encoded}` : `https://wa.me/?text=${encoded}`;
  };
  const messageFor = (context) => `${business.whatsappMessage}${context ? `\n\nTenho interesse em: ${context}.` : ""}`;

  document.documentElement.style.setProperty("--accent", brand.accent);
  document.documentElement.style.setProperty("--dark", brand.dark);
  document.documentElement.style.setProperty("--cream", brand.cream);

  $$("[data-business]").forEach((element) => {
    const key = element.dataset.business;
    if (key === "instagramLink") {
      element.href = business.instagram ? `https://instagram.com/${business.instagram.replace(/^@/, "")}` : "#";
      element.textContent = business.instagram ? `@${business.instagram.replace(/^@/, "")}` : "Instagram";
    } else if (key === "mapsLink") {
      element.href = business.mapsUrl || "#";
    } else if (business[key]) {
      element.textContent = business[key];
    }
  });

  $("#hero-image").src = images.hero;
  $("#offer-image").src = images.offer;
  $("#story-image").src = images.story;
  $("#nav").innerHTML = navigation.map(([label, href]) => `<a href="${href}">${escapeHtml(label)}</a>`).join("");

  $("#products").innerHTML = products.map((product) => `
    <article class="product-card">
      <div class="product-image"><img src="${images[product.image]}" alt="Pizza ${escapeHtml(product.name)}" width="900" height="675" loading="lazy"><span>${escapeHtml(product.badge)}</span></div>
      <div class="product-body"><div class="product-name"><h3>${escapeHtml(product.name)}</h3><strong>${escapeHtml(product.price)}</strong></div><p>${escapeHtml(product.description)}</p><a class="order-link wa-link" data-message="${escapeHtml(product.name)}" href="#" target="_blank" rel="noopener">Pedir esta pizza <span>→</span></a></div>
    </article>`).join("");

  $("#benefits").innerHTML = benefits.map(([symbol, title, text], index) => `
    <article class="benefit"><span class="benefit-number">0${index + 1}</span><span class="benefit-symbol">${symbol}</span><h3>${escapeHtml(title)}</h3><p>${escapeHtml(text)}</p></article>`).join("");

  Object.entries(offer).forEach(([key, value]) => {
    const element = $(`[data-offer="${key}"]`);
    if (element) element.textContent = value;
  });

  $("#testimonials").innerHTML = testimonials.map((testimonial) => `
    <figure class="testimonial"><div class="quote-mark">“</div><blockquote>${escapeHtml(testimonial.quote)}</blockquote><figcaption><span class="avatar">${escapeHtml(testimonial.name.charAt(0))}</span><span><strong>${escapeHtml(testimonial.name)}</strong><small>${escapeHtml(testimonial.context)}</small></span></figcaption></figure>`).join("");
  $("[data-disclaimer]").textContent = config.socialProofDisclaimer;

  const hoursMarkup = business.hours.map(([day, time]) => `<div><span>${escapeHtml(day)}</span><strong>${escapeHtml(time)}</strong></div>`).join("");
  $("#hours").innerHTML = hoursMarkup;
  $("#footer-hours").innerHTML = business.hours.map(([day, time]) => `${escapeHtml(day)}: ${escapeHtml(time)}`).join("<br>");

  $$("[data-message]").forEach((link) => {
    const context = link.dataset.message === "lead" ? "" : link.dataset.message === "menu" ? "cardápio completo" : link.dataset.message === "offer" ? offer.title : link.dataset.message === "story" ? "atendimento" : link.dataset.message;
    link.href = whatsappUrl(messageFor(context));
  });

  const toggle = $(".menu-toggle");
  const nav = $("#nav");
  toggle.addEventListener("click", () => {
    const opened = nav.classList.toggle("open");
    toggle.classList.toggle("active", opened);
    toggle.setAttribute("aria-expanded", String(opened));
    document.body.classList.toggle("menu-open", opened);
  });
  $$("a", nav).forEach((link) => link.addEventListener("click", () => {
    nav.classList.remove("open"); toggle.classList.remove("active"); toggle.setAttribute("aria-expanded", "false"); document.body.classList.remove("menu-open");
  }));

  const header = $(".header");
  const onScroll = () => header.classList.toggle("scrolled", window.scrollY > 16);
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  const reveal = new IntersectionObserver((entries) => entries.forEach((entry) => {
    if (entry.isIntersecting) { entry.target.classList.add("shown"); reveal.unobserve(entry.target); }
  }), { threshold: 0.12 });
  $$(".product-card, .benefit, .testimonial, .story-copy, .info-card").forEach((element) => { element.classList.add("reveal"); reveal.observe(element); });
})();
