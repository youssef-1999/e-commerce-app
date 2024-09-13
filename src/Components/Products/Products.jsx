import axios from 'axios';
import React from 'react';
import Product from '../Product/Product';
import Loading from '../Loading/Loading';
import { useQuery } from 'react-query';

async function getProducts() {
    const { data } = await axios.get('https://ecommerce.routemisr.com/api/v1/products');
    return data.data;  // Return the products directly
}

function Home() {
    const { data: products, isLoading, isError, error } = useQuery('products', getProducts);

    if (isLoading) {
        return <Loading />;
    }

    if (isError) {
        return <div>Error fetching products: {error.message}</div>;
    }

    return (
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4'>
            {products.map((product, index) => (
                <Product product={product} key={index} />
            ))}
        </div>
    );
}

export default Home;
