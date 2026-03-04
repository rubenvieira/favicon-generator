interface BookmarkBarPreviewProps {
  faviconUrl: string | null;
  siteName?: string;
}

const OTHER_BOOKMARKS = [
  { letter: 'G', bg: 'bg-blue-500', label: 'Google' },
  { letter: 'Y', bg: 'bg-red-500', label: 'YouTube' },
  { letter: 'G', bg: 'bg-gray-700', label: 'GitHub' },
  { letter: 'W', bg: 'bg-green-600', label: 'Wikipedia' },
];

export default function BookmarkBarPreview({ faviconUrl, siteName }: BookmarkBarPreviewProps) {
  const placeholder = !faviconUrl;
  const title = siteName || 'My Site';

  return (
    <div className="space-y-3">
      <p className="text-xs text-muted-foreground">Bookmark Bar</p>
      <div className="rounded-lg border overflow-hidden bg-[#35363a] dark:bg-[#292a2d] shadow-md">
        <div className="flex items-center gap-0.5 px-2 py-1.5 overflow-x-auto">
          {/* User's bookmark — highlighted */}
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white/10 shrink-0">
            {placeholder ? (
              <div className="w-4 h-4 rounded bg-white/20" />
            ) : (
              <img src={faviconUrl} alt="favicon" className="w-4 h-4 rounded-sm" />
            )}
            <span className="text-[11px] text-[#e8eaed] font-medium">{title}</span>
          </div>

          <div className="w-px h-4 bg-white/10 mx-1" />

          {OTHER_BOOKMARKS.map((bm) => (
            <div
              key={bm.label}
              className="flex items-center gap-1.5 px-2 py-1 rounded-md hover:bg-white/5 shrink-0"
            >
              <div className={`w-4 h-4 rounded-sm ${bm.bg} flex items-center justify-center`}>
                <span className="text-white text-[9px] font-bold">{bm.letter}</span>
              </div>
              <span className="text-[11px] text-[#9aa0a6]">{bm.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
