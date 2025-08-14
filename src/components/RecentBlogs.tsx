"use client";

import React from "react";
import { BlogPost } from "@/types/blog";
import BlogCard from "./BlogCard";

interface RecentBlogsProps {
	posts: BlogPost[];
	limit?: number;
	showImages?: boolean;
}

const RecentBlogs: React.FC<RecentBlogsProps> = ({ posts, limit = 5, showImages = false }) => {
	const recentPosts = posts.slice(0, limit);

	return (
		<div className="bg-transparent border-l border-border rounded-lg p-6 sticky top-4">
			<h3 className="text-xl font-semibold text-foreground mb-4">Recent Posts</h3>
			<div className="space-y-4">
				{recentPosts.map((post) => (
					<BlogCard key={post.id} post={post} showImage={showImages} imagePosition="left" size="small" />
				))}
			</div>
		</div>
	);
};

export default RecentBlogs;
