import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Marquee from "react-fast-marquee";
import BlogCard from "../components/BlogCard";
import ProductCard from "../components/ProductCard";
import SpecialProduct from "../components/SpecialProduct";
import Container from "./Container";
import { Services } from "../utils/Data";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../features/product/productSlice";
import { getCart } from "../features/user/userSlice";
import { getCategories } from "../features/category/categorySlice";

const Home = () => {
  const productState = useSelector((state) => state?.product?.product);

  const dispatch = useDispatch();

  useEffect(() => {
    getProducts();
    dispatch(getCart());
    dispatch(getCategories());
  }, [dispatch]);


  const getProducts = () => {
    dispatch(getAllProducts());
  }
  return (
    <>
      <Container class1="home-wrapper-1 py-5">
        <div className="row">
          <div className="col-6 main-banner-outer" >
            <div className="main-banner position-relative">
              <img
                src="images/main-banner.jpg"
                className="img-fluid rounded-3"
                alt="main banner"
              />
              <div className="main-banner-content position-absolute">
                <h4>SUPER CHARGED FOR PROS.</h4>
                <h5>ipad $13+ pro.</h5>
                <p>From $999.00 or $41.62/mo </p>
                <Link className="button">Buy Now</Link>
              </div>
            </div>
          </div>
          <div className="col-6 small-banners-outer">
            <div className="d-flex flex-wrap gap-10 justify-content-between align-items-center">
              <div className="small-banner position-relative">
                <img
                  src="images/catbanner-01.jpg"
                  className="img-fluid rounded-3"
                  alt="main banner"
                />
                <div className="small-banner-content position-absolute">
                  <h4>New Arrivals</h4>
                  <h5>ipad $13+ pro.</h5>
                  <p>
                    From $999.00 or <br /> $41.62/mo{" "}
                  </p>
                </div>
              </div>
              <div className="small-banner position-relative">
                <img
                  src="images/catbanner-02.jpg"
                  className="img-fluid rounded-3"
                  alt="main banner"
                />
                <div className="small-banner-content position-absolute">
                  <h4>Nrew Arrivals</h4>
                  <h5>Buy iPad Air</h5>
                  <p>
                    From $999.00 or
                    <br /> $41.62/mo{" "}
                  </p>
                </div>
              </div>

              <div className="small-banner position-relative">
                <img
                  src="images/catbanner-03.jpg"
                  className="img-fluid rounded-3"
                  alt="main banner"
                />
                <div className="small-banner-content position-absolute">
                  <h4>New Arrivals</h4>
                  <h5>ipad $13+ pro.</h5>
                  <p>
                    From $999.00 or
                    <br /> $41.62/mo{" "}
                  </p>
                </div>
              </div>

              <div className="small-banner position-relative">
                <img
                  src="images/catbanner-04.jpg"
                  className="img-fluid rounded-3"
                  alt="main banner"
                />
                <div className="small-banner-content position-absolute">
                  <h4>New Arrivals</h4>
                  <h5>ipad $13+ pro.</h5>
                  <p>
                    From $999.00 or
                    <br /> $41.62/mo{" "}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
      <Container class1="home-outer-2  py-5">
        <div className="row">
          <div className="col-12">
            <div className="services d-flex  align-items-center justify-content-between">
              {Services?.map((i, j) => {
                return (
                  <div className="d-flex align-items-center gap-10" key={j}>
                    <img className="service" src={i.image} alt="services"/>
                    <div className="service-content">
                      <h6>{i.title}</h6>
                      <p className="mb-0">{i.tagline}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </Container>
      <Container class1="home-wrapper-3 py-5 ">
        <div className="row">
          <div className="col-12">
            <div className="categories d-flex justify-content-between flex-wrap align-items-center">
              <div className="d-flex align-items-center">
                <div>
                  <h6>Cameras</h6>
                  <p>10 Items</p>
                </div>
                <img src="images/camera.jpg" alt="camera" />
              </div>
              <div className="d-flex gap-30 align-items-center">
                <div>
                  <h6>Smart Tv</h6>
                  <p>10 items</p>
                </div>
                <img src="images/tv.jpg" alt="camera" />
              </div>
              <div className="d-flex gap-30 align-items-center">
                <div>
                  <h6>Smart Watches</h6>
                  <p>10 Items</p>
                </div>
                <img className="h-110" src="images/watch.jpg" alt="camera" />
              </div>
              <div className="d-flex gap-30 align-items-center">
                <div>
                  <h6>Music & Gaming</h6>
                  <p>10 Items</p>
                </div>
                <img src="images/headphone.jpg" alt="camera" />
              </div>
              <div className="d-flex gap-30 align-items-center">
                <div>
                  <h6>Cameras</h6>
                  <p>10 Items</p>
                </div>
                <img src="images/camera.jpg" alt="camera" />
              </div>
              <div className="d-flex gap-30 align-items-center">
                <div>
                  <h6>Smart Tv</h6>
                  <p>10 items</p>
                </div>
                <img src="images/tv.jpg" alt="camera" />
              </div>
              <div className="d-flex gap-30 align-items-center">
                <div>
                  <h6>Smart Watches</h6>
                  <p>10 Items</p>
                </div>
                <img className="h-110" src="images/watch.jpg" alt="camera" />
              </div>
              <div className="d-flex gap-30 align-items-center">
                <div>
                  <h6>Music & Gaming</h6>
                  <p>10 Items</p>
                </div>
                <img src="images/headphone.jpg" alt="camera" />
              </div>
            </div>
          </div>
        </div>
      </Container>
      <Container class1="featured-wrapper py-5 light-grey">
        <div className="row">
          <div className="col-12">
            <h3 className="section-heading ">Featured Collection</h3>
          </div>
          <div className="featured-items row">
            {productState && productState?.map((item, index) => {
              for (let i = 0; i < item.tags.length; i++) {
                if (item.tags[i] === "featured") {
                  return (
                      <ProductCard key={index} item={item} grid={3} />
                  )
                }
              }
            })}
          </div>
        </div>
      </Container>
      <Container class1="famous-wrapper py-5 light-grey">
        <div className="row">
          <div className="col-3">
            <div className="famous-card position-relative">
              <img
                src="images/famous-1.jpg"
                className="img-fluid"
                alt="famous"
              />
              <div className="famous-content position-absolute ">
                <h5>Big Screen</h5>
                <h6>Smart Watch Series</h6>
                <p>From $399 or $16.62/mo for 24 months.</p>
              </div>
            </div>
          </div>
          <div className="col-3">
            <div className="famous-card position-relative">
              <img
                src="images/famous-2.webp"
                className="img-fluid"
                alt="famous"
              />
              <div className="famous-content position-absolute ">
                <h5 className="text-dark">Studio Display</h5>
                <h6 className="text-dark">600 nits of brightness</h6>
                <p className="text-dark">27-inch 4k retina display</p>
              </div>
            </div>
          </div>
          <div className="col-3">
            <div className="famous-card position-relative">
              <img
                src="images/famous-2.webp"
                className="img-fluid"
                alt="famous"
              />
              <div className="famous-content position-absolute ">
                <h5 className="text-dark">Smart Phones</h5>
                <h6 className="text-dark">SamartPhone 13 Pro</h6>
                <p className="text-dark">
                  Now in green. from $990 or 41.62/mo for 24 mo.
                </p>
              </div>
            </div>
          </div>
          <div className="col-3">
            <div className="famous-card position-relative">
              <img
                src="images/famous-2.webp"
                className="img-fluid"
                alt="famous"
              />
              <div className="famous-content position-absolute ">
                <h5 className="text-dark">Home Speakers</h5>
                <h6 className="text-dark">Room- Filling Speakers</h6>
                <p className="text-dark">From $699 or $116.58/mo for 6 mo.</p>
              </div>
            </div>
          </div>
        </div>
      </Container>
      <Container class1="special-wrapper py-5 light-grey">
        <div className="row">
          <div className="col-12">
            <h3 className="section-heading">Special Products</h3>
          </div>
        </div>
        <div className="row special-items">
          {productState && productState?.map((item, index) => {
            for (let i = 0; i < item.tags.length; i++) {
              if (item.tags[i] === "special") {
                return (
                  <SpecialProduct key={index} item={item} />
                )
              }
            }
          })}
        </div>
      </Container>
      <Container class1="marque-wrapper py-5">
        <div className="row">
          <div className="col-12">
            <div className="marquee-inner-wrapper card-wrapper">
              <Marquee className="d-flex">
                <div className="mx-4 w-25">
                  <img src="images/brand-01.png" alt="brand" />
                </div>
                <div className="mx-4 w-25">
                  <img src="images/brand-02.png" alt="brand" />
                </div>
                <div className="mx-4 w-25">
                  <img src="images/brand-03.png" alt="brand" />
                </div>
                <div className="mx-4 w-25">
                  <img src="images/brand-04.png" alt="brand" />
                </div>
                <div className="mx-4 w-25">
                  <img src="images/brand-05.png" alt="brand" />
                </div>
                <div className="mx-4 w-25">
                  <img src="images/brand-06.png" alt="brand" />
                </div>
                <div className="mx-4 w-25">
                  <img src="images/brand-07.png" alt="brand" />
                </div>
                <div className="mx-4 w-25">
                  <img src="images/brand-08.png" alt="brand" />
                </div>
              </Marquee>
            </div>
          </div>
        </div>
      </Container>
      <Container class1="popular-wrapper py-5 light-grey">
        <div className="row">
          <div className="col-12">
            <h3 className="section-heading">Our Popular Products</h3>
          </div>
          <div className="row">
            {productState && productState?.map((item, index) => {
              for (let i = 0; i < item.tags.length; i++) {
                if (item.tags[i] === "popular") {
                  return (
                    <ProductCard key={index} item={item} grid={3} />
                  )
                }
              }
            })}
          </div>
        </div>
      </Container>
      <Container class1="blog-wrapper py-5 light-grey">
        <div className="row">
          <div className="col-12">
            <h3 className="section-heading">Our Latest Blogs</h3>
          </div>
          <BlogCard />
          <BlogCard />
          <BlogCard />
          <BlogCard />
        </div>
      </Container>
    </>
  );
};

export default Home;
