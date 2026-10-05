function getGuestCart(){return JSON.parse(localStorage.getItem("shopnir_cart")||"[]");}
function saveGuestCart(c){localStorage.setItem("shopnir_cart",JSON.stringify(c));updateCartCount();}
function addToGuestCart(item){const c=getGuestCart();const x=c.find(i=>i.product_id===item.product_id);if(x)x.quantity+=item.quantity;else c.push(item);saveGuestCart(c);}
function updateCartCount(){const el=document.getElementById("cartCount");if(el)el.textContent=getGuestCart().reduce((n,i)=>n+Number(i.quantity),0);}
document.addEventListener("DOMContentLoaded",updateCartCount);
