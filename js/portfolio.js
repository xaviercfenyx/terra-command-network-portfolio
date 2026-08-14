(() => {
  const cfg = window.PORTFOLIO_CONFIG;
  if (!cfg) return;
  const { studio, demos } = cfg;
  const wa = `https://wa.me/${String(studio.whatsappNumber || "").replace(/\D/g, "")}?text=${encodeURIComponent(studio.whatsappMessage)}`;
  document.documentElement.style.setProperty("--coral", studio.accent);
  document.querySelectorAll("[data-studio]").forEach((node) => {
    const key = node.dataset.studio;
    if (key === "logoMark") { node.textContent = studio.logo?.mark || ""; }
    else if (key === "instagramLink") {
      if (!studio.instagram) { node.hidden = true; return; }
      node.href = `https://instagram.com/${studio.instagram.replace(/^@/, "")}`;
      node.textContent = `@${studio.instagram.replace(/^@/, "")}`;
    }
    else if (key === "emailLink") { node.href = `mailto:${studio.email}`; node.textContent = studio.email; }
    else node.textContent = studio[key] || "";
  });
  document.querySelectorAll(".wa-link").forEach((link) => link.href = wa);
  document.querySelector("#demo-grid").innerHTML = demos.map((demo) => `<a class="demo-card" href="demo/${demo.slug}/"><img src="${demo.image}" alt="Demonstração para ${demo.category}" loading="lazy"><span class="demo-body"><small>${demo.category}</small><h3>${demo.name}</h3><p>${demo.text}</p><span class="arrow">Ver demonstração <span>→</span></span></span></a>`).join("");
})();
