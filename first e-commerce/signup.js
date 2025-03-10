const supabaseUrl = "https://tcimicaanulbvuoqxshc.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRjaW1pY2FhbnVsYnZ1b3F4c2hjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzg1OTQyODQsImV4cCI6MjA1NDE3MDI4NH0.WgHWQmSoYCbOu2JeOIYPcoCsJSM5UWkCMxI7Xyr9xfc"
const supabaseClient = supabase.createClient(supabaseUrl, supabaseKey)
console.log(supabaseClient)

const email = document.getElementById("inputEmail4")
const password = document.getElementById("inputPassword4")
const address = document.getElementById("inputAddress")
const city = document.getElementById("inputCity")
const role = document.getElementById("inputRole")

async function signUp() {
  const userEmail = email.value
  const userPassword = password.value
  const userAddress = address.value
  const userCity = city.value
  const userRole = role.value

  const { data, error } = await supabaseClient.auth.signUp({
    email: userEmail,
    password: userPassword,
  })
  console.log(data)
  if (!error) {
    alert("Sign-Up Successfully")
  }

  const { error: userError } = await supabaseClient
  .from('users')
  .insert({ 
    address : userAddress,
    city : userCity,
    role : userRole,
    userId: data.user.id
    
   })


   

}



function switchToLogin() {
  const loginForm = document.getElementById("login-form")
  const signupForm = document.getElementById("signup-form")
  loginForm.classList.remove("d-none")
  signupForm.classList.add("d-none")

}

const loginEmail = document.getElementById('loginEmail')
const loginPass = document.getElementById('loginPsas')

async function logIn(){
  const userEmail = loginEmail.value
  const userPassword = loginPass.value
  console.log(userEmail, userPassword)
  const { data, error } = await supabaseClient.auth.signInWithPassword({
    email:  userEmail ,
    password: userPassword,
  })
  if(!error){
    alert("Login Successfully")
    console.log(data)
  }

  console.log(data.user.id)


  const { data: tabledata, error: tableerror } = await supabaseClient
  .from('users')
  .select()
  .eq("userId",data.user.id)
  .single()

  
  console.log(tabledata)

  if(tabledata.role === "Buyer"){
    window.location.href = "buyer.html"
  }else if(tabledata.role === "Vendor" ){
    window.location.href = "todo.html"
  }

}