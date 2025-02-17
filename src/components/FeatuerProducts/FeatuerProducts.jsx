import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";
import { CartContext } from "../Context/CartContext";


export default function FeatuerProducts() {
  const  {addToCart} = useContext(CartContext);
async function addToCartFun(productId) {
  let response = await addToCart(productId);
  
}

  function getFeatureProducts() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/products");
  }

  let { data, isError, isFetching,error } = useQuery({
    queryKey: ["featuredProducts"],
    queryFn: getFeatureProducts,
  });

  return (
    <>
      <div className="container mx-auto">
        {isError? <p>{error.message}</p>:null}
 
          <div className="flex flex-wrap">
            {data?.data?.data.map((product) => (
              <div key={product._id} className="sm:w-full md:w-1/2 lg:w-1/4">
                <div className="product px-2 py-3">
                <Link to={`/productdetails/${product.id}`}>
                <img
                    src={product.imageCover}
                    className="w-[200px] h-[250px]"
                    alt=""
                  />
                  <h3 className="text-main text-sm">{product.category.name}</h3>
                  <p>{product.title.split(" ").splice(0,2).join(" ")}</p>
                  <div className="flex justify-between align-center">
                    <p>{product.price} EGP</p>
                    <div>
                      <i className="rating-color fa fa-star"></i>
                      {product.ratingsAverage}
                    </div>
                  </div>
                </Link>
                  <div>
                    <button onClick={()=>addToCartFun(product._id)} className="btn bg-main w-full rounded-lg text-white px-3 py-2">
                      Add To Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
      </div>
    </>
  );
}