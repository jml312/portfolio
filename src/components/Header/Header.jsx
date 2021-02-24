import React from "react";

function Header({ text }) {
  return (
    <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold w-full bg-headerColor text-center absolute top-0 p-5 lg:p-7">
      {text}
    </h3>
  );
}

export default Header;
