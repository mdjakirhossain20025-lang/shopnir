async function loadCategories(targetId){
  const {data,error}=await supabaseClient.from("categories").select("*").eq("active",true).order("name");
  const el=document.getElementById(targetId); if(!el)return;
  if(error){el.innerHTML="<p>Categories unavailable.</p>";return;}
  el.innerHTML=data.map(c=>`<a class="category-card" href="products.html?category=${encodeURIComponent(c.id)}"><span>${c.name}</span></a>`).join("");
}
async function loadProducts(targetId, opts={}){
  let q=supabaseClient.from("products").select("*,categories(name)").eq("active",true);
  if(opts.featured) q=q.eq("featured",true);
  if(opts.category) q=q.eq("category_id",opts.category);
  q=q.order("created_at",{ascending:false});
  const {data,error}=await q;
  const el=document.getElementById(targetId); if(!el)return;
  if(error){el.innerHTML="<p>Products could not be loaded.</p>";return;}
  if(!data.length){el.innerHTML="<p>No products found.</p>";return;}
  el.innerHTML=data.map(p=>`<article class="product-card"><img loading="lazy" src="${p.image_url||'assets/images/placeholder.svg'}" alt="${escapeHtml(p.name)}"><div class="card-body"><small>${p.categories?.name||""}</small><h3>${escapeHtml(p.name)}</h3><p class="price">৳${Number(p.discount_price||p.price).toFixed(2)}</p><a class="btn" href="product.html?id=${p.id}">View Product</a></div></article>`).join("");
}
function escapeHtml(s){return String(s??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));}
document.addEventListener("DOMContentLoaded",()=>{
 const grid=document.getElementById("productsGrid");
 if(grid){loadCategories("categoryFilter"); loadProducts("productsGrid");}
});
