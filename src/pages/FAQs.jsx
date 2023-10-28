import React from "react";
import Faq from "../components/website/faq/Faq";
import FaqHero from "../components/website/faq/FaqHero";
import Navbar from "../components/website/globals/Navbar";
import Footer from "../components/website/globals/Footer";
import { Helmet, HelmetProvider } from "react-helmet-async";

const FAQs = () => {
  return (
    <HelmetProvider>
      <>
        <Helmet>
          <title>FAQs | IHS</title>
          <link rel="canonical" href="https://www.ihsmia.com/" />
        </Helmet>
        <>
          <Navbar />
          <FaqHero />
          <Faq />
          <Footer />
        </>
      </>
    </HelmetProvider>
  );
};

export default FAQs;
