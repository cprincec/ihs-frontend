import React from "react";
import { PhoneIcon, MailIcon } from "@heroicons/react/outline";

const ContactDetails = () => {
  return (
    <div className="md:pt-40 py-20 bg-gray-100">
      <div className="max-w-[1240] mx-auto md:pb-20">
        <div className="flex justify-center items-start">
          <h2 className="md:text-5xl text-3xl font-semibold pb-2 mb-10 text-gray-800 border-b-2 border-b-ihs-green rounded-lg">
            Contact Details
          </h2>
        </div>
        <div className="md:mx-10 xl:mx-20 my-10">
          <div className="grid md:grid-cols-2">
            <div className="border px-6 py-12 mx-4 my-6 rounded-xl shadow-md bg-white">
              <PhoneIcon className="md:w-16 w-12 md:p-4 p-2.5 bg-ihs-green text-white rounded-lg mt-[-4rem]" />
              <h3 className="font-semibold text-2xl md:text-2xl my-4">
                Phone Number(s)
              </h3>
              <p className="text-xl py-4">+1 (613) 491 2197</p>
            </div>
            <div className="border px-6 py-12 mx-4 my-6 rounded-xl shadow-md bg-white">
              <MailIcon className="md:w-16 w-12 md:p-4 p-2.5 bg-ihs-green text-white rounded-lg mt-[-4rem]" />
              <h3 className="font-semibold text-2xl md:text-3xl my-4">
                Email Us
              </h3>
              <p className="text-xl py-4">
                <a href="mailto:support@ihsmia.com">support@ihsmia.com</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactDetails;
