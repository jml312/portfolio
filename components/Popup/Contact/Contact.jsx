import { m } from "framer-motion";
import { useState, useEffect } from "react";
import Default from "./FormStates/Default";
import Success from "./FormStates/Success";
import Failure from "./FormStates/Failure";
import Loading from "./FormStates/Loading";

function Contact({
  isBig,
  setPopupOpen,
  HCaptchaLoading,
  setHCaptchaLoading,
  prefersReducedMotion
}) {
  const [FormStateComponent, setFormStateComponent] = useState(null);
  const classes = {
    default:
      "bg-dark justify-start dark:z-auto big:border-[0.5px] big:border-dark big:dark:border-[0.5px] big:dark:border-light",
    loading:
      "bg-dark justify-center dark:z-auto gap-5 min-h-[50vh] big:border-[0.5px] big:border-dark big:dark:border-[0.5px] big:dark:border-light",
    success:
      "bg-green-500 justify-center text-center gap-5 min-h-[50vh] border-none dark:border-none",
    failure:
      "bg-red-500 justify-center text-center gap-5 min-h-[50vh] border-none dark:border-none"
  };
  const [divClasses, setDivClasses] = useState(classes.default);
  const [submissionState, setSubmissionState] = useState({
    isSubmitted: false,
    isSubmitSuccessful: false,
    isSubmitting: false,
    formData: { name: "", email: "", message: "" }
  });

  useEffect(() => {
    const { isSubmitted, isSubmitSuccessful, isSubmitting } = submissionState;
    // Success
    if (localStorage.getItem("successMessage") || isSubmitSuccessful) {
      setFormStateComponent(
        <Success isBig={isBig} setPopupOpen={setPopupOpen} />
      );
      setDivClasses(classes.success);
    }
    // Failure
    else if (isSubmitted && !isSubmitSuccessful) {
      setFormStateComponent(
        <Failure isBig={isBig} setPopupOpen={setPopupOpen} />
      );
      setDivClasses(classes.failure);
    }
    // Loading
    else if (isSubmitting && !isSubmitted) {
      setFormStateComponent(<Loading isBig={isBig} />);
      setDivClasses(classes.loading);
    }
    // Default
    else {
      setFormStateComponent(
        <Default
          isBig={isBig}
          submissionState={submissionState}
          setSubmissionState={setSubmissionState}
          setPopupOpen={setPopupOpen}
          HCaptchaLoading={HCaptchaLoading}
          setHCaptchaLoading={setHCaptchaLoading}
        />
      );
      setDivClasses(classes.default);
    }
  }, [submissionState]);

  return (
    <m.div
      initial={
        !prefersReducedMotion
          ? isBig
            ? {
                translateX: "150%"
              }
            : {
                translateX: "0%"
              }
          : { opacity: 0 }
      }
      animate={
        !prefersReducedMotion
          ? isBig
            ? {
                translateX: "50%"
              }
            : {
                translateX: "0%"
              }
          : { opacity: 1 }
      }
      exit={
        !prefersReducedMotion
          ? isBig
            ? {
                translateX: "200%",
                opacity: 0,
                transition: {
                  duration: 0.2,
                  ease: "easeInOut"
                }
              }
            : {
                translateX: "0%",
                opacity: 1,
                transition: {
                  duration: 0,
                  ease: "backInOut"
                }
              }
          : {
              opacity: 0
            }
      }
      transition={{
        duration: 0.2,
        ease: "easeInOut"
      }}
      className={`big:absolute w-full big:w-5/6 lg:w-3/4 h-full flex flex-col justify-center items-center text-light dark:z-50 z-auto big:rounded-r-md big:border-[0.5px] big:border-dark big:dark:border-[0.5px] big:dark:border-light ${divClasses} ${
        HCaptchaLoading ? "opacity-50" : "opacity-100"
      } ${prefersReducedMotion ? "translate-x-1/2" : ""}`}
    >
      {FormStateComponent}
    </m.div>
  );
}

export default Contact;
