"use client";

import React from "react";
import { Calendar } from "lucide-react";
import Link from "next/link";
import { BlogPost } from "@/types/blog";

interface RecentBlogsProps {
	posts: BlogPost[];
	limit?: number;
}

const RecentBlogs: React.FC<RecentBlogsProps> = ({ posts, limit = 5 }) => {
	const recentPosts = posts.slice(0, limit);

	const formatDate = () => {
		const date = new Date();
		return date.toLocaleDateString("en-US", {
			month: "short",
			day: "numeric",
			year: "numeric",
		});
	};

	return (
		<div className="bg-transparent border-l border-border rounded-lg p-6 sticky top-4">
			<h3 className="text-xl font-semibold text-foreground mb-4">Recent Posts</h3>
			<div className="space-y-4">
				{recentPosts.map((post) => (
					<Link
						key={post.id}
						href={`/blog/${post.id}`}
						className="block group hover:bg-gradient-to-r from-card to-transparent p-3 rounded-md transition-colors duration-200">
						<h4 className="text-sm font-medium text-foreground group-hover:text-primary line-clamp-2 mb-2">
							{post.title}
						</h4>
						<div className="flex items-center text-xs text-muted-foreground">
							<Calendar size={12} className="mr-1" />
							<span>{formatDate()}</span>
						</div>
					</Link>
				))}
			</div>
		</div>
	);
};

export default RecentBlogs;
