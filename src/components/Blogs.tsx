"use client";

import React, { useEffect, useState } from "react";
import { Badge } from "./ui/badge";
import { BarLoader } from "react-spinners";
import { Calendar, Folder } from "lucide-react";
import Link from "next/link";
import Pagination from "./Pagination";
import { BlogPost } from "@/types/blog";
import MainLayout from "./layout/MainLayout";

const Blogs: React.FC = () => {
	const [posts, setPosts] = useState<BlogPost[]>([]);
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);
	const [currentPage, setCurrentPage] = useState<number>(1);
	const [searchTerm, setSearchTerm] = useState<string>("");

	const postsPerPage = 10;

	// Filtrar posts basado en el término de búsqueda
	const filteredPosts = posts.filter((post) => post.title.toLowerCase().includes(searchTerm.toLowerCase()));

	const totalPages = Math.ceil(filteredPosts.length / postsPerPage);

	// Función para manejar la búsqueda
	const handleSearch = (term: string) => {
		setSearchTerm(term);
		setCurrentPage(1); // Resetear a la primera página cuando se busque
	};

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

	// Calcular las publicaciones visibles para la página actual
	const startIndex = (currentPage - 1) * postsPerPage;
	const currentPosts = filteredPosts.slice(startIndex, startIndex + postsPerPage);

	// Function to format date
	const formatDate = (dateString: string) => {
		const date = new Date(dateString);
		return date.toLocaleDateString("en-US", {
			year: "numeric",
			month: "long",
			day: "numeric",
		});
	};

	if (isLoading) {
		return (
			<div className="flex flex-col space-y-6 justify-center items-center h-full">
				<p className="text-2xl text-primary font-semibold">Loading Posts</p>
				<BarLoader color="#fff" width={120} />
			</div>
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
						<div
							key={post.id}
							className="border border-border p-6 rounded-lg shadow-sm bg-card hover:bg-muted duration-500 ease-in-out">
							<Link href={`/blog/${post.id}`} className="flex flex-col ">
								<h2 className="text-2xl text-foreground font-semibold mb-2">{post.title}</h2>
								{post.category && (
									<div className="mb-3">
										<Badge
											variant="default"
											className="bg-transparent px-2 py-1 rounded-md text-[10px] uppercase tracking-wide inline-flex items-center justify-center gap-1.5 leading-none">
											<Folder className="size-3" />
											<span className="mt-px">{post.category}</span>
										</Badge>
									</div>
								)}
								<div className="flex items-center space-x-2 text-muted-foreground mb-4">
									<Calendar size={16} />
									<span>{formatDate(post.date)}</span>
								</div>
								<p className="mb-4 text-primary">{post.excerpt}</p>
								<div className="flex gap-2 mb-2">
									{post.tags.map((tag, index) => (
										<Badge variant="default" key={index} className=" px-2 py-1 rounded-md text-sm">
											#{tag}
										</Badge>
									))}
								</div>
							</Link>
						</div>
					))
				)}
			</div>

			{/* Componente de paginación */}
			<div className="my-8">
				<Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
			</div>
		</MainLayout>
	);
};

export default Blogs;
