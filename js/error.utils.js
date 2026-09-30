const logFetchError = (error) => {
	const { message, cause } = error;
	console.log("[error]", message, cause.status, cause.url);
};
