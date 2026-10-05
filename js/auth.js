async function registerUser(data) {
  const {data: result, error} = await supabaseClient.auth.signUp({email:data.email,password:data.password,options:{data:{name:data.name,phone:data.phone}}});
  if(error) throw error;
  return result;
}
async function loginUser(email,password) {
  const {data,error}=await supabaseClient.auth.signInWithPassword({email,password});
  if(error) throw error; return data;
}
async function logoutUser(){await supabaseClient.auth.signOut(); location.href="index.html";}
async function currentUser(){const {data}=await supabaseClient.auth.getUser(); return data.user;}
document.addEventListener("DOMContentLoaded", async()=>{
  const user=await currentUser().catch(()=>null);
  const link=document.getElementById("authLink");
  const mobileLink=document.getElementById("mobileAuthLink");
  if(link && user){link.textContent="Profile";link.href="profile.html";}
  if(mobileLink && user){
    mobileLink.querySelector("span:last-child").textContent="Profile";
    mobileLink.href="profile.html";
    mobileLink.dataset.mobileNav="profile";
  }
  const lf=document.getElementById("loginForm");
  if(lf) lf.addEventListener("submit",async e=>{e.preventDefault();try{const f=new FormData(lf);await loginUser(f.get("email"),f.get("password"));location.href="index.html";}catch(err){alert("Login failed. Please try again.");}});
  const rf=document.getElementById("registerForm");
  if(rf) rf.addEventListener("submit",async e=>{e.preventDefault();try{const f=new FormData(rf);await registerUser(Object.fromEntries(f));alert("Registration submitted. Check your email if confirmation is enabled.");location.href="login.html";}catch(err){alert("Registration failed. Please try again.");}});
});
