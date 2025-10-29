import Link from "next/link";
import { Home, Search, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
	return (
		<div className="min-h-screen bg-background flex items-center justify-center px-4">
			<div className="max-w-2xl w-full text-center">
				{/* Número 404 grande y llamativo */}
				<div className="mb-8">
					<h1 className="text-9xl font-bold text-primary/20 select-none">404</h1>
					<div className="mt-4">
						<h2 className="text-3xl font-bold text-foreground mb-2">Page Not Found</h2>
						<p className="text-lg text-muted-foreground">Oops! The page you&apos;re looking for doesn&apos;t exist.</p>
					</div>
				</div>

				{/* Ilustración decorativa (opcional) */}
				<div className="mb-8">
					<div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-primary/10 mb-4">
						<Search className="w-12 h-12 text-primary" />
					</div>
					<p className="text-muted-foreground max-w-md mx-auto">
						The page might have been moved, deleted, or maybe it never existed. Let&apos;s get you back on track.
					</p>
				</div>

				{/* Botones de navegación */}
				<div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
					{/* Botón principal: Volver al inicio */}
					<Button asChild size="lg" className="gap-2">
						<Link href="/">
							<Home className="w-4 h-4" />
							Go to Homepage
						</Link>
					</Button>

					{/* Botón secundario: Volver atrás */}
					<Button asChild variant="outline" size="lg" className="gap-2">
						<Link href="/blog">
							<ArrowLeft className="w-4 h-4" />
							Browse Blog Posts
						</Link>
					</Button>
				</div>

				{/* Enlaces adicionales útiles */}
				<div className="mt-12 pt-8 border-t border-border">
					<p className="text-sm text-muted-foreground mb-4">You might be interested in:</p>
					<div className="flex flex-wrap gap-4 justify-center">
						<Link href="/categories" className="text-sm text-primary hover:text-foreground transition-colors underline">
							Categories
						</Link>
						<Link href="/tags" className="text-sm text-primary hover:text-foreground transition-colors underline">
							Tags
						</Link>
						<Link href="/archives" className="text-sm text-primary hover:text-foreground transition-colors underline">
							Archives
						</Link>
						<Link href="/about" className="text-sm text-primary hover:text-foreground transition-colors underline">
							About
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
}
