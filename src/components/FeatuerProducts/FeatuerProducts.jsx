import React, { useEffect, useState } from 'react'
import axios from "axios";
import Loader from '../Loader/Loader';


export default function FeatuerProducts() {

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  async function getProducts() {
    try {
      const response = await axios.get('https://ecommerce.routemisr.com/api/v1/products');
      console.log(response);
      setProducts(response.data.data);
      setLoading(false)
    } catch (err) {
      console.log(err);
      setLoading(false)
    }
  }

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <>
      <div className="container mx-auto">
        {loading? <Loader/> :         <div className="flex flex-wrap">
          {products.map((product) => (
            <div key={product._id} className="sm:w-full md:w-1/4 lg:w-1/6">
              <div className="product px-2 py-3">
                <img src={product.imageCover} className="w-[200px] h-[250px]" alt="" />
                <h3 className='text-main text-sm'>{product.category.name}</h3>
                <p>{product.title}</p>
                <div className="flex justify-between align-center">
                  <div>{product.price} EGP</div>
                  <div>
                    <i className="rating-color fa fa-star"></i>
                    {product.ratingsAverage}
                  </div>
                </div>
                <div>
                  <button className='btn bg-main w-full rounded-lg text-white px-3 py-2'>Add To Cart</button>
                </div>
              </div>
            </div>
          ))}
        </div>}

      </div>
    </>
  );
}
