import { useParams } from 'react-router-dom'
import { useFormik } from "formik";
import { useState } from "react";
import * as Yup from 'yup'
import axios from 'axios';

function Address() {
    let {cartId}=useParams()
    console.log(cartId);

    let [isLoading,setIsLoading]=useState(false)
    let [errorMessage,setErrorMessage]=useState("")
  
    const validationSchema = Yup.object({
      address: Yup.string()
        .min(20, "Address length must be more than 20 letters")
        .max(60, "Address length must be less than 60 letters")
        .matches((/^[a-zA-Z]{20,}$/))
        .required("Address is required"),
        city: Yup.string()
        .matches((/^[a-zA-Z]{5,14}$/))
        .required("City is required"),
      
      phone: Yup.string()
        .matches(/^(002)?01[0125][0-9]{8}$/, "enter a valid egyptain phone number")
        .required("Phone number is required")
    });
    
  
    const formik=useFormik({
      initialValues: {
        city: '',
        details:'',
        phone:''
      },
      onSubmit,
      validationSchema
    })
  
    function onSubmit()
    {
      setErrorMessage("")
      setIsLoading(true)
      console.log(formik.values);
      checkout(formik.values)
   
    }
  
  
  async  function checkout(address)
    {
      setErrorMessage("")
      setIsLoading(true)
     
        const { data } = await axios.post(
          `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}`,
          {
            shippingAddress: address
          },
          {
            params: {
              url: "http://localhost:5137"
            },
            headers: {
              token: localStorage.getItem("token")
            }
          }
        );
        console.log('Checkout session:', data);
        window.open(data.session.url,"_self")
      } 
    
  return (
    <div>
       <div className=" p-5 rounded-md bg-slate-300">
      <h1 className="mb-7 text-2xl">Adress</h1>
      
<form onSubmit={formik.handleSubmit}>
    <div className=" mb-6 ">
            <label htmlFor="city" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"> city</label>
            <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.city} name='city' type="text" id="city" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Details"  />
            { formik.errors.city && formik.touched.city &&  <p className="bg-red-500 p-1 my-1 rounded-md text-white">{formik.errors.city}</p>     }
 </div>
    <div className=" mb-6 ">
            <label htmlFor="address" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"> address</label>
            <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.address} name='address' type="text" id="address" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Cairo"  />
            { formik.errors.address && formik.touched.address &&  <p className="bg-red-500 p-1 my-1 rounded-md text-white">{formik.errors.address}</p>     }
 </div>

   
        <div className=" mb-6 ">
            <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Phone number</label>
            <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.phone} name='phone' type="tel" id="phone" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="123-45-678"   />
            {formik.errors.phone && formik.touched.phone &&  <p className="bg-red-500 p-1 my-1 rounded-md text-white">{formik.errors.phone}</p>     }

        </div>
        
       
       
    
   
    <button type="submit" disabled={isLoading} className="text-white ms-auto block bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"> 
    {isLoading ?<i className="fa fa-spinner fa-spin mx-3"></i>
   : <span>Checkout</span> }
    </button>
</form>

    </div>
    </div>
  )
}

export default Address
