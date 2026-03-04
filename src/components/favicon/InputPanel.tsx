import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Image, Smile, Type, FileCode } from 'lucide-react';
import ImageInput from './inputs/ImageInput';
import EmojiInput from './inputs/EmojiInput';
import TextInput from './inputs/TextInput';
import SvgInput from './inputs/SvgInput';
import type { FaviconInput, InputMode, TextSettings, ImageFit } from '@/lib/favicon-types';

interface InputPanelProps {
  input: FaviconInput;
  onModeChange: (mode: InputMode) => void;
  onImageSelect: (file: File, dataUrl: string) => void;
  onImageClear: () => void;
  onImageFitChange: (fit: ImageFit) => void;
  onEmojiChange: (emoji: string) => void;
  onTextChange: (settings: Partial<TextSettings>) => void;
  onSvgChange: (content: string | null, dataUrl: string | null) => void;
}

export default function InputPanel({
  input,
  onModeChange,
  onImageSelect,
  onImageClear,
  onImageFitChange,
  onEmojiChange,
  onTextChange,
  onSvgChange,
}: InputPanelProps) {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Source</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs value={input.mode} onValueChange={(v) => onModeChange(v as InputMode)}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="image" className="text-xs sm:text-sm">
              <Image className="h-3.5 w-3.5 mr-1.5 hidden sm:inline" />
              Image
            </TabsTrigger>
            <TabsTrigger value="emoji" className="text-xs sm:text-sm">
              <Smile className="h-3.5 w-3.5 mr-1.5 hidden sm:inline" />
              Emoji
            </TabsTrigger>
            <TabsTrigger value="text" className="text-xs sm:text-sm">
              <Type className="h-3.5 w-3.5 mr-1.5 hidden sm:inline" />
              Text
            </TabsTrigger>
            <TabsTrigger value="svg" className="text-xs sm:text-sm">
              <FileCode className="h-3.5 w-3.5 mr-1.5 hidden sm:inline" />
              SVG
            </TabsTrigger>
          </TabsList>

          <TabsContent value="image" className="mt-4">
            <ImageInput
              imagePreview={input.imageDataUrl}
              imageFit={input.imageFit}
              onImageSelect={onImageSelect}
              onClear={onImageClear}
              onFitChange={onImageFitChange}
            />
          </TabsContent>

          <TabsContent value="emoji" className="mt-4">
            <EmojiInput emoji={input.emoji} onEmojiChange={onEmojiChange} />
          </TabsContent>

          <TabsContent value="text" className="mt-4">
            <TextInput settings={input.text} onChange={onTextChange} />
          </TabsContent>

          <TabsContent value="svg" className="mt-4">
            <SvgInput
              svgContent={input.svgContent}
              svgDataUrl={input.svgDataUrl}
              onSvgChange={onSvgChange}
            />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
