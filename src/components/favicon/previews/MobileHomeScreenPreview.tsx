interface MobileHomeScreenPreviewProps {
  faviconUrl: string | null;
}

export default function MobileHomeScreenPreview({ faviconUrl }: MobileHomeScreenPreviewProps) {
  const placeholder = !faviconUrl;

  const otherApps = [
    { emoji: '📱', label: 'Phone' },
    { emoji: '💬', label: 'Messages' },
    { emoji: '📷', label: 'Camera' },
    { emoji: '🎵', label: 'Music' },
    { emoji: '⚙️', label: 'Settings' },
  ];

  return (
    <div className="space-y-3">
      <p className="text-xs text-muted-foreground">Mobile Home Screen</p>
      <div className="rounded-2xl border overflow-hidden bg-muted/20 p-4 max-w-[220px] mx-auto">
        <div className="grid grid-cols-3 gap-3 justify-items-center">
          {/* User's app icon */}
          <div className="flex flex-col items-center gap-1">
            <div className="w-12 h-12 rounded-xl overflow-hidden bg-muted/40 flex items-center justify-center border shadow-sm">
              {placeholder ? (
                <div className="w-full h-full bg-muted-foreground/10" />
              ) : (
                <img src={faviconUrl} alt="favicon" className="w-full h-full object-cover" />
              )}
            </div>
            <span className="text-[9px] text-foreground truncate w-14 text-center">My App</span>
          </div>

          {otherApps.map((app) => (
            <div key={app.label} className="flex flex-col items-center gap-1 opacity-40">
              <div className="w-12 h-12 rounded-xl bg-muted/60 flex items-center justify-center border">
                <span className="text-xl">{app.emoji}</span>
              </div>
              <span className="text-[9px] text-muted-foreground truncate w-14 text-center">
                {app.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
