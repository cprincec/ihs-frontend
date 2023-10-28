import React from "react";
import AboutHero from "../components/website/about/AboutHero";
import Objectives from "../components/website/about/Objectives";
import People from "../components/website/about/People";
import Navbar from "../components/website/globals/Navbar";
import Footer from "../components/website/globals/Footer";
import { Helmet, HelmetProvider } from "react-helmet-async";

const About = () => {
  return (
    <HelmetProvider>
      <>
        <Helmet>
          <title>About Us | IHS</title>
          <link rel="canonical" href="https://www.ihsmia.com/" />
        </Helmet>
        <>
          <Navbar />
          <AboutHero />
          <People />
          <Objectives />
          <Footer />
        </>
      </>
    </HelmetProvider>
  );
};

export default About;
