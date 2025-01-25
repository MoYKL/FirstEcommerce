import React from 'react';
import { createHashRouter, RouterProvider } from 'react-router-dom'; // Use createHashRouter
import '@fortawesome/fontawesome-free/css/all.min.css';
import './App.css';
import Layout from './components/Layout/Layout';
import Home from './components/Home/Home';
import Products from './components/Products/Products';
import Brands from './components/Brands/Brands';
import Cart from './components/Cart/Cart';
import Categories from './components/Categories/Categories';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import NotFound from './components/NotFound/NotFound';
import ProtectedRoutes from './components/ProtectedRoutes/ProtectedRoutes';

function App() {
  const routes = createHashRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        { index: true, element: <ProtectedRoutes><Home /></ProtectedRoutes>  },
        { path: "products", element: <ProtectedRoutes><Products /></ProtectedRoutes>  },
        { path: "brands", element: <ProtectedRoutes><Brands /></ProtectedRoutes> },
        { path: "cart", element: <ProtectedRoutes><Cart /></ProtectedRoutes> },
        { path: "Categories", element: <ProtectedRoutes><Categories /></ProtectedRoutes> },
        { path: "login", element: <Login /> },
        { path: "register", element: <Register /> },
        { path: "*", element: <NotFound /> },
      ],
    },
  ]);

  return (
    <RouterProvider router={routes} />
  );
}

export default App;
