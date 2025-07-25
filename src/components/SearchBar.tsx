"use client";

import React, { useState, useEffect } from "react";
import { Search, X } from "lucide-react";
import { Input } from "./ui/input";

interface SearchBarProps {
	onSearch: (searchTerm: string) => void;
	placeholder?: string;
	className?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({
	onSearch,
	placeholder = "Search blog posts by title...",
	className = "",
}) => {
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

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearchTerm(e.target.value);
	};

	const clearSearch = () => {
		setSearchTerm("");
		onSearch("");
	};

	return (
		<div className={`relative w-full max-w-md ${className}`}>
			<div className="relative">
				{/* Icono de búsqueda */}
				<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400" size={20} />

				{/* Input de búsqueda */}
				<Input
					type="text"
					value={searchTerm}
					onChange={handleInputChange}
					placeholder={placeholder}
					className="pl-10 pr-10 py-2 w-full bg-card border-neutral-600 text-neutral-300 placeholder-neutral-500 focus:border-neutral-400 focus:ring-1 focus:ring-neutral-400"
				/>

				{/* Botón para limpiar búsqueda */}
				{searchTerm && (
					<button
						onClick={clearSearch}
						className="absolute right-3 top-1/2 transform -translate-y-1/2 text-neutral-400 hover:text-neutral-300 transition-colors duration-200"
						aria-label="Clear search">
						<X size={16} />
					</button>
				)}
			</div>
		</div>
	);
};

export default SearchBar;
