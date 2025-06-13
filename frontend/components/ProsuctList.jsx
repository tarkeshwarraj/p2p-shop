'use client'
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProductCard from './ProductCard';

const ProductList = ({filters}) => {
    const [products, setProducts] = useState([]);

    useEffect(()=>{
        const fetchProducts = async () =>{
            try{
                const response = await axios.get('/api/products/all', {params: filters});
                setProducts(response.data);
            }catch(error) {
                console.error('Error fetching products:', error);
            }
        };
        fetchProducts();
    },[filters]);

    return (
        <div className='p-6 space-y-4 w-full max-w-4xl'>
            {products.length > 0 ? (
                products.map((product) =>(
                <ProductCard key={product._id} product={product}/>
                ))
            ):(
                <p className="text-gray-600">No product found.</p>
            )}
        </div>
    );
};

export default ProductList;