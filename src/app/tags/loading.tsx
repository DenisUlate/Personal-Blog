import { Skeleton } from "@/components/ui/skeleton";

/**
 * Loading para la página de Tags
 */
export default function TagsLoading() {
	return (
		<div className="container mx-auto px-4 py-8">
			{/* Header */}
			<Skeleton className="h-10 w-48 mb-4" />
			<Skeleton className="h-6 w-80 mb-8" />

			{/* Tags list skeleton */}
			<div className="space-y-4">
				{[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
					<Skeleton key={i} className="h-16 w-full rounded-lg" />
				))}
			</div>
		</div>
	);
}
