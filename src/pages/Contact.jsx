import React from "react";
import ContactHero from "../components/website/contact/ContactHero";
import ContactForm from "../components/website/contact/ContactForm";
import ContactDetails from "../components/website/contact/ContactDetails";
import Navbar from "../components/website/globals/Navbar";
import Footer from "../components/website/globals/Footer";
import { Helmet, HelmetProvider } from "react-helmet-async";

const Contact = () => {
  return (
    <HelmetProvider>
      <>
        <Helmet>
          <title>Contact Us | IHS</title>
          <link rel="canonical" href="https://www.ihsmia.com/" />
        </Helmet>
        <>
          <Navbar />
          <ContactHero />
          <ContactForm />
          <ContactDetails />
          <Footer />
        </>
      </>
    </HelmetProvider>
  );
};

export default Contact;
