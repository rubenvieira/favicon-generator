import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Wand2 } from 'lucide-react';
import DownloadSection from './output/DownloadSection';
import CodeSnippetSection from './output/CodeSnippetSection';
import SizeSelector from './output/SizeSelector';
import type { GenerationResult } from '@/lib/favicon-types';

interface OutputPanelProps {
  result: GenerationResult | null;
  isGenerating: boolean;
  hasInput: boolean;
  selectedSizes: string[];
  onSelectedSizesChange: (sizes: string[]) => void;
  onGenerate: () => void;
  siteName: string;
  onSiteNameChange: (name: string) => void;
}

export default function OutputPanel({
  result,
  isGenerating,
  hasInput,
  selectedSizes,
  onSelectedSizesChange,
  onGenerate,
  siteName,
  onSiteNameChange,
}: OutputPanelProps) {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Output</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="site-name" className="text-sm font-medium">Site Name</Label>
          <Input
            id="site-name"
            value={siteName}
            onChange={(e) => onSiteNameChange(e.target.value)}
            placeholder="My Website"
            className="mt-1.5"
          />
          <p className="text-[10px] text-muted-foreground mt-1">Used in manifest.json</p>
        </div>

        <Separator />

        <SizeSelector
          selectedSizes={selectedSizes}
          onChange={onSelectedSizesChange}
        />

        <Separator />

        <Button
          onClick={onGenerate}
          disabled={!hasInput || isGenerating || selectedSizes.length === 0}
          size="lg"
          className="w-full"
        >
          <Wand2 className="mr-2 h-5 w-5" />
          {isGenerating ? 'Generating...' : 'Generate Favicons'}
        </Button>

        {result && (
          <>
            <Separator />
            <DownloadSection result={result} />
            <Separator />
            <CodeSnippetSection result={result} />
          </>
        )}
      </CardContent>
    </Card>
  );
}
