'use client'
import { createContext, useContext, useEffect, useState } from "react";
import axios from 'axios';
import { ToastContainer, toast } from "react-toastify";
import { useCallback } from 'react';


axios.defaults.withCredentials = true;
axios.defaults.baseURL = process.env.NEXT_PUBLIC_BACKEND_URL;


export const AppContext = createContext();

export const AppContextProvider = ({children}) => {
    
    const [selectedProductId, setSelectedProductId] = useState(null);
    const [user, setUser] = useState(null);
    const [product, setProduct] = useState([]);

    //Fetch User Auth Status
    const fetchUser = async(req, res) => {
        try{
            const {data} = await axios.get('/api/auth/is-auth');
            // console.log(data);
            if(data.success){
                // setUser(data.user);

                localStorage.setItem('user',  JSON.stringify(data.user)); //save the user at localstorage
            }
        }catch(err){
            console.error("Something wrong with fetchUser function:", err )
            // setUser(null);
            //localStorage.removeItem('user'); //Clear on error
        }
    }

    // console.log(user);

    //Get All Products
    const fetchAllProduct = async (req, res) => {
        try {
        const res = await axios.get("/api/products/all");
        setProduct(res.data);
        console.log(product);
        } catch (err) {
        console.error("Failed to fetch products:", err);
        }
    };

    //Get Product by Id
    const fetchProductById = useCallback (async(id) => {
        try{
            const res = await axios.get(`/api/products/${id}`);
            return res.data; //return data
        }catch(error){
            console.error('Error fetching product:', error);
        }
    }, []);
    

    useEffect(() =>{
        fetchUser();
        fetchAllProduct();
    }, [])


    const value = {axios, user, setUser, product, setProduct, fetchAllProduct, fetchProductById, selectedProductId, setSelectedProductId }

    return <AppContext.Provider value = {value}>
        {children}
    </AppContext.Provider>
}

export const useAppContext = () => {
    return useContext(AppContext);
}