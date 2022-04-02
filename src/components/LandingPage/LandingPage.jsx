import React from "react";
import { Link } from "react-router-dom";
import image from "../../assets/banner.svg";

import Logo from "../Logo/Logo";
import "./landingpage.css";

const LandingPage = () => {
  return (
    <>
      {" "}
      <div className="landing-page section__padding">
        <div className="landing-page_info">
          <h1>
            Welcome to <Logo />
          </h1>
          <p>
            Jobbo is a tool created to help persons keep track of their job
            applications.
          </p>
          <Link to="/auth">
            <button>Start Tracking</button>
          </Link>
        </div>
        <div className="landing-page_image">
          <img src={image} alt="Just an image" />
        </div>
      </div>
    </>
  );
};

export default LandingPage;
