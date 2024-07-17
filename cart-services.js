/*
const obj = {
    addInCart : function(){

    },
    removeFromCart:function(){}
}
*/
// ES6 ShortHand Style of Object Creation
const cartOperations = {
    pizzas:[],


addInCart(pizzaId){
    const pizza = this.pizzas.find(currentPizza=>currentPizza.id == pizzaId);
   pizza.isInCart=true;
   console.log(this.pizzas);

    // if (this.cart[pizzaId]) {
    //     this.cart[pizzaId].quantity += 1;
    // } else {
    //     const pizza = this.pizzas.find(p => p.id === pizzaId);
    //     this.cart[pizzaId] = {...pizza, quantity: 1};
    // }
},

removeFromCart(){
    if (this.cart[pizzaId]) {
        this.cart[pizzaId].quantity -= 1;
        if (this.cart[pizzaId].quantity <= 0) {
            delete this.cart[pizzaId];
        }
    }
},

viewAll(){
    return  this.pizzas.filter(pizza=>pizza.isInCart);
},

totalCompute(){

}
}
// export default cartOperations;
export default cartOperations;