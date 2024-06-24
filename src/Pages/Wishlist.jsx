import React, { useEffect } from "react";
import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import Container from "./Container";
import { useDispatch, useSelector } from "react-redux";
import { getUserProductWishlist } from "../features/user/userSlice";
import { addToWishlist } from "../features/product/productSlice";

const Wishlist = () => {

  const dispatch = useDispatch();
  useEffect(() => {
    getWishlist();
  }, [])

  const getWishlist = () => {
    dispatch(getUserProductWishlist());
  }

  const wishlistState = useSelector((state) => state.auth?.wishlist?.wishlist);

  const removeFromWishlist = (id) => {
    dispatch(addToWishlist(id));
    setTimeout(() => {
      dispatch(getUserProductWishlist());
    }, 300)
  }

  return (
    <>
      <Meta title={"Wishlist"} />
      <BreadCrumb title="WishList" />
      <Container class1="wishlist-wrapper home-wrapper-2 py-5">
        <div className="row">

          {
            wishlistState?.map((item, index) => {
              return (
                <div className="col-3" key={index}>
                  <div className="wishlist-card position-relative">
                    <img onClick={() => { removeFromWishlist(item?._id) }}
                      src="images/cross.svg"
                      alt="cross"
                      className="position-absolute cross"
                    />
                    <div className="wishlist-card-image">
                      <img
                        src={item?.images[1].url ? item?.images[1].url : "images/watch-1.jpg"}
                        alt="watch"
                        className=" wish-img"
                      />
                    </div>
                    <div className=" details py-3">
                      <h5 className="title">
                        {item.title}
                      </h5>
                      <h5 className="desc" dangerouslySetInnerHTML = {{__html:item?.description}}/>
                      <h6 className="price">Rs. {item.price}</h6>
                    </div>
                  </div>
                </div>
              )
            }
            )
          }

        </div>
      </Container>
    </>
  );
};

export default Wishlist;
