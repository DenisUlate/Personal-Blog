"use client";

import { Tags, Home, LayoutGrid, Archive, Info } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import logoLightImage from "../../../public/assets/logo_light.png";
import logoDarkImage from "../../../public/assets/logo_dark.png";

import {
	Sidebar,
	SidebarContent,
	SidebarGroup,
	SidebarGroupContent,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	useSidebar,
} from "@/components/ui/sidebar";
import SocialLinks from "../SocialLinks";
import { Separator } from "../ui/separator";
import { ThemeToggle } from "../ThemeToggle";

// Menu items.
const items = [
	{
		title: "Home",
		url: "/",
		icon: Home,
	},
	{
		title: "Categories",
		url: "/categories",
		icon: LayoutGrid,
	},
	{
		title: "Tags",
		url: "/tags",
		icon: Tags,
	},
	{
		title: "Archives",
		url: "/archives",
		icon: Archive,
	},
	{
		title: "About",
		url: "/about",
		icon: Info,
	},
];

export function AppSidebar() {
	const { setOpenMobile, isMobile } = useSidebar();

	const handleLinkClick = () => {
		// Cierra el sidebar solo en móvil
		if (isMobile) {
			setOpenMobile(false);
		}
	};

	return (
		<Sidebar className="bg-sidebar py-8 px-8 border-r-primary">
			<SidebarContent>
				<SidebarGroup>
					<div className="space-y-4 pl-2 ">
						<div className="border border-border bg-background flex items-center justify-center w-32 h-32 rounded-md">
							<Link href="/" onClick={handleLinkClick}>
								{/* Logo para modo claro */}
								<Image
									src={logoLightImage}
									alt="Logo"
									priority
									className="w-[125px] h-[125px] overflow-hidden hover:scale-125 transform transition-transform duration-300 ease-in-out opacity-70 dark:hidden"
								/>
								{/* Logo para modo oscuro */}
								<Image
									src={logoDarkImage}
									alt="Logo"
									priority
									className="w-[125px] h-[125px] overflow-hidden hover:scale-125 transform transition-transform duration-300 ease-in-out hidden dark:block"
								/>
							</Link>
						</div>
						<h1 className="font-bold tracking-wider text-3xl text-primary">Denis</h1>
					</div>
					<SidebarGroupContent className="mt-16 text-primary font-semibold">
						<Separator className="my-8" />
						<SidebarMenu>
							{items.map((item) => (
								<SidebarMenuItem key={item.title}>
									<SidebarMenuButton asChild className="hover:bg-accent transition-colors duration-300 ease-in-out">
										<Link href={item.url} className="h-[40px] flex items-center" onClick={handleLinkClick}>
											<item.icon />
											<span className="uppercase font-semibold ml-2">{item.title}</span>
										</Link>
									</SidebarMenuButton>
								</SidebarMenuItem>
							))}
						</SidebarMenu>
						<div className="mt-8 ml-2">
							<ThemeToggle />
						</div>
					</SidebarGroupContent>
				</SidebarGroup>
			</SidebarContent>
			<Separator className="my-12" />
			<SocialLinks />
		</Sidebar>
	);
}
