import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Image, Smile, Type, FileCode } from 'lucide-react';
import BrowserTabPreview from './previews/BrowserTabPreview';
import BookmarkBarPreview from './previews/BookmarkBarPreview';
import MobileHomeScreenPreview from './previews/MobileHomeScreenPreview';
import SizeGridPreview from './previews/SizeGridPreview';

interface PreviewPanelProps {
  previewUrl: string | null;
  siteName?: string;
}

const INPUT_HINTS = [
  { icon: Image, label: 'Image' },
  { icon: Smile, label: 'Emoji' },
  { icon: Type, label: 'Text' },
  { icon: FileCode, label: 'SVG' },
];

export default function PreviewPanel({ previewUrl, siteName }: PreviewPanelProps) {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Preview</CardTitle>
      </CardHeader>
      <CardContent>
        {!previewUrl ? (
          <div className="flex flex-col items-center justify-center py-10 text-center border rounded-lg bg-muted/20">
            {/* Favicon placeholder */}
            <div className="w-16 h-16 rounded-xl border-2 border-dashed border-muted-foreground/20 flex items-center justify-center mb-4 animate-pulse-soft">
              <svg className="w-8 h-8 text-muted-foreground/30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <rect x="3" y="3" width="18" height="18" rx="4" />
                <circle cx="12" cy="12" r="3" />
              </svg>
            </div>
            <p className="text-sm text-muted-foreground mb-3">
              Choose a source to see a live preview
            </p>
            <div className="flex gap-3">
              {INPUT_HINTS.map(({ icon: Icon, label }) => (
                <div key={label} className="flex flex-col items-center gap-1">
                  <div className="w-8 h-8 rounded-lg bg-muted/60 flex items-center justify-center">
                    <Icon className="w-4 h-4 text-muted-foreground/50" />
                  </div>
                  <span className="text-[10px] text-muted-foreground/50">{label}</span>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <Tabs defaultValue="browser" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="browser" className="text-xs">Tab</TabsTrigger>
              <TabsTrigger value="bookmark" className="text-xs">Bookmark</TabsTrigger>
              <TabsTrigger value="mobile" className="text-xs">Mobile</TabsTrigger>
              <TabsTrigger value="sizes" className="text-xs">Sizes</TabsTrigger>
            </TabsList>

            <TabsContent value="browser" className="mt-4 animate-fade-in">
              <BrowserTabPreview faviconUrl={previewUrl} siteName={siteName} />
            </TabsContent>

            <TabsContent value="bookmark" className="mt-4 animate-fade-in">
              <BookmarkBarPreview faviconUrl={previewUrl} siteName={siteName} />
            </TabsContent>

            <TabsContent value="mobile" className="mt-4 animate-fade-in">
              <MobileHomeScreenPreview faviconUrl={previewUrl} siteName={siteName} />
            </TabsContent>

            <TabsContent value="sizes" className="mt-4 animate-fade-in">
              <SizeGridPreview faviconUrl={previewUrl} />
            </TabsContent>
          </Tabs>
        )}
      </CardContent>
    </Card>
  );
}
