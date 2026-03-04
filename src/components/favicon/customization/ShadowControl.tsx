import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import type { CustomizationSettings } from '@/lib/favicon-types';

interface ShadowControlProps {
  shadow: CustomizationSettings['shadow'];
  onChange: (shadow: Partial<CustomizationSettings['shadow']>) => void;
}

export default function ShadowControl({ shadow, onChange }: ShadowControlProps) {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <Label className="text-sm">Shadow</Label>
        <Switch
          checked={shadow.enabled}
          onCheckedChange={(enabled) => onChange({ enabled })}
        />
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
