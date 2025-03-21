import { Tags, Home, LayoutGrid, Archive, Info } from "lucide-react";
import Image from "next/image";
import logoImage from "../../public/imagenes/logo/logo_1.webp";

import {
	Sidebar,
	SidebarContent,
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
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
		<Sidebar className="py-7 px-4">
			<SidebarContent>
				<SidebarGroup>
					<div className="space-y-4">
						<div className="border-2 border-gray-300 bg-slate-700 flex items-center justify-center w-28 h-28 rounded-full">
							<Image
								src={logoImage}
								alt="Logo"
								width={50}
								height={50}
							/>
						</div>
						<h1 className="font-bold text-3xl">Denis</h1>
					</div>
					<SidebarGroupContent className="mt-8">
						<SidebarMenu>
							{items.map((item) => (
								<SidebarMenuItem
									key={item.title}
									className="p-2">
									<SidebarMenuButton
										asChild
										className="hover:bg-slate-100 hover:text-slate-500">
										<a href={item.url}>
											<item.icon />
											<span className="uppercase font-semibold">
												{item.title}
											</span>
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
