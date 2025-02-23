import { createBrowserRouter, Navigate } from "react-router";

import Home from "@/pages/Home";
import About from "@/pages/About";
import Category from "@/pages/Category";
import Product from "@/pages/Product";
import Checkout from "@/pages/Checkout";
import Successfully from "@/pages/Successfully";
import Login from "@/pages/Auth/Login";
import Register from "@/pages/Auth/Register";
import NotFound from "@/pages/NotFound";
import ProtectedRoute from "./protected";
import AuthProtectedRoute from "./authProtected";

const router = createBrowserRouter([
  {
    path: "/*",
    children: [
      // AUTH ROUTES
      {
        element: <AuthProtectedRoute />,
        children: [
          {
            path: "auth",
            children: [
              {
                index: true,
                element: <Navigate to="/auth/login" replace />
              },
              {
                path: "login",
                element: <Login />
              },
              {
                path: "register",
                element: <Register />
              }
            ]
          },
        ]
      },

      // PUBLIC ROUTES
      {
        index: true,
        element: <Home />
      },
      {
        path: "about",
        element: <About />
      },
      {
        path: "category/:slug",
        element: <Category />
      },
      {
        path: "product/:slug",
        element: <Product />
      },

      // PROTECTED ROUTES
      {
        element: <ProtectedRoute />,
        children: [
          {
            path: "checkout/:slug",
            element: <Checkout />
          },
          {
            path: "success",
            element: <Successfully />
          },
        ]
      },

      // NOT FOUND ROUTE
      {
        path: "*",
        element: <NotFound />
      }
    ],
  },
]);

export default router;