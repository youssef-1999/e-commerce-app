import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Slider from "react-slick";
import Loading from '../Loading/Loading';

function SliderCategories() {
  let [category, setCategory] = useState([])

  async function getAllCategories() {
    let { data } = await axios.get("https://ecommerce.routemisr.com/api/v1/categories", {
      headers: {
        token: localStorage.getItem("token")
      }
    })
    setCategory(data.data)
  }

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 3,
    responsive: [
      {
        breakpoint: 1024, // large screens
        settings: {
          slidesToShow: 4,
          slidesToScroll: 2,
        }
      },
      {
        breakpoint: 768, // medium screens
        settings: {
          slidesToShow: 3,
          slidesToScroll: 2,
        }
      },
      {
        breakpoint: 640, // small screens
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 480, // extra small screens
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        }
      }
    ]
  };

  useEffect(() => {
    getAllCategories()
  }, [])

  return (
    <div className="px-4 py-8">
      {
        category.length === 0 ? (
          <Loading />
        ) : (
          <Slider {...settings}>
            {category.map((product) => {
              return (
                <div key={product._id} className='mb-8 px-2'>
                  <img src={product.image} className='w-40 h-40 mx-auto' alt={product.name} />
                  <p className='text-center mt-2'>{product.name}</p>
                </div>
              );
            })}
          </Slider>
        )
      }
    </div>
  )
}

export default SliderCategories
