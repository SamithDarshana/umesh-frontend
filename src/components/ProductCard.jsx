import React from "react";
import ReactStars from "react-rating-stars-component";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToWishlist } from "../features/product/productSlice";

const ProductCard = (props) => {
  const navigate = useNavigate();
  const { item, grid } = props;
  let location = useLocation();

  const dispatch = useDispatch();

  const addToWish = (id) => {
    dispatch(addToWishlist(id));
  };


  return (
    <>
      <div
        className={`prod ${
          location.pathname === "/products" || "/"? `col-${grid}` : "col-3"
        } ${window.innerWidth >= 600  ?"col-3":"col-6"}`}
      >
        <div className="link">
          <div className="product-card">
            <div className="wishlist-icon position-aboslute">
              <img
                onClick={(e) => {
                  addToWish(item?._id);
                }}
                src="/images/wish.svg"
                alt=""
              />
            </div>

            <div className="product-image">
              <img
                className="prod-img"
                src={item?.images[0]?.url}
                alt="prduct-img"
              />
              <img
                className="prod-img"
                src={item?.images[1]?.url}
                alt="prduct-img"
              />
            </div>

            <div className="product-details">
              <h6 className="brand">{item?.brand}</h6>
              <h5
                onClick={() => navigate("/products/" + item?._id)}
                className="product-title"
              >
                {item?.title}
              </h5>
              <p
                className={`description ${grid === 12 ? "d-block" : "d-none"}`}
                dangerouslySetInnerHTML={{ __html: item?.description }}
              ></p>
              <ReactStars
                count={5}
                size={24}
                value={
                  Number(item?.totalRating) === 0
                    ? 3
                    : Number(item?.totalRating)
                }
                edit={false}
                activeColor="#ffd700"
              />

              <p className="price">Rs. {item?.price}</p>
            </div>
            <div className="action-bar position-absolute">
              <div className="d-flex flex-column gap-10">
                <button className="border-0 bg-transparent">
                  <img src="/images/add-cart.svg" alt="addcart" />
                </button>
                <button className="border-0 bg-transparent">
                  <img
                    src="/images/view.svg"
                    alt="view"
                    onClick={() => navigate("/products/" + item?._id)}
                  />
                </button>
                <button className="border-0 bg-transparent">
                  <img src="/images/prodcompare.svg" alt="compare" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductCard;
