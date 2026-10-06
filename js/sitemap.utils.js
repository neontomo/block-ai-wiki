const lastModified = "2026-10-06";

const entries = [
	// site pages
	{ location: "/", priority: "1" },
	{ location: "/?id=contributing", priority: "1" },
	{ location: "/?id=me", priority: "1" },

	// articles
	{ location: "/?id=android" },
	{ location: "/?id=content-blockers" },
	{ location: "/?id=content-highlighter" },
	{ location: "/?id=duckduckgo" },
	{ location: "/?id=google-search" },
	{ location: "/?id=how-i-spot-ai-writing" },
	{ location: "/?id=ipad" },
	{ location: "/?id=iphone" },
	{ location: "/?id=mac" },
	{ location: "/?id=markdown" },
	{ location: "/?id=reddit" },
	{ location: "/?id=vscode" },
	{ location: "/?id=whatsapp" },
	{ location: "/?id=youtube" },
];

const generateSitemapEntry = (
	location,
	changeFrequency = "weekly",
	priority = "0.5",
) => {
	const urlElement = ce.createElement("url");
	const path = `https://blockai.wiki${location}`;

	ce.createElement("loc", { innerHTML: path }, urlElement);
	ce.createElement("lastmod", { innerHTML: lastModified }, urlElement);
	ce.createElement("changefreq", { innerHTML: changeFrequency }, urlElement);
	ce.createElement("priority", { innerHTML: priority }, urlElement);

	return urlElement.outerHTML;
};

const generateSitemap = (entries) => {
	const output = [
		'<?xml version="1.0" encoding="UTF-8"?>',
		'<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
		...entries.map((entry) => {
			return generateSitemapEntry(
				entry.location,
				entry.changeFrequency,
				entry.priority,
			);
		}),
		"</urlset>",
	].join("");

	return output;
};

// const sitemap = generateSitemap(entries);
// console.log(sitemap);
