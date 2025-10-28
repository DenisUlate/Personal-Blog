"use client";

import { useState, useMemo } from "react";
import { BlogPost } from "@/types/blog";
import BlogCard from "@/components/BlogCard";
import MainLayout from "@/components/layout/MainLayout";

interface HomeContentProps {
	allPosts: BlogPost[];
	featuredPosts: BlogPost[];
}

export default function HomeContent({ allPosts, featuredPosts }: HomeContentProps) {
	// Estado para el término de búsqueda
	const [searchTerm, setSearchTerm] = useState("");

	// Determinar posts iniciales (destacados o recientes)
	const initialPosts = featuredPosts.length > 0 ? featuredPosts.slice(0, 3) : allPosts.slice(0, 3);

	// Filtrar posts basado en el término de búsqueda
	const filteredPosts = useMemo(() => {
		if (!searchTerm.trim()) {
			return initialPosts;
		}

		const lowerSearchTerm = searchTerm.toLowerCase();
		// Cuando hay búsqueda, buscar en TODOS los posts, no solo los destacados
		return allPosts.filter(
			(post) =>
				post.title.toLowerCase().includes(lowerSearchTerm) ||
				post.excerpt.toLowerCase().includes(lowerSearchTerm) ||
				post.tags.some((tag) => tag.toLowerCase().includes(lowerSearchTerm)) ||
				post.category?.toLowerCase().includes(lowerSearchTerm)
		);
	}, [initialPosts, allPosts, searchTerm]);

	// Función para manejar la búsqueda
	const handleSearch = (term: string) => {
		setSearchTerm(term);
	};

	return (
		<MainLayout showSearchBar={true} onSearch={handleSearch} recentPosts={allPosts}>
			<div className="mb-8">
				{searchTerm && (
					<p className="text-sm text-muted-foreground mb-4">
						Showing {filteredPosts.length} result{filteredPosts.length !== 1 ? "s" : ""} for &quot;{searchTerm}&quot;
					</p>
				)}
				<div className="space-y-6">
					{filteredPosts.length === 0 ? (
						<div className="text-center py-12">
							<p className="text-xl text-primary mb-2">No posts found matching your search</p>
							<p className="text-primary">Try a different search term</p>
						</div>
					) : (
						filteredPosts.map((post, index) => (
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
			</div>
		</MainLayout>
	);
}
