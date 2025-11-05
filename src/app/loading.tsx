import { Loader2 } from "lucide-react";

/**
 * Global Loading - Loading state for the application
 *
 * This component is automatically displayed when:
 * - A page is loading data
 * - Navigating between routes
 * - Server Components are fetching data
 *
 * Next.js uses React Suspense internally to show this
 */

export default function Loading() {
	return (
		<div className="min-h-screen bg-background flex items-center justify-center">
			<div className="text-center" role="status" aria-live="polite" aria-busy="true">
				{/* Screen reader only announcement */}
				<span className="sr-only">Loading content, please wait</span>

				{/* Animated spinner */}
				<Loader2 className="w-12 h-12 text-primary animate-spin mx-auto mb-4" aria-hidden="true" />

				{/* Loading text */}
				<h2 className="text-xl font-semibold text-foreground mb-2">Loading...</h2>
				<p className="text-muted-foreground">Please wait while we load the content</p>
			</div>
		</div>
	);
}
