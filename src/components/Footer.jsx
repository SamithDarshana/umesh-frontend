import React from "react";
import { Link } from "react-router-dom";
import { FaLinkedin, FaYoutubeSquare, FaGithubSquare, FaInstagramSquare } from "react-icons/fa";



const Footer = () => {
  return (
    <>
      <div className="footer-container">
        <div className="footer-overlay">
          <footer className="py-4 footer-top">
            <div className="container-xxl">
              <div className="row align-items-center">
                <div className="col-4">
                  <div className="footer-top-data d-flex gap-30 align-items-center">
                    <img src="images/newsletter.png" alt="newsletter"/>
                    <h3 className="mb-0 text-white">Sign Up For News Letter</h3>
                  </div>
                </div>
                <div className="col-8">
                  <div className="input-group">
                    <input
                        type="text"
                        className="form-control py-1"
                        placeholder="Your Email Address"
                        aria-label="Your Email Address"
                        aria-describedby="basic-addon2"
                    />
                    <span className="input-group-text py-2" id="basic-addon2">
                  Subscribe
                </span>
                  </div>
                </div>
              </div>
            </div>
          </footer>
          <footer className="py-4 footer-middle">
            <div className="container-xxl ">
              <div className="row ">
                <div className="col-3 ">
                  <h4 className="text-white mb-4">Contact Us</h4>
                  <div>
                    <address className="text-white fs-6">
                      Umesh Mobile,
                      <br/> No. 45, Colombo Rd, <br/>
                      Badulla
                    </address>
                  </div>
                  <a
                      href="tel: (+94) 76 88 58 292"
                      className="mt-2 text-white d-block mb-1"
                  >
                    (+94) 76 88 58 292
                  </a>
                  <a
                      href="mail to: umeshmobile@gmail.com"
                      className="mt-3 text-white d-block mb-0"
                  >
                    umeshmobile@gmail.com
                  </a>
                  <div className="social_icons d-flex align-items-center gap-30 mt-4">
                    <a className='text-white' href="/">
                      <FaYoutubeSquare className=" fs-4"/>
                    </a>
                    <a className='text-white' href="/">
                      <FaGithubSquare className=" fs-4"/>
                    </a>
                    <a className='text-white' href="/">
                      <FaInstagramSquare className=" fs-4"/>
                    </a>
                    <a className='text-white' href="/">
                      <FaLinkedin className=" fs-4"/>
                    </a>
                  </div>
                </div>
                <div className="col-3 ">
                  <h4 className="text-white mb-4">Information</h4>
                  <div>
                    <div className="footer-links d-flex flex-column">
                      <Link to="/privacy-policy" className="text-white py-2 mb-1">Privact Policy</Link>
                      <Link to="/refund-policy" className="text-white py-2 mb-1">refund Policy</Link>
                      <Link to="/shipping-policy" className="text-white py-2 mb-1">Shipping Policy</Link>
                      <Link to="/terms-and-conditions" className="text-white py-2 mb-1">
                        Terms & Conditions
                      </Link>
                      <Link to="/blogs" className="text-white py-2 mb-1">Blogs</Link>
                    </div>
                  </div>
                </div>
                <div className="col-3 ">
                  <h4 className="text-white mb-4">Acoount</h4>
                  <div>
                    <div className="footer-links d-flex flex-column">
                      <Link to="/" className="text-white py-2 mb-1">About Us</Link>
                      <Link to="/" className="text-white py-2 mb-1">Faq</Link>
                      <Link to="/contact" className="text-white py-2 mb-1">Contact</Link>
                    </div>
                  </div>
                </div>
                <div className="col-3 ">
                  <h4 className="text-white mb-4">Quick Links</h4>
                  <div className="footer-links d-flex flex-column">
                    <Link to="/" className="text-white py-2 mb-1">Laptops</Link>
                    <Link to="/" className="text-white py-2 mb-1">Headphone</Link>
                    <Link to="/" className="text-white py-2 mb-1">Tablets</Link>
                    <Link to="/" className="text-white py-2 mb-1">Watches</Link>
                  </div>
                </div>
              </div>
            </div>
          </footer>
          <footer className="py-3 footer-bottom">
            <div className="container-xxl">
              <div className="row">
                <div className="col-12">
                  <p className="text-center mb-0 text-white">
                    &copy; {new Date().getFullYear()}; Powered By Fantastic
                  </p>
                </div>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </>
  );
};

export default Footer;
