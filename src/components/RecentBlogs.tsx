"use client";

import React from "react";
import { BlogPost } from "@/types/blog";
import BlogCard from "./BlogCard";
import BlogCardSkeleton from "./BlogCardSkeleton";

interface RecentBlogsProps {
	posts: BlogPost[];
	limit?: number;
	showImages?: boolean;
	isLoading?: boolean;
}

const RecentBlogs: React.FC<RecentBlogsProps> = ({ posts, limit = 5, showImages = false, isLoading = false }) => {
	const recentPosts = posts.slice(0, limit);

	return (
		<div className="bg-transparent border-l border-border rounded-lg p-6 sticky top-4">
			<h3 className="text-xl font-semibold text-foreground mb-4">Recent Posts</h3>
			<div className="space-y-4">
				{isLoading
					? // Show skeleton loading state
					  Array.from({ length: limit }).map((_, index) => (
							<BlogCardSkeleton key={index} showImage={showImages} imagePosition="left" size="small" />
					  ))
					: // Show actual posts
					  recentPosts.map((post) => (
							<BlogCard key={post.id} post={post} showImage={showImages} imagePosition="left" size="small" />
					  ))}
			</div>
		</div>
	);
};

export default RecentBlogs;
