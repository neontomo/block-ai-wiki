const getParams = () => {
	const params = new URLSearchParams(document.location.search);
	const { id } = { id: params.get("id") };
	return { id };
};

const getArticleId = () => {
	const { id } = getParams();
	return id;
	// return id || entrypoint;
};

document.addEventListener("DOMContentLoaded", () => {
	const id = getArticleId();

	if (id) window.location.href = `/article/${id}`;
});
