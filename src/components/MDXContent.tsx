"use client";

import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Callout, CodeBlock } from "@/components/mdx";

const components = {
	Badge,
	Button,
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
	Callout,
	h1: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
		<h1 className="text-2xl font-bold mb-6 mt-8 text-foreground scroll-m-20" {...props} />
	),
	h2: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
		<h2 className="text-xl font-semibold mb-4 mt-8 text-foreground scroll-m-20  pb-2" {...props} />
	),
	h3: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
		<h3 className="text-lg font-semibold mb-3 mt-6 text-foreground scroll-m-20" {...props} />
	),
	p: (props: React.HTMLAttributes<HTMLParagraphElement>) => (
		<p className="mb-4 text-sm text-primary leading-relaxed" {...props} />
	),
	ul: (props: React.HTMLAttributes<HTMLUListElement>) => (
		<ul className="list-disc pl-6 mb-4 space-y-2 text-primary text-sm" {...props} />
	),
	li: (props: React.HTMLAttributes<HTMLLIElement>) => <li className="text-primary text-sm leading-relaxed" {...props} />,
	code: (props: React.HTMLAttributes<HTMLElement>) => (
		<code className="bg-muted px-2 py-0.5 rounded text-sm font-mono text-foreground border border-border" {...props} />
	),
	pre: CodeBlock,
};

export function MDXContent({ mdxSource }: { mdxSource: MDXRemoteSerializeResult }) {
	return (
		<div className="prose prose-sm max-w-none dark:prose-invert">
			<MDXRemote {...mdxSource} components={components} />
		</div>
	);
}
