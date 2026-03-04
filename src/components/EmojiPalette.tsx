import React, { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { EMOJI_DATA } from '@/lib/emoji-data';
import { ScrollArea } from '@/components/ui/scroll-area';

interface EmojiPaletteProps {
  onSelectEmoji: (emoji: string) => void;
}

const CATEGORIES = [
  { key: 'all', label: 'Popular', icon: '⭐' },
  { key: 'Smileys & Emotion', label: 'Smileys', icon: '😀' },
  { key: 'People & Body', label: 'People', icon: '👋' },
  { key: 'Animals & Nature', label: 'Nature', icon: '🌿' },
  { key: 'Food & Drink', label: 'Food', icon: '🍕' },
  { key: 'Travel & Places', label: 'Travel', icon: '🌍' },
  { key: 'Activities', label: 'Fun', icon: '⚽' },
  { key: 'Objects', label: 'Objects', icon: '💡' },
  { key: 'Symbols', label: 'Symbols', icon: '❤️' },
  { key: 'Flags', label: 'Flags', icon: '🏁' },
];

const POPULAR_EMOJIS = ['✨', '🚀', '❤️', '🎉', '💡', '✅', '🔥', '⭐', '👋', '⚙️', '💻', '🌍', '🎨', '🎵', '🍔', '🍕', '🥑', '🤖', '🦄', '🐧', '🧠', '💬', '👀', '💧', '🌱', '⚡', '🔑', '🔒', '🔔'];

const EmojiPalette: React.FC<EmojiPaletteProps> = ({ onSelectEmoji }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredEmojis = useMemo(() => {
    if (searchTerm) {
      const lower = searchTerm.toLowerCase();
      return EMOJI_DATA.filter(emoji =>
        emoji.description.includes(lower) ||
        emoji.aliases.some(alias => alias.includes(lower)) ||
        emoji.tags.some(tag => tag.includes(lower))
      );
    }

    if (selectedCategory === 'all') {
      return EMOJI_DATA.filter(e => POPULAR_EMOJIS.includes(e.emoji));
    }

    return EMOJI_DATA.filter(e => e.category === selectedCategory);
  }, [searchTerm, selectedCategory]);

  return (
    <div className="space-y-3">
      <Input
        type="text"
        placeholder="Search emojis..."
        value={searchTerm}
        onChange={(e) => {
          setSearchTerm(e.target.value);
          if (e.target.value) setSelectedCategory('all');
        }}
        className="h-9"
      />

      {!searchTerm && (
        <ScrollArea className="w-full">
          <div className="flex gap-1 pb-1">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.key}
                onClick={() => setSelectedCategory(cat.key)}
                className={`shrink-0 px-2 py-1 rounded-md text-xs transition-colors ${
                  selectedCategory === cat.key
                    ? 'bg-primary text-primary-foreground'
                    : 'hover:bg-muted text-muted-foreground'
                }`}
                title={cat.label}
              >
                <span className="mr-0.5">{cat.icon}</span>
                <span className="hidden sm:inline">{cat.label}</span>
              </button>
            ))}
          </div>
        </ScrollArea>
      )}

      <ScrollArea className="h-48 w-full">
        <div className="grid grid-cols-6 sm:grid-cols-8 md:grid-cols-10 gap-1">
          {filteredEmojis.map((emoji) => (
            <Button
              key={emoji.emoji + emoji.description}
              variant="ghost"
              className="text-xl p-1 aspect-square h-auto w-auto transition-transform hover:scale-110 hover:bg-muted"
              onClick={() => onSelectEmoji(emoji.emoji)}
              title={emoji.description}
            >
              {emoji.emoji}
            </Button>
          ))}
          {filteredEmojis.length === 0 && (
            <p className="col-span-full text-center text-sm text-muted-foreground py-4">
              No emojis found
            </p>
          )}
        </div>
      </ScrollArea>
    </div>
  );
};

export default EmojiPalette;
