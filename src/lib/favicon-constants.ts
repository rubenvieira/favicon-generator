import type { SizeConfig, CustomizationSettings, TextSettings, BackgroundSettings } from './favicon-types';

export const ALL_SIZES: SizeConfig[] = [
  { width: 16, height: 16, filename: 'favicon-16x16.png', category: 'favicon', label: 'Favicon 16x16', required: true },
  { width: 32, height: 32, filename: 'favicon-32x32.png', category: 'favicon', label: 'Favicon 32x32', required: true },
  { width: 48, height: 48, filename: 'favicon-48x48.png', category: 'favicon', label: 'Favicon 48x48', required: true },
  { width: 96, height: 96, filename: 'favicon-96x96.png', category: 'favicon', label: 'Favicon 96x96', required: false },
  { width: 128, height: 128, filename: 'favicon-128x128.png', category: 'favicon', label: 'Favicon 128x128', required: false },
  { width: 256, height: 256, filename: 'favicon-256x256.png', category: 'favicon', label: 'Favicon 256x256', required: false },
  { width: 180, height: 180, filename: 'apple-touch-icon.png', category: 'apple', label: 'Apple Touch Icon', required: true },
  { width: 192, height: 192, filename: 'android-chrome-192x192.png', category: 'android', label: 'Android Chrome 192', required: true },
  { width: 512, height: 512, filename: 'android-chrome-512x512.png', category: 'android', label: 'Android Chrome 512', required: true },
  { width: 70, height: 70, filename: 'mstile-70x70.png', category: 'mstile', label: 'MS Tile 70x70', required: false },
  { width: 144, height: 144, filename: 'mstile-144x144.png', category: 'mstile', label: 'MS Tile 144x144', required: true },
  { width: 150, height: 150, filename: 'mstile-150x150.png', category: 'mstile', label: 'MS Tile 150x150', required: false },
  { width: 310, height: 310, filename: 'mstile-310x310.png', category: 'mstile', label: 'MS Tile 310x310', required: false },
  { width: 310, height: 150, filename: 'mstile-310x150.png', category: 'mstile', label: 'MS Tile Wide', required: false },
];

export const ICO_SIZES = [16, 32, 48];

export const DEFAULT_BACKGROUND: BackgroundSettings = {
  type: 'solid',
  color: '#ffffff',
  gradient: {
    stops: [
      { color: '#3b82f6', position: 0 },
      { color: '#8b5cf6', position: 100 },
    ],
    angle: 135,
  },
};

export const DEFAULT_CUSTOMIZATION: CustomizationSettings = {
  backgroundColor: '#ffffff',
  backgroundEnabled: false,
  background: DEFAULT_BACKGROUND,
  padding: 0,
  borderRadius: 0,
  shadow: { enabled: false, color: '#00000040', blur: 4, offsetX: 0, offsetY: 2 },
};

export const GRADIENT_PRESETS = [
  { label: 'Ocean', stops: [{ color: '#667eea', position: 0 }, { color: '#764ba2', position: 100 }], angle: 135 },
  { label: 'Sunset', stops: [{ color: '#f093fb', position: 0 }, { color: '#f5576c', position: 100 }], angle: 135 },
  { label: 'Forest', stops: [{ color: '#11998e', position: 0 }, { color: '#38ef7d', position: 100 }], angle: 135 },
  { label: 'Fire', stops: [{ color: '#f12711', position: 0 }, { color: '#f5af19', position: 100 }], angle: 135 },
  { label: 'Sky', stops: [{ color: '#a1c4fd', position: 0 }, { color: '#c2e9fb', position: 100 }], angle: 135 },
  { label: 'Night', stops: [{ color: '#0f0c29', position: 0 }, { color: '#302b63', position: 50 }, { color: '#24243e', position: 100 }], angle: 135 },
];

export const DEFAULT_TEXT_SETTINGS: TextSettings = {
  text: 'A',
  fontFamily: 'Inter, system-ui, sans-serif',
  fontWeight: 700,
  textColor: '#1e293b',
};

export const AVAILABLE_FONTS = [
  { label: 'Inter (Sans)', value: 'Inter, system-ui, sans-serif' },
  { label: 'Georgia (Serif)', value: 'Georgia, serif' },
  { label: 'Courier (Mono)', value: '"Courier New", monospace' },
  { label: 'Arial Black', value: '"Arial Black", sans-serif' },
  { label: 'Times New Roman', value: '"Times New Roman", serif' },
  { label: 'Impact', value: 'Impact, sans-serif' },
  { label: 'System UI', value: 'system-ui, sans-serif' },
];

export const FONT_WEIGHTS = [
  { label: 'Regular', value: 400 },
  { label: 'Medium', value: 500 },
  { label: 'Semi Bold', value: 600 },
  { label: 'Bold', value: 700 },
  { label: 'Extra Bold', value: 800 },
  { label: 'Black', value: 900 },
];

export const DEFAULT_SELECTED_SIZES = ALL_SIZES
  .filter(s => s.required)
  .map(s => s.filename);

export const SIZE_CATEGORIES = [
  { key: 'favicon', label: 'Standard Favicons' },
  { key: 'apple', label: 'Apple' },
  { key: 'android', label: 'Android / PWA' },
  { key: 'mstile', label: 'Microsoft Tiles' },
] as const;
