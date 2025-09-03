"use client";

import React, { useEffect, useState, useMemo, useCallback } from "react";
import Pagination from "./Pagination";
import { BlogPost } from "@/types/blog";
import MainLayout from "./layout/MainLayout";
import GoToTopButton from "./GoToTopButton";
import BlogCard from "./BlogCard";
import BlogListSkeleton from "./BlogListSkeleton";

const Blogs: React.FC = () => {
	const [posts, setPosts] = useState<BlogPost[]>([]);
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);
	const [currentPage, setCurrentPage] = useState<number>(1);
	const [searchTerm, setSearchTerm] = useState<string>("");

	const postsPerPage = 10;

	// Memoize filtered posts to avoid recalculation on every render
	const filteredPosts = useMemo(
		() => posts.filter((post) => post.title.toLowerCase().includes(searchTerm.toLowerCase())),
		[posts, searchTerm]
	);

	// Memoize total pages calculation
	const totalPages = useMemo(
		() => Math.ceil(filteredPosts.length / postsPerPage),
		[filteredPosts.length, postsPerPage]
	);

	// Memoize current posts calculation
	const currentPosts = useMemo(() => {
		const startIndex = (currentPage - 1) * postsPerPage;
		return filteredPosts.slice(startIndex, startIndex + postsPerPage);
	}, [filteredPosts, currentPage, postsPerPage]);

	// Memoize search handler to avoid recreation on every render
	const handleSearch = useCallback((term: string) => {
		setSearchTerm(term);
		setCurrentPage(1); // Reset to first page when searching
	}, []);

	useEffect(() => {
		const fetchBlogs = async () => {
			try {
				setIsLoading(true);
				const response = await fetch("/api/posts");

				if (!response.ok) {
					throw new Error("Failed to fetch posts");
				}

				const data = await response.json();
				setPosts(data.posts);
			} catch (error) {
				setError(error instanceof Error ? error.message : "An error occurred");
				console.error("Error fetching posts:", error);
			} finally {
				setIsLoading(false);
			}
		};

		fetchBlogs();
	}, []);

	if (isLoading) {
		return (
			<MainLayout pageTitle="Blog Posts" showSearchBar={true} onSearch={handleSearch}>
				<BlogListSkeleton count={postsPerPage} showImage={true} imagePosition="top" size="medium" />
			</MainLayout>
		);
	}

	if (error) {
		return <div className="text-center p-8 text-2xl text-red-500">Error: {error}</div>;
	}

	return (
		<MainLayout pageTitle="Blog Posts" showSearchBar={true} onSearch={handleSearch}>
			{/* Posts */}
			<div className="space-y-8">
				{currentPosts.length === 0 && searchTerm ? (
					<div className="text-center py-12">
						<p className="text-xl text-primary mb-2">No posts found</p>
						<p className="text-primary">Try searching with different keywords</p>
					</div>
				) : (
					currentPosts.map((post) => (
						<BlogCard key={post.id} post={post} showImage={true} imagePosition="top" size="medium" />
					))
				)}
			</div>

			{/* Componente de paginación */}
			<div className="my-8">
				<Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
			</div>
			<GoToTopButton />
		</MainLayout>
	);
};

export default Blogs;
