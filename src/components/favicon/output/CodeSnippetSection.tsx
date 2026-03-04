import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Copy, Check } from 'lucide-react';
import { copyToClipboard } from '@/lib/favicon-utils';
import { toast } from 'sonner';
import type { GenerationResult } from '@/lib/favicon-types';

interface CodeSnippetSectionProps {
  result: GenerationResult;
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

  return (
    <div className="relative group">
      <Button
        variant="ghost"
        size="icon"
        className="absolute top-2 right-2 h-7 w-7 opacity-0 group-hover:opacity-100 transition-opacity"
        onClick={handleCopy}
      >
        {copied ? (
          <Check className="h-3.5 w-3.5 text-green-500" />
        ) : (
          <Copy className="h-3.5 w-3.5" />
        )}
      </Button>
      <pre className="p-3 bg-muted/50 rounded-lg overflow-x-auto text-xs font-mono leading-relaxed border">
        <code>{code}</code>
      </pre>
    </div>
  );
}

export default function CodeSnippetSection({ result }: CodeSnippetSectionProps) {
  return (
    <div className="space-y-3">
      <Tabs defaultValue="html">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="html" className="text-xs">HTML</TabsTrigger>
          <TabsTrigger value="manifest" className="text-xs">manifest.json</TabsTrigger>
          <TabsTrigger value="browserconfig" className="text-xs">browserconfig</TabsTrigger>
        </TabsList>

        <TabsContent value="html" className="mt-3">
          <p className="text-xs text-muted-foreground mb-2">
            Add these tags to your HTML &lt;head&gt;:
          </p>
          <CodeBlock code={result.htmlSnippet} language="html" />
        </TabsContent>

        <TabsContent value="manifest" className="mt-3">
          <p className="text-xs text-muted-foreground mb-2">
            Save as manifest.json in your site root:
          </p>
          <CodeBlock code={result.manifestJson} language="json" />
        </TabsContent>

        <TabsContent value="browserconfig" className="mt-3">
          <p className="text-xs text-muted-foreground mb-2">
            Save as browserconfig.xml for Windows tiles:
          </p>
          <CodeBlock code={result.browserconfigXml} language="xml" />
        </TabsContent>
      </Tabs>
    </div>
  );
}
