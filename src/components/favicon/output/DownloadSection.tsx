import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Download, Archive } from 'lucide-react';
import type { GenerationResult } from '@/lib/favicon-types';
import { createZipDownload, downloadBlob } from '@/lib/favicon-utils';

interface DownloadSectionProps {
  result: GenerationResult;
}

const CATEGORY_LABELS: Record<string, string> = {
  favicon: 'Favicon',
  apple: 'Apple',
  android: 'Android',
  mstile: 'MS Tile',
  ico: 'ICO',
  svg: 'SVG',
};

const CATEGORY_VARIANTS: Record<string, 'default' | 'secondary' | 'outline' | 'destructive'> = {
  favicon: 'default',
  apple: 'secondary',
  android: 'secondary',
  mstile: 'outline',
  ico: 'default',
  svg: 'outline',
};

export default function DownloadSection({ result }: DownloadSectionProps) {
  const [isZipping, setIsZipping] = useState(false);

  const handleDownloadZip = async () => {
    setIsZipping(true);
    try {
      const zipBlob = await createZipDownload(
        result.files,
        result.manifestJson,
        result.browserconfigXml,
        result.htmlSnippet
      );
      downloadBlob(zipBlob, 'favicons.zip');
    } finally {
      setIsZipping(false);
    }
  };

  const handleDownloadFile = (file: { blob: Blob; filename: string }) => {
    downloadBlob(file.blob, file.filename);
  };

  const icoFile = result.files.find(f => f.category === 'ico');
  const otherFiles = result.files.filter(f => f.category !== 'ico');

  return (
    <div className="space-y-4">
      {/* ZIP Download */}
      <Button
        onClick={handleDownloadZip}
        disabled={isZipping}
        size="lg"
        className="w-full"
      >
        <Archive className="mr-2 h-5 w-5" />
        {isZipping ? 'Creating ZIP...' : 'Download All (ZIP)'}
      </Button>

      {/* ICO File */}
      {icoFile && (
        <div className="p-3 bg-secondary/50 rounded-lg flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-background rounded flex items-center justify-center border">
              <img
                src={icoFile.dataUrl}
                alt="favicon.ico"
                className="w-4 h-4 object-contain"
              />
            </div>
            <div>
              <p className="text-sm font-medium">favicon.ico</p>
              <p className="text-xs text-muted-foreground">Multi-size ICO (16, 32, 48)</p>
            </div>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleDownloadFile(icoFile)}
          >
            <Download className="h-4 w-4" />
          </Button>
        </div>
      )}

      {/* Individual Files */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {otherFiles.map((file) => (
          <div
            key={file.filename}
            className="flex items-center gap-2 p-2 border rounded-lg hover:bg-muted/30 transition-colors"
          >
            <div className="w-8 h-8 bg-muted/30 rounded flex items-center justify-center shrink-0">
              <img
                src={file.dataUrl}
                alt={file.filename}
                className="object-contain"
                style={{
                  width: `${Math.min(parseInt(file.size), 32)}px`,
                  height: `${Math.min(parseInt(file.size), 32)}px`,
                }}
              />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-medium truncate">{file.filename}</p>
              <div className="flex items-center gap-1.5">
                <span className="text-[10px] text-muted-foreground">{file.size}</span>
                <Badge
                  variant={CATEGORY_VARIANTS[file.category] || 'outline'}
                  className="text-[9px] px-1 py-0 h-3.5"
                >
                  {CATEGORY_LABELS[file.category] || file.category}
                </Badge>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7 shrink-0"
              onClick={() => handleDownloadFile(file)}
            >
              <Download className="h-3.5 w-3.5" />
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
