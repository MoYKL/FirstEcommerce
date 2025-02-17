import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { CartContext } from '../Context/CartContext'; 
import { 
  FiPackage, 
  FiCreditCard, 
  FiDollarSign, 
  FiUser, 
  FiCalendar,
  FiAlertCircle
} from 'react-icons/fi';
import { ImSpinner8 } from 'react-icons/im';
import { Link } from 'react-router-dom';

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { getCart } = useContext(CartContext); 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const cartResponse = await getCart();
        const userId = cartResponse.data.data.cartOwner;
        const ordersResponse = await axios.get(
          `https://ecommerce.routemisr.com/api/v1/orders/user/${userId}`
        );

        setOrders(ordersResponse.data);
        setError(null);
      } catch (err) {
        if (err.response) {
          setError(err.response.data.message || 'Server error occurred');
        } else if (err.request) {
          setError('Network error - please check your connection');
        } else {
          setError('Error fetching orders');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [getCart]);
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <ImSpinner8 className="animate-spin text-6xl text-main" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <div className="max-w-md text-center bg-red-50 p-6 rounded-lg">
          <FiAlertCircle className="text-red-600 text-4xl mx-auto mb-4" />
          <h2 className="text-xl text-red-800 mb-4">{error}</h2>
          <button
            onClick={() => window.location.reload()}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (!orders.length) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <FiPackage className="text-6xl text-gray-400 mb-4" />
        <h2 className="text-2xl text-gray-800 mb-2">No Orders Found</h2>
        <p className="text-gray-600 mb-6">You haven't placed any orders yet</p>
        <Link
          to="/products"
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Browse Products
        </Link>
      </div>
    );
  }

  return (
   <div className="text-main">
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8 flex items-center gap-3">
          <FiPackage className="text-main" />
          Order History
        </h1>

        <div className="space-y-6">
          {orders.map((order) => (
            <div 
              key={order._id}
              className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow"
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-gray-700">
                    <FiUser className="text-main" />
                    <span className="font-medium">
                      {order.user?.name || 'Guest User'}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-500">
                    <FiCalendar className="text-main" />
                    <span>
                      {new Date(order.createdAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </span>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    {order.paymentMethodType === 'card' ? (
                      <>
                        <FiCreditCard className="text-main" />
                        <span className="font-medium">Card Payment</span>
                      </>
                    ) : (
                      <>
                        <FiDollarSign className="text-main" />
                        <span className="font-medium">Cash on Delivery</span>
                      </>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total Items:</span>
                    <span className="font-medium">{order.cartItems.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total Price:</span>
                    <span className="font-medium text-main">
                      EGP {order.totalOrderPrice.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>

              <div className="border-t pt-6">
                <h3 className="text-lg font-medium mb-4">Products</h3>
                <div className="space-y-4">
                  {order.cartItems.map((item) => (
                    <div 
                      key={item._id}
                      className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg"
                    >
                      <img
                        src={item.product.imageCover}
                        alt={item.product.title}
                        className="w-20 h-20 object-contain rounded-lg"
                      />
                      <div className="flex-1">
                        <h4 className="font-medium">{item.product.title}</h4>
                        <p className="text-gray-600 text-sm">
                          Quantity: {item.count}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">
                           {(item.price * item.count).toFixed(2)} EGP
                        </p>
                        <p className="text-sm text-gray-600">
                          {item.price.toFixed(2)} each
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
    </div>
  );
}