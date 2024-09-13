import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import Loading from '../Loading/Loading';
import { toast } from 'react-toastify';
import { CartContext } from '../../Context/CartContext';
import style from '../../Components/Product/Product.module.css';

function WishList() {
  const [wishlist, setWishlist] = useState([]);
  const [isWishlistLoading, setIsWishlistLoading] = useState(false);
  const [isCartLoading, setIsCartLoading] = useState(false);
  const { setCountData } = useContext(CartContext);
  const [cartData,setCartData] = useState([]);

  const [hasId,setHasId]=useState(false)

  async function addProductsToCart(productId) {
    setIsCartLoading(true);
    setHasId(productId)
    try {
      const { data } = await axios.post(
        'https://ecommerce.routemisr.com/api/v1/cart/',
        { productId },
        {
          headers: {
            token: localStorage.getItem('token'),
          },
        }
      );
      console.log(data);
      setCartData(data.data);
      console.log(setCartData(data.data));
      setCountData(data.numOfCartItems);
      removeFromWishList(productId)
      toast.success(data.message, {
        position: 'top-right',
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
    } catch (error) {
      console.error('Error adding product to cart', error);
      toast.error('Failed to add product to cart', {
        position: 'top-right',
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
    } finally {
      setIsCartLoading(false);
    }
  }

  async function fetchWishlist() {
    setIsWishlistLoading(true);
    try {
      const { data } = await axios.get('https://ecommerce.routemisr.com/api/v1/wishlist', {
        headers: {
          token: localStorage.getItem('token'),
        },
      });
      console.log('wishlist', data.data);
      setWishlist(data.data);
    } catch (error) {
      console.error('Error fetching wishlist', error);
    } finally {
      setIsWishlistLoading(false);
    }
  }

  async function removeFromWishList(productId) {
    try {
      const { data } = await axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`, {
        headers: {
          token: localStorage.getItem('token'),
        },
      });
      console.log(data.data);

      const updatedWishlist = wishlist.filter((product) => product._id !== productId);
      setWishlist(updatedWishlist);
    } catch (error) {
      console.error('Error removing from wishlist', error);
    }
  }

  useEffect(() => {
    fetchWishlist();
  }, []);

  return (
    <div>
      <h1 className='text-center text-lg text-green-400'>Wishlist</h1>
      {wishlist.length === 0 && <h1 className='text-center my-4 text-red-600 text-xl'>Wishlist is empty</h1>}

      {isWishlistLoading ? (
        <Loading /> // Assuming you have a Loading component to show while data is being fetched
      ) : (
        wishlist?.map((product) => (
          <div className="flex shadow justify-between items-center" key={product._id}>
            <div className="flex items-center">
              <img src={product.imageCover} alt={product.title} className="w-40" />
              <div className="ms-3">
                <p className="font-bold">{product.title}</p>
                <p className="text-green-500">{product.category.name}</p>
                <p>{product.price} EGP</p>
                <p>
                  <i className="fa fa-star text-yellow-400"></i> {product.ratingsAverage}
                </p>
                <button
                  className='text-red-500 mx-1 block mt-9 mb-4'
                  onClick={() => removeFromWishList(product._id)}
                >
<i className="fa-solid fa-trash"></i>
                  Remove
                </button>
              </div>
            </div>
            <div>
              <button
                onClick={() => addProductsToCart(product._id)} // Pass the correct productId here
                className={`bg-green-400 text-center text-white rounded mt-5 p-2 w-full`}
                disabled={isCartLoading}
              >
                {hasId===product._id ? <i className='fa fa-spin fa-spinner'></i> : <span>Add to cart</span>}
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default WishList;
