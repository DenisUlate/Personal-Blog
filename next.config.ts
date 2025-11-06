import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "dummyjson.com",
			},
			{
				protocol: "https",
				hostname: "picsum.photos",
			},
		],
	},
	experimental: {
		optimizeCss: true,
		turbo: {
			rules: {
				"*.svg": {
					loaders: ["@svgr/webpack"],
					as: "*.js",
				},
			},
		},
	},
	compiler: {
		removeConsole: process.env.NODE_ENV === "production",
	},
	poweredByHeader: false,
	reactStrictMode: true,
};

export default nextConfig;
