"use client";

import React, { useMemo } from "react";
import { Badge } from "./ui/badge";
import { Calendar, Folder } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { BlogPost } from "@/types/blog";

interface BlogCardProps {
	post: BlogPost;
	showImage?: boolean;
	imagePosition?: "top" | "left" | "right";
	size?: "small" | "medium" | "large";
}

// Move sizeClasses outside component to avoid recreation
const sizeClasses = {
	small: {
		container: "p-4",
		image: "h-32",
		title: "text-fluid-lg",
		spacing: "space-y-2",
	},
	medium: {
		container: "p-6",
		image: "h-48",
		title: "text-fluid-2xl",
		spacing: "space-y-3",
	},
	large: {
		container: "p-8",
		image: "h-64",
		title: "text-fluid-3xl",
		spacing: "space-y-4",
	},
};

// Move formatDate outside component to avoid recreation
const formatDate = (dateString: string) => {
	const date = new Date(dateString);
	return date.toLocaleDateString("en-US", {
		year: "numeric",
		month: "long",
		day: "numeric",
	});
};

const BlogCard: React.FC<BlogCardProps> = React.memo(
	({ post, showImage = true, imagePosition = "top", size = "medium" }) => {
		const currentSize = sizeClasses[size];

		// Memoize formatted date to avoid recalculation
		const formattedDate = useMemo(() => formatDate(post.date), [post.date]);

		// Memoize visible tags to avoid recalculation
		const visibleTags = useMemo(() => post.tags.slice(0, 3), [post.tags]);
		const hasMoreTags = useMemo(() => post.tags.length > 3, [post.tags.length]);
		const remainingTagsCount = useMemo(() => post.tags.length - 3, [post.tags.length]);

		return (
			<div
				className={`border-none border-border rounded-lg shadow-sm bg-card hover:bg-muted duration-500 ease-in-out ${currentSize.container}`}>
				<Link href={`/blog/${post.id}`} className={`block ${imagePosition !== "top" ? "flex gap-6" : ""}`}>
					{/* Image container */}
					{showImage && post.illustration && (
						<div
							className={`
						relative w-full rounded-lg overflow-hidden bg-muted border border-border
						${imagePosition === "top" ? `${currentSize.image} mb-4` : `${currentSize.image} flex-shrink-0`}
						${imagePosition === "left" || imagePosition === "right" ? "w-1/3" : ""}
					`}>
							<Image
								src={post.illustration}
								alt={post.title}
								fill
								className="object-cover hover:scale-105 transition-transform duration-300"
								sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
							/>
						</div>
					)}

					{/* Content */}
					<div className={`${imagePosition !== "top" ? "flex-1" : ""} ${currentSize.spacing}`}>
						<h2 className={`text-foreground font-semibold hover:text-primary transition-colors ${currentSize.title}`}>
							{post.title}
						</h2>
						{/* Category badge */}
						{post.category && (
							<div>
								<Badge
									variant="default"
									className="bg-transparent px-2 py-1 rounded-md text-[10px] uppercase tracking-wide inline-flex items-center justify-center gap-1.5 leading-none">
									<Folder className="size-3" />
									<span className="mt-px">{post.category}</span>
								</Badge>
							</div>
						)}
						{/* Date */}
						<div className="flex items-center space-x-2 text-muted-foreground">
							<Calendar size={16} />
							<span className="text-fluid-sm">{formattedDate}</span>
						</div>
						{/* Excerpt */}
						<p className="text-primary line-clamp-3 text-fluid-base">{post.excerpt}</p> {/* Tags */}
						<div className="flex gap-2 flex-wrap">
							{visibleTags.map((tag, index) => (
								<Badge variant="default" key={index} className="px-2 py-1 rounded-md text-sm">
									#{tag}
								</Badge>
							))}
							{hasMoreTags && (
								<Badge variant="outline" className="px-2 py-1 rounded-md text-sm">
									+{remainingTagsCount} more
								</Badge>
							)}
						</div>
					</div>
				</Link>
			</div>
		);
	}
);

BlogCard.displayName = "BlogCard";

export default BlogCard;
