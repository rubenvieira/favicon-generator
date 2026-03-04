import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Copy, Check, ClipboardList } from 'lucide-react';
import { copyToClipboard } from '@/lib/favicon-utils';
import { toast } from 'sonner';
import type { GenerationResult } from '@/lib/favicon-types';

interface CodeSnippetSectionProps {
  result: GenerationResult;
}

function highlightHtml(code: string): string {
  return code
    // Comments
    .replace(/(<!--[\s\S]*?-->)/g, '<span class="text-muted-foreground/60 italic">$1</span>')
    // Tag names
    .replace(/(&lt;\/?)([\w-]+)/g, '$1<span class="text-blue-500 dark:text-blue-400">$2</span>')
    // Attribute values
    .replace(/(=)("(?:[^"]*)")/g, '$1<span class="text-green-600 dark:text-green-400">$2</span>')
    // Attribute names
    .replace(/\s([\w-]+)(=)/g, ' <span class="text-purple-500 dark:text-purple-400">$1</span>$2');
}

function highlightJson(code: string): string {
  return code
    // String keys
    .replace(/"([\w-]+)"(\s*:)/g, '<span class="text-purple-500 dark:text-purple-400">"$1"</span>$2')
    // String values
    .replace(/:\s*"([^"]*)"/g, ': <span class="text-green-600 dark:text-green-400">"$1"</span>')
    // Numbers
    .replace(/:\s*(\d+)/g, ': <span class="text-orange-500 dark:text-orange-400">$1</span>')
    // Booleans
    .replace(/\b(true|false)\b/g, '<span class="text-blue-500 dark:text-blue-400">$1</span>');
}

function highlightXml(code: string): string {
  return code
    // XML declaration
    .replace(/(&lt;\?[\s\S]*?\?&gt;)/g, '<span class="text-muted-foreground/60">$1</span>')
    // Tag names
    .replace(/(&lt;\/?)([\w:]+)/g, '$1<span class="text-blue-500 dark:text-blue-400">$2</span>')
    // Attribute values
    .replace(/(=)("(?:[^"]*)")/g, '$1<span class="text-green-600 dark:text-green-400">$2</span>')
    // Attribute names
    .replace(/\s([\w:]+)(=)/g, ' <span class="text-purple-500 dark:text-purple-400">$1</span>$2');
}

function escapeHtml(str: string): string {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function CodeBlock({ code, language }: { code: string; language: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    const success = await copyToClipboard(code);
    if (success) {
      setCopied(true);
      toast.success('Copied to clipboard!');
      setTimeout(() => setCopied(false), 2000);
    } else {
      toast.error('Failed to copy.');
    }
  };

  const escaped = escapeHtml(code);
  let highlighted: string;
  switch (language) {
    case 'html':
      highlighted = highlightHtml(escaped);
      break;
    case 'json':
      highlighted = highlightJson(escaped);
      break;
    case 'xml':
      highlighted = highlightXml(escaped);
      break;
    default:
      highlighted = escaped;
  }

  return (
    <div className="relative">
      <Button
        variant="outline"
        size="sm"
        className="absolute top-2 right-2 h-7 gap-1.5 text-xs z-10"
        onClick={handleCopy}
      >
        {copied ? (
          <>
            <Check className="h-3 w-3 text-green-500" />
            Copied
          </>
        ) : (
          <>
            <Copy className="h-3 w-3" />
            Copy
          </>
        )}
      </Button>
      <pre className="p-3 pt-10 bg-muted/50 rounded-lg overflow-x-auto text-xs font-mono leading-relaxed border">
        <code dangerouslySetInnerHTML={{ __html: highlighted }} />
      </pre>
    </div>
  );
}

export default function CodeSnippetSection({ result }: CodeSnippetSectionProps) {
  const [copiedAll, setCopiedAll] = useState(false);

  const handleCopyAll = async () => {
    const all = `<!-- HTML Head Tags -->\n${result.htmlSnippet}\n\n<!-- manifest.json -->\n${result.manifestJson}\n\n<!-- browserconfig.xml -->\n${result.browserconfigXml}`;
    const success = await copyToClipboard(all);
    if (success) {
      setCopiedAll(true);
      toast.success('All snippets copied to clipboard!');
      setTimeout(() => setCopiedAll(false), 2000);
    }
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium">Code Snippets</p>
        <Button
          variant="ghost"
          size="sm"
          className="h-7 gap-1.5 text-xs"
          onClick={handleCopyAll}
        >
          {copiedAll ? (
            <>
              <Check className="h-3 w-3 text-green-500" />
              Copied All
            </>
          ) : (
            <>
              <ClipboardList className="h-3 w-3" />
              Copy All
            </>
          )}
        </Button>
      </div>

      <Tabs defaultValue="html">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="html" className="text-xs">HTML</TabsTrigger>
          <TabsTrigger value="manifest" className="text-xs">manifest.json</TabsTrigger>
          <TabsTrigger value="browserconfig" className="text-xs">browserconfig</TabsTrigger>
        </TabsList>

        <TabsContent value="html" className="mt-3 animate-fade-in">
          <p className="text-xs text-muted-foreground mb-2">
            Add these tags to your HTML &lt;head&gt;:
          </p>
          <CodeBlock code={result.htmlSnippet} language="html" />
        </TabsContent>

        <TabsContent value="manifest" className="mt-3 animate-fade-in">
          <p className="text-xs text-muted-foreground mb-2">
            Save as manifest.json in your site root:
          </p>
          <CodeBlock code={result.manifestJson} language="json" />
        </TabsContent>

        <TabsContent value="browserconfig" className="mt-3 animate-fade-in">
          <p className="text-xs text-muted-foreground mb-2">
            Save as browserconfig.xml for Windows tiles:
          </p>
          <CodeBlock code={result.browserconfigXml} language="xml" />
        </TabsContent>
      </Tabs>
    </div>
  );
}
