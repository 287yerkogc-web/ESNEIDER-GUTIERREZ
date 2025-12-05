(function(){
  const productosData = [
    { id:1, nombre:"Manzana Orgánica", categoria:"Frutas", precio:2.50, img:"img/apple.jpg", descripcion:"Frescas y libres de pesticidas." },
    { id:2, nombre:"Zanahoria Orgánica", categoria:"Vegetales", precio:1.20, img:"img/carrots.jpg", descripcion:"Crujientes y ricas en fibra." },
    { id:3, nombre:"Avena Integral", categoria:"Cereales", precio:3.10, img:"img/oats.jpg", descripcion:"Fuente natural de energía." },
    { id:4, nombre:"Leche de Granja", categoria:"Lácteos", precio:4.50, img:"img/milk.jpg", descripcion:"100% natural y fresca." },
    { id:5, nombre:"Lentejas", categoria:"Granos", precio:2.90, img:"img/lentils.jpg", descripcion:"Proteína vegetal." }
  ];
  let carrito = JSON.parse(localStorage.getItem('ec_cart') || '[]');

  function saveCart(){ localStorage.setItem('ec_cart', JSON.stringify(carrito)); updateCartCounter(); renderCartList(); }
  function updateCartCounter(){
    const count = carrito.reduce((s,i)=>s + i.cantidad,0);
    document.querySelectorAll('.cart-count').forEach(el=>el.textContent = count);
  }

  function renderCategories(){
    const cats = [...new Set(productosData.map(p=>p.categoria))];
    const container = document.getElementById('categoriesContainer');
    if(!container) return;
    container.innerHTML = '';
    const allBtn = document.createElement('button');
    allBtn.className = 'btn btn-sm btn-ec-outline me-2 mb-2';
    allBtn.textContent = 'Todas';
    allBtn.onclick = ()=>renderProducts(productosData);
    container.appendChild(allBtn);
    cats.forEach(c=>{
      const btn = document.createElement('button');
      btn.className = 'btn btn-sm btn-ec-outline me-2 mb-2';
      btn.textContent = c;
      btn.onclick = ()=>renderProducts(productosData.filter(p=>p.categoria===c));
      container.appendChild(btn);
    });
  }

  function renderProducts(list){
    const container = document.getElementById('productsGrid');
    if(!container) return;
    container.innerHTML = '';
    list.forEach(p=>{
      const card = document.createElement('div'); card.className = 'product-card';
      card.innerHTML = `
        <img src="${p.img}" alt="${p.nombre}">
        <div class="product-body">
          <div>
            <div class="product-title">${p.nombre}</div>
            <div class="text-muted-small">${p.descripcion}</div>
          </div>
          <div class="d-flex justify-content-between align-items-center mt-3">
            <div class="product-price">S/. ${p.precio.toFixed(2)}</div>
            <div>
              <button class="btn btn-sm btn-ec" data-id="${p.id}">Añadir</button>
            </div>
          </div>
        </div>
      `;
      container.appendChild(card);
    });

    container.querySelectorAll('button[data-id]').forEach(btn=>{
      btn.addEventListener('click', (e)=>{
        const id = Number(btn.getAttribute('data-id'));
        addToCart(id);

        btn.textContent = 'Añadido ✓';
        setTimeout(()=> btn.textContent = 'Añadir', 900);
      });
    });
  }

  function addToCart(productId, qty=1){
    const prod = productosData.find(p=>p.id===productId);
    if(!prod) return;
    const item = carrito.find(i=>i.id===productId);
    if(item){
      item.cantidad += qty;
    } else {
      carrito.push({ id:prod.id, nombre:prod.nombre, precio:prod.precio, img:prod.img, cantidad:qty });
    }
    saveCart();
  }

  function removeFromCart(productId){
    carrito = carrito.filter(i=>i.id!==productId);
    saveCart();
  }

  function changeQty(productId, delta){
    const item = carrito.find(i=>i.id===productId);
    if(!item) return;
    item.cantidad += delta;
    if(item.cantidad <= 0) removeFromCart(productId);
    saveCart();
  }

  function cartTotal(){
    return carrito.reduce((s,i)=>s + i.precio * i.cantidad, 0);
  }

  function renderCartList(){
    const listEl = document.getElementById('cartList');
    const totalEl = document.getElementById('cartTotal');
    if(!listEl) return;
    listEl.innerHTML = '';
    if(carrito.length === 0){
      listEl.innerHTML = '<div class="text-center text-muted-small">Tu carrito está vacío.</div>';
      if(totalEl) totalEl.textContent = 'S/. 0.00';
      return;
    }
    carrito.forEach(i=>{
      const item = document.createElement('div'); item.className = 'cart-item';
      item.innerHTML = `
        <img src="${i.img}" alt="${i.nombre}">
        <div style="flex:1">
          <div style="font-weight:700">${i.nombre}</div>
          <div class="text-muted-small">S/. ${i.precio.toFixed(2)}</div>
          <div class="mt-2 qty-controls">
            <button class="btn-decrease" data-id="${i.id}">−</button>
            <div class="px-2">${i.cantidad}</div>
            <button class="btn-increase" data-id="${i.id}">+</button>
            <button class="btn btn-sm btn-ec-outline ms-3 btn-remove" data-id="${i.id}">Eliminar</button>
          </div>
        </div>
      `;
      listEl.appendChild(item);
    });

    listEl.querySelectorAll('.btn-decrease').forEach(b=>{
      b.addEventListener('click', ()=> changeQty(Number(b.getAttribute('data-id')), -1));
    });
    listEl.querySelectorAll('.btn-increase').forEach(b=>{
      b.addEventListener('click', ()=> changeQty(Number(b.getAttribute('data-id')), +1));
    });
    listEl.querySelectorAll('.btn-remove').forEach(b=>{
      b.addEventListener('click', ()=> removeFromCart(Number(b.getAttribute('data-id'))));
    });

    if(totalEl) totalEl.textContent = `S/. ${cartTotal().toFixed(2)}`;
  }

  function openCart(){ document.querySelector('.cart-drawer').classList.add('open'); }
  function closeCart(){ document.querySelector('.cart-drawer').classList.remove('open'); }

  document.addEventListener('DOMContentLoaded', function(){
    renderCategories();
    renderProducts(productosData);
    renderFeaturedProducts();
    updateCartCounter();
    renderCartList();

    document.querySelectorAll('.open-cart').forEach(btn=>{
      btn.addEventListener('click', openCart);
    });
    document.querySelectorAll('.close-cart').forEach(btn=>{
      btn.addEventListener('click', closeCart);
    });

    const clearBtn = document.getElementById('cartClear');
    if(clearBtn) clearBtn.addEventListener('click', ()=>{ carrito = []; saveCart(); });

    const searchInput = document.getElementById('searchInput');
    if(searchInput){
      searchInput.addEventListener('input', (e)=>{
        const q = e.target.value.trim().toLowerCase();
        renderProducts(productosData.filter(p=>p.nombre.toLowerCase().includes(q) || p.descripcion.toLowerCase().includes(q)));
      });
    }
  });

  window.EC = { productosData, carrito, addToCart, removeFromCart, changeQty };
})();
function renderFeaturedProducts() {
  const container = document.getElementById("features-products");
  if (!container) return;

  const destacados = productosData.slice(0, 3);

  container.innerHTML = destacados
    .map(
      (p) => `
      <div class="col-md-4">
        <div class="card shadow-sm product-card-highlight">
          <img src="${p.img}" class="card-img-top" alt="${p.nombre}">
          <div class="card-body">
            <h5 class="product-title">${p.nombre}</h5>
            <p class="text-muted-small">${p.descripcion}</p>
            <div class="d-flex justify-content-between align-items-center mt-3">
              <span class="product-price">S/. ${p.precio.toFixed(2)}</span>
              <button class="btn btn-success btn-sm" onclick="EC.addToCart(${p.id})">
                Añadir
              </button>
            </div>
          </div>
        </div>
      </div>
      `
    )
    .join("");
}