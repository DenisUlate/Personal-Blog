import MainLayout from "@/components/layout/MainLayout";
import TagItem from "@/components/TagItem";

const page = () => {
	const tagsData = [
		{ name: "React", count: 8, date: "2025-05-05" },
		{ name: "Next.js", count: 5, date: "2025-04-20" },
		{ name: "TypeScript", count: 12, date: "2025-03-15" },
		{ name: "hooks", count: 5, date: "2025-05-05" },
		{ name: "JavaScript", count: 15, date: "2025-02-10" },
		{ name: "CSS", count: 6, date: "2025-01-28" },
	];

	return (
		<MainLayout pageTitle="Tags">
			<p className="text-primary">Explore blog posts by tags.</p>

			<div className="mt-8 space-y-4">
				{tagsData.length === 0 ? (
					<p className="text-muted-foreground">No tags found.</p>
				) : (
					tagsData.map((tag) => <TagItem key={tag.name} {...tag} />)
				)}
			</div>
		</MainLayout>
	);
};
export default page;
