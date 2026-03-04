import { useReducer, useCallback } from 'react';
import type {
  FaviconAppState,
  FaviconInput,
  CustomizationSettings,
  TextSettings,
  InputMode,
  GenerationResult,
  ImageFit,
  BackgroundSettings,
} from '@/lib/favicon-types';
import { DEFAULT_CUSTOMIZATION, DEFAULT_TEXT_SETTINGS, DEFAULT_SELECTED_SIZES } from '@/lib/favicon-constants';

type Action =
  | { type: 'SET_INPUT_MODE'; mode: InputMode }
  | { type: 'SET_IMAGE'; file: File | null; dataUrl: string | null }
  | { type: 'SET_IMAGE_FIT'; fit: ImageFit }
  | { type: 'SET_EMOJI'; emoji: string }
  | { type: 'SET_TEXT_SETTINGS'; settings: Partial<TextSettings> }
  | { type: 'SET_SVG'; content: string | null; dataUrl: string | null }
  | { type: 'SET_CUSTOMIZATION'; settings: Partial<CustomizationSettings> }
  | { type: 'SET_SHADOW'; shadow: Partial<CustomizationSettings['shadow']> }
  | { type: 'SET_BACKGROUND'; background: Partial<BackgroundSettings> }
  | { type: 'SET_SELECTED_SIZES'; sizes: string[] }
  | { type: 'SET_SITE_NAME'; name: string }
  | { type: 'GENERATION_START' }
  | { type: 'GENERATION_SUCCESS'; result: GenerationResult }
  | { type: 'GENERATION_ERROR'; error: string }
  | { type: 'RESET_GENERATION' }
  | { type: 'RESET_ALL' };

const initialInput: FaviconInput = {
  mode: 'image',
  imageFile: null,
  imageDataUrl: null,
  imageFit: 'fill',
  emoji: '',
  text: DEFAULT_TEXT_SETTINGS,
  svgContent: null,
  svgDataUrl: null,
};

const initialState: FaviconAppState = {
  input: initialInput,
  customization: DEFAULT_CUSTOMIZATION,
  generation: {
    isGenerating: false,
    result: null,
    error: null,
  },
  selectedSizes: DEFAULT_SELECTED_SIZES,
  siteName: '',
};

function reducer(state: FaviconAppState, action: Action): FaviconAppState {
  switch (action.type) {
    case 'SET_INPUT_MODE':
      return {
        ...state,
        input: { ...state.input, mode: action.mode },
        generation: { ...state.generation, result: null, error: null },
      };

    case 'SET_IMAGE':
      return {
        ...state,
        input: {
          ...state.input,
          imageFile: action.file,
          imageDataUrl: action.dataUrl,
        },
        generation: { ...state.generation, result: null, error: null },
      };

    case 'SET_IMAGE_FIT':
      return {
        ...state,
        input: { ...state.input, imageFit: action.fit },
        generation: { ...state.generation, result: null, error: null },
      };

    case 'SET_EMOJI':
      return {
        ...state,
        input: { ...state.input, emoji: action.emoji },
        generation: { ...state.generation, result: null, error: null },
      };

    case 'SET_TEXT_SETTINGS':
      return {
        ...state,
        input: {
          ...state.input,
          text: { ...state.input.text, ...action.settings },
        },
        generation: { ...state.generation, result: null, error: null },
      };

    case 'SET_SVG':
      return {
        ...state,
        input: {
          ...state.input,
          svgContent: action.content,
          svgDataUrl: action.dataUrl,
        },
        generation: { ...state.generation, result: null, error: null },
      };

    case 'SET_CUSTOMIZATION':
      return {
        ...state,
        customization: { ...state.customization, ...action.settings },
        generation: { ...state.generation, result: null, error: null },
      };

    case 'SET_SHADOW':
      return {
        ...state,
        customization: {
          ...state.customization,
          shadow: { ...state.customization.shadow, ...action.shadow },
        },
        generation: { ...state.generation, result: null, error: null },
      };

    case 'SET_BACKGROUND':
      return {
        ...state,
        customization: {
          ...state.customization,
          background: { ...state.customization.background, ...action.background },
        },
        generation: { ...state.generation, result: null, error: null },
      };

    case 'SET_SELECTED_SIZES':
      return {
        ...state,
        selectedSizes: action.sizes,
        generation: { ...state.generation, result: null, error: null },
      };

    case 'SET_SITE_NAME':
      return {
        ...state,
        siteName: action.name,
        generation: { ...state.generation, result: null, error: null },
      };

    case 'GENERATION_START':
      return {
        ...state,
        generation: { isGenerating: true, result: null, error: null },
      };

    case 'GENERATION_SUCCESS':
      return {
        ...state,
        generation: { isGenerating: false, result: action.result, error: null },
      };

    case 'GENERATION_ERROR':
      return {
        ...state,
        generation: { isGenerating: false, result: null, error: action.error },
      };

    case 'RESET_GENERATION':
      return {
        ...state,
        generation: { isGenerating: false, result: null, error: null },
      };

    case 'RESET_ALL':
      return initialState;

    default:
      return state;
  }
}

export function useFaviconState() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const setInputMode = useCallback((mode: InputMode) => {
    dispatch({ type: 'SET_INPUT_MODE', mode });
  }, []);

  const setImage = useCallback((file: File | null, dataUrl: string | null) => {
    dispatch({ type: 'SET_IMAGE', file, dataUrl });
  }, []);

  const setImageFit = useCallback((fit: ImageFit) => {
    dispatch({ type: 'SET_IMAGE_FIT', fit });
  }, []);

  const setEmoji = useCallback((emoji: string) => {
    dispatch({ type: 'SET_EMOJI', emoji });
  }, []);

  const setTextSettings = useCallback((settings: Partial<TextSettings>) => {
    dispatch({ type: 'SET_TEXT_SETTINGS', settings });
  }, []);

  const setSvg = useCallback((content: string | null, dataUrl: string | null) => {
    dispatch({ type: 'SET_SVG', content, dataUrl });
  }, []);

  const setCustomization = useCallback((settings: Partial<CustomizationSettings>) => {
    dispatch({ type: 'SET_CUSTOMIZATION', settings });
  }, []);

  const setShadow = useCallback((shadow: Partial<CustomizationSettings['shadow']>) => {
    dispatch({ type: 'SET_SHADOW', shadow });
  }, []);

  const setBackground = useCallback((background: Partial<BackgroundSettings>) => {
    dispatch({ type: 'SET_BACKGROUND', background });
  }, []);

  const setSelectedSizes = useCallback((sizes: string[]) => {
    dispatch({ type: 'SET_SELECTED_SIZES', sizes });
  }, []);

  const setSiteName = useCallback((name: string) => {
    dispatch({ type: 'SET_SITE_NAME', name });
  }, []);

  const resetAll = useCallback(() => {
    dispatch({ type: 'RESET_ALL' });
  }, []);

  return {
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
  };
}
