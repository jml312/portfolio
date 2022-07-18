import { useForm } from "react-hook-form";
import { MdClose } from "react-icons/md";
import { BiMailSend } from "react-icons/bi";
import onSubmit from "utils/onSubmit";
import { useEffect, useRef, useState } from "react";
import HCaptcha from "@hcaptcha/react-hcaptcha";
import { m } from "framer-motion";
import { isProd } from "constants/index.mjs";

function Default({
  isBig,
  setPopupOpen,
  submissionState,
  setSubmissionState,
  HCaptchaLoading,
  setHCaptchaLoading
}) {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { isValid }
  } = useForm({ mode: "onChange" });
  const captchaRef = useRef(null);
  const [HCaptchaError, setHCaptchaError] = useState("");

  useEffect(() => {
    if (!isBig) window.scrollTo(0, 0);
    const { name, email, message } = submissionState.formData;
    setValue("name", name, { shouldValidate: true });
    setValue("email", email, { shouldValidate: true });
    setValue("message", message, { shouldValidate: true });
  }, []);

  const handleVerify = async (token) => {};

  return (
    <div
      className={
        "grid grid-rows-3 grid-cols-1 justify-items-center h-[70%] w-3/4 mt-10 big:mt-0"
      }
    >
      <div className={"flex justify-between items-center w-full self-start"}>
        <div className={"flex flex-col justify-center items-start gap-1.5"}>
          <h1 className={"font-bold text-3xl lg:text-4xl"}>Let's Talk.</h1>
          <h4 className={"text-sm lg:text-[.95rem]"}>
            Projects, questions, or just chatting
          </h4>
        </div>

        <button
          className={
            "text-4xl lg:text-5xl opacity-80 hover:opacity-100 transition-opacity ease-in-out duration-[250ms] self-start rounded-full"
          }
          onClick={() => setPopupOpen(false)}
        >
          <MdClose />
        </button>
      </div>

      <form
        onSubmit={handleSubmit((data) => {
          // use HCaptcha in prod
          if (isProd) {
            setHCaptchaLoading(true);
            setSubmissionState((prevState) => ({
              ...prevState,
              formData: {
                ...prevState.formData,
                name: data.name,
                email: data.email,
                message: data.message
              }
            }));
            captchaRef.current.execute();
          } else {
            setSubmissionState((prevState) => ({
              ...prevState,
              isSubmitting: true,
              formData: {
                ...prevState.formData,
                name: data.name,
                email: data.email,
                message: data.message
              }
            }));
            onSubmit({
              data,
              setSubmissionState
            });
          }
        })}
        className={
          "flex flex-col items-start justify-center gap-6 w-full row-span-2 self-start -translate-y-16 big:-translate-y-[4.65rem]"
        }
      >
        <div
          className={`mb-3 w-full flex flex-col items-start border-b border-light focus-within:border-white transition-[border] ease-out duration-100 ${
            isBig &&
            "focus-within:border-b-2 relative before:translate-y-full before:bg-white before:content-[''] before:absolute before:bottom-0 before:right-0 before:w-0 before:h-0.5 before:[transition:width_1.2s_cubic-bezier(0.25,1,0.5,1)] hover:before:left-0 hover:before:right-auto hover:before:w-full"
          }`}
        >
          <label htmlFor="name" className={"text-[.9rem] mb-2"}>
            Name <span className={"text-sm"}>*</span>
          </label>
          <input
            className={
              "w-full px-0.5 py-1 mr-3 leading-tight bg-transparent border-none appearance-none text-light focus:outline-none"
            }
            type="text"
            {...register("name", {
              required: true,
              minLength: 2,
              maxLength: 21,
              pattern: /^[a-zA-Z ]*$/i
            })}
          />
        </div>
        <div
          className={`mb-3 w-full flex flex-col items-start border-b border-light focus-within:border-white transition-[border] ease-out duration-100 ${
            isBig &&
            "focus-within:border-b-2 relative before:translate-y-full before:bg-white before:content-[''] before:absolute before:bottom-0 before:right-0 before:w-0 before:h-0.5 before:[transition:width_1.2s_cubic-bezier(0.25,1,0.5,1)] hover:before:left-0 hover:before:right-auto hover:before:w-full"
          }`}
        >
          <label htmlFor="email" className={"text-[.9rem] mb-2"}>
            Email <span className={"text-sm"}>*</span>
          </label>
          <input
            className={
              "w-full px-0.5 py-1 mr-3 leading-tight bg-transparent border-none appearance-none text-light focus:outline-none"
            }
            type="email"
            {...register("email", {
              required: true,
              pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+[.][a-zA-Z]{2,8}$/i
            })}
          />
        </div>
        <div
          className={`-mb-1 w-full flex flex-col items-start border-b border-light focus-within:border-white transition-[border] ease-out duration-100 ${
            isBig &&
            "focus-within:border-b-2 relative before:translate-y-full before:bg-white before:content-[''] before:absolute before:bottom-0 before:right-0 before:w-0 before:h-0.5 before:[transition:width_1.2s_cubic-bezier(0.25,1,0.5,1)] hover:before:left-0 hover:before:right-auto hover:before:w-full"
          }`}
        >
          <label htmlFor="message" className={"text-[.9rem] mb-2"}>
            Message <span className={"text-sm"}>*</span>
          </label>
          <textarea
            className={`w-full px-0.5 py-1 mr-3 leading-tight bg-transparent border-none appearance-none text-light focus:outline-none resize-y big:min-h-7 big:max-h-32 ${
              !isBig && "min-h-fit h-8"
            }`}
            type="text"
            minLength={5}
            maxLength={280}
            {...register("message", {
              required: true,
              minLength: 5,
              maxLength: 280
            })}
          />
        </div>
        {HCaptchaError && (
          <m.p
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className={"text-red-500 italic text-sm mt-2"}
          >
            {HCaptchaError}
          </m.p>
        )}
        <HCaptcha
          sitekey={process.env.NEXT_PUBLIC_HCAPTCHA_SITE_KEY}
          size="invisible"
          ref={captchaRef}
          theme="dark"
          onVerify={async (token) => {
            setSubmissionState((prevState) => ({
              ...prevState,
              isSubmitting: true
            }));
            const { success } = await (
              await fetch("/api/siteverify", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json"
                },
                body: JSON.stringify({ response: token })
              })
            ).json();
            setHCaptchaLoading(false);
            if (!success) {
              return setHCaptchaError(
                "Verification failed. Try again later..."
              );
            }
            onSubmit({
              data: submissionState.formData,
              setSubmissionState
            });
          }}
          onError={() => {
            setHCaptchaError("Verification failed. Try again later...");
            setHCaptchaLoading(false);
          }}
          onExpire={() => {
            setHCaptchaError("Verification failed. Try again later...");
            setHCaptchaLoading(false);
          }}
          onChalExpired={() => {
            setHCaptchaError("Verification failed. Try again later...");
            setHCaptchaLoading(false);
          }}
          onClose={() => {
            setHCaptchaLoading(false);
          }}
        />
        <button
          type="submit"
          disabled={submissionState.isSubmitting || !isValid || HCaptchaLoading}
          className={`relative inline-flex items-center justify-center px-5 big:px-4 py-3 text-[.9rem] sm:text-[.95rem] md:text-[1rem] lg:text-[1.05rem] rounded-md group border-2 text-dark bg-light transition-all ease-in-out duration-[250ms] font-medium -translate-y-6 -mb-8 big:mb-0 ${
            isValid && !HCaptchaLoading
              ? "opacity-100 cursor-pointer dark:hover:bg-[rgba(255,255,245,0.8)] hover:bg-[rgba(255,255,245,0.8)] active:scale-95"
              : "opacity-60 cursor-not-allowed"
          }`}
        >
          {HCaptchaLoading || submissionState.isSubmitting ? (
            <>
              Verifying
              <div className={`flex items-center justify-center mx-2 h-full}`}>
                <span
                  className={`ml-1 w-5 h-5 border-2 border-r rounded-full border-r-transparent dark:border-r-transparent animate-spin border-dark`}
                ></span>
              </div>
            </>
          ) : (
            <>
              <BiMailSend className={"text-lg"} /> &nbsp; Send Message
            </>
          )}
        </button>
      </form>
    </div>
  );
}

export default Default;
