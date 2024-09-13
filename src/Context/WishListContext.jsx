import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export let wishlistContext = createContext();

export default function WishListProvider(props) {
  const [wishlist, setWishlist] = useState([]);
  let {productId}=useParams()

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

  useEffect(() => {
    // Initial data fetching or setup if needed
    addToWishlist(productId)
  }, []);

  return (
    <wishlistContext.Provider value={{ wishlist, setWishlist ,addToWishlist}}>
      {props.children}
    </wishlistContext.Provider>
  );
}
