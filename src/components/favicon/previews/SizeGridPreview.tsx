interface SizeGridPreviewProps {
  faviconUrl: string | null;
}

const PREVIEW_SIZES = [
  { size: 16, label: '16px' },
  { size: 32, label: '32px' },
  { size: 48, label: '48px' },
  { size: 64, label: '64px' },
  { size: 128, label: '128px' },
];

export default function SizeGridPreview({ faviconUrl }: SizeGridPreviewProps) {
  return (
    <div className="space-y-3">
      <p className="text-xs text-muted-foreground">Size Preview</p>
      <div className="flex items-end gap-4 flex-wrap justify-center p-4 border rounded-lg bg-muted/20">
        {PREVIEW_SIZES.map(({ size, label }) => (
          <div key={size} className="flex flex-col items-center gap-2">
            <div
              className="flex items-center justify-center bg-background border rounded"
              style={{ width: Math.min(size, 128), height: Math.min(size, 128) }}
            >
              {faviconUrl ? (
                <img
                  src={faviconUrl}
                  alt={`${label} preview`}
                  style={{ width: Math.min(size, 128), height: Math.min(size, 128) }}
                  className="object-contain"
                />
              ) : (
                <div
                  className="bg-muted-foreground/10 rounded"
                  style={{ width: Math.min(size, 128), height: Math.min(size, 128) }}
                />
              )}
            </div>
            <span className="text-[10px] text-muted-foreground font-mono">{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
