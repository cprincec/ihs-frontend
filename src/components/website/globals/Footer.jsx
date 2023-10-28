import React from "react";

import Logo from "../../../assets/images/logo.svg";
import { Link, useNavigate } from "react-router-dom";
import Instagram from "../../../assets/images/instagram.svg";
import Twitter from "../../../assets/images/twitter.svg";
import Facebook from "../../../assets/images/facebook.svg";
import LinkedIn from "../../../assets/images/linkedin.svg";

const Footer = () => {
  const navigate = useNavigate();

  return (
    <div className="border-t-2 border-gray-200">
      <div className="bg-gray-100 py-10">
        <div className="grid md:grid-cols-4 px-4 space-y-10 md:space-y-0">
          <div className="">
            <img src={Logo} alt="ihs logo" className="w-44" />
          </div>

          <div className="md:ml-4">
            <p className="capitalize text-xl font-semibold text-slate-600 py-4 md:pt-0">
              Next Steps
            </p>
            <div className="flex flex-col w-44 space-y-2">
              <button
                className="p-4 text-lg shadow-md md:w-44 text-base"
                onClick={() => {
                  navigate("/signup");
                }}
              >
                Get Started
              </button>
              <button
                className="bg-ihs-blue p-4 text-lg shadow-md hover:text-ihs-blue hover:border-ihs-blue text-base"
                onClick={() => {
                  navigate("/");
                }}
              >
                Sign In
              </button>
            </div>
          </div>

          <div className="md:ml-4">
            <p className="capitalize text-xl font-semibold text-slate-600 py-4 md:pt-0">
              Help & Support
            </p>
            <div className="flex flex-col w-44 space-y-2 text-lg text-slate-400">
              <p>
                <Link to="/contact" className="text-slate-400 text-base">
                  Contact Us
                </Link>
              </p>
              <p>
                <Link to="/faqs" className="text-slate-400 text-base">
                  FAQs
                </Link>
              </p>
              <p>
                <a href="tel:+1 (613) 491-2197" className="text-base">
                  {" "}
                  +1 (613) 491-2197{" "}
                </a>
              </p>
              <p>
                <a href="mailto:support@ihsmia.com" className="text-base">
                  {" "}
                  support@ihsmia.com{" "}
                </a>
              </p>
            </div>
          </div>

          <div className="md:ml-4">
            <p className="capitalize text-xl font-semibold text-slate-600 py-4 md:pt-0">
              Legal
            </p>
            <div className="flex flex-col w-44 space-y-2 text-lg text-slate-400">
              <p>
                <Link to="/terms" className="text-slate-400 text-base">
                  Terms of Use
                </Link>
              </p>
              <p>
                <Link to="/privacy-policy" className="text-slate-400 text-base">
                  Privacy Policy
                </Link>
              </p>
              <p className="flex">
                <span>
                  <a href="https://www.instagram.com/ihsmia/">
                    <img src={Instagram} className="" alt="instagram" />
                  </a>
                </span>
                <span>
                  <a href="https://twitter.com/IHSMIA">
                    <img src={Twitter} className="" alt="twitter" />
                  </a>
                </span>
                <span>
                  <a href="https://www.facebook.com/IHSMIA">
                    <img src={Facebook} className="" alt="facebook" />
                  </a>
                </span>
                <span>
                  <a href="https://www.linkedin.com/company/ihsmia">
                    <img src={LinkedIn} className="" alt="linkedIn" />
                  </a>
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
