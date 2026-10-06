document.addEventListener("DOMContentLoaded", async () => {
  const art = document.querySelector(".hero-art");
  requestAnimationFrame(() => art?.classList.add("loaded"));

  const grid = document.getElementById("product-grid");
  const filters = [...document.querySelectorAll(".filter")];
  const count = document.getElementById("count");
  let products = [];

  try {
    const response = await fetch("assets/data/products.json", { cache: "no-cache" });
    if (!response.ok) throw new Error("Product data request failed: " + response.status);
    const data = await response.json();
    products = data.products || [];
    renderProducts(products);
    initFilters();
  } catch (error) {
    console.error(error);
    if (grid) grid.innerHTML = '<p class="empty-state">Collection belum dapat dimuat.</p>';
  }

  function renderProducts(items) {
    if (!grid) return;
    grid.innerHTML = items.map(product => `
      <a class="product" data-category="${product.category}" href="product.html?id=${encodeURIComponent(product.id)}">
        <img class="product-image" src="${product.image}" alt="${product.name}" loading="lazy">
        <div class="shade"></div>
        <div class="arrow">↗</div>
        <div class="product-info">
          <small>${product.number} · ${product.categoryName}</small>
          <h3>${product.name}</h3>
          <p>${product.shortDescription}</p>
        </div>
      </a>
    `).join("");
  }

  function initFilters() {
    function applyFilter(filter, updateUrl = true) {
      filters.forEach(button => button.classList.toggle("active", button.dataset.filter === filter));
      const visible = products.filter(product => filter === "all" || product.category === filter);
      renderProducts(visible);
      count.textContent = visible.length + " collection" + (visible.length === 1 ? "" : "s");

      if (updateUrl) {
        const url = new URL(window.location.href);
        if (filter === "all") url.searchParams.delete("category");
        else url.searchParams.set("category", filter);
        history.replaceState({}, "", url);
      }
    }

    filters.forEach(button => button.addEventListener("click", () => {
      applyFilter(button.dataset.filter);
      document.querySelector("#collection")?.scrollIntoView({ behavior: "smooth", block: "start" });
    }));

    const requested = new URLSearchParams(window.location.search).get("category");
    applyFilter(requested && filters.some(button => button.dataset.filter === requested) ? requested : "all", false);
    if (requested) setTimeout(() => document.querySelector("#collection")?.scrollIntoView({ behavior: "smooth", block: "start" }), 50);
  }
});