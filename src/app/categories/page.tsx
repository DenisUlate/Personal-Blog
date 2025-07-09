"use client";

import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronRight, Folder } from "lucide-react";
import { useState } from "react";

const Page = () => {
	// Estado para manejar la categoría seleccionada (para efectos hover)
	const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);
	// Datos estáticos de categorías (temporal)
	const categories = [
		{ name: "TryHackMe", postCount: 65, slug: "tryhackme", color: "blue" },
		{ name: "Desarrollo Web", postCount: 23, slug: "desarrollo-web", color: "green" },
		{ name: "Ciberseguridad", postCount: 18, slug: "ciberseguridad", color: "red" },
		{ name: "DevOps", postCount: 12, slug: "devops", color: "purple" },
		{ name: "Tutoriales", postCount: 34, slug: "tutoriales", color: "yellow" },
		{ name: "Herramientas", postCount: 9, slug: "herramientas", color: "indigo" },
	];

	const maxPostCount = Math.max(...categories.map((cat) => cat.postCount));

	// Función para manejar el click en una categoría
	const handleCategoryClick = (categorySlug: string) => {
		// Esta función podria incluir analytics o logging antes de la navegación
		console.log(`Navegando a la categoría: ${categorySlug}`);
		// La navegación real se maneja con el componente Link de Next.js
	};

	// Función para formatear el texto del contador
	const formatPostCount = (count: number): string => {
		return count === 1 ? `${count} artículo` : `${count} artículos`;
	};

	// Función para calcular el porcentaje de la barra de progreso
	const calculateProgressPercentage = (count: number): number => {
		return Math.min((count / maxPostCount) * 100, 100);
	};

	const getColorClasses = (color: string) => {
		const colors = {
			blue: "bg-blue-500/10 text-blue-400",
			green: "bg-green-500/10 text-green-400",
			red: "bg-red-500/10 text-red-400",
			purple: "bg-purple-500/10 text-purple-400",
			yellow: "bg-yellow-500/10 text-yellow-400",
			indigo: "bg-indigo-500/10 text-indigo-400",
		};
		return colors[color as keyof typeof colors] || colors.blue;
	};

	return (
		<div className="min-h-screen bg-background text-neutral-100 p-6">
			<div className="max-w-3xl mx-auto">
				{/* Encabezado de la página */}
				<div className="mb-8">
					<h1 className="text-neutral-400 text-lg">Categories</h1>
					<p className="text-neutral-400 text-lg">
						Explore the categories of our blog posts. Click on a category to view all related posts.
					</p>
				</div>

				{/* Categories Grid */}
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
					{categories.map((category) => (
						<Link
							href={`/categories/${category.slug}`}
							key={category.slug}
							onClick={() => handleCategoryClick(category.slug)}>
							<Card
								onMouseEnter={() => setHoveredCategory(category.slug)}
								onMouseLeave={() => setHoveredCategory(null)}
								className="bg-neutral-900 border-neutral-800 hover:border-neutral-700 transition-all duration-300 hover:shadow-lg hover:neutral-950/20 group cursor-pointer">
								<CardHeader className="pb-3">
									<div className="flex items-center justify-between">
										<div className="flex items-center space-x-3">
											<div className={`p-2 rounded-lg ${getColorClasses(category.color)}`}>
												<Folder className="w-5 h-5" />
											</div>
											<CardTitle className="text-neutral-200 text-xl group-hover:text-blue-400 transition-colors">
												{category.name}
											</CardTitle>
										</div>
										<ChevronRight
											className={`h-5 w-5 text-neutral-500 group-hover:text-blue-400 transition-all ${
												hoveredCategory === category.slug ? "translate-x-1" : ""
											}`}
										/>
									</div>
								</CardHeader>
								<CardContent>
									<div className="flex items-center justify-between">
										<span className="text-neutral-400 text-sm">{formatPostCount(category.postCount)}</span>
										<div className="h-2 w-16 bg-neutral-800 rounded-full overflow-hidden">
											<div
												className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full"
												style={{ width: `${calculateProgressPercentage(category.postCount)}%` }}
											/>
										</div>
									</div>
								</CardContent>
							</Card>
						</Link>
					))}
				</div>

				{/* Estadisticas generales */}
				<div className="mt-12 p-6 bg-neutral-900 rounded-lg border border-neutral-800">
					<h2 className="text-xl font-semibold text-neutral-200 mb-4">Resumen General</h2>
					<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
						<div className="text-center">
							<div className="text-2xl font-bold text-blue-400">{categories.length}</div>
							<div className="text-neutral-400 text-sm">Categories</div>
						</div>
						<div className="text-center">
							<div className="text-2xl font-bold text-green-400">
								{categories.reduce((total, cat) => total + cat.postCount, 0)}
							</div>
							<div className="text-neutral-400 text-sm">Total Artículos</div>
						</div>
						<div className="text-center">
							<div className="text-2xl font-bold text-purple-400">
								{Math.round(categories.reduce((total, cat) => total + cat.postCount, 0) / categories.length)}
							</div>
							<div className="text-neutral-400 text-sm">Promedio por Categoría</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
export default Page;
