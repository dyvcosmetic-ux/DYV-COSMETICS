// ==========================================
// D Y V COSMETIC - PRODUCTOS
// ==========================================

const products = [
  // =========================
  // PIEL
  // =========================
  {
    id: 1,
    name: "BB Cream Trendy",
    category: "Piel",
    price: 25000,
    badge: "NUEVO",
    img: "productos/BB CREAM TRENDY.png"
  },
  {
    id: 2,
    name: "Base Feels Ruby Rose",
    category: "Piel",
    price: 33000,
    badge: "",
    img: "productos/BASE FEELS RUBY ROSE.png"
  },
  {
    id: 3,
    name: "My Concealer de Bloomshell",
    category: "Piel",
    price: 23500,
    badge: "",
    img: "productos/MY CONCEALER DE BLOOMSHELL.png"
  },
  {
    id: 4,
    name: "Corrector con Vitamina E - M Y K",
    category: "Piel",
    price: 19000,
    badge: "",
    img: "productos/CORRECTOR CON VITAMINA E - M Y K.png"
  },

  // =========================
  // CEJAS
  // =========================
  {
    id: 5,
    name: "Gel de Cejas - Montoc",
    category: "Cejas",
    price: 28000,
    badge: "",
    img: "productos/GEL DE CEJAS - MONTOC.png"
  },
  {
    id: 6,
    name: "Gel de Cejas - Ruby Rose",
    category: "Cejas",
    price: 20000,
    badge: "",
    img: "productos/GEL DE CEJAS - RUBY ROSE.png"
  },
  {
    id: 7,
    name: "Gel de Cejas - Melu",
    category: "Cejas",
    price: 20000,
    badge: "",
    img: "productos/GEL DE CEJAS - MELU.png"
  },
  {
    id: 8,
    name: "Trío de Cejas - Lula",
    category: "Cejas",
    price: 16000,
    badge: "",
    img: "productos/TRIO DE CEJAS - LULA.png"
  },
  {
    id: 9,
    name: "Eyebrow Cream Makeup",
    category: "Cejas",
    price: 12000,
    badge: "",
    img: "productos/EYEBROW CREAM MAKEUP.png"
  },

  // =========================
  // OJOS
  // =========================
  {
    id: 10,
    name: "Delineador Plumón Elaya",
    category: "Ojos",
    price: 18000,
    badge: "",
    img: "productos/DELINEADOR PLUMON ELAYA.png"
  },
  {
    id: 11,
    name: "Delineador Plumón - OG",
    category: "Ojos",
    price: 17500,
    badge: "",
    img: "productos/DELINEADOR PLUMON - OG.png"
  },
  {
    id: 12,
    name: "Delineador Pincel Samy",
    category: "Ojos",
    price: 14000,
    badge: "",
    img: "productos/DELINEADOR PINCEL SAMY.png"
  },
  {
    id: 13,
    name: "Pestañina Prosa Tapa Gris",
    category: "Ojos",
    price: 19900,
    badge: "",
    img: "productos/PESTAÑINA - PROSA TAPA GRIS.png"
  },
  {
    id: 14,
    name: "Pestañina Prosa Tapa Rosada",
    category: "Ojos",
    price: 19900,
    badge: "",
    img: "productos/PESTAÑINA - PROSA TAPA ROSADA.png"
  },
  {
    id: 15,
    name: "Pestañina Prosa Tapa Morada",
    category: "Ojos",
    price: 19900,
    badge: "",
    img: "productos/PESTAÑINA - PROSA TAPA MORADA.png"
  },
  {
    id: 16,
    name: "Mega Full Size - Esika",
    category: "Ojos",
    price: 30000,
    badge: "",
    img: "productos/MEGA FULL SIZE - ESIKA.png"
  },
  {
    id: 17,
    name: "Kit Delineadores Negro y Blanco Stitch",
    category: "Ojos",
    price: 0,
    badge: "",
    img: "productos/KIT DELINEADORES NEGRO Y BLANCO STITCH.png"
  },

  // =========================
  // RUBORES
  // =========================
  {
    id: 18,
    name: "Rubor Ani-K Bonita",
    category: "Rubores",
    price: 20000,
    badge: "",
    img: "productos/RUBOR ANI-K BONITA.png"
  },
  {
    id: 19,
    name: "Rubor Sirenita Ruby Rose",
    category: "Rubores",
    price: 27500,
    badge: "",
    img: "productos/RUBOR SIRENITA RUBY ROSE.png"
  },
  {
    id: 20,
    name: "Rubor y Labial Lip Mousse",
    category: "Rubores",
    price: 13900,
    badge: "",
    img: "productos/RUBOR Y LABIAL LIP MOUSSE.png"
  },
  {
    id: 21,
    name: "Mia Blush Trend",
    category: "Rubores",
    price: 28000,
    badge: "",
    img: "productos/MIA BLUSH TREND.png"
  },
  {
    id: 22,
    name: "Rubor Mineralizado Ani-K",
    category: "Rubores",
    price: 23000,
    badge: "",
    img: "productos/RUBOR MINERALIZADO ANIK.png"
  }
];


// ==========================================
// CONFIGURACIÓN
// ==========================================

const WHATSAPP_NUMBER = "573247726205";

let cart = JSON.parse(localStorage.getItem("dyv-cart") || "[]");

let currentFilter = "Todos";


// ==========================================
// ELEMENTOS DEL HTML
// ==========================================

const grid = document.getElementById("productGrid");
const cartPanel = document.getElementById("cartPanel");
const overlay = document.getElementById("overlay");
const cartItems = document.getElementById("cartItems");
const cartEmpty = document.getElementById("cartEmpty");
const cartFooter = document.getElementById("cartFooter");
const cartTotal = document.getElementById("cartTotal");
const toast = document.getElementById("toast");


// ==========================================
// FORMATO DE DINERO
// ==========================================

function money(value) {
  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    maximumFractionDigits: 0
  }).format(value);
}


// ==========================================
// MOSTRAR PRODUCTOS
// ==========================================

function renderProducts(list = products) {

  if (!grid) {
    console.error("No se encontró #productGrid en el HTML.");
    return;
  }

  if (!list.length) {
    grid.innerHTML = `
      <div class="no-products">
        <p>No encontramos productos.</p>
      </div>
    `;
    return;
  }

  grid.innerHTML = list.map(p => `

    <article class="product-card">

      <div class="product-image">

        ${
          p.badge
            ? `<span class="badge">${p.badge}</span>`
            : ""
        }

        <img
          src="${p.img}"
          alt="${p.name}"
          loading="lazy"
          onerror="this.style.display='none'; this.parentElement.classList.add('image-error');"
        >

        <button
          class="quick-add"
          onclick="addToCart(${p.id})"
        >
          AGREGAR AL CARRITO +
        </button>

      </div>

      <div class="product-info">

        <div class="product-category">
          ${p.category.toUpperCase()}
        </div>

        <div class="product-name">
          ${p.name}
        </div>

        <div class="product-price">
          ${money(p.price)}
        </div>

      </div>

    </article>

  `).join("");
}


// ==========================================
// CARRITO
// ==========================================

function renderCart() {

  const count = cart.reduce(
    (sum, item) => sum + item.qty,
    0
  );

  const cartCount = document.querySelector(".cart-count");

  if (cartCount) {
    cartCount.textContent = count;
  }


  if (!cart.length) {

    if (cartItems) {
      cartItems.innerHTML = "";
    }

    if (cartEmpty) {
      cartEmpty.style.display = "block";
    }

    if (cartFooter) {
      cartFooter.style.display = "none";
    }

    return;
  }


  if (cartEmpty) {
    cartEmpty.style.display = "none";
  }

  if (cartFooter) {
    cartFooter.style.display = "block";
  }


  if (cartItems) {

    cartItems.innerHTML = cart.map(item => `

      <div class="cart-item">

        <img
          src="${item.img}"
          alt="${item.name}"
        >

        <div>

          <h4>
            ${item.name}
          </h4>

          <p>
            ${money(item.price)}
          </p>

          <div class="qty">

            <button
              onclick="changeQty(${item.id}, -1)"
            >
              −
            </button>

            <span>
              ${item.qty}
            </span>

            <button
              onclick="changeQty(${item.id}, 1)"
            >
              +
            </button>

          </div>

        </div>

        <button
          class="remove"
          onclick="removeFromCart(${item.id})"
        >
          ×
        </button>

      </div>

    `).join("");
  }


  const total = cart.reduce(
    (sum, item) =>
      sum + item.price * item.qty,
    0
  );


  if (cartTotal) {
    cartTotal.textContent = money(total);
  }
}


// ==========================================
// GUARDAR CARRITO
// ==========================================

function saveCart() {

  localStorage.setItem(
    "dyv-cart",
    JSON.stringify(cart)
  );

  renderCart();
}


// ==========================================
// AGREGAR AL CARRITO
// ==========================================

function addToCart(id) {

  const product = products.find(
    p => p.id === id
  );

  if (!product) {
    return;
  }


  const existing = cart.find(
    item => item.id === id
  );


  if (existing) {

    existing.qty++;

  } else {

    cart.push({
      ...product,
      qty: 1
    });

  }


  saveCart();

  showToast(
    `${product.name} agregado 🛍️`
  );
}


// ==========================================
// CAMBIAR CANTIDAD
// ==========================================

function changeQty(id, delta) {

  const item = cart.find(
    p => p.id === id
  );

  if (!item) {
    return;
  }


  item.qty += delta;


  if (item.qty <= 0) {

    cart = cart.filter(
      p => p.id !== id
    );

  }


  saveCart();
}


// ==========================================
// ELIMINAR PRODUCTO
// ==========================================

function removeFromCart(id) {

  cart = cart.filter(
    p => p.id !== id
  );

  saveCart();
}


// ==========================================
// ABRIR CARRITO
// ==========================================

function openCart() {

  if (cartPanel) {
    cartPanel.classList.add("open");
  }

  if (overlay) {
    overlay.classList.add("show");
  }
}


// ==========================================
// CERRAR CARRITO
// ==========================================

function closeCart() {

  if (cartPanel) {
    cartPanel.classList.remove("open");
  }

  if (overlay) {
    overlay.classList.remove("show");
  }
}


// ==========================================
// MENSAJE TEMPORAL
// ==========================================

function showToast(text) {

  if (!toast) {
    return;
  }

  toast.textContent = text;

  toast.classList.add("show");

  setTimeout(() => {

    toast.classList.remove("show");

  }, 1800);
}


// ==========================================
// BOTÓN DEL CARRITO
// ==========================================

const cartBtn = document.getElementById("cartBtn");

if (cartBtn) {

  cartBtn.addEventListener(
    "click",
    openCart
  );

}


const closeCartBtn =
  document.getElementById("closeCart");

if (closeCartBtn) {

  closeCartBtn.addEventListener(
    "click",
    closeCart
  );

}


if (overlay) {

  overlay.addEventListener(
    "click",
    closeCart
  );

}


// ==========================================
// FILTROS DE PRODUCTOS
// ==========================================

document.querySelectorAll(".filter")
  .forEach(btn => {

    btn.addEventListener(
      "click",
      () => {

        document
          .querySelectorAll(".filter")
          .forEach(b =>
            b.classList.remove("active")
          );


        btn.classList.add("active");


        currentFilter =
          btn.dataset.filter;


        if (
          currentFilter === "Todos"
        ) {

          renderProducts(products);

        } else {

          const filtered =
            products.filter(
              p =>
                p.category ===
                currentFilter
            );

          renderProducts(filtered);
        }

      }
    );

  });


// ==========================================
// TARJETAS DE CATEGORÍAS
// ==========================================

document
  .querySelectorAll(".category-card")
  .forEach(card => {

    card.addEventListener(
      "click",
      () => {

        const category =
          card.dataset.category;


        currentFilter = category;


        document
          .querySelectorAll(".filter")
          .forEach(btn => {

            btn.classList.toggle(
              "active",
              btn.dataset.filter ===
              category
            );

          });


        renderProducts(
          products.filter(
            p =>
              p.category ===
              category
          )
        );


        const productosSection =
          document.getElementById(
            "productos"
          );


        if (productosSection) {

          productosSection.scrollIntoView({
            behavior: "smooth"
          });

        }

      }
    );

  });


// ==========================================
// BUSCADOR
// ==========================================

const searchOverlay =
  document.getElementById(
    "searchOverlay"
  );

const searchInput =
  document.getElementById(
    "searchInput"
  );

const searchBtn =
  document.getElementById(
    "searchBtn"
  );

const closeSearch =
  document.getElementById(
    "closeSearch"
  );


if (searchBtn) {

  searchBtn.addEventListener(
    "click",
    () => {

      if (searchOverlay) {

        searchOverlay.classList.add(
          "open"
        );

      }

      if (searchInput) {

        setTimeout(
          () => searchInput.focus(),
          100
        );

      }

    }
  );

}


if (closeSearch) {

  closeSearch.addEventListener(
    "click",
    () => {

      if (searchOverlay) {

        searchOverlay.classList.remove(
          "open"
        );

      }

    }
  );

}


if (searchOverlay) {

  searchOverlay.addEventListener(
    "click",
    event => {

      if (
        event.target ===
        searchOverlay
      ) {

        searchOverlay.classList.remove(
          "open"
        );

      }

    }
  );

}


if (searchInput) {

  searchInput.addEventListener(
    "input",
    () => {

      const term =
        searchInput.value
          .toLowerCase()
          .trim();


      const filtered =
        products.filter(p =>

          p.name
            .toLowerCase()
            .includes(term)

          ||

          p.category
            .toLowerCase()
            .includes(term)

        );


      renderProducts(filtered);

    }
  );

}


// ==========================================
// WHATSAPP
// ==========================================

const whatsappBtn =
  document.getElementById(
    "whatsappBtn"
  );


if (whatsappBtn) {

  whatsappBtn.addEventListener(
    "click",
    () => {

      if (!cart.length) {

        showToast(
          "Tu carrito está vacío 🛍️"
        );

        return;
      }


      const lines =
        cart.map(
          item =>
            `• ${item.name} x${item.qty} — ${money(
              item.price * item.qty
            )}`
        );


      const total =
        cart.reduce(
          (sum, item) =>
            sum +
            item.price *
            item.qty,
          0
        );


      const message =
        `Hola D Y V COSMETIC 💄\n\n` +
        `Quiero hacer este pedido:\n` +
        `${lines.join("\n")}\n\n` +
        `Total: ${money(total)}\n\n` +
        `¿Me pueden confirmar disponibilidad y envío?`;


      const url =
        `https://wa.me/${WHATSAPP_NUMBER}?text=` +
        encodeURIComponent(message);


      window.open(
        url,
        "_blank"
      );

    }
  );

}


// ==========================================
// NEWSLETTER
// ==========================================

const newsletterForm =
  document.getElementById(
    "newsletterForm"
  );


if (newsletterForm) {

  newsletterForm.addEventListener(
    "submit",
    event => {

      event.preventDefault();

      showToast(
        "¡Gracias por suscribirte! ♡"
      );

      newsletterForm.reset();

    }
  );

}


// ==========================================
// MENÚ MÓVIL
// ==========================================

const menuBtn =
  document.getElementById(
    "menuBtn"
  );

const nav =
  document.getElementById(
    "nav"
  );


if (menuBtn && nav) {

  menuBtn.addEventListener(
    "click",
    () => {

      nav.classList.toggle(
        "open"
      );

    }
  );

}


document
  .querySelectorAll(".nav a")
  .forEach(a => {

    a.addEventListener(
      "click",
      () => {

        if (nav) {

          nav.classList.remove(
            "open"
          );

        }

      }
    );

  });


// ==========================================
// INICIAR PÁGINA
// ==========================================

renderProducts();

renderCart();
