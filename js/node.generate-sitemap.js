import fs from "fs-extra";
import { glob } from "glob";

const lastModified = new Intl.DateTimeFormat("sv-SE").format(Date.now());
const path = process.cwd();

const entries = [
	{ location: "", priority: "1" }, // start page
];

for await (const folderName of await glob(["article/*"])) {
	entries.push({ location: folderName, priority: "0.5" });
}

const generateSitemapEntry = (
	location,
	changeFrequency = "weekly",
	priority = "0.5",
) => {
	const template = `
<url>
    <loc>https://blockai.wiki/${location}</loc>
    <lastmod>${lastModified}</lastmod>
    <changefreq>${changeFrequency}</changefreq>
    <priority>${priority}</priority>
</url>
`;

	return template;
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

await fs.outputFile(`${path}/sitemap.xml`, generateSitemap(entries));
