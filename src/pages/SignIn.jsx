import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { useContext, useEffect, useRef, useState } from 'react';
import {Link, useNavigate} from 'react-router-dom';
import { AuthContext } from '../context/auth/AuthContext';
import { loginCall } from '../apiCalls.js';

export default function SignIn (){
    const [visibility, setVisibility] = useState(false);
    const {dispatch, user} = useContext(AuthContext);
    const username = useRef();
    const password = useRef();
    const navigate = useNavigate();

    useEffect(()=>{
        if(user){
            navigate("/");
        };
    },[user, navigate]);

    const toggleVisibility = () => {
        setVisibility(!visibility)
    };

    const handleClick = async () => {
        loginCall(
            { username: username.current.value, password: password.current.value },
            dispatch
        );
    };
    return(
        <div className="bg-cyan-200 h-screen flex justify-center items-center">
            <div className="bg-white h-44 w-80 rounded-sm p-4">
                <p className="text-base mb-3">Sign In To Your Account</p>
                <div className="w-full h-full flex flex-col gap-y-3" >
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
                        <button type="submit" onClick={()=> handleClick()} className="bg-cyan-400 hover:bg-cyan-600 w-1/4 rounded-sm">Submit</button>
                        <Link to="/signup">
                            <p className="text-sm cursor-pointer hover:text-base ">Create Account</p>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};