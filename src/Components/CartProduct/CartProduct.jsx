import React, { useState } from 'react'

function CartProduct({ product, removeProductItem, updateProductCount }) {
  let [count, setCount] = useState(product.count);

  return (
    <React.Fragment>
      <div className="flex flex-col sm:flex-row shadow justify-between p-4 mb-4">
        <div className="flex items-center mb-4 sm:mb-0">
          <img
            src={product.product.imageCover}
            alt={product.product.title}
            className="w-full sm:w-10 h-auto object-cover rounded-md"
          />
          <div className="ml-3 text-center sm:text-left">
            <p className="font-bold text-lg">{product.product.title}</p>
            <p className="text-green-500">{product.product.category.name}</p>
            <p>{product.price} EGP</p>
            <p>
              <i className="fa fa-star text-yellow-400"></i>{" "}
              {product.product.ratingsAverage}
            </p>
          </div>
        </div>
        <div className="flex flex-col items-center sm:items-end">
          <button
            onClick={() => removeProductItem(product.product._id)}
            className="text-red-600 mb-4 mt-4 sm:mt-0 sm:mb-9 block"
          >
            Remove item <i className="fa-solid fa-trash"></i>
          </button>
          <div className="flex items-center">
            <button 
              onClick={() => (updateProductCount(product.product._id, count - 1), setCount(count - 1))}
              className="mx-2 p-2 border rounded"
              disabled={count <= 1} // Disable button if count is less than or equal to 1
            >
              -
            </button>
            <span className="text-lg">{count}</span>
            <button 
              onClick={() => (updateProductCount(product.product._id, count + 1), setCount(count + 1))}
              className="mx-2 p-2 border rounded"
            >
              +
            </button>
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}

export default CartProduct;
