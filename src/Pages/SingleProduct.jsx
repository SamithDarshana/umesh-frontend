import React, { useEffect, useState } from "react";
import BreadCrumb from "../components/BreadCrumb";
import ProductCard from "../components/ProductCard";
import Meta from "../components/Meta";
import ReactStars from "react-rating-stars-component";
import Zoom from "react-img-zoom-gdn";
import Color from "../components/Color";
import { TbGitCompare } from "react-icons/tb";
import { FaHeartCirclePlus } from "react-icons/fa6";
import Container from "./Container";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addRating, getProduct } from "../features/product/productSlice";
import { getAllProducts } from "../features/product/productSlice";
import { getCart } from "../features/user/userSlice";
import { getColors } from "../features/color/colorSlice";
import { addProdToCart } from "../features/user/userSlice";
import { toast } from "react-toastify";

const SingleProduct = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const productId = location.pathname.split("/")[2];
  let [alreadyAdded, setAlreadyAdded] = useState(false);
  const [color, setColor] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [imgLink, setImgLink] = useState(null);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    dispatch(getProduct(productId));
    dispatch(getAllProducts());
    dispatch(getCart());
    dispatch(getColors());

    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const productState = useSelector((state) => state?.product?.singleproduct);
  const popularState = useSelector((state) => state?.product?.product);
  const cartState = useSelector((state) => state?.auth?.cart);
  const colorState = useSelector(
    (state) => state?.product?.singleproduct?.color
  );

  useEffect(() => {
    for (let i = 0; i < cartState?.length; i++) {
      if (productId === cartState[i]?.productId?._id) {
        setAlreadyAdded(true);
      }
    }
  }, [cartState]);

  useEffect(() => {
    setImgLink(productState?.images[0]?.url);
  }, [productState]);

  const uploadCart = () => {
    if (color === null) {
      toast.error("Please choose a color");
      return false;
    } else {
      dispatch(
        addProdToCart({
          productId: productState?._id,
          quantity,
          color,
          price: productState?.price,
        })
      );
      dispatch(getCart());
      setAlreadyAdded(true);
    }
  };

  const [orderedProduct, setOrderedProduct] = useState(true);

  const copyToClipboard = (text) => {
    console.log("text", text);
    var textField = document.createElement("textarea");
    textField.innerText = text;
    document.body.appendChild(textField);
    textField.select();
    document.execCommand("copy");
    textField.remove();
  };

  const [star, setStar] = useState(null);
  const [comment, setComment] = useState(null);

  const addRatingToProduct = () => {
    if (star === null) {
      toast.error("please add star rating!");
    } else if (comment === null) {
      toast.error("Please write a review about the product");
    } else {
      dispatch(addRating({ star: star, comment: comment, prodId: productId }));
      setTimeout(() => {
        dispatch(getProduct(productId));
      }, 1000);
    }
  };

  function getImageDimensions(url) {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => {
        resolve({ width: img.width, height: img.height });
      };
      img.onerror = (error) => {
        reject(error);
      };
      img.src = url;
    });
  }
  const [size, setSize] = useState(null);

  useEffect(() => {
    if (imgLink) {
      getImageDimensions(imgLink)
        .then((dimensions) => {
          // console.log(`Width: ${dimensions.width}, Height: ${dimensions.height}`);
          setSize({ width: dimensions.width, height: dimensions.height });
        })
        .catch((error) => {
          console.error("Error loading image:", error);
        });
    }
  }, [imgLink]);

  const getZoomSize = () => {
    if (windowWidth > 1200) {
      return { width: 600, height: 400 };
    } else if (windowWidth > 768) {
      return { width: 400, height: 300 };
    } else {
      return { width: 250, height: 200 };
    }
  };

  const zoomSize = getZoomSize();
  console.log(imgLink);

  return (
    <>
      <Meta title={"Dyanamic Name"} />
      <BreadCrumb title={productState?.title} />
      <Container class1="main-product-wrpper py-5 home-wrapper-2">
        <div className="row">
          <div className="prod-images ">
            <div className="main-product-image">
              {imgLink && size && (
                <Zoom
                  key={imgLink}
                  img={imgLink}
                  zoomScale={2}
                  width={zoomSize.width}
                  height={zoomSize.height}
                  className="imgzoom"
                />
              )}
            </div>
            <div className="other-product-images d-flex flex-wrap gap-15">
              {productState?.images?.map((item, index) => {
                return (
                  <div key={index} onClick={()=>setImgLink(item?.url)} className="single-prod">
                    <img
                      src={item?.url}
                      alt="produt-img"
                      className="img-fluid"
                      
                    />
                  </div>
                );
              })}
            </div>
          </div>
          <div className="prod-details">
            <div className="main-product-details">
              <div className="border-bottom">
                <h3 className="title">{productState?.title}</h3>
              </div>
              <div className="border-bottom py-3">
                <p className="price">$ {productState?.price}</p>
                <div className="d-flex align-items-center gap-10">
                  {productState?.totalRating && (
                    <ReactStars
                      count={5}
                      size={24}
                      value={Number(productState?.totalRating)}
                      edit={false}
                      activeColor="#ffd700"
                    />
                  )}
                  <p className="mb-0 t-review">
                    ({productState?.ratings?.length}{" "}
                    {productState?.ratings?.length === 1 ? "review" : "reviews"}
                    )
                  </p>
                </div>
                <a className="review-btn" href="#review">
                  Write a review
                </a>
              </div>
              <div className="border-bottom py-3">
                <div className="d-flex align-items-center gap-10 my-2">
                  <h3 className="product-heading">Type:</h3>
                  <p className="product-data"> {productState?.category}</p>
                </div>
                <div className="d-flex align-items-center gap-10 my-2">
                  <h3 className="product-heading">Brand :</h3>
                  <p className="product-data"> {productState?.brand}</p>
                </div>
                <div className="d-flex align-items-center gap-10 my-2">
                  <h3 className="product-heading">Category :</h3>
                  <p className="product-data"> {productState?.category}</p>
                </div>
                <div className="d-flex align-items-center gap-10 my-2">
                  <h3 className="product-heading">Tags :</h3>
                  <p className="product-data"> {productState?.tags}</p>
                </div>
                <div className="d-flex align-items-center gap-10 my-2">
                  <h3 className="product-heading">Availability :</h3>
                  <p className="product-data"> In Stock</p>
                </div>
                <div className="d-flex flex-column align-items-start gap-10 mt-2 mb-3">
                  <h3 className="product-heading">Size :</h3>
                  <div className="d-flex flex-wrap gap-15">
                    <span className="badge p-2 border border-1 bg-white text-dark border-secondary">
                      S
                    </span>
                    <span className="badge p-2 border border-1 bg-white text-dark border-secondary">
                      M
                    </span>
                    <span className="badge p-2 border border-1 bg-white text-dark border-secondary">
                      L
                    </span>
                    <span className="badge p-2 border border-1 bg-white text-dark border-secondary">
                      XL
                    </span>
                  </div>
                </div>
                <div className="d-flex flex-column align-items-start gap-10 mt-2 mb-3">
                  <h3 className="product-heading">Color :</h3>
                  <Color colors={colorState} setColor={setColor} />
                </div>
                <div className="d-flex flex-column align-items-start gap-10 mb-3">
                  {alreadyAdded === false && (
                    <>
                      <div className="d-flex align-items-center gap-10 mb-2">
                        <h3 className="product-heading">Quantity :</h3>
                        <input
                          type="number"
                          style={{ width: "65px" }}
                          min={1}
                          max={productState?.quantity}
                          className="form-control"
                          onChange={(e) => setQuantity(e.target.value)}
                          value={quantity}
                        />
                      </div>
                    </>
                  )}
                  <div className="d-flex justify-content-center gap-15 align-items-center">
                    {alreadyAdded === false && (
                      <button
                        type="submit"
                        onClick={() => {
                          uploadCart(productState._id);
                        }}
                        className="button border-0"
                      >
                        Add to Cart
                      </button>
                    )}
                    {alreadyAdded === true && (
                      <button
                        type="submit"
                        onClick={() => navigate("/cart")}
                        className="button border-0"
                      >
                        Go to Cart
                      </button>
                    )}
                    <button className="button border-0 signup">Buy Now</button>
                  </div>
                </div>
                <div className="d-flex align-items-center gap-30">
                  <div>
                    <a className="d-flex gap-15 align-items-center" href="">
                      <TbGitCompare className="fs-25" /> Add to compare
                    </a>
                  </div>
                  <div>
                    <a className=" d-flex gap-15 align-items-center" href="">
                      <FaHeartCirclePlus className="fs-25" /> Add to Wishlist
                    </a>
                  </div>
                </div>
                <div className="d-flex flex-column align-items-start gap-10 my-3">
                  <h3 className="product-heading">Shipping & Returns</h3>
                  <p className="product-data">
                    Free Shipping and Returns available on all orders!
                    <br /> we ship all orders within
                    <b>5-10 business days!</b>
                  </p>
                </div>
                <div className="accordion" id="accordionExample">
                  <div className="accordion-item">
                    <h2 className="accordion-header">
                      <button
                        className="accordion-button"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapseOne"
                        aria-expanded="true"
                        aria-controls="collapseOne"
                      >
                        Shipping & Returns
                      </button>
                    </h2>
                    <div
                      id="collapseOne"
                      className="accordion-collapse collapse show"
                      data-bs-parent="#accordionExample"
                    >
                      <div className="accordion-body">
                        <p className="product-data">
                          Free Shipping and Returns available on all orders!
                          <br /> we ship all orders within{" "}
                          <b>5-10 business days!</b>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="d-flex align-items-center gap-10 my-3">
                  <h3 className="product-heading">Copy Product Link</h3>
                  <a
                    href="javascript:void(0)"
                    onClick={() => {
                      copyToClipboard(window.location.href);
                    }}
                  >
                    Click Here!
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
      <Container class1="description-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <div className="bg-white p-3">
              <h4>Description</h4>
              <p
                dangerouslySetInnerHTML={{ __html: productState?.description }}
              ></p>
            </div>
          </div>
        </div>
      </Container>
      <Container class1="reviews-wrapper pb-5 home-wrapper-2">
        <div id="review" className="row">
          <div className="col-12">
            <h3>Reviews</h3>
            <div className="review-inner-wrapper">
              <div className="review-head d-flex justify-content-between align-items-end">
                <div>
                  <h4 className="mb-2">Customer Reviews</h4>
                  <div className="d-flex gap-10 align-items-center">
                    {productState?.totalRating && (
                      <ReactStars
                        count={5}
                        size={24}
                        value={Number(productState?.totalRating)}
                        edit={false}
                        activeColor="#ffd700"
                      />
                    )}

                    <p className="mb-0">
                      Based on {productState?.ratings?.length}{" "}
                      {productState?.ratings?.length === 1
                        ? "review"
                        : "reviews"}
                    </p>
                  </div>
                </div>
                {orderedProduct && (
                  <div className="mb-2">
                    <a className="text-dark text-decoration-underline" href="">
                      Write a review
                    </a>
                  </div>
                )}
              </div>
              <div className="review-form py-4">
                <h4>Write a review</h4>
                <div className="d-flex flex-column gap-15">
                  <div>
                    <ReactStars
                      count={5}
                      size={24}
                      value={star}
                      edit={true}
                      activeColor="#ffd700"
                      onChange={(e) => {
                        setStar(e);
                      }}
                    />
                  </div>
                  <div>
                    <textarea
                      name=""
                      className="w-100 form-control"
                      id=""
                      cols="30"
                      rows="4"
                      placeholder="Comments"
                      onChange={(e) => {
                        setComment(e.target.value);
                      }}
                    ></textarea>
                  </div>
                  <div className="d-flex justify-content-end">
                    <button
                      type="button"
                      onClick={addRatingToProduct}
                      className="button border-0"
                    >
                      Submit Review
                    </button>
                  </div>
                </div>
              </div>
              <div className="reviews">
                {productState &&
                  productState?.ratings?.map((item, index) => {
                    return (
                      <div key={index} className="review">
                        <div className="d-flex gap-10 align-items-center">
                          <h6 className="mb-0">
                            {item?.postedBy?.firstName}{" "}
                            {item?.postedBy?.lastName}
                          </h6>
                          <ReactStars
                            count={5}
                            size={24}
                            value={item?.star}
                            edit={false}
                            activeColor="#ffd700"
                          />
                        </div>
                        <p className="mt-3">{item?.comment}</p>
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
        </div>
      </Container>
      <Container class1="popular-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <h3 className="section-heading">Our Popular Products</h3>
          </div>
          <div className="row">
            {popularState &&
              popularState?.map((item, index) => {
                for (let i = 0; i < item.tags.length; i++) {
                  if (item.tags[i] === "popular") {
                    return <ProductCard key={index} item={item} grid={3} />;
                  }
                }
              })}
          </div>
        </div>
      </Container>
    </>
  );
};

export default SingleProduct;
