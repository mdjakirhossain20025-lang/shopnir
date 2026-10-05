document.addEventListener("DOMContentLoaded",async()=>{
 const el=document.getElementById("ordersContainer");if(!el)return;
 const user=await currentUser();if(!user){el.innerHTML='<p>Please login first.</p>';return;}
 const {data,error}=await supabaseClient.from("orders").select("*").eq("user_id",user.id).order("created_at",{ascending:false});
 if(error){el.innerHTML="<p>Orders could not be loaded.</p>";return;}
 el.innerHTML=data.length?data.map(o=>`<div class="order-card"><strong>Order #${o.id.slice(0,8)}</strong><p>Status: ${o.status}</p><p>Total: ৳${Number(o.total).toFixed(2)}</p></div>`).join(""):"<p>আপনার এখনো কোনো Order নেই।</p>";
});
