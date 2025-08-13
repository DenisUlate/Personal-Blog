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

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
	const handlePageChange = (page: number) => {
		if (page >= 1 && page <= totalPages) {
			onPageChange(page);
		}
	};

	// Disable the previous button on the first page
	// Disable the next button on the last page
	const isFirstPage = currentPage === 1;
	const isLastPage = currentPage === totalPages;

	return (
		<PaginationRoot>
			<PaginationContent>
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
				{Array.from({ length: totalPages }, (_, index) => (
					<PaginationItem key={index}>
						<Button
							variant={currentPage === index + 1 ? "outline" : "ghost"}
							size="sm"
							className={cn("h-9 w-9", currentPage === index + 1 && "bg-background text-primary")}
							onClick={() => handlePageChange(index + 1)}>
							{index + 1}
						</Button>
					</PaginationItem>
				))}
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
