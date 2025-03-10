
const supabaseUrl = "https://tcimicaanulbvuoqxshc.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRjaW1pY2FhbnVsYnZ1b3F4c2hjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzg1OTQyODQsImV4cCI6MjA1NDE3MDI4NH0.WgHWQmSoYCbOu2JeOIYPcoCsJSM5UWkCMxI7Xyr9xfc"
const supabaseClient = supabase.createClient(supabaseUrl, supabaseKey)
console.log(supabaseClient)

const inpTitle = document.getElementById("title")
const inpPrice = document.getElementById("price")
const inpDesc = document.getElementById("description")
const inpImg = document.getElementById("img")
const myCards = document.querySelector(".my-cards")
// console.log(title, price, desc,img)
let proId = null
const addBtn = document.getElementById("addBtn")
const editBtn = document.getElementById("editBtn")


// async function getUser(){
//   const { data: { user } } = await supabaseClient.auth.getUser()
//   console.log(user)

// }
// getUser()


const key = localStorage.getItem("sb-tcimicaanulbvuoqxshc-auth-token")
const parseKey = JSON.parse(key)
// console.log(parseKey.user.id)




async function addProduct(){
  const title = inpTitle.value
  const price = inpPrice.value
  const desc = inpDesc.value
  const fileImg = inpImg.files[0]
  // console.log(fileImg)
  const fileName = `${Date.now()}-${fileImg.name}`;
  console.log(fileName)


  const { data, error } = await supabaseClient.storage
  .from("images")
  .upload(fileName, fileImg, {
    cacheControl: "3600",
    upsert: false,
  });

if (error) {
  alert("Image upload failed");
  console.log(error);
  return;
}
console.log(data);


  const {data : productdata, error: producterror } = await supabaseClient
  .from('products')
  .insert({ 
    title:title,
    price:price,
    desc:desc,
    img:data.fullPath,
    uid:parseKey.user.id,
  })
  
  if(!producterror){
    alert("Product Add")
    // console.log(producterror)
  }


}

async function loadProducts(){

  const { data, error } = await supabaseClient
  .from('products')
  .select()
  .eq("uid",parseKey.user.id)
  for(var i =0; i < data.length; i++){
    // console.log(data[i])
    const products = data[i]
    proId = products.id
    // console.log(proId)
    
    showToUi(products)


    
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

  
  // const { data, error } = await supabaseClient
  // .from('products')
  // .select()
  // .eq("userId","1fecaddd-340f-49ab-bb94-3f6c7fa1a355")
  // console.log(data)
}

}
loadProducts()

 

function showToUi(products){
  const proId = products.id




  const cardDiv = document.createElement("div")
  cardDiv.className = 'col-md-3 col-sm-6'
    
  cardDiv.innerHTML = `<div class="card" style="width: 18rem; ">
                <img src="${supabaseUrl}/storage/v1/object/${products.img}" alt="...">
                <div class="card-body">
                  <h4 class="card-title">${products.title}</h4>
                  <h5 class="card-price">${products.price}</h5>
                  <p class="card-text">${products.desc}</p>
                  <button type="button" onclick="editPro(${products.id})" class="btn btn-warning">Edit Product</button>
                  <button type="button" onclick="deletePro(${products.id})" class="btn btn-danger">Delete Product</button>
                </div>`
  
  myCards.appendChild(cardDiv)

  }



async function deletePro(id){
  console.log(id)
  // return
  const {data, error} = await supabaseClient
  .from('products')
  .delete()
  .eq('id', id)
  if(!error){
    window.location.reload()
  }

}


async function editPro(id){
  editBtn.classList.remove("d-none")
  addBtn.classList.add("d-none")

  const {data, error } = await supabaseClient
  .from('products')
  .select()
  .eq('id', id)
  .single()
  console.log(data)
  title.value = data.title;
  price.value = data.price;
  description.value = data.desc;
}

async function updateProduct(){
  console.log(products.id)
}




// function addToUi(task){
//   const li = document.createElement("li")
//   li.classList.add("todo-item")
//   const span = document.createElement("span")
//   span.innerHTML = task
//   const doneBtn = document.createElement("button") 
//   doneBtn.classList.add("complete-btn")
//   doneBtn.innerHTML  = "Complete"
//   const deleteBtn = document.createElement("button") 
//   deleteBtn.classList.add("delete-btn")
//   deleteBtn.innerHTML = "Delete"

//   li.appendChild(span)
//   li.appendChild(doneBtn)
//   li.appendChild(deleteBtn)
//   ul.appendChild(li)

  

// }

// async function addTodos() {
//   const taskInp = task.value
//   const { data, error } = await supabaseClient
//   .from('todos')
//   .insert({  task   : taskInp })
//   .select()
  

//   addToUi(taskInp)

//   if(!error){
//     alert("Todo Add")
//   }
// }

// async function loadTodos() {
//   const { data, error } = await supabaseClient
//   .from('todos')
//   .select()
  
//   for(var i = 0; i < data.length;i++){
//     addToUi(data[i].task)
//   }

// }
// loadTodos()