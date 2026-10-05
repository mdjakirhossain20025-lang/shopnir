function esc(s){return String(s??"").replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[m]));}
function bookCard(b){
 return `<article class="book-card">
  <div class="cover">${b.cover?`<img loading="lazy" src="${esc(b.cover)}" alt="${esc(b.title)}" onerror="this.style.display='none';this.nextElementSibling.style.display='flex'"><div class="cover-placeholder" style="display:none">📖<small>${esc(b.category)}</small></div>`:`<div class="cover-placeholder">📖<small>${esc(b.category)}</small></div>`}</div>
  <div class="book-info"><span class="tag">${esc(b.subcategory||b.category)}</span>${b.demo?'<span class="demo">DEMO</span>':''}
  <h3>${esc(b.title)}</h3><p class="author">${esc(b.author)}</p><div class="rating">${esc(b.rating)}</div>
  <p>${esc(b.description)}</p><p class="audience"><b>কার জন্য:</b> ${esc(b.audience)}</p>
  <div class="card-actions"><button class="why" onclick="alert('${esc(b.recommendation).replace(/'/g,"\\'")}')">কেন পড়বেন?</button>
  <a class="btn affiliate" href="${esc(b.affiliate_url)}" target="_blank" rel="nofollow sponsored noopener">রকমারিতে দেখুন ↗</a></div></div>
 </article>`;
}
function renderBooks(list,el){if(!el)return;el.innerHTML=list.length?list.map(bookCard).join(""):`<div class="empty">কোনো বই পাওয়া যায়নি।</div>`;}
document.addEventListener("DOMContentLoaded",()=>{
 const featured=document.getElementById("featuredBooks"); if(featured) renderBooks(BOOKS.slice(0,4),featured);
 const all=document.getElementById("allBooks");
 if(all){
   let cat="all"; const search=document.getElementById("searchInput");
   function update(){let q=(search?.value||"").toLowerCase();renderBooks(BOOKS.filter(b=>(cat==="all"||b.category===cat||b.tags.includes(cat))&&(!q||[b.title,b.author,b.category,b.subcategory,b.audience,...b.tags].join(" ").toLowerCase().includes(q))),all);}
   document.querySelectorAll(".filter").forEach(x=>x.onclick=()=>{document.querySelectorAll(".filter").forEach(y=>y.classList.remove("active"));x.classList.add("active");cat=x.dataset.cat;update()});
   search?.addEventListener("input",update);update();
 }
 const category=document.getElementById("categoryBooks");
 if(category){let cat=window.PAGE_CATEGORY;renderBooks(BOOKS.filter(b=>b.category===cat||b.tags.includes(cat)),category);}
 const result=document.getElementById("finderResult");
 document.querySelectorAll("[data-find]").forEach(btn=>btn.onclick=()=>{
   const q=btn.dataset.find; const found=BOOKS.filter(b=>b.tags.includes(q)||b.category===q||b.subcategory===q);
   result.innerHTML=found.length?found.slice(0,3).map(b=>`<div><b>${esc(b.title)}</b> — ${esc(b.author)} <a href="books.html">বিস্তারিত →</a></div>`).join(""):`<div>এই বিষয়ের জন্য বই যোগ করা হবে।</div>`;
 });
 const reviews=document.getElementById("reviews");
 if(reviews) reviews.innerHTML=BOOKS.slice(0,3).map(b=>`<article class="review-card"><span class="demo">DEMO REVIEW</span><h2>${esc(b.title)}</h2><p>${esc(b.author)}</p><div class="rating">${esc(b.rating)}</div><p><b>Who should read it?</b> ${esc(b.audience)}</p><p><b>What I learned:</b> এখানে বাস্তব পাঠ-অভিজ্ঞতা যোগ করুন।</p><p><b>Pros:</b> বিষয়ভিত্তিক learning resource.</p><p><b>Cons:</b> বাস্তব edition ও পাঠ-অভিজ্ঞতা যাচাই করা হয়নি।</p><a class="btn affiliate" href="${esc(b.affiliate_url)}" target="_blank" rel="nofollow sponsored noopener">রকমারিতে দেখুন ↗</a></article>`).join("");
});