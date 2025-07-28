import React, { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { EMOJI_DATA } from '@/lib/emoji-data';
import { ScrollArea } from '@/components/ui/scroll-area';

interface EmojiPaletteProps {
  onSelectEmoji: (emoji: string) => void;
}

const EmojiPalette: React.FC<EmojiPaletteProps> = ({ onSelectEmoji }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredEmojis = useMemo(() => {
    if (!searchTerm) {
      // Return a curated subset of popular emojis when search is empty
      return EMOJI_DATA.filter(e => ['✨', '🚀', '❤️', '🎉', '💡', '✅', '🔥', '⭐', '👋', '⚙️', '💻', '🌍', '🎨', '🎵', '🍔', '🍕', '🥑', '🤖', '🦄', '🐧', '💡', '🧠', '💬', '👀', '💧', '🌱', '⚡️', '🔑', '🔒', '🔔'].includes(e.emoji));
    }
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    return EMOJI_DATA.filter(emoji =>
      emoji.description.includes(lowerCaseSearchTerm) ||
      emoji.aliases.some(alias => alias.includes(lowerCaseSearchTerm)) ||
      emoji.tags.some(tag => tag.includes(lowerCaseSearchTerm))
    );
  }, [searchTerm]);

  return (
    <div className="mt-4">
      <Input
        type="text"
        placeholder="Search for an emoji (e.g., 'happy', 'car')"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mb-4"
      />
      <ScrollArea className="h-60 w-full pr-4">
        <div className="grid grid-cols-6 sm:grid-cols-8 md:grid-cols-10 gap-2 justify-center">
          {filteredEmojis.map((emoji) => (
            <Button
              key={emoji.emoji + emoji.description}
              variant="outline"
              className="text-2xl p-2 aspect-square h-auto w-auto transition-transform hover:scale-110"
              onClick={() => onSelectEmoji(emoji.emoji)}
              title={emoji.description}
            >
              {emoji.emoji}
            </Button>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

export default EmojiPalette;