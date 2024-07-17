"use client";

import EmojiPicker, { Theme } from "emoji-picker-react";
import { useTheme } from "next-themes";

import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from "@/components/ui/popover";
import { Smile } from "lucide-react";

interface IconPickerProps {
    onChange: (icon: string) => void;


};

export const IconPicker = ({onChange}:IconPickerProps) => {
  const { resolvedTheme } = useTheme();
  const currentTheme = (resolvedTheme || "light") as keyof typeof themeMap

  const themeMap = {
    "dark": Theme.DARK,
    "light": Theme.LIGHT
  };

  const theme = themeMap[currentTheme];

  return (
    <Popover>
      <PopoverTrigger >
        <Smile className="text-yellow-500"/>
      </PopoverTrigger>
      <PopoverContent className="p-0 w-full border-none shadow-none">
        <EmojiPicker
        className="z-[99999]"
          height={350}
          theme={theme}
          onEmojiClick={(data) => onChange(data.emoji)}
        />
      </PopoverContent>
    </Popover>
  );
};