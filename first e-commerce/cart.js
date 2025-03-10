
const supabaseUrl = "https://tcimicaanulbvuoqxshc.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRjaW1pY2FhbnVsYnZ1b3F4c2hjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzg1OTQyODQsImV4cCI6MjA1NDE3MDI4NH0.WgHWQmSoYCbOu2JeOIYPcoCsJSM5UWkCMxI7Xyr9xfc"
const supabaseClient = supabase.createClient(supabaseUrl, supabaseKey)
console.log(supabaseClient)

const tbody= document.getElementById("tbody")
const proId = localStorage.getItem("id")
console.log(proId)

async function cartItems(){
    const { data, error } = await supabaseClient
    .from('cart')
    .select()

    for(var i = 0; i < data.length;i++){
        const products = data[i]
        console.log(products)
    

    const tr = document.createElement("tr")
    tr.setAttribute("scope","row")
    tr.innerHTML = `<th scope="row">${i + 1}</th>
          <td>${products.title}</td>
          <td>${products.price}</td>
          <td>${products.desc}</td>
        </tr>`
        tbody.appendChild(tr)
    }
}
cartItems()