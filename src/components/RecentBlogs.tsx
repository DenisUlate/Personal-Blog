"use client";

import React, { useMemo } from "react";
import { BlogPost } from "@/types/blog";
import BlogCard from "./BlogCard";
import BlogCardSkeleton from "./BlogCardSkeleton";

interface RecentBlogsProps {
	posts: BlogPost[];
	limit?: number;
	showImages?: boolean;
	isLoading?: boolean;
}

const RecentBlogs: React.FC<RecentBlogsProps> = React.memo(
	({ posts, limit = 5, showImages = false, isLoading = false }) => {
		// Memoize the sliced posts to avoid recalculation on every render
		const recentPosts = useMemo(() => posts.slice(0, limit), [posts, limit]);

		// Memoize skeleton array to avoid recreation on every render
		const skeletonItems = useMemo(
			() =>
				Array.from({ length: limit }).map((_, index) => (
					<BlogCardSkeleton key={index} showImage={showImages} imagePosition="left" size="small" />
				)),
			[limit, showImages]
		);

		return (
			<div className="bg-transparent border-l border-border rounded-lg p-6 sticky top-4">
				<h3 className="text-xl font-semibold text-foreground mb-4">Recent Posts</h3>
				<div className="space-y-4">
					{isLoading
						? skeletonItems
						: recentPosts.map((post) => (
								<BlogCard key={post.id} post={post} showImage={showImages} imagePosition="left" size="small" />
						  ))}
				</div>
			</div>
		);
	}
);

RecentBlogs.displayName = "RecentBlogs";

export default RecentBlogs;
