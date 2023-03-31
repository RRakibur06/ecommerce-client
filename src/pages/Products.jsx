import Navbar from "../components/Navbar";
import { options1, options2 } from "../data";
import Select from 'react-select';
import { useEffect, useState } from "react";
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { Link } from "react-router-dom";
import axios from "axios";

export default function Products() {
    const [products, setProducts] = useState();
    const [dummyProducts, setDummyProducts] = useState();
    const [sort, setSort] = useState("");
    let x = [];
    const handleChange = (value) => {
        setSort(value.value);
    };

    useEffect(()=>{
        switch(sort) {
            case "Default":
                setDummyProducts(products);
                break;
            case "Ascending":
                x = products.sort((a, b)=>(parseInt(b.price) - parseInt(a.price)));
                setDummyProducts(x);
                break;
            case "Descending":
                x = products.sort((a, b)=>(parseInt(a.price) - parseInt(b.price)));
                setDummyProducts(x);
                break;
            default:
                if(sort){
                    x = products.filter( product => (sort === product.cat));
                    setDummyProducts(x);
                }
        } 
    },[sort]);

    useEffect(()=>{
        const fetchProducts = async () => {
            const res = await axios.get("https://ecommerce-api-68am.onrender.com/api/products");
            setProducts(res.data);
            setDummyProducts(res.data);
        };
        fetchProducts();
    },[]);
    return(
        <div>
            <Navbar/> 
            <div className="flex flex-row justify-between m-10">
                <Select placeholder="Filter" options={options1} onChange={(value)=>handleChange(value)} className="w-36"/>
                <Select placeholder="Sort" options={options2} onChange={(value)=>handleChange(value)} className="w-36"/>
            </div>
            <div className="flex flex-wrap justify-around m-10 gap-12 bg-slate-300 p-3 rounded-md">
            {
                dummyProducts?.map(
                    (p) => (
                        <div className="max-h-56 w-60 hover:bg-sky-400 cursor-pointer relative" key={p._id}>
                                <img src={p.img} alt="product" className="max-h-56 w-60 hover:opacity-50 rounded-md"/>
                                <div className="absolute hover:bg-sky-400 top-0 left-0 opacity-0 hover:opacity-60 w-full h-full pt-14">
                                    <Link to={`/${p._id}`}>
                                        <SearchOutlinedIcon sx={{color: "white", fontSize:60}} className="bg-sky-800" />
                                    </Link>
                                </div>
                        </div>
                    )
                )
            }
            </div>
        </div>
    );
} 