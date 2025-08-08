import Image from "next/image";
import MainLayout from "@/components/layout/MainLayout";

export default function AboutPage() {
	return (
		<MainLayout showSidebar={false} pageTitle="About Me">
			<div className="max-w-[800px] flex flex-col md:flex-row gap-8">
				<div className="max-w-md">
					<Image
						src="/assets/logo_3_optimized.png"
						alt="Profile"
						width={300}
						height={300}
						className="rounded-lg shadow-md border border-border"
					/>
				</div>

				<div className="prose dark:prose-invert max-w-2xl text-muted-foreground">
					<p className="text-lg">Welcome to my personal blog! I&apos;m Denis, a passionate developer.</p>

					<p>
						I created this space to share my thoughts, experiences, and knowledge about technology, programming, and
						other topics I&apos;m passionate about.
					</p>

					<h2 className="text-2xl text-primary font-semibold mt-6 mb-3">About This Space</h2>
					<p className="">
						This space focuses on practical tech topics and problem-solving. I keep the emphasis on the work rather than
						personal details, so you&apos;ll mostly find concise notes, tutorials, and ideas that might help in your
						projects.
					</p>

					<h2 className="text-2xl text-primary font-semibold mt-6 mb-3">Skills & Interests</h2>
					<ul className="list-disc pl-5 space-y-2">
						<li>Web Development</li>
						<li>User Interface Design</li>
						<li>Technical Writing</li>
					</ul>
				</div>
			</div>
		</MainLayout>
	);
}
