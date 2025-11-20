import React from "react";
import Link from "next/link";
import { Badge } from "./ui/badge";
import { formatDateShort } from "@/lib/helpers";

interface TagProps {
	name: string;
	count?: number;
	date?: string;
}

const TagItem: React.FC<TagProps> = ({ name, count, date }) => {
	return (
		<Link
			href={`/tags/${name}`}
			className="flex items-center justify-between w-full hover:bg-muted/50 p-2 rounded-md transition-colors group">
			<div className="flex items-center gap-2">
				<Badge
					variant="secondary"
					className="group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
					{name}
				</Badge>
				{count && <span className="text-sm text-muted-foreground">{count}</span>}
			</div>
			<div className="flex-1 border-dotted border-b border-border mx-2 opacity-50"></div>
			<span className="text-sm text-muted-foreground">{date ? formatDateShort(date) : "No posts"}</span>
		</Link>
	);
};

export default TagItem;
