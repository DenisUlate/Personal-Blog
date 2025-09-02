"use client";

import React from "react";
import BlogCardSkeleton from "./BlogCardSkeleton";
import BlogListSkeleton from "./BlogListSkeleton";

/**
 * Demo component to showcase different skeleton loading states
 * This component demonstrates various skeleton configurations
 */
const SkeletonDemo: React.FC = () => {
	return (
		<div className="max-w-4xl mx-auto p-8 space-y-12">
			<h1 className="text-3xl font-bold text-foreground mb-8">Skeleton Loading States Demo</h1>

			{/* Single Blog Card Skeletons */}
			<section>
				<h2 className="text-2xl font-semibold mb-6">Single Blog Card Skeletons</h2>

				<div className="grid gap-8">
					{/* Large size with top image */}
					<div>
						<h3 className="text-lg font-medium mb-4">Large Size - Top Image</h3>
						<BlogCardSkeleton showImage={true} imagePosition="top" size="large" />
					</div>

					{/* Medium size with top image */}
					<div>
						<h3 className="text-lg font-medium mb-4">Medium Size - Top Image</h3>
						<BlogCardSkeleton showImage={true} imagePosition="top" size="medium" />
					</div>

					{/* Small size with left image */}
					<div>
						<h3 className="text-lg font-medium mb-4">Small Size - Left Image</h3>
						<BlogCardSkeleton showImage={true} imagePosition="left" size="small" />
					</div>

					{/* Without image */}
					<div>
						<h3 className="text-lg font-medium mb-4">Medium Size - No Image</h3>
						<BlogCardSkeleton showImage={false} size="medium" />
					</div>
				</div>
			</section>

			{/* Blog List Skeleton */}
			<section>
				<h2 className="text-2xl font-semibold mb-6">Blog List Skeleton</h2>
				<p className="text-muted-foreground mb-4">This is used for loading states in blog listings</p>
				<BlogListSkeleton count={3} showImage={true} imagePosition="top" size="medium" />
			</section>

			{/* Recent Posts Sidebar Style */}
			<section>
				<h2 className="text-2xl font-semibold mb-6">Recent Posts Sidebar Style</h2>
				<div className="max-w-sm">
					<div className="bg-transparent border-l border-border rounded-lg p-6">
						<h3 className="text-xl font-semibold text-foreground mb-4">Recent Posts</h3>
						<div className="space-y-4">
							{Array.from({ length: 5 }).map((_, index) => (
								<BlogCardSkeleton key={index} showImage={false} imagePosition="left" size="small" />
							))}
						</div>
					</div>
				</div>
			</section>
		</div>
	);
};

export default SkeletonDemo;
