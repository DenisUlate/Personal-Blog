"use client";

import React, { useMemo } from "react";
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
	recentPosts?: BlogPost[]; // Posts pasados desde Server Component
}

const MainLayout: React.FC<MainLayoutProps> = React.memo(
	({ children, showSidebar = true, showSearchBar = false, pageTitle, onSearch, className = "", recentPosts = [] }) => {
		// Ya no necesitamos fetch, los posts vienen como prop
		const limitedRecentPosts = useMemo(() => recentPosts.slice(0, 5), [recentPosts]);

		// Memoize header content to avoid recreation
		const headerContent = useMemo(() => {
			if (!(pageTitle || showSearchBar)) return null;

			return (
				<div className="flex flex-col md:flex-row justify-between items-center mb-8">
					{pageTitle && <h1 className="text-fluid-xl font-bold text-primary">{pageTitle}</h1>}
					{showSearchBar && onSearch && <SearchBar onSearch={onSearch} className="max-w-xs" />}
				</div>
			);
		}, [pageTitle, showSearchBar, onSearch]);

		// Memoize sidebar content to avoid recreation
		const sidebarContent = useMemo(() => {
			if (!showSidebar) return null;

			return (
				<div className="w-full justify-items-end">
					<div className="w-full lg:col-span-1 lg:max-w-xs">
						<RecentBlogs posts={limitedRecentPosts} limit={5} isLoading={false} />
					</div>
				</div>
			);
		}, [showSidebar, limitedRecentPosts]);

		if (!showSidebar) {
			// Simple layout without sidebar
			return (
				<div className={`max-w-7xl mx-auto p-8 ${className}`}>
					{/* Header with title and optional search bar */}
					{headerContent}
					<div className="min-h-screen">{children}</div>
					<Footer />
				</div>
			);
		}

		// Layout with sidebar
		return (
			<div className={`max-w-7xl mx-auto p-8 ${className}`}>
				{/* Header with title and optional search bar */}
				{headerContent}

				<div className="flex flex-col lg:grid lg:grid-cols-3 gap-8 min-h-screen">
					{/* Main content */}
					<div className="lg:col-span-2">{children}</div>

					{/* Sidebar - Recent posts */}
					{sidebarContent}
				</div>
				<Footer />
			</div>
		);
	}
);

MainLayout.displayName = "MainLayout";

export default MainLayout;
