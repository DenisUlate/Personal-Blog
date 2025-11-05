﻿import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronRight, Folder } from "lucide-react";
import MainLayout from "@/components/layout/MainLayout";
import { blogService } from "@/data/blog-service";

function getColorForCategory(categoryName: string): string {
	const colors = ["blue", "green", "red", "purple", "yellow", "indigo"];
	const hash = categoryName.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
	return colors[hash % colors.length];
}

export default function CategoriesPage() {
	const allPosts = blogService.getAllPosts();
	const categoryNames = blogService.getAllCategories();

	const categoriesWithCount = categoryNames.map((categoryName) => {
		const postsInCategory = allPosts.filter((post) => post.category === categoryName);
		return {
			name: categoryName,
			postCount: postsInCategory.length,
			slug: categoryName
				.toLowerCase()
				.trim()
				.normalize("NFD")
				.replace(/[\u0300-\u036f]/g, "")
				.replace(/[^a-z0-9\s-]/g, "")
				.replace(/\s+/g, "-")
				.replace(/-+/g, "-"),
			color: getColorForCategory(categoryName),
		};
	});

	const sortedCategories = categoriesWithCount.sort((a, b) => b.postCount - a.postCount);
	const maxPostCount = Math.max(...sortedCategories.map((cat) => cat.postCount), 1);

	const formatPostCount = (count: number): string => {
		return count === 1 ? `${count} article` : `${count} articles`;
	};

	const calculateProgressPercentage = (count: number): number => {
		return Math.min((count / maxPostCount) * 100, 100);
	};

	const getColorClasses = (color: string) => {
		const colors: Record<string, string> = {
			blue: "bg-blue-500/10 text-blue-400",
			green: "bg-green-500/10 text-green-400",
			red: "bg-red-500/10 text-red-400",
			purple: "bg-purple-500/10 text-purple-400",
			yellow: "bg-yellow-500/10 text-yellow-400",
			indigo: "bg-indigo-500/10 text-indigo-400",
		};
		return colors[color] || colors.blue;
	};

	return (
		<MainLayout pageTitle="Categories" recentPosts={allPosts}>
			<div className="mb-8">
				<p className="text-neutral-400 text-lg">
					Explore the categories of our blog posts. Click on a category to view all related posts.
				</p>
			</div>

			{sortedCategories.length === 0 ? (
				<div className="text-center py-12">
					<p className="text-xl text-primary mb-2">No categories found</p>
					<p className="text-muted-foreground">Add categories to your blog posts to see them here</p>
				</div>
			) : (
				<>
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
						{sortedCategories.map((category) => (
							<Link href={`/categories/${category.slug}`} key={category.slug}>
								<Card className="bg-card border-border hover:border-primary transition-all duration-300 hover:shadow-lg group cursor-pointer">
									<CardHeader className="pb-3">
										<div className="flex items-center justify-between">
											<div className="flex items-center space-x-3">
												<div className={`p-2 rounded-lg ${getColorClasses(category.color)}`}>
													<Folder className="w-5 h-5" />
												</div>
												<CardTitle className="text-primary text-fluid-sm group-hover:text-blue-400 transition-colors">
													{category.name}
												</CardTitle>
											</div>
											<ChevronRight className="h-5 w-5 text-primary group-hover:text-blue-400 group-hover:translate-x-1 transition-all" />
										</div>
									</CardHeader>
									<CardContent>
										<div className="flex items-center justify-between">
											<span className="text-muted-foreground text-sm">{formatPostCount(category.postCount)}</span>
											<div className="h-2 w-16 bg-secondary rounded-full overflow-hidden">
												<div
													className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full transition-all"
													style={{ width: `${calculateProgressPercentage(category.postCount)}%` }}
												/>
											</div>
										</div>
									</CardContent>
								</Card>
							</Link>
						))}
					</div>

					<div className="mt-12 p-6 bg-card rounded-lg border border-border shadow">
						<h2 className="text-xl font-semibold text-primary mb-4">Overview</h2>
						<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
							<div className="text-center">
								<div className="text-2xl font-bold text-blue-400">{sortedCategories.length}</div>
								<div className="text-muted-foreground text-sm">Categories</div>
							</div>
							<div className="text-center">
								<div className="text-2xl font-bold text-green-400">
									{sortedCategories.reduce((total, cat) => total + cat.postCount, 0)}
								</div>
								<div className="text-muted-foreground text-sm">Total Articles</div>
							</div>
							<div className="text-center">
								<div className="text-2xl font-bold text-purple-400">
									{sortedCategories.length > 0
										? Math.round(
												sortedCategories.reduce((total, cat) => total + cat.postCount, 0) / sortedCategories.length
										  )
										: 0}
								</div>
								<div className="text-muted-foreground text-sm">Average per Category</div>
							</div>
						</div>
					</div>
				</>
			)}
		</MainLayout>
	);
}
