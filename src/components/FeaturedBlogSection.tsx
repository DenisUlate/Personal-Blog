"use client";

import React, { useMemo } from "react";
import { BlogPost } from "@/types/blog";
import BlogCard from "./BlogCard";
import BlogCardSkeleton from "./BlogCardSkeleton";

interface FeaturedBlogSectionProps {
	posts: BlogPost[];
	title?: string;
	isLoading?: boolean;
}

const FeaturedBlogSection: React.FC<FeaturedBlogSectionProps> = React.memo(
	({ posts, title = "Featured Posts", isLoading = false }) => {
		// Memoize featured posts filter to avoid recalculation
		const featuredPosts = useMemo(() => posts.filter((post) => post.featured), [posts]);

		// Memoize skeleton components to avoid recreation
		const skeletonContent = useMemo(
			() => (
				<>
					{/* First featured post skeleton - large hero style */}
					<div className="col-span-full">
						<BlogCardSkeleton showImage={true} imagePosition="top" size="large" />
					</div>

					{/* Remaining featured posts skeletons - smaller grid */}
					<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
						{Array.from({ length: 3 }).map((_, index) => (
							<BlogCardSkeleton key={index} showImage={true} imagePosition="top" size="small" />
						))}
					</div>
				</>
			),
			[]
		);

		// Memoize remaining featured posts to avoid recalculation
		const remainingFeaturedPosts = useMemo(() => featuredPosts.slice(1, 4), [featuredPosts]);

		if (!isLoading && featuredPosts.length === 0) {
			return null;
		}

		return (
			<section className="mb-12">
				<h2 className="text-3xl font-bold text-foreground mb-8">{title}</h2>

				<div className="grid gap-8">
					{isLoading ? (
						skeletonContent
					) : (
						// Show actual posts
						<>
							{/* First featured post - large hero style */}
							{featuredPosts[0] && (
								<div className="col-span-full">
									<BlogCard post={featuredPosts[0]} showImage={true} imagePosition="top" size="large" />
								</div>
							)}

							{/* Remaining featured posts - smaller grid */}
							{featuredPosts.length > 1 && (
								<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
									{remainingFeaturedPosts.map((post) => (
										<BlogCard key={post.id} post={post} showImage={true} imagePosition="top" size="small" />
									))}
								</div>
							)}
						</>
					)}
				</div>
			</section>
		);
	}
);

FeaturedBlogSection.displayName = "FeaturedBlogSection";

export default FeaturedBlogSection;
