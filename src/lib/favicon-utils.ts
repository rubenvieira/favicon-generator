import JSZip from 'jszip';
import type { GeneratedFile, SizeConfig } from './favicon-types';
import { ALL_SIZES } from './favicon-constants';

export function generateManifestJson(files: GeneratedFile[]): string {
  const androidFiles = files.filter(f => f.category === 'android');
  const icons = androidFiles.map(f => ({
    src: `/${f.filename}`,
    sizes: f.size,
    type: 'image/png',
  }));

  return JSON.stringify(
    {
      name: '',
      short_name: '',
      icons,
      theme_color: '#ffffff',
      background_color: '#ffffff',
      display: 'standalone',
    },
    null,
    2
  );
}

export function generateBrowserconfigXml(files: GeneratedFile[]): string {
  const tiles = files.filter(f => f.category === 'mstile');

  const tileEntries = tiles.map(f => {
    const config = ALL_SIZES.find(s => s.filename === f.filename);
    if (!config) return '';
    if (config.width === 310 && config.height === 150) {
      return `        <wide310x150logo src="/${f.filename}"/>`;
    }
    return `        <square${config.width}x${config.height}logo src="/${f.filename}"/>`;
  }).filter(Boolean);

  return `<?xml version="1.0" encoding="utf-8"?>
<browserconfig>
    <msapplication>
        <tile>
${tileEntries.join('\n')}
            <TileColor>#ffffff</TileColor>
        </tile>
    </msapplication>
</browserconfig>`;
}

export function generateHtmlSnippet(files: GeneratedFile[]): string {
  const lines: string[] = [];

  const hasIco = files.some(f => f.filename === 'favicon.ico');
  if (hasIco) {
    lines.push('<link rel="icon" type="image/x-icon" href="/favicon.ico">');
  }

  const pngFavicons = files.filter(f => f.category === 'favicon' && f.filename.endsWith('.png'));
  for (const f of pngFavicons) {
    lines.push(`<link rel="icon" type="image/png" sizes="${f.size}" href="/${f.filename}">`);
  }

  const apple = files.find(f => f.category === 'apple');
  if (apple) {
    lines.push(`<link rel="apple-touch-icon" sizes="${apple.size}" href="/${apple.filename}">`);
  }

  const hasAndroid = files.some(f => f.category === 'android');
  if (hasAndroid) {
    lines.push('<link rel="manifest" href="/manifest.json">');
  }

  const hasMsTile = files.some(f => f.category === 'mstile');
  if (hasMsTile) {
    lines.push('<meta name="msapplication-TileColor" content="#ffffff">');
    lines.push('<meta name="msapplication-config" content="/browserconfig.xml">');
  }

  lines.push('<meta name="theme-color" content="#ffffff">');

  return lines.join('\n');
}

export async function createZipDownload(
  files: GeneratedFile[],
  manifestJson: string,
  browserconfigXml: string,
  htmlSnippet: string
): Promise<Blob> {
  const zip = new JSZip();

  for (const file of files) {
    zip.file(file.filename, file.blob);
  }

  zip.file('manifest.json', manifestJson);
  zip.file('browserconfig.xml', browserconfigXml);
  zip.file('installation.html', `<!-- Add these tags to your HTML <head> -->\n${htmlSnippet}\n`);

  return zip.generateAsync({ type: 'blob' });
}

export function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.select();
    const result = document.execCommand('copy');
    document.body.removeChild(textarea);
    return result;
  }
}

export function getSelectedSizeConfigs(selectedFilenames: string[]): SizeConfig[] {
  return ALL_SIZES.filter(s => selectedFilenames.includes(s.filename));
}
