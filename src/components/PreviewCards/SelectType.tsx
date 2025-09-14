"use client";

import * as React from "react";

type SelectTypeProps = {
  onSelect?: (value: string) => void;
};

export function SelectType({ onSelect }: SelectTypeProps) {
  const options = [
    { icon: "🍔", text: "Food" },
    { icon: "🍹", text: "Drinks" },
    { icon: "🎯", text: "Activities" },
  ];

  const [selected, setSelected] = React.useState<string | null>(null);

  const handleClick = (icon: string) => {
    setSelected(icon);
    if (onSelect) onSelect(icon);
  };

  return (
    <div className="flex flex-col sm:flex-row gap-10 justify-center pb-12">
      {options.map((opt) => (
        <div
          key={opt.icon}
          onClick={() => handleClick(opt.icon)}
          className={`w-30 h-30 flex flex-col items-center justify-center gap-1 rounded-[50%] shadow-md hover:shadow-lg transition cursor-pointer 
            ${
              selected === opt.icon
                ? "bg-[var(--text-orange-secondary)] text-white"
                : "bg-white text-black"
            }`}
        >
          <span className="text-3xl">{opt.icon}</span>
          <span className="text-[0.9rem]">{opt.text}</span>
        </div>
      ))}
    </div>
  );
}
