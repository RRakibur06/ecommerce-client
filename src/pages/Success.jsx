import { useLocation } from "react-router-dom"
import Navbar from "../components/Navbar";

export default function Success () {
    const location = useLocation();
    const products = location.state.products;
    const amount = location.state.stripeData.amount / 100;
    const customer = location.state.stripeData.billing_details;
    console.log(location);
    return(
        <div>
            <Navbar />
            <div className=" m-4 bg-slate-100 pl-3 pt-2">
                <p className="text-xl font-bold underline mb-5 ">Customer Info</p>
                <div className="flex text-left p-2">
                    <div>
                        <p><b>Customer Name</b></p>
                        <p><b>Customer Address(City):</b></p>
                        <p><b>Customer Address(Country):</b></p>
                        <p><b>Net Spending</b></p>
                    </div>
                    <div className="ml-5">
                        <p>{customer.name}</p>
                        <p>{customer.address.city}</p>
                        <p>{customer.address.country}</p>
                        <p>{amount} BDT</p>
                    </div>
                </div>
                <p className="text-xl font-bold underline mb-8">Products</p>
                <div>
                    {products.map((p)=>(
                        <div className="grid grid-cols-5 mb-3"  key={p._id}>
                            <div className="col-span-1 rounded flex justify-center">
                                <img src={p.img} alt="products" height={200} width={230}/>    
                            </div>  
                            <div className="col-span-4 grid grid-cols-2 pr-8 pl-5">
                                <div className="text-left space-y-4 text-lg">
                                    <p><b>Product Name</b></p>
                                    <p><b>Price</b></p>
                                    <p><b>Quantity</b></p>
                                </div>
                                    <div className="text-right space-y-4 text-lg relative">
                                        <p>{p.title}</p>
                                        <p>{p.price}</p>
                                        <p>{p.quantity}</p>
                                    </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}