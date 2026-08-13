const products = [
  {id:1,name:"Aqua Teardrop Bracelet",category:"bracelets",price:1699,old:3800,img:"assets/bracelet-aqua.jpg",desc:"Statement aqua-stone bracelet from the ALVIRA Raksha Bandhan edit.",badge:"55% OFF"},
  {id:2,name:"Floral Stone Bracelet",category:"bracelets",price:1399,old:3400,img:"assets/bracelet-flower.jpg",desc:"Delicate floral stone design made for gifting.",badge:"59% OFF"},
  {id:3,name:"Classic Gift Bracelet",category:"gifts",price:499,old:1000,img:"assets/bracelet-pink.jpg",desc:"A colourful everyday bracelet presented as an easy gifting choice.",badge:"50% OFF"},
  {id:4,name:"Emerald Wave Bracelet",category:"bracelets",price:899,old:1499,img:"assets/bracelet-green.jpg",desc:"Elegant green-stone wave bracelet with a vintage finish.",badge:"40% OFF"},
  {id:5,name:"Aqua Floral Bracelet",category:"bracelets",price:799,old:1299,img:"assets/bracelet-floral-green.jpg",desc:"Soft aqua floral links with a classic silver-tone finish.",badge:"38% OFF"},
  {id:6,name:"ALVIRA Gift Box",category:"gifts",price:999,old:1499,img:"assets/gift-box.jpg",desc:"Premium ALVIRA presentation box for a memorable gift.",badge:"33% OFF"},
  {id:7,name:"Bangle Collection",category:"bangles",price:1199,old:1799,img:"assets/bangle-mix.jpg",desc:"Colourful bangle collection presented in ALVIRA packaging.",badge:"33% OFF"},
  {id:8,name:"Emerald Bangle Edit",category:"bangles",price:999,old:1599,img:"assets/bangle-green.jpg",desc:"Rich green and gold-toned bangles for festive styling.",badge:"38% OFF"}
];

let cart = [];
let activeCategory = "all";

const money = n => "₹" + n.toLocaleString("en-IN");
const discount = p => Math.round((1 - p.price / p.old) * 100);

function renderProducts(list = products) {
  document.getElementById("products").innerHTML = list.map(p => `
    <article class="product">
      <button class="product-img" onclick="openProduct(${p.id})" aria-label="View ${p.name}">
        <img src="${p.img}" alt="${p.name}" loading="lazy">
        <span class="badge">${p.badge || discount(p)+"% OFF"}</span>
      </button>
      <div class="product-info">
        <div class="product-name">${p.name}</div>
        <div class="price"><span class="old">${money(p.old)}</span><strong>${money(p.price)}</strong></div>
        <div class="save">Save ${money(p.old-p.price)}</div>
        <button class="add" onclick="addToCart(${p.id})">ADD +</button>
      </div>
    </article>`).join("") || `<p class="no-results">No products found.</p>`;
}

function setCategory(category) {
  activeCategory = category;
  document.querySelectorAll(".filter").forEach(b => b.classList.remove("active"));
  const labels = {all:"All",bangles:"Bangles",bracelets:"Bracelets",gifts:"Gifts"};
  document.querySelectorAll(".filter").forEach(b => { if(b.textContent === labels[category]) b.classList.add("active"); });
  filterProducts();
}

function filterProducts() {
  const q = document.getElementById("searchInput").value.toLowerCase().trim();
  let list = products.filter(p => activeCategory === "all" || p.category === activeCategory);
  if(q) list = list.filter(p => `${p.name} ${p.category} ${p.desc}`.toLowerCase().includes(q));
  renderProducts(list);
}

function openProduct(id) {
  const p = products.find(x => x.id === id);
  document.getElementById("modalImg").src = p.img;
  document.getElementById("modalImg").alt = p.name;
  document.getElementById("modalCategory").textContent = p.category.toUpperCase();
  document.getElementById("modalName").textContent = p.name;
  document.getElementById("modalPrice").innerHTML = `<span>${money(p.old)}</span> <strong>${money(p.price)}</strong> <b>${p.badge}</b>`;
  document.getElementById("modalDesc").textContent = p.desc;
  document.getElementById("modalAdd").onclick = () => { addToCart(p.id); closeProduct(); };
  document.getElementById("productModal").classList.add("show");
}
function closeProduct(){document.getElementById("productModal").classList.remove("show");}

function addToCart(id) {
  const p = products.find(x => x.id === id);
  const existing = cart.find(x => x.id === id);
  existing ? existing.qty++ : cart.push({...p,qty:1});
  updateCart(); openCart();
}
function changeQty(id, delta) {
  const item = cart.find(x=>x.id===id); if(!item) return;
  item.qty += delta; if(item.qty <= 0) cart = cart.filter(x=>x.id!==id);
  updateCart();
}
function updateCart() {
  document.getElementById("cartCount").textContent = cart.reduce((s,x)=>s+x.qty,0);
  document.getElementById("cartTotal").textContent = money(cart.reduce((s,x)=>s+x.price*x.qty,0));
  document.getElementById("cartItems").innerHTML = cart.length ? cart.map(x=>`
    <div class="cart-row">
      <img src="${x.img}" alt="">
      <div class="cart-main"><strong>${x.name}</strong><span>${money(x.price)}</span><div class="qty"><button onclick="changeQty(${x.id},-1)">−</button><b>${x.qty}</b><button onclick="changeQty(${x.id},1)">+</button></div></div>
    </div>`).join("") : `<p class="empty">Your bag is empty.</p>`;
}
function openCart(){document.getElementById("cartDrawer").classList.add("open");document.getElementById("overlay").classList.add("show")}
function closeCart(){document.getElementById("cartDrawer").classList.remove("open");document.getElementById("overlay").classList.remove("show")}
function toggleMenu(){document.getElementById("nav").classList.toggle("open")}
function focusSearch(){const b=document.getElementById("searchBar");b.classList.toggle("show");if(b.classList.contains("show"))document.getElementById("searchInput").focus()}
function checkout(){
  if(!cart.length){alert("Your bag is empty.");return;}
  const lines = cart.map(x=>`${x.name} × ${x.qty} — ${money(x.price*x.qty)}`).join("\n");
  const total = money(cart.reduce((s,x)=>s+x.price*x.qty,0));
  navigator.clipboard?.writeText(`ALVIRA ORDER\n${lines}\nTotal: ${total}`);
  alert(`Order summary copied.\n\n${lines}\n\nTotal: ${total}\n\nSend this summary to ALVIRA to complete your order.`);
}
renderProducts();