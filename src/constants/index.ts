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

export const METADATA = {
	TITLE: "Mi Blog Personal",
	DESCRIPTION: "Un blog personal sobre tecnología, desarrollo web y más",
	KEYWORDS: "blog, tecnología, desarrollo, Next.js, React",
	AUTHOR: "Tu Nombre",
	URL: "https://tu-dominio.com",
} as const;
