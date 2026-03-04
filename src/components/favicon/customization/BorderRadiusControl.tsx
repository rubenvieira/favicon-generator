import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

interface BorderRadiusControlProps {
  value: number;
  onChange: (value: number) => void;
}

const QUICK_SETS = [
  { label: 'None', value: 0, radius: 'rounded-none' },
  { label: 'Rounded', value: 15, radius: 'rounded-md' },
  { label: 'Circle', value: 50, radius: 'rounded-full' },
];

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
      <div className="flex justify-between gap-2">
        {QUICK_SETS.map((qs) => (
          <button
            key={qs.label}
            onClick={() => onChange(qs.value)}
            className={cn(
              'flex-1 flex flex-col items-center gap-1.5 py-2 rounded-lg border transition-colors',
              value === qs.value
                ? 'border-primary bg-primary/5'
                : 'border-transparent bg-muted/30 hover:bg-muted/50'
            )}
          >
            <div className={cn('w-6 h-6 border-2 border-foreground/30 bg-foreground/10', qs.radius)} />
            <span className="text-[10px] text-muted-foreground">{qs.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
