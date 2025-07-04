import { API_CONFIG } from "@/constants";
import { BlogPost, BlogsResponse } from "@/types/blog";

export class BlogService {
	private static readonly baseUrl = API_CONFIG.BASE_URL;

	/**
	 * Obtiene todos los posts con paginación
	 */
	static async getPosts(page: number = 1, limit: number = API_CONFIG.PAGINATION.DEFAULT_LIMIT): Promise<BlogsResponse> {
		const skip = (page - 1) * limit;

		try {
			const response = await fetch(`${this.baseUrl}${API_CONFIG.ENDPOINTS.POSTS}?limit=${limit}&skip=${skip}`, {
				next: { revalidate: 3600 }, // Revalida cada hora
			});

			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}

			return await response.json();
		} catch (error) {
			console.error("Error fetching posts:", error);
			throw new Error("Failed to fetch posts");
		}
	}

	/**
	 * Obtiene un post por ID
	 */
	static async getPostById(id: number): Promise<BlogPost> {
		try {
			const response = await fetch(`${this.baseUrl}${API_CONFIG.ENDPOINTS.POSTS}/${id}`, {
				next: { revalidate: 3600 },
			});

			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}

			return await response.json();
		} catch (error) {
			console.error("Error fetching post:", error);
			throw new Error("Failed to fetch post");
		}
	}

	/**
	 * Busca posts por término
	 */
	static async searchPosts(query: string): Promise<BlogsResponse> {
		try {
			const response = await fetch(
				`${this.baseUrl}${API_CONFIG.ENDPOINTS.POSTS}/search?q=${encodeURIComponent(query)}`,
				{
					next: { revalidate: 300 }, // Revalida cada 5 minutos
				}
			);

			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}

			return await response.json();
		} catch (error) {
			console.error("Error searching posts:", error);
			throw new Error("Failed to search posts");
		}
	}
}
