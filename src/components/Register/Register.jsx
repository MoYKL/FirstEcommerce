import React, { useState } from "react";
import styles from "./Register.module.css";
import logo from "./../../assets/freshcart-logo.svg";
import { ErrorMessage, useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom"
export default function Register() {
  const [userMessage, setuserMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [Loader, setLoader] = useState(false);
  let navigate = useNavigate()


  let mySchema = Yup.object({
    name: Yup.string()
      .required("name is req")
      .min(3, "not less than 3 chars")
      .max(18, " Not larger Than 18 Chars"),
    email: Yup.string().required("Email is Required").email("Not valid Email"),
    password: Yup.string().required("Password is Required").matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        "Not valid Password At least 8 characters,  Include a mix of uppercase letters, lowercase letters, digits, and special characters. "
      ),
    rePassword: Yup.string()
      .required("Rewrite the Password")
      .oneOf([Yup.ref("password")]),
    phone: Yup.string()
      .required("Phone is Required")
      .matches(
        /^(002)?01[0125][0-9]{8}$/,
        "Not valid Phone Number, We support only Egyptian Phone Numbers"
      ),
  });

  let formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
    validationSchema: mySchema,
    onSubmit: (values) => {
      registerForm(values);
    },
  });

  async function registerForm(values){
    setLoader(true)
    return await axios
    .post("https://ecommerce.routemisr.com/api/v1/auth/signup", values)
    .then((data)=>{
    console.log(data.data.message);
    setuserMessage(data.data.message);
    setLoader(false);
    navigate("/login")
  })
  .catch((err)=>{
    console.log(err.response.data.message);
    setErrorMessage(err.response.data.message);
    setLoader(false)
  });
  }


  return (
    <>
      <div className="font-[sans-serif]">
        <div className="min-h-screen flex flex-col items-center justify-center p-6">
          <div className="grid lg:grid-cols-2 items-center gap-6 max-w-6xl max-lg:max-w-lg w-full">
            <form onSubmit={formik.handleSubmit} className="lg:max-w-md w-full">
              <h3 className="text-gray-800 text-2xl font-bold mb-8">
                Create an account
              </h3>

              {userMessage ? (<div className="p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400" role="alert"
              > 
              <p>{userMessage}</p>
              </div>
               ) : null}
               {errorMessage ? (<div className="p-4 mb-4 text-sm text-yellow-800 rounded-lg bg-yellow-50 dark:bg-gray-800 dark:text-yellow-300" role="alert">
               <p>{errorMessage}</p></div>
               ) : null} 


              <div className="space-y-6">
                <div>
                  <label
                    htmlFor="name"
                    className="text-gray-800 text-sm mb-2 block"
                  >
                    Name
                  </label>
                  <input
                    name="name"
                    type="text"
                    id="name"
                    onChange={formik.handleChange}
                    value={formik.values.name}
                    onBlur={formik.handleBlur}
                    className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-3 focus:bg-transparent border border-gray-100 focus:border-black outline-none transition-all"
                    placeholder="Enter name"
                  />
                  {formik.touched.name && formik.errors.name? (
                    <div
                      className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                      role="alert"
                    >
                      <p>{formik.errors.name}</p>
                    </div>
                  ) : null}
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="text-gray-800 text-sm mb-2 block"
                  >
                    Email
                  </label>
                  <input
                    name="email"
                    type="email"
                    id="email"
                    onChange={formik.handleChange}
                    value={formik.values.email}
                    onBlur={formik.handleBlur}
                    className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-3 focus:bg-transparent border border-gray-100 focus:border-black outline-none transition-all"
                    placeholder="Enter email"
                  />
                  { formik.touched.email && formik.errors.email? (
                    <div
                      className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                      role="alert"
                    >
                      <p>{formik.errors.email}</p>
                    </div>
                  ) : null}
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="text-gray-800 text-sm mb-2 block"
                  >
                    Password
                  </label>
                  <input
                    name="password"
                    type="password"
                    id="password"
                    onChange={formik.handleChange}
                    value={formik.values.password}
                    onBlur={formik.handleBlur}
                    className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-3 focus:bg-transparent border border-gray-100 focus:border-black outline-none transition-all"
                    placeholder="Enter password"
                  />
                    {formik.touched.password && formik.errors.password? (
                    <div
                      className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                      role="alert"
                    >
                      <p>{formik.errors.password}</p>
                    </div>
                  ) : null}
                </div>
                <div>
                  <label
                    htmlFor="rePassword"
                    className="text-gray-800 text-sm mb-2 block"
                  >
                    RePassword
                  </label>
                  <input
                    name="rePassword"
                    type="password"
                    id="rePassword"
                    onChange={formik.handleChange}
                    value={formik.values.rePassword}
                    onBlur={formik.handleBlur}
                    className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-3 focus:bg-transparent border border-gray-100 focus:border-black outline-none transition-all"
                    placeholder="Enter password"
                  />
                    {formik.touched.rePassword && formik.errors.rePassword? (
                    <div
                      className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                      role="alert"
                    >
                      <p>{formik.errors.rePassword}</p>
                    </div>
                  ) : null}
                </div>
                <div>
                  <label
                    htmlFor="phone"
                    className="text-gray-800 text-sm mb-2 block"
                  >
                    Phone
                  </label>
                  <input
                    name="phone"
                    type="tel"
                    id="phone"
                    onChange={formik.handleChange}
                    value={formik.values.phone}
                    onBlur={formik.handleBlur}
                    className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-3 focus:bg-transparent border border-gray-100 focus:border-black outline-none transition-all"
                    placeholder="Enter Your Phone Number"
                  />
                    {formik.touched.phone && formik.errors.phone ? (
                    <div
                      className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                      role="alert"
                    >
                      <p>{formik.errors.phone}</p>
                    </div>
                  ) : null}
                </div>
              </div>

              <div className="mt-6">
                {Loader ? <button
                  type="submit"
                  className="py-3 px-6 text-sm text-white tracking-wide bg-main rounded-lg focus:outline-none"
                >
                  <i className="fa fa-spinner fa-spin"></i>
                </button> : <button
                disabled={!(formik.isValid && formik.dirty)}
                  type="submit"
                  className="py-3 px-6 text-sm text-white tracking-wide bg-main rounded-lg focus:outline-none"
                >
                  Register
                </button>}
                

              </div>
              <p className="text-sm text-gray-800 mt-6">
                Already have an account?
                <a
                  href="login"
                  className="text-blue-600 font-semibold hover:underline ml-1"
                >
                  Login here
                </a>
              </p>
            </form>

            <div className="h-full">
              <img
                src={logo}
                className="w-full h-full object-contain aspect-[628/516]"
                alt="login img"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
