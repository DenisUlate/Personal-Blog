"use client";

import React, { useEffect, useState } from "react";
import { Badge } from "./ui/badge";
import { BarLoader } from "react-spinners";
import { Calendar } from "lucide-react";
import Link from "next/link";
import Pagination from "./Pagination";
import { BlogPost, BlogsResponse } from "@/types/blog";

const Blogs: React.FC = () => {
	const [posts, setPosts] = useState<BlogPost[]>([]);
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);
	const [currentPage, setCurrentPage] = useState<number>(1);

	const postsPerPage = 10;
	const totalPages = Math.ceil(posts.length / postsPerPage);

	useEffect(() => {
		const fetchBlogs = async () => {
			try {
				setIsLoading(true);
				const response = await fetch("https://dummyjson.com/posts");

				if (!response.ok) {
					throw new Error("Failed to fetch posts");
				}

				const data: BlogsResponse = await response.json();
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

	// Calcular las publicaciones visibles para la página actual
	const startIndex = (currentPage - 1) * postsPerPage;
	const currentPosts = posts.slice(startIndex, startIndex + postsPerPage);

	// Function to format the current date
	const formatDate = () => {
		const date = new Date();
		return date.toLocaleDateString("en-US", {
			year: "numeric",
			month: "long",
			day: "numeric",
		});
	};

	if (isLoading) {
		return (
			<div className="flex flex-col space-y-6 justify-center items-center h-full">
				<p className="text-2xl text-neutral-400 font-semibold">Loading Posts</p>
				<BarLoader color="#fff" width={120} />
			</div>
		);
	}

	if (error) {
		return <div className="text-center p-8 text-2xl text-red-500">Error: {error}</div>;
	}

	return (
		<div className="w-full h-full p-8">
			<h1 className="text-3xl font-bold text-neutral-400 mb-8">Blog Posts</h1>
			<div className="space-y-8">
				{currentPosts.map((post) => (
					<div
						key={post.id}
						className="border p-6 rounded-lg shadow-sm bg-card hover:bg-muted duration-500 ease-in-out">
						<Link href={`/blog/${post.id}`} className="flex flex-col">
							<h2 className="text-2xl text-neutral-300 font-semibold mb-2">{post.title}</h2>
							<div className="flex items-center space-x-2 text-gray-500 mb-4">
								<Calendar size={16} />
								<span>{formatDate()}</span>
							</div>
							<p className="mb-4 text-neutral-400">{post.body}</p>
							<div className="flex gap-2 mb-2">
								{post.tags.map((tag, index) => (
									<Badge variant="default" key={index} className="bg-neutral-700 px-2 py-1 rounded-md text-sm">
										#{tag}
									</Badge>
								))}
							</div>
						</Link>
					</div>
				))}
			</div>
			{/* Componente de paginación */}
			<div className="my-8">
				<Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
			</div>
		</div>
	);
};

export default Blogs;
