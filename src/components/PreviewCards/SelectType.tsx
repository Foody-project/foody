"use client";

import * as React from "react";
import { ChevronDown } from "lucide-react";
import { Handshake } from "@phosphor-icons/react";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type SelectTypeProps = {
  onSelect?: (value: string) => void;
};

export function SelectType({ onSelect }: SelectTypeProps) {
  const texts = [
    { icon: "🍔", text: "Peckish 😋", category: "Foods 🍔" },
    { icon: "🍹", text: "Thirsty 🤤", category: "Drinks 🍹" },
    { icon: "🎯", text: "Bored 🥱", category: "Activities 🎯" },
  ];

  const [selectedKey, setSelectedKey] = React.useState(texts[0]);
  const [open, setOpen] = React.useState(false);

  const handleSelect = (texts: {
    icon: string;
    text: string;
    category: string;
  }) => {
    setSelectedKey(texts);
    setOpen(false);
    if (onSelect) onSelect(texts.icon);
  };

  return (
    <div className="flex flex-col items-start justify-between rounded-md px-4 py-3 sm:flex-row sm:items-center">
      <DropdownMenu open={open} onOpenChange={setOpen}>
        <DropdownMenuTrigger asChild>
          <Button
            variant="secondary"
            size="sm"
            style={{
              border: "2px solid var(--background-button-secondary)",
              color: "var(--text-orange)",
            }}
          >
            {selectedKey.icon}
            <ChevronDown />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-[50px]">
          <DropdownMenuGroup>
            {texts.map((opt) => (
              <DropdownMenuItem
                key={opt.icon}
                onSelect={() => handleSelect(opt)}
              >
                {opt.category}
              </DropdownMenuItem>
            ))}
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
