"use client";

import { useState, useMemo } from "react";
import { BlogPost } from "@/types/blog";
import BlogCard from "@/components/BlogCard";
import MainLayout from "@/components/layout/MainLayout";

interface BlogContentProps {
	allPosts: BlogPost[];
	categoriesCount: number;
	tagsCount: number;
}

export default function BlogContent({ allPosts, categoriesCount, tagsCount }: BlogContentProps) {
	// Estado para el término de búsqueda
	const [searchTerm, setSearchTerm] = useState("");

	// Filtrar posts basado en el término de búsqueda
	const filteredPosts = useMemo(() => {
		if (!searchTerm.trim()) {
			return allPosts;
		}

		const lowerSearchTerm = searchTerm.toLowerCase();
		return allPosts.filter(
			(post) =>
				post.title.toLowerCase().includes(lowerSearchTerm) ||
				post.excerpt.toLowerCase().includes(lowerSearchTerm) ||
				post.tags.some((tag) => tag.toLowerCase().includes(lowerSearchTerm)) ||
				post.category?.toLowerCase().includes(lowerSearchTerm)
		);
	}, [allPosts, searchTerm]);

	// Función para manejar la búsqueda
	const handleSearch = (term: string) => {
		setSearchTerm(term);
	};

	return (
		<MainLayout pageTitle="All Blog Posts" showSearchBar={true} onSearch={handleSearch} recentPosts={allPosts}>
			<div className="space-y-6">
				{filteredPosts.length === 0 ? (
					<div className="text-center py-12">
						<p className="text-xl text-primary mb-2">
							{searchTerm ? "No posts found matching your search" : "No posts found"}
						</p>
						<p className="text-primary">
							{searchTerm ? "Try a different search term" : "Check back later for new content"}
						</p>
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

			{/* Estadísticas del blog */}
			<div className="mt-12 p-6 bg-muted rounded-lg border border-border">
				<h3 className="text-lg font-semibold mb-2">Blog Stats</h3>
				<div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
					<div>
						<span className="text-muted-foreground">{searchTerm ? "Showing:" : "Total Posts:"}</span>
						<span className="ml-2 font-bold text-primary">{searchTerm ? filteredPosts.length : allPosts.length}</span>
					</div>
					<div>
						<span className="text-muted-foreground">Categories:</span>
						<span className="ml-2 font-bold text-primary">{categoriesCount}</span>
					</div>
					<div>
						<span className="text-muted-foreground">Tags:</span>
						<span className="ml-2 font-bold text-primary">{tagsCount}</span>
					</div>
				</div>
			</div>
		</MainLayout>
	);
}
