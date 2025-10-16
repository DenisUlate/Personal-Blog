import { blogService } from "@/data/blog-service";
import BlogCard from "@/components/BlogCard";
import MainLayout from "@/components/layout/MainLayout";

export default function BlogPage() {
	// Server Component - datos obtenidos directamente en el servidor
	const allPosts = blogService.getAllPosts();

	return (
		<MainLayout pageTitle="All Blog Posts" showSearchBar={false}>
			<div className="space-y-6">
				{allPosts.length === 0 ? (
					<div className="text-center py-12">
						<p className="text-xl text-primary mb-2">No posts found</p>
						<p className="text-primary">Check back later for new content</p>
					</div>
				) : (
					allPosts.map((post, index) => (
						<BlogCard
							key={post.id}
							post={post}
							showImage={true}
							imagePosition="left"
							size="medium"
							priority={index === 0}
						/>
					))
				)}
			</div>

			{/* Estadísticas del blog */}
			<div className="mt-12 p-6 bg-muted rounded-lg border border-border">
				<h3 className="text-lg font-semibold mb-2">Blog Stats</h3>
				<div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
					<div>
						<span className="text-muted-foreground">Total Posts:</span>
						<span className="ml-2 font-bold text-primary">{allPosts.length}</span>
					</div>
					<div>
						<span className="text-muted-foreground">Categories:</span>
						<span className="ml-2 font-bold text-primary">{blogService.getAllCategories().length}</span>
					</div>
					<div>
						<span className="text-muted-foreground">Tags:</span>
						<span className="ml-2 font-bold text-primary">{blogService.getAllTags().length}</span>
					</div>
				</div>
			</div>
		</MainLayout>
	);
}
