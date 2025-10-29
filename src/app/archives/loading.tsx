import { Skeleton } from "@/components/ui/skeleton";

/**
 * Loading para la página de Archives (Archivos)
 */
export default function ArchivesLoading() {
	return (
		<div className="container mx-auto px-4 py-8">
			{/* Header */}
			<Skeleton className="h-10 w-48 mb-4" />
			<Skeleton className="h-6 w-96 mb-8" />

			{/* Timeline skeleton */}
			<div className="space-y-14">
				{[1, 2].map((year) => (
					<div key={year}>
						{/* Year heading */}
						<Skeleton className="h-8 w-24 mb-6" />

						{/* Posts in that year */}
						<div className="space-y-2">
							{[1, 2, 3, 4, 5].map((post) => (
								<div key={post} className="flex items-stretch">
									<Skeleton className="h-12 w-16 mr-6" />
									<Skeleton className="h-12 flex-1" />
								</div>
							))}
						</div>
					</div>
				))}
			</div>
		</div>
	);
}
