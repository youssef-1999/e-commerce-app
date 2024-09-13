import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { CartContext } from "../../Context/CartContext";
import style from './Product.module.css';
import { wishlistContext } from "../../Context/WishListContext";
import { useQuery } from "react-query";

function Product({ product }) {
  const [isLoading, setIsLoading] = useState(false);
  const [cartData, setCartData] = useState([]);
  const [inWishlist, setInWishlist] = useState(false);
  const { setCountData } = useContext(CartContext);
  const { setWishlist } = useContext(wishlistContext);

  async function addToWishlist(productId) {
    try {
      let { data } = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/wishlist`,
        { productId },
        {
          headers: {
            token: localStorage.getItem("token"), // Ensure the token is correctly set
          },
        }
      );
      console.log(data.data);
      setWishlist(data.data);
    } catch (error) {
      console.error("Error adding to wishlist", error);
    }
  }

  async function addProductsToCart() {
    setIsLoading(true);
    try {
      let { data } = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/cart/",
        { productId: product._id },
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );
      console.log(data);
      setCartData(data);
      setCountData(data.numOfCartItems);
      toast.success(data.message, {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } catch (error) {
      console.error("Error adding product to cart", error);
      toast.error("Failed to add product to cart", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } finally {
      setIsLoading(false);
    }
  }

  const handleWishlistClick = () => {
    setInWishlist(!inWishlist); // Toggle wishlist status
    addToWishlist(product._id); // Call context function to add to wishlist
  };

  return (
    <div>
      <div className={`${style.product_card} test p-3`}>
        <img src={product.imageCover} alt="image" className="w-full" />
        <h4 className="text-green-600">{product.category.name}</h4>
        <Link to={`/productDetails/${product.id}/${product.category._id}`}>
          <h3 className="font-bold">
            {product.title.split(" ").splice(0, 2).join(" ")}
          </h3>
        </Link>
        <div className="flex justify-between">
          <p>{product.price}</p>
          <p>
            <i className="fa fa-star text-orange-500"></i> {product.ratingsAverage}
          </p>
        </div>
        <button 
          onClick={handleWishlistClick} 
          className="text-right mb-9"
          style={{ color: inWishlist ? 'red' : 'black' }} // Place the style attribute correctly
        >
          <i className="fa-solid fa-heart cursor-pointer"></i>
        </button>
        <button
          disabled={isLoading}
          onClick={addProductsToCart}
          className={`${style.product_button} bg-green-400 text-center text-white rounded p-2 w-full`}
        >
          {isLoading ? <i className="fa fa-spin fa-spinner"></i> : <span> Add to cart</span>}
        </button>
      </div>
    </div>
  );
}

export default Product;
