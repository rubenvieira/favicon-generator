interface MobileHomeScreenPreviewProps {
  faviconUrl: string | null;
  siteName?: string;
}

const GRID_APPS = [
  { bg: 'bg-green-500', letter: 'P', label: 'Phone' },
  { bg: 'bg-blue-500', letter: 'S', label: 'Safari' },
  { bg: 'bg-purple-500', letter: 'M', label: 'Mail' },
  { bg: 'bg-orange-500', letter: 'N', label: 'Notes' },
  { bg: 'bg-pink-500', letter: 'M', label: 'Music' },
];

const DOCK_APPS = [
  { bg: 'bg-green-500', letter: 'P' },
  { bg: 'bg-blue-500', letter: 'S' },
  { bg: 'bg-gradient-to-br from-green-400 to-blue-500', letter: 'M' },
  { bg: 'bg-red-500', letter: 'Y' },
];

export default function MobileHomeScreenPreview({ faviconUrl, siteName }: MobileHomeScreenPreviewProps) {
  const placeholder = !faviconUrl;
  const appLabel = siteName || 'My App';

  return (
    <div className="space-y-3">
      <p className="text-xs text-muted-foreground">Mobile Home Screen</p>

      {/* Phone frame */}
      <div className="mx-auto w-[200px]">
        <div className="relative rounded-[28px] border-[3px] border-[#1a1a1a] dark:border-[#333] bg-gradient-to-b from-indigo-950 via-purple-950 to-slate-900 overflow-hidden shadow-xl">
          {/* Notch / Dynamic Island */}
          <div className="flex justify-center pt-2 pb-1">
            <div className="w-16 h-5 bg-black rounded-full" />
          </div>

          {/* Status bar */}
          <div className="flex items-center justify-between px-5 py-1 text-white/70">
            <span className="text-[9px] font-medium">9:41</span>
            <div className="flex items-center gap-1">
              {/* Signal bars */}
              <svg className="w-3 h-3" viewBox="0 0 16 16" fill="currentColor">
                <rect x="1" y="10" width="2.5" height="4" rx="0.5" />
                <rect x="5" y="7" width="2.5" height="7" rx="0.5" />
                <rect x="9" y="4" width="2.5" height="10" rx="0.5" />
                <rect x="13" y="1" width="2.5" height="13" rx="0.5" opacity="0.3" />
              </svg>
              {/* WiFi */}
              <svg className="w-3 h-3" viewBox="0 0 16 16" fill="currentColor">
                <path d="M8 12.5a1.5 1.5 0 100 3 1.5 1.5 0 000-3z" />
                <path d="M4.5 10.5a5 5 0 017 0" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                <path d="M2 8a8 8 0 0112 0" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
              {/* Battery */}
              <svg className="w-4 h-3" viewBox="0 0 20 12" fill="currentColor">
                <rect x="0.5" y="0.5" width="16" height="11" rx="2" fill="none" stroke="currentColor" strokeWidth="1" />
                <rect x="17" y="3" width="2" height="5" rx="1" opacity="0.4" />
                <rect x="2" y="2" width="10" height="7" rx="1" />
              </svg>
            </div>
          </div>

          {/* App grid */}
          <div className="px-4 pt-4 pb-2">
            <div className="grid grid-cols-3 gap-x-4 gap-y-3 justify-items-center">
              {/* User's app icon — first position */}
              <div className="flex flex-col items-center gap-1">
                <div className="w-11 h-11 rounded-[11px] overflow-hidden bg-white/10 flex items-center justify-center shadow-md">
                  {placeholder ? (
                    <div className="w-full h-full bg-white/5" />
                  ) : (
                    <img src={faviconUrl} alt="favicon" className="w-full h-full object-cover" />
                  )}
                </div>
                <span className="text-[8px] text-white/80 truncate w-12 text-center">{appLabel}</span>
              </div>

              {GRID_APPS.map((app) => (
                <div key={app.label} className="flex flex-col items-center gap-1">
                  <div className={`w-11 h-11 rounded-[11px] ${app.bg} flex items-center justify-center shadow-md opacity-50`}>
                    <span className="text-white text-sm font-semibold">{app.letter}</span>
                  </div>
                  <span className="text-[8px] text-white/40 truncate w-12 text-center">
                    {app.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Page dots */}
          <div className="flex justify-center gap-1 py-2">
            <div className="w-1.5 h-1.5 rounded-full bg-white/70" />
            <div className="w-1.5 h-1.5 rounded-full bg-white/20" />
            <div className="w-1.5 h-1.5 rounded-full bg-white/20" />
          </div>

          {/* Dock */}
          <div className="mx-3 mb-3 px-3 py-2 bg-white/10 backdrop-blur-md rounded-2xl">
            <div className="flex justify-around">
              {DOCK_APPS.map((app, i) => (
                <div key={i} className={`w-9 h-9 rounded-[9px] ${app.bg} flex items-center justify-center opacity-40 shadow-sm`}>
                  <span className="text-white text-[10px] font-semibold">{app.letter}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Home indicator */}
          <div className="flex justify-center pb-2">
            <div className="w-24 h-1 rounded-full bg-white/30" />
          </div>
        </div>
      </div>
    </div>
  );
}
