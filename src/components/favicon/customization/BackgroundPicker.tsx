import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { cn } from '@/lib/utils';
import type { BackgroundSettings, BackgroundType } from '@/lib/favicon-types';
import { GRADIENT_PRESETS } from '@/lib/favicon-constants';

interface BackgroundPickerProps {
  enabled: boolean;
  background: BackgroundSettings;
  onEnabledChange: (enabled: boolean) => void;
  onBackgroundChange: (bg: Partial<BackgroundSettings>) => void;
}

const PRESET_COLORS = [
  '#ffffff', '#000000', '#1e293b', '#ef4444',
  '#f97316', '#eab308', '#22c55e', '#3b82f6',
  '#8b5cf6', '#ec4899', '#06b6d4', '#64748b',
];

const BG_TYPES: { value: BackgroundType; label: string }[] = [
  { value: 'solid', label: 'Solid' },
  { value: 'linear-gradient', label: 'Linear' },
  { value: 'radial-gradient', label: 'Radial' },
];

function getGradientCss(bg: BackgroundSettings): string {
  const stops = bg.gradient.stops.map(s => `${s.color} ${s.position}%`).join(', ');
  if (bg.type === 'linear-gradient') {
    return `linear-gradient(${bg.gradient.angle}deg, ${stops})`;
  }
  return `radial-gradient(circle, ${stops})`;
}

export default function BackgroundPicker({
  enabled,
  background,
  onEnabledChange,
  onBackgroundChange,
}: BackgroundPickerProps) {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <Label className="text-sm">Background</Label>
        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground">
            {enabled ? 'Custom' : 'Transparent'}
          </span>
          <Switch checked={enabled} onCheckedChange={onEnabledChange} />
        </div>
      </div>

      {enabled && (
        <div className="space-y-3">
          {/* Background type selector */}
          <div className="flex gap-1">
            {BG_TYPES.map((t) => (
              <button
                key={t.value}
                onClick={() => onBackgroundChange({ type: t.value })}
                className={cn(
                  'flex-1 px-2 py-1 rounded-md text-xs transition-colors border',
                  background.type === t.value
                    ? 'bg-primary text-primary-foreground border-primary'
                    : 'bg-muted/30 hover:bg-muted/60 border-transparent'
                )}
              >
                {t.label}
              </button>
            ))}
          </div>

          {background.type === 'solid' ? (
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={background.color}
                  onChange={(e) => onBackgroundChange({ color: e.target.value })}
                  className="w-9 h-9 rounded cursor-pointer border-0 p-0"
                />
                <Input
                  value={background.color}
                  onChange={(e) => onBackgroundChange({ color: e.target.value })}
                  className="font-mono text-sm flex-1"
                  placeholder="#ffffff"
                />
              </div>
              <div className="flex flex-wrap gap-1.5">
                {PRESET_COLORS.map((c) => (
                  <button
                    key={c}
                    onClick={() => onBackgroundChange({ color: c })}
                    className="w-6 h-6 rounded-full border border-border hover:scale-110 transition-transform"
                    style={{ backgroundColor: c }}
                    title={c}
                  />
                ))}
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              {/* Gradient stop colors */}
              <div className="space-y-2">
                {background.gradient.stops.map((stop, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <input
                      type="color"
                      value={stop.color}
                      onChange={(e) => {
                        const newStops = [...background.gradient.stops];
                        newStops[i] = { ...newStops[i], color: e.target.value };
                        onBackgroundChange({ gradient: { ...background.gradient, stops: newStops } });
                      }}
                      className="w-7 h-7 rounded cursor-pointer border-0 p-0"
                    />
                    <Input
                      value={stop.color}
                      onChange={(e) => {
                        const newStops = [...background.gradient.stops];
                        newStops[i] = { ...newStops[i], color: e.target.value };
                        onBackgroundChange({ gradient: { ...background.gradient, stops: newStops } });
                      }}
                      className="font-mono text-xs flex-1"
                    />
                    <span className="text-[10px] text-muted-foreground w-8 text-right">{stop.position}%</span>
                  </div>
                ))}
              </div>

              {/* Angle control for linear gradient */}
              {background.type === 'linear-gradient' && (
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">Angle</span>
                    <span className="text-xs text-muted-foreground font-mono">{background.gradient.angle}°</span>
                  </div>
                  <Slider
                    value={[background.gradient.angle]}
                    onValueChange={([v]) => onBackgroundChange({ gradient: { ...background.gradient, angle: v } })}
                    min={0}
                    max={360}
                    step={5}
                  />
                </div>
              )}

              {/* Gradient presets */}
              <div>
                <span className="text-xs text-muted-foreground">Presets</span>
                <div className="flex flex-wrap gap-1.5 mt-1.5">
                  {GRADIENT_PRESETS.map((preset) => (
                    <button
                      key={preset.label}
                      onClick={() => onBackgroundChange({
                        gradient: { stops: preset.stops, angle: preset.angle },
                      })}
                      className="w-8 h-8 rounded-lg border border-border hover:scale-110 transition-transform"
                      style={{
                        background: getGradientCss({
                          type: background.type,
                          color: '',
                          gradient: { stops: preset.stops, angle: preset.angle },
                        }),
                      }}
                      title={preset.label}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
