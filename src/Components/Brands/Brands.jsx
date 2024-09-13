import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PopUpBrands from './PopUpBrands';
import Loading from '../Loading/Loading';

function Brands() {
  const [brands, setBrands] = useState([]);
  const [selectedBrandId, setSelectedBrandId] = useState(null);
  const [isOpen, setIsOpen] = useState(false); // Control popup visibility

  useEffect(() => {
    async function fetchBrands() {
      try {
        const { data } = await axios.get('https://ecommerce.routemisr.com/api/v1/brands');
        setBrands(data.data);
      } catch (error) {
        console.error("Error fetching brands:", error);
      }
    }
    fetchBrands();
  }, []);

  const handleBrandClick = (brandId) => {
    setSelectedBrandId(brandId);
    setIsOpen(true);
  };

  if (!brands.length) {
    return <div className="text-center"><Loading /></div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold mb-4 text-green-400 text-center">All Brands</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {brands.map(brand => (
          <div
            key={brand.id}
            className="p-4 border rounded cursor-pointer hover:shadow-md hover:shadow-green-500 transition-all "
            onClick={() => handleBrandClick(brand._id)}
          >
            <img src={brand.image} alt={brand.name} className="w-full h-40  rounded" />
            <h2 className="text-lg font-semibold mt-2 text-center">{brand.name}</h2>
          </div>
        ))}
      </div>
      {isOpen && <PopUpBrands brandId={selectedBrandId} setIsOpen={setIsOpen} />}
    </div>
  );
}

export default Brands;
