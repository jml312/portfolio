import React, { Suspense, lazy } from "react";

import Loader from "./components/Loader/Loader";

const About = lazy(() => import("./components/About/About"));
const Contact = lazy(() => import("./components/Contact/Contact"));
const Experience = lazy(() => import("./components/Experience/Experience"));
const Goals = lazy(() => import("./components/Goals/Goals"));
const Projects = lazy(() => import("./components/Projects/Projects"));
const Sidebar = lazy(() => import("./components/Sidebar/Sidebar"));
const Skills = lazy(() => import("./components/Skills/Skills"));

function App() {
  return (
    <Suspense fallback={<Loader />}>
      <Sidebar />
      <main>
        <About />
        <Experience />
        <Projects />
        <Skills />
        <Goals />
        <Contact />
      </main>
    </Suspense>
  );
}

export default App;
