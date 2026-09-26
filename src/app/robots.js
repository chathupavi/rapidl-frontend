export default function robots() {
  return {
    rules: {
      userAgent: "*",

      allow: "/",

      disallow: [
        "/admin/",
        "/api/",
        "/login",
      ],
    },

    sitemap:
      "https://rapidlaundromat.lk/sitemap.xml",
  };
}