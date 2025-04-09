"use client";

import {
	Pagination as PaginationRoot,
	PaginationContent,
	PaginationEllipsis,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from "@/components/ui/pagination";

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

	return (
		<PaginationRoot>
			<PaginationContent>
				<PaginationItem>
					<PaginationPrevious
						href="#"
						onClick={(e) => {
							e.preventDefault();
							handlePageChange(currentPage - 1);
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
						onClick={(e) => {
							e.preventDefault();
							handlePageChange(currentPage + 1);
						}}
					/>
				</PaginationItem>
			</PaginationContent>
		</PaginationRoot>
	);
};

export default Pagination;
