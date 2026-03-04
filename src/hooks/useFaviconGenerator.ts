import { useCallback } from 'react';
import type { FaviconInput, CustomizationSettings, GenerationResult } from '@/lib/favicon-types';
import { generateAllFiles } from '@/lib/favicon-generator';
import {
  generateManifestJson,
  generateBrowserconfigXml,
  generateHtmlSnippet,
  getSelectedSizeConfigs,
  getThemeColor,
} from '@/lib/favicon-utils';

type GenerateDispatch = React.Dispatch<
  | { type: 'GENERATION_START' }
  | { type: 'GENERATION_SUCCESS'; result: GenerationResult }
  | { type: 'GENERATION_ERROR'; error: string }
>;

export function useFaviconGenerator(dispatch: GenerateDispatch) {
  const generate = useCallback(async (
    input: FaviconInput,
    customization: CustomizationSettings,
    selectedSizeFilenames: string[],
    siteName: string
  ) => {
    dispatch({ type: 'GENERATION_START' });

    try {
      const sizeConfigs = getSelectedSizeConfigs(selectedSizeFilenames);
      const files = await generateAllFiles(input, customization, sizeConfigs);
      const themeColor = getThemeColor(customization);

      const manifestJson = generateManifestJson(files, siteName, themeColor);
      const browserconfigXml = generateBrowserconfigXml(files, themeColor);
      const htmlSnippet = generateHtmlSnippet(files, themeColor, siteName);

      const result: GenerationResult = {
        files,
        manifestJson,
        browserconfigXml,
        htmlSnippet,
      };

      dispatch({ type: 'GENERATION_SUCCESS', result });
      return result;
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Failed to generate favicons.';
      dispatch({ type: 'GENERATION_ERROR', error: message });
      throw err;
    }
  }, [dispatch]);

  return { generate };
}
