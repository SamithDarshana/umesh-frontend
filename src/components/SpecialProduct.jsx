import React from "react";
import ReactStars from "react-rating-stars-component";
import { Link, useNavigate} from "react-router-dom";

const SpecialProduct = (props) => {
  const navigate = useNavigate();
  const { item } = props;
  return (
    <div className="col-4 mb-3 special-product-outer">
      <div className="special-product-card">
        <div className="d-flex justify-content-between">
          <div>
            <img className="img-fluid" src={item?.images[0].url} alt="watch" onClick={() => navigate("/products/" + item?._id)} />
          </div>
          <div className="special-product-content">
            <h5 className="brand">{item?.brand}</h5>
            <h6 className="title">
              {item?.title}
            </h6>
            <ReactStars
                classNames='stars'
              count={5}
              size={24}
              value={item?.totalRating.toString() === "0" ? 3 : item?.totalRating.toString()}
              edit={false}
              activeColor="#ffd700"
            />
            <p className="price">
              <span className="red-p">$ {item?.price}</span> &nbsp; <strike>${item?.price * 1.5}</strike>
            </p>
            <div className="discount-till d-flex align-items-center gap-10">
              <p className="mb-0">
                <b>5 days</b>
              </p>
              <div className="d-flex gap-10 align-items-center">
                <span className="badge rounded-circle p-3">01</span>:
                <span className="badge rounded-circle p-3">01</span>:
                <span className="badge rounded-circle p-3">01</span>
              </div>
            </div>
            <div className="prod-count mt-3">
              <p>Products: {item?.quantity}</p>
              <div className="progress-wrapper">
                <div
                  className="progress"
                  role="progressbar"
                  aria-label="Example 1px high"
                  aria-valuenow="25"
                  aria-valuemin="0"
                  aria-valuemax="100"
                  style={{ height: "5px" }}
                >
                  <div className="progress-bar" style={{ width: (((item?.quantity - 8) / (item?.quantity + item?.sold))*100).toString()+"%" }}></div>

                </div>
              </div>
            </div>
            <Link className="button my-2" to={'/products/'+ item?._id}>View</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpecialProduct;
