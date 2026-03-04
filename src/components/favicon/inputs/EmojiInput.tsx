import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import EmojiPalette from '@/components/EmojiPalette';

interface EmojiInputProps {
  emoji: string;
  onEmojiChange: (emoji: string) => void;
}

export default function EmojiInput({ emoji, onEmojiChange }: EmojiInputProps) {
  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="emoji-input" className="text-sm font-medium">
          Enter or select an emoji
        </Label>
        <Input
          id="emoji-input"
          type="text"
          value={emoji}
          onChange={(e) => onEmojiChange(e.target.value)}
          placeholder="e.g., ✨"
          className="text-3xl h-14 text-center mt-2"
        />
      </div>

      <EmojiPalette onSelectEmoji={onEmojiChange} />

      {emoji && (
        <div className="flex items-center justify-center p-4 border rounded-lg bg-muted/30">
          <span className="text-6xl">{emoji}</span>
        </div>
      )}
    </div>
  );
}
