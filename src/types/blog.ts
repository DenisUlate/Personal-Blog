export interface BlogPost {
	id: string;
	title: string;
	content: string;
	excerpt: string;
	date: string;
	updatedAt?: string; // Optional: ISO date string when post was last modified
	author: string;
	tags: string[];
	category?: string;
	featured: boolean;
	slug: string;
	featuredImage?: string;
	illustration?: string;
	images?: string[];
	readingTime: number; // in minutes
}

export interface BlogMetadata {
	title: string;
	date: string;
	author: string;
	tags: string[];
	category?: string;
	excerpt: string;
	featured: boolean;
}

export interface BlogsResponse {
	posts: BlogPost[];
	total: number;
}

export interface PaginationProps {
	currentPage: number;
	totalPages: number;
	onPageChange: (page: number) => void;
}
