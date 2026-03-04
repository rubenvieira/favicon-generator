import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Sun, Moon, RotateCcw } from 'lucide-react';
import InputPanel from '@/components/favicon/InputPanel';
import CustomizationPanel from '@/components/favicon/CustomizationPanel';
import PreviewPanel from '@/components/favicon/PreviewPanel';
import OutputPanel from '@/components/favicon/OutputPanel';
import { useFaviconState } from '@/hooks/useFaviconState';
import { useCanvasRenderer } from '@/hooks/useCanvasRenderer';
import { useFaviconGenerator } from '@/hooks/useFaviconGenerator';

const DARK_MODE_KEY = 'favicon-gen-dark-mode';

const Index = () => {
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(DARK_MODE_KEY);
      if (saved !== null) return saved === 'true';
      return document.documentElement.classList.contains('dark');
    }
    return false;
  });

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
    localStorage.setItem(DARK_MODE_KEY, String(darkMode));
  }, [darkMode]);

  const {
    state,
    dispatch,
    setInputMode,
    setImage,
    setImageFit,
    setEmoji,
    setTextSettings,
    setSvg,
    setCustomization,
    setShadow,
    setBackground,
    setSelectedSizes,
    setSiteName,
    resetAll,
  } = useFaviconState();

  const { previewUrl } = useCanvasRenderer(state.input, state.customization);
  const { generate } = useFaviconGenerator(dispatch);

  const hasInput =
    (state.input.mode === 'image' && !!state.input.imageDataUrl) ||
    (state.input.mode === 'emoji' && !!state.input.emoji) ||
    (state.input.mode === 'text' && !!state.input.text.text) ||
    (state.input.mode === 'svg' && !!state.input.svgDataUrl);

  const handleGenerate = async () => {
    try {
      await generate(state.input, state.customization, state.selectedSizes, state.siteName);
      toast.success('Favicons generated successfully!');
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Failed to generate favicons.';
      toast.error(message);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="container mx-auto px-4 py-6 md:py-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex-1" />
          <div className="text-center flex-1">
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
              Favicon Generator
            </h1>
            <p className="text-muted-foreground mt-2">
              Create professional favicons from images, emojis, text, or SVGs.
            </p>
          </div>
          <div className="flex-1 flex justify-end gap-1">
            <Button
              variant="ghost"
              size="icon"
              onClick={resetAll}
              className="h-9 w-9"
              title="Reset all settings"
            >
              <RotateCcw className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setDarkMode(!darkMode)}
              className="h-9 w-9"
            >
              {darkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </Button>
          </div>
        </div>

        {/* Main Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-6xl mx-auto">
          {/* Left Column: Input + Customization */}
          <div className="space-y-6">
            <InputPanel
              input={state.input}
              onModeChange={setInputMode}
              onImageSelect={(file, dataUrl) => setImage(file, dataUrl)}
              onImageClear={() => setImage(null, null)}
              onImageFitChange={setImageFit}
              onEmojiChange={setEmoji}
              onTextChange={setTextSettings}
              onSvgChange={setSvg}
            />

            <CustomizationPanel
              customization={state.customization}
              onCustomizationChange={setCustomization}
              onShadowChange={setShadow}
              onBackgroundChange={setBackground}
            />
          </div>

          {/* Right Column: Preview + Output */}
          <div className="space-y-6 lg:sticky lg:top-6 lg:self-start">
            <PreviewPanel previewUrl={previewUrl} />

            <OutputPanel
              result={state.generation.result}
              isGenerating={state.generation.isGenerating}
              hasInput={hasInput}
              selectedSizes={state.selectedSizes}
              onSelectedSizesChange={setSelectedSizes}
              onGenerate={handleGenerate}
              siteName={state.siteName}
              onSiteNameChange={setSiteName}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
