"use client";

import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Callout } from "@/components/mdx";

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
		<h1 className="text-4xl font-bold mb-6 mt-8 text-foreground scroll-m-20" {...props} />
	),
	h2: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
		<h2 className="text-3xl font-semibold mb-4 mt-8 text-foreground scroll-m-20 border-b pb-2" {...props} />
	),
	h3: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
		<h3 className="text-2xl font-semibold mb-3 mt-6 text-foreground scroll-m-20" {...props} />
	),
	p: (props: React.HTMLAttributes<HTMLParagraphElement>) => (
		<p className="mb-4 text-primary leading-relaxed" {...props} />
	),
	ul: (props: React.HTMLAttributes<HTMLUListElement>) => (
		<ul className="list-disc pl-6 mb-4 space-y-2 text-primary" {...props} />
	),
	li: (props: React.HTMLAttributes<HTMLLIElement>) => <li className="text-primary leading-relaxed" {...props} />,
	code: (props: React.HTMLAttributes<HTMLElement>) => (
		<code className="bg-muted px-2 py-0.5 rounded text-sm font-mono text-foreground border border-border" {...props} />
	),
	pre: (props: React.HTMLAttributes<HTMLPreElement>) => (
		<pre className="bg-muted rounded-lg p-4 my-6 overflow-x-auto border border-border" {...props} />
	),
};

export function MDXContent({ mdxSource }: { mdxSource: MDXRemoteSerializeResult }) {
	return (
		<div className="prose prose-lg max-w-none dark:prose-invert">
			<MDXRemote {...mdxSource} components={components} />
		</div>
	);
}
