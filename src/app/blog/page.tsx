import { blogService } from "@/data/blog-service";
import BlogContent from "@/components/BlogContent";

export default function BlogPage() {
	// Server Component - datos obtenidos directamente en el servidor
	const allPosts = blogService.getAllPosts();
	const categoriesCount = blogService.getAllCategories().length;
	const tagsCount = blogService.getAllTags().length;

	return <BlogContent allPosts={allPosts} categoriesCount={categoriesCount} tagsCount={tagsCount} />;
}
