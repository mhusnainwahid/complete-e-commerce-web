const supabaseUrl = "https://tcimicaanulbvuoqxshc.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRjaW1pY2FhbnVsYnZ1b3F4c2hjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzg1OTQyODQsImV4cCI6MjA1NDE3MDI4NH0.WgHWQmSoYCbOu2JeOIYPcoCsJSM5UWkCMxI7Xyr9xfc"
const supabaseClient = supabase.createClient(supabaseUrl, supabaseKey)
console.log(supabaseClient)


const mainDiv = document.querySelector(".main")


const id = localStorage.getItem("id")
console.log(id)

async function buyPro(){
    const { data, error } = await supabaseClient
  .from('products')
  .select()
  .eq("id",id)
  .single()
  console.log(data)

  
  // const proImg = document.createElement("div")
  // proImg.classList.add("proImg")
  // const img = document.createElement("img")
  // img.setAttribute("src",data.img)
  // proImg.appendChild(img)
  // mainDiv.appendChild(proImg)

  // const proInfo = document.createElement("div")
  // proInfo.classList.add("proInfo")
  // const infoTitle = document.createElement("h1")
  // infoTitle.innerHTML = data.title
  // const infoPrice = document.createElement("h2")
  // infoPrice.innerHTML = data.price
  // const infoDesc = document.createElement("h4")
  // infoDesc.innerHTML = data.desc

  // mainDiv.appendChild(proInfo)
  // proInfo.appendChild(infoTitle)
  // proInfo.appendChild(infoPrice)
  // proInfo.appendChild(infoDesc)


    mainDiv.innerHTML=  `<div class="proImg">
            <img src="${supabaseUrl}/storage/v1/object/${data.img}">

        </div>
        <div class="proInfo">
            <h1 class="proTitle">${data.title}</h1>
            <h2 class="proPrice">${data.price}</h2>
            <h4 class="proDesc">${data.desc}</h4>
            <button class="buyBtn" onclick="confirmPro(${data.id})">Confirm Product</button>
        </div>`

}
buyPro()

async function confirmPro(id) {
  console.log(id)

  const { data, error } = await supabaseClient
  .from('products')
  .select()
  .eq("id",id)
  .single()
  console.log(data)


  const { tableerror } = await supabaseClient
  .from('sales')
  .insert({ 
    title:data.title,
    price:data.price,
    proId:data.id,
    userId:data.uid,
   })
   if(!tableerror){
    alert("conofirm product")
    window.location.href = "buyer.html"
   }

}