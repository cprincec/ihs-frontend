import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "../../api/axios";
import TopBarProgress from "react-topbar-progress-indicator";
import Logo from "../../assets/images/logo.svg";
import { emailVerification } from "../../data/enums";

TopBarProgress.config({
  barColors: {
    0: "#05afb0",
  },
  shadowBlur: 5,
});

const EmailConfirmed = () => {
  const { confirmationCode } = useParams();

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [resend, setResend] = useState(false);

  const resendVerificationLink = async (e) => {
    e.preventDefault();

    setLoading(true);
    const token = window.location.pathname.slice(9);

    await axios
      .get(`/resendVerificationLink/${token}`)
      .then((res) => {
        setMessage(res.data.data);
        setResend(true);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    async function confirmEmail() {
      setLoading(true);

      await axios
        .get(`/confirm/${confirmationCode}`)
        .then((res) => {
          console.log(res);
          setMessage(res.data.data);
        })
        .catch((e) => {
          console.error(e);
          setMessage(e.message);
        })
        .finally(() => {
          setLoading(false);
        });
    }

    confirmEmail();
  }, [confirmationCode]);

  return (
    <>
      {loading && <TopBarProgress />}

      <div className="flex flex-col justify-center items-center py-4 pt-20 pb-20 relative">
        <a href="https://ihsmia.com">
          <img src={Logo} className="w-44 lg:w-56" alt="ihs-logo" />
        </a>
        <section className="rounded-md py-8 my-8 w-3/4 flex flex-col justify-center items-center shadow-md border-0 border-l-4 border-ihs-green-shade-500 text-slate-500 font-thin md:text-lg text-sm">
          {message && <h1 className="md:text-lg text-ihs-green">{message}</h1>}

          {message === emailVerification.Expired && (
            <>
              <p>
                Please click on the button to request a new verification link
              </p>
              <form
                onSubmit={resendVerificationLink}
                className="w-full flex justify-center"
              >
                <button
                  type="submit"
                  disabled={resend || loading}
                  className="px-4 py-2 w-1/2 mt-8 disabled:bg-ihs-green-shade-200 disabled:text-slate-600 disabled:border-slate-200 bg-ihs-green focus:outline-none focus:ring-2 focus:ring-ihs-green-shade-500"
                >
                  Resend Link
                </button>
              </form>
            </>
          )}

          {message === emailVerification.Resent && (
            <p className=" px-10 py-4 text-slate-500 font-thin md:text-lg text-xs">
              Please check your email inbox (including junk/spam folder) for new
              verification link.
            </p>
          )}

          {message === emailVerification.Invalid && (
            <>
              <p>
                Verification link is invalid. Please click the button to sign up
              </p>
              <button
                disabled={loading}
                className="px-4 py-2 w-1/2 mt-8 disabled:bg-ihs-green-shade-200 disabled:text-slate-600 disabled:border-slate-200 bg-ihs-green focus:outline-none focus:ring-2 focus:ring-ihs-green-shade-500"
              >
                <Link to="/signup">Sign Up</Link>
              </button>
            </>
          )}

          {message === emailVerification.Confirmed && (
            <p className="text-lg py-2">
              Proceed to{" "}
              <span className="text-ihs-green hover:underline">
                <Link to="/">Sign In</Link>
              </span>
            </p>
          )}
        </section>
      </div>
    </>
  );
};

export default EmailConfirmed;
