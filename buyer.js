
const supabaseUrl = "https://tcimicaanulbvuoqxshc.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRjaW1pY2FhbnVsYnZ1b3F4c2hjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzg1OTQyODQsImV4cCI6MjA1NDE3MDI4NH0.WgHWQmSoYCbOu2JeOIYPcoCsJSM5UWkCMxI7Xyr9xfc"
const supabaseClient = supabase.createClient(supabaseUrl, supabaseKey)
console.log(supabaseClient)


const myCards = document.querySelector(".my-cards")

async function showProductsToUi() {
    const { data, error } = await supabaseClient
  .from('products')
  .select()
  
  for(var i =0; i < data.length; i++){
    console.log(data[i])
    const products = data[i]
  //   const cardDiv = document.createElement("div")
  // cardDiv.classList.add("card")
  // cardDiv.style.width ="18rem"
  // const cardImg = document.createElement("img")
  // cardImg.classList.add("card-img-top")
  // cardImg.setAttribute("src",products.img)
  // const cardBody = document.createElement("div")
  // cardBody.classList.add("card-body")
  // const cardTitle = document.createElement("h4")
  // cardBody.classList.add("card-title")
  // cardTitle.innerHTML = products.title
  // const cardPrice =document.createElement('h5')
  // cardPrice.classList.add("card-price")
  // cardPrice.innerHTML = products.price
  // const cardDesc = document.createElement("p")
  // cardDesc.classList.add("card-text")
  // cardDesc.innerHTML = products.desc
  // const editBtn = document.createElement("button")
  // editBtn.classList.add("btn","btn-warning")
  // editBtn.innerHTML = "Edit Product"
  // const delBtn = document.createElement("button")
  // delBtn.classList.add("btn","btn-danger")
  // delBtn.innerHTML = "Delete Product"

  // cardDiv.appendChild(cardImg)
  // cardBody.appendChild(cardTitle)
  // cardBody.appendChild(cardPrice)
  // cardBody.appendChild(cardDesc)
  // cardBody.appendChild(editBtn)
  // cardBody.appendChild(delBtn)
  // cardDiv.appendChild(cardBody)
  // vendorCards.appendChild(cardDiv)

  const cardDiv = document.createElement("div")
  cardDiv.className = 'col-md-3 col-sm-6'
    
  cardDiv.innerHTML = `<div class="card" style="width: 18rem; ">
  <img src="${supabaseUrl}/storage/v1/object/${products.img}" alt="...">
  <div class="card-body">
    <h4 class="card-title">${products.title}</h4>
    <h5 class="card-price">${products.price}</h5>
    <p class="card-text">${products.desc}</p>
    <button type="button" onclick="buyPro(${products.id})" class="btn btn-warning">Buy Product</button>
    <button type="button" onclick="addToCart(${products.id})" class="btn btn-danger">Add to Cart</button>
  </div>`

  
  myCards.appendChild(cardDiv)

 
}
}
showProductsToUi()



async function buyPro(id){

  
  window.location.href = "buy.html"
  console.log(id)
  const proId = localStorage.setItem("id",id)

}
async function addToCart(id){
  console.log(id)
  const proId = localStorage.setItem("id",id)

  const { data, error } = await supabaseClient
  .from('products')
  .select()
  .eq("id",id)
  .single()


  console.log(data)

  const { tableerror } = await supabaseClient
  .from('cart')
  .insert({ 
    title:data.title,
    price:data.price,
    desc:data.desc
   })
   if(!tableerror){
    alert("Add product in cart")
    window.location.href = "cart.html"
   }

}