import { Link } from "react-router-dom";
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { Badge } from "@mui/material";
import { useContext } from "react";
import { CartContext } from "../context/cart/CartContext";
import { AuthContext } from "../context/auth/AuthContext";

export default function Navbar() {
    const {quantity} = useContext(CartContext);
    const { user } = useContext(AuthContext);

    const handleClick = () => {
        localStorage.removeItem('user');
        localStorage.removeItem('cart');
        window.location.reload();
    };

    return(
        <div>
            <div className="h-12 bg-white flex p-2 justify-between shadow-sm">
                <Link to="/">
                    <p className="text-2xl ml-4">TechGadgets</p>
                </Link>
                <div className="flex justify-between mt-1 mr-4 space-x-3">
                    <Link to="/products">
                        <p className="cursor-pointer font-medium hover:bg-slate-200 hover:pl-1 hover:pr-1 hover:rounded-sm">Products</p>
                    </Link>
                    <Link to="/cart">
                        <div className="w-14 hover:bg-slate-200 hover:pl-1 hover:pr-1 hover:rounded-sm flex justify-between items-center">
                            <p className="cursor-pointer font-medium"> Cart </p>
                            <Badge badgeContent={quantity} color="primary">
                                <ShoppingCartOutlinedIcon /> 
                            </Badge>
                        </div>
                    </Link>
                    {   user ?
                            <p onClick={() => handleClick()} className="cursor-pointer font-medium hover:bg-slate-200 hover:pl-1 hover:pr-1 hover:rounded-sm"> Sign Out </p>
                        :
                        <>
                            <Link to="/signin">
                                <p className="cursor-pointer font-medium hover:bg-slate-200 hover:pl-1 hover:pr-1 hover:rounded-sm"> Sign In </p>
                            </Link>
                            <Link to="/signup">
                                <p className="cursor-pointer font-medium hover:bg-slate-200 hover:pl-1 hover:pr-1 hover:rounded-sm"><nobr> Create Account </nobr></p>
                            </Link>
                        </>
                    }
                </div>
            </div>
        </div>
    );
}