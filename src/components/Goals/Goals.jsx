import React from "react";
import ScrollAnimation from "react-animate-on-scroll";

import { closeSidebar } from "../../sidebarFunctions";
import Header from "../Header/Header";

function ListItem({ checked, item, date, current }) {
  return (
    <ScrollAnimation animateIn="fadeInUp" animateOnce={true}>
      <li className={checked ? "checked pb-1" : "pb-1"}>
        <input type="checkbox" />
        <label>
          {item} <span className="text-sm">{date}</span>
        </label>
        <span className={current ? "current" : "input"}></span>
      </li>
    </ScrollAnimation>
  );
}

function Goals() {
  return (
    <section
      id="Goals"
      className="text-white text-xl flex justify-center items-center h-auto sm:ml-52 relative overflow-hidden content bg-bodyImage"
      onClick={closeSidebar}
    >
      <Header text="Goals" />
      <ScrollAnimation
        animateIn="fadeInUp"
        animateOnce={true}
        className="mt-16 sm:mt-20 md:mt-24"
      >
        <div className="flex justify-center items-center text-white website_checklist w-full py-12 sm:py-16 md:py-20">
          <div className="bg-white rounded-xl shadow-xl text-black p-2 pb-4 checklist_header w-3/4 sm:pl-2 pr-8">
            <ul>
              <ListItem item="Learn React" date="February 2021" checked />
              <ListItem item="Learn Typescript" date="February 2021" checked />
              <ListItem item="Learn Node" date="March 2021" checked />
              <ListItem item="Learn MongoDB" date="April 2021" checked />
              <ListItem
                item="Cooking app using MERN stack"
                date="June 2021"
                current
              />
              <ListItem item="Learn Next JS" date="June 2021" />
              <ListItem
                item="Basketball Workout App With Next and MongoDB"
                date="May 2021"
              />
              <ListItem item="Write a Medium Article" date="August 2021" />
            </ul>
          </div>
        </div>
      </ScrollAnimation>
    </section>
  );
}

export default Goals;
