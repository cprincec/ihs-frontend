import React from "react";
import TermsHero from "../components/website/terms/TermsHero";
import Terms from "../components/website/terms/Terms";
import Footer from "../components/website/globals/Footer";
import Navbar from "../components/website/globals/Navbar";
import { Helmet, HelmetProvider } from "react-helmet-async";

const TermsConditions = () => {
  return (
    <HelmetProvider>
      <>
        <Helmet>
          <title>Terms and Conditions | IHS</title>
          <link rel="canonical" href="https://www.ihsmia.com/" />
        </Helmet>
        <>
          <Navbar />
          <TermsHero />
          <Terms />
          <Footer />
        </>
      </>
    </HelmetProvider>
  );
};

export default TermsConditions;
