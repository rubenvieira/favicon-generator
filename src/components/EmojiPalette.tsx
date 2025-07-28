import React from 'react';
import { Button } from '@/components/ui/button';

interface EmojiPaletteProps {
  onSelectEmoji: (emoji: string) => void;
}

const EMOJI_PALETTE = [
  '✨', '🚀', '❤️', '🎉', '💡', '✅', '🔥', '⭐', '👋', '⚙️',
  '💻', '🌍', '🎨', '🎵', '🍔', '🍕', '🥑', '🤖', '🦄', '🐧',
  '💡', '🧠', '💬', '👀', '💧', '🌱', '⚡️', '🔑', '🔒', '🔔',
];

const EmojiPalette: React.FC<EmojiPaletteProps> = ({ onSelectEmoji }) => {
  return (
    <div className="mt-4">
      <h3 className="text-md font-medium mb-3 text-center text-muted-foreground">Or pick one from the palette</h3>
      <div className="grid grid-cols-6 sm:grid-cols-8 md:grid-cols-10 gap-2 justify-center">
        {EMOJI_PALETTE.map((emoji) => (
          <Button
            key={emoji}
            variant="outline"
            className="text-2xl p-2 aspect-square h-auto w-auto transition-transform hover:scale-110"
            onClick={() => onSelectEmoji(emoji)}
          >
            {emoji}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default EmojiPalette;