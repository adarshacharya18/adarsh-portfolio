import React from 'react';

/**
 * Basic desaturated syntax highlighter helper for code blocks.
 * Escapes characters and wraps comments, strings, and keywords in desaturated classes.
 */
const highlightCode = (code: string, language: string): string => {
  let escaped = code.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

  const lang = language.toLowerCase();
  if (
    lang === 'javascript' ||
    lang === 'typescript' ||
    lang === 'js' ||
    lang === 'ts' ||
    lang === 'json'
  ) {
    // 1. Highlight Strings
    escaped = escaped.replace(
      /(["'`])(.*?)\1/g,
      '<span class="text-text-primary font-medium">$1$2$1</span>',
    );
    // 2. Highlight Comments
    escaped = escaped.replace(/(\/\/.*)/g, '<span class="text-text-muted italic">$1</span>');
    // 3. Highlight Keywords
    const keywords = [
      'const',
      'let',
      'var',
      'function',
      'return',
      'import',
      'export',
      'default',
      'from',
      'class',
      'extends',
      'if',
      'else',
      'for',
      'while',
      'async',
      'await',
      'try',
      'catch',
      'finally',
      'new',
      'type',
      'interface',
      'as',
      'public',
      'private',
    ];
    const keywordRegex = new RegExp(`\\b(${keywords.join('|')})\\b`, 'g');
    escaped = escaped.replace(
      keywordRegex,
      '<span class="text-text-secondary font-semibold">$1</span>',
    );
  }

  return escaped;
};

/**
 * A lightweight, safe parser that compiles basic markdown blocks (headers, lists, pre/code blocks, paragraphs)
 * directly into native React elements with anchor IDs and syntax highlighting.
 */
export const parseMarkdown = (markdown: string): React.ReactNode[] => {
  if (!markdown) return [];

  const blocks = markdown.split(/\n\s*\n/);

  return blocks.map((block, index) => {
    const trimmed = block.trim();
    if (!trimmed) return null;

    // 1. Preformatted Code Blocks
    if (trimmed.startsWith('```')) {
      const lines = trimmed.split('\n');
      const language = lines[0].replace('```', '').trim() || 'text';
      const code = lines
        .slice(1, lines[lines.length - 1].startsWith('```') ? -1 : undefined)
        .join('\n');
      return (
        <pre
          key={index}
          className="bg-bg-primary border border-border-primary p-4 rounded-lg my-4 overflow-x-auto font-mono text-2xs md:text-xs text-text-secondary"
        >
          <code
            className={`language-${language}`}
            dangerouslySetInnerHTML={{ __html: highlightCode(code, language) }}
          />
        </pre>
      );
    }

    // 2. Headings with dynamic anchor IDs
    if (trimmed.startsWith('# ')) {
      return (
        <h1 key={index} className="text-xl md:text-2xl font-bold mt-8 mb-4 text-text-primary">
          {trimmed.slice(2)}
        </h1>
      );
    }
    if (trimmed.startsWith('## ')) {
      const text = trimmed.slice(3);
      const id = text
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
      return (
        <h2
          id={id}
          key={index}
          className="text-lg md:text-xl font-semibold mt-6 mb-3 text-text-primary scroll-mt-20"
        >
          {text}
        </h2>
      );
    }
    if (trimmed.startsWith('### ')) {
      const text = trimmed.slice(4);
      const id = text
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
      return (
        <h3
          id={id}
          key={index}
          className="text-base md:text-lg font-medium mt-4 mb-2 text-text-primary scroll-mt-20"
        >
          {text}
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
