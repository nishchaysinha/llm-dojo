import { MetadataRoute } from "next";
import { allStages, SITE_CONFIG } from "@/data/curriculum";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticPages: MetadataRoute.Sitemap = [
    { url: SITE_CONFIG.url, lastModified: now, changeFrequency: "weekly", priority: 1.0 },
    { url: `${SITE_CONFIG.url}/roadmap`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE_CONFIG.url}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
  ];

  const stagePages: MetadataRoute.Sitemap = allStages.map((s) => ({
    url: `${SITE_CONFIG.url}/stage/${s.id}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.85,
  }));

  const notebookPages: MetadataRoute.Sitemap = allStages.flatMap((s) =>
    s.notebooks.map((n) => ({
      url: `${SITE_CONFIG.url}/notebook/${n.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    }))
  );

  return [...staticPages, ...stagePages, ...notebookPages];
}
