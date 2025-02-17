import axios from "axios";
import { createContext, useState } from "react";
import toast from "react-hot-toast";

export let CartContext = createContext();

export default function CartContextProvider(props) {
  const headers = {
    token: localStorage.getItem("userToken"),
  };
  const [cartId ,setCartId] = useState(null)

  async function addToCart(productId) {
    try {
      const response = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/cart",
        { productId },
        { headers }
      );
      toast.success(response.data.message);
      setCartId(response.data.data._id)
      return response;
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to add to cart");
      throw err;
    }
  }

  async function getCart() {
    try {
      const response = await axios.get(
        "https://ecommerce.routemisr.com/api/v1/cart",
        { headers }
      );
      setCartId(response.data.data._id)
      return response;
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to fetch cart");
      throw err;
    }
  }

  async function removeItem(productId) {
    try {
      const response = await axios.delete(
        `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
        { headers }
      );
      toast.success("Product removed from cart");
      return response;
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to remove product");
      throw err;
    }
  }

  async function updateQuantity(productId, count) {
    try {
      const response = await axios.put(
        `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
        { count },
        { headers }
      );
      setCartId(response.data.data._id)
      return response;
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to update quantity");
      throw err;
    }
  }
  async function onlinePayment(shippingAddress) {
    try {
      const response = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:5173`,
        
        { shippingAddress },
        { headers }
      );
      console.log(response.data.session.url);
      window.location.href = response.data.session.url;
      
      return response;      
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to update quantity");
      throw err;
    }
  }
  async function cashPayment(shippingAddress) {
    try {
      const response = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/orders/${cartId}`,
        
        { shippingAddress },
        { headers }
      );
      window.location.href="http://localhost:5173/"
      return response;      
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to update quantity");
      throw err;
    }
  }


  return (
    <CartContext.Provider
      value={{ addToCart, getCart,onlinePayment,cashPayment, removeItem, updateQuantity }}
    >
      {props.children}
    </CartContext.Provider>
  );
}
