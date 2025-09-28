"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Dropdown } from "@/features/Dropdown";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Sparkles, SlidersHorizontal } from "lucide-react";
import { SliderStack } from "@/features/Slider";
import { Place } from "@/types";
import Toast from "@/features/Toasts/Toast";

type DropdownItem = {
  label: string;
  defaultChecked?: boolean;
  disabled?: boolean;
};

type Filters = {
  districts: string[];
  cuisines: string[];
  price: number;
  stars: number;
};

export function FiltersModal({
  places,
  onApply,
  initialFilters,
}: {
  places: Place[];
  onApply: (filters: Filters) => void;
  initialFilters: Filters;
}) {
  const [selectedDistricts, setSelectedDistricts] = useState<string[]>([]);
  const [selectedCuisines, setSelectedCuisines] = useState<string[]>([]);
  const [priceLevel, setPriceLevel] = useState<number>(1);
  const [starLevel, setStarLevel] = useState<number>(1);

  useEffect(() => {
    setSelectedDistricts(initialFilters.districts);
    setSelectedCuisines(initialFilters.cuisines);
    setPriceLevel(initialFilters.price);
    setStarLevel(initialFilters.stars);
  }, [initialFilters]);

  const districts: DropdownItem[] = Array.from(
    new Set(places.map((place) => place.district).filter(Boolean))
  ).map((district) => ({
    label: district,
    defaultChecked: initialFilters.districts.includes(district),
  }));

  const items: DropdownItem[] = Array.from(
    new Set(
      places
        .map((place) =>
          place.flag && place.cuisine
            ? `${place.flag} | ${place.cuisine}`
            : undefined
        )
        .filter((v): v is string => typeof v === "string")
    )
  ).map((label) => ({
    label,
    defaultChecked: initialFilters.cuisines.includes(label),
  }));

  const [applied, setApplied] = useState(false);

  return (
    <>
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="ghost">
            <SlidersHorizontal size={12} color="var(--text-basic)" />
          </Button>
        </PopoverTrigger>

        <PopoverContent
          side="bottom"
          align="end"
          className="w-[25rem] rounded-md shadow-md shadow-[rgba(0,0,0,0.2)] bg-[#FCF6E7]"
        >
          <div className="grid gap-4">
            <div className="space-y-1">
              <div className="bg-[var(--text-orange-third)] p-3 rounded-lg inline-flex shadow-[0_0_10px_2px_rgba(150,112,98,0.8)]">
                <Sparkles size={25} className="text-white" />
              </div>
              <h4 className="leading-none font-medium text-2xl pt-2">
                Find your best spot !
              </h4>
            </div>

            <div className="flex flex-col items-left gap-2 w-full">
              <div className="flex flex-row gap-5">
                <div className="flex flex-col">
                  <p className="text-muted-foreground text-sm font-thin pb-1">
                    Where ?
                  </p>
                  <div>
                    <Dropdown
                      items={districts}
                      value={selectedDistricts}
                      onChange={setSelectedDistricts}
                    />
                  </div>
                </div>
                <div className="flex flex-col">
                  <p className="text-muted-foreground text-sm font-thin pb-1">
                    Which cuisine ?
                  </p>
                  <div>
                    <Dropdown
                      items={items}
                      value={selectedCuisines}
                      onChange={setSelectedCuisines}
                    />
                  </div>
                </div>
              </div>
              <div className="flex flex-col w-55">
                <p className="text-muted-foreground text-sm font-thin pb-1">
                  Price ?
                </p>
                <SliderStack
                  value={[priceLevel]}
                  onLevelChange={setPriceLevel}
                />
              </div>
              <div className="flex flex-col w-55">
                <p className="text-muted-foreground text-sm font-thin pb-1">
                  Stars ?
                </p>
                <SliderStack
                  etoiles
                  value={[starLevel]}
                  onLevelChange={setStarLevel}
                />
              </div>
            </div>

            <div className="flex flex-row justify-between">
              <Button
                size="sm"
                variant="ghost"
                className="text-muted-foreground text-[0.8rem] font-light"
                onClick={() => {
                  setSelectedDistricts([]);
                  setSelectedCuisines([]);
                  setPriceLevel(0);
                  setStarLevel(0);
                  onApply({
                    districts: [],
                    cuisines: [],
                    price: 0,
                    stars: 0,
                  });
                }}
              >
                Reset filters
              </Button>

              <Button
                size="sm"
                className="w-20 h-8 text-white text-[0.9rem] font-light cursor-pointer flex items-center justify-center"
                style={{
                  background: "var(--background-button)",
                  boxShadow: "4px 4px 6px rgba(0,0,0,0.1)",
                }}
                onClick={() => {
                  onApply({
                    districts: selectedDistricts,
                    cuisines: selectedCuisines,
                    price: priceLevel,
                    stars: starLevel,
                  });
                  setApplied(true);
                  setTimeout(() => setApplied(false), 3000);
                }}
              >
                <span className="flex items-center gap-1">Apply</span>
              </Button>
            </div>
          </div>
        </PopoverContent>
      </Popover>
      {applied && <Toast title="Filters applied !" type="Success" />}
    </>
  );
}
