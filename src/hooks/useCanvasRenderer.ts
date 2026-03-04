import { useState, useEffect, useRef, useCallback } from 'react';
import type { FaviconInput, CustomizationSettings } from '@/lib/favicon-types';
import { renderPreviewDataUrl } from '@/lib/favicon-generator';

export function useCanvasRenderer(
  input: FaviconInput,
  customization: CustomizationSettings,
  previewSize: number = 256
) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isRendering, setIsRendering] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const renderIdRef = useRef(0);

  const hasInput =
    (input.mode === 'image' && input.imageDataUrl) ||
    (input.mode === 'emoji' && input.emoji) ||
    (input.mode === 'text' && input.text.text) ||
    (input.mode === 'svg' && input.svgDataUrl);

  const renderPreview = useCallback(async () => {
    if (!hasInput) {
      setPreviewUrl(null);
      return;
    }

    const currentId = ++renderIdRef.current;
    setIsRendering(true);

    try {
      const url = await renderPreviewDataUrl(input, customization, previewSize);
      if (currentId === renderIdRef.current) {
        setPreviewUrl(url);
      }
    } catch {
      if (currentId === renderIdRef.current) {
        setPreviewUrl(null);
      }
    } finally {
      if (currentId === renderIdRef.current) {
        setIsRendering(false);
      }
    }
  }, [input, customization, previewSize, hasInput]);

  useEffect(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    if (!hasInput) {
      setPreviewUrl(null);
      return;
    }

    timerRef.current = setTimeout(() => {
      renderPreview();
    }, 100);

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [renderPreview, hasInput]);

  return { previewUrl, isRendering };
}
