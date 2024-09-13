import axios from 'axios';
import React, { useEffect, useState } from 'react';

function SubCategoryDetails({ subId }) {
  const [subcategories, setSubCategories] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  async function getAllSubCategoriesOnCategory(subId) {
    try {
      const { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/categories/${subId}/subcategories`, {
        headers: {
          token: localStorage.getItem('token'),
        },
      });
      console.log('API response:', data.data);
      setSubCategories("sub",data.data);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching subcategories:', err);
      console.log(err.response);
      setError('Failed to fetch subcategories. Please try again later.');
      setLoading(false);
    }
  }

  useEffect(() => {
    if (subId) {
      getAllSubCategoriesOnCategory(subId);
    }
  }, [subId]);

  return (
    <div>
      <h1>SubCategory Details</h1>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : subcategories.length > 0 ? (
        subcategories.map((subcategory) => (
          <div key={subcategory._id}>
           <h1>{subcategory.name}</h1>
          </div>
        ))
      ) : (
        <p>No subcategories found.</p>
      )}
    </div>
  );
}

export default SubCategoryDetails;
