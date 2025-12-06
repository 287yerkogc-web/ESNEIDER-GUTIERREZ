(function () {
  const productosData = [
    { id: 1, nombre: "Manzana Orgánica", categoria: "Frutas", precio: 2.50, img: "images/manzana.jpg", descripcion: "Frescas y libres de pesticidas." },
    { id: 2, nombre: "Zanahoria Orgánica", categoria: "Vegetales", precio: 1.20, img: "images/zanahoria.jpg", descripcion: "Crujientes y ricas en fibra." },
    { id: 3, nombre: "Leche de Granja", categoria: "Lácteos", precio: 4.50, img: "images/leche.jpg", descripcion: "100% natural y fresca." },
    { id: 4, nombre: "Lentejas", categoria: "Legumbres", precio: 2.90, img: "images/lenteja.jpg", descripcion: "Proteína vegetal." },
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

    const destacados = productosData.slice(0, 3);

    container.innerHTML = destacados.map(p => `
      <div class="col-md-4">
        <div class="card shadow-sm product-card-highlight">
          <img src="${p.img}" class="card-img-top" alt="${p.nombre}">
          <div class="card-body">
            <h5 class="product-title">${p.nombre}</h5>
            <p class="text-muted-small">${p.descripcion}</p>
            <div class="d-flex justify-content-between align-items-center mt-3">
              <span class="product-price">S/. ${p.precio.toFixed(2)}</span>
              <button class="btn btn-success btn-sm" data-id="${p.id}">Añadir</button>
            </div>
          </div>
        </div>
      </div>
    `).join("");

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
const productos = [
    {
        id: 1,
        nombre: "Manzana Orgánica",
        precio: 2.50,
        categoria: "Frutas",
        descripcion: "Frescas y libres de pesticidas.",
        imagen: "images/manzana.jpg"
    },
    {
        id: 2,
        nombre: "Zanahoria Orgánica",
        precio: 1.20,
        categoria: "Vegetales",
        descripcion: "Crujientes y ricas en fibra.",
        imagen: "images/zanahoria.jpg"
    },
    {
        id: 3,
        nombre: "Avena Integral",
        precio: 3.10,
        categoria: "Lacteos",
        descripcion: "Fuente natural de energía.",
        imagen: "images/avena.jpg"
    },
    {
        id: 4,
        nombre: "Lentejas",
        precio: 2.80,
        categoria: "Legumbres",
        descripcion: "Ricas en proteínas y fibra.",
        imagen: "images/lenteja.jpg"
    },
    {   
        id: 2, nombre: "Pera Orgánica", 
        precio: 3.00, 
        categoria: "Frutas", 
        descripcion: "Jugosa y dulce.", 
        img: "images/pera.jpg" 
    },
    { 
        id: 3, 
        nombre: "Plátano Orgánico", 
        precio: 1.80, 
        categoria: "Frutas", 
        descripcion: "Rico en potasio y fibra.", 
        img: "images/platano.jpg" 
    },
    {   
        id: 4, 
        nombre: "Naranja Orgánica", 
        precio: 2.20, 
        categoria: "Frutas", 
        descripcion: "Refrescante y rica en vitamina C.", 
        img: "images/naranja.jpg" 
    },
    { 
        id: 5, 
        nombre: "Mango Orgánico", 
        precio: 3.50, 
        categoria: "Frutas", 
        descripcion: "Dulce y jugoso.", 
        img: "images/mango.jpg" 
    },
    {   
        id: 6, 
        nombre: "Fresa Orgánica", 
        precio: 4.00, 
        categoria: "Frutas", 
        descripcion: "Fresca y deliciosa.", 
        img: "images/fresa.jpg" 
    },
    { 
        id: 7, 
        nombre: "Uva Orgánica", 
        precio: 3.00, 
        categoria: "Frutas", 
        descripcion: "Pequeñas y dulces.", 
        img: "images/uva.jpg" 
    },
    { 
        id: 8, 
        nombre: "Kiwi Orgánico", 
        precio: 5.00, 
        categoria: "Frutas", 
        descripcion: "Exótico y lleno de vitamina C.", 
        img: "images/kiwi.jpg" 
    },
    { 
        id: 9, 
        nombre: "Durazno Orgánico", 
        precio: 4.20, 
        categoria: "Frutas", 
        descripcion: "Dulce y jugoso, perfecto para el verano.", 
        img: "images/durazno.jpg" 
    },
    { 
        id: 10, 
        nombre: "Cereza Orgánica", 
        precio: 6.00, 
        categoria: "Frutas", 
        descripcion: "Pequeñas y sabrosas.", 
        img: "images/cereza.jpg" 
    },
    { 
        id: 22, 
        nombre: "Yogur Natural", 
        precio: 3.20, 
        categoria: "Lácteos", 
        descripcion: "Fresco y saludable.", 
        img: "images/yogur.jpg" 
    },
    { 
        id: 23, 
        nombre: "Queso Fresco", 
        precio: 5.00, 
        categoria: "Lácteos", 
        descripcion: "Suave y cremoso.", 
        img: "images/queso.jpg" 
    },
    { 
        id: 24, 
        nombre: "Mantequilla Orgánica", 
        precio: 4.00, 
        categoria: "Lácteos", 
        descripcion: "Hecha de forma artesanal.", 
        img: "images/mantequilla.jpg" 
    },
    { 
        id: 25, 
        nombre: "Crema de Leche", 
        precio: 3.50, 
        categoria: "Lácteos", 
        descripcion: "Perfecta para tus postres.", 
        img: "images/crema.jpg" 
    },
    { 
        id: 26, 
        nombre: "Leche Evaporada", 
        precio: 2.80, 
        categoria: "Lácteos", 
        descripcion: "Ideal para cocinar y preparar postres.", 
        img: "images/leche-evaporada.jpg" 
    },
    { 
        id: 27, 
        nombre: "Ricotta", 
        precio: 5.50, 
        categoria: "Lácteos", 
        descripcion: "Ideal para pasteles y lasañas.", 
        img: "images/ricotta.jpg" 
    },
    { 
        id: 28, 
        nombre: "Kefir", 
        precio: 4.00, 
        categoria: "Lácteos", 
        descripcion: "Probiótico y saludable.", 
        img: "images/kefir.jpg" 
    },
    { 
        id: 29, 
        nombre: "Leche en Polvo", 
        precio: 3.10, 
        categoria: "Lácteos", 
        descripcion: "Práctica y nutritiva.", 
        img: "images/leche-polvo.jpg" 
    },
    {  
        id: 30, 
        nombre: "Helado Artesanal", 
        precio: 6.00, 
        categoria: "Lácteos", 
        descripcion: "Delicioso y cremoso.", 
        img: "images/helado.jpg" 
    },
    { 
        id: 12, 
        nombre: "Pepino Orgánico", 
        precio: 1.50, 
        categoria: "Vegetales", 
        descripcion: "Frescos y jugosos.", 
        img: "images/pepino.jpg" 
    },
    { 
        id: 13, 
        nombre: "Tomate Orgánico", 
        precio: 2.00, 
        categoria: "Vegetales", 
        descripcion: "Maduro y lleno de sabor.", 
        img: "images/tomate.jpg" 
    },
    { 
        id: 14, 
        nombre: "Lechuga Orgánica", 
        precio: 1.00, 
        categoria: "Vegetales", 
        descripcion: "Fresca y crujiente.", 
        img: "images/lechuga.jpg" 
    },
    { 
        id: 15, 
        nombre: "Espinaca Orgánica", 
        precio: 2.50, 
        categoria: "Vegetales", 
        descripcion: "Rica en hierro y vitaminas.", 
        img: "images/espinaca.jpg" 
    },
    { 
        id: 16, 
        nombre: "Brócoli Orgánico", 
        precio: 3.00, 
        categoria: "Vegetales", 
        descripcion: "Saludable y lleno de antioxidantes.", 
        img: "images/brocoli.jpg" 
    },
    { 
        id: 17, 
        nombre: "Cebolla Orgánica", 
        precio: 1.80, 
        categoria: "Vegetales", 
        descripcion: "Fresca y de sabor intenso.", 
        img: "images/cebolla.jpg" 
    },
    { 
        id: 18, 
        nombre: "Acelga Orgánica", 
        precio: 2.20, 
        categoria: "Vegetales", 
        descripcion: "Rica en vitaminas y minerales.", 
        img: "images/acelga.jpg" 
    },
    { 
        id: 19, 
        nombre: "Pimiento Orgánico", 
        precio: 2.70, 
        categoria: "Vegetales", 
        descripcion: "Dulce y crujiente.", 
        img: "images/pimiento.jpg" 
    },
    { 
        id: 20, 
        nombre: "Berenjena Orgánica", 
        precio: 3.30, 
        categoria: "Vegetales", 
        descripcion: "Versátil y rica en fibra.", 
        img: "images/berenjena.jpg" 
    },
    { 
        id: 32, 
        nombre: "Garbanzos", 
        precio: 3.00, 
        categoria: "Legumbres", 
        descripcion: "Fuente de proteína vegetal.", 
        img: "images/garbanzo.jpg" 
    },
    { 
        id: 33, 
        nombre: "Frijoles Negros", 
        precio: 2.50, 
        categoria: "Legumbres", 
        descripcion: "Ricos en hierro y fibra.", 
        img: "images/frijoles.jpg" 
    },
    { 
        id: 34, 
        nombre: "Alubias", 
        precio: 3.20, 
        categoria: "Legumbres", 
        descripcion: "Versátiles y llenas de nutrientes.", 
        img: "images/alubias.jpg" 
    },
    { 
        id: 35, 
        nombre: "Soya", 
        precio: 2.70, 
        categoria: "Legumbres", 
        descripcion: "Excelente fuente de proteína.", 
        img: "images/soya.jpg" 
    },
    { 
        id: 36, 
        nombre: "Arvejas", 
        precio: 2.40, 
        categoria: "Legumbres", 
        descripcion: "Frescas y deliciosas.", 
        img: "images/arvejas.jpg" 
    },
    { 
        id: 37, 
        nombre: "Judías Verdes", 
        precio: 3.10, 
        categoria: "Legumbres", 
        descripcion: "Perfectas para ensaladas.", 
        img: "images/judias-verdes.jpg" 
    },
    {  
        id: 38, 
        nombre: "Frijoles Blancos", 
        precio: 2.90, 
        categoria: "Legumbres", 
        descripcion: "Ricos en fibra y sabor.", 
        img: "images/frijoles-blancos.jpg" 
    },
    { 
        id: 39, 
        nombre: "Pochas", 
        precio: 3.00, 
        categoria: "Legumbres", 
        descripcion: "Típicas de la región.", 
        img: "images/pochas.jpg" 
    },
    { 
        id: 40, 
        nombre: "Lentejas Rojas", 
        precio: 3.40, 
        categoria: "Legumbres", 
        descripcion: "Fáciles de cocinar y sabrosas.", 
        img: "images/lentejas-rojas.jpg" 
    }
];
function mostrarProductos(lista) {
    const contenedor = document.getElementById("lista-productos");
    contenedor.innerHTML = "";

    lista.forEach(prod => {
        contenedor.innerHTML += `
            <div class="product-card">
                <img src="${prod.imagen}" alt="${prod.nombre}">
                <div class="product-body">
                    <h5 class="product-title">${prod.nombre}</h5>
                    <p class="text-muted-small">${prod.descripcion}</p>
                    <p class="product-price">S/. ${prod.precio.toFixed(2)}</p>
                    <button class="btn btn-success add-cart" data-id="${prod.id}">Añadir</button>
                </div>
            </div>
        `;
    });
}
document.getElementById("btn-frutas").addEventListener("click", () => {
    mostrarProductos(productos.filter(p => p.categoria === "Frutas"));
});

document.getElementById("btn-vegetales").addEventListener("click", () => {
    mostrarProductos(productos.filter(p => p.categoria === "Vegetales"));
});

document.getElementById("btn-lacteos").addEventListener("click", () => {
    mostrarProductos(productos.filter(p => p.categoria === "Lacteos"));
});

document.getElementById("btn-legumbres").addEventListener("click", () => {
    mostrarProductos(productos.filter(p => p.categoria === "Legumbres"));
});

document.getElementById("btn-todos").addEventListener("click", () => {
    mostrarProductos(productos);
});
document.addEventListener("DOMContentLoaded", () => {
    mostrarProductos(productos);
});

