import { Skeleton } from "@/components/ui/skeleton";

/**
 * Loading para la página de Blog
 *
 * Muestra un skeleton loading que imita la estructura
 * de la página de blog real para una mejor UX
 *
 * Se muestra mientras:
 * - Se cargan los posts del blog
 * - Se navega a /blog desde otra ruta
 */
export default function BlogLoading() {
	return (
		<div className="container mx-auto px-4 py-8" role="status" aria-label="Loading blog posts">
			<span className="sr-only">Loading blog posts, please wait...</span>

			{/* Header skeleton */}
			<div className="mb-8">
				<Skeleton className="h-10 w-48 mb-4" /> {/* Título */}
				<Skeleton className="h-6 w-96" /> {/* Descripción */}
			</div>

			{/* Search bar skeleton */}
			<div className="mb-8">
				<Skeleton className="h-12 w-full max-w-md" />
			</div>

			{/* Stats skeleton */}
			<div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
				{[1, 2, 3].map((i) => (
					<Skeleton key={i} className="h-24 w-full rounded-lg" />
				))}
			</div>

			{/* Blog posts grid skeleton */}
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
				{[1, 2, 3, 4, 5, 6].map((i) => (
					<div key={i} className="space-y-4">
						{/* Card skeleton */}
						<Skeleton className="h-48 w-full rounded-lg" />
						<Skeleton className="h-6 w-3/4" />
						<Skeleton className="h-4 w-full" />
						<Skeleton className="h-4 w-2/3" />
					</div>
				))}
			</div>
		</div>
	);
}
