const fetchOptions = {
	cache: "no-cache",
};

const markdownOptions = {
	tasklists: true,
	tables: true,
};

const getMarkdownFromFile = async (fileName) => {
	const markdown = await fetch(`md/${fileName}.md`, fetchOptions)
		.then((response) => {
			if (!response.ok) throw new Error("[error]", { cause: response });
			return response.text();
		})
		.catch((error) => {
			logFetchError(error);

			if (error.cause.status === 404) {
				getFromFile("site/404");
			} else {
				getFromFile("site/error");
			}
		});

	return markdown;
};

const getPageTitle = (markdown) => {
	return markdown.split("\n")?.[0]?.match(/^# (.+)/)?.[1];
};

const makeHtml = (markdown) => {
	return new showdown.Converter(markdownOptions).makeHtml(markdown);
};
