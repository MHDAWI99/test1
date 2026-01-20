document.addEventListener("DOMContentLoaded", () => {
  const list = document.getElementById("products");
  const cartBox = document.getElementById("cartBox");

  function renderProducts(){
    const q = document.getElementById("q").value.trim().toLowerCase();
    const cat = document.getElementById("cat").value;
    const sort = document.getElementById("sort").value;

    let items = window.PRODUCTS.slice();

    if(cat !== "all") items = items.filter(p => p.category === cat);
    if(q) items = items.filter(p => (p.name + " " + p.desc).toLowerCase().includes(q));
    if(sort === "low") items.sort((a,b)=>a.price-b.price);
    if(sort === "high") items.sort((a,b)=>b.price-a.price);

    list.innerHTML = items.map(p => `
      <div class="product">
        <a class="img" href="product.html?id=${encodeURIComponent(p.id)}">
          <img src="${p.image}" alt="${p.name}">
        </a>
        <div class="body">
          <div class="badge">${p.category}</div>
          <b>${p.name}</b>
          <div class="price">
            ${formatIQD(p.price)}
            <span style="color:var(--muted)"> / ${p.unit}</span>
          </div>
          <div class="actions">
            <button class="btn primary" onclick="addToCart('${p.id}',1)">أضف للسلة</button>
            <a class="btn" href="product.html?id=${encodeURIComponent(p.id)}">تفاصيل</a>
          </div>
        </div>
      </div>
    `).join("");
  }

  function renderCart(){
    const cart = getCart();
    if(!cart.length){
      cartBox.innerHTML = `<p style="color:var(--muted)">السلة فارغة.</p>`;
      document.getElementById("wa").href = "#";
      return;
    }
    // (بقية كود السلة مثل ما عندك)
  }

  document.getElementById("q").addEventListener("input", renderProducts);
  document.getElementById("cat").addEventListener("change", renderProducts);
  document.getElementById("sort").addEventListener("change", renderProducts);
  document.getElementById("clear").addEventListener("click", ()=>{
    setCart([]);
    renderCart();
    toast("تم تفريغ السلة");
  });

  renderProducts();
  renderCart();
});
