export type InputMode = 'image' | 'emoji' | 'text' | 'svg';

export type ImageFit = 'fill' | 'contain' | 'cover';

export type BackgroundType = 'solid' | 'linear-gradient' | 'radial-gradient';

export interface GradientStop {
  color: string;
  position: number;
}

export interface BackgroundSettings {
  type: BackgroundType;
  color: string;
  gradient: {
    stops: GradientStop[];
    angle: number;
  };
}

export interface CustomizationSettings {
  backgroundColor: string;
  backgroundEnabled: boolean;
  background: BackgroundSettings;
  padding: number;
  borderRadius: number;
  shadow: {
    enabled: boolean;
    color: string;
    blur: number;
    offsetX: number;
    offsetY: number;
  };
}

export interface TextSettings {
  text: string;
  fontFamily: string;
  fontWeight: number;
  textColor: string;
}

export interface FaviconInput {
  mode: InputMode;
  imageFile: File | null;
  imageDataUrl: string | null;
  imageFit: ImageFit;
  emoji: string;
  text: TextSettings;
  svgContent: string | null;
  svgDataUrl: string | null;
}

export interface GeneratedFile {
  filename: string;
  size: string;
  dataUrl: string;
  blob: Blob;
  category: 'favicon' | 'apple' | 'android' | 'mstile' | 'ico' | 'svg';
}

export interface SizeConfig {
  width: number;
  height: number;
  filename: string;
  category: GeneratedFile['category'];
  label: string;
  required: boolean;
}

export interface GenerationResult {
  files: GeneratedFile[];
  manifestJson: string;
  browserconfigXml: string;
  htmlSnippet: string;
}

export interface FaviconAppState {
  input: FaviconInput;
  customization: CustomizationSettings;
  generation: {
    isGenerating: boolean;
    result: GenerationResult | null;
    error: string | null;
  };
  selectedSizes: string[];
  siteName: string;
}
