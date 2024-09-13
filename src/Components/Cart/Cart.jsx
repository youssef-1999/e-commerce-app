import axios from 'axios';
import { useEffect, useState } from 'react';
import Loading from '../Loading/Loading';
import CartProduct from '../CartProduct/CartProduct';
import { Link } from 'react-router-dom';

function Cart() {
  const [cartData, setCartData] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);


  async function getProductsFromCart() {
    try {
      const { data } = await axios.get("https://ecommerce.routemisr.com/api/v1/cart", {
        headers: {
          token: localStorage.getItem("token"),
        },
      });
     setCartData(data)
      console.log(data.numOfCartItems);
    } catch (error) {
      console.error("Failed to fetch cart data", error);
    }
  }

  async function removeProductItem(productId)
  {
    
    let {data}=await axios.delete("https://ecommerce.routemisr.com/api/v1/cart/"+productId,{
      headers:{
        token:localStorage.getItem("token")
        }
        })
    console.log(data);

    let cartDataCopy=JSON.parse(JSON.stringify(cartData))
    console.log(cartDataCopy);
    let newProducts=cartDataCopy.data.products.filter((product)=>
    {
      return product.product._id != productId
    })
    
    cartDataCopy.data.products=newProducts
    setCartData(cartDataCopy)
  }

async function updateProductCount(productId,productCount){
  if(productCount==0)
    {
      removeProductItem(productId)
    }
    else
    {

      let {data}=await axios.put("https://ecommerce.routemisr.com/api/v1/cart/"+productId,{count:productCount},
        {
          headers:{
            token:localStorage.getItem("token")
          }
        }
      )
      setCartData(data)
      console.log(data);
    }
}




  async function clearCart()
  {
    let {data}=await axios.delete("https://ecommerce.routemisr.com/api/v1/cart",{
      headers:{
        token:localStorage.getItem("token")
      }
    })
    console.log(data);
    setCartData(undefined)
  }

  useEffect(() => {
    getProductsFromCart();
  }, []);

  return (
    <>
      <div>
        {isLoading ? (
          <Loading />
        ) : (
          <>
            {cartData?.data.products.length > 0 ? (
              <div>
                <button
                  onClick={clearCart}
                  className="block ms-auto text-red-600 mb-8 border border-red-700 mx-2 p-1 rounded"
                >
                  Clear cart
                </button>
                {cartData.data.products.map((product, index) => (
                 <CartProduct product={product} updateProductCount={updateProductCount} key={index} removeProductItem={removeProductItem} />
                ))}
                <div className='flex justify-between items-center mt-4'>
                <Link to={`/address/${cartData?.data._id}`}  className='bg-green-600 p-2 rounded text-white'>
                  CheckOut
                </Link>
                <div>

                <p>TotalAmount:</p>
                <p>{cartData?.data.totalCartPrice}EGP</p>
                </div>
                </div>
              </div>
            ) : (
              <h1 className="text-center text-red-500 font-bold">No products in the cart</h1>
            )}
          </>
        )}
      </div>
    </>
  );
}

export default Cart;
