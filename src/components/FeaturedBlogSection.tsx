"use client";

import React from "react";
import { BlogPost } from "@/types/blog";
import BlogCard from "./BlogCard";

interface FeaturedBlogSectionProps {
	posts: BlogPost[];
	title?: string;
}

const FeaturedBlogSection: React.FC<FeaturedBlogSectionProps> = ({ posts, title = "Featured Posts" }) => {
	const featuredPosts = posts.filter((post) => post.featured);

	if (featuredPosts.length === 0) {
		return null;
	}

	return (
		<section className="mb-12">
			<h2 className="text-3xl font-bold text-foreground mb-8">{title}</h2>

			<div className="grid gap-8">
				{/* First featured post - large hero style */}
				{featuredPosts[0] && (
					<div className="col-span-full">
						<BlogCard post={featuredPosts[0]} showImage={true} imagePosition="top" size="large" />
					</div>
				)}

				{/* Remaining featured posts - smaller grid */}
				{featuredPosts.length > 1 && (
					<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
						{featuredPosts.slice(1, 4).map((post) => (
							<BlogCard key={post.id} post={post} showImage={true} imagePosition="top" size="small" />
						))}
					</div>
				)}
			</div>
		</section>
	);
};

export default FeaturedBlogSection;
