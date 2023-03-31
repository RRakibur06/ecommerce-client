const CartReducer = (state, action) => {
    switch(action.type){
        case "ADD_PRODUCT" : 
            return {
                products : state.products.concat(action.payload),
                quantity : state.quantity += 1,
                total : state.total += action.payload.price * action.payload.quantity
            };
        case "REMOVE_PRODUCT" : 
            let newProducts = state.products.filter((p)=>(
                p._id !== action.payload._id
            ));
            return {
                products : newProducts,
                quantity : state.quantity -= 1,
                total : state.total -= action.payload.price * action.payload.quantity
            };
        default :
            return state;
    }
};

export default CartReducer;