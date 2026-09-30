let mainContentAdded = false;
const originalTitle = "block AI | wiki";

const main = document.getElementsByTagName("main")[0];

const getParams = () => {
	const params = new URLSearchParams(document.location.search);
	const { id } = { id: params.get("id") };

	return { id };
};

const changeDocumentTitle = (fileName, pageTitle) => {
	if (fileName !== "lists" && pageTitle && pageTitle !== originalTitle) {
		document.title = `${originalTitle} - ${pageTitle}`;
	}
};

const addFooter = () => {
	if (mainContentAdded) {
		getFromFile("site/footer");
		return;
	}

	requestAnimationFrame(addFooter);
};

const getFromFile = async (fileName) => {
	const markdown = await getMarkdownFromFile(fileName);

	changeDocumentTitle(fileName, getPageTitle(markdown));

	markdown.split("\n--\n").forEach((section) => {
		const sectionElement = ce.section({
			innerHTML: makeHtml(section),
		});

		main.appendChild(sectionElement);
	});

	mainContentAdded = true;
};

const { id } = getParams();

getFromFile(id || "lists");
addFooter();
