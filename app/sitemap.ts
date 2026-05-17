import type { MetadataRoute } from "next";
import { blogPosts } from "@/lib/blog";

const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://saas-soocial-media-iastudio.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/blog",
    "/cadastro",
    "/login",
    "/dashboard",
    "/clients",
    "/planner",
    "/reports",
    "/ai",
    "/analysis",
    "/ads",
    "/carousel",
    "/influencers",
    "/calculators",
    "/contracts",
    "/prompts",
    "/settings",
  ];

  return [
    ...staticRoutes.map((route) => ({
      url: `${baseUrl}${route}`,
      lastModified: new Date(),
      changeFrequency: route === "" || route === "/blog" ? "weekly" as const : "monthly" as const,
      priority: route === "" ? 1 : route === "/blog" ? 0.9 : 0.5,
    })),
    ...blogPosts.map((post) => ({
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified: new Date(`${post.updatedAt}T00:00:00`),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
