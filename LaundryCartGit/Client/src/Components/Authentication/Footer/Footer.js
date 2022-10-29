import React from "react";
import "./FooterAuth.css";
import SmallFooter from "./smallFooter";



const Footer = () => {
  return (
    <>
      <hr className="referral-hr"></hr>
      <div className="referral-div">
        <h3 className="referral-h3">
          Now Refer & Earn <span>&#8377;</span>500 for every referral*
        </h3>
        <p className="referral-p">*Terms and Conditions will be applied</p>
      </div>
      <div
        style={{
          backgroundImage: `url('/assets/Footer.svg')`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          top: "0px",
        }}
        className="footer-container"
      >
        <div className="footer-section footer-aboutUs">
          <p style={{ fontSize: "18px" }}>ABOUT US</p>
          <p className="footer-light-text">Doorstep Wash & Dryclean Service</p>
        </div>
        <div className="footer-section footer-home">
          <p style={{ fontSize: "16px" }}>Home</p>
          <p className="footer-light-text">Sign In</p>
          <p className="footer-light-text">Register</p>
        </div>
        <div className="footer-section footer-pricing">
          <p style={{ fontSize: "16px" }}>Pricing</p>
        </div>
        <div className="footer-section footer-career">
          <p style={{ fontSize: "16px" }}>Career</p>
          <p className="footer-light-text">Blogs</p>
          <p className="footer-light-text">Create</p>
        </div>
        <div className="footer-section footer-contacts">
          <p style={{ fontSize: "16px" }}>Contact</p>
        </div>
        <div className="footer-section footer-social">
          <p style={{ fontSize: "18px" }}>SOCIAL MEDIA</p>
          <div className="footer-icon-div">
            <img className="footer-icon" alt="" src="/assets/facebook.svg" />
            <img className="footer-icon" alt="" src="/assets/instagram.svg" />
            <img className="footer-icon" alt="" src="/assets/linkedin.svg" />
          </div>
        </div>
      </div>
     <SmallFooter/>
    </>
  );
};
export default Footer;
