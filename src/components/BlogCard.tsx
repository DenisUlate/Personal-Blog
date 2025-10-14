"use client";

import React, { useMemo } from "react";
import { Badge } from "./ui/badge";
import { Calendar, Folder, TagIcon } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { BlogPost } from "@/types/blog";
import { formatDate } from "@/utils/helpers";

interface BlogCardProps {
	post: BlogPost;
	showImage?: boolean;
	imagePosition?: "top" | "left" | "right";
	size?: "small" | "medium" | "large";
	priority?: boolean;
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
		title: "text-fluid-xl",
		spacing: "space-y-3",
	},
	large: {
		container: "p-8",
		image: "h-64",
		title: "text-fluid-2xl",
		spacing: "space-y-4",
	},
};

const BlogCard: React.FC<BlogCardProps> = React.memo(
	({ post, showImage = true, imagePosition = "top", size = "medium", priority = false }) => {
		const currentSize = sizeClasses[size];

		// Memoize formatted date to avoid recalculation
		const formattedDate = useMemo(() => formatDate(post.date), [post.date]);

		// Memoize visible tags to avoid recalculation
		const visibleTags = useMemo(() => post.tags.slice(0, 3), [post.tags]);
		const hasMoreTags = useMemo(() => post.tags.length > 3, [post.tags.length]);
		const remainingTagsCount = useMemo(() => post.tags.length - 3, [post.tags.length]);

		return (
			<div
				className={`border border-border rounded-lg shadow bg-card hover:bg-muted duration-500 ease-in-out ${
					currentSize.container
				} ${imagePosition !== "top" ? "flex flex-col md:flex-row" : ""}`}>
				<Link
					href={`/blog/${post.id}`}
					className={`block ${imagePosition !== "top" ? "flex flex-col md:flex-row gap-4 md:gap-6 w-full" : ""}`}>
					{/* Image container */}
					{showImage && post.illustration && (
						<div
							className={`
						relative w-full rounded-lg overflow-hidden bg-muted border border-border
						${imagePosition === "top" ? `${currentSize.image} mb-4` : `h-48 md:h-auto md:self-stretch flex-shrink-0`}
						${
							imagePosition === "left" || imagePosition === "right"
								? size === "medium"
									? "md:w-2/5 md:min-w-[280px]"
									: "md:w-1/3"
								: ""
						}
						${imagePosition === "right" ? "md:order-2" : ""}
					`}>
							<Image
								src={post.illustration}
								alt={post.title}
								fill
								priority={priority}
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
						<div className="flex items-center gap-2 text-muted-foreground">
							<Calendar size={16} className="flex-shrink-0" />
							<span className="text-fluid-xs leading-none">{formattedDate}</span>
						</div>
						{/* Excerpt */}
						<p className="text-primary line-clamp-3 text-fluid-sm">{post.excerpt}</p>
						{/* Tags */}
						<div className="flex gap-2 flex-wrap">
							{visibleTags.map((tag) => (
								<Badge variant="default" key={tag} className="px-2 py-1 rounded-md text-fluid-xs text-primary">
									<TagIcon /> {tag}
								</Badge>
							))}{" "}
							{hasMoreTags && (
								<Badge variant="default" className="px-2 py-1 rounded-md text-sm">
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
