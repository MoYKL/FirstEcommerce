import { useFormik } from "formik";
import React, { useContext, useEffect, useState } from "react";
import { CartContext } from "../Context/CartContext";
import { FiAlertCircle, FiCreditCard, FiMapPin, FiPhone } from "react-icons/fi";
import { Navigate, useLocation } from "react-router";

export default function Checkout() {
  const { onlinePayment, cashPayment } = useContext(CartContext);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { state } = useLocation();
  const [paymentType, setPaymentType] = useState(null);
  console.log(state.paymentType);

  const formik = useFormik({
    initialValues: {
      details: "",
      phone: "",
      city: "",
    },
    onSubmit: (values) => {
      payOnline(values);
    },
  });
  async function payOnline(values) {
    if (state.paymentType == "online") {
      await onlinePayment(values);
    } else {
      await cashPayment(values);
    }
  }

  useEffect(() => {
    setPaymentType(state.paymentType);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden p-8">
        <form onSubmit={formik.handleSubmit} className="space-y-6">
          <div className="text-center">
            <FiCreditCard className="mx-auto h-12 w-12 text-blue-600" />
            <h2 className="mt-4 text-3xl font-bold text-gray-900">
              Checkout Information
            </h2>

            <h3 className="mt-4 text-2xl font-bold text-gray-900">
              Payment is {paymentType}
            </h3>

            <p className="mt-2 font-bold text-gray-600">
              Please enter your payment details
            </p>
          </div>

          {formik.status?.error && (
            <div className="flex items-center p-4 bg-red-50 text-red-700 rounded-lg">
              <FiAlertCircle className="w-5 h-5 mr-2" />
              {formik.status.error}
            </div>
          )}

          <div className="space-y-4">
            <div>
              <label
                htmlFor="details"
                className="block text-sm font-medium text-gray-700"
              >
                Shipping Details
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiMapPin className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  name="details"
                  type="text"
                  id="details"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.details}
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="123 Main St"
                />
              </div>
              {formik.touched.details && formik.errors.details && (
                <p className="mt-2 text-sm text-red-600 flex items-center">
                  <FiAlertCircle className="w-4 h-4 mr-1" />
                  {formik.errors.details}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-gray-700"
              >
                Phone Number
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiPhone className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  name="phone"
                  type="tel"
                  id="phone"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.phone}
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="+20 123 456 7899"
                />
              </div>
              {formik.touched.phone && formik.errors.phone && (
                <p className="mt-2 text-sm text-red-600 flex items-center">
                  <FiAlertCircle className="w-4 h-4 mr-1" />
                  {formik.errors.phone}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="city"
                className="block text-sm font-medium text-gray-700"
              >
                City
              </label>
              <input
                name="city"
                type="text"
                id="city"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.city}
                className="block w-full mt-1 py-3 px-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Cairo"
              />
              {formik.touched.city && formik.errors.city && (
                <p className="mt-2 text-sm text-red-600 flex items-center">
                  <FiAlertCircle className="w-4 h-4 mr-1" />
                  {formik.errors.city}
                </p>
              )}
            </div>
          </div>

          <button
            type="submit"
            disabled={!(formik.isValid && formik.dirty) || isSubmitting}
            className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Complete Payment
          </button>
        </form>
      </div>
    </div>
  );
}
