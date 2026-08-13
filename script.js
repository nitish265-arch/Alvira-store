const products = [
  {id:1,name:"Emerald Luxe Bangle Set",price:899,old:1299,img:"assets/alvira-gallery.png"},
  {id:2,name:"Classic Stone Bracelet",price:699,old:999,img:"assets/alvira-gallery.png"},
  {id:3,name:"Aqua Charm Bracelet",price:749,old:1099,img:"assets/alvira-gallery.png"},
  {id:4,name:"ALVIRA Gift Box",price:999,old:1499,img:"assets/alvira-gallery.png"},
  {id:5,name:"Floral Statement Set",price:1199,old:1599,img:"assets/alvira-gallery.png"},
  {id:6,name:"Everyday Elegance Bracelet",price:649,old:899,img:"assets/alvira-gallery.png"},
  {id:7,name:"Pearl & Stone Set",price:1099,old:1499,img:"assets/alvira-gallery.png"},
  {id:8,name:"Royal Green Collection",price:1299,old:1799,img:"assets/alvira-gallery.png"}
];
let cart=[];

function renderProducts(list=products){
  document.getElementById("products").innerHTML=list.map(p=>`
    <article class="product">
      <div class="product-img">
        <img src="${p.img}" alt="${p.name}">
        <span class="badge">BESTSELLER</span>
      </div>
      <div class="product-info">
        <div class="product-name">${p.name}</div>
        <div class="price"><span class="old">₹${p.old}</span> ₹${p.price}
          <button class="add" onclick="addToCart(${p.id})">ADD +</button>
        </div>
      </div>
    </article>`).join("");
}
function addToCart(id){
  const p=products.find(x=>x.id===id); const existing=cart.find(x=>x.id===id);
  existing?existing.qty++:cart.push({...p,qty:1});
  updateCart(); openCart();
}
function updateCart(){
  document.getElementById("cartCount").textContent=cart.reduce((s,x)=>s+x.qty,0);
  document.getElementById("cartTotal").textContent="₹"+cart.reduce((s,x)=>s+x.price*x.qty,0);
  document.getElementById("cartItems").innerHTML=cart.length?cart.map(x=>`
    <div class="cart-row">
      <img src="${x.img}" alt="">
      <div><strong>${x.name}</strong><span>₹${x.price} × ${x.qty}</span></div>
    </div>`).join(""):`<p class="empty">Your bag is empty.</p>`;
}
function openCart(){document.getElementById("cartDrawer").classList.add("open");document.getElementById("overlay").classList.add("show")}
function closeCart(){document.getElementById("cartDrawer").classList.remove("open");document.getElementById("overlay").classList.remove("show")}
function toggleMenu(){document.getElementById("nav").classList.toggle("open")}
function focusSearch(){const b=document.getElementById("searchBar");b.style.display=b.style.display==="block"?"none":"block";if(b.style.display==="block")document.getElementById("searchInput").focus()}
function filterProducts(){const q=document.getElementById("searchInput").value.toLowerCase();renderProducts(products.filter(p=>p.name.toLowerCase().includes(q)))}
function checkout(){alert("Checkout is the next step: Razorpay + address + order system will be connected here.")}
renderProducts();
