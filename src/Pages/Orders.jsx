import React, { useEffect } from "react";
import Container from "./Container";
import BreadCrumb from "../components/BreadCrumb";
import { useDispatch, useSelector } from "react-redux";
import { getOrders } from "../features/user/userSlice";

const Orders = () => {
  const dispatch = useDispatch();
  const orderState = useSelector((state) => state?.auth?.orders?.orders);
  useEffect(() => {
    dispatch(getOrders());
  }, []);
  console.log(orderState);
  return (
    <>
      <BreadCrumb title="My Orders" />
      <Container className="order-wrapper home-wrapper-2 py-5">
        <div className="row">
          <div className="col-12">
            <div className="row">
              <div className="col-3">
                <h5>Order Id</h5>
              </div>
              <div className="col-3">
                <h5>Total Amount</h5>
              </div>
              <div className="col-3">
                <h5>Total Amount After Discount</h5>
              </div>
              <div className="col-3">
                <h5>Status</h5>
              </div>
            </div>
          </div>
          <div className="col-12 mt-3">
            {orderState &&
              orderState.map((item, index) => {
                return (
                  <div className="row my-3 bg-secondary" key={index}>
                    <div className="col-3">
                      <p>{index + 1}</p>
                    </div>
                    <div className="col-3">
                      <p>Rs. {item?.totalPrice}</p>
                    </div>
                    <div className="col-3">
                      <p>Rs. {item?.totalPriceAfterDiscount}</p>
                    </div>
                    <div className="col-3">
                      <p>{item?.orderStatus}</p>
                    </div>
                    <div className="col-12">
                      <div className="row bg-warning p-3">
                        <div className="col-3">
                          <h6>Product Name</h6>
                        </div>
                        <div className="col-3">
                          <h6>Quantity</h6>
                        </div>
                        <div className="col-3">
                          <h6>Color</h6>
                        </div>
                        <div className="col-3">
                          <h6>Price</h6>
                        </div>
                      </div>
                      {item?.orderItems &&
                        item?.orderItems.map((item, index) => {
                          return (
                            <div className="col-12" key={index}>
                              <div className="row bg-white p-3">
                                <div className="col-3">
                                  <p>{item?.product?.title}</p>
                                </div>
                                <div className="col-3">
                                  <p>{item?.quantity}</p>
                                </div>
                                <div className="col-3">
                                  <ul className="colors ps-0">
                                    <li
                                      style={{
                                        backgroundColor: item?.color?.title,
                                      }}
                                    ></li>
                                  </ul>
                                </div>
                                <div className="col-3">
                                  <p>Rs. {item?.price}</p>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </Container>
    </>
  );
};

export default Orders;
