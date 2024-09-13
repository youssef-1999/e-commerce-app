import axios from "axios";
import { useFormik } from "formik";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from 'yup'


function Register() {

  let [isLoading,setIsLoading]=useState(false)
  let [errorMessage,setErrorMessage]=useState("")
  const navigate=useNavigate()

  const validationSchema = Yup.object({
    name: Yup.string()
      .min(3, "Name length must be more than 3 letters")
      .max(20, "Name length must be less than 20 letters")
      .required("Name is required"),
      email: Yup.string()
      .matches((/^[a-zA-Z0-9]+@[(gmail|yahoo|hotmail)]+\.(com)$/))
      .required("Email is required"),
    password: Yup.string()
      .matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, "Password must be at least 8 characters long and contain at least one letter and one number")
      .required("Password is required"),
    rePassword: Yup.string()
      .oneOf([Yup.ref('password')], 'Passwords must match')
      .required("Confirm Password is required"),
    phone: Yup.string()
      .matches(/^(002)?01[0125][0-9]{8}$/, "enter a valid egyptain phone number")
      .required("Phone number is required")
  });
  

  const formik=useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      rePassword: '',
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
    axios.post('https://ecommerce.routemisr.com/api/v1/auth/signup',formik.values)
    .then((response)=>
    {
      console.log(response.data.message);
    setIsLoading(false)
    navigate('/login')
    
  })
  .catch((err)=>
    {
      console.log(err.response.data.message);
      setErrorMessage(err.response.data.message)
    setIsLoading(false)

    })
  }
  return (
    <div className=" p-5 rounded-md bg-slate-300">
      <h1 className="mb-7 text-2xl">Register</h1>
      
<form onSubmit={formik.handleSubmit}>
    <div className=" mb-6 ">
            <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"> Name</label>
            <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.name} name='name' type="text" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="John"  />
            { formik.errors.name && formik.touched.name &&  <p className="bg-red-500 p-1 my-1 rounded-md text-white">{formik.errors.name}</p>     }
 </div>

    <div className="mb-6">
        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email address</label>
        <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.email} name='email' type="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="john.doe@company.com"  />
        {formik.errors.email && formik.touched.email &&  <p className="bg-red-500 p-1 my-1 rounded-md text-white">{formik.errors.email}</p>     }

    </div> 
        <div className=" mb-6 ">
            <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Phone number</label>
            <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.phone} name='phone' type="tel" id="phone" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="123-45-678"   />
            {formik.errors.phone && formik.touched.phone &&  <p className="bg-red-500 p-1 my-1 rounded-md text-white">{formik.errors.phone}</p>     }

        </div>
        
       
       
    <div className="mb-6">
        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
        <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.password} name='password' type="password" id="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="•••••••••"  />
        {formik.errors.password && formik.touched.password &&  <p className="bg-red-500 p-1 my-1 rounded-md text-white">{formik.errors.password}</p>     }

    </div> 
    <div className="mb-6">
        <label htmlFor="confirm_password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm password</label>
        <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.rePassword} name='rePassword' type="password" id="confirm_password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="•••••••••"  />
        {formik.errors.rePassword && formik.touched.rePassword &&  <p className="bg-red-500 p-1 my-1 rounded-md text-white">{formik.errors.rePassword}</p>     }

    </div> 
       {errorMessage && <div className="mt-4">
        <p className="bg-red-500 p-1 my-1  rounded-md text-white">{errorMessage}</p>

        </div>}
    <div className="flex items-start mb-6">
        <div className="flex items-center h-5">
        <input  id="remember" type="checkbox" value="" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800"  />
        </div>
        <label htmlFor="remember" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">I agree with the <a href="#" className="text-blue-600 hover:underline dark:text-blue-500">terms and conditions</a>.</label>

    </div>
    <button type="submit" disabled={isLoading} className="text-white ms-auto block bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"> 
    {isLoading ?<i className="fa fa-spinner fa-spin mx-3"></i>
   : <span>submit</span> }
    </button>
</form>

    </div>
  )
}

export default Register
