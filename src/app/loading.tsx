import { Loader2 } from "lucide-react";

/**
 * Loading Global - Estado de carga para la aplicación
 *
 * Este componente se muestra automáticamente cuando:
 * - Una página está cargando datos
 * - Navegas entre rutas
 * - Server Components están fetching data
 *
 * Next.js usa React Suspense internamente para mostrar esto
 */

export default function Loading() {
	return (
		<div className="min-h-screen bg-background flex items-center justify-center">
			<div className="text-center">
				{/* Spinner animado */}
				<Loader2 className="w-12 h-12 text-primary animate-spin mx-auto mb-4" />

				{/* Texto de carga */}
				<h2 className="text-xl font-semibold text-foreground mb-2">Loading...</h2>
				<p className="text-muted-foreground">Please wait while we load the content</p>
			</div>
		</div>
	);
}
