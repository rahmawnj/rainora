document.addEventListener("DOMContentLoaded", async () => {
  const root = document.getElementById("product-detail");
  const id = new URLSearchParams(window.location.search).get("id");
  try {
    const response = await fetch("assets/data/products.json", { cache: "no-cache" });
    if (!response.ok) throw new Error("Product data request failed: " + response.status);
    const data = await response.json();
    const product = (data.products || []).find(item => item.id === id);
    if (!product) {
      root.innerHTML = '<section class="product-not-found"><div class="eyebrow">Rainora collection</div><h1>Product not found.</h1><a class="product-back" href="collection.html">← Back to collection</a></section>';
      return;
    }
    document.title = product.name + " — RAINORA";
    root.innerHTML = `
      <section class="product-detail">
        <div class="product-detail-image"><img src="${product.image}" alt="${product.name}"></div>
        <div class="product-detail-copy">
          <div class="eyebrow">${product.number} · ${product.categoryName}</div>
          <h1>${product.name}</h1>
          <p class="lead">${product.description}</p>
          <div class="product-meta">
            <div><small>Category</small><span>${product.categoryName}</span></div>
            <div><small>Size</small><span>${product.size}</span></div>
            <div><small>Scent notes</small><span>${product.notes}</span></div>
            <div><small>Collection</small><span>Rainora 2026</span></div>
          </div>
          <a class="product-back" href="collection.html?category=${encodeURIComponent(product.category)}">← Back to ${product.categoryName}</a>
        </div>
      </section>`;
  } catch (error) {
    console.error(error);
    root.innerHTML = '<section class="product-not-found"><h1>Collection belum dapat dimuat.</h1></section>';
  }
});