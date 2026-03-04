import { useRef } from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useImageDragDrop } from '@/hooks/useImageDragDrop';
import { Upload, X } from 'lucide-react';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import { validateSvg, sanitizeSvg } from '@/lib/favicon-utils';

interface SvgInputProps {
  svgContent: string | null;
  svgDataUrl: string | null;
  onSvgChange: (content: string | null, dataUrl: string | null) => void;
}

function svgToDataUrl(svgString: string): string {
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svgString)}`;
}

export default function SvgInput({ svgContent, svgDataUrl, onSvgChange }: SvgInputProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSvgContent = (content: string) => {
    const result = validateSvg(content);
    if (!result.valid) {
      toast.error(result.error || 'Invalid SVG.');
      return;
    }
    const sanitized = sanitizeSvg(content);
    onSvgChange(sanitized, svgToDataUrl(sanitized));
  };

  const handleFile = (file: File) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const content = reader.result as string;
      const result = validateSvg(content);
      if (!result.valid) {
        toast.error(result.error || 'Invalid SVG file.');
        return;
      }
      const sanitized = sanitizeSvg(content);
      onSvgChange(sanitized, svgToDataUrl(sanitized));
    };
    reader.readAsText(file);
  };

  const { isDragActive, dropZoneProps } = useImageDragDrop({
    accept: ['.svg', 'image/svg+xml'],
    onFile: handleFile,
    onError: (msg) => toast.error(msg),
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  };

  return (
    <div className="space-y-4">
      {svgDataUrl ? (
        <div className="relative border rounded-lg p-4 flex justify-center bg-muted/30">
          <img
            src={svgDataUrl}
            alt="SVG Preview"
            className="max-h-40 object-contain"
          />
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-2 right-2 h-7 w-7"
            onClick={() => {
              onSvgChange(null, null);
              if (fileInputRef.current) fileInputRef.current.value = '';
            }}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      ) : (
        <>
          <div>
            <Label className="text-sm font-medium">Upload SVG File</Label>
            <div
              {...dropZoneProps}
              onClick={() => fileInputRef.current?.click()}
              className={cn(
                'border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors mt-2',
                isDragActive
                  ? 'border-primary bg-primary/5'
                  : 'border-muted-foreground/25 hover:border-primary/50 hover:bg-muted/30'
              )}
            >
              <Upload className="mx-auto h-6 w-6 text-muted-foreground mb-2" />
              <p className="text-sm text-muted-foreground">
                Drag & drop an SVG, or click to browse
              </p>
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="bg-background px-2 text-muted-foreground">or paste SVG code</span>
            </div>
          </div>

          <div>
            <Textarea
              placeholder='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">...</svg>'
              rows={5}
              className="font-mono text-xs"
              onChange={(e) => {
                const val = e.target.value.trim();
                if (val) handleSvgContent(val);
              }}
            />
          </div>
        </>
      )}

      <Input
        ref={fileInputRef}
        type="file"
        accept=".svg,image/svg+xml"
        onChange={handleInputChange}
        className="hidden"
      />
    </div>
  );
}
