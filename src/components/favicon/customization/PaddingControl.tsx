import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';

interface PaddingControlProps {
  value: number;
  onChange: (value: number) => void;
}

export default function PaddingControl({ value, onChange }: PaddingControlProps) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <Label className="text-sm">Padding</Label>
        <span className="text-xs text-muted-foreground font-mono">{value}%</span>
      </div>
      <Slider
        value={[value]}
        onValueChange={([v]) => onChange(v)}
        min={0}
        max={40}
        step={1}
      />
    </div>
  );
}
