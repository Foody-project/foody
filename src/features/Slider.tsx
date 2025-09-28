"use client";

import { useEffect, useState } from "react";
import { cn } from "@/utils/utils";
import { Slider } from "@/components/ui/slider";
import { Rating, RatingButton } from "@/components/ui/shadcn-io/rating";

type SliderStackProps = React.ComponentProps<typeof Slider> & {
  etoiles?: boolean;
  onLevelChange?: (value: number) => void;
  value?: number[]; // contrôlé
};

export function SliderStack({
  className,
  etoiles = false,
  onLevelChange,
  value,
  ...props
}: SliderStackProps) {
  const maxValue = etoiles ? 5 : 3;
  const defaultLevel = 1;
  const [internalState, setInternalState] = useState<number[]>([defaultLevel]);

  useEffect(() => {
    if (value) {
      setInternalState(value);
    }
  }, [value]);

  const handleChange = (val: number[]) => {
    setInternalState(val);
    onLevelChange?.(val[0]);
  };

  const displayValue = value ?? internalState;
  const level = displayValue[0] ?? defaultLevel;

  return (
    <div className="w-full flex items-center gap-3">
      <Slider
        value={displayValue}
        onValueChange={handleChange}
        min={1}
        max={maxValue}
        step={1}
        className={cn("w-[60%]", className)}
        {...props}
      />
      <div className="ml-4">
        {etoiles ? (
          <Rating defaultValue={level} readOnly>
            {Array.from({ length: 5 }).map((_, index) => (
              <RatingButton
                key={index}
                className={cn(
                  index < level
                    ? "text-[var(--text-orange)] stroke-[var(--text-orange)] fill-transparent"
                    : "text-muted-foreground"
                )}
              />
            ))}
          </Rating>
        ) : (
          <div className="text-sm font-medium text-orange-500">
            {["€", "€€", "€€€"][level - 1] ?? "€"}
          </div>
        )}
      </div>
    </div>
  );
}
