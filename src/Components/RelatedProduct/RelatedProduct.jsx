import React from 'react'
import { Link } from 'react-router-dom'

function RelatedProduct({product}) {
  return (
    <div key={product.id} className="bg-white shadow-md rounded-lg p-4  ">
          <img src={product.imageCover} alt={product.title} className="h-40 w-full object-cover rounded-lg mb-2" />
          <Link to={`/productDetails/${product.id}/${product.category._id}`}>
          <h4 className="text-lg font-semibold">{product.title}</h4>
          </Link>
          <p className="text-gray-600">${product.price}</p>
          <button className='bg-blue-400 text-center text-white rounded p-2 w-full'>Add to cart</button>

        </div>
  )
}

export default RelatedProduct
