const getParams = () => {
	const params = new URLSearchParams(document.location.search);
	const { id } = { id: params.get("id") };
	return { id };
};

const getArticleId = () => {
	const { id } = getParams();
	return id;
};

document.addEventListener("DOMContentLoaded", () => {
	// adds backwards compatibility

	const id = getArticleId();
	if (id) window.location.href = `/article/${id}`;
});
