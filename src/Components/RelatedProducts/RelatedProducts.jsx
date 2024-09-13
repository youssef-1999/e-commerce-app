import Slider from 'react-slick'
import RelatedProduct from '../RelatedProduct/RelatedProduct';

function RelatedProducts({relatedProducts}) {

    var settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 2,
      };
  return (
    <div className="mt-8">
    <h3 className="text-2xl font-bold text-gray-800">Related Products</h3>
    <div className=" gy-4 mt-4  ">
    <Slider {...settings}>
      {relatedProducts.map(product => (
       <RelatedProduct product={product} key={product._id} />
      ))}
</Slider>
    </div>
  </div>
  )
}

export default RelatedProducts
