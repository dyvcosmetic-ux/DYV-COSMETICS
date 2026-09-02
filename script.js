const products = [
  {id:1,name:"Base Glow Natural",category:"Rostro",price:52000,badge:"BEST SELLER",img:"https://images.unsplash.com/photo-1631730486572-226d1b3f6f7a?auto=format&fit=crop&w=700&q=85"},
  {id:2,name:"Blush Rosé",category:"Rostro",price:32000,badge:"NUEVO",img:"https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=700&q=85"},
  {id:3,name:"Lip Oil Cherry",category:"Labios",price:28000,badge:"TRENDING",img:"https://images.unsplash.com/photo-1586495777744-4413f21062fa?auto=format&fit=crop&w=700&q=85"},
  {id:4,name:"Labial Nude Soft",category:"Labios",price:26000,badge:"",img:"https://images.unsplash.com/photo-1586495777744-4413f21062fa?auto=format&fit=crop&w=700&q=85"},
  {id:5,name:"Paleta Sunset",category:"Ojos",price:68000,badge:"FAVORITO",img:"https://images.unsplash.com/photo-1512207846876-bb54ef5056e3?auto=format&fit=crop&w=700&q=85"},
  {id:6,name:"Delineador Black",category:"Ojos",price:22000,badge:"",img:"https://images.unsplash.com/photo-1571875257727-256c39da42af?auto=format&fit=crop&w=700&q=85"},
  {id:7,name:"Set x5 Brochas",category:"Accesorios",price:45000,badge:"NUEVO",img:"https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=700&q=85"},
  {id:8,name:"Esponja Beauty",category:"Accesorios",price:18000,badge:"",img:"https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=700&q=85"}
];

const WHATSAPP_NUMBER = "573247726205"; // CAMBIA ESTE NÚMERO por el WhatsApp de D Y V

let cart = JSON.parse(localStorage.getItem("dyv-cart") || "[]");
let currentFilter = "Todos";

const grid = document.getElementById("productGrid");
const cartPanel = document.getElementById("cartPanel");
const overlay = document.getElementById("overlay");
const cartItems = document.getElementById("cartItems");
const cartEmpty = document.getElementById("cartEmpty");
const cartFooter = document.getElementById("cartFooter");
const cartTotal = document.getElementById("cartTotal");
const toast = document.getElementById("toast");

function money(value){
  return new Intl.NumberFormat("es-CO",{style:"currency",currency:"COP",maximumFractionDigits:0}).format(value);
}

function renderProducts(list = products){
  grid.innerHTML = list.map(p => `
    <article class="product-card">
      <div class="product-image">
        ${p.badge ? `<span class="badge">${p.badge}</span>` : ""}
        <img src="${p.img}" alt="${p.name}" loading="lazy">
        <button class="quick-add" onclick="addToCart(${p.id})">AGREGAR AL CARRITO +</button>
      </div>
      <div class="product-info">
        <div class="product-category">${p.category.toUpperCase()}</div>
        <div class="product-name">${p.name}</div>
        <div class="product-price">${money(p.price)}</div>
      </div>
    </article>
  `).join("");
}

function renderCart(){
  const count = cart.reduce((sum,item)=>sum+item.qty,0);
  document.querySelector(".cart-count").textContent = count;

  if(!cart.length){
    cartItems.innerHTML = "";
    cartEmpty.style.display = "block";
    cartFooter.style.display = "none";
    return;
  }

  cartEmpty.style.display = "none";
  cartFooter.style.display = "block";
  cartItems.innerHTML = cart.map(item => `
    <div class="cart-item">
      <img src="${item.img}" alt="${item.name}">
      <div>
        <h4>${item.name}</h4>
        <p>${money(item.price)}</p>
        <div class="qty">
          <button onclick="changeQty(${item.id},-1)">−</button>
          <span>${item.qty}</span>
          <button onclick="changeQty(${item.id},1)">+</button>
        </div>
      </div>
      <button class="remove" onclick="removeFromCart(${item.id})">×</button>
    </div>
  `).join("");

  const total = cart.reduce((sum,item)=>sum + item.price * item.qty,0);
  cartTotal.textContent = money(total);
}

function saveCart(){
  localStorage.setItem("dyv-cart",JSON.stringify(cart));
  renderCart();
}

function addToCart(id){
  const product = products.find(p=>p.id===id);
  const existing = cart.find(item=>item.id===id);
  if(existing) existing.qty++;
  else cart.push({...product,qty:1});
  saveCart();
  showToast(`${product.name} agregado 🛍️`);
}

function changeQty(id,delta){
  const item = cart.find(p=>p.id===id);
  if(!item) return;
  item.qty += delta;
  if(item.qty <= 0) cart = cart.filter(p=>p.id!==id);
  saveCart();
}

function removeFromCart(id){
  cart = cart.filter(p=>p.id!==id);
  saveCart();
}

function openCart(){
  cartPanel.classList.add("open");
  overlay.classList.add("show");
}
function closeCart(){
  cartPanel.classList.remove("open");
  overlay.classList.remove("show");
}

function showToast(text){
  toast.textContent = text;
  toast.classList.add("show");
  setTimeout(()=>toast.classList.remove("show"),1800);
}

document.getElementById("cartBtn").addEventListener("click",openCart);
document.getElementById("closeCart").addEventListener("click",closeCart);
overlay.addEventListener("click",closeCart);

document.querySelectorAll(".filter").forEach(btn=>{
  btn.addEventListener("click",()=>{
    document.querySelectorAll(".filter").forEach(b=>b.classList.remove("active"));
    btn.classList.add("active");
    currentFilter = btn.dataset.filter;
    renderProducts(currentFilter==="Todos" ? products : products.filter(p=>p.category===currentFilter));
  });
});

document.querySelectorAll(".category-card").forEach(card=>{
  card.addEventListener("click",()=>{
    const category = card.dataset.category;
    currentFilter = category;
    document.querySelectorAll(".filter").forEach(b=>{
      b.classList.toggle("active",b.dataset.filter===category);
    });
    renderProducts(products.filter(p=>p.category===category));
    document.getElementById("productos").scrollIntoView({behavior:"smooth"});
  });
});

const searchOverlay = document.getElementById("searchOverlay");
const searchInput = document.getElementById("searchInput");

document.getElementById("searchBtn").addEventListener("click",()=>{
  searchOverlay.classList.add("open");
  setTimeout(()=>searchInput.focus(),100);
});
document.getElementById("closeSearch").addEventListener("click",()=>searchOverlay.classList.remove("open"));
searchOverlay.addEventListener("click",(e)=>{
  if(e.target===searchOverlay) searchOverlay.classList.remove("open");
});
searchInput.addEventListener("input",()=>{
  const term = searchInput.value.toLowerCase().trim();
  const filtered = products.filter(p =>
    p.name.toLowerCase().includes(term) || p.category.toLowerCase().includes(term)
  );
  renderProducts(filtered);
});

document.getElementById("whatsappBtn").addEventListener("click",()=>{
  if(!cart.length) return;
  const lines = cart.map(item => `• ${item.name} x${item.qty} — ${money(item.price*item.qty)}`);
  const total = cart.reduce((sum,item)=>sum+item.price*item.qty,0);
  const message = `Hola D Y V COSMETIC 💄%0A%0AQuiero hacer este pedido:%0A${encodeURIComponent(lines.join("\n"))}%0A%0ATotal: ${encodeURIComponent(money(total))}%0A%0A¿Me pueden confirmar disponibilidad y envío?`;
  window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`,"_blank");
});

document.getElementById("newsletterForm").addEventListener("submit",(e)=>{
  e.preventDefault();
  showToast("¡Gracias por suscribirte! ♡");
  e.target.reset();
});

document.getElementById("menuBtn").addEventListener("click",()=>{
  document.getElementById("nav").classList.toggle("open");
});
document.querySelectorAll(".nav a").forEach(a=>a.addEventListener("click",()=>{
  document.getElementById("nav").classList.remove("open");
}));

renderProducts();
renderCart();
