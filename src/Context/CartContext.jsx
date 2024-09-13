import axios from "axios";
import { createContext, useEffect, useState } from "react";

export let CartContext=createContext(0)


export default function CartContextProvider({children})
{
    let [countData,setCountData]=useState(0)
    let [wishList,setWishlist]=useState([])
    let [setIsLoading]=useState(false)
    async function getProductsFromCart() {
        try {
          const { data } = await axios.get("https://ecommerce.routemisr.com/api/v1/cart", {
            headers: {
              token: localStorage.getItem("token"),
            },
          });
         setCountData(data.numOfCartItems)
          console.log(data.numOfCartItems);
        } catch (error) {
          console.error("Failed to fetch cart data", error);
        }
      }
      async function addToWishlist() {
        try {
            setIsLoading(true)
          let { data } = await axios.get(
            `https://ecommerce.routemisr.com/api/v1/wishlist`,
           
            {
              headers: {
                token: localStorage.getItem("token"), // Ensure the token is correctly set
              },
            }
          );
          console.log("wishlist",data.data);
          setWishlist(data.data);
        } catch (error) {
          console.error("Error adding to wishlist", error);
        }

       
      }

      useEffect( ()=>{
        getProductsFromCart(),
        addToWishlist()
      },[]  )
    return <CartContext.Provider value={{countData,setCountData,addToWishlist}}>
        {children}
    </CartContext.Provider>
}