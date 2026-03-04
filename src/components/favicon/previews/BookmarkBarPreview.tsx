interface BookmarkBarPreviewProps {
  faviconUrl: string | null;
}

export default function BookmarkBarPreview({ faviconUrl }: BookmarkBarPreviewProps) {
  const placeholder = !faviconUrl;

  const otherBookmarks = [
    { icon: '🔍', label: 'Google' },
    { icon: '📧', label: 'Mail' },
    { icon: '📰', label: 'News' },
  ];

  return (
    <div className="space-y-3">
      <p className="text-xs text-muted-foreground">Bookmark Bar</p>
      <div className="rounded-lg border overflow-hidden bg-background">
        <div className="flex items-center gap-1 px-2 py-1.5 overflow-x-auto">
          {/* User's bookmark */}
          <div className="flex items-center gap-1.5 px-2 py-1 rounded hover:bg-muted/60 shrink-0">
            {placeholder ? (
              <div className="w-4 h-4 rounded bg-muted-foreground/20" />
            ) : (
              <img src={faviconUrl} alt="favicon" className="w-4 h-4" />
            )}
            <span className="text-xs">My Site</span>
          </div>

          <div className="w-px h-4 bg-border mx-0.5" />

          {otherBookmarks.map((bm) => (
            <div
              key={bm.label}
              className="flex items-center gap-1.5 px-2 py-1 rounded hover:bg-muted/60 shrink-0 opacity-50"
            >
              <span className="text-sm">{bm.icon}</span>
              <span className="text-xs">{bm.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
