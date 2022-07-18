const handleError = (setSubmissionState) => {
  setSubmissionState((prevState) => ({
    ...prevState,
    isSubmitted: true,
    isSubmitSuccessful: false,
    isSubmitting: false,
  }));
  setTimeout(() => {
    setSubmissionState((prevState) => ({
      ...prevState,
      isSubmitted: false,
      isSubmitSuccessful: false,
      isSubmitting: false,
    }));
  }, 5000);
};

export default handleError;
