import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Cart from "./Pages/Cart";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import "./App.css";
import Store from "./Pages/Store";
import Layout from "./components/Layout";
import Blog from "./Pages/Blog";
import Contact from "./Pages/Contact";
import CompareProduct from "./Pages/CompareProduct";
import Wishlist from "./Pages/Wishlist";
import ForgotPassword from "./Pages/ForgotPassword";
import ResetPassword from "./Pages/ResetPassword";
import SingleBlog from "./Pages/SingleBlog";
import PrivacyPolicy from "./Pages/PrivacyPolicy";
import RefundPolicy from "./Pages/RefundPolicy";
import TermsAndConditions from "./Pages/TermsAndConditions";
import ShippingPolicy from "./Pages/ShippingPolicy";
import SingleProduct from "./Pages/SingleProduct";
import Checkout from "./Pages/Checkout";
import Orders from "./Pages/Orders";
import { Profile } from "./Pages/Profile";


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <div className="pages">
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="cart" element={<Cart />} />
              <Route path="wishlist" element={<Wishlist />} />
              <Route path="login" element={<Login />} />
              <Route path="signup" element={<Signup />} />
              <Route path="products" element={<Store />} />
              <Route path="blogs" element={<Blog />} />
              <Route path="contact" element={<Contact />} />
              <Route path="profile" element={<Profile />} />
              <Route path="my-orders" element={<Orders />} />
              <Route path="compare-products" element={<CompareProduct />} />
              <Route path="forgot-password" element={<ForgotPassword />} />
              <Route path="reset-password/:token" element={<ResetPassword />} />
              <Route path="blog/id" element={<SingleBlog />} />
              <Route path="privacy-policy" element={<PrivacyPolicy />} />
              <Route path="refund-policy" element={<RefundPolicy/>} />
              <Route path="terms-and-conditions" element={<TermsAndConditions/>} />
              <Route path="shipping-policy" element={<ShippingPolicy />} />
              <Route path="products/:id"element={<SingleProduct />} />
              <Route path="checkout" element={<Checkout />} />
            </Route>
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
