export interface BlogPost {
	id: number;
	title: string;
	body: string;
	userId: number;
	tags: string[];
	reactions?: {
		likes: number;
		dislikes: number;
	};
	views?: number;
	createdAt?: string;
	updatedAt?: string;
}

export interface BlogsResponse {
	posts: BlogPost[];
	total: number;
	skip: number;
	limit: number;
}

export interface PaginationProps {
	currentPage: number;
	totalPages: number;
	onPageChange: (page: number) => void;
}
