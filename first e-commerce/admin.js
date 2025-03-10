const supabaseUrl = "https://tcimicaanulbvuoqxshc.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRjaW1pY2FhbnVsYnZ1b3F4c2hjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzg1OTQyODQsImV4cCI6MjA1NDE3MDI4NH0.WgHWQmSoYCbOu2JeOIYPcoCsJSM5UWkCMxI7Xyr9xfc"
const supabaseClient = supabase.createClient(supabaseUrl, supabaseKey)
console.log(supabaseClient)

const tbody = document.getElementById("tbody")

async function tableOfSales(){
    const { data, error } = await supabaseClient
  .from('sales')
  .select()
  
  for(var i =0; i < data.length; i++){
    console.log(data[i])
    const products = data[i]
    const tr = document.createElement("tr")

    tr.innerHTML = `  <th scope="row">${i + 1}</th>
                <td>${products.title}</td>
                <td>${products.price}</td>
                <td>${products.proId}</td>
                <td>${products.userId}</td>`

    tbody.appendChild(tr)            
}
}
tableOfSales()