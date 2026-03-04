import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import BrowserTabPreview from './previews/BrowserTabPreview';
import BookmarkBarPreview from './previews/BookmarkBarPreview';
import MobileHomeScreenPreview from './previews/MobileHomeScreenPreview';
import SizeGridPreview from './previews/SizeGridPreview';

interface PreviewPanelProps {
  previewUrl: string | null;
}

export default function PreviewPanel({ previewUrl }: PreviewPanelProps) {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Preview</CardTitle>
      </CardHeader>
      <CardContent>
        {!previewUrl ? (
          <div className="flex items-center justify-center h-40 text-muted-foreground text-sm border rounded-lg bg-muted/20">
            Select a source to see a live preview
          </div>
        ) : (
          <Tabs defaultValue="browser" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="browser" className="text-xs">Tab</TabsTrigger>
              <TabsTrigger value="bookmark" className="text-xs">Bookmark</TabsTrigger>
              <TabsTrigger value="mobile" className="text-xs">Mobile</TabsTrigger>
              <TabsTrigger value="sizes" className="text-xs">Sizes</TabsTrigger>
            </TabsList>

            <TabsContent value="browser" className="mt-4">
              <BrowserTabPreview faviconUrl={previewUrl} />
            </TabsContent>

            <TabsContent value="bookmark" className="mt-4">
              <BookmarkBarPreview faviconUrl={previewUrl} />
            </TabsContent>

            <TabsContent value="mobile" className="mt-4">
              <MobileHomeScreenPreview faviconUrl={previewUrl} />
            </TabsContent>

            <TabsContent value="sizes" className="mt-4">
              <SizeGridPreview faviconUrl={previewUrl} />
            </TabsContent>
          </Tabs>
        )}
      </CardContent>
    </Card>
  );
}
