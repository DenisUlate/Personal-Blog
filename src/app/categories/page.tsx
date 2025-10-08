"use client";

import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronRight, Folder } from "lucide-react";
import { useState } from "react";
import MainLayout from "@/components/layout/MainLayout";

const Page = () => {
	// State for hovered category (hover effects)
	const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);
	// Static frontend categories (placeholder data)
	const categories = [
		{ name: "Frontend", postCount: 65, slug: "frontend", color: "blue" },
		{ name: "Components", postCount: 34, slug: "components", color: "green" },
		{ name: "Web Development", postCount: 23, slug: "web-development", color: "yellow" },
		{ name: "Frameworks", postCount: 18, slug: "frameworks", color: "purple" },
		{ name: "Libraries", postCount: 12, slug: "libraries", color: "indigo" },
		{ name: "Animations", postCount: 9, slug: "animations", color: "red" },
	];

	const maxPostCount = Math.max(...categories.map((cat) => cat.postCount));

	// Handle category click (analytics hook placeholder)
	const handleCategoryClick = (categorySlug: string) => {
		console.log(`Navigating to category: ${categorySlug}`);
	};

	// Format post count label
	const formatPostCount = (count: number): string => {
		return count === 1 ? `${count} article` : `${count} articles`;
	};

	// Calculate progress bar percentage
	const calculateProgressPercentage = (count: number): number => {
		return Math.min((count / maxPostCount) * 100, 100);
	};

	const getColorClasses = (color: string) => {
		const colors = {
			blue: "bg-blue-500/10 text-blue-400",
			green: "bg-green-500/10 text-green-400",
			red: "bg-red-500/10 text-red-400",
			purple: "bg-purple-500/10 text-purple-400",
			yellow: "bg-yellow-500/10 text-yellow-400",
			indigo: "bg-indigo-500/10 text-indigo-400",
		};
		return colors[color as keyof typeof colors] || colors.blue;
	};

	return (
		<MainLayout pageTitle="Categories">
			{/* Page description */}
			<div className="mb-8">
				<p className="text-neutral-400 text-lg">
					Explore the categories of our blog posts. Click on a category to view all related posts.
				</p>
			</div>

			{/* Categories Grid */}
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
				{categories.map((category) => (
					<Link
						href={`/categories/${category.slug}`}
						key={category.slug}
						onClick={() => handleCategoryClick(category.slug)}>
						<Card
							onMouseEnter={() => setHoveredCategory(category.slug)}
							onMouseLeave={() => setHoveredCategory(null)}
							className="bg-card border-border hover:border-primary transition-all duration-300 hover:shadow-lg group cursor-pointer">
							<CardHeader className="pb-3">
								<div className="flex items-center justify-between">
									<div className="flex items-center space-x-3">
										<div className={`p-2 rounded-lg ${getColorClasses(category.color)}`}>
											<Folder className="w-5 h-5" />
										</div>
										<CardTitle className="text-primary text-xl group-hover:text-blue-400 transition-colors">
											{category.name}
										</CardTitle>
									</div>
									<ChevronRight
										className={`h-5 w-5 text-primary group-hover:text-blue-400 transition-all ${
											hoveredCategory === category.slug ? "translate-x-1" : ""
										}`}
									/>
								</div>
							</CardHeader>
							<CardContent>
								<div className="flex items-center justify-between">
									<span className="text-muted-foreground text-sm">{formatPostCount(category.postCount)}</span>
									<div className="h-2 w-16 bg-secondary rounded-full overflow-hidden">
										<div
											className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full"
											style={{ width: `${calculateProgressPercentage(category.postCount)}%` }}
										/>
									</div>
								</div>
							</CardContent>
						</Card>
					</Link>
				))}
			</div>

			{/* General statistics */}
			<div className="mt-12 p-6 bg-card rounded-lg border border-border shadow">
				<h2 className="text-xl font-semibold text-primary mb-4">Overview</h2>
				<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
					<div className="text-center">
						<div className="text-2xl font-bold text-blue-400">{categories.length}</div>
						<div className="text-muted-foreground text-sm">Categories</div>
					</div>
					<div className="text-center">
						<div className="text-2xl font-bold text-green-400">
							{categories.reduce((total, cat) => total + cat.postCount, 0)}
						</div>
						<div className="text-muted-foreground text-sm">Total Articles</div>
					</div>
					<div className="text-center">
						<div className="text-2xl font-bold text-purple-400">
							{Math.round(categories.reduce((total, cat) => total + cat.postCount, 0) / categories.length)}
						</div>
						<div className="text-muted-foreground text-sm">Average per Category</div>
					</div>
				</div>
			</div>
		</MainLayout>
	);
};
export default Page;
