import { blogService } from "@/data/blog-service";
import BlogCard from "@/components/BlogCard";
import MainLayout from "@/components/layout/MainLayout";

export default function Home() {
	// Server Component - datos obtenidos directamente en el servidor
	const allPosts = blogService.getAllPosts();
	const featuredPosts = blogService.getFeaturedPosts();

	// Mostrar posts destacados o los 3 más recientes
	const postsToShow = featuredPosts.length > 0 ? featuredPosts.slice(0, 3) : allPosts.slice(0, 3);

	return (
		<MainLayout pageTitle="Welcome to My Blog">
			<div className="mb-8">
				<h2 className="text-2xl font-bold mb-4">Recent Posts</h2>
				<div className="space-y-6">
					{postsToShow.map((post, index) => (
						<BlogCard
							key={post.id}
							post={post}
							showImage={true}
							imagePosition="left"
							size="medium"
							priority={index === 0}
						/>
					))}
				</div>
			</div>
		</MainLayout>
	);
}
