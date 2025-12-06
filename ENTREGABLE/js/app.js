(function () {
  const productosData = [
    { id: 1, nombre: "Manzana Orgánica", categoria: "Frutas", precio: 2.50, img: "images/manzana.jpg", descripcion: "Frescas y libres de pesticidas." },
    { id: 2, nombre: "Zanahoria Orgánica", categoria: "Vegetales", precio: 1.20, img: "images/zanahoria.jpg", descripcion: "Crujientes y ricas en fibra." },
    { id: 3, nombre: "Avena Integral", categoria: "Cereales", precio: 3.10, img: "images/avena.jpg", descripcion: "Fuente natural de energía." },
    { id: 4, nombre: "Leche de Granja", categoria: "Lácteos", precio: 4.50, img: "images/leche.jpg", descripcion: "100% natural y fresca." },
    { id: 5, nombre: "Lentejas", categoria: "Granos", precio: 2.90, img: "images/lenteja.jpg", descripcion: "Proteína vegetal." }
  ];

  let carrito = JSON.parse(localStorage.getItem("ec_cart") || "[]");

  function saveCart() {
    localStorage.setItem("ec_cart", JSON.stringify(carrito));
    updateCartCounter();
    renderCartList();
  }

  function updateCartCounter() {
    const count = carrito.reduce((s, i) => s + i.cantidad, 0);
    document.querySelectorAll(".cart-count").forEach(el => el.textContent = count);
  }

  function addToCart(productId, qty = 1) {
    const prod = productosData.find(p => p.id === productId);
    if (!prod) return;

    const item = carrito.find(i => i.id === productId);

    if (item) {
      item.cantidad += qty;
    } else {
      carrito.push({ id: prod.id, nombre: prod.nombre, precio: prod.precio, img: prod.img, cantidad: qty });
    }

    saveCart();
  }

  function changeQty(id, delta) {
    const item = carrito.find(i => i.id === id);
    if (!item) return;

    item.cantidad += delta;

    if (item.cantidad <= 0)
      carrito = carrito.filter(i => i.id !== id);

    saveCart();
  }

  function removeFromCart(id) {
    carrito = carrito.filter(i => i.id !== id);
    saveCart();
  }

  function cartTotal() {
    return carrito.reduce((s, i) => s + (i.precio * i.cantidad), 0);
  }

  function renderCartList() {
    const listEl = document.getElementById("cartList");
    const totalEl = document.getElementById("cartTotal");

    if (!listEl) return;

    listEl.innerHTML = "";

    if (carrito.length === 0) {
      listEl.innerHTML = `<p class="text-muted text-center">Tu carrito está vacío.</p>`;
      if (totalEl) totalEl.textContent = "S/. 0.00";
      return;
    }

    carrito.forEach(item => {
      const div = document.createElement("div");
      div.className = "cart-item";
      div.innerHTML = `
        <img src="${item.img}" alt="${item.nombre}">
        <div style="flex:1">
          <strong>${item.nombre}</strong>
          <p class="text-muted-small">S/. ${item.precio.toFixed(2)}</p>

          <div class="qty-controls mt-1">
            <button class="btn-decrease" data-id="${item.id}">-</button>
            <span>${item.cantidad}</span>
            <button class="btn-increase" data-id="${item.id}">+</button>
            <button class="btn btn-sm btn-danger btn-remove ms-3" data-id="${item.id}">Eliminar</button>
          </div>
        </div>
      `;
      listEl.appendChild(div);
    });

    listEl.querySelectorAll(".btn-decrease").forEach(b =>
      b.addEventListener("click", () => changeQty(Number(b.dataset.id), -1))
    );
    listEl.querySelectorAll(".btn-increase").forEach(b =>
      b.addEventListener("click", () => changeQty(Number(b.dataset.id), 1))
    );
    listEl.querySelectorAll(".btn-remove").forEach(b =>
      b.addEventListener("click", () => removeFromCart(Number(b.dataset.id)))
    );

    if (totalEl) totalEl.textContent = `S/. ${cartTotal().toFixed(2)}`;
  }

  function openCart() {
    const drawer = document.querySelector(".cart-drawer");
    drawer.classList.add("open");
  }

  function closeCart() {
    const drawer = document.querySelector(".cart-drawer");
    drawer.classList.remove("open");
  }

  function renderFeaturedProducts() {
    const container = document.getElementById("features-products");
    if (!container) return;

    const destacados = EC.productosData.slice(0, 3);

    container.innerHTML = 
      .map(
        p => `
      <div class="col-md-4">
        <div class="product-card-highlight shadow-sm">
          <img src="${p.img}" class="product-img" alt="${p.nombre}">
          <div class="p-3">
            <h5 class="product-title">${p.nombre}</h5>
            <p class="text-muted-small">${p.descripcion}</p>
            <div class="d-flex justify-content-between align-items-center mt-3">
              <span class="product-price">S/. ${p.precio.toFixed(2)}</span>
              <button class="btn btn-success btn-sm" onclick="EC.addToCart(${p.id}">
              Añadir
              </button>
            </div>
          </div>
        </div>
      </div>
    `
  )
  .join("");

    container.querySelectorAll("button[data-id]").forEach(btn => {
      btn.addEventListener("click", () => addToCart(Number(btn.dataset.id)));
    });
  }

  document.addEventListener("DOMContentLoaded", () => {
    renderFeaturedProducts();
    updateCartCounter();
    renderCartList();

    document.querySelectorAll(".open-cart").forEach(btn =>
      btn.addEventListener("click", openCart)
    );
    document.querySelectorAll(".close-cart").forEach(btn =>
      btn.addEventListener("click", closeCart)
    );

    const clearBtn = document.getElementById("cartClear");
    if (clearBtn) clearBtn.addEventListener("click", () => {
      carrito = [];
      saveCart();
    });
  });

})();
