/*
    Call BackEnd API via Apiclient.js

*/
// import { apiCall } from "./api-client.js";
import { apiCall } from "./api-client.js";

import cartOperations from "./cart-services.js";

async function loadPizza(){
    const URL = 'https://raw.githubusercontent.com/Archiit-Jaiin/Pizza-Store/main/pizzamain_api.json';
   //const promise = apiCall(URL);
    try{
    const response = await apiCall(URL);
    const obj = await response.json();
    printPizzas(obj.Vegetarian);
    console.log("code run");
    }
    catch(err){
        console.log('Error in Fetch call ', err);
    }
    //promise.then(callBackFn).catch(callBackFn)
    // Pending
    /*promise.then(function(response){
        const pr = response.json();// JSON --> object (async)
        pr.then(function(data){
            printPizzas(data.Vegetarian);
            console.log('Pizza Data ', data);
        }).catch(function(err){
            console.log('Invalid JSON ', err);
        })
    }).catch(function(err){
        console.log('Unable to make API Call ', err);
    }); */
}
loadPizza();



function printPizzas(pizzas){
    cartOperations.pizzas = pizzas;
    // Loop and call printPizza
    for(var i = 0 ; i<pizzas.length; i++){
        printPizza(pizzas[i]);
    }
}



function printPizza(pizza){

    const cardDiv = document.createElement('div');
    cardDiv.className = 'card';
    cardDiv.style.width = '18rem';
    cardDiv.style.boxShadow = '1px 1px 10px #000';
    cardDiv.style.margin = '0.8rem';
    
    const img = document.createElement('img');
    img.src = pizza.assets.menu[0].url;
    img.style.height = '10rem';
    img.style.width= "18rem";
    img.style.marginLeft ="-0.8rem"
    img.className = 'card-img-top';
    
    const cardBodyDiv = document.createElement('div');
    cardBodyDiv.className = 'card-body';
    
    const h5 = document.createElement('h5');
    h5.className = 'card-title';
    h5.innerText = pizza.name;
    
    const pTag = document.createElement('p');
    pTag.className = 'card-text';
    pTag.innerText = `${pizza.menu_description} ₹${pizza.price}`;
    
    const flexContainer = document.createElement('div');
    flexContainer.style.display = 'flex';
    flexContainer.style.justifyContent = 'space-between';
    flexContainer.style.marginBottom = '10px';
    
    const sizeSpan = document.createElement('span');
    const sizeLabel = document.createElement('label');
    sizeLabel.textContent = 'Size';
    sizeLabel.style.marginRight = '5px';
    const sizeSelect = document.createElement('select');
    sizeSelect.style.fontSize = "15px";
    ['small', 'medium', 'large'].forEach(size => {
        const option = document.createElement('option');
        option.value = size;
        option.textContent = size;
        sizeSelect.appendChild(option);
    });
    sizeSpan.appendChild(sizeLabel);
    sizeSpan.appendChild(sizeSelect);
    
    
    const crustSpan = document.createElement('span');
    const crustLabel = document.createElement('label');
    crustLabel.textContent = 'Crust';
    crustLabel.style.marginRight = '5px';
    const crustSelect = document.createElement('select');
    crustSelect.style.fontSize = '15px';
    ['New Hand Tossed', '100% Wheat Thln Crust', 'Chess Burst','Fresh Pan Pizza'].forEach(crust => {
        const option = document.createElement('option');
        option.value = crust;
        option.textContent = crust;
        crustSelect.appendChild(option);
    });
    crustSpan.appendChild(crustLabel);
    crustSpan.appendChild(crustSelect);
    
    flexContainer.appendChild(sizeSpan);
    flexContainer.appendChild(crustSpan);
    
    const button = document.createElement('button');
    button.innerText = 'Add to Cart';
    button.setAttribute('pizza-id', pizza.id);
    button.className = 'btn btn-primary';
    button.addEventListener('click', addToCart);
    
    cardBodyDiv.appendChild(h5);
    cardBodyDiv.appendChild(pTag);
    cardBodyDiv.appendChild(flexContainer);
    cardBodyDiv.appendChild(button);
    cardDiv.appendChild(img);
    cardDiv.appendChild(cardBodyDiv);
    
    document.getElementById('pizzas').appendChild(cardDiv);
    
    }


function addToCart(){
    const pizzaId = this.getAttribute('pizza-id');
    //console.log('Add to Cart Call ', this.getAttribute('pizza-id'));
    cartOperations.addInCart(pizzaId);
    
    printCart();
}



function printCart(){

    const pizzasInCart = cartOperations.viewAll();
    const cartElement = document.getElementById('carts');
    const payButton = document.getElementById('rzp-button1');

    cartElement.innerHTML = '';
    pizzasInCart.forEach(pizza => printCartItem(pizza));

    cartElement.appendChild(printTotal(pizzasInCart));

    if (pizzasInCart.length > 0) {
        payButton.disabled = false;
    } else {
        payButton.disabled = true;
    }
}


function printCartItem(pizza){
    const pTag = document.createElement('p');
    pTag.innerText = `${pizza.name} ${pizza.price}`;
    document.getElementById('carts').appendChild(pTag);

    // const div = document.createElement('div');
    // div.className = 'cart-item';

    // const pTag = document.createElement('p');
    // pTag.innerText = `${pizza.name} ${pizza.price} x ${pizza.quantity}`;

    // const incButton = document.createElement('button');
    // incButton.innerText = '+';
    // incButton.addEventListener('click', () => {
    //     cartOperations.addInCart(pizza.id);
    //     printCart();
    // });

    // const decButton = document.createElement('button');
    // decButton.innerText = '-';
    // decButton.addEventListener('click', () => {
    //     cartOperations.removeFromCart(pizza.id);
    //     printCart();
    // });

    // div.appendChild(pTag);
    // div.appendChild(incButton);
    // div.appendChild(decButton);
    // document.getElementById('carts').appendChild(div);

    
}




function printTotal(pizzasInCart){
    
    const total = pizzasInCart.reduce((acc, pizza)=>acc + parseFloat(pizza.price), 0).toFixed(2);
    console.log('Total is ', total);
    const pTag = document.createElement('p');
    pTag.innerText = 'Total Bill '+total;
    return pTag;


    // const total = pizzasInCart.reduce((acc, pizza) => acc + parseFloat(pizza.price), 0).toFixed(2);
    // console.log('Total is ', total);
    // const pTag = document.createElement('p');
    // pTag.innerText = 'Total Bill ₹' + total;
    // document.getElementById('carts').appendChild(pTag);
    // return total;


}


