import React, { useEffect } from "react";

import { closeSidebar, openSidebar } from "../../sidebarFunctions";
import Profile from "./profile.png";

function isVisible(elem) {
  const style = getComputedStyle(elem);
  if (style.display === "none") return false;
  if (style.visibility !== "visible") return false;
  if (style.opacity < 0.1) return false;
  if (
    elem.offsetWidth +
      elem.offsetHeight +
      elem.getBoundingClientRect().height +
      elem.getBoundingClientRect().width ===
    0
  ) {
    return false;
  }
  const elemCenter = {
    x: elem.getBoundingClientRect().left + elem.offsetWidth / 2,
    y: elem.getBoundingClientRect().top + elem.offsetHeight / 2,
  };
  if (elemCenter.x < 0) return false;
  if (
    elemCenter.x > (document.documentElement.clientWidth || window.innerWidth)
  )
    return false;
  if (elemCenter.y < 0) return false;
  if (
    elemCenter.y > (document.documentElement.clientHeight || window.innerHeight)
  )
    return false;
  let pointContainer = document.elementFromPoint(elemCenter.x, elemCenter.y);
  do {
    if (pointContainer === elem) return true;
  } while ((pointContainer = pointContainer.parentNode));
  return false;
}

function SiteLink({ sectionID, icon, name }) {
  return (
    <a href={sectionID}>
      <li className="site-link hover:bg-formColor hover:text-black">
        <i className={icon}></i>&nbsp;&nbsp;{name}
      </li>
    </a>
  );
}

function MediaLink({ href, icon, name }) {
  return (
    <p className="tooltip">
      <a
        href={href}
        target="_blank"
        rel="noreferrer"
        className="text-base text-sidebarColor flex justify-center items-center transform hover:scale-115 ease-in-out"
      >
        <i className={icon + " media-link"}></i>
        &nbsp;&nbsp;
        <span className="tooltip-text -mt-6  rounded">{name}</span>
      </a>
    </p>
  );
}

function Sidebar() {
  useEffect(() => {
    document.addEventListener(
      "DOMContentLoaded",
      function () {
        const sections = document.querySelectorAll(".content");
        const menu_links = document.querySelectorAll("#link-nav a li");
        const makeActive = (link) => {
          menu_links[link].classList.add("bg-white", "text-black");
        };
        const removeActive = (link) => {
          menu_links[link].classList.remove("bg-white", "text-black");
        };
        const removeAllActive = () =>
          [...Array(sections.length).keys()].forEach((link) =>
            removeActive(link)
          );
        const sectionMargin = 200;
        let currentActive = 0;
        for (let i = 0; i < sections.length; i++) {
          if (isVisible(sections[i])) {
            removeAllActive();
            menu_links[i].classList.add("bg-white", "text-black");
          }
        }
        window.addEventListener("scroll", () => {
          const current =
            sections.length -
            [...sections]
              .reverse()
              .findIndex(
                (section) => window.scrollY >= section.offsetTop - sectionMargin
              ) -
            1;
          if (current !== currentActive) {
            removeAllActive();
            currentActive = current;
            makeActive(current);
          }
        });
      },
      false
    );
  }, []);

  return (
    <nav>
      <nav
        id="top-bar"
        className=" flex justify-center items-center flex-col h-16 p-8.5 text-center w-full fixed top-0 bg-sidebarColor z-50 sm:hidden"
      >
        <i
          onClick={openSidebar}
          className="fas fa-chevron-circle-left  text-white text-3xl cursor-pointer absolute left-2.5 mb-1 sm:hidden transform hover:scale-115 ease-in-out"
        ></i>
        <div className="font-sidebarText">
          <h1 className="text-white text-center">
            <span className="text-base font-bold">Josh Levy</span>
            <br />
            <span className="text-sm">Front End Developer</span>
          </h1>
        </div>
      </nav>

      <nav
        id="wrapper"
        className=" invisible w-52 min-h-screen h-screen bg-sidebarColor text-white flex flex-col  fixed left-0 z-50 font-sidebarText sm:visible"
      >
        <div className="flex flex-col justify-center items-center text-center  border-b-2 mt-4 border-white text-xl">
          <i
            onClick={closeSidebar}
            className="fas fa-chevron-circle-left cursor-pointer text-white fixed top-4 left-3 text-3xl sm:invisible transform hover:scale-115 ease-in-out"
          ></i>
          <img
            className="inline object-cover w-28 h-28 md:w-32 md:h-32  mr-2 rounded-full border-2 border-white"
            src={Profile}
            alt="Profile"
          />
          <h2 className="leading-6 mb-2 mt-2 red">
            <span className="text-lg md:text-2xl font-bold">Josh Levy</span>
            <br />
            <span className="text-sm md:text-lg">Front End Developer</span>
          </h2>
        </div>
        <ul
          id="link-nav"
          className=" h-2/5 mt-2 sm:mt-2.5 flex flex-col justify-between"
        >
          <SiteLink sectionID="#About" icon="fas fa-user-alt" name="About" />
          <SiteLink
            sectionID="#Experience"
            icon="fas fa-briefcase"
            name="Experience"
          />
          <SiteLink
            sectionID="#Projects"
            icon="fas fa-code-branch"
            name="Projects"
          />
          <SiteLink sectionID="#Skills" icon="fas fa-keyboard" name="Skills" />
          <SiteLink sectionID="#Goals" icon="fas fa-tasks" name="Goals" />
          <SiteLink
            sectionID="#Contact"
            icon="fas fa-handshake"
            name="Contact"
          />
          <a
            href="https://docs.google.com/document/d/1nPtVXJ5m_p7zbPpqorw7RE7gO-Tp3iSY8QRzRgIqhSg/edit?usp=sharing"
            target="_blank"
            rel="noreferrer"
          >
            <li className="site-link">
              <i className="fas fa-file-alt"></i>
              &nbsp;&nbsp;Resume
              <i className="fas fa-external-link-alt text-xs mb-2 ml-2"></i>
            </li>
          </a>
        </ul>
        <div className="flex justify-evenly gap-4  absolute bottom-4 left-2/4 right-2/4">
          <MediaLink
            href="mailto:jml312@case.edu"
            icon="fas fa-envelope"
            name="Email"
          />
          <MediaLink
            href="https://github.com/jml312"
            icon="fab fa-github"
            name="GitHub"
          />
          <MediaLink
            href="https://www.linkedin.com/in/jml312/"
            icon="fab fa-linkedin"
            name="Linkedin"
          />
        </div>
      </nav>
    </nav>
  );
}

export default Sidebar;
