const fetchOptions = {
	cache: "no-cache",
};

const defaultMarkdownOptions = {
	// don't modify these
	omitExtraWLInCodeBlocks: false,
	noHeaderId: false,
	prefixHeaderId: false,
	rawPrefixHeaderId: false,
	ghCompatibleHeaderId: false,
	rawHeaderId: false,
	headerLevelStart: false,
	parseImgDimensions: false,
	simplifiedAutoLink: false,
	excludeTrailingPunctuationFromURLs: false,
	literalMidWordUnderscores: false,
	literalMidWordAsterisks: false,
	strikethrough: false,
	tables: false,
	tablesHeaderId: false,
	ghCodeBlocks: true,
	tasklists: false,
	smoothLivePreview: false,
	smartIndentationFix: false,
	disableForced4SpacesIndentedSublists: false,
	simpleLineBreaks: false,
	requireSpaceBeforeHeadingText: false,
	ghMentions: false,
	ghMentionsLink: "https://github.com/{u}",
	encodeEmails: true,
	openLinksInNewWindow: false,
	backslashEscapesHTMLTags: false,
	emoji: false,
	underline: false,
	ellipsis: true,
	completeHTMLDocument: false,
	metadata: false,
	splitAdjacentBlockquotes: false,
};

const markdownOptions = {
	...defaultMarkdownOptions,
	tables: true,
	tasklists: true,
};

const MarkdownUtils = {
	getMarkdownFromFile: async (fileName) => {
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
	},
	getArticleTitle: (markdown) =>
		markdown.split("\n")?.[0]?.match(/^# (.+)/)?.[1],
	makeHtml: (markdown) =>
		new showdown.Converter(markdownOptions).makeHtml(markdown),
};
