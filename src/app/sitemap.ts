import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
    return [
        {
            url: "https://riddlerealm.app",
            lastModified: new Date(),
            // changeFrequency: "yearly",
            priority: 1,
        },
        {
            url: "https://riddlerealm.app/stats",
            lastModified: new Date(),
            // changeFrequency: "yearly",
            priority: 0.8,
        },
        {
            url: "https://riddlerealm.app/sign-up",
            lastModified: new Date(),
            // changeFrequency: "yearly",
            priority: 0.5,
        },
        {
            url: "https://riddlerealm.app/sign-in",
            lastModified: new Date(),
            // changeFrequency: "yearly",
            priority: 0.5,
        },
    ];
}
