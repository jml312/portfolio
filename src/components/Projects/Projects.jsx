import React from "react";
import ScrollAnimation from "react-animate-on-scroll";

import { closeSidebar } from "../../sidebarFunctions";
import Header from "../Header/Header";

function Projects() {
  return (
    <section
      id="Projects"
      className="text-white flex justify-center items-center sm:ml-52 relative content bg-bodyImage object-contain"
      onClick={closeSidebar}
    >
      <Header text="Projects" />
      <div className="flex flex-col lg:flex-row items-center justify-evenly text-black lg:gap-20 w-5/6 py-12 sm:py-16 md:py-20">
        <ScrollAnimation
          className="bg-white rounded-xl shadow-xl flex justify-center items-center flex-col sm:w-5/6 text-sm sm:text-lg p-2 py-3 text-center mt-16 sm:mt-20 md:mt-24"
          animateIn="zoomIn"
          animateOnce={true}
        >
          <div className="font-bold text-base sm:text-2xl pb-3">
            <h1>
              Finance Automation &nbsp;&nbsp;
              <i className="fas fa-money-bill-alt"></i>
            </h1>
            <h2>Python</h2>
          </div>
          <p className="pb-2 italic">
            Regularly updates user with net worth tracking report
          </p>
          <h1 className="p-2.5">Biggest Takeaway ➡️ Reading Documentation</h1>
          <div className="pb-4">
            <h2 className="underline">Accomplishments</h2>
            <ul className="list-inside list-disc grid grid-cols-1 grid-rows-3 text-left sm:place-items-start pb-2">
              <li className="">API Integration (Twilio, Plaid, Ameritrade)</li>
              <li className="">Google Sheet Automation</li>
              <li className="">SMTP Email Library</li>
            </ul>
          </div>
          <a
            className="text-left"
            href="https://github.com/jml312/Finance-Automation"
            target="_blank"
            rel="noreferrer"
          >
            See the Code &nbsp;
            <i className="fab fa-github"></i>
          </a>
        </ScrollAnimation>

        <ScrollAnimation
          className="bg-white rounded-xl shadow-xl flex justify-center items-center flex-col sm:w-5/6 text-sm sm:text-lg p-2 py-3 text-center mt-16 sm:mt-20 md:mt-24"
          animateIn="zoomIn"
          animateOnce={true}
        >
          <div className="font-bold text-base sm:text-2xl pb-3">
            <h1>
              2048 Game &nbsp;&nbsp;
              <i className="fas fa-chess-board"></i>
            </h1>
            <h2>Java</h2>
          </div>
          <p className="pb-2 italic">
            Merge matching tiles to increase your score
          </p>
          <h1 className="p-2.5">Biggest Takeaway ➡️ Code Organization</h1>
          <div className="pb-4">
            <h2 className="underline">Accomplishments</h2>
            <ul className="list-inside list-disc grid grid-cols-1 grid-rows-3 text-left sm:place-items-start pb-2">
              <li>Java Swing GUI</li>
              <li>JUnit 5 Testing</li>
              <li>Javadoc Comments</li>
            </ul>
          </div>
          <a
            className="text-left"
            href="https://github.com/jml312/Slide-Game"
            target="_blank"
            rel="noreferrer"
          >
            See the Code &nbsp;
            <i className="fab fa-github"></i>
          </a>
        </ScrollAnimation>
      </div>
    </section>
  );
}

export default Projects;
