let mainContentAdded = false;
const entrypoint = "site/start"; // start.md
const siteTitle = "block AI | wiki";

const main = document.getElementsByTagName("main")[0];

const getParams = () => {
	const params = new URLSearchParams(document.location.search);
	const { id } = { id: params.get("id") };
	return { id };
};

const getArticleId = () => {
	const { id } = getParams();
	return id || entrypoint;
};

const changeDocumentTitle = (fileName, articleTitle) => {
	if (fileName === entrypoint) {
		document.title = siteTitle;
	} else if (articleTitle) {
		document.title = `${siteTitle} - ${articleTitle}`;
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
	const markdown = await MarkdownUtils.getMarkdownFromFile(fileName);
	const sections = markdown.split("\n--\n");

	changeDocumentTitle(fileName, MarkdownUtils.getArticleTitle(markdown));

	sections.forEach((section) => {
		const sectionHtml = MarkdownUtils.makeHtml(section);
		const sectionElement = ce.section({ innerHTML: sectionHtml });
		main.appendChild(sectionElement);
	});

	mainContentAdded = true;
};

document.addEventListener("DOMContentLoaded", () => {
	const id = getArticleId();

	getFromFile(id);
	addFooter();
});
