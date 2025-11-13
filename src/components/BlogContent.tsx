"use client";

import { useState, useMemo, useRef } from "react";
import { BlogPost } from "@/types/blog";
import BlogCard from "@/components/BlogCard";
import MainLayout from "@/components/layout/MainLayout";
import Pagination from "@/components/Pagination";
import { BLOG_CONFIG } from "@/lib/constants";

interface BlogContentProps {
	allPosts: BlogPost[];
	categoriesCount: number;
	tagsCount: number;
}

export default function BlogContent({ allPosts, categoriesCount, tagsCount }: BlogContentProps) {
	// State for search term
	const [searchTerm, setSearchTerm] = useState("");
	// State for current page
	const [currentPage, setCurrentPage] = useState(1);
	// Ref for scroll to top
	const contentTopRef = useRef<HTMLDivElement>(null);

	// Get posts per page from constants
	const POSTS_PER_PAGE = BLOG_CONFIG.POSTS_PER_PAGE;

	// Filter posts based on search term
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

	// Calculate pagination
	const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);
	const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
	const endIndex = startIndex + POSTS_PER_PAGE;
	const paginatedPosts = filteredPosts.slice(startIndex, endIndex);

	// Handle page change with smooth scroll to top
	const handlePageChange = (page: number) => {
		setCurrentPage(page);
		// Scroll to top of content smoothly
		contentTopRef.current?.scrollIntoView({
			behavior: "smooth",
			block: "start",
		});
	};

	// Handle search with page reset
	const handleSearch = (term: string) => {
		setSearchTerm(term);
		setCurrentPage(1); // Reset to first page on new search
	};

	return (
		<MainLayout pageTitle="All Blog Posts" showSearchBar={true} onSearch={handleSearch} recentPosts={allPosts}>
			{/* Reference point for scroll */}
			<div ref={contentTopRef} />

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
					<>
						{/* Render only paginated posts */}
						{paginatedPosts.map((post, index) => (
							<BlogCard
								key={post.id}
								post={post}
								showImage={true}
								imagePosition="left"
								size="medium"
								priority={index === 0 && currentPage === 1}
							/>
						))}

						{/* Pagination Component */}
						{totalPages > 1 && (
							<div className="mt-8 flex justify-center">
								<Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
							</div>
						)}
					</>
				)}
			</div>

			{/* Blog Stats */}
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
