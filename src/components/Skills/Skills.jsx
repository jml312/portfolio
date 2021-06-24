import React from "react";
import { closeSidebar } from "../../sidebarFunctions";
import ScrollAnimation from "react-animate-on-scroll";

import Header from "../Header/Header";
import {
  Bootstrap,
  CPP,
  CSS,
  Figma,
  Firebase,
  Git,
  HAML,
  HTML,
  Java,
  JavaScript,
  MATLAB,
  Node,
  Python,
  react,
  SASS,
  Tailwind,
  ts,
  Mongo,
  Django,
  sp,
} from "./index.js";

function SkillCard({ title, images }) {
  return (
    <ScrollAnimation
      animateIn="zoomIn"
      animateOnce={true}
      className="bg-white  w-5/6 sm:w-4/6 rounded-2xl  flex justify-center items-center flex-wrap text-black shadow-xl mt-16 sm:mt-20 md:mt-24"
    >
      <div className="w-11/12 text-center font-semibold">
        <h1 className="border-b-2 border-skillTextColor pt-2 pb-0.5 text-2xl sm:text-3xl">
          {title}
        </h1>
      </div>
      {images.map((image) => {
        return (
          <div
            className="p-5 flex justify-evenly items-center flex-col ml-1 sm:ml-2"
            key={image.key}
          >
            <img
              className="w-12 md:w-14 lg:w-16 h-auto flex-wrap"
              src={image.src}
              alt={image.alt}
            ></img>
            <h4 className="text-base sm:text-lg">{image.title}</h4>
          </div>
        );
      })}
    </ScrollAnimation>
  );
}

const skillCards = [
  {
    key: 1,
    title: "HTML",
    images: [
      {
        key: 1,
        src: HTML,
        alt: "HTML5",
        title: "HTML5",
      },
      {
        key: 2,
        src: react,
        alt: "JSX",
        title: "JSX",
      },
      {
        key: 3,
        src: HAML,
        alt: "Haml",
        title: "Haml",
      },
    ],
  },
  {
    key: 2,
    title: "CSS",
    images: [
      {
        key: 1,
        src: CSS,
        alt: "CSS3",
        title: "CSS3",
      },
      {
        key: 2,
        src: Tailwind,
        alt: "Tailwind",
        title: "Tailwind",
      },
      {
        key: 3,
        src: Bootstrap,
        alt: "Bootstrap",
        title: "Bootstrap",
      },
      {
        key: 4,
        src: SASS,
        alt: "SASS",
        title: "SASS",
      },
    ],
  },
  {
    key: 3,
    title: "JavaScript",
    images: [
      {
        key: 1,
        src: JavaScript,
        alt: "JavaScript",
        title: "JavaScript",
      },
      {
        key: 2,
        src: ts,
        alt: "TypeScript",
        title: "TypeScript",
      },
      {
        key: 4,
        src: react,
        alt: "React",
        title: "React",
      },
    ],
  },
  {
    key: 4,
    title: "Back End",
    images: [
      {
        key: 1,
        src: Firebase,
        alt: "Firebase",
        title: "Firebase",
      },
      {
        key: 2,
        src: Node,
        alt: "Node",
        title: "Node",
      },
      {
        key: 3,
        src: Mongo,
        alt: "MongoDB",
        title: "MongoDB",
      },
    ],
  },
  {
    key: 5,
    title: "Other",
    images: [
      {
        key: 1,
        src: Python,
        alt: "Python",
        title: "Python",
      },
      {
        key: 2,
        src: Java,
        alt: "Java",
        title: "Java",
      },
      {
        key: 3,
        src: CPP,
        alt: "C++",
        title: "C++",
      },
      {
        key: 4,
        src: MATLAB,
        alt: "Matlab",
        title: "MATLAB",
      },
      {
        key: 5,
        src: Django,
        alt: "Django",
        title: "Django",
      },
      {
        key: 8,
        src: sp,
        alt: "Squarespace",
        title: "Squarespace",
      },
      {
        key: 6,
        src: Git,
        alt: "Git",
        title: "Git",
      },
      {
        key: 7,
        src: Figma,
        alt: "Figma",
        title: "Figma",
      },
    ],
  },
];

function Skills() {
  return (
    <section
      id="Skills"
      className="text-white  h-auto sm:ml-52 relative overflow-auto content bg-bodyImage object-contain font-skillText"
      onClick={closeSidebar}
    >
      <Header text="Skills" />
      <div className="flex justify-center items-center flex-col flex-wrap  space-y-12 py-12 sm:py-16 md:py-20 overflow-y-hidden ">
        {skillCards.map((skillCard) => {
          return (
            <SkillCard
              title={skillCard.title}
              images={skillCard.images}
              key={skillCard.key}
            />
          );
        })}
      </div>
    </section>
  );
}

export default Skills;
