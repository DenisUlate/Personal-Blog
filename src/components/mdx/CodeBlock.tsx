"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";

/**
 * CodeBlock component with copy-to-clipboard functionality
 *
 * Why is this a Client Component?
 * - Uses useState for managing copied state
 * - Uses onClick handler for user interaction
 * - Accesses browser APIs (navigator.clipboard)
 *
 * @param children - The code content (usually a <code> element)
 * @param className - CSS classes (includes Shiki styling)
 * @param props - Other pre element attributes
 */
interface CodeBlockProps extends React.HTMLAttributes<HTMLPreElement> {
	children?: React.ReactNode;
}

export function CodeBlock({ children, className, ...props }: CodeBlockProps) {
	const [copied, setCopied] = useState(false);

	/**
	 * Extract text content from the code block
	 *
	 * How it works:
	 * - The children prop contains the <code> element
	 * - We need to extract the raw text from it
	 * - React.Children utilities help us traverse the tree
	 */
	const getCodeContent = (): string => {
		if (!children) return "";

		// If children is a React element (like <code>)
		if (typeof children === "object" && "props" in children) {
			const codeElement = children as React.ReactElement<{ children?: React.ReactNode }>;
			// Get the text content from the code element
			if (codeElement.props && codeElement.props.children) {
				return extractText(codeElement.props.children);
			}
		}

		// Fallback: convert to string
		return String(children);
	};

	/**
	 * Recursively extract text from nested React elements
	 *
	 * Why recursive?
	 * - Code can contain nested spans (from syntax highlighting)
	 * - We need to traverse all levels to get complete text
	 */
	const extractText = (node: React.ReactNode): string => {
		if (!node) return "";
		if (typeof node === "string") return node;
		if (typeof node === "number") return String(node);
		if (Array.isArray(node)) {
			return node.map(extractText).join("");
		}
		if (typeof node === "object" && "props" in node) {
			const element = node as React.ReactElement<{ children?: React.ReactNode }>;
			return extractText(element.props.children);
		}
		return "";
	};

	/**
	 * Copy code to clipboard
	 *
	 * How it works:
	 * 1. Extract the text content
	 * 2. Use Clipboard API to write to clipboard
	 * 3. Show success feedback (icon change)
	 * 4. Reset after 2 seconds
	 */
	const copyToClipboard = async () => {
		try {
			const code = getCodeContent();
			await navigator.clipboard.writeText(code);
			setCopied(true);

			// Reset copied state after 2 seconds
			setTimeout(() => {
				setCopied(false);
			}, 2000);
		} catch (error) {
			console.error("Failed to copy code:", error);
		}
	};

	return (
		<div className="relative group my-6">
			{/* Copy Button */}
			<button
				onClick={copyToClipboard}
				className="absolute top-3 right-3 p-2 rounded-md bg-muted/80 hover:bg-muted transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100 z-10"
				aria-label={copied ? "Code copied!" : "Copy code to clipboard"}
				title={copied ? "Copied!" : "Copy code"}>
				{copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4 text-muted-foreground" />}
			</button>

			{/* Original pre element with all Shiki styling */}
			<pre className={className} {...props}>
				{children}
			</pre>
		</div>
	);
}
