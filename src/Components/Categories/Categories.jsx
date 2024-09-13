import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Loading from '../Loading/Loading';
import style from '../Product/Product.module.css';
import { Link } from 'react-router-dom';
import SubCategoryDetails from './SubCategoryDetaiils';
import { useDispatch, useSelector } from 'react-redux';
import { descrease, increase } from '../../Redux/CounterSlice';


function Categories() {
  const [category, setCategory] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  async function getAllCategories() {
    try {
      let { data } = await axios.get("https://ecommerce.routemisr.com/api/v1/categories", {
        headers: {
          token: localStorage.getItem("token")
        }
      });
      setCategory(data.data);
      console.log(data.data);
    } catch (error) {
      console.error("Error fetching categories", error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getAllCategories();
  }, []);

  const handleBrandClick = (brandId) => {
    setSelectedCategory(brandId);
  };
  let dispatch=useDispatch()
  // get all the values that stored inside state called counter
let {counter}=useSelector((state)=>
{
  return state.counter
})
console.log(counter);
  return (
    <div className="p-4">
      <h1>{counter}</h1>
      <button onClick={()=>dispatch(increase())}>+</button>
      <button onClick={()=>dispatch(descrease())}>-</button>
      <h1 className="text-2xl font-semibold mb-4 text-green-500 text-center">All Categories</h1>

      {isLoading ? (
        <div className="text-center">
          <Loading />
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {category.map((product) => (
            <div key={product._id} className="border border-black p-4 rounded hover:shadow-md hover:shadow-green-400">
              <img src={product.image} className="w-full h-40 object-cover rounded" alt={product.name} />
              <button onClick={() => handleBrandClick(product._id)} className="w-full ">
                <div className="bg-slate-200 p-1 rounded">
                  <p className="text-green-600 text-center">{product.name}</p>
                </div>
              </button>
            </div>
          ))}
        </div>
      )}
      {selectedCategory && <SubCategoryDetails subId={selectedCategory} />}
    </div>
  );
}

export default Categories;
