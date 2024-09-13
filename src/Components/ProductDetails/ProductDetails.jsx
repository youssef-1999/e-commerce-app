import axios from 'axios';
import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import Loading from '../Loading/Loading';
import RelatedProducts from '../RelatedProducts/RelatedProducts';
import { toast } from 'react-toastify';
import { CartContext } from '../../Context/CartContext';


const ProductDetails = () => {
  const [image, setImage] = useState(0); // Initialize to 0 to start with the first image
  let { id, categoryId } = useParams();
  let [productDetails, setProductDetails] = useState(null);
  let [relatedProducts, setRelatedProducts] = useState([]);
  
  let [isLoading, setIsLoading] = useState(false);
  const { setCountData } = useContext(CartContext)

  

  

   async function  getProductsByCategory(categoryId) {
      const { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/products?category[in][]=${categoryId}`);
      setRelatedProducts(data.data);

    
  }


  async function addProductsToCart() {
    setIsLoading(true);
    
      let { data } = await axios.post('https://ecommerce.routemisr.com/api/v1/cart/', { productId:id }, {
        headers: {
          token: localStorage.getItem("token")
        }
      });
      console.log(data);
      setCountData(data.numOfCartItems)
      setIsLoading(false);
    
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
  }

  async function getProductsDetails (id) {
      const {data} = await axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`);
      console.log("product= ", data.data); // Debugging
      setProductDetails(data.data);
 
  }

  useEffect(() => {
      getProductsByCategory(categoryId);
    
      getProductsDetails(id);
    
  }, []);

  if (!productDetails) {
    return <div><Loading/></div>;
  }

  const images = [productDetails.imageCover, ...productDetails.images];

  return (
    <div className="py-1">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
        <div className="flex flex-col md:flex-row -mx-4">
          <div className="md:flex-1 px-4">
            <div>
              <div className="h-64 md:h-80 rounded-lg bg-gray-100 mb-4 flex items-center justify-center">
                <img src={images[image]} alt={`Product ${image}`} className="h-full w-full object-cover rounded-lg" />
              </div>

              <div className="flex -mx-2 mb-4">
                {images.map((img, index) => (
                  <div key={index} className="flex-1 px-2">
                    <button
                      onClick={() => setImage(index)}
                      className={`focus:outline-none w-full rounded-lg h-24 md:h-32 bg-gray-100 flex items-center justify-center ${image === index ? 'ring-2 ring-inset' : ''}`}
                    >
                      <img src={img} alt={`Thumbnail ${index}`} className="h-full w-full object-cover rounded-lg" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="md:flex-1 px-4">
            <h2 className="mb-2 leading-tight tracking-tight font-bold text-gray-800 text-2xl md:text-3xl">
              {productDetails.title}
            </h2>

            <div className="flex items-center space-x-4 my-4">
              <div>
                <div className="rounded-lg bg-gray-100 flex py-2 px-3">
                  <span className="text-indigo-400 mr-1 mt-1">$</span>
                  <span className="font-bold text-indigo-600 text-3xl">{productDetails.price}</span>
                </div>
              </div>
              <div className="flex-1">
                <p className="text-green-500 text-xl font-semibold">Save 12%</p>
                <p className="text-gray-400 text-sm">Inclusive of all Taxes.</p>
              </div>
            </div>
            <p><i className='fa fa-star text-orange-500'></i> {productDetails.ratingsAverage}</p>

            <p className="text-gray-500">
              {productDetails.description}
            </p>

            <div className="flex py-4 space-x-4">
              <button disabled={isLoading} onClick={addProductsToCart} type="button" className="h-14 px-6 py-2 font-semibold rounded-xl w-full bg-indigo-600 hover:bg-indigo-500 text-white">
                {isLoading?  <i className="fa fa-spin fa-spinner"></i>:  <span>Add to Cart</span> }
              </button>
            </div>
          </div>
        </div>

        
        {relatedProducts.length > 0 && (
          <RelatedProducts relatedProducts={relatedProducts} />
        )}
      </div>
    </div>
  );
};

export default ProductDetails;
