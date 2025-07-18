export default function JsonLD() {
  const json = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Ceramic & Food Products",
    url: "https://ceramicandfoodproducts.com/",
    logo: "https://ceramicandfoodproducts.com/logo.png",
    sameAs: ["https://facebook.com/yourpage", "https://instagram.com/yourpage"],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(json) }}
    />
  );
}
