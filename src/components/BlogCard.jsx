import React from "react";
import { Link, useLocation } from "react-router-dom";

const BlogCard = () => {
  const loc = useLocation();
  return (
    <>
      <div className={`${loc.pathname === "/blogs" ? "col-6" : "col-3"}`}>
        <div className="blog-card mb-4">
          <div className="card-img">
            <img className="img-fluid" src="images/blog-1.jpg" alt="blog" />
          </div>
          <div className="blog-content">
            <p className="date">1 Dec, 2023</p>
            <h5 className="title">A beautiful sunday morning renaissance</h5>
            <p className="desc">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere
              sequi soluta pariatur eos.
            </p>
            <Link className="button" to="/blog/:id">
              Read More
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default BlogCard;
