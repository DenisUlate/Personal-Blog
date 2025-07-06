"use client";

import React, { useState, useEffect, useRef } from "react";
import { Search, X, Filter, Calendar, Hash, FileText, ChevronDown } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export interface SearchFilters {
	query: string;
	searchIn: ("content" | "title" | "body" | "tags")[];
	dateRange: {
		form?: string;
		to?: string;
	};
}

interface SearchBarProps {
	onSearch: (filters: SearchFilters) => void;
	onClear?: () => void;
	placeholder?: string;
	className?: string;
	showAdvancedFilters?: boolean;
	disabled?: boolean;
}

const SEARCH_OPTIONS = [
	{ value: "title", label: "Título", icon: FileText },
	{ value: "content", label: "Contenido", icon: FileText },
	{ value: "tags", label: "Tags", icon: Hash },
] as const;

const SearchBar: React.FC<SearchBarProps> = ({
	onSearch,
	onClear,
	placeholder = "Buscar en el blog...",
	className,
	showAdvancedFilters = true,
	disabled = false,
}) => {
	const [query, setQuery] = useState("");
	const [searchIn, setSearchIn] = useState<("title" | "content" | "tags")[]>(["title", "content", "tags"]);
	const [dateRange, setDateRange] = useState<{ from?: string; to?: string }>({});
	const [showFilters, setShowFilters] = useState(false);
	const [isSearching, setIsSearching] = useState(false);
	const searchRef = useRef<HTMLDivElement>(null);

	// Cerrar filtros cuando se hace clic fuera de ellos
	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
				setShowFilters(false);
			}
		};
		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, []);

	// Debounce para búsqueda automática
	useEffect(() => {
		const timer = setTimeout(() => {
			if (query.trim() || dateRange.from || dateRange.to) {
				handleSearch();
			}
		}, 300);

		return () => clearTimeout(timer);
	}, [query, searchIn, dateRange]);

	const handleSearch = () => {
		if (disabled) return;

		setIsSearching(true);
		const filters: SearchFilters = {
			query: query.trim(),
			searchIn,
			dateRange: dateRange.from || dateRange.to ? dateRange : undefined,
		};

		onSearch(filters);
		setTimeout(() => setIsSearching(false), 500);
	};

	const handleClear = () => {
		setQuery("");
		setSearchIn(["title", "content", "tags"]);
		setDateRange({});
		setShowFilters(false);
		onClear?.();
	};

	const toggleSearchOption = (option: "title" | "content" | "tags") => {
		setSearchIn((prev) => (prev.includes(option) ? prev.filter((item) => item !== option) : [...prev, option]));
	};

	const hasActiveFilters = query.length > 0 || dateRange.from || dateRange.to;
	const activeFiltersCount = searchIn.length + (dateRange.from || dateRange.to ? 1 : 0);

	return <div>SearchBar</div>;
};
export default SearchBar;
