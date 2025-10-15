"use client";

import React from "react";
import { Skeleton } from "./ui/skeleton";
import MainLayout from "./layout/MainLayout";

const BlogPostSkeleton: React.FC = () => {
	return (
		<MainLayout showSidebar={false}>
			<div role="status" aria-live="polite" aria-label="Loading blog post">
				{/* Back to all posts link skeleton */}
				<div className="flex items-center gap-2 mb-6">
					<Skeleton className="h-4 w-4" />
					<Skeleton className="h-4 w-32" />
				</div>

				<article className="bg-card border border-border p-8 rounded-lg shadow-lg">
					{/* Title skeleton */}
					<Skeleton className="h-10 w-3/4 mb-4" />

					{/* Category badge skeleton */}
					<div className="mb-4">
						<Skeleton className="h-6 w-24 rounded-md" />
					</div>

					{/* Date and author skeleton */}
					<div className="flex items-center space-x-4 mb-6">
						<div className="flex items-center gap-2">
							<Skeleton className="h-4 w-4" />
							<Skeleton className="h-4 w-32" />
						</div>
						<Skeleton className="h-4 w-20" />
					</div>

					{/* Content skeleton */}
					<div className="mb-6 space-y-4">
						{/* Paragraph 1 */}
						<div className="space-y-2">
							<Skeleton className="h-4 w-full" />
							<Skeleton className="h-4 w-full" />
							<Skeleton className="h-4 w-3/4" />
						</div>

						{/* Paragraph 2 */}
						<div className="space-y-2">
							<Skeleton className="h-4 w-full" />
							<Skeleton className="h-4 w-full" />
							<Skeleton className="h-4 w-5/6" />
						</div>

						{/* Paragraph 3 */}
						<div className="space-y-2">
							<Skeleton className="h-4 w-full" />
							<Skeleton className="h-4 w-4/5" />
						</div>

						{/* Subheading */}
						<Skeleton className="h-6 w-1/2 mt-6" />

						{/* More content */}
						<div className="space-y-2">
							<Skeleton className="h-4 w-full" />
							<Skeleton className="h-4 w-full" />
							<Skeleton className="h-4 w-2/3" />
						</div>
					</div>

					{/* Tags skeleton */}
					<div className="flex gap-2 pt-6 border-t border-border">
						<Skeleton className="h-6 w-16 rounded-md" />
						<Skeleton className="h-6 w-20 rounded-md" />
						<Skeleton className="h-6 w-14 rounded-md" />
					</div>
				</article>
			</div>
		</MainLayout>
	);
};
export default BlogPostSkeleton;
