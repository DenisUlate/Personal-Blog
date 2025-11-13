"use client";

import { Pagination as PaginationRoot, PaginationContent, PaginationItem } from "@/components/ui/pagination";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
	currentPage: number;
	totalPages: number;
	onPageChange: (page: number) => void;
}

// Type for page items: can be a number or ellipsis string
type PageItem = number | "...";

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
	const handlePageChange = (page: number) => {
		if (page >= 1 && page <= totalPages) {
			onPageChange(page);
		}
	};

	// Generate array of page numbers with ellipsis
	const generatePageNumbers = (): PageItem[] => {
		const pages: PageItem[] = [];

		// Always show first page
		pages.push(1);

		// Calculate range around current page
		const showEllipsisStart = currentPage > 3;
		const showEllipsisEnd = currentPage < totalPages - 2;

		if (showEllipsisStart) {
			pages.push("...");
		}

		// Show pages around current page
		const startPage = Math.max(2, currentPage - 1);
		const endPage = Math.min(totalPages - 1, currentPage + 1);

		for (let i = startPage; i <= endPage; i++) {
			pages.push(i);
		}

		if (showEllipsisEnd) {
			pages.push("...");
		}

		// Always show last page (if more than 1 page exists)
		if (totalPages > 1) {
			pages.push(totalPages);
		}

		return pages;
	};

	const pageNumbers = generatePageNumbers();

	// Disable the previous button on the first page
	// Disable the next button on the last page
	const isFirstPage = currentPage === 1;
	const isLastPage = currentPage === totalPages;

	return (
		<PaginationRoot>
			<PaginationContent>
				{/* Previous Button */}
				<PaginationItem>
					<Button
						variant="ghost"
						size="sm"
						className={cn("gap-1 px-2.5", isFirstPage && "pointer-events-none opacity-50")}
						onClick={() => {
							if (!isFirstPage) handlePageChange(currentPage - 1);
						}}
						disabled={isFirstPage}>
						<ChevronLeft className="h-4 w-4" />
						<span className="hidden sm:block">Previous</span>
					</Button>
				</PaginationItem>

				{/* Page Numbers with Ellipsis */}
				{pageNumbers.map((item, index) => (
					<PaginationItem key={`${item}-${index}`}>
						{item === "..." ? (
							<span className="flex h-9 w-9 items-center justify-center text-muted-foreground">...</span>
						) : (
							<Button
								variant={currentPage === item ? "outline" : "ghost"}
								size="sm"
								className={cn("h-9 w-9", currentPage === item && "bg-background text-primary")}
								onClick={() => handlePageChange(item)}>
								{item}
							</Button>
						)}
					</PaginationItem>
				))}

				{/* Next Button */}
				<PaginationItem>
					<Button
						variant="ghost"
						size="sm"
						className={cn("gap-1 px-2.5", isLastPage && "pointer-events-none opacity-50")}
						onClick={() => {
							if (!isLastPage) handlePageChange(currentPage + 1);
						}}
						disabled={isLastPage}>
						<span className="hidden sm:block">Next</span>
						<ChevronRight className="h-4 w-4" />
					</Button>
				</PaginationItem>
			</PaginationContent>
		</PaginationRoot>
	);
};

export default Pagination;
