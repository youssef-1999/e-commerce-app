import axios from 'axios'
import { useFormik } from 'formik'
import  { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import * as yup from 'yup'

function RegisterPage() {
    const [isLoading,setIsLoading]=useState(false)
    const [errorMessage,setErrorMessage]=useState("")
    const navigate=useNavigate()

    const validationSchema=yup.object({
        name: yup.string().min(3, 'Require at least 3 letters').max(20, 'At most 20 letters required').required('Name is required'),
    email: yup.string().email('Invalid email format').matches(/^[a-zA-Z0-9]+@(gmail|yahoo|hotmail)\.(com)$/, 'Email must be from gmail, yahoo, or hotmail').required('Email is required'),
    password: yup.string().matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, 'Password must be at least 8 characters long and contain at least one letter and one number').required('Password is required'),
    rePassword: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match').required('Confirm password is required'),
    phone: yup.string().matches(/^01[0-9]{9}$/, 'Phone number is invalid').required('Phone number is required')
    })

    function onSubmit()

    {   setIsLoading(true)
        setErrorMessage("")
        console.log("hi");
        console.log(formik.values);
        axios.post('https://ecommerce.routemisr.com/api/v1/auth/signup',formik.values)
        .then((reponse)=>
        {
            console.log(reponse.data.message);
            setIsLoading(false)
            navigate('/login')
            
        })
        .catch((err)=>{
            console.log(err.response.data.message);
            setIsLoading(false)
            setErrorMessage(err.response.data.message)
        })
    }

    const formik=useFormik({
        initialValues:{
            name:'',
            email:'',
            phone:'',
            password:'',
            rePassword:'',
        },
        validationSchema,
        onSubmit
        
    })
  return (
    
<>
<h1 className='mx-auto mb-6 text-center '>Regsiter Page</h1>
<form onSubmit={formik.handleSubmit} className="max-w-md mx-auto">
  <div className="grid md:grid-cols-2 md:gap-6">
    <div className="relative z-0 w-full mb-5 group">
        <input type="text" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.name} name="name" id="Name" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" "  />
        <label htmlFor="Name" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Name</label>
        { formik.errors.name && formik.touched.name &&  <p className="bg-red-500 p-1 my-1 rounded-md text-white">{formik.errors.name}</p>     }
    </div>
   
  </div>
  <div className="relative z-0 w-full mb-5 group">
      <input type="email" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.email} name="email" id="email" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" "  />
      <label htmlFor="floating_email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email address</label>
      { formik.errors.email && formik.touched.email &&  <p className="bg-red-500 p-1 my-1 rounded-md text-white">{formik.errors.email}</p>     }

  </div>
  <div className="relative z-0 w-full mb-5 group">
      <input type="password" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.password} name="password" id="password" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" "  />
      <label htmlFor="floating_password" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Password</label>
      { formik.errors.password && formik.touched.password &&  <p className="bg-red-500 p-1 my-1 rounded-md text-white">{formik.errors.password}</p>     }

  </div>
  <div className="relative z-0 w-full mb-5 group">
      <input type="password" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.rePassword} name="rePassword" id="rePassword" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" "  />
      <label htmlFor="rePassword" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Confirm password</label>
      { formik.errors.rePassword && formik.touched.rePassword &&  <p className="bg-red-500 p-1 my-1 rounded-md text-white">{formik.errors.rePassword}</p>     }

  </div>
  <div className="grid md:grid-cols-2 md:gap-6">
    <div className="relative z-0 w-full mb-5 group">
        <input type="tel" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.phone}  name="phone" id="floating_phone" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" "  />
        <label htmlFor="floating_phone" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Phone number (123-456-7890)</label>
        { formik.errors.phone && formik.touched.phone &&  <p className="bg-red-500 p-1 my-1 rounded-md text-white">{formik.errors.phone}</p>     }

    </div>
    {errorMessage && <p className='bg-red-500 p-1 my-1 rounded-md text-white'>{errorMessage}</p>}
   
  </div>
  <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
    {isLoading ? <i className='fa fa-spin fa-spinner mx-3'></i> 
  : <span>Submit</span> }
  
    </button>
</form>
</>

  )
}

export default RegisterPage
