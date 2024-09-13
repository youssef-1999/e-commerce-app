import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Loading from '../Loading/Loading';

function PopUpBrands({brandId,setIsOpen}) {
  const [specificBrand, setSpecificBrand] = useState(null); // Initialize as null for a single object
  const [isOpen] = useState(false); // Control popup visibility

  async function getSpecificBrand(brandId) {
    try {
      const { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/brands/${brandId}`);
      setSpecificBrand(data.data);
      console.log("specific brand= ", data.data);
    } catch (error) {
      console.error("Error fetching brand data:", error);
    }
  }

  useEffect(() => {
    getSpecificBrand(brandId);
  }, [brandId]);

  if (!specificBrand) {
    return <div className="text-center"><Loading /></div>;
  }

  return (
    <>
      {!isOpen && (
        <div id="info-popup" tabIndex="-1" className="fixed inset-0 z-50 flex items-center justify-center w-full h-full overflow-y-auto overflow-x-hidden bg-gray-800 bg-opacity-50">
          <div className="relative p-4 w-full max-w-lg h-full md:h-auto">
            <div className="relative p-4 bg-white rounded-lg shadow dark:bg-gray-800 md:p-8">
              <div className="mb-4 flex justify-between items-center text-sm font-light text-gray-500 dark:text-gray-400">
                <div>
                  <h2 className="text-xl font-semibold text-green-500 dark:text-white mb-4">{specificBrand.name}</h2>
                </div>
                <div>
                  <img src={specificBrand.image} alt={specificBrand.name} className="w-full h-auto rounded" />
                </div>
              </div>
              <div className="flex justify-between items-center pt-0 space-y-4 sm:flex sm:space-y-0">
                <button
                  id="close-modal"
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="py-2 px-4 w-full text-sm font-medium text-gray-500 bg-white rounded-lg border border-gray-200 sm:w-auto hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-primary-300 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default PopUpBrands;
