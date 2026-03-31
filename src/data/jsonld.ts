export const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "James Facey",
  "jobTitle": "AI Integration & Backend Engineer",
  "url": "https://portfolio.jnkfacey.com",
  "sameAs": [
    "https://github.com/jfacey"
  ]
};

export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "James Facey — Portfolio",
  "url": "https://portfolio.jnkfacey.com"
};

export function projectSchema(p: { title: string; tagline: string; url: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": p.title,
    "description": p.tagline,
    "url": p.url,
    "author": personSchema,
    "applicationCategory": "WebApplication"
  };
}
