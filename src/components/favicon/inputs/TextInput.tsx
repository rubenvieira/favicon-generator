import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import type { TextSettings } from '@/lib/favicon-types';
import { AVAILABLE_FONTS, FONT_WEIGHTS } from '@/lib/favicon-constants';

interface TextInputProps {
  settings: TextSettings;
  onChange: (settings: Partial<TextSettings>) => void;
}

export default function TextInput({ settings, onChange }: TextInputProps) {
  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="text-input" className="text-sm font-medium">
          Enter text (1-3 characters)
        </Label>
        <Input
          id="text-input"
          type="text"
          value={settings.text}
          onChange={(e) => onChange({ text: e.target.value.slice(0, 3) })}
          placeholder="A"
          maxLength={3}
          className="text-3xl h-14 text-center mt-2 font-bold"
          style={{
            fontFamily: settings.fontFamily,
            fontWeight: settings.fontWeight,
            color: settings.textColor,
          }}
        />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <Label className="text-xs text-muted-foreground">Font Family</Label>
          <Select
            value={settings.fontFamily}
            onValueChange={(v) => onChange({ fontFamily: v })}
          >
            <SelectTrigger className="mt-1">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {AVAILABLE_FONTS.map((font) => (
                <SelectItem key={font.value} value={font.value}>
                  <span style={{ fontFamily: font.value }}>{font.label}</span>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label className="text-xs text-muted-foreground">Font Weight</Label>
          <Select
            value={String(settings.fontWeight)}
            onValueChange={(v) => onChange({ fontWeight: Number(v) })}
          >
            <SelectTrigger className="mt-1">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {FONT_WEIGHTS.map((w) => (
                <SelectItem key={w.value} value={String(w.value)}>
                  {w.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div>
        <Label className="text-xs text-muted-foreground">Text Color</Label>
        <div className="flex items-center gap-2 mt-1">
          <input
            type="color"
            value={settings.textColor}
            onChange={(e) => onChange({ textColor: e.target.value })}
            className="w-10 h-10 rounded cursor-pointer border-0 p-0"
          />
          <Input
            value={settings.textColor}
            onChange={(e) => onChange({ textColor: e.target.value })}
            placeholder="#1e293b"
            className="font-mono text-sm flex-1"
          />
        </div>
      </div>

      {settings.text && (
        <div className="flex items-center justify-center p-6 border rounded-lg bg-muted/30">
          <span
            className="text-6xl"
            style={{
              fontFamily: settings.fontFamily,
              fontWeight: settings.fontWeight,
              color: settings.textColor,
            }}
          >
            {settings.text}
          </span>
        </div>
      )}
    </div>
  );
}
