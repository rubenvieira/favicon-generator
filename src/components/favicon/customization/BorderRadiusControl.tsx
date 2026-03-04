import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';

interface BorderRadiusControlProps {
  value: number;
  onChange: (value: number) => void;
}

export default function BorderRadiusControl({ value, onChange }: BorderRadiusControlProps) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <Label className="text-sm">Border Radius</Label>
        <span className="text-xs text-muted-foreground font-mono">{value}%</span>
      </div>
      <Slider
        value={[value]}
        onValueChange={([v]) => onChange(v)}
        min={0}
        max={50}
        step={1}
      />
      <div className="flex justify-between">
        <div className="flex items-center gap-1.5">
          <div className="w-4 h-4 border border-muted-foreground/40 rounded-none" />
          <span className="text-[10px] text-muted-foreground">Square</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-4 h-4 border border-muted-foreground/40 rounded" />
          <span className="text-[10px] text-muted-foreground">Rounded</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-4 h-4 border border-muted-foreground/40 rounded-full" />
          <span className="text-[10px] text-muted-foreground">Circle</span>
        </div>
      </div>
    </div>
  );
}
