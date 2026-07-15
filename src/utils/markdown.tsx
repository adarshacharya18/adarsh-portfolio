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
    lang === 'json' ||
    lang === 'php'
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
      'namespace',
      'use',
      'global',
      'throw',
      'Exception',
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
 * Parses inline formatting like `code`, **bold**, and [text](url) into React elements.
 */
const renderInlineFormatting = (text: string): React.ReactNode[] => {
  const regex = /(`[^`]+`|\*\*[^*]+\*\*|\[[^\]]+\]\([^)]+\))/g;
  const splitParts = text.split(regex);

  return splitParts.map((part, i) => {
    if (part.startsWith('`') && part.endsWith('`')) {
      return (
        <code
          key={i}
          className="px-1.5 py-0.5 rounded bg-bg-primary border border-border-primary font-mono text-2xs text-text-secondary"
        >
          {part.slice(1, -1)}
        </code>
      );
    }
    if (part.startsWith('**') && part.endsWith('**')) {
      return (
        <strong key={i} className="font-bold text-text-primary">
          {part.slice(2, -2)}
        </strong>
      );
    }
    if (part.startsWith('[') && part.includes('](') && part.endsWith(')')) {
      const match = part.match(/\[([^\]]+)\]\(([^)]+)\)/);
      if (match) {
        const [, linkText, linkUrl] = match;
        return (
          <a
            key={i}
            href={linkUrl}
            target={linkUrl.startsWith('http') ? '_blank' : undefined}
            rel={linkUrl.startsWith('http') ? 'noopener noreferrer' : undefined}
            className="text-accent-primary hover:underline font-semibold"
          >
            {linkText}
          </a>
        );
      }
    }
    return part;
  });
};

/**
 * A robust compiler that parses markdown lines sequentially using a state machine,
 * assembling consecutive paragraphs, tables, lists, and preserving multi-line code block structure.
 */
export const parseMarkdown = (markdown: string): React.ReactNode[] => {
  if (!markdown) return [];

  const lines = markdown.split('\n');
  const elements: React.ReactNode[] = [];

  let inCodeBlock = false;
  let codeLanguage = '';
  let codeBuffer: string[] = [];

  let currentParagraph: string[] = [];
  let currentListType: 'ul' | 'ol' | null = null;
  let listBuffer: string[] = [];

  const flushParagraph = (key: number) => {
    if (currentParagraph.length > 0) {
      const text = currentParagraph.join(' ');
      elements.push(
        <p key={`p-${key}`} className="text-xs md:text-sm text-text-muted leading-relaxed my-3">
          {renderInlineFormatting(text)}
        </p>,
      );
      currentParagraph = [];
    }
  };

  const flushList = (key: number) => {
    if (currentListType && listBuffer.length > 0) {
      const ListTag = currentListType === 'ul' ? 'ul' : 'ol';
      const className =
        currentListType === 'ul'
          ? 'list-disc pl-5 my-3 space-y-1 text-xs md:text-sm text-text-secondary'
          : 'list-decimal pl-5 my-3 space-y-1 text-xs md:text-sm text-text-secondary';

      elements.push(
        <ListTag key={`list-${key}`} className={className}>
          {listBuffer.map((item, idx) => (
            <li key={idx}>{renderInlineFormatting(item)}</li>
          ))}
        </ListTag>,
      );
      listBuffer = [];
      currentListType = null;
    }
  };

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmed = line.trim();

    if (inCodeBlock) {
      if (trimmed === '```') {
        const code = codeBuffer.join('\n');
        const currentLang = codeLanguage;
        elements.push(
          <pre
            key={`code-${i}`}
            className="bg-bg-primary border border-border-primary p-4 rounded-lg my-4 overflow-x-auto font-mono text-2xs md:text-xs text-text-secondary"
          >
            <code
              className={`language-${currentLang}`}
              dangerouslySetInnerHTML={{ __html: highlightCode(code, currentLang) }}
            />
          </pre>,
        );
        codeBuffer = [];
        codeLanguage = '';
        inCodeBlock = false;
      } else {
        codeBuffer.push(line);
      }
      continue;
    }

    if (trimmed.startsWith('```')) {
      flushParagraph(i);
      flushList(i);
      inCodeBlock = true;
      codeLanguage = trimmed.replace('```', '').trim() || 'text';
      continue;
    }

    if (trimmed.startsWith('# ')) {
      flushParagraph(i);
      flushList(i);
      elements.push(
        <h1 key={`h1-${i}`} className="text-xl md:text-2xl font-bold mt-8 mb-4 text-text-primary">
          {trimmed.slice(2)}
        </h1>,
      );
      continue;
    }
    if (trimmed.startsWith('## ')) {
      flushParagraph(i);
      flushList(i);
      const text = trimmed.slice(3);
      const id = text
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
      elements.push(
        <h2
          id={id}
          key={`h2-${i}`}
          className="text-lg md:text-xl font-semibold mt-6 mb-3 text-text-primary scroll-mt-20"
        >
          {text}
        </h2>,
      );
      continue;
    }
    if (trimmed.startsWith('### ')) {
      flushParagraph(i);
      flushList(i);
      const text = trimmed.slice(4);
      const id = text
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
      elements.push(
        <h3
          id={id}
          key={`h3-${i}`}
          className="text-base md:text-lg font-medium mt-4 mb-2 text-text-primary scroll-mt-20"
        >
          {text}
        </h3>,
      );
      continue;
    }

    if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
      flushParagraph(i);
      if (currentListType !== 'ul') {
        flushList(i);
        currentListType = 'ul';
      }
      listBuffer.push(trimmed.slice(2));
      continue;
    }
    if (/^\d+\.\s+/.test(trimmed)) {
      flushParagraph(i);
      if (currentListType !== 'ol') {
        flushList(i);
        currentListType = 'ol';
      }
      const match = trimmed.match(/^\d+\.\s+(.*)/);
      if (match) {
        listBuffer.push(match[1]);
      }
      continue;
    }

    if (trimmed === '---') {
      flushParagraph(i);
      flushList(i);
      elements.push(<hr key={`hr-${i}`} className="my-6 border-border-primary" />);
      continue;
    }

    if (!trimmed) {
      flushParagraph(i);
      flushList(i);
      continue;
    }

    flushList(i);
    currentParagraph.push(line);
  }

  flushParagraph(lines.length);
  flushList(lines.length);

  return elements;
};

export default parseMarkdown;
