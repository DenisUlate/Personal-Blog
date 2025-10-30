import type { Metadata } from "next";
import "@/styles/globals.css";
import localFont from "next/font/local";

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/layout/app-sidebar";
import { METADATA } from "@/constants";
import Breadcrumbs from "@/components/Breadcrumbs";
import { ThemeProvider } from "@/components/ThemeProvider";

// Configure the local fonts
const oxanium = localFont({
	src: [
		{
			path: "../../public/fonts/oxanium/oxanium-v19-latin-regular.woff2",
			weight: "400",
			style: "normal",
		},
		{
			path: "../../public/fonts/oxanium/oxanium-v19-latin-600.woff2",
			weight: "600",
			style: "normal",
		},
		{
			path: "../../public/fonts/oxanium/oxanium-v19-latin-700.woff2",
			weight: "700",
			style: "normal",
		},
		{
			path: "../../public/fonts/oxanium/oxanium-v19-latin-800.woff2",
			weight: "800",
			style: "normal",
		},
	],
	variable: "--font-oxanium",
});

const sourceCodePro = localFont({
	src: [
		{
			path: "../../public/fonts/source-code-pro/source-code-pro-v23-latin-regular.woff2",
			weight: "400",
			style: "normal",
		},
		{
			path: "../../public/fonts/source-code-pro/source-code-pro-v23-latin-500.woff2",
			weight: "500",
			style: "normal",
		},
		{
			path: "../../public/fonts/source-code-pro/source-code-pro-v23-latin-600.woff2",
			weight: "600",
			style: "normal",
		},
		{
			path: "../../public/fonts/source-code-pro/source-code-pro-v23-latin-700.woff2",
			weight: "700",
			style: "normal",
		},
	],
	variable: "--font-source-code-pro",
});

export const metadata: Metadata = {
	title: {
		default: METADATA.TITLE,
		template: `%s | ${METADATA.TITLE}`,
	},
	description: METADATA.DESCRIPTION,
	keywords: METADATA.KEYWORDS,
	authors: [{ name: METADATA.AUTHOR }],
	creator: METADATA.AUTHOR,
	metadataBase: new URL(METADATA.URL),
	// Link alternativo al RSS feed - Permite que navegadores y lectores descubran tu feed
	alternates: {
		types: {
			"application/rss+xml": `${METADATA.URL}/feed.xml`,
		},
	},
	openGraph: {
		title: METADATA.TITLE,
		description: METADATA.DESCRIPTION,
		url: METADATA.URL,
		siteName: METADATA.TITLE,
		type: "website",
		locale: "es_ES",
	},
	twitter: {
		card: "summary_large_image",
		title: METADATA.TITLE,
		description: METADATA.DESCRIPTION,
		creator: `@${METADATA.AUTHOR.replace(" ", "").toLowerCase()}`,
	},
	robots: {
		index: true,
		follow: true,
		googleBot: {
			index: true,
			follow: true,
			"max-video-preview": -1,
			"max-image-preview": "large",
			"max-snippet": -1,
		},
	},
};

export default function Layout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en" className={`${oxanium.variable} ${sourceCodePro.variable}`} suppressHydrationWarning>
			<body>
				<ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
					<SidebarProvider>
						<AppSidebar />
						<main className="bg-background min-h-screen w-full">
							<SidebarTrigger />
							<Breadcrumbs separator="›" className="px-4 py-2" />
							{children}
						</main>
					</SidebarProvider>
				</ThemeProvider>
			</body>
		</html>
	);
}
