import { Skeleton } from "@/components/ui/skeleton";

/**
 * Loading para la página de Categorías
 *
 * Muestra skeleton con estructura de grid de tarjetas
 */
export default function CategoriesLoading() {
	return (
		<div className="container mx-auto px-4 py-8">
			{/* Header skeleton */}
			<Skeleton className="h-10 w-64 mb-4" />
			<Skeleton className="h-6 w-96 mb-8" />

			{/* Categories grid skeleton */}
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
				{[1, 2, 3, 4, 5, 6].map((i) => (
					<Skeleton key={i} className="h-32 w-full rounded-lg" />
				))}
			</div>

			{/* Overview section skeleton */}
			<Skeleton className="h-48 w-full rounded-lg" />
		</div>
	);
}
