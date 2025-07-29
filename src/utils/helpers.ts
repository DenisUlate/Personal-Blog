/**
 * Formatea una fecha para mostrar en el blog
 */
export function formatDate(dateString: string): string {
	const date = new Date(dateString);
	return date.toLocaleDateString("es-ES", {
		year: "numeric",
		month: "long",
		day: "numeric",
	});
}

/**
 * Trunca un texto a un número específico de palabras
 */
export function truncateText(text: string, wordLimit: number): string {
	const words = text.split(" ");
	if (words.length <= wordLimit) return text;
	return words.slice(0, wordLimit).join(" ") + "...";
}

/**
 * Genera un slug a partir de un título
 */
export function generateSlug(title: string): string {
	return title
		.toLowerCase()
		.replace(/[^a-z0-9\s-]/g, "")
		.replace(/\s+/g, "-")
		.replace(/-+/g, "-")
		.trim();
}

/**
 * Valida si una URL es válida
 */
export function isValidUrl(url: string): boolean {
	try {
		new URL(url);
		return true;
	} catch {
		return false;
	}
}

/**
 * Calcula el tiempo de lectura estimado
 */
export function calculateReadingTime(text: string): number {
	const wordsPerMinute = 200;
	const words = text.split(" ").length;
	return Math.ceil(words / wordsPerMinute);
}

/**
 * Obtiene el año actual
 */
export function getCurrentYear(): number {
	return new Date().getFullYear();
}
