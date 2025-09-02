"use client";

import React from "react";
import BlogCardSkeleton from "./BlogCardSkeleton";

interface BlogListSkeletonProps {
	count?: number;
	showImage?: boolean;
	imagePosition?: "top" | "left" | "right";
	size?: "small" | "medium" | "large";
}

const BlogListSkeleton: React.FC<BlogListSkeletonProps> = ({
	count = 6,
	showImage = true,
	imagePosition = "top",
	size = "medium",
}) => {
	return (
		<div className="space-y-8">
			{Array.from({ length: count }).map((_, index) => (
				<BlogCardSkeleton key={index} showImage={showImage} imagePosition={imagePosition} size={size} />
			))}
		</div>
	);
};

export default BlogListSkeleton;
