import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '@fortawesome/fontawesome-free/css/all.min.css'; 
import { ImSpinner8 } from 'react-icons/im';

export default function BrandsPage() {
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);

  async function getBrands() {
    try {
      const response = await axios.get('https://ecommerce.routemisr.com/api/v1/brands');
      console.log(response.data.data); 
      setBrands(response.data.data); 
      setLoading(false);

    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  }

  useEffect(() => {
    getBrands();
  }, []);
    if (loading) {
      return (
        <div className="min-h-screen flex items-center justify-center">
          <ImSpinner8 className="animate-spin text-6xl text-main" />
        </div>
      );
    }

  return (
    <div className="container mx-auto p-4">
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
    </div>
  );
}