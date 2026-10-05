document.addEventListener("DOMContentLoaded",()=>{
 const form=document.getElementById("checkoutForm"); if(!form)return;
 form.addEventListener("submit",async e=>{
   e.preventDefault();
   const user=await currentUser(); if(!user){alert("Please login first.");location.href="login.html";return;}
   const f=new FormData(form);
   try{
     const cart=getGuestCart(); if(!cart.length){alert("আপনার Cart এখনো খালি।");return;}
     const subtotal=cart.reduce((s,i)=>s+Number(i.price)*Number(i.quantity),0);
     const {data:order,error}=await supabaseClient.from("orders").insert({user_id:user.id,full_name:f.get("full_name"),phone:f.get("phone"),email:f.get("email"),district:f.get("district"),address:f.get("address"),note:f.get("note"),payment_method:f.get("payment_method"),transaction_id:f.get("transaction_id"),subtotal,delivery_charge:0,total:subtotal}).select().single();
     if(error)throw error;
     const items=cart.map(i=>({order_id:order.id,product_id:i.product_id,quantity:i.quantity,unit_price:i.price}));
     const {error:itemError}=await supabaseClient.from("order_items").insert(items);if(itemError)throw itemError;
     localStorage.removeItem("shopnir_cart");alert("Order placed successfully.");location.href="orders.html";
   }catch(err){console.error(err);alert("দুঃখিত, কিছু সমস্যা হয়েছে। আবার চেষ্টা করুন।");}
 });
});
