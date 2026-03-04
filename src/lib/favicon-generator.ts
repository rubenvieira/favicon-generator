import { Buffer } from 'buffer';
import type { FaviconInput, CustomizationSettings, GeneratedFile, SizeConfig } from './favicon-types';
import { ICO_SIZES } from './favicon-constants';

function roundedRect(
  ctx: CanvasRenderingContext2D,
  x: number, y: number,
  w: number, h: number,
  r: number
) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h - r);
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
}

export async function renderToCanvas(
  canvas: HTMLCanvasElement,
  input: FaviconInput,
  customization: CustomizationSettings,
  width: number,
  height: number
): Promise<void> {
  const ctx = canvas.getContext('2d')!;
  canvas.width = width;
  canvas.height = height;
  ctx.clearRect(0, 0, width, height);

  ctx.save();

  // Apply border radius clipping
  const radiusPx = (customization.borderRadius / 100) * Math.min(width, height);
  if (radiusPx > 0) {
    roundedRect(ctx, 0, 0, width, height, radiusPx);
    ctx.clip();
  }

  // Draw background
  if (customization.backgroundEnabled) {
    ctx.fillStyle = customization.backgroundColor;
    ctx.fillRect(0, 0, width, height);
  }

  // Calculate content area with padding
  const paddingPx = (customization.padding / 100) * Math.min(width, height);
  const contentX = paddingPx;
  const contentY = paddingPx;
  const contentW = width - 2 * paddingPx;
  const contentH = height - 2 * paddingPx;

  if (contentW <= 0 || contentH <= 0) {
    ctx.restore();
    return;
  }

  // Apply shadow
  if (customization.shadow.enabled) {
    ctx.shadowColor = customization.shadow.color;
    ctx.shadowBlur = customization.shadow.blur * (Math.min(width, height) / 64);
    ctx.shadowOffsetX = customization.shadow.offsetX * (Math.min(width, height) / 64);
    ctx.shadowOffsetY = customization.shadow.offsetY * (Math.min(width, height) / 64);
  }

  // Draw content based on input mode
  switch (input.mode) {
    case 'image':
      if (input.imageDataUrl) {
        const img = await loadImage(input.imageDataUrl);
        ctx.drawImage(img, contentX, contentY, contentW, contentH);
      }
      break;

    case 'emoji':
      if (input.emoji) {
        ctx.font = `${contentH * 0.8}px "Apple Color Emoji", "Segoe UI Emoji", "Noto Color Emoji", sans-serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(input.emoji, contentX + contentW / 2, contentY + contentH / 2 + contentH * 0.05);
      }
      break;

    case 'text':
      if (input.text.text) {
        const fontSize = contentH * (input.text.text.length === 1 ? 0.75 : input.text.text.length === 2 ? 0.55 : 0.4);
        ctx.font = `${input.text.fontWeight} ${fontSize}px ${input.text.fontFamily}`;
        ctx.fillStyle = input.text.textColor;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(input.text.text, contentX + contentW / 2, contentY + contentH / 2);
      }
      break;

    case 'svg':
      if (input.svgDataUrl) {
        const img = await loadImage(input.svgDataUrl);
        const scale = Math.min(contentW / img.naturalWidth, contentH / img.naturalHeight);
        const drawW = img.naturalWidth * scale;
        const drawH = img.naturalHeight * scale;
        const drawX = contentX + (contentW - drawW) / 2;
        const drawY = contentY + (contentH - drawH) / 2;
        ctx.drawImage(img, drawX, drawY, drawW, drawH);
      }
      break;
  }

  ctx.restore();
}

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}

function canvasToBlob(canvas: HTMLCanvasElement): Promise<Blob> {
  return new Promise((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (blob) resolve(blob);
      else reject(new Error('Failed to create blob from canvas'));
    }, 'image/png');
  });
}

function canvasToPngBuffer(canvas: HTMLCanvasElement): Buffer {
  const dataUrl = canvas.toDataURL('image/png');
  const base64 = dataUrl.split(',')[1];
  return Buffer.from(base64, 'base64');
}

export async function createIcoFile(pngBuffers: Buffer[]): Promise<Blob> {
  const ICO_HEADER_SIZE = 6;
  const ICO_DIR_ENTRY_SIZE = 16;

  const header = Buffer.alloc(ICO_HEADER_SIZE);
  header.writeUInt16LE(0, 0);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(pngBuffers.length, 4);

  const directoryEntries: Buffer[] = [];
  let offset = ICO_HEADER_SIZE + pngBuffers.length * ICO_DIR_ENTRY_SIZE;

  for (let i = 0; i < pngBuffers.length; i++) {
    const buffer = pngBuffers[i];
    const size = ICO_SIZES[i];

    const entry = Buffer.alloc(ICO_DIR_ENTRY_SIZE);
    entry.writeUInt8(size, 0);
    entry.writeUInt8(size, 1);
    entry.writeUInt8(0, 2);
    entry.writeUInt8(0, 3);
    entry.writeUInt16LE(1, 4);
    entry.writeUInt16LE(32, 6);
    entry.writeUInt32LE(buffer.length, 8);
    entry.writeUInt32LE(offset, 12);
    directoryEntries.push(entry);
    offset += buffer.length;
  }

  const icoBuffer = Buffer.concat([header, ...directoryEntries, ...pngBuffers]);
  return new Blob([icoBuffer], { type: 'image/x-icon' });
}

export async function generateAllFiles(
  input: FaviconInput,
  customization: CustomizationSettings,
  selectedSizes: SizeConfig[]
): Promise<GeneratedFile[]> {
  const files: GeneratedFile[] = [];

  // Generate PNG files for each selected size
  for (const sizeConfig of selectedSizes) {
    const canvas = document.createElement('canvas');
    await renderToCanvas(canvas, input, customization, sizeConfig.width, sizeConfig.height);

    const blob = await canvasToBlob(canvas);
    const dataUrl = canvas.toDataURL('image/png');

    files.push({
      filename: sizeConfig.filename,
      size: `${sizeConfig.width}x${sizeConfig.height}`,
      dataUrl,
      blob,
      category: sizeConfig.category,
    });
  }

  // Generate ICO file
  const icoBuffers: Buffer[] = [];
  for (const size of ICO_SIZES) {
    const canvas = document.createElement('canvas');
    await renderToCanvas(canvas, input, customization, size, size);
    icoBuffers.push(canvasToPngBuffer(canvas));
  }

  const icoBlob = await createIcoFile(icoBuffers);
  files.push({
    filename: 'favicon.ico',
    size: 'multi',
    dataUrl: URL.createObjectURL(icoBlob),
    blob: icoBlob,
    category: 'ico',
  });

  return files;
}

export async function renderPreviewDataUrl(
  input: FaviconInput,
  customization: CustomizationSettings,
  size: number
): Promise<string> {
  const canvas = document.createElement('canvas');
  await renderToCanvas(canvas, input, customization, size, size);
  return canvas.toDataURL('image/png');
}
