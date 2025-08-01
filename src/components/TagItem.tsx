import React from "react";
import { Badge } from "./ui/badge";

interface TagProps {
	name: string;
	count?: number;
	date: string;
}

const TagItem: React.FC<TagProps> = ({ name, count, date }) => {
	const formatDate = (dateString: string) => {
		const date = new Date(dateString);
		if (isNaN(date.getTime())) {
			return "Invalid Date";
		}
		return date.toLocaleDateString("en-US", {
			month: "short",
			day: "numeric",
			year: "numeric",
		});
	};

	return (
		<div className="flex items-center justify-between w-full">
			<div className="flex items-center gap-2">
				<Badge>{name}</Badge>
				{count && <span className="text-sm text-muted-foreground">{count}</span>}
			</div>
			<div className="flex-1 border-dotted border-b border-border mx-2 "></div>
			<span className="text-sm text-muted-foreground">{formatDate(date)}</span>
		</div>
	);
};
export default TagItem;
