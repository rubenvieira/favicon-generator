import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import type { CustomizationSettings } from '@/lib/favicon-types';

interface ShadowControlProps {
  shadow: CustomizationSettings['shadow'];
  onChange: (shadow: Partial<CustomizationSettings['shadow']>) => void;
}

const SHADOW_PRESETS = [
  { label: 'Subtle', blur: 4, offsetX: 0, offsetY: 1, color: '#00000020' },
  { label: 'Medium', blur: 8, offsetX: 0, offsetY: 3, color: '#00000040' },
  { label: 'Strong', blur: 16, offsetX: 0, offsetY: 6, color: '#00000060' },
];

export default function ShadowControl({ shadow, onChange }: ShadowControlProps) {
  const applyPreset = (preset: typeof SHADOW_PRESETS[0]) => {
    onChange({
      enabled: true,
      blur: preset.blur,
      offsetX: preset.offsetX,
      offsetY: preset.offsetY,
      color: preset.color,
    });
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <Label className="text-sm">Shadow</Label>
        <Switch
          checked={shadow.enabled}
          onCheckedChange={(enabled) => onChange({ enabled })}
        />
      </div>

      {/* Presets */}
      <div className="flex gap-2">
        {SHADOW_PRESETS.map((preset) => (
          <button
            key={preset.label}
            onClick={() => applyPreset(preset)}
            className={cn(
              'flex-1 flex flex-col items-center gap-1.5 py-2 rounded-lg border transition-colors',
              shadow.enabled &&
                shadow.blur === preset.blur &&
                shadow.offsetY === preset.offsetY &&
                shadow.color === preset.color
                ? 'border-primary bg-primary/5'
                : 'border-transparent bg-muted/30 hover:bg-muted/50'
            )}
          >
            <div
              className="w-6 h-6 rounded bg-foreground/80"
              style={{
                boxShadow: `${preset.offsetX}px ${preset.offsetY}px ${preset.blur}px ${preset.color}`,
              }}
            />
            <span className="text-[10px] text-muted-foreground">{preset.label}</span>
          </button>
        ))}
      </div>

      {shadow.enabled && (
        <div className="space-y-3 pl-1">
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground">Blur</span>
              <span className="text-xs text-muted-foreground font-mono">{shadow.blur}</span>
            </div>
            <Slider
              value={[shadow.blur]}
              onValueChange={([v]) => onChange({ blur: v })}
              min={0}
              max={20}
              step={1}
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">Offset X</span>
                <span className="text-xs text-muted-foreground font-mono">{shadow.offsetX}</span>
              </div>
              <Slider
                value={[shadow.offsetX]}
                onValueChange={([v]) => onChange({ offsetX: v })}
                min={-10}
                max={10}
                step={1}
              />
            </div>
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">Offset Y</span>
                <span className="text-xs text-muted-foreground font-mono">{shadow.offsetY}</span>
              </div>
              <Slider
                value={[shadow.offsetY]}
                onValueChange={([v]) => onChange({ offsetY: v })}
                min={-10}
                max={10}
                step={1}
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground">Color</span>
            <input
              type="color"
              value={shadow.color.slice(0, 7)}
              onChange={(e) => onChange({ color: e.target.value + '66' })}
              className="w-7 h-7 rounded cursor-pointer border-0 p-0"
            />
          </div>
        </div>
      )}
    </div>
  );
}
