import React from "react";
import PrivacyHero from "../components/website/privacy/PrivacyHero";
import Privacy from "../components/website/privacy/Privacy";
import Navbar from "../components/website/globals/Navbar";
import Footer from "../components/website/globals/Footer";
import { Helmet, HelmetProvider } from "react-helmet-async";

const PrivacyPolicy = () => {
  return (
    <HelmetProvider>
      <>
        <Helmet>
          <title>Privacy Policy | IHS</title>
          <link rel="canonical" href="https://www.ihsmia.com/" />
        </Helmet>
        <>
          <Navbar />
          <PrivacyHero />
          <Privacy />
          <Footer />
        </>
      </>
    </HelmetProvider>
  );
};

export default PrivacyPolicy;
