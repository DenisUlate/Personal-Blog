import Image from "next/image";

export default function AboutPage() {
	return (
		<div className="p-6 text-neutral-200">
			<h1 className="text-4xl font-bold tracking-tight mb-6">About Me</h1>

			<div className="flex flex-col md:flex-row gap-8">
				<div className="max-w-md">
					<Image
						src="/assets/logo_3_optimized.png"
						alt="Profile"
						width={300}
						height={300}
						className="rounded-lg shadow-md border border-neutral-200/10"
					/>
				</div>

				<div className="prose dark:prose-invert max-w-2xl">
					<p className="text-lg">Welcome to my personal blog! I&apos;m Denis, a passionate developer and writer.</p>

					<p>
						I created this space to share my thoughts, experiences, and knowledge about technology, programming, and
						other topics I&apos;m passionate about.
					</p>

					<h2 className="text-2xl font-semibold mt-6 mb-3">My Background</h2>
					<p className="text-neutral-400">
						Add your personal background information here. Talk about your education, career path, and anything else
						you&apos;d like visitors to know about you.
					</p>

					<h2 className="text-2xl font-semibold mt-6 mb-3">Skills & Interests</h2>
					<ul className="list-disc pl-5 space-y-2 text-neutral-400">
						<li>Web Development</li>
						<li>User Interface Design</li>
						<li>Technical Writing</li>
						<li>Photography</li>
						<li>Open Source Contribution</li>
					</ul>
				</div>
			</div>
		</div>
	);
}
