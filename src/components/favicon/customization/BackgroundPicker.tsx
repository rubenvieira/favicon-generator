import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

interface BackgroundPickerProps {
  enabled: boolean;
  color: string;
  onEnabledChange: (enabled: boolean) => void;
  onColorChange: (color: string) => void;
}

const PRESET_COLORS = [
  '#ffffff', '#000000', '#1e293b', '#ef4444',
  '#f97316', '#eab308', '#22c55e', '#3b82f6',
  '#8b5cf6', '#ec4899', '#06b6d4', '#64748b',
];

export default function BackgroundPicker({
  enabled,
  color,
  onEnabledChange,
  onColorChange,
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
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <input
              type="color"
              value={color}
              onChange={(e) => onColorChange(e.target.value)}
              className="w-9 h-9 rounded cursor-pointer border-0 p-0"
            />
            <Input
              value={color}
              onChange={(e) => onColorChange(e.target.value)}
              className="font-mono text-sm flex-1"
              placeholder="#ffffff"
            />
          </div>
          <div className="flex flex-wrap gap-1.5">
            {PRESET_COLORS.map((c) => (
              <button
                key={c}
                onClick={() => onColorChange(c)}
                className="w-6 h-6 rounded-full border border-border hover:scale-110 transition-transform"
                style={{ backgroundColor: c }}
                title={c}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
