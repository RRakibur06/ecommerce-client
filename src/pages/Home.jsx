import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function Home() {
    return(
        <div className="bg-cyan-200 h-screen">
            <Navbar/>
            <div className="flex h-3/4 justify-between pt-20"> 
                <div className="bg-hero bg-contain bg-no-repeat h-full w-96 ml-24" />
                <div className="flex flex-col align-middle w-56 mr-56">
                    <p className="text-5xl text-left pt-7">
                        Get All Kinds Of Exclusive Gadgets Now
                    </p>
                    <Link to="/products">
                        <button className="bg-transparent hover:bg-blue-400 text-black-700 font-semibold hover:text-white py-2 px-4 border border-gray-900 hover:border-transparent mt-7 w-48 ml-1 mr-48">
                            FIND MORE...
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
}
