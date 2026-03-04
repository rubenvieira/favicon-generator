import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { ALL_SIZES, SIZE_CATEGORIES, DEFAULT_SELECTED_SIZES } from '@/lib/favicon-constants';

interface SizeSelectorProps {
  selectedSizes: string[];
  onChange: (sizes: string[]) => void;
}

export default function SizeSelector({ selectedSizes, onChange }: SizeSelectorProps) {
  const allFilenames = ALL_SIZES.map(s => s.filename);

  const toggleSize = (filename: string) => {
    if (selectedSizes.includes(filename)) {
      onChange(selectedSizes.filter(s => s !== filename));
    } else {
      onChange([...selectedSizes, filename]);
    }
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <Label className="text-sm font-medium">Output Sizes</Label>
        <div className="flex gap-1.5">
          <Button
            variant="ghost"
            size="sm"
            className="h-6 text-xs px-2"
            onClick={() => onChange(allFilenames)}
          >
            All
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="h-6 text-xs px-2"
            onClick={() => onChange(DEFAULT_SELECTED_SIZES)}
          >
            Required
          </Button>
        </div>
      </div>

      {SIZE_CATEGORIES.map(cat => {
        const sizes = ALL_SIZES.filter(s => s.category === cat.key);
        if (sizes.length === 0) return null;

        return (
          <div key={cat.key}>
            <p className="text-xs text-muted-foreground mb-1.5">{cat.label}</p>
            <div className="grid grid-cols-2 gap-1">
              {sizes.map(s => (
                <label
                  key={s.filename}
                  className="flex items-center gap-2 px-2 py-1 rounded hover:bg-muted/40 cursor-pointer"
                >
                  <Checkbox
                    checked={selectedSizes.includes(s.filename)}
                    onCheckedChange={() => toggleSize(s.filename)}
                  />
                  <span className="text-xs">
                    {s.width}x{s.height}
                  </span>
                  {s.required && (
                    <span className="text-[9px] text-muted-foreground">*</span>
                  )}
                </label>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
