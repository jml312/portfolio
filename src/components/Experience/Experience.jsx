import React from "react";
import ScrollAnimation from "react-animate-on-scroll";

import { closeSidebar } from "../../sidebarFunctions";
import Header from "../Header/Header";
import BCL from "./images/BCL.png";
import Butcher from "./images/Butcher.png";
import CWRU from "./images/cwru.png";
import Edifice from "./images/Edifice.png";
import JustPlaySports from "./images/justplaysports.png";
import Scarlet from "./images/scarlet.png";

function ExperienceCard({
  jobTitle,
  companyName,
  imgSrc,
  alt,
  companyDescription,
  listItems,
  date,
  location,
  order,
  fadeAnimation,
  move,
  colStart,
  rowStart,
  overflowTextSmall,
  overflowTextBig,
}) {
  return (
    <ScrollAnimation
      animateIn={fadeAnimation}
      animateOnce={true}
      className={
        "relative bg-white text-black w-5/6  h-5/6 rounded-2xl text-center border shadow-xl flex justify-center items-center flex-col mt-16 sm:mt-20 md:mt-24 lg:col-span-2 lg:order-" +
        order +
        " lg:col-start-" +
        colStart +
        " lg:row-start-" +
        rowStart
      }
    >
      <div className="absolute top-5 border-b border-gray-400 w-10/12">
        <img
          className="h-20 w-30 object-contain inline-block"
          src={imgSrc}
          alt={alt}
        />
        <h1
          className={
            "tracking-tight text-sm sm:text-lg font-normal mt-3 pb-1 pt-0.5 " +
            overflowTextSmall +
            " " +
            overflowTextBig
          }
        >
          {companyName}
          <br />
          <span className="font-semibold">{jobTitle}</span>
        </h1>
      </div>
      <p
        className={
          "text-xs sm:text-sm md:text-base font-normal pt-48 sm:pt-48 pb-2 lg:pt-" +
          move
        }
      >
        {companyDescription}
      </p>
      <ul className="text-xs sm:text-sm md:text-base ml-4 p-2 pb-12">
        {listItems.map((listItem) => {
          return (
            <li
              className="ml-3 text-left list-outside list-disc font-normal"
              key={listItem.key}
            >
              {listItem.li}
            </li>
          );
        })}
      </ul>
      <h4 className=" text-xs font-normal md:text-base absolute bottom-3 text-center">
        &nbsp;{date}&nbsp;|&nbsp;
        {location}&nbsp;
      </h4>
    </ScrollAnimation>
  );
}

function Experience() {
  return (
    <section
      id="Experience"
      className="text-white text-xl h-auto relative sm:ml-52 content bg-bodyImage object-contain font-skillText"
      onClick={closeSidebar}
    >
      <Header text="Experience" />
      <div className=" flex lg:flex-none justify-start items-center flex-col lg:grid lg:grid-flow-col lg:grid-cols-4 lg:grid-rows-4 lg:place-items-center  overflow-hidden py-12 sm:py-16 md:py-20">
        <ExperienceCard
          href=""
          imgSrc={BCL}
          alt="BioChip Image"
          jobTitle="Data Analyst Intern"
          companyName="BioChip Labs"
          companyDescription="A biotech research and development company"
          listItems={[
            {
              key: 1,
              li:
                "Collaborated with website developers to fulfill business needs",
            },
            {
              key: 2,
              li:
                "Performed market research on potential client Hospitals that treat Sickle Cell Anemia",
            },
            {
              key: 3,
              li:
                "Composed 10 marketing spec sheets in Canva to publicly showcase company’s medical products",
            },
          ]}
          date="Spring 2021"
          location="Cleveland, Ohio"
          fadeAnimation="fadeInLeftBig"
          order="first"
        />
        <ExperienceCard
          href="https://case.edu/"
          imgSrc={CWRU}
          alt="CWRU Image"
          jobTitle="Data Structures Teaching Assistant"
          companyName="Case Western Reserve University"
          companyDescription="A leading research institution"
          listItems={[
            {
              key: 1,
              li:
                "Created a two-week long Data Structure programming assignment for Freshman and Sophomores",
            },
            {
              key: 2,
              li: "Provided 2 hours a week of tutoring in Java language",
            },
            {
              key: 3,
              li:
                "Coordinated with other Teaching Assistants to grade 120+ bi-weekly assignments and exams",
            },
          ]}
          date="Spring 2021"
          location="Cleveland, Ohio"
          order="3"
          fadeAnimation="fadeInRightBig"
          overflowTextSmall="text-experienceOverflowSmall"
          overflowTextBig="sm:text-experienceOverflowBig"
        />
        <ExperienceCard
          href="https://case.edu/"
          imgSrc={CWRU}
          alt="CWRU Image"
          jobTitle="MATLAB Teaching Assistant"
          companyName="Case Western Reserve University"
          companyDescription="A leading research institution"
          listItems={[
            {
              key: 1,
              li:
                "Provided tutoring in the MATLAB programming language for freshman students",
            },
            {
              key: 2,
              li: "Graded weekly assignments for 50+ students in the class",
            },
          ]}
          date="Fall 2021"
          location="Cleveland, Ohio"
          fadeAnimation="fadeInLeftBig"
          move="36"
        />
        <ExperienceCard
          href="https://edificeanalytics.com/"
          imgSrc={Edifice}
          alt="Edifice Image"
          jobTitle="Market Analysis Intern"
          companyName="Edifice Analytics"
          companyDescription="A commercial building energy audits and portfolio company"
          listItems={[
            {
              key: 1,
              li:
                "Conducted a search for 100+ viable contact leads for the company",
            },
            {
              key: 2,
              li:
                "Managed the tracking of project objectives and progress in weekly team meetings",
            },
            {
              key: 3,
              li:
                "Performed detailed research on companies offering similar competitive services",
            },
          ]}
          date="Fall 2021"
          location="Cleveland, Ohio"
          fadeAnimation="fadeInRightBig"
          move="48"
          order="3"
        />
        <ExperienceCard
          href="https://www.scarletcapital.com/"
          imgSrc={Scarlet}
          alt="Scarlet Capital Image"
          jobTitle="Property Investment Intern"
          companyName="Scarlet Capital"
          companyDescription="A private real estate and venture capital holding entity"
          listItems={[
            {
              key: 1,
              li:
                "Scouted prospective properties to potentially add to the company’s portfolio",
            },
            {
              key: 2,
              li:
                "Created pitch presentations for investors highlighting affordable housing projects",
            },
          ]}
          date="Summer 2020"
          location="Houston, Texas"
          fadeAnimation="fadeInLeftBig"
          move="40"
        />
        <ExperienceCard
          href="https://www.facebook.com/JustPlaySportsHouston/"
          imgSrc={JustPlaySports}
          alt="JPS Image"
          jobTitle="Assistant Basketball Coach"
          companyName="Just Play Sports"
          companyDescription="A basketball training facility"
          listItems={[
            {
              key: 1,
              li:
                "Helped operate several areas of a basketball camp with 100+ campers",
            },
            {
              key: 2,
              li:
                "Gained insight into the logistics of operating a small business",
            },
          ]}
          date="Summer 2019"
          location="Houston, Texas"
          fadeAnimation="fadeInRightBig"
          order="last"
          move="36"
        />
        <ExperienceCard
          href="http://www.butcherfin.com/"
          imgSrc={Butcher}
          alt="Butcher Image"
          jobTitle="Financial Analysis Intern"
          companyName="Butcher Financial"
          companyDescription="A private investing and asset allocation"
          listItems={[
            {
              key: 1,
              li:
                "Engaged in finance and market-based learning through Excel projects",
            },
            {
              key: 2,
              li:
                "Partnered with fellow classmates to collaborate on learning initiatives over a 3-week program",
            },
          ]}
          date="Spring 2019"
          location="Houston, Texas"
          fadeAnimation="fadeInLeftBig"
          order="1"
          move="40"
          colStart="2"
          rowStart="4"
        />
      </div>
    </section>
  );
}

export default Experience;
