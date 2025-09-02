"use client";

import React from "react";
import { Skeleton } from "./ui/skeleton";

interface BlogCardSkeletonProps {
	showImage?: boolean;
	imagePosition?: "top" | "left" | "right";
	size?: "small" | "medium" | "large";
}

const BlogCardSkeleton: React.FC<BlogCardSkeletonProps> = ({
	showImage = true,
	imagePosition = "top",
	size = "medium",
}) => {
	// Size configurations
	const sizeClasses = {
		small: {
			container: "p-4",
			image: "h-32",
			title: "h-5",
			spacing: "space-y-2",
		},
		medium: {
			container: "p-6",
			image: "h-48",
			title: "h-6",
			spacing: "space-y-3",
		},
		large: {
			container: "p-8",
			image: "h-64",
			title: "h-8",
			spacing: "space-y-4",
		},
	};

	const currentSize = sizeClasses[size];

	// Render top image layout
	if (imagePosition === "top") {
		return (
			<article
				className={`bg-card border border-border rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 ${currentSize.container}`}>
				<div className={currentSize.spacing}>
					{showImage && <Skeleton className={`w-full ${currentSize.image} rounded-lg`} />}

					<div className="space-y-2">
						{/* Title skeleton */}
						<Skeleton className={`w-3/4 ${currentSize.title}`} />

						{/* Excerpt skeleton */}
						<div className="space-y-2">
							<Skeleton className="h-4 w-full" />
							<Skeleton className="h-4 w-5/6" />
							{size !== "small" && <Skeleton className="h-4 w-4/5" />}
						</div>

						{/* Meta information skeleton */}
						<div className="flex items-center gap-4 pt-2">
							<div className="flex items-center gap-2">
								<Skeleton className="h-4 w-4" />
								<Skeleton className="h-4 w-24" />
							</div>
							<div className="flex items-center gap-2">
								<Skeleton className="h-4 w-4" />
								<Skeleton className="h-4 w-20" />
							</div>
						</div>

						{/* Tags skeleton */}
						<div className="flex flex-wrap gap-2 pt-2">
							<Skeleton className="h-6 w-16 rounded-full" />
							<Skeleton className="h-6 w-20 rounded-full" />
							<Skeleton className="h-6 w-14 rounded-full" />
						</div>
					</div>
				</div>
			</article>
		);
	}

	// Render side image layout (left or right)
	return (
		<article
			className={`bg-card border border-border rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 ${currentSize.container}`}>
			<div className={`flex gap-4 ${imagePosition === "right" ? "flex-row-reverse" : ""}`}>
				{showImage && (
					<div className="flex-shrink-0">
						<Skeleton className={`w-24 ${currentSize.image} rounded-lg`} />
					</div>
				)}

				<div className={`flex-1 ${currentSize.spacing}`}>
					{/* Title skeleton */}
					<Skeleton className={`w-full ${currentSize.title}`} />

					{/* Excerpt skeleton - fewer lines for side layout */}
					<div className="space-y-1">
						<Skeleton className="h-3 w-full" />
						<Skeleton className="h-3 w-4/5" />
					</div>

					{/* Meta information skeleton */}
					<div className="flex items-center gap-3 text-xs">
						<div className="flex items-center gap-1">
							<Skeleton className="h-3 w-3" />
							<Skeleton className="h-3 w-16" />
						</div>
					</div>

					{/* Tags skeleton */}
					<div className="flex flex-wrap gap-1">
						<Skeleton className="h-5 w-12 rounded-full" />
						<Skeleton className="h-5 w-16 rounded-full" />
					</div>
				</div>
			</div>
		</article>
	);
};

export default BlogCardSkeleton;
