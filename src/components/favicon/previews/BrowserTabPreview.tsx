interface BrowserTabPreviewProps {
  faviconUrl: string | null;
  siteName?: string;
}

export default function BrowserTabPreview({ faviconUrl, siteName }: BrowserTabPreviewProps) {
  const placeholder = !faviconUrl;
  const title = siteName || 'My Website';

  return (
    <div className="space-y-3">
      <p className="text-xs text-muted-foreground">Browser Tab</p>
      <div className="rounded-xl border overflow-hidden shadow-lg bg-[#202124] dark:bg-[#292a2d]">
        {/* Title bar with traffic lights */}
        <div className="flex items-center px-3 py-2">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
            <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
            <div className="w-3 h-3 rounded-full bg-[#28c840]" />
          </div>
        </div>

        {/* Tab bar */}
        <div className="flex items-end px-2 gap-0.5">
          {/* Active tab */}
          <div className="flex items-center gap-2 px-3 py-1.5 bg-[#35363a] dark:bg-[#35363a] rounded-t-lg max-w-[200px] min-w-[120px]">
            {placeholder ? (
              <div className="w-4 h-4 rounded bg-white/10 shrink-0" />
            ) : (
              <img src={faviconUrl} alt="favicon" className="w-4 h-4 shrink-0" />
            )}
            <span className="text-[11px] truncate text-[#e8eaed]">{title}</span>
            <span className="text-[#9aa0a6] text-xs ml-auto shrink-0 hover:text-white cursor-default">&times;</span>
          </div>
          {/* New tab button */}
          <div className="flex items-center justify-center w-7 h-7 mb-0.5 rounded-full hover:bg-white/5">
            <span className="text-[#9aa0a6] text-sm leading-none">+</span>
          </div>
          <div className="flex-1" />
        </div>

        {/* Address bar area */}
        <div className="px-3 py-2 bg-[#35363a] dark:bg-[#35363a]">
          <div className="flex items-center gap-2 px-3 py-1.5 bg-[#202124] dark:bg-[#202124] rounded-full">
            <svg className="w-3.5 h-3.5 text-[#9aa0a6] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            <span className="text-[11px] text-[#e8eaed]">{siteName ? siteName.toLowerCase().replace(/\s+/g, '') : 'mywebsite'}.com</span>
          </div>
        </div>

        {/* Page content placeholder */}
        <div className="bg-white dark:bg-[#1f1f1f] px-4 py-5">
          <div className="space-y-2">
            <div className="h-2.5 bg-gray-200 dark:bg-gray-700 rounded w-3/4" />
            <div className="h-2 bg-gray-100 dark:bg-gray-800 rounded w-full" />
            <div className="h-2 bg-gray-100 dark:bg-gray-800 rounded w-5/6" />
          </div>
        </div>
      </div>
    </div>
  );
}
