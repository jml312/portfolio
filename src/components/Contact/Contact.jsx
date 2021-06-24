import React, { useEffect, useRef, useState } from "react";
import ScrollAnimation from "react-animate-on-scroll";
import ReCAPTCHA from "react-google-recaptcha";

import { Axios, db } from "../../firebase/firebaseConfig";
import { closeSidebar } from "../../sidebarFunctions";
import Header from "../Header/Header";

async function validateHuman(token) {
  const secret = process.env.REACT_APP_RECAPTCHA_SECRET_KEY;
  await fetch(
    `https://www.google.com/recaptcha/api/siteverify?secret=${secret}&response=${token}`,
    {
      method: "POST",
    }
  )
    .then((response) => response.json())
    .then((data) => {
      return data.success;
    })
    .catch((error) => {
      return false;
    });
}

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
    return () => {};
  }, []);

  const [formData, setFormData] = useState({});
  const reRef = useRef();

  const updateInput = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const token = await reRef.current.executeAsync();
    reRef.current.reset();
    const human = await validateHuman(token);
    if (!human) {
      document.getElementById("alert-message").classList.remove("hidden");
      document
        .getElementById("alert-message")
        .classList.add("bg-red-100", "border-red-400", "text-red-700");
      document.getElementById("alert-boldTitle").innerText = "Oh No!";
      document.getElementById("alert-regularTitle").innerText =
        "Please contact me at jml312@case.edu instead.";
    } else {
      sendEmail();
      setFormData({
        name: "",
        email: "",
        message: "",
      });
    }
  };

  const sendEmail = async () => {
    Axios.post(
      "https://us-central1-portfolio-d4c23.cloudfunctions.net/submit",
      formData,
      { headers: { "Access-Control-Allow-Origin": "*" } }
    )
      .then(() => {
        db.collection("contacts").add({
          name: formData.name,
          email: formData.email,
          message: formData.message,
          time: new Date(),
        });
      })
      .then(() => {
        document.getElementById("alert-message").classList.remove("hidden");
        document
          .getElementById("alert-message")
          .classList.add("bg-green-100", "border-green-400", "text-green-700");
        document.getElementById("alert-boldTitle").innerText = "Success 🎉";
        document.getElementById("alert-regularTitle").innerText =
          "I'll get back to you shortly.";
      })
      .catch(() => {
        document.getElementById("alert-message").classList.remove("hidden");
        document
          .getElementById("alert-message")
          .classList.add("bg-red-100", "border-red-400", "text-red-700");
        document.getElementById("alert-boldTitle").innerText = "Oh No!";
        document.getElementById("alert-regularTitle").innerText =
          "Please contact me at jml312@case.edu instead.";
      });
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
                  onChange={updateInput}
                  value={formData.name || ""}
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
                  onChange={updateInput}
                  value={formData.email || ""}
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
                  onChange={updateInput}
                  value={formData.message || ""}
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
        <ReCAPTCHA
          sitekey={process.env.REACT_APP_RECAPTCHA_SITE_KEY}
          size="invisible"
          className="absolute bottom-0 left-auto right-auto lg:bottom-5 lg:right-5 z-50 mb-5 lg:mb-0"
          badge="inline"
          ref={reRef}
        />
      </div>
    </section>
  );
}

export default Contact;
