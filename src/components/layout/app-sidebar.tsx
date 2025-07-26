import { Tags, Home, LayoutGrid, Archive, Info } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import logoImage from "../../../public/assets/logo_3_optimized.png";

import {
	Sidebar,
	SidebarContent,
	SidebarGroup,
	SidebarGroupContent,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from "@/components/ui/sidebar";

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
	return (
		<Sidebar className="bg-sidebar py-7 px-8 border-r-primary">
			<SidebarContent>
				<SidebarGroup>
					<div className="space-y-4 pl-2 ">
						<div className="border border-border bg-background flex items-center justify-center w-32 h-32 rounded-full">
							<Link href="/">
								<Image
									src={logoImage}
									alt="Logo"
									// width={50}
									// height={50}
									className="w-[125px] h-[125px] overflow-hidden opacity-80 hover:opacity-100 hover:scale-120 transform transition-transform duration-300 ease-in-out"
								/>
							</Link>
						</div>
						<h1 className="font-bold tracking-wider text-3xl text-primary">Denis</h1>
					</div>
					<SidebarGroupContent className="mt-8 text-primary font-semibold">
						<SidebarMenu>
							{items.map((item) => (
								<SidebarMenuItem key={item.title}>
									<SidebarMenuButton asChild className="hover:bg-accent transition-colors duration-300 ease-in-out">
										<Link href={item.url} className="h-[40px] flex items-center">
											<item.icon />
											<span className="uppercase font-semibold ml-2">{item.title}</span>
										</Link>
									</SidebarMenuButton>
								</SidebarMenuItem>
							))}
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>
			</SidebarContent>
		</Sidebar>
	);
}
