import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import PopUpBrands from '../Brands/PopUpBrands';

function BrandsDetails() {
   let {brandId}= useParams()
   let [brandData,setBrandData]=useState([])
    async function getSpecificBrand(brandId)
    {
        let {data}=await axios.get(`https://ecommerce.routemisr.com/api/v1/brands/${brandId}`)
        console.log(data.data); 
        setBrandData(data.data)
    }

    useEffect( ()=>
    {
        getSpecificBrand(brandId)
    } ,[] )
  return (
    <div>
        <PopUpBrands/>
      brand details
    </div>
  )
}

export default BrandsDetails
