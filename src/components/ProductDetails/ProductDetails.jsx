import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { ImSpinner8 } from 'react-icons/im';
import { Link } from "react-router-dom";
import { CartContext } from "../Context/CartContext";

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isRelatedLoading, setIsRelatedLoading] = useState(true);
  const { addToCart } = useContext(CartContext);

  async function addToCartFun(productId) {
    let response = await addToCart(productId);
  }

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await axios.get(
          `https://ecommerce.routemisr.com/api/v1/products/${id}`
        );
        setProduct(data.data);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load product");
      } finally {
        loading(false);
      }
    };

    fetchProduct();
  }, [id]);

  useEffect(() => {
    const fetchRelatedProducts = async () => {
      if (!product) return;
      setIsRelatedLoading(true);
      try {
        const { data } = await axios.get(
          `https://ecommerce.routemisr.com/api/v1/products`
        );
        const filteredProducts = data.data.filter(
          (p) =>
            p.category.name === product.category.name && p._id !== product._id
        );
        setRelatedProducts(filteredProducts);
      } catch (err) {
        console.error("Error fetching related products:", err);
      } finally {
        setIsRelatedLoading(false);
      }
    };

    fetchRelatedProducts();
  }, [product]);

    if (loading) {
      return (
        <div className="min-h-screen flex items-center justify-center">
          <ImSpinner8 className="animate-spin text-4xl text-main" />
        </div>
      );
    }

  if (error) {
    return (
      <div className="container mx-auto mt-20 text-center p-8 bg-red-50 rounded-lg">
        <h2 className="text-2xl text-red-600 mb-4">Error loading product</h2>
        <p className="text-gray-600">{error}</p>
        <button
          className="mt-4 bg-main text-white px-6 py-2 rounded hover:bg-main-dark transition"
          onClick={() => window.location.reload()}
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <>
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="flex flex-col md:flex-row gap-8 lg:gap-12">
          <div className="md:w-1/2 lg:w-1/3 bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
            <img
              src={product?.imageCover}
              alt={product?.title}
              className="w-full h-64 md:h-96 object-contain transition-transform duration-300 hover:scale-105"
            />
          </div>

          <div className="md:w-1/2 lg:w-2/3 space-y-6">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                {product?.title}
              </h1>
              <p className="text-sm text-main font-semibold mb-4">
                {product?.category?.name}
              </p>
            </div>

            <p className="text-gray-600 text-base md:text-lg leading-relaxed">
              {product?.description}
            </p>

            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between bg-gray-50 p-4 rounded-lg gap-4">
              <div className="space-y-2">
                <span className="text-2xl md:text-3xl font-bold text-gray-900">
                  {product?.price} EGP
                </span>
              </div>

              <div className="flex items-center gap-2">
                <div className="flex">
                  {product?.ratingsAverage}
                  <i className="rating-color fa fa-star"></i>
                </div>
                <span className="text-gray-600 text-sm">
                  ({product?.ratingsQuantity} reviews)
                </span>
              </div>
            </div>

            <button
              onClick={() => addToCartFun(product._id)}
              className="w-full bg-main hover:bg-main-dark text-white font-semibold py-3 px-6 rounded-lg
                     transition-all duration-200 transform hover:scale-[1.02] active:scale-95"
            >
              Add to Cart
            </button>
            <div className="mt-8 space-y-4">
              <div className="border-t pt-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Product Details
                </h3>
                <dl className="grid grid-cols-2 gap-4">
                  <div className="col-span-2 sm:col-span-1">
                    <dt className="text-sm text-gray-500">Brand</dt>
                    <dd className="text-gray-700">
                      {product?.brand?.name || "N/A"}
                    </dd>
                  </div>
                  <div className="col-span-2 sm:col-span-1">
                    <dt className="text-sm text-gray-500">Stock Available</dt>
                    <dd className="text-gray-700">{product?.quantity}</dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto mt-20 px-4">
        <h2 className="text-2xl font-bold text-gray-900 mb-8">
          Related Products
        </h2>

        {isRelatedLoading ? (
          <div className="flex justify-center">
            ${loading}
          </div>
        ) : relatedProducts.length === 0 ? (
          <p className="text-gray-600 text-center">
            No related products found.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {relatedProducts.map((product) => (
              <div
                key={product._id}
                className="bg-white p-4 rounded-xl shadow-md hover:shadow-lg transition-shadow"
              >
                <Link to={`/productdetails/${product._id}`}>
                  <img
                    src={product.imageCover}
                    className="w-full h-48 object-contain mb-4"
                    alt={product.title}
                  />
                  <h3 className="text-main text-sm font-semibold">
                    {product.category.name}
                  </h3>
                  <p className="text-gray-900 font-medium mt-2">
                    {product.title.split(" ").slice(0, 2).join(" ")}
                  </p>
                  <div className="flex justify-between items-center mt-2">
                    <p className="text-gray-900">
                      {product.price.toLocaleString()} EGP
                    </p>
                    <div className="flex items-center">
                      <i className="fas fa-star text-yellow-500 mr-1"></i>
                      <span className="text-sm">
                        {product.ratingsAverage.toFixed(1)}
                      </span>
                    </div>
                  </div>
                </Link>
                <button
                  onClick={() => addToCartFun(product._id)}
                  className="w-full bg-main hover:bg-main-dark text-white font-semibold py-2 px-4 rounded-lg mt-4 transition-colors"
                >
                  Add To Cart
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
