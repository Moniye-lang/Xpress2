import { Helmet } from "react-helmet-async";

/**
 * SEOHead — Reusable per-page SEO component.
 * Sets title, description, keywords, canonical URL, Open Graph, and Twitter Card meta tags.
 * Also injects JSON-LD structured data when provided.
 */
export default function SEOHead({
  title = "Xpress Cooking Gas — Bulk Gas Delivery in Oyo & Ibadan",
  description = "Xpress Cooking Gas is the #1 provider of bulk LPG gas delivery in Oyo State and Ibadan. Fast, safe, and affordable cooking gas for homes, restaurants, and businesses.",
  keywords = "bulk gas Oyo, cooking gas Ibadan, LPG delivery Oyo State, gas supply Ibadan, Xpress cooking gas, bulk gas delivery Nigeria",
  canonical,
  ogImage = "https://xpresscookinggas.com/IMG_4548.webp",
  jsonLd,
}) {
  const siteUrl = "https://xpresscookinggas.com";
  const canonicalUrl = canonical ? `${siteUrl}${canonical}` : siteUrl;

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <link rel="canonical" href={canonicalUrl} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:site_name" content="Xpress Cooking Gas" />
      <meta property="og:locale" content="en_NG" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      {/* Geo Tags for Local SEO */}
      <meta name="geo.region" content="NG-OY" />
      <meta name="geo.placename" content="Ibadan, Oyo State" />

      {/* JSON-LD Structured Data */}
      {jsonLd && (
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      )}
    </Helmet>
  );
}
