"use client";

import { useEffect } from "react";
import { AlertTriangle, Home, RefreshCw } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

// Error Boundary Global - Manejo de Errores de Runtime

//  * Props automáticas de Next.js:
//  * @param error - Objeto Error con información del error
//  * @param reset - Función para intentar recuperarse del error

export default function Error({
	error,
	reset,
}: {
	error: Error & { digest?: string }; // digest: ID único del error (útil para logs)
	reset: () => void; // Función para reintentar renderizar
}) {
	useEffect(() => {
		console.error("Error capturado en el Error Boundary:", error);
	}, [error]);

	return (
		<div className="min-h-screen bg-background flex items-center justify-center px-4">
			<div className="max-w-2xl w-full text-center">
				{/* Ícono de advertencia */}
				<div className="mb-8">
					<div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-destructive/10 mb-4">
						<AlertTriangle className="w-12 h-12 text-destructive" />
					</div>
					<h1 className="text-3xl font-bold text-foreground mb-2">Something went wrong!</h1>
					<p className="text-lg text-muted-foreground">An unexpected error occurred while loading this page.</p>
				</div>

				{/* Detalles del error (solo en desarrollo) */}
				{process.env.NODE_ENV === "development" && (
					<div className="mb-8 p-4 bg-destructive/5 border border-destructive/20 rounded-lg text-left">
						<h3 className="text-sm font-semibold text-destructive mb-2">Error Details (Development Only):</h3>
						<p className="text-sm font-mono text-muted-foreground break-all">{error.message || "Unknown error"}</p>
						{error.digest && <p className="text-xs text-muted-foreground mt-2">Error ID: {error.digest}</p>}
					</div>
				)}

				{/* Botones de acción */}
				<div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
					{/* Botón para reintentar */}
					<Button onClick={reset} size="lg" className="gap-2">
						<RefreshCw className="w-4 h-4" />
						Try Again
					</Button>

					{/* Botón para volver al inicio */}
					<Button asChild variant="outline" size="lg" className="gap-2">
						<Link href="/">
							<Home className="w-4 h-4" />
							Go to Homepage
						</Link>
					</Button>
				</div>

				{/* Información adicional */}
				<div className="mt-12 pt-8 border-t border-border">
					<p className="text-sm text-muted-foreground">
						If this error persists, please try refreshing the page or contact support.
					</p>
				</div>
			</div>
		</div>
	);
}
