"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronUp } from "lucide-react";

const GoToTopButton = () => {
	const [visible, setVisible] = useState(false);

	useEffect(() => {
		const onScroll = () => {
			setVisible(window.scrollY > 300);
		};
		window.addEventListener("scroll", onScroll, { passive: true });
		return () => window.removeEventListener("scroll", onScroll);
	}, []);

	const scrollTop = () => {
		window.scrollTo({ top: 0, behavior: "smooth" });
	};

	return (
		<Button
			onClick={scrollTop}
			aria-label="Go to top"
			size="icon"
			className={`fixed bottom-6 right-6 z-50 h-11 w-11 rounded-full p-0 shadow-lg
        transition-all duration-300
        ${visible ? "opacity-100 scale-100 cursor-pointer" : "opacity-0 scale-75 pointer-events-none"}
        bg-primary text-primary-foreground hover:bg-primary/90`}>
			<ChevronUp className="size-5" />
		</Button>
	);
};
export default GoToTopButton;
