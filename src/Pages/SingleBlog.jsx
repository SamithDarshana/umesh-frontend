import React from "react";
import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import { Link } from "react-router-dom";
import { FaArrowLeftLong } from "react-icons/fa6";
import Container from "./Container";

const SingleBlog = () => {
  return (
    <>
      <Meta title={"Dynamic Blog Name"} />
      <BreadCrumb title="Dynamic Blog Name" />
      <Container class1="blog-wrapper home-wrapper-2 py-5">
        <div className="row">
          <div className="col-12">
            <div className="single-blog-card">
              <div className="mb-3 d-flex align-items-center gap-10 ">
                <FaArrowLeftLong className="icon" />
                <Link to="/blogs">Go Back To Blogs</Link>
              </div>
              <h3 className="title">A Beautiful Sunday Morning Renassiance</h3>
              <img
                className="img-fluid w-100 my-4"
                src="/images/blog-1.jpg"
                alt="blog-img"
              />
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit
                sint eos rem debitis, quidem ea possimus aspernatur voluptatum
                hic distinctio, nostrum eveniet expedita maiores explicabo ab
                unde iure recusandae quibusdam.
              </p>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default SingleBlog;
