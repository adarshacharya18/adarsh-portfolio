import React from 'react';

/**
 * A lightweight, safe parser that compiles basic markdown blocks (headers, lists, pre/code blocks, paragraphs)
 * directly into native React elements to prevent raw dangerouslySetInnerHTML operations or large library dependencies.
 */
export const parseMarkdown = (markdown: string): React.ReactNode[] => {
  if (!markdown) return [];

  // Split by paragraphs/blocks
  const blocks = markdown.split(/\n\s*\n/);

  return blocks.map((block, index) => {
    const trimmed = block.trim();
    if (!trimmed) return null;

    // 1. Preformatted Code Blocks
    if (trimmed.startsWith('```')) {
      const lines = trimmed.split('\n');
      const language = lines[0].replace('```', '').trim() || 'text';
      // Join lines omitting the opening/closing ``` tags
      const code = lines
        .slice(1, lines[lines.length - 1].startsWith('```') ? -1 : undefined)
        .join('\n');
      return (
        <pre
          key={index}
          className="bg-bg-primary border border-border-primary p-4 rounded-lg my-4 overflow-x-auto font-mono text-2xs md:text-xs text-text-secondary"
        >
          <code className={`language-${language}`}>{code}</code>
        </pre>
      );
    }

    // 2. Headings
    if (trimmed.startsWith('# ')) {
      return (
        <h1 key={index} className="text-xl md:text-2xl font-bold mt-8 mb-4 text-text-primary">
          {trimmed.slice(2)}
        </h1>
      );
    }
    if (trimmed.startsWith('## ')) {
      return (
        <h2 key={index} className="text-lg md:text-xl font-semibold mt-6 mb-3 text-text-primary">
          {trimmed.slice(3)}
        </h2>
      );
    }
    if (trimmed.startsWith('### ')) {
      return (
        <h3 key={index} className="text-base md:text-lg font-medium mt-4 mb-2 text-text-primary">
          {trimmed.slice(4)}
        </h3>
      );
    }

    // 3. Bullet Lists
    if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
      const items = trimmed.split(/\n[*-]\s+/).map((item) => item.replace(/^[*-]\s+/, ''));
      return (
        <ul
          key={index}
          className="list-disc pl-5 my-3 space-y-1 text-xs md:text-sm text-text-secondary"
        >
          {items.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      );
    }

    // 4. Numbered Lists
    if (/^\d+\.\s+/.test(trimmed)) {
      const items = trimmed.split(/\n\d+\.\s+/).map((item) => item.replace(/^\d+\.\s+/, ''));
      return (
        <ol
          key={index}
          className="list-decimal pl-5 my-3 space-y-1 text-xs md:text-sm text-text-secondary"
        >
          {items.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ol>
      );
    }

    // 5. Standard Paragraphs
    return (
      <p key={index} className="text-xs md:text-sm text-text-muted leading-relaxed my-3">
        {trimmed}
      </p>
    );
  });
};

export default parseMarkdown;
