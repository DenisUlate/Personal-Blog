import { AlertCircle, Info, CheckCircle, AlertTriangle } from "lucide-react";

/**
 * Callout Component Props
 *
 * type: Define el tipo de callout (afecta color e icono)
 * children: Contenido del callout (puede ser texto, JSX, otros componentes)
 */
interface CalloutProps {
	type?: "info" | "warning" | "error" | "success";
	children: React.ReactNode;
	title?: string;
}

/**
 * Callout Component
 *
 * ¿Qué es un Callout?
 * - Componente para destacar información importante
 * - Similar a los "admonitions" de documentación técnica
 * - Cambia color e icono según el tipo
 *
 * ¿Cómo usarlo en MDX?
 * ```mdx
 * <Callout type="info" title="Nota importante">
 *   Este es un mensaje que quiero destacar
 * </Callout>
 * ```
 *
 * ¿Por qué es útil?
 * - Mejora la legibilidad del contenido
 * - Destaca información crítica (warnings, errores)
 * - Hace el contenido más visual y escaneable
 *
 * @param type - Tipo de callout (info, warning, error, success)
 * @param children - Contenido del callout
 * @param title - Título opcional del callout
 */
export function Callout({ type = "info", children, title }: CalloutProps) {
	// Configuración de colores e iconos según el tipo
	const config = {
		info: {
			icon: Info,
			className: "bg-blue-50 dark:bg-blue-950/30 border-blue-500 text-blue-900 dark:text-blue-100",
			iconClassName: "text-blue-500",
		},
		warning: {
			icon: AlertTriangle,
			className: "bg-yellow-50 dark:bg-yellow-950/30 border-yellow-500 text-yellow-900 dark:text-yellow-100",
			iconClassName: "text-yellow-500",
		},
		error: {
			icon: AlertCircle,
			className: "bg-red-50 dark:bg-red-950/30 border-red-500 text-red-900 dark:text-red-100",
			iconClassName: "text-red-500",
		},
		success: {
			icon: CheckCircle,
			className: "bg-green-50 dark:bg-green-950/30 border-green-500 text-green-900 dark:text-green-100",
			iconClassName: "text-green-500",
		},
	};

	const { icon: Icon, className, iconClassName } = config[type];

	return (
		<div className={`my-6 rounded-lg border-l-4 p-4 ${className}`}>
			<div className="flex gap-3">
				{/* Icono */}
				<div className="flex-shrink-0 mt-0.5">
					<Icon className={`h-5 w-5 ${iconClassName}`} />
				</div>

				{/* Contenido */}
				<div className="flex-1">
					{title && <div className="font-semibold mb-1">{title}</div>}
					<div className="text-sm leading-relaxed">{children}</div>
				</div>
			</div>
		</div>
	);
}
