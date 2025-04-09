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
		url: "#",
		icon: Home,
	},
	{
		title: "Categories",
		url: "#",
		icon: LayoutGrid,
	},
	{
		title: "Tags",
		url: "#",
		icon: Tags,
	},
	{
		title: "Archives",
		url: "#",
		icon: Archive,
	},
	{
		title: "About",
		url: "#",
		icon: Info,
	},
];

export function AppSidebar() {
	return (
		<Sidebar className="bg-[#1e1e1e] py-7 px-4">
			<SidebarContent>
				<SidebarGroup>
					<div className="space-y-4 pl-4">
						<div className="border-2 border-neutral-600 bg-neutral-950 flex items-center justify-center w-28 h-28 rounded-full">
							<Link href="/">
								<Image
									src={logoImage}
									alt="Logo"
									// width={50}
									// height={50}
									className="w-[90px] h-[90px] overflow-hidden opacity-80 hover:opacity-100 hover:scale-120 transform transition-transform duration-300 ease-in-out"
								/>
							</Link>
						</div>
						<h1 className="font-bold tracking-wider text-3xl text-neutral-600">Denis</h1>
					</div>
					<SidebarGroupContent className="mt-8 text-neutral-500 font-semibold">
						<SidebarMenu>
							{items.map((item) => (
								<SidebarMenuItem key={item.title}>
									<SidebarMenuButton
										asChild
										className="hover:bg-neutral-800 transition-colors duration-300 ease-in-out">
										<a href={item.url} className="h-[40px]">
											<item.icon />
											<span className="uppercase font-semibold ml-2">{item.title}</span>
										</a>
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
