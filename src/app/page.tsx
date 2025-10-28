import { blogService } from "@/data/blog-service";
import HomeContent from "@/components/HomeContent";

export default function Home() {
	// Server Component - datos obtenidos directamente en el servidor
	const allPosts = blogService.getAllPosts();
	const featuredPosts = blogService.getFeaturedPosts();

	return <HomeContent allPosts={allPosts} featuredPosts={featuredPosts} />;
}
