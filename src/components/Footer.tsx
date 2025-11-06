"use client";

import { getCurrentYear } from "@/lib/helpers";

const Footer = () => {
	return (
		<footer className="max-w-[800px] border-t border-border opacity-60 py-6">
			<div className="max-w-7xl mx-auto px-8">
				<p className="text-center text-muted-foreground text-sm">
					© {getCurrentYear()} Denis Ulate. Some rights reserved.
				</p>
			</div>
		</footer>
	);
};
export default Footer;
