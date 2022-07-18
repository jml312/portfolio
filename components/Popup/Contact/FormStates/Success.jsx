import { MdClose } from "react-icons/md";
import { useEffect } from "react";

function Success({ setPopupOpen, isBig }) {
  useEffect(() => {
    if (!isBig) {
      window.scrollTo(0, 0);
    }
  }, [isBig]);

  return (
    <>
      <button
        className={
          "text-5xl opacity-80 hover:opacity-100 transition-opacity ease-in-out duration-[250ms] absolute top-6 right-6"
        }
        onClick={() => {
          setPopupOpen(false);
        }}
      >
        <MdClose />
      </button>
      <h1 className={"text-2xl sm:text-[1.7rem] lg:text-3xl font-bold"}>
        {localStorage.getItem("successMessage")}
      </h1>
      <p className={"text-lg sm:[1.2rem] lg:text-xl -translate-y-2"}>
        I will get back to you soon...
      </p>
    </>
  );
}

export default Success;
