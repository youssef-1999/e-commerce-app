import axios from 'axios';
import React from 'react';
import Product from '../Product/Product';
import Loading from '../Loading/Loading';
import { useQuery } from 'react-query';

async function getProducts() {
    const { data } = await axios.get('https://ecommerce.routemisr.com/api/v1/categories');
    console.log("ads=",data.data);
    return data.data;  // Return the products directly
}

function ProductAds() {
    const { data: products, isLoading, isError, error } = useQuery('products', getProducts);

    if (isLoading) {
        return <Loading />;
    }

    if (isError) {
        return <div>Error fetching products: {error.message}</div>;
    }

    return (
        <div className='grid grid-cols-4 gap-4'>
            {products.map((product) => (
                <div key={product._id}>

                    <img src={product.image} alt="image" className="w-20" />
                </div>

            ))}
        </div>
    );
}

export default ProductAds;
