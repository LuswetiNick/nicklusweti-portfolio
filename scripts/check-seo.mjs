const baseUrl = (process.env.SEO_BASE_URL ?? "http://localhost:3000").replace(
  /\/$/,
  "",
);
const siteOrigin = (
  process.env.SEO_SITE_ORIGIN ?? "https://luswetinick.cc.cd"
).replace(/\/$/, "");

const pages = [
  {
    path: "/",
    schemaTypes: ["WebSite", "ProfilePage", "Person"],
  },
  {
    path: "/projects/studio-io",
    schemaTypes: [
      "TechArticle",
      "SoftwareSourceCode",
      "BreadcrumbList",
      "Person",
      "WebSite",
    ],
  },
  {
    path: "/projects/afrika-mosaics",
    schemaTypes: [
      "TechArticle",
      "SoftwareSourceCode",
      "BreadcrumbList",
      "Person",
      "WebSite",
    ],
  },
  {
    path: "/projects/resonix",
    schemaTypes: [
      "TechArticle",
      "SoftwareSourceCode",
      "BreadcrumbList",
      "Person",
      "WebSite",
    ],
  },
];

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

function getAttributes(tag) {
  return Object.fromEntries(
    [...tag.matchAll(/([:\w-]+)=(?:"([^"]*)"|'([^']*)')/g)].map(
      ([, name, doubleQuoted, singleQuoted]) => [
        name.toLowerCase(),
        doubleQuoted ?? singleQuoted,
      ],
    ),
  );
}

function getMeta(html, key) {
  for (const match of html.matchAll(/<meta\b[^>]*>/gi)) {
    const attributes = getAttributes(match[0]);
    if (attributes.name === key || attributes.property === key) {
      return attributes.content;
    }
  }

  return undefined;
}

function getCanonical(html) {
  for (const match of html.matchAll(/<link\b[^>]*>/gi)) {
    const attributes = getAttributes(match[0]);
    if (attributes.rel === "canonical") {
      return attributes.href;
    }
  }

  return undefined;
}

function getText(html, tagName) {
  const match = html.match(
    new RegExp(`<${tagName}\\b[^>]*>([\\s\\S]*?)<\\/${tagName}>`, "i"),
  );

  return match?.[1].replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
}

function getJsonLd(html) {
  const documents = [];

  for (const match of html.matchAll(/<script\b[^>]*>[\s\S]*?<\/script>/gi)) {
    const openingTag = match[0].match(/^<script\b[^>]*>/i)?.[0];
    if (!openingTag) continue;

    const attributes = getAttributes(openingTag);
    if (attributes.type !== "application/ld+json") continue;

    const body = match[0]
      .replace(/^<script\b[^>]*>/i, "")
      .replace(/<\/script>$/i, "");
    documents.push(JSON.parse(body));
  }

  return documents;
}

function collectSchemaTypes(document) {
  const nodes = Array.isArray(document?.["@graph"])
    ? document["@graph"]
    : [document];
  const types = new Set();

  for (const node of nodes) {
    const nodeTypes = Array.isArray(node?.["@type"])
      ? node["@type"]
      : [node?.["@type"]];
    for (const type of nodeTypes) {
      if (type) types.add(type);
    }
  }

  return types;
}

async function fetchText(path, expectedStatus = 200) {
  const response = await fetch(`${baseUrl}${path}`, {
    headers: { "user-agent": "nicklusweti-seo-check/1.0" },
    redirect: "manual",
  });
  assert(
    response.status === expectedStatus,
    `${path} returned ${response.status}; expected ${expectedStatus}`,
  );

  return response.text();
}

async function checkPage(page) {
  const html = await fetchText(page.path);
  const expectedCanonical = `${siteOrigin}${page.path === "/" ? "" : page.path}`;
  const title = getText(html, "title");
  const description = getMeta(html, "description");
  const canonical = getCanonical(html);
  const h1Count = [...html.matchAll(/<h1\b/gi)].length;
  const h1 = getText(html, "h1");

  assert(title, `${page.path} is missing a title`);
  assert(
    title.length >= 30 && title.length <= 60,
    `${page.path} title length is ${title.length}; expected 30–60`,
  );
  assert(description, `${page.path} is missing a meta description`);
  assert(
    description.length >= 120 && description.length <= 160,
    `${page.path} description length is ${description.length}; expected 120–160`,
  );
  assert(
    canonical === expectedCanonical,
    `${page.path} canonical is ${canonical}; expected ${expectedCanonical}`,
  );
  assert(h1Count === 1, `${page.path} has ${h1Count} H1 elements; expected 1`);
  assert(h1, `${page.path} has an empty H1`);

  assert(
    getMeta(html, "robots")?.includes("index") &&
      getMeta(html, "robots")?.includes("follow"),
    `${page.path} is missing index, follow robots directives`,
  );
  assert(
    getMeta(html, "og:title") === title,
    `${page.path} Open Graph title does not match the page title`,
  );
  assert(
    getMeta(html, "og:description") === description,
    `${page.path} Open Graph description does not match the meta description`,
  );
  assert(
    getMeta(html, "og:url") === canonical,
    `${page.path} Open Graph URL does not match the canonical`,
  );
  assert(
    getMeta(html, "og:image")?.startsWith(`${siteOrigin}/`),
    `${page.path} Open Graph image is not an absolute site URL`,
  );
  assert(
    getMeta(html, "twitter:card") === "summary_large_image",
    `${page.path} is missing the large Twitter card`,
  );
  assert(
    getMeta(html, "twitter:title") === title,
    `${page.path} Twitter title does not match the page title`,
  );
  assert(
    getMeta(html, "twitter:description") === description,
    `${page.path} Twitter description does not match the meta description`,
  );
  assert(
    getMeta(html, "twitter:image")?.startsWith(`${siteOrigin}/`),
    `${page.path} Twitter image is not an absolute site URL`,
  );
  if (process.env.GOOGLE_SITE_VERIFICATION) {
    assert(
      getMeta(html, "google-site-verification") ===
        process.env.GOOGLE_SITE_VERIFICATION,
      `${page.path} is missing the configured Google verification token`,
    );
  }

  const jsonLd = getJsonLd(html);
  assert(jsonLd.length === 1, `${page.path} has ${jsonLd.length} JSON-LD blocks`);
  const schemaTypes = collectSchemaTypes(jsonLd[0]);
  for (const expectedType of page.schemaTypes) {
    assert(
      schemaTypes.has(expectedType),
      `${page.path} JSON-LD is missing ${expectedType}`,
    );
  }

  return { path: page.path, title, description };
}

async function checkRobots() {
  const robots = await fetchText("/robots.txt");
  assert(/User-Agent:\s*\*/i.test(robots), "robots.txt is missing User-agent: *");
  assert(/Allow:\s*\//i.test(robots), "robots.txt is missing Allow: /");
  assert(
    robots.includes(`Sitemap: ${siteOrigin}/sitemap.xml`),
    "robots.txt is missing the production sitemap URL",
  );
  assert(
    robots.includes(`Host: ${siteOrigin}`),
    "robots.txt is missing the canonical host",
  );
}

async function checkSitemap() {
  const sitemap = await fetchText("/sitemap.xml");
  const urls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(
    ([, location]) => location,
  );
  const expectedUrls = pages.map(
    ({ path }) => `${siteOrigin}${path === "/" ? "" : path}`,
  );

  assert(
    urls.length === expectedUrls.length,
    `sitemap.xml has ${urls.length} URLs; expected ${expectedUrls.length}`,
  );
  assert(
    new Set(urls).size === urls.length,
    "sitemap.xml contains duplicate URLs",
  );
  for (const expectedUrl of expectedUrls) {
    assert(urls.includes(expectedUrl), `sitemap.xml is missing ${expectedUrl}`);
  }

  const lastModifiedValues = [
    ...sitemap.matchAll(/<lastmod>([^<]+)<\/lastmod>/g),
  ].map(([, value]) => value);
  assert(
    lastModifiedValues.length === expectedUrls.length,
    "Every sitemap URL must have a lastmod value",
  );
  for (const value of lastModifiedValues) {
    assert(!Number.isNaN(Date.parse(value)), `Invalid sitemap lastmod: ${value}`);
  }
}

async function run() {
  const pageResults = [];
  for (const page of pages) {
    pageResults.push(await checkPage(page));
    console.log(`✓ ${page.path}`);
  }

  const titles = pageResults.map(({ title }) => title);
  const descriptions = pageResults.map(({ description }) => description);
  assert(new Set(titles).size === titles.length, "Page titles are not unique");
  assert(
    new Set(descriptions).size === descriptions.length,
    "Meta descriptions are not unique",
  );

  await checkRobots();
  console.log("✓ /robots.txt");
  await checkSitemap();
  console.log("✓ /sitemap.xml");
  await fetchText("/__seo-not-found__", 404);
  console.log("✓ unknown routes return 404");
  console.log(`SEO regression check passed for ${pages.length} indexable pages.`);
}

run().catch((error) => {
  console.error(`SEO regression check failed: ${error.message}`);
  process.exitCode = 1;
});
