import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Product from '../Product/Product';
import Loading from '../Loading/Loading';
import SliderCategories from '../Categories/SliderCategories';
import SubCategoryDetails from '../Categories/SubCategoryDetaiils';

function Home() {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    async function getProducts() {
        try {
            const { data } = await axios.get('https://ecommerce.routemisr.com/api/v1/products');
            console.log(data.data);
            setProducts(data.data);
            setFilteredProducts(data.data);
        } catch (error) {
            console.error('Error fetching products:', error);
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        getProducts();
    }, []);

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        if (searchTerm) {
            const searchResult = products.filter(product => 
                product.title.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setFilteredProducts(searchResult);
        } else {
            setFilteredProducts(products);
        }
    };

    if (isLoading) {
        return <Loading />;
    }

    return (
        <React.Fragment>
            <SubCategoryDetails/>
            <SliderCategories />
            <form className="max-w-md mx-auto" onSubmit={handleSearchSubmit}>
                <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                <div className="relative">
                    <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                        <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                        </svg>
                    </div>
                    <input
                        type="search"
                        id="default-search"
                        className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Search For Product"
                        value={searchTerm}
                        onChange={handleSearchChange}
                    />
                    <button type="submit" className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
                </div>
            </form>
            <div className='grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4'>
                {filteredProducts.length === 0 ? (
                    <div className='bg-red-200 p-4 mt-9 '>
                        <h1 className='text-center text-white'>No Products Found with this name</h1>
                    </div>
                ) : (
                    filteredProducts.map((product, index) => (
                        <Product product={product} key={index} />
                    ))
                )}
            </div>
        </React.Fragment>
    );
}

export default Home;
