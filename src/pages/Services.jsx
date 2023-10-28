import React from "react";
import ServiceHero from "../components/website/services/ServiceHero";
import PrimaryCare from "../components/website/services/PrimaryCare";
import SecondaryCare from "../components/website/services/SecondaryCare";
import Navbar from "../components/website/globals/Navbar";
import Footer from "../components/website/globals/Footer";
import { Helmet, HelmetProvider } from "react-helmet-async";

const Services = () => {
  return (
    <HelmetProvider>
      <>
        <Helmet>
          <title>Services | IHS</title>
          <link rel="canonical" href="https://www.ihsmia.com/" />
        </Helmet>
        <>
          <Navbar />
          <ServiceHero />
          <PrimaryCare />
          <SecondaryCare />
          <Footer />
        </>
      </>
    </HelmetProvider>
  );
};

export default Services;
