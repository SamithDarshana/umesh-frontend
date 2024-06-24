import React, { useEffect } from "react";
import BreadCrumb from "../components/BreadCrumb";
import ReactStars from "react-rating-stars-component";
import Meta from "../components/Meta";
import { useState } from "react";
import ProductCard from "../components/ProductCard";
import Color from "../components/Color";
import Container from "./Container";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../features/product/productSlice";
import { getColors } from "../features/color/colorSlice";
import { getCategories } from "../features/category/categorySlice";
import { getBrands } from "../features/brand/brandSlice";
import "../components/styles/Sidebar.css";
import { IoCloseSharp } from "react-icons/io5";
import { MdFilterAlt } from "react-icons/md";

const Store = () => {
  const dispatch = useDispatch();

  const [grid, setGrid] = useState(6);
  const [color, setColor] = useState(null);
  const [brands, setBrands] = useState([]);
  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);
  const [colors, setColors] = useState([]);

  //filter states
  const [tag, setTag] = useState(null);
  const [brand, setBrand] = useState(null);
  const [category, setCategory] = useState(null);
  const [clr, setClr] = useState(null);
  const [minPrice, setMinPrice] = useState(null);
  const [maxPrice, setMaxPrice] = useState(null);
  const [sort, setSort] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    getProducts();
    dispatch(getColors());
    dispatch(getCategories());
    dispatch(getBrands());
  }, [tag, brand, category, minPrice, maxPrice, sort, color]);

  let productState = useSelector((state) => state?.product?.product);
  const colorState = useSelector((state) => state?.color?.colors);
  const categoryState = useSelector((state) => state?.category?.categories);
  const brandState = useSelector((state) => state?.brand?.brands);

  useEffect(() => {
    let newTags = [];
    for (let i = 0; i < productState.length; i++) {
      const element = productState[i];
      newTags.push(element.tags[0]);
    }
    setTags(newTags);
  }, [productState]);

  const getProducts = () => {
    dispatch(
      getAllProducts({ tag, brand, category, minPrice, maxPrice, sort, color })
    );
  };

  return (
    <>
      <Meta title={"Our Store"} />
      <BreadCrumb title="Our Store" />
      <Container class1="store-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className=" col-3 mobile-filter">
            <div className={`sidebar ${isOpen ? "open" : ""}`}>
              <button
                className="toggle-btn d-flex justify-content-center align-items-center"
                onClick={toggleSidebar}
              >
                {isOpen ? (
                  <IoCloseSharp className="filter-icon" />
                ) : (
                  <MdFilterAlt className="filter-icon" />
                )}
              </button>
              <nav className="sidebar-content">
                <div className="filter-card mb-3">
                  <h3 className="filter-title">Shop By Categories</h3>
                  <div>
                    <ul className="ps-0 categories">
                      {categoryState &&
                        categoryState?.map((item, index) => {
                          return (
                            <li
                              key={index}
                              //onClick={() => handleFilter(item?.title)}
                            >
                              {item?.title}
                            </li>
                          );
                        })}
                    </ul>
                  </div>
                </div>
                <div className="filter-card mb-3">
                  <h3 className="filter-title">Filter By</h3>
                  <div>
                    <h5 className="sub-title">Availability</h5>
                    <div>
                      <div className="form-check">
                        <input type="checkbox" className="form-check-input" />
                        <label htmlFor="" className="form-check-label">
                          In Stock (1)
                        </label>
                      </div>
                      <div className="form-check">
                        <input type="checkbox" className="form-check-input" />
                        <label htmlFor="" className="form-check-label">
                          Out of Stock (0)
                        </label>
                      </div>
                    </div>
                    <h5 className="sub-title">Price</h5>
                    <div className="d-flex align-items-center gap-10">
                      <div className="form-floating">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="From"
                        />
                        <label htmlFor="floatingInput">From</label>
                      </div>
                      <div className="form-floating">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="To"
                        />
                        <label htmlFor="floatingInput">To</label>
                      </div>
                    </div>
                    <h5 className="sub-title">Color</h5>
                    <div>
                      <Color colors={colorState} setColor={setColor} />
                    </div>
                  </div>
                </div>
                <div className="filter-card mb-3">
                  <h3 className="filter-title">Product Tags</h3>
                  <div>
                    <div className="product-tags d-flex flex-wrap align-items-center gap-10">
                      <span className="bagde bg-light text-dark rounded-3 py-2 px-3">
                        Head Phone
                      </span>
                      <span className="bagde bg-light text-dark rounded-3 py-2 px-3">
                        Laptop
                      </span>
                      <span className="bagde bg-light text-dark rounded-3 py-2 px-3">
                        Mobile
                      </span>
                      <span className="bagde bg-light text-dark rounded-3 py-2 px-3">
                        Desktop
                      </span>
                    </div>
                  </div>
                </div>
              </nav>
            </div>
          </div>
          <div className="col-3 filter">
            <div className="filter-card mb-3">
              <h3 className="filter-title">Shop By Categories</h3>
              <div>
                <ul className="ps-0 categories">
                  {categoryState &&
                    categoryState?.map((item, index) => {
                      return (
                        <li
                          key={index}
                          onClick={() => setCategory(item?.title)}
                        >
                          {item?.title}
                        </li>
                      );
                    })}
                </ul>
              </div>
            </div>
            <div className="filter-card mb-3">
              <h3 className="filter-title">Filter By</h3>
              <div>
                <h5 className="sub-title">Brand</h5>
                {brandState &&
                  brandState.map((item, index) => {
                    return (
                      <div key={index} className="form-check">
                        {/* <input type="checkbox" className="form-check-input" /> */}
                        <label
                          onClick={() => {
                            setBrand(item?.title);
                          }}
                          htmlFor=""
                          className="form-check-label"
                        >
                          {item?.title}
                        </label>
                      </div>
                    );
                  })}
                <h5 className="sub-title">Availability</h5>
                <div>
                  <div className="form-check">
                    <input type="checkbox" className="form-check-input" />
                    <label htmlFor="" className="form-check-label">
                      In Stock (1)
                    </label>
                  </div>
                  <div className="form-check">
                    <input type="checkbox" className="form-check-input" />
                    <label htmlFor="" className="form-check-label">
                      Out of Stock (0)
                    </label>
                  </div>
                </div>
                <h5 className="sub-title">Price</h5>
                <div className="d-flex align-items-center gap-10">
                  <div className="form-floating">
                    <input
                      type="number"
                      className="form-control"
                      placeholder="From"
                      onChange={(e) => setMinPrice(e.target.value)}
                    />
                    <label htmlFor="floatingInput">From</label>
                  </div>
                  <div className="form-floating">
                    <input
                      type="number"
                      className="form-control"
                      placeholder="To"
                      onChange={(e) => setMaxPrice(e.target.value)}
                    />
                    <label htmlFor="floatingInput">To</label>
                  </div>
                </div>
                <h5 className="sub-title">Color</h5>
                <div>
                  <Color colors={colorState} setColor={setColor} />
                </div>
              </div>
            </div>
            <div className="filter-card mb-3">
              <h3 className="filter-title">Product Tags</h3>
              <div>
                <div className="product-tags d-flex flex-wrap align-items-center gap-10">
                  {tags &&
                    [...new Set(tags)].map((item, index) => {
                      return (
                        <span
                          key={index}
                          onClick={() => {
                            setTag(item);
                          }}
                          className="bagde bg-light rounded-3 py-2 px-3"
                        >
                          {item}
                        </span>
                      );
                    })}
                </div>
              </div>
            </div>
            <div className="filter-card mb-3">
              <h3 className="filter-title">Random Products</h3>
              <div>
                <div className="random-products d-flex">
                  <div className="w-50">
                    <img
                      src="images/watch.jpg"
                      alt="watch"
                      className="img-fluid"
                    />
                  </div>
                  <div className="w-50">
                    <h5>
                      Kids headphone bulk 10 pack multi colored for students
                    </h5>
                    <ReactStars
                      count={5}
                      size={24}
                      value={3}
                      edit={false}
                      activeColor="#ffd700"
                    />
                    <b>$ 300</b>
                  </div>
                </div>
                <div className="random-products d-flex mt-3">
                  <div className="w-50">
                    <img
                      src="images/watch.jpg"
                      alt="watch"
                      className="img-fluid"
                    />
                  </div>
                  <div className="w-50">
                    <h5>
                      Kids headphone bulk 10 pack multi colored for students
                    </h5>
                    <ReactStars
                      count={5}
                      size={24}
                      value={3}
                      edit={false}
                      activeColor="#ffd700"
                    />
                    <b>$ 300</b>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-9 list">
            <div className="filter-sort-grid mb-4">
              <div className="d-flex justify-content-between align-items-center">
                <div className="d-flex align-items-center gap-10">
                  <p className="mb-0 d-block">Sort By:</p>
                  <select
                    name="sort"
                    id="sort"
                    className="form-control form-select"
                    defaultValue="best-selling"
                    onChange={(e) => {
                      setSort(e.target.value);
                      const selectedOption = e.target.value;
                      if (selectedOption === "all-prods") {
                        setBrand(null);
                        setColor(null);
                        setCategory(null);
                        setTag(null);
                        getProducts();
                      }
                    }}
                  >
                    <option value="all-prods">All Products</option>
                    <option value="title">Alphabatically, A-Z</option>
                    <option value="-title">Alphabatically, Z-A</option>
                    <option value="price">Price, low to high</option>
                    <option value="-price">Price, high to low</option>
                    <option value="createdAt">Date , old to new</option>
                    <option value="-createdAt">Date, new to old</option>
                  </select>
                </div>
                <div className="gap-10 grid-wrapper">
                  <div className="d-flex gap-10 align-items-center grid">
                    <img
                      onClick={() => {
                        setGrid(3);
                      }}
                      src="images/gr4.svg"
                      alt="grid"
                      className="img-fluid four-prod"
                    />
                    <img
                      onClick={() => {
                        setGrid(4);
                      }}
                      src="images/gr3.svg"
                      alt="grid"
                      className=" img-fluid four-prod"
                    />
                    <img
                      onClick={() => {
                        setGrid(6);
                      }}
                      src="images/gr2.svg"
                      alt="grid"
                      className="d-block img-fluid"
                    />
                    <img
                      onClick={() => {
                        setGrid(12);
                      }}
                      src="images/gr.svg"
                      alt="grid"
                      className="d-block img-fluid"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="products-list pb-5">
              <div className="d-flex flex-wrap">
                {productState &&
                  productState?.map((item, index) => {
                    return <ProductCard key={index} item={item} grid={grid} />;
                  })}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Store;
