import Head from "next/head";
import ProjectGrid from "@/components/grid/ProjectGrid";

const SITE_URL = "https://marcus-portfolio-53k.pages.dev";
const TITLE = "Osied Shawahin — Independent Design Director";
const DESCRIPTION =
  "Independent Design Director based in the UAE. Leading design across fintech, enterprise AI, and experience design. Projects include Emirates NBD, Google, Standard Chartered, and more.";

export default function HomePage() {
  return (
    <>
      <Head>
        <title>{TITLE}</title>
        <meta name="description" content={DESCRIPTION} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="canonical" href={SITE_URL} />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={SITE_URL} />
        <meta property="og:title" content={TITLE} />
        <meta property="og:description" content={DESCRIPTION} />
        <meta property="og:image" content={`${SITE_URL}/og-image.svg`} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:site_name" content="Osied Shawahin Portfolio" />
        <meta property="og:locale" content="en_US" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={TITLE} />
        <meta name="twitter:description" content={DESCRIPTION} />
        <meta name="twitter:image" content={`${SITE_URL}/og-image.svg`} />

        {/* Additional SEO */}
        <meta name="author" content="Osied Shawahin" />
        <meta name="theme-color" content="#ffffff" />
        <meta name="robots" content="index, follow" />
        <link rel="sitemap" type="application/xml" href="/sitemap.xml" />
      </Head>
      <ProjectGrid />
    </>
  );
}
