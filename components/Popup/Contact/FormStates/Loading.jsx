import Spinner from "components/ThreeJ/Spinner";
import { useEffect } from "react";

function Loading({ isBig }) {
  useEffect(() => {
    if (!isBig) {
      window.scrollTo(0, 0);
    }
  }, [isBig]);

  return (
    <>
      <Spinner />
      <h1 className={"text-xl sm:text-2xl font-semibold"}>
        Sending Message...
      </h1>
    </>
  );
}

export default Loading;
