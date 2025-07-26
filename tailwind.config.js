/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/components/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			fontFamily: {
				sans: ["var(--font-oxanium)", "sans-serif"],
				serif: ["var(--font-source-code-pro)", "serif"],
				mono: ["var(--font-source-code-pro)", "monospace"],
			},
		},
	},
	plugins: [],
};
