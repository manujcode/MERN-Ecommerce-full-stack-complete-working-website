import "./App.css";
import HomePage from "./pages/homePage";
import { useEffect } from "react";
import * as React from "react";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Login from "./features/auth/component/login";
import Signup from "./features/auth/component/signup";
import CartPage from "./pages/CartPage";
import Checkout from "./features/checkout/checkout";
import ProductDetail from "./pages/prodictDetails"
import Protected from "./features/auth/component/Protected";
import { useDispatch, useSelector } from "react-redux";
import { fetchItemByUserIdAsyc } from "./features/Cart/cartSlice";
import { selectLoggedInUser } from "./features/auth/authSlice";
import PageNotFound from "./pages/404";
import OrderSuccessful from "./pages/orderSuccessful";
import UserOrderPage from "./pages/userOrderPage.js"
import ProfilePage from "./pages/profilepage.js";
import { fetchLoggedInUserAsyc } from "./features/user/userSlice.js";
import LogOut from "./features/auth/component/logOut.js";
import ForgetPasswordPage from "./pages/forgetPasswordPage.js";
import AdminHome from "./pages/AdminProductPage.js";
import AdminProtected from "./features/auth/component/ProtectedAdmin.js";
import AdminProductDedails from "./features/admin /components/AdmimProductDetails.js";
import ProductFormpage from "./pages/ProductFormPage.js";
import AdminOrdersPage from "./pages/AdminOrderPage.js";
import AlertTemplate from "react-alert-template-basic";
// import AlertTemplate from "react-alet"
import { positions, Provider } from "react-alert";

const router = createBrowserRouter([
  {
    path: "/",
    element:<Protected> <HomePage></HomePage></Protected> ,
  },
  {
    path: "/admin",
    element:<AdminProtected><AdminHome></AdminHome></AdminProtected> ,
  },
  {
    path: "/admin/order",
    element:<AdminProtected><AdminOrdersPage></AdminOrdersPage></AdminProtected> ,
  },
  { 
    path: "/login",
    element: <Login></Login>,
  },
  { 
    path: "/admin/product-form",
    element: <AdminProtected><ProductFormpage></ProductFormpage></AdminProtected>,
  },
  { 
    path: "/admin/product-form/edit/:id",
    element: <AdminProtected><ProductFormpage></ProductFormpage></AdminProtected>,
  },
  {
    path: "/signup",
    element: <Signup></Signup>,
  },
  {
    path: "/cart",
    element: <Protected><CartPage></CartPage></Protected>,
  },
  {
    path: "/checkout",
    element:<Protected><Checkout></Checkout></Protected> ,
  },
  {
    path: "/productDetail/:id",
    element:<Protected><ProductDetail></ProductDetail></Protected> ,
  },
  {
    path: "/productDetail/:id",
    element:<AdminProtected><AdminProductDedails></AdminProductDedails></AdminProtected> ,
  },
  {
    path: "/orders",
    element:<Protected><UserOrderPage></UserOrderPage></Protected> ,
  },
  {
    path: "/profile",
    element:<Protected><ProfilePage></ProfilePage></Protected> ,
  },
  {
    path: "/orderSuccessful/:id",
    element: <OrderSuccessful></OrderSuccessful> ,
  },
  {
    path: "/logout",
    element: <LogOut></LogOut> ,
  },
  {
    path: "/forgetPassword",
    element: <ForgetPasswordPage></ForgetPasswordPage> ,
  },
  {
    path: "*",
    element:<PageNotFound></PageNotFound> ,
  },
   

]);
const options = {
  timeout: 5000,
  position: positions.BOTTOM_LEFT
};
function App() {
  const user =useSelector(selectLoggedInUser)
 const dispatch =useDispatch()
 
   useEffect(()=>{
    if(user){
      dispatch(fetchItemByUserIdAsyc(user.id))
      dispatch(fetchLoggedInUserAsyc(user.id))
    }
    
   },[dispatch,user])
  return (
    <div className="App">
    <Provider template={AlertTemplate} {...options}>
      <RouterProvider router={router} />
      </Provider>
    </div>
  );
}

export default App;



