/**
 * Formatea una fecha en formato largo para mostrar en el blog
 * @example "January 15, 2025"
 */
export function formatDate(dateString: string): string {
	const date = new Date(dateString);
	return date.toLocaleDateString("en-US", {
		year: "numeric",
		month: "long",
		day: "numeric",
	});
}

/**
 * Formatea una fecha en formato corto para mostrar en el blog
 * @example "Jan 15, 2025"
 */
export function formatDateShort(dateString: string): string {
	const date = new Date(dateString);
	if (isNaN(date.getTime())) {
		return "Invalid Date";
	}
	return date.toLocaleDateString("en-US", {
		month: "short",
		day: "numeric",
		year: "numeric",
	});
}

/**
 * Obtiene el año actual
 */
export function getCurrentYear(): number {
	return new Date().getFullYear();
}
