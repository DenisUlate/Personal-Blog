"use client";

import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Calendar, Folder } from "lucide-react";
import Link from "next/link";
import { useEffect, useState, use } from "react";
import MainLayout from "@/components/layout/MainLayout";
import MarkdownContent from "@/components/MarkdownContent";
import { BlogPost } from "@/types/blog";
import GoToTopButton from "@/components/GoToTopButton";
import BlogPostSkeleton from "@/components/BlogPostSkeleton";
import BlogPostJsonLd from "@/components/BlogPostJsonLd";

export default function PostPage({ params }: { params: Promise<{ id: string }> }) {
	const { id } = use(params);
	const [post, setPost] = useState<BlogPost | null>(null);
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchPost = async () => {
			try {
				setIsLoading(true);
				const response = await fetch(`/api/posts/${id}`);

				if (!response.ok) {
					throw new Error("Post not found");
				}

				const postData = await response.json();
				setPost(postData);
			} catch (error) {
				setError(error instanceof Error ? error.message : "An error occurred");
				console.error("Error fetching post:", error);
			} finally {
				setIsLoading(false);
			}
		};

		fetchPost();
	}, [id]);

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
		return <BlogPostSkeleton />;
	}

	if (error) {
		return <div className="text-center p-8 text-2xl text-red-500">Error: {error}</div>;
	}

	if (!post) {
		return <div className="text-center p-8 text-2xl text-red-500">Post not found</div>;
	}

	return (
		<MainLayout showSidebar={false}>
			{/* JSON-LD para SEO */}
			<BlogPostJsonLd post={post} />

			<Link href="/" className="flex items-center gap-2 text-primary hover:text-foreground mb-6">
				<ArrowLeft size={16} className="text-primary" />
				<span>Back to all posts</span>
			</Link>

			<article className="bg-card border border-border p-8 rounded-lg shadow-lg">
				<h1 className="text-4xl font-bold text-foreground mb-4">{post.title}</h1>

				{post.category && (
					<div className="mb-4">
						<Badge
							variant="default"
							className="px-3 py-1 rounded-md text-[10px] uppercase tracking-wide inline-flex items-center justify-center gap-1.5 leading-none">
							<Folder className="size-3" />
							<span className="mt-px">{post.category}</span>
						</Badge>
					</div>
				)}

				<div className="flex items-center space-x-2 text-primary mb-6">
					<Calendar size={16} className="text-primary" />
					<span className="text-primary ml-2">{formatDate(post.date)}</span>
					<span className="text-muted-foreground">by {post.author}</span>
				</div>

				<div className="mb-6">
					<MarkdownContent content={post.content} />
				</div>

				<div className="flex gap-2 pt-6 border-t border-border">
					{post.tags.map((tag, index) => (
						<Badge variant="default" key={index} className="bg-muted px-2 py-1 rounded-md text-sm">
							#{tag}
						</Badge>
					))}
				</div>
			</article>
			<GoToTopButton />
		</MainLayout>
	);
}
