// AppContext.jsx
'use client';
import { createContext, useContext, useEffect, useState, useCallback } from "react";
import axios from "@/lib/axios"; // ✅ Custom configured instance

export const AppContext = createContext();

export const AppContextProvider = ({children}) => {
    const [selectedProductId, setSelectedProductId] = useState(null);
    const [user, setUser] = useState(null);
    const [product, setProduct] = useState([]);
    const [token, setToken] = useState(null);

    const fetchUser = async () => {
        try {
            const { data } = await axios.get('/api/auth/is-auth');
            if (data.success) {
                setUser(data.user); // ✅ FIXED: Update state too
                localStorage.setItem('user', JSON.stringify(data.user));
            }
        } catch (err) {
            console.error("Something wrong with fetchUser:", err);
        }
    };

    const fetchAllProduct = async () => {
        try {
            const res = await axios.get("/api/products/all");
            setProduct(res.data);
        } catch (err) {
            console.error("Failed to fetch products:", err);
        }
    };

    const fetchProductById = useCallback(async (id) => {
        try {
            const res = await axios.get(`/api/products/${id}`);
            return res.data;
        } catch (error) {
            console.error('Error fetching product:', error);
        }
    }, []);

    useEffect(() => {
        fetchUser();
        fetchAllProduct();
    }, []);

    const value = {
        axios,
        user,
        token,
        setToken,
        setUser,
        product,
        setProduct,
        fetchAllProduct,
        fetchProductById,
        selectedProductId,
        setSelectedProductId
    };

    return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => useContext(AppContext);
