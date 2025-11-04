import React from "react";
import { Badge } from "./ui/badge";
import { formatDateShort } from "@/utils/helpers";

interface TagProps {
	name: string;
	count?: number;
	date?: string;
}

const TagItem: React.FC<TagProps> = ({ name, count, date }) => {
	return (
		<div className="flex items-center justify-between w-full">
			<div className="flex items-center gap-2">
				<Badge>{name}</Badge>
				{count && <span className="text-sm text-muted-foreground">{count}</span>}
			</div>
			<div className="flex-1 border-dotted border-b border-border mx-2 "></div>
			<span className="text-sm text-muted-foreground">{date ? formatDateShort(date) : "No posts"}</span>
		</div>
	);
};

export default TagItem;
