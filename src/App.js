import Home from "./Components/Home";
import Navbar from "./Components/Navbar";
import SignIn from "./Components/SignIn";
import SignUp from "./Components/SignUp";
import { createBrowserRouter, RouterProvider} from "react-router-dom";
import CustomUserContext from "./CustomUserContext";
import CartPage from "./Components/CartPage";
import Orders from "./Components/Orders";
import { useState, useEffect } from "react";
import { ToastContainer, toast } from 'react-toastify';


function App() {
  
  const router = createBrowserRouter([
    {path: "/", element: <Navbar/>, children:[
      {index: true, element: <Home/>},
      {path: "signin", element: <SignIn/>},
      {path: "signup", element: <SignUp/>},
      {path: "userCarts/:user_id/myCart", element: <CartPage/>},
      {path: "userOrders/:user_id/orders", element: <Orders/>}

    ]}
  ])



  return (
    <>
    <CustomUserContext>
      <ToastContainer/>
      <RouterProvider router={router}/>
    </CustomUserContext>
    </>
  );
}

export default App;
