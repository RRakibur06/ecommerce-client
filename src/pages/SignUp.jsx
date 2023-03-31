import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { useContext, useEffect, useRef, useState } from 'react';
import { useNavigate } from "react-router";
import axios from "axios";
import { AuthContext } from '../context/auth/AuthContext';
import { Link } from 'react-router-dom';

export default function SignUp (){
    const [visibility, setVisibility] = useState(false);
    const username = useRef();
    const password = useRef();
    const passwordAgain = useRef();
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);

    useEffect(()=>{
        if(user){
            navigate("/");
        };
    },[user, navigate]);

    const toggleVisibility = () => {
        setVisibility(!visibility)
    };

    const handleClick = async (e) => {
        e.preventDefault();
        if (passwordAgain.current.value !== password.current.value) {
            passwordAgain.current.setCustomValidity("Passwords don't match!");
          } else {
            const user = {
              username: username.current.value,
              password: password.current.value,
            };
            try {
              await axios.post("https://ecommerce-api-68am.onrender.com/api/users/register", user);
              navigate("/signin");
            } catch (err) {
              console.log(err);
            }
        }
    };
    return( 
        <div className="bg-cyan-200 h-screen flex justify-center items-center">
            <div className="bg-white h-52 w-96 rounded-sm p-4">
                <p className="text-base mb-3">Create Your Account</p>
                <form className="w-full h-full flex flex-col gap-y-3" onSubmit={handleClick}>
                    <div className="flex justify-between items-center w-full">
                        <p>Username :</p>
                        <input type="text" ref={username} required className="border-slate-500 border-2 rounded-sm pl-1 w-48 outline-none"/>
                    </div>
                    <div className="flex justify-between items-center w-full">
                        <p><nobr>Password :</nobr></p>
                        <div className="border-slate-500 border-2 rounded-sm flex w-48">
                            <input type={visibility ? "text" : "password"} ref={password} required className="pl-1 w-40 outline-none" />
                            { visibility ? <VisibilityIcon onClick={()=>toggleVisibility()} /> : <VisibilityOffIcon onClick={()=>toggleVisibility()} />}
                        </div>
                    </div>
                    <div className="flex justify-between items-center w-full">
                        <p><nobr>Confirm Password :</nobr></p>
                        <div className="border-slate-500 border-2 rounded-sm flex w-48">
                            <input type="password" ref={passwordAgain} required className="pl-1 w-40 outline-none" />
                        </div>
                    </div>
                    <div className="flex justify-between items-center w-full">
                        <button type="submit" className="bg-cyan-400 hover:bg-cyan-600 w-1/4 rounded-sm">Submit</button>
                        <Link to="/signin">
                            <p className="text-sm cursor-pointer hover:text-base ">Sign In to Existing Account</p>
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
};