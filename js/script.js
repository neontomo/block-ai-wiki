let mainContentAdded = false;
const converter = new showdown.Converter();
const main = document.getElementsByTagName("main")[0];

const getParams = () => {
	const params = new URLSearchParams(document.location.search);
	const { id } = { id: params.get("id") };

	return { id };
};

const addFooter = () => {
	if (mainContentAdded) {
		getFromFile("site/footer");
		return;
	}

	requestAnimationFrame(addFooter);
};

const getFromFile = (fileName) => {
	fetch(`md/${fileName}.md`)
		.then((response) => response.text())
		.then((markdown) => {
			if (markdown.match("404 - Nothing matches the given URI")) {
				throw new Error("404");
			}

			const pageTitle = markdown.split("\n")?.[0]?.match(/^# (.+)/)?.[1];
			if (pageTitle && pageTitle !== "block AI.wiki") {
				document.title = `${document.title} - ${pageTitle}`;
			}

			const sections = markdown.split("\n--\n");

			sections?.forEach((section) => {
				const sectionElement = ce.section({
					innerHTML: converter.makeHtml(section),
				});
				main.appendChild(sectionElement);
			});
		})
		.catch((error) => {
			if (error.message === "404") {
				getFromFile("site/404");
			} else {
				getFromFile("site/error");
			}
		})
		.finally(() => {
			mainContentAdded = true;
		});
};

const { id } = getParams();

getFromFile(id || "lists");

if (id) addFooter();
