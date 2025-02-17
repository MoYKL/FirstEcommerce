import React, { useContext, useEffect, useState } from "react";
import { CartContext } from "../Context/CartContext";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";
import { FiTrash2, FiPlus, FiMinus, FiCreditCard, FiPackage } from "react-icons/fi";
import { ImSpinner8 } from 'react-icons/im';


export default function Cart() {
  const { getCart, removeItem, updateQuantity } = useContext(CartContext);
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const [paymentMethod, setPaymentMethod] = useState("cash");



  async function getCartFun() {
    try {
      const { data } = await getCart();
      console.log(data);
      
      setCart(data);
    } catch (error) {
      toast.error("Failed to load cart");
    } finally {
      setLoading(false);
    }
  }

  async function handleRemove(productId) {
    try {
      await removeItem(productId);
      await getCartFun();
      toast.success("Product removed from cart");
    } catch (error) {
      toast.error("Failed to remove product");
    }
  }

  async function handleQuantityChange(productId, count) {
    try {
      await updateQuantity(productId, count);
      await getCartFun();
    } catch (error) {
      toast.error("Failed to update quantity");
    }
  }

  useEffect(() => {
    getCartFun();
  }, []);

    if (loading) {
      return (
        <div className="min-h-screen flex items-center justify-center">
          <ImSpinner8 className="animate-spin text-4xl text-main" />
        </div>
      );
    }

  if (!cart?.numOfCartItems) {
    return (
      <div className="text-center py-8">
        <h2 className="text-2xl mb-4">Your cart is empty</h2>
        <Link
          to="/products"
          className="bg-main text-white px-6 py-2 rounded hover:bg-main-dark transition-colors"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>

      <div className="grid gap-6">
        {cart?.data?.products?.map((item) => (
          <div
            key={item.product._id}
            className="bg-white p-6 rounded-lg shadow-md flex flex-col sm:flex-row gap-6 items-center"
          >
            <img
              src={item.product.imageCover}
              alt={item.product.title}
              className="w-32 h-32 object-contain"
            />

            <div className="flex-1">
              <h3 className="text-xl font-semibold">{item.product.title}</h3>
              <p className="text-gray-600 mt-2">{item.product.category?.name}</p>
              <p className="text-main font-bold mt-2">{item.price} EGP</p>

              <div className="flex items-center gap-4 mt-4">
                <button
                  onClick={() => handleQuantityChange(item.product._id, item.count - 1)}
                  disabled={item.count === 1}
                  className="px-3 py-1 bg-gray-100 rounded disabled:opacity-50 hover:bg-gray-200 transition-colors"
                >
                  <FiMinus />
                </button>
                <span className="w-8 text-center">{item.count}</span>
                <button
                  onClick={() => handleQuantityChange(item.product._id, item.count + 1)}
                  className="px-3 py-1 bg-gray-100 rounded hover:bg-gray-200 transition-colors"
                >
                  <FiPlus />
                </button>
              </div>
            </div>

            <button
              onClick={() => handleRemove(item.product._id)}
              className="text-red-600 hover:text-red-800 transition-colors"
            >
              <FiTrash2 className="w-6 h-6" />
            </button>
          </div>
        ))}
      </div>

      <div className="mt-8 p-6 bg-gray-50 rounded-lg">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-semibold">Total Price:</h3>
          <span className="text-main font-bold text-xl">
            {cart?.data?.totalCartPrice} EGP
          </span>
        </div>

        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-4">Select Payment Method</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button
  onClick={() => setPaymentMethod("cash")}
  className={`p-4 rounded-xl border-2 cursor-pointer transform transition-all duration-150 
    ${
      paymentMethod === "cash"
        ? "border-main bg-main/10 shadow-sm"
        : "border-gray-200 hover:border-main hover:shadow-md"
    } 
    active:scale-95 focus:outline-none focus:ring-2 focus:ring-main/50`}
>
  <div className="flex items-center gap-3">
    <FiPackage className={`w-6 h-6 ${
      paymentMethod === "cash" ? "text-main" : "text-gray-600"
    }`} />
    <div className="text-left">
      <h4 className={`font-semibold ${
        paymentMethod === "cash" ? "text-main" : "text-gray-800"
      }`}>
        Cash on Delivery
      </h4>
      <p className="text-sm text-gray-600">
        Pay when you receive your order
      </p>
    </div>
  </div>
</button>

<button
  onClick={() => setPaymentMethod("online")}
  className={`p-4 rounded-xl border-2 cursor-pointer transform transition-all duration-150 
    ${
      paymentMethod === "online"
        ? "border-main bg-main/10 shadow-sm"
        : "border-gray-200 hover:border-main hover:shadow-md"
    } 
    active:scale-95 focus:outline-none focus:ring-2 focus:ring-main/50`}
>
  <div className="flex items-center gap-3">
    <FiCreditCard className={`w-6 h-6 ${
      paymentMethod === "online" ? "text-main" : "text-gray-600"
    }`} />
    <div className="text-left">
      <h4 className={`font-semibold ${
        paymentMethod === "online" ? "text-main" : "text-gray-800"
      }`}>
        Online Payment
      </h4>
      <p className="text-sm text-gray-600">
        Secure credit/debit card payment
      </p>
    </div>
  </div>
</button>
          </div>
        </div>

        <Link
          to="/checkout"
          state={{ paymentType: paymentMethod }}
          className="block w-full bg-main text-white text-center py-3 rounded-lg hover:bg-main-dark transition-colors font-semibold"
        >
          Proceed to Checkout
        </Link>
      </div>
    </div>
  );
}