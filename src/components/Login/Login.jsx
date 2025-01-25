import React, { useContext, useState } from "react";
import styles from './Login.module.css' 
import logo from "./../../assets/freshcart-logo.svg";
import { ErrorMessage, useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom"
import { TokenContext } from "../Context/TokenContext";
export default function Login() {
  let {token, setToken} =useContext(TokenContext);

    const [userMessage, setuserMessage] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);
    const [Loader, setLoader] = useState(false);
    let navigate = useNavigate()

      let mySchema = Yup.object({
        email: Yup.string().required("Email is Required").email("Not valid Email"),
        password: Yup.string()
        .required("Password is Required")
        .matches(/^[A-Z][a-z0-9]{3,8}$/,
            "Not valid Password it Must start with Capital Latter,Small letter and number Aa2 ")
      });
        let formik = useFormik({
          initialValues: {
            email: "",
            password: "",
          },
          validationSchema: mySchema,
          onSubmit: (values) => {
            loginForm(values);
          },
        });

        async function loginForm(values){
          setLoader(true)
          return await axios
          .post("https://ecommerce.routemisr.com/api/v1/auth/signin", values)
          .then((data)=>{
          localStorage.setItem("userToken",data.data.token)
          setToken(data.data.token)
          setuserMessage(data.data.message);
          setLoader(false);
          navigate("/")
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
                    LogIn
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
                      LogIn
                    </button>}
                    
    
                  </div>
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
  )
}
