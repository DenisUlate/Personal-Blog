export const API_CONFIG = {
	BASE_URL: "https://dummyjson.com",
	ENDPOINTS: {
		POSTS: "/posts",
		USERS: "/users",
		COMMENTS: "/comments",
	},
	PAGINATION: {
		DEFAULT_LIMIT: 10,
		MAX_LIMIT: 30,
	},
} as const;

export const ROUTES = {
	HOME: "/",
	ABOUT: "/about",
	BLOG: "/blog",
	CATEGORIES: "/categories",
	TAGS: "/tags",
	ARCHIVES: "/archives",
} as const;

export const BLOG_CONFIG = {
	POSTS_PER_PAGE: 6,
} as const;

export const METADATA = {
	TITLE: "Mi Blog Personal",
	DESCRIPTION: "Un blog personal sobre tecnología, desarrollo web y más",
	KEYWORDS: "blog, tecnología, desarrollo, Next.js, React",
	AUTHOR: "Tu Nombre",
	URL: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
	LANGUAGE: "es-ES",
	AUTHOR_EMAIL: "tu-email@ejemplo.com", // Optional: used in RSS feed
} as const;
