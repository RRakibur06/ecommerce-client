import { useContext, useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { CartContext } from "../context/cart/CartContext";
import { AddProduct } from "../context/cart/CartActions";
import { AuthContext } from "../context/auth/AuthContext";

export default function Single() {
    const location = useLocation();
    const id = location.pathname.split("/")[1];
    const [product, setProduct] = useState({});
    const [quantity, setQuantity] = useState(1);
    const { dispatch, products } = useContext(CartContext);
    const { user } = useContext(AuthContext);

    useEffect(() => {
        const getProduct = async () => {
            const res = await axios.get(`https://ecommerce-api-68am.onrender.com/api/products/find/${id}`);
            setProduct(res.data);
        };
        getProduct();
      }, [id]);
    
    const handleClick = async () => {
        let x = false;
        products.map((p)=>{
            if( p._id === product._id ) return x = true;
            return x; 
        });
        if(!x)
            dispatch(AddProduct({...product, quantity}));
        else
            alert("This Product is already in the cart!")
    }

    return(
        <div className="h-screen">
            <Navbar />
            <div className="m-5 w-11/12 h-5/6 flex bg-slate-200">
                <div className="w-1/2 h-full flex justify-center items-center">
                    <img src={product.img} alt="single product" />           
                </div> 
                <div className="w-1/2 h-5/6 text-left flex flex-col justify-center space-y-8 pl-10">
                    <p className="text-4xl mt-20">{product.title}</p>
                    <p className="text-xl"><b>Description : </b>{product.desc}</p>
                    <p className="text-xl"><b>Price : </b>{product.price}</p>
                    <p className="text-xl"><b>Quantity : </b>{product.quantity}</p>
                    <p className="text-xl"><b>Category : </b>{product.cat}</p>
                    <div className="text-xl flex items-center"><b>Quantity : </b>
                        <div className="flex items-center justify-between w-20 ml-3"> 
                            <button className="bg-blue-500 rounded-lg p-1 h-6 flex items-center" onClick={()=> (quantity < 10) ? setQuantity(quantity + 1) : setQuantity(quantity)}>+</button>
                                {quantity}
                            <button className="bg-blue-500 rounded-lg p-1 h-6 flex items-center" onClick={()=> (quantity > 1) ? setQuantity(quantity - 1) : setQuantity(quantity)}>-</button>
                        </div>
                    </div>

                    <button className=" bg-blue-500 w-28 h-10 text-lg" onClick={()=> user ? handleClick() : alert("Please Sign In to your Account!")}>Add to Cart</button>
                </div>
            </div>  
        </div>
    );
}