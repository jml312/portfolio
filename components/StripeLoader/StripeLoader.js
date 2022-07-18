import { m } from "framer-motion";

function StripeLoader() {
  return (
    <div className="h-screen min-h-screen max-h-screen justify-center items-center">
      <div className={"flex flex-col gap-8 items-center justify-center h-full"}>
        <m.h1
          initial={{ opacity: 0, translateY: "50%" }}
          animate={{ opacity: 1, translateY: "0%" }}
          transition={{ duration: 0.25, delay: 0.05 }}
          className="text-xl lg:text-2xl"
        >
          Loading Payment...
        </m.h1>
        <span
          className={
            "w-[3.75rem] h-[3.75rem] border-2 border-r rounded-full border-r-transparent dark:border-r-transparent animate-spin dark:border-light border-dark"
          }
        ></span>
      </div>
    </div>
  );
}

export default StripeLoader;
