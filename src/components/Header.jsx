import React, { useEffect, useState } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { BsSearch } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { getProduct } from "../features/product/productSlice";
import { Typeahead } from "react-bootstrap-typeahead";
import "react-bootstrap-typeahead/css/Typeahead.css";
import { getAdapter } from "axios";
import { MdAccountCircle } from "react-icons/md";
import { PiShoppingCartFill } from "react-icons/pi";
import { IoCartOutline } from "react-icons/io5";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [sum, setSum] = useState(null);
  const [paginate, setPaginate] = useState(true);
  const cartState = useSelector((state) => state?.auth?.cart);
  const productState = useSelector((state) => state?.product?.product);
  const [productOpt, setProductOpt] = useState([]);
  const categoryState = useSelector((state) => state?.category?.categories);
  const authState = useSelector((state) => state?.auth?.user);

  useEffect(() => {
    let cartTotal = 0;
    for (let i = 0; i < cartState?.length; i++) {
      cartTotal += cartState[i].productId?.price * cartState[i].quantity;
    }
    setSum(cartTotal);
  }, [cartState]);

  useEffect(() => {
    let data = [];
    for (let i = 0; i < productState.length; i++) {
      const element = productState[i];
      data.push({ id: i, prod: element?._id, name: element?.title });
    }

    setProductOpt(data);
  }, [productState]);

  const handleLogout = () => {
    localStorage.clear();
    window.location.reload();
  };


  return (
    <>
      <div className="header-container">
        <div className="overlay">
          <div className="top-fixed">
              <header className="header-top-strip py-3">
                <div className="container-xxl">
                  <div className="row">
                    <div className="col-6">
                      <p className="text-white mb-0">
                        Free Shipping Over Rs. 100000 & Free Returns
                      </p>
                    </div>
                    <div className="col-6">
                      <p className="text-end text-white mb-0">
                        Hotline:
                        <a className="text-white" href="tel: (+94) 76 88 58 292">
                          (+94) 76 88 58 292
                        </a>
                      </p>
                    </div>
                  </div>
                </div>
              </header>
              <header className="header-upper py-1">
                <div className="container-xxl">
                  <div className="row header-upper-container">
                    {/* logo */}
                    <div className="col-2 logo-outer">
                      <h4 className="w-100">
                        <Link to="/" className="text-white ">
                          <img src="/images/header-logo.png" alt="Logo" className="main-logo img-fluid"/>
                        </Link>
                      </h4>
                    </div>
                    {/* Search bar */}
                    <div className="col-6 search-bar-wrapper">
                      <div className="d-flex search-bar-outer align-items-center gap-10">
                        <Typeahead
                            id="pagination-example"
                            onPaginate={() => console.log("Results paginated")}
                            onChange={(selected) => {
                              navigate(`/products/${selected[0]?.prod}`);
                              dispatch(getProduct(selected[0]?.prod));
                            }}
                            options={productOpt}
                            paginate={paginate}
                            minLength={2}
                            labelKey={"name"}
                            placeholder="Search for Products here...."
                            className="search-input no-border custom-typeahead"
                        />
                        <BsSearch
                            className="fs-4 text-dark search-icon"
                            style={{color: "#fff", marginRight: "5px"}}
                        />
                      </div>
                    </div>
                    {/*  Navigations wrapper*/}
                    <div className="col-4">
                      <div className="header-upper-links d-flex align-items-start mt-2 gap-30 justify-content-end">
                        {/* compare */}
                        <div className="compare">
                          <Link
                              to="compare-products"
                              className="d-flex align-items-center text-white"
                          >
                            <div
                                className="image-container d-flex flex-column align-items-center justify-content-center">
                              <img src="/images/compare.svg" alt="compare"/>
                              <span className="hover-text mt-2">Compare</span>
                            </div>
                          </Link>
                        </div>
                        {/* Wishlist */}
                        <div className="wishlist">
                          <Link
                              to="wishlist"
                              className="d-flex align-items-center gap-10 text-white"
                          >
                            <div
                                className="image-container d-flex flex-column align-items-center justify-content-center">
                              <img src="/images/wishlist.svg" alt="wishlist"/>
                              <span className="hover-text mt-2">WishList</span>
                            </div>
                          </Link>
                        </div>
                        {/* Cart */}
                        <div >
                          <Link
                              to="cart"
                              className="cart-container d-flex align-items-center text-white"
                          >
                            <div className="image-container ">
                              <IoCartOutline className="cart-icon"/>
                              <div className="cart-details">
                              <span className="cart-total">
                                {cartState ? cartState?.length : 0}
                              </span>
                                {/* <span className="hover-text">
                                Rs. {sum ? sum : 0}
                              </span> */}
                              </div>

                            </div>
                            <span>Cart</span>
                          </Link>
                        </div>
                        {/* Log in */}
                        <div
                            to="login"
                            className=" login d-flex align-items-center gap-10 text-white"
                        >
                          <div
                              className="image-container d-flex flex-column align-items-center justify-content-center">
                            <MdAccountCircle className=" fs-1"/>
                            <span className="hover-text">
                          {authState == null ? (
                              <Link className="text-white" to="/login">
                                Log in
                              </Link>
                          ) : (
                              <div className="dropdown">
                                <button
                                    className=" dropdown-btn btn btn-secondary  dropdown-toggle bg-transparent"
                                    type="button"
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false"
                                ></button>
                                <ul className="dropdown-menu">
                                  <li className="p-1 text-center text-dark">
                                    <Link className="nav-link" to="/profile">
                                      My Profile
                                    </Link>
                                  </li>
                                  <li className=" p-1 text-center text-dark">
                                    <Link className="nav-link" to="/my-orders">
                                      My Orders
                                    </Link>
                                  </li>
                                  <li className="p-1 text-center text-dark">
                                    <Link className="nav-link" onClick={handleLogout}>
                                      Log Out
                                    </Link>
                                  </li>
                                </ul>
                              </div>
                          )}
                        </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </header>
          </div>
          <header className="header-bottom py-1">
            <div className="container-xxl">
              <div className="row">
                <div className="col-12">
                  <div className="menu-bottom d-flex align-items-center gap-30">
                    <div className="dropdown category-dropdown">
                      <button
                          className="btn btn-secondary dropdown-toggle bg-transparent gap-15 d-flex align-items-center border-0"
                          type="button"
                          data-bs-toggle="dropdown"
                          aria-expanded="false"
                      >
                        <img src="/images/menu.svg" alt="menu"/>
                        <span className="me-5 d-inline-block">Shop Categories</span>
                      </button>
                      <ul className="dropdown-menu">
                        {categoryState &&
                            categoryState?.map((item, index) => {
                              return (
                                  <li key={index}>
                                    <Link
                                        className="dropdown-item"
                                        to="/products"
                                        // onClick={() => handleFilter(item?.title)}
                                    >
                                      {item?.title}
                                    </Link>
                                  </li>
                              );
                            })}
                      </ul>
                    </div>
                    <div className="menu-links">
                      <div className="d-flex align-items-center gap-30">
                        <button className="button-link">
                          <NavLink to="/">Home</NavLink>
                        </button>
                        <button className="button-link">
                          <NavLink to="products">Our Store</NavLink>
                        </button>
                        {/* <button className="button-link">
                      <NavLink to="blogs">Blog</NavLink>
                    </button> */}
                        <button className="button-link">
                          <NavLink to="contact">Contact</NavLink>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </header>
        </div>
      </div>
    </>
  );
};

export default Header;
