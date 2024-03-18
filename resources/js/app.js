import axios from 'axios'
import Noty from 'noty'
let addToCart = document.querySelectorAll('.add-to-cart')
let cartCounter = document.querySelector('#cartCounter')
function updateCart(pizza)
{
        axios.post('/update-cart', pizza).then(res =>{
           
            cartCounter.innerText = res.data.totalQty

            new Noty({
                type: 'success',
                timeout: 1000,
                progressBar: false,
                layout: 'topLeft',
                text: 'Item added to cart'
            }).show()
        }).catch( err => {
                    new Noty({
                        type: 'error',
                        timeout: 1000,
                        text: 'Something went wrong',
                        progressBar: false
                    })
        })
}


addToCart.forEach(btn =>{
   btn.addEventListener('click', (e) => {
     
    let pizza = JSON.parse(btn.dataset.pizza)      
     updateCart(pizza);
    // console.log(pizza)
   })
})






// remove alert message after X secound 
const alertMsg = document.querySelector('#success-alert')
if(alertMsg)
{
    setTimeout(()=>{
        alertMsg.remove()
    }, 2000)
}