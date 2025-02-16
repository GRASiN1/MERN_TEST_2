import { createContext, useContext, useEffect, useState } from "react";
import { api, ENDPOINTS } from "../services/api";
import { useUser } from "./UserContext";
const ProductContext = createContext();

const token = localStorage.getItem("token");
const ProductProvider = ({children})=>{
    const [products, setProducts] = useState([]);
    useEffect(()=>{
        fetchProducts();
    },[])
    const fetchProducts = async ()=>{
        try {
            const response = await api.get(ENDPOINTS.GET_PRODUCTS);
            setProducts(response.data);
        } catch (error) {
            alert(error.message);
        }
    }

    return(
        <ProductContext.Provider value={{products, fetchProducts, }}>
            {children}
        </ProductContext.Provider>
    )
}

const useProduct = ()=>{
    const context = useContext(ProductContext);
    if(!context) throw new Error("useProduct must be used within a ProductProvider");
    return context;
}

export {ProductProvider, useProduct};