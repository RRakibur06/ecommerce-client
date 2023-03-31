import { useContext, useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { RemoveProduct } from "../context/cart/CartActions";
import { CartContext } from "../context/cart/CartContext";
import StripeCheckout from "react-stripe-checkout";
import { useNavigate } from "react-router";
import axios from "axios";
import logo from "../assets/logo.jpg";
const key = "pk_test_51Lhqd0GEOMV9xr30CVsA8eQHQ3A0HEFmE9Nb5y564ObkMtys5vRlVXvFqFL7FNe9Y3vt1uPp9zwR8mn2yxRbwlO500X6FZlcsi";

export default function Cart() {
    const {products, total, dispatch} = useContext(CartContext);
    const [stripeToken, setStripeToken] = useState(null);
    const navigate = useNavigate();

    const handleClick = (product) => {
        dispatch(RemoveProduct(product));
    };

    const onToken = (token) => {
        setStripeToken(token);
    };

    useEffect(() => {
        const makeRequest = async () => {
          try {
            const res = await axios.post("https://ecommerce-api-68am.onrender.com/api/checkout/payment", {
              tokenId: stripeToken.id,
              amount: total,
            });
            navigate("/success",{
                state:{
                    stripeData: res.data,
                    products
                }});
          } catch {}
        };
        stripeToken && makeRequest();
      }, [stripeToken, total, navigate, products]);
    
    return(
        <div className="h-screen">
            <Navbar />
            <div className="grid grid-cols-3 w-100 gap-10 m-3">
                <div className="col-span-3">
                    <p className="text-4xl">YOUR CART</p>
                </div>
                <div className="col-span-2 space-y-10">
                {products.map((p)=>(
                    <div className="grid grid-cols-3"  key={p._id}>
                        <div className="col-span-1 rounded">
                            <img src={p.img} alt="products" />    
                        </div>  
                        <div className="col-span-2 grid grid-cols-2 pr-5 pl-5">
                            <div className="text-left space-y-4 text-lg">
                                <p><b>Product Name</b></p>
                                <p><b>Price</b></p>
                                <p><b>Quantity</b></p>
                            </div>
                                <div className="text-right space-y-4 text-lg relative">
                                    <p>{p.title}</p>
                                    <p>{p.price}</p>
                                    <p>{p.quantity}</p>
                                    <button className=" bg-red-300 font-bold rounded-md text-xs p-2 right-0 bottom-0 absolute hover:bg-red-400"
                                        onClick={()=> handleClick(p)}    
                                    > REMOVE
                                    </button>
                                </div>
                        </div>
                    </div>
                ))}
                </div>
                <div className="h-96 border-black rounded-md border-2">
                    <p className="text-3xl pt-12">ORDER SUMMARY</p>
                    <div className="grid grid-cols-2 p-10">
                        <div className="text-left space-y-2">
                            <p>Subtotal</p>
                            <p>Shipping Cost</p>
                            <p>Discount</p>
                            <p className="font-black text-lg">Total</p>
                        </div>
                        <div  className="text-right space-y-2">
                            <p>{total} BDT</p>
                            <p>1000 BDT</p>
                            <p>1000 BDT</p>
                            <p className="font-black text-lg">{total} BDT</p>
                        </div>
                    </div>
                    <StripeCheckout
                        name="Tech Gadgets"
                        image={logo}
                        billingAddress
                        shippingAddress
                        description={`Your total is ${total} BDT`}
                        amount={total}
                        token={onToken}
                        stripeKey={key}
                    >
                        <button className=" w-3/4 h-11 bg-blue-500">CHECKOUT NOW</button>
                    </StripeCheckout>
                </div>
            </div>
        </div>
    );
}