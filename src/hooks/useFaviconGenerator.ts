import { useCallback } from 'react';
import type { FaviconInput, CustomizationSettings, GenerationResult } from '@/lib/favicon-types';
import { generateAllFiles } from '@/lib/favicon-generator';
import {
  generateManifestJson,
  generateBrowserconfigXml,
  generateHtmlSnippet,
  getSelectedSizeConfigs,
} from '@/lib/favicon-utils';

export function useFaviconGenerator(
  dispatch: React.Dispatch<any>
) {
  const generate = useCallback(async (
    input: FaviconInput,
    customization: CustomizationSettings,
    selectedSizeFilenames: string[]
  ) => {
    dispatch({ type: 'GENERATION_START' });

    try {
      const sizeConfigs = getSelectedSizeConfigs(selectedSizeFilenames);
      const files = await generateAllFiles(input, customization, sizeConfigs);

      const manifestJson = generateManifestJson(files);
      const browserconfigXml = generateBrowserconfigXml(files);
      const htmlSnippet = generateHtmlSnippet(files);

      const result: GenerationResult = {
        files,
        manifestJson,
        browserconfigXml,
        htmlSnippet,
      };

      dispatch({ type: 'GENERATION_SUCCESS', result });
      return result;
    } catch (err: any) {
      const message = err?.message || 'Failed to generate favicons.';
      dispatch({ type: 'GENERATION_ERROR', error: message });
      throw err;
    }
  }, [dispatch]);

  return { generate };
}
