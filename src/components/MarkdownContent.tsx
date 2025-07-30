import React from "react";

interface MarkdownContentProps {
	content: string;
}

const MarkdownContent: React.FC<MarkdownContentProps> = ({ content }) => {
	// Función simple para convertir markdown básico a HTML
	const renderMarkdown = (text: string) => {
		let html = text;

		// Títulos
		html = html.replace(/^### (.*$)/gim, '<h3 class="text-xl font-semibold mb-4 text-foreground">$1</h3>');
		html = html.replace(/^## (.*$)/gim, '<h2 class="text-2xl font-semibold mb-6 text-foreground">$1</h2>');
		html = html.replace(/^# (.*$)/gim, '<h1 class="text-3xl font-bold mb-8 text-foreground">$1</h1>');

		// Párrafos
		html = html.replace(/^\s*(.+)$/gim, '<p class="mb-4 text-primary leading-relaxed">$1</p>');

		// Negrita
		html = html.replace(/\*\*(.*)\*\*/gim, '<strong class="font-semibold">$1</strong>');

		// Cursiva
		html = html.replace(/\*(.*)\*/gim, '<em class="italic">$1</em>');

		// Código inline
		html = html.replace(/`([^`]+)`/gim, '<code class="bg-muted px-2 py-1 rounded text-sm font-mono">$1</code>');

		// Enlaces
		html = html.replace(
			/\[([^\]]+)\]\(([^)]+)\)/gim,
			'<a href="$2" class="text-blue-500 hover:text-blue-600 underline">$1</a>'
		);

		// Bloques de código
		html = html.replace(/```(\w+)?\n([\s\S]*?)```/gim, (match, lang, code) => {
			return `<div class="bg-muted rounded-lg p-4 my-6 overflow-x-auto">
				<pre><code class="text-sm font-mono text-foreground">${code.trim()}</code></pre>
			</div>`;
		});

		// Listas no ordenadas
		html = html.replace(/^\s*\- (.+)$/gim, '<li class="mb-2 text-primary">$1</li>');
		html = html.replace(/(<li.*<\/li>)/gim, '<ul class="list-disc pl-6 mb-4">$1</ul>');

		// Listas ordenadas
		html = html.replace(/^\s*\d+\. (.+)$/gim, '<li class="mb-2 text-primary">$1</li>');

		// Limpiar párrafos vacíos y duplicados
		html = html.replace(/<p class="mb-4 text-primary leading-relaxed"><\/p>/gim, "");
		html = html.replace(/(<h[1-6][^>]*>.*<\/h[1-6]>)\s*<p class="mb-4 text-primary leading-relaxed">/gim, "$1");

		return html;
	};

	return <div className="prose prose-lg max-w-none" dangerouslySetInnerHTML={{ __html: renderMarkdown(content) }} />;
};

export default MarkdownContent;
