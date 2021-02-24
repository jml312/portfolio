import React from "react";

import {
  About,
  Contact,
  Experience,
  Goals,
  Projects,
  Sidebar,
  Skills,
} from "./components";

function App() {
  return (
    <>
      <Sidebar />
      <main>
        <About />
        <Experience />
        <Projects />
        <Skills />
        <Goals />
        <Contact />
      </main>
    </>
  );
}

export default App;
