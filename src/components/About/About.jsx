import GraphemeSplitter from "grapheme-splitter";
import React, { useEffect, useState } from "react";
import Typewriter from "typewriter-effect";
import Landing from "./Landing.mp4";
import { closeSidebar } from "../../sidebarFunctions";

const currentGrade = "Junior";

const stringSplitter = (string) => {
  const splitter = new GraphemeSplitter();
  return splitter.splitGraphemes(string);
};

function Intro() {
  const [show, setShow] = useState(true);
  useEffect(() => {
    window.addEventListener("scroll", () => {
      setShow(false);
      if (document.getElementById("scroll-arrow") !== null) {
        document.getElementById("scroll-arrow").remove();
      }
    });
    return () => {
      window.removeEventListener("scroll", () => {});
    };
  }, []);

  return (
    <section
      id="About"
      className="text-black font-introText flex justify-center items-center relative overflow-hidden min-h-screen sm:ml-52 sm:mb-0 content"
      onClick={closeSidebar}
    >
      <video
        autoPlay
        loop
        muted
        src={Landing}
        type="video/mp4"
        className="h-full w-full absolute top-0 left-0 object-cover"
      ></video>
      <div className="absolute top-1/4 -mt-10 sm:-mt-20 text-white flex justify-center items-center text-center flex-col z-40 text-mobile sm:text-wide">
        <Typewriter
          options={{
            delay: 33,
            stringSplitter,
          }}
          onInit={(typewriter) => {
            typewriter
              .pauseFor(1000)
              .typeString(
                `<strong class="leading-tall">Welcome 🚀 </strong><br>`
              )
              .pauseFor(750)
              .typeString(
                `<strong class="leading-tall">My name is <span class="bg-gray-600 rounded-full py-1 px-2.5">Josh Levy</span></strong>`
              )
              .pauseFor(750)
              .typeString(
                `<br><strong class="leading-tall">I'm a ${currentGrade} at <span class="bg-gray-600  rounded-full py-1 px-2.5">Case Western Reserve University</span></strong>`
              )
              .pauseFor(750)
              .typeString(
                `<br><strong class="leading-tall">majoring in <span class="bg-gray-600   rounded-full py-1 px-2.5">Computer Science</span></strong>`
              )
              .pauseFor(750)
              .typeString(
                `<br><strong class="leading-tall">with a minor in <span class="bg-gray-600   rounded-full py-1 px-2.5">Data Science</span></strong>`
              )
              .pauseFor(750)
              .typeString(
                `<br><strong class="leading-tall">I strive to create <span class="bg-gray-600  rounded-full py-1 px-2.5">impactful</span> web experiences</strong>`
              )
              .callFunction(() => {
                if (show && document.getElementById("scroll-arrow") !== null) {
                  document
                    .getElementById("scroll-arrow")
                    .classList.remove("invisible");
                }
              })
              .start();
          }}
        />
      </div>
      <div className="absolute bottom-4 right-8 invisible" id="scroll-arrow">
        <i className="fas fa-arrow-down animate-bounce text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl"></i>
      </div>
    </section>
  );
}

export default Intro;
