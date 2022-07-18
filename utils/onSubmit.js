import handleError from "./handleError";
import handleSuccess from "./handleSuccess";

const onSubmit = async ({ data, setSubmissionState }) => {
  try {
    const { hasSubmitted, success } = await (
      await fetch("/api/submit-form", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          message: data.message
        })
      })
    ).json();

    if (!success) {
      return handleError(setSubmissionState);
    }

    if (hasSubmitted) {
      return handleSuccess(
        "I received your previous message.",
        setSubmissionState
      );
    }

    return handleSuccess("Your message was sent.", setSubmissionState);
  } catch {
    return handleError(setSubmissionState);
  }
};

export default onSubmit;
