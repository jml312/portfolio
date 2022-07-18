const handleSuccess = (successMessage, setSubmissionState) => {
	setSubmissionState((prevState) => ({
		...prevState,
		isSubmitted: true,
		isSubmitSuccessful: true,
		isSubmitting: false,
	}));
	localStorage.setItem("successMessage", successMessage);
};

export default handleSuccess;
