import fs from "fs-extra";
import { glob } from "glob";
import Showdown from "showdown";

const getFileContent = (fileName) => {
	return fs.readFileSync(`${process.cwd()}/${fileName}`).toString();
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
		return getFileContent(fileName);
	},
	getArticleTitle: (markdown) =>
		markdown.split("\n")?.[0]?.match(/^# (.+)/)?.[1],
	makeHtml: (markdown) =>
		new Showdown.Converter(markdownOptions).makeHtml(markdown),
};

const start = async () => {
	const fileNames = await glob(["md/**/*.md"]);

	for await (const fileName of fileNames) {
		const isStartPage = fileName === "md/site/start.md";

		const markdown = {
			template: getFileContent("article.template"),
			footer: getFileContent("md/site/footer.md"),
			content: getFileContent(fileName),
		};

		const articleTitle = markdown.content
			.split("\n")?.[0]
			?.match(/^# (.+)/)?.[1];

		const content = markdown.content
			.split("\n--\n")
			.map((section) => {
				const sectionHtml = MarkdownUtils.makeHtml(section);
				return `<section>${sectionHtml}</section>`;
			})
			.join("");

		const html = markdown.template
			.replace(
				/\{articleTitle\}/,
				isStartPage ? "retake your digital life" : articleTitle,
			)
			.replace(/\{content\}/, content)
			.replace(/\{footer\}/, MarkdownUtils.makeHtml(markdown.footer));

		const path = process.cwd();
		const folderName = fileName.replace(/^md\//i, "").replace(/\.md/i, "");

		if (folderName === "site/start") {
			await fs.outputFile(`${path}/index.html`, html);
		} else {
			await fs.outputFile(`${path}/article/${folderName}/index.html`, html);
		}
	}
};

start();
