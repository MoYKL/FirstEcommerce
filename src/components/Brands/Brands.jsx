import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '@fortawesome/fontawesome-free/css/all.min.css'; // Import FontAwesome CSS
import Loader from '../Loader/Loader'; // Import your Loader component

export default function BrandsPage() {
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch brands from the API
  async function getBrands() {
    try {
      const response = await axios.get('https://ecommerce.routemisr.com/api/v1/brands');
      console.log(response.data.data); // Check the API response
      setBrands(response.data.data); // Set brands in state
      setLoading(false); // Set loading to false
    } catch (err) {
      console.log(err);
      setLoading(false); // Set loading to false in case of error
    }
  }

  // Fetch brands on component mount
  useEffect(() => {
    getBrands();
  }, []);

  return (
    <div className="container mx-auto p-4">
      {loading ? (
        <Loader />
      ) : (
        <>
          <h1 className="text-3xl font-bold text-center my-8">Shop by Brand</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {brands.map((brand) => (
              <div
                key={brand._id}
                className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
              >
                <img
                  src={brand.image}
                  alt={brand.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h2 className="text-xl font-semibold text-gray-800 text-center">
                    {brand.name}
                  </h2>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}