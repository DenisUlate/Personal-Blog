import { Skeleton } from "@/components/ui/skeleton";

/**
 * Loading para un post individual del blog
 *
 * Muestra skeleton que imita la estructura de un post
 * mientras se carga el contenido desde el filesystem
 */
export default function PostLoading() {
	return (
		<div className="container mx-auto px-4 py-8 max-w-4xl">
			{/* Back button skeleton */}
			<Skeleton className="h-6 w-32 mb-6" />

			{/* Post card container */}
			<div className="bg-card border border-border p-8 rounded-lg shadow-lg">
				{/* Title skeleton */}
				<Skeleton className="h-12 w-3/4 mb-4" />

				{/* Category badge skeleton */}
				<Skeleton className="h-6 w-24 mb-4" />

				{/* Date and author skeleton */}
				<div className="flex items-center space-x-4 mb-6">
					<Skeleton className="h-4 w-32" />
					<Skeleton className="h-4 w-24" />
				</div>

				{/* Content skeleton */}
				<div className="space-y-4 mb-6">
					<Skeleton className="h-4 w-full" />
					<Skeleton className="h-4 w-full" />
					<Skeleton className="h-4 w-5/6" />
					<Skeleton className="h-4 w-full" />
					<Skeleton className="h-4 w-4/5" />

					<div className="py-4">
						<Skeleton className="h-32 w-full" /> {/* Code block */}
					</div>

					<Skeleton className="h-4 w-full" />
					<Skeleton className="h-4 w-full" />
					<Skeleton className="h-4 w-3/4" />
				</div>

				{/* Tags skeleton */}
				<div className="flex gap-2 pt-6 border-t border-border">
					{[1, 2, 3, 4].map((i) => (
						<Skeleton key={i} className="h-6 w-20" />
					))}
				</div>
			</div>
		</div>
	);
}
