import React, { useState, useEffect } from "react";
import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import { Link } from "react-router-dom";
import { IoIosArrowRoundBack } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as yup from "yup";
import { createAnOrder } from "../features/user/userSlice";

const Checkout = () => {
  const dispatch = useDispatch();
  const cartState = useSelector((state) => state?.auth?.cart);
  const [totalAmount, setTotalAmount] = useState(null);

  useEffect(() => {
    let sum = 0;
    for (let i = 0; i < cartState?.length; i++) {
      sum += cartState[i]?.quantity * cartState[i]?.productId?.price;
    }
    setTotalAmount(sum);
  }, [cartState]);

  let items = [];
  for (let i = 0; i < cartState?.length; i++) {
    items.push({
      product: cartState[i].productId._id,
      color: cartState[i].color._id,
      quantity: cartState[i].quantity,
      price: cartState[i].price,
    });
  }

  const shippingSchema = yup.object({
    firstName: yup.string().required("First Name is Required!"),
    lastName: yup.string().required("LastName is Required!"),
    address: yup.string().required("Address is Required!"),
    other: yup.string(),
    state: yup.string().required("State is Required!"),
    city: yup.string().required("City is Required!"),
    country: yup.string().required("Country is Required!"),
    postalcode: yup.number().required("Zip Code is Required!"),
  });

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      address: "",
      other: "",
      state: "",
      city: "",
      country: "",
      postalcode: "",
    },
    validationSchema: shippingSchema,
    onSubmit: (values) => {
      createOrder();
    },
  });

  const createOrder =() => {
    const values = formik.values;
    dispatch(
      createAnOrder({
        totalPrice: totalAmount,
        totalPriceAfterDiscount: totalAmount,
        orderItems: items,
        shippingInfo: values,
        paymentInfo: { onlineTransactionId: "hu1556168r" },
      })
    );
  };
  
  return (
    <>
      <Meta title={"Contact Us"} />
      <BreadCrumb title="Contact Us" />
      <div className="checkout-wrapper py-5 home-wrapper-2">
        <div className="container-xxl">
          <div className="row">
            <div className="col-7">
              <div className="checkout-left-data">
                <h3 className="website-name">Umesh Mobile</h3>

                <nav
                  aria-label="breadcrumb"
                  style={{ "--bs-breadcrumb-divider": ">" }}
                >
                  <ol className="breadcrumb">
                    <li className="breadcrumb-item total-price">
                      <Link className="text-dark" to="/cart">
                        Cart
                      </Link>
                    </li>
                    &nbsp; {">"} &nbsp;
                    <li
                      className="breadcrumb- total-price active"
                      aria-current="page"
                    >
                      Shipping
                    </li>
                    &nbsp; {">"} &nbsp;
                    <li className="breadcrumb-item total-price">
                      <Link className="text-dark" to="/cart">
                        Payment
                      </Link>
                    </li>
                  </ol>
                </nav>
                <h4 className="title mb-3">Contact Information</h4>
                <p className="more-details">
                  Amanda Charith (acsenevirathna@gmail.com)
                </p>
                <h4 className="mb-3">Shipping Address</h4>
                <form
                  action=""
                  className="d-flex flex-wrap gap-15 justify-content-between"
                  onSubmit={formik.handleSubmit}
                >
                  <div className="w-100">
                    <select
                      name="country"
                      className="form-control form-select"
                      value={formik.values.country}
                      onChange={formik.handleChange("country")}
                      onBlur={formik.handleBlur("country")}
                    >
                      <option value="" selected disabled>
                        Select Country
                      </option>
                      <option value="SriLanka">Sri Lanka</option>
                      <option value="India">India</option>
                    </select>
                    <div className="error ms-2 my-1">
                      {formik.touched.country && formik.errors.country}
                    </div>
                  </div>
                  <div className="flex-grow-1">
                    <input
                      type="text"
                      placeholder="First Name"
                      className="form-control"
                      name="firstName"
                      value={formik.values.firstName}
                      onChange={formik.handleChange("firstName")}
                      onBlur={formik.handleBlur("firstName")}
                    />
                    <div className="error ms-2 my-1">
                      {formik.touched.firstName && formik.errors.firstName}
                    </div>
                  </div>
                  <div className="flex-grow-1">
                    <input
                      type="text"
                      placeholder="Last Name"
                      className="form-control"
                      name="lastName"
                      value={formik.values.lastName}
                      onChange={formik.handleChange("lastName")}
                      onBlur={formik.handleBlur("lastName")}
                    />
                    <div className="error ms-2 my-1">
                      {formik.touched.lastName && formik.errors.lastName}
                    </div>
                  </div>
                  <div className="w-100">
                    <input
                      type="text"
                      placeholder="Address"
                      className="form-control"
                      name="address"
                      value={formik.values.address}
                      onChange={formik.handleChange("address")}
                      onBlur={formik.handleBlur("address")}
                    />
                    <div className="error ms-2 my-1">
                      {formik.touched.address && formik.errors.address}
                    </div>
                  </div>
                  <div className="w-100">
                    <input
                      type="text"
                      placeholder="Apratment, Suite ,etc"
                      className="form-control"
                      name="other"
                      value={formik.values.other}
                      onChange={formik.handleChange("other")}
                      onBlur={formik.handleBlur("other")}
                    />
                    <div className="error ms-2 my-1">
                      {formik.touched.other && formik.errors.other}
                    </div>
                  </div>
                  <div className="flex-grow-1">
                    <input
                      type="text"
                      placeholder="City"
                      className="form-control"
                      name="city"
                      value={formik.values.city}
                      onChange={formik.handleChange("city")}
                      onBlur={formik.handleBlur("city")}
                    />
                    <div className="error ms-2 my-1">
                      {formik.touched.city && formik.errors.city}
                    </div>
                  </div>
                  <div className="flex-grow-1">
                    <select
                      className="form-control form-select"
                      id=""
                      name="state"
                      value={formik.values.state}
                      onChange={formik.handleChange("state")}
                      onBlur={formik.handleBlur("state")}
                    >
                      <option value="" selected disabled>
                        Select State
                      </option>
                      <option value="uva">Uva</option>
                      <option value="southern">Southern</option>
                      <option value="southern">Northern</option>
                      <option value="southern">Eastern</option>
                      <option value="southern">Western</option>
                    </select>
                    <div className="error ms-2 my-1">
                      {formik.touched.state && formik.errors.state}
                    </div>
                  </div>
                  <div className="flex-grow-1">
                    <input
                      type="text"
                      placeholder="Zip Code"
                      className="form-control"
                      name="postalcode"
                      value={formik.values.postalcode}
                      onChange={formik.handleChange("postalcode")}
                      onBlur={formik.handleBlur("postalcode")}
                    />
                    <div className="error ms-2 my-1">
                      {formik.touched.postalcode && formik.errors.postalcode}
                    </div>
                  </div>
                  <div className="w-100">
                    <div className="d-flex align-items-center justify-content-between">
                      <Link
                        to="/cart"
                        className="return fs-6 d-flex align-items-center"
                      >
                        <IoIosArrowRoundBack className="fs-2" />
                        Return to Cart
                      </Link>
                      <Link to="/products" className="btn btn-danger">
                        Contiinue to to Shipping
                      </Link>
                      <button className="button" type="submit">
                        Place Order
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>

            <div className="col-5">
              <div className="border-bottom py-4">
                {cartState &&
                  cartState?.map((item, index) => {
                    return (
                      <div
                        key={index}
                        className="d-flex gap-10 mb-2 justify-content-between align-items-center"
                      >
                        <div className="w-75 d-flex gap-10 align-items-center">
                          <div className="w-25 position-relative">
                            <span
                              style={{ top: "-15px", right: "2px" }}
                              className="badge bg-secondary text-white rounded-circle p-2 position-absolute"
                            >
                              {item?.quantity}
                            </span>
                            <img
                              className="img-fluid rounded"
                              src={item.productId.images[0]?.url}
                              alt=""
                            />
                          </div>
                          <div className="w-75">
                            <h5 className="total fs-5">
                              {item.productId?.title}
                            </h5>

                            <p className="total-price">{item.color?.title}</p>
                          </div>
                        </div>
                        <div>
                          <h5 className="total">
                            $ {item.productId?.price * item?.quantity}
                          </h5>
                        </div>
                      </div>
                    );
                  })}
                <div></div>
              </div>
              <div className="border-bottom py-4">
                <div className="d-flex justify-content-between align-items-center">
                  <p className="total">Sub Total</p>
                  <p className="total-price">${totalAmount}</p>
                </div>
                <div className="d-flex justify-content-between align-items-center">
                  <p className="mb-0 total">Shipping</p>
                  <p className="mb-0 total-price">
                    <u>free shipping</u>
                  </p>
                </div>
              </div>
              <div className="border-bottom py-4 d-flex justify-content-between align-items-center">
                <h4 className="total">Shipping</h4>
                <p className="total-price">${totalAmount}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Checkout;
