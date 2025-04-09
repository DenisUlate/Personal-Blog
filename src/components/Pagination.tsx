"use client";

import {
	Pagination as PaginationRoot,
	PaginationContent,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from "@/components/ui/pagination";
import { cn } from "@/lib/utils";

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
					<PaginationPrevious
						href="#"
						className={cn(isFirstPage && "pointer-events-none opacity-50")}
						onClick={(e) => {
							e.preventDefault();
							if (!isFirstPage) handlePageChange(currentPage - 1);
						}}
					/>
				</PaginationItem>
				{Array.from({ length: totalPages }, (_, index) => (
					<PaginationItem key={index}>
						<PaginationLink
							href="#"
							isActive={currentPage === index + 1}
							onClick={(e) => {
								e.preventDefault();
								handlePageChange(index + 1);
							}}>
							{index + 1}
						</PaginationLink>
					</PaginationItem>
				))}
				<PaginationItem>
					<PaginationNext
						href="#"
						className={cn(isLastPage && "pointer-events-none opacity-50")}
						onClick={(e) => {
							e.preventDefault();
							if (!isLastPage) handlePageChange(currentPage + 1);
						}}
					/>
				</PaginationItem>
			</PaginationContent>
		</PaginationRoot>
	);
};

export default Pagination;
