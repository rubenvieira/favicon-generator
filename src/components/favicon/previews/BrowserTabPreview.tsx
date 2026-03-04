interface BrowserTabPreviewProps {
  faviconUrl: string | null;
}

export default function BrowserTabPreview({ faviconUrl }: BrowserTabPreviewProps) {
  const placeholder = !faviconUrl;

  return (
    <div className="space-y-3">
      <p className="text-xs text-muted-foreground">Browser Tab</p>
      <div className="rounded-lg border overflow-hidden bg-muted/30">
        {/* Tab bar */}
        <div className="flex items-end px-2 pt-2 bg-muted/60">
          <div className="flex items-center gap-2 px-3 py-1.5 bg-background rounded-t-lg border border-b-0 max-w-[200px]">
            {placeholder ? (
              <div className="w-4 h-4 rounded bg-muted-foreground/20" />
            ) : (
              <img src={faviconUrl} alt="favicon" className="w-4 h-4" />
            )}
            <span className="text-xs truncate text-foreground">My Website</span>
            <span className="text-muted-foreground/40 text-xs ml-auto">×</span>
          </div>
          <div className="flex-1" />
        </div>

        {/* Address bar */}
        <div className="px-3 py-2 bg-background border-t">
          <div className="flex items-center gap-2 px-3 py-1 bg-muted/40 rounded-md">
            <svg className="w-3 h-3 text-muted-foreground/60" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            <span className="text-[11px] text-muted-foreground">mywebsite.com</span>
          </div>
        </div>
      </div>
    </div>
  );
}
