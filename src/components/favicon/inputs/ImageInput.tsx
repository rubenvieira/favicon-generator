import { useRef } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useImageDragDrop } from '@/hooks/useImageDragDrop';
import { Upload, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

interface ImageInputProps {
  imagePreview: string | null;
  onImageSelect: (file: File, dataUrl: string) => void;
  onClear: () => void;
}

export default function ImageInput({ imagePreview, onImageSelect, onClear }: ImageInputProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = (file: File) => {
    if (!file.type.startsWith('image/')) {
      toast.error('Please upload a valid image file.');
      return;
    }
    const reader = new FileReader();
    reader.onloadend = () => {
      onImageSelect(file, reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const { isDragActive, dropZoneProps } = useImageDragDrop({
    accept: ['image/*'],
    onFile: handleFile,
    onError: (msg) => toast.error(msg),
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  };

  return (
    <div className="space-y-4">
      <Label className="text-sm font-medium">Upload Image</Label>

      {imagePreview ? (
        <div className="relative border rounded-lg p-4 flex justify-center bg-muted/30">
          <img
            src={imagePreview}
            alt="Selected"
            className="max-h-40 rounded-md object-contain"
          />
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-2 right-2 h-7 w-7"
            onClick={() => {
              onClear();
              if (fileInputRef.current) fileInputRef.current.value = '';
            }}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      ) : (
        <div
          {...dropZoneProps}
          onClick={() => fileInputRef.current?.click()}
          className={cn(
            'border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors',
            isDragActive
              ? 'border-primary bg-primary/5'
              : 'border-muted-foreground/25 hover:border-primary/50 hover:bg-muted/30'
          )}
        >
          <Upload className="mx-auto h-8 w-8 text-muted-foreground mb-3" />
          <p className="text-sm text-muted-foreground">
            Drag & drop an image here, or click to browse
          </p>
          <p className="text-xs text-muted-foreground/60 mt-1">
            PNG, JPG, SVG, WebP supported
          </p>
        </div>
      )}

      <Input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleInputChange}
        className="hidden"
      />
    </div>
  );
}
