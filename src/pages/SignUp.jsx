import React from "react";
import SignUpPage from "../components/website/globals/SignUpPage";
import { Helmet, HelmetProvider } from "react-helmet-async";

const SignUp = () => {
  return (
    <HelmetProvider>
      <>
        <Helmet>
          <title>Sign Up | IHS</title>
          <link rel="canonical" href="https://www.ihsmia.com/" />
        </Helmet>
        <>
          <SignUpPage />
        </>
      </>
    </HelmetProvider>
  );
};

export default SignUp;
