const $ = (s, p=document) => p.querySelector(s);
const $$ = (s, p=document) => Array.from(p.querySelectorAll(s));

function formatIQD(n){
  return new Intl.NumberFormat("ar-IQ").format(n) + " د.ع";
}

function getCart(){
  try { return JSON.parse(localStorage.getItem("cart") || "[]"); }
  catch { return []; }
}
function setCart(cart){
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartBadge();
}
function updateCartBadge(){
  const cart = getCart();
  const count = cart.reduce((a,i)=>a + i.qty, 0);
  $$(".cart-count").forEach(el => el.textContent = count);
}
function addToCart(productId, qty=1){
  const cart = getCart();
  const item = cart.find(x=>x.id===productId);
  if(item) item.qty += qty;
  else cart.push({id:productId, qty});
  setCart(cart);
  toast("تمت الإضافة للسلة ✅");
}
function removeFromCart(productId){
  const cart = getCart().filter(x=>x.id!==productId);
  setCart(cart);
}
function toast(msg){
  const t = document.createElement("div");
  t.textContent = msg;
  Object.assign(t.style, {
    position:"fixed", bottom:"18px", right:"18px",
    background:"rgba(0,0,0,.75)", border:"1px solid rgba(255,255,255,.12)",
    color:"#fff", padding:"10px 12px", borderRadius:"14px",
    zIndex:9999, backdropFilter:"blur(8px)"
  });
  document.body.appendChild(t);
  setTimeout(()=>t.remove(), 1700);
}

// سلايدر بسيط
function initSlider(){
  const slider = $(".slider");
  if(!slider) return;
  const slides = $$(".slide", slider);
  const dotsWrap = $(".dots", slider);
  let idx = 0;
  function show(i){
    idx = (i + slides.length) % slides.length;
    slides.forEach((s,k)=>s.classList.toggle("active", k===idx));
    $$(".dot", dotsWrap).forEach((d,k)=>d.classList.toggle("active", k===idx));
  }
  // dots
  dotsWrap.innerHTML = slides.map((_,i)=>`<span class="dot" data-i="${i}"></span>`).join("");
  dotsWrap.addEventListener("click", (e)=>{
    const d = e.target.closest(".dot");
    if(!d) return;
    show(parseInt(d.dataset.i,10));
  });
  show(0);
  setInterval(()=>show(idx+1), 4500);
}

document.addEventListener("DOMContentLoaded", ()=>{
  updateCartBadge();
  initSlider();
});
