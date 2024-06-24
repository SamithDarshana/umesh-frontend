import React, { useEffect, useState } from "react";
import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { Link } from "react-router-dom";
import Container from "./Container";
import { getCart, removeFromCart, updateQuantity } from "../features/user/userSlice";
import { useDispatch, useSelector } from "react-redux";


const Cart = () => {
  const dispatch = useDispatch();
  const [productUpdateDetail, setProductUpdateDetail] = useState(null);

  useEffect(() => {
    dispatch(getCart());
  }, [])

  const cartState = useSelector((state) => state?.auth?.cart);

  let cartTotal = 0;
  for (let i = 0; i < cartState?.length; i++) {
    cartTotal += (cartState[i].productId?.price * cartState[i].quantity);
  }

  const handleDelete = (id) => {
    dispatch(removeFromCart(id));
    setTimeout(() => {
      dispatch(getCart());
    }, 2000)
  }

  useEffect(() => {
    if (productUpdateDetail !== null) {
      dispatch(updateQuantity({ cartItemId: productUpdateDetail?.cartItemId, newQuantity: productUpdateDetail?.quantity }));
    }
    setTimeout(() => {
      dispatch(getCart());
    }, 1000)
  }, [productUpdateDetail])
  return (
    <>
      <Meta title={"Cart"} />
      <BreadCrumb title="Cart" />
      <Container class1="cart-wrapper home-wrapper-2 py-5">
        <div className="row">
          <div className="col-12">
            <div className="cart-header py-3 d-flex justify-content-between align-items-center">
              <h4 className="cart-col-1">Product</h4>
              <h4 className="cart-col-2">Price</h4>
              <h4 className="cart-col-3">Quantity</h4>
              <h4 className="cart-col-4">Total</h4>
            </div>
            {cartState && cartState?.map((item, index) => {
              return (
                <div key={index} className="cart-data py-3 mb-2 d-flex justify-content-between align-items-center">
                  <div className="cart-col-1 gap-15 d-flex align-items-center">
                    <div className="w-25">
                      <img
                        className="img-fluid"
                        src={item?.productId?.images[0]?.url}
                        alt="product-img"
                      />
                    </div>
                    <div className="w-75">
                      <p>{item?.productId?.title}</p>
                      <p>Size: </p>
                      <div className="d-flex gap-10">Color:
                        <ul className="colors ps-0">
                          <li style={{ backgroundColor: item?.color?.title }}></li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="cart-col-2">
                    <h5 className="price">Rs. {item?.productId?.price}</h5>
                  </div>
                  <div className="cart-col-3 d-flex align-items-center gap-15">
                    <div>
                      <input
                        type="number"
                        min={0}
                        max={item?.productId?.quantity}
                        value={item?.quantity}
                        onChange={(e) => { setProductUpdateDetail({ cartItemId: item?._id, quantity: e.target.value }) }}
                        className="form-control w-60"
                      />
                    </div>
                    <div>
                      <RiDeleteBin6Fill onClick={() => { handleDelete(item?._id) }} className="fs-25 text-danger" />
                    </div>
                  </div>
                  <div className="cart-col-4">
                    <h5 className="price">Rs. {item?.productId?.price * item?.quantity}</h5>
                  </div>
                </div>
              )
            })}

          </div>
          <div className="col-12 py-2 mt-4">
            <div className="d-flex justify-content-between align-items-center">
              <Link to="/products" className="button ">
                Continue to Shopping
              </Link>
              <div className="d-flex flex-column align-items-end">
                <h4>Sub Total: Rs. {cartTotal}</h4>
                <p>Taxes and shipping calculated at checkout</p>
                <Link to="/checkout" className="button">
                  Checkout
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Cart;
