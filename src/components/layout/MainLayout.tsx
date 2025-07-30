"use client";

import React, { useEffect, useState } from "react";
import { BlogPost } from "@/types/blog";
import RecentBlogs from "@/components/RecentBlogs";
import Footer from "@/components/Footer";
import SearchBar from "@/components/SearchBar";

interface MainLayoutProps {
	children: React.ReactNode;
	showSidebar?: boolean;
	showSearchBar?: boolean;
	pageTitle?: string;
	onSearch?: (searchTerm: string) => void;
	className?: string;
}

const MainLayout: React.FC<MainLayoutProps> = ({
	children,
	showSidebar = true,
	showSearchBar = false,
	pageTitle,
	onSearch,
	className = "",
}) => {
	const [recentPosts, setRecentPosts] = useState<BlogPost[]>([]);
	const [isLoadingPosts, setIsLoadingPosts] = useState(true);

	useEffect(() => {
		const fetchRecentPosts = async () => {
			try {
				setIsLoadingPosts(true);
				const response = await fetch('/api/posts');
				
				if (!response.ok) {
					throw new Error('Failed to fetch posts');
				}
				
				const data = await response.json();
				// Obtener solo los 5 posts más recientes
				setRecentPosts(data.posts.slice(0, 5));
			} catch (error) {
				console.error("Error fetching recent posts:", error);
			} finally {
				setIsLoadingPosts(false);
			}
		};

		if (showSidebar) {
			fetchRecentPosts();
		}
	}, [showSidebar]);

	if (!showSidebar) {
		// Layout simple sin sidebar
		return (
			<div className={`max-w-7xl mx-auto p-8 ${className}`}>
				{/* Header con título y search bar opcional */}
				{(pageTitle || showSearchBar) && (
					<div className="flex justify-between items-center mb-8">
						{pageTitle && <h1 className="text-3xl font-bold text-primary">{pageTitle}</h1>}
						{showSearchBar && onSearch && <SearchBar onSearch={onSearch} className="max-w-sm" />}
					</div>
				)}
				<div className="min-h-screen">{children}</div>
				<Footer />
			</div>
		);
	}

	// Layout con sidebar
	return (
		<div className={`max-w-7xl mx-auto p-8 ${className}`}>
			{/* Header con título y search bar opcional */}
			{(pageTitle || showSearchBar) && (
				<div className="flex justify-between items-center mb-8">
					{pageTitle && <h1 className="text-3xl font-bold text-primary">{pageTitle}</h1>}
					{showSearchBar && onSearch && <SearchBar onSearch={onSearch} className="max-w-sm" />}
				</div>
			)}

			<div className="grid grid-cols-1 lg:grid-cols-3 gap-8 min-h-screen">
				{/* Contenido principal */}
				<div className="lg:col-span-2">{children}</div>

				{/* Sidebar - Posts recientes */}
				<div className="lg:col-span-1">
					{!isLoadingPosts && recentPosts.length > 0 && <RecentBlogs posts={recentPosts} limit={5} />}
				</div>
			</div>
			<Footer />
		</div>
	);
};

export default MainLayout;
