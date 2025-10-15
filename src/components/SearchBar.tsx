"use client";

import React, { useState, useEffect, useCallback } from "react";
import { Search, X } from "lucide-react";
import { Input } from "./ui/input";

interface SearchBarProps {
	onSearch: (searchTerm: string) => void;
	placeholder?: string;
	className?: string;
}

const SearchBar: React.FC<SearchBarProps> = React.memo(
	({ onSearch, placeholder = "Search blog posts by title...", className = "" }) => {
		const [searchTerm, setSearchTerm] = useState<string>("");

		// Debounce effect para evitar búsquedas excesivas
		useEffect(() => {
			const debounceTimer = setTimeout(() => {
				onSearch(searchTerm);
			}, 300); // 300ms de delay

			return () => {
				clearTimeout(debounceTimer);
			};
		}, [searchTerm, onSearch]);

		// Memoize input change handler
		const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
			setSearchTerm(e.target.value);
		}, []);

		// Memoize clear search handler
		const clearSearch = useCallback(() => {
			setSearchTerm("");
		}, []);
		return (
			<div className={`relative w-full max-w-md ${className}`}>
				<div className="relative" suppressHydrationWarning>
					{/* Icono de búsqueda */}
					<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-primary" size={20} />
					{/* Input de búsqueda */}
					<Input
						type="text"
						value={searchTerm}
						onChange={handleInputChange}
						placeholder={placeholder}
						className="pl-10 pr-10 py-2 w-full bg-card border-border text-foreground placeholder:text-muted-foreground"
						autoComplete="off"
						data-form-type="other"
					/>{" "}
					{/* Botón para limpiar búsqueda */}
					{searchTerm && (
						<button
							onClick={clearSearch}
							className="absolute right-3 top-1/2 transform -translate-y-1/2 text-primary hover:text-accent-foreground transition-colors duration-200"
							aria-label="Clear search">
							<X size={16} />
						</button>
					)}
				</div>
			</div>
		);
	}
);

SearchBar.displayName = "SearchBar";

export default SearchBar;
