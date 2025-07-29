"use client";

import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Calendar } from "lucide-react";
import Link from "next/link";
import { useEffect, useState, use } from "react";
import { BarLoader } from "react-spinners";
import MainLayout from "@/components/layout/MainLayout";

interface BlogPost {
	id: number;
	title: string;
	body: string;
	userId: number;
	tags: string[];
}

export default function PostPage({ params }: { params: Promise<{ id: string }> }) {
	const { id } = use(params);
	const [post, setPost] = useState<BlogPost | null>(null);
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchPost = async () => {
			try {
				setIsLoading(true);
				const response = await fetch(`https://dummyjson.com/posts/${id}`);

				if (!response.ok) {
					throw new Error("Failed to fetch post");
				}

				const data: BlogPost = await response.json();
				setPost(data);
			} catch (error) {
				setError(error instanceof Error ? error.message : "An error occurred");
				console.error("Error fetching post:", error);
			} finally {
				setIsLoading(false);
			}
		};

		fetchPost();
	}, [id]);

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
			<div className="flex flex-col space-y-6 justify-center items-center h-screen">
				<p className="text-2xl text-neutral-400 font-semibold">Loading Post</p>
				<BarLoader color="#fff" width={120} />
			</div>
		);
	}

	if (error) {
		return <div className="text-center p-8 text-2xl text-red-500">Error: {error}</div>;
	}

	if (!post) {
		return <div className="text-center p-8 text-2xl text-red-500">Post not found</div>;
	}

	return (
		<MainLayout showSidebar={false}>
			<Link href="/" className="flex items-center gap-2 text-neutral-400 hover:text-neutral-200 mb-6">
				<ArrowLeft size={16} className="text-neutral-400" />
				<span>Back to all posts</span>
			</Link>

			<article className="bg-[#1e1e1e] border p-8 rounded-lg shadow-lg">
				<h1 className="text-4xl font-bold text-neutral-200 mb-4">{post.title}</h1>

				<div className="flex items-center space-x-2 text-neutral-400 mb-4">
					<Calendar size={16} className="text-neutral-400" />
					<span className="text-neutral-400 ml-2">{formatDate()}</span>
				</div>

				<p className="mt-4 text-neutral-300 leading-relaxed">{post.body}</p>

				<div className="flex gap-2">
					{post.tags.map((tag, index) => (
						<Badge variant="default" key={index} className="bg-neutral-700 px-2 py-1 rounded-md text-sm">
							#{tag}
						</Badge>
					))}
				</div>
			</article>
		</MainLayout>
	);
}
