import {createContext, useEffect, useReducer} from 'react';
import CartReducer from './CartReducer';

const INITIAL_STATE = JSON.parse(localStorage.getItem("cart")) || {
    products: [],
    quantity: 0,
    total: 0,
};

const CartContext = createContext(INITIAL_STATE); 

const CartContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(CartReducer, INITIAL_STATE);

    useEffect(()=>{
        localStorage.setItem("cart", JSON.stringify(state))
    },[state]);

    return(
        <CartContext.Provider
            value={{
                products : state.products,
                quantity : state.quantity,
                total : state.total,
                dispatch
            }}
        >
            {children}
        </CartContext.Provider>
    );
};

export { CartContext, CartContextProvider };