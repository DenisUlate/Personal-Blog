import MainLayout from "@/components/layout/MainLayout";
import { getAllPosts } from "@/data/blog-service";
import Link from "next/link";

// Helper to format date parts
function getDateParts(dateString: string) {
	const d = new Date(dateString);
	return {
		year: d.getFullYear(),
		day: String(d.getDate()).padStart(2, "0"),
		month: d.toLocaleString("en-US", { month: "short" }),
	};
}

export default function ArchivesPage() {
	const posts = getAllPosts();

	// Sort posts newest first
	posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

	// Group by year preserving order
	const byYear: Record<string, typeof posts> = {};
	for (const post of posts) {
		const { year } = getDateParts(post.date);
		const key = String(year);
		if (!byYear[key]) byYear[key] = [];
		byYear[key].push(post);
	}

	const orderedYears = Object.keys(byYear).sort((a, b) => Number(b) - Number(a));

	return (
		<MainLayout pageTitle="Archives">
			<p className="text-neutral-400 mb-8">Browse all posts by publication date.</p>
			<div className="space-y-14">
				{orderedYears.map((year) => (
					<section key={year}>
						<h2 className="text-2xl font-semibold text-neutral-200 mb-6">{year}</h2>
						<div className="relative">
							{/* Vertical line */}
							<div className="absolute left-16 top-0 bottom-0 w-px bg-neutral-800" />
							<div className="space-y-2">
								{byYear[year].map((post) => {
									const { day, month } = getDateParts(post.date);
									return (
										<div key={post.id} className="group flex items-stretch">
											{/* Date column */}
											<div className="w-16 pr-4 flex flex-col items-end pt-2 select-none">
												<span className="text-sm font-medium text-neutral-300 tabular-nums leading-none">{day}</span>
												<span className="text-[10px] uppercase tracking-wide text-neutral-500 mt-1 leading-none">
													{month}
												</span>
											</div>
											{/* Title / card */}
											<div className="relative pl-6 flex-1">
												<span className="absolute left-0 top-1.5 -translate-x-1/2 w-2.5 h-2.5 rounded-full bg-neutral-700 border border-neutral-600 group-hover:bg-blue-500 group-hover:border-blue-400 transition-colors" />
												<Link
													href={`/blog/${post.slug}`}
													className="block rounded-md border border-neutral-800 bg-neutral-900/60 backdrop-blur-sm px-4 py-2.5 text-neutral-200 text-sm font-medium hover:border-neutral-700 hover:bg-neutral-800/70 transition-colors">
													{post.title}
													{post.category && (
														<span className="ml-2 text-[10px] font-normal uppercase tracking-wide text-blue-400/70 group-hover:text-blue-400">
															[{post.category}]
														</span>
													)}
												</Link>
											</div>
										</div>
									);
								})}
							</div>
						</div>
					</section>
				))}
				{posts.length === 0 && <div className="text-neutral-500 text-sm">No posts available.</div>}
			</div>
		</MainLayout>
	);
}
