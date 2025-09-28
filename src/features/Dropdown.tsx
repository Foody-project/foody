"use client";

import * as React from "react";
import { DropdownMenuCheckboxItemProps } from "@radix-ui/react-dropdown-menu";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type Checked = DropdownMenuCheckboxItemProps["checked"];

export interface DropdownItem {
  label: string;
  defaultChecked?: Checked;
  disabled?: boolean;
}

export interface DropdownProps {
  items: DropdownItem[];
  title?: string;
  defaultValue?: string;
  value?: string[]; // ✅ ajout pour contrôle externe
  onChange?: (selected: string[]) => void;
}

export function Dropdown({
  items,
  defaultValue,
  value,
  onChange,
}: DropdownProps) {
  const [checkedStates, setCheckedStates] = React.useState<Checked[]>(
    items.map((item) => item.defaultChecked ?? item.label === defaultValue)
  );

  // ✅ synchronise avec prop `value` si elle change
  React.useEffect(() => {
    if (value) {
      const updated = items.map((item) => value.includes(item.label));
      setCheckedStates(updated);
    }
  }, [value, items]);

  const handleCheckedChange = (index: number, checked: Checked) => {
    const updated = [...checkedStates];
    updated[index] = checked;
    setCheckedStates(updated);

    const selected = items
      .map((item, i) => (updated[i] ? item.label : null))
      .filter(Boolean) as string[];

    onChange?.(selected);
  };

  const selectedLabels = items
    .map((item, index) => (checkedStates[index] ? item.label : null))
    .filter(Boolean);

  const displayLabel =
    selectedLabels.length === 0
      ? defaultValue || "Default"
      : selectedLabels.length === 1
      ? selectedLabels[0]
      : `${selectedLabels[0]} +${selectedLabels.length - 1}`;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="font-thin border bg-[var(--text-orange-secondary)]/50 hover:!bg-[var(--text-orange-secondary)]/80 text-[0.85rem] h-8"
        >
          {displayLabel}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-full" side="bottom" align="start">
        {items.map((item, index) => (
          <DropdownMenuCheckboxItem
            key={item.label}
            checked={checkedStates[index]}
            onCheckedChange={(value) => handleCheckedChange(index, value)}
            disabled={item.disabled}
            className="data-[state=checked]:text-[var(--text-orange)]"
          >
            {item.label}
          </DropdownMenuCheckboxItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
