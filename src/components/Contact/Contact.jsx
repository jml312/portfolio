import React, { useEffect } from "react";
import ScrollAnimation from "react-animate-on-scroll";

import { closeSidebar } from "../../sidebarFunctions";
import Header from "../Header/Header";

function AlertMessage() {
  return (
    <div
      className="px-4 py-2 border rounded relative mt-5 text-base hidden"
      id="alert-message"
    >
      <strong className="font-bold ml-2" id="alert-boldTitle"></strong>
      &nbsp;&nbsp;
      <span className="block sm:inline" id="alert-regularTitle"></span>
    </div>
  );
}

function Contact() {
  useEffect(() => {
    document.querySelector("#contact-me").addEventListener(
      "invalid",
      function () {
        this.classList.add("check");
      },
      true
    );
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    document.getElementById("alert-message").classList.remove("hidden");
    document
      .getElementById("alert-message")
      .classList.add("bg-red-100", "border-red-400", "text-red-700");
    document.getElementById("alert-boldTitle").innerText = "Oh No!";
    document.getElementById("alert-regularTitle").innerText =
      "Please contact me at jml312@case.edu instead.";
  };

  return (
    <section
      id="Contact"
      className="h-auto min-h-screen object-contain text-white bg-bodyImage text-base sm:text-xl flex flex-col sm:flex-row justify-center items-center sm:ml-52 relative content"
      onClick={closeSidebar}
    >
      <Header text="Contact" />
      <div className="flex justify-center items-center py-12 sm:py-16 md:py-20">
        <ScrollAnimation
          animateIn="bounceIn"
          animateOnce={true}
          className="bg-formColor rounded-2xl overflow-hidden shadow-lg p-6 w-5/6 justify-evenly items-center flex flex-col lg:flex-row gap-10  h-auto mt-16 sm:mt-20 md:mt-24 mb-14"
        >
          <div className="text-white relative text-center">
            <h1 className="font-bold text-lg sm:text-2xl lg:text-3xl">
              Thanks for visiting my website!
            </h1>
            <br />
            <p className="text-base sm:text-lg lg:text-xl">
              I am always interested in collaborating on projects, and would
              love to hear from you <span className="text-2xl">👐</span>
            </p>
          </div>
          <form
            id="contact-me"
            className=" mx-auto sm:w-3/4  bg-white  p-8 text-gray-700 rounded-xl shadow-xl"
            onSubmit={handleSubmit}
          >
            <div className="flex flex-wrap mb-6 ">
              <div className="relative w-full appearance-none label-floating">
                <input
                  className="tracking-wide py-2 px-4 mb-3 leading-relaxed appearance-none block w-full bg-gray-200 border border-gray-200 rounded focus:outline-none focus:bg-white focus:border-gray-500"
                  id="name"
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  required
                />
                <label
                  htmlFor="name"
                  className="absolute tracking-wide py-2 px-4 mb-4 opacity-0 leading-tight block top-0 left-0 cursor-text"
                >
                  Full Name
                </label>
              </div>
            </div>
            <div className="flex flex-wrap mb-6">
              <div className="relative w-full appearance-none label-floating">
                <input
                  className="tracking-wide py-2 px-4 mb-3 leading-relaxed appearance-none block w-full bg-gray-200 border border-gray-200 rounded focus:outline-none focus:bg-white focus:border-gray-500"
                  id="email"
                  type="email"
                  name="email"
                  placeholder="Email"
                  required
                />
                <label
                  htmlFor="email"
                  className="absolute tracking-wide py-2 px-4 mb-4 opacity-0 leading-tight block top-0 left-0 cursor-text"
                >
                  Email
                </label>
              </div>
            </div>
            <div className="flex flex-wrap mb-6">
              <div className="relative w-full appearance-none label-floating">
                <textarea
                  className=" tracking-wide pb-12 pt-1 px-4 mb-3 leading-relaxed appearance-none block w-full bg-gray-200 border border-gray-200 rounded focus:outline-none focus:bg-white focus:border-gray-500"
                  id="message"
                  type="message"
                  name="message"
                  placeholder="Message..."
                  maxLength="315"
                  required
                />
                <label
                  htmlFor="message"
                  className="absolute tracking-wide py-2 px-4 mb-4 opacity-0 leading-tight block top-0 left-0 cursor-text"
                >
                  Message...
                </label>
              </div>
            </div>
            <div>
              <button
                className="w-full shadow bg-blue-400 hover:bg-teal-400 focus:shadow-outline focus:outline-none text-white font-bold -mt-2 py-2 px-4 rounded transform hover:scale-105"
                type="submit"
              >
                Send
              </button>
            </div>
            <AlertMessage />
          </form>
        </ScrollAnimation>
      </div>
    </section>
  );
}

export default Contact;
