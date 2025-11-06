import MainLayout from "@/components/layout/MainLayout";
import TagItem from "@/components/TagItem";
import { blogService } from "@/lib/blog-service";

export default function TagsPage() {
	// Server Component - datos reales del BlogService
	const allPosts = blogService.getAllPosts();
	const tagNames = blogService.getAllTags();

	// Calcular posts por tag y fecha del último post
	const tagsWithData = tagNames.map((tagName) => {
		const postsWithTag = allPosts.filter((post) => post.tags.includes(tagName));
		const sortedPosts = postsWithTag.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

		return {
			name: tagName,
			count: postsWithTag.length,
			// Use the most recent post's date, or undefined if no posts exist
			// Avoid using current date as fallback to prevent misleading "recent activity" indication
			date: sortedPosts[0]?.date,
		};
	});

	// Ordenar por cantidad de posts (descendente)
	const sortedTags = tagsWithData.sort((a, b) => b.count - a.count);

	return (
		<MainLayout pageTitle="Tags" recentPosts={allPosts}>
			<p className="text-primary">Explore blog posts by tags.</p>

			<div className="mt-8 space-y-4">
				{sortedTags.length === 0 ? (
					<p className="text-muted-foreground">No tags found.</p>
				) : (
					sortedTags.map((tag) => <TagItem key={tag.name} {...tag} />)
				)}
			</div>
		</MainLayout>
	);
}
