document.addEventListener("DOMContentLoaded",()=>{
 const f=document.getElementById("contactForm");if(!f)return;
 f.addEventListener("submit",async e=>{e.preventDefault();try{const user=await currentUser();const d=Object.fromEntries(new FormData(f));const {error}=await supabaseClient.from("customer_messages").insert({...d,user_id:user?.id||null});if(error)throw error;f.reset();alert("Message sent successfully.");}catch(err){alert("দুঃখিত, কিছু সমস্যা হয়েছে। আবার চেষ্টা করুন।");}});
});
