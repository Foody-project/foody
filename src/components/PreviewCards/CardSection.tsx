"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

import { Button } from "../ui/button";
import { Card } from "./Card";
import { SelectType } from "./SelectType";

import type { Place } from "@/interfaces";

interface CardSectionProps {
  isHomePage: boolean;
  data: Place[];
}

const options = [
  { icon: "🍔", text: "Peckish 😋 ?", route: "restaurants" },
  { icon: "🍹", text: "Thirsty 🤤 ?", route: "bars" },
  { icon: "🎯", text: "Bored 🥱 ?", route: "activities" },
];

export default function CardSection({ data }: CardSectionProps) {
  const [selected, setSelected] = useState(options[0]);
  const router = useRouter();

  const handleSelect = (icon: string) => {
    const choice = options.find((o) => o.icon === icon);
    if (choice) setSelected(choice);
  };

  const handleMoreClick = () => {
    router.push(`/${selected.route}`);
  };

  return (
    <div>
      <div className="text-3xl font-semibold mt-12 flex flex-col text-left justify-between gap-2">
        <SelectType onSelect={handleSelect} />
        <span className="text-[var(--text-orange)] text-left">
          {selected.text}
        </span>
      </div>

      <div className="flex flex-rows justify-between">
        <AnimatePresence mode="wait">
          <motion.div
            key={selected.route}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="flex flex-rows justify-between w-full"
          >
            {data.slice(0, 3).map((place) => (
              <Card key={place.id} id={place.id} />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="flex justify-center mt-10">
        <Button
          size="sm"
          variant="outline"
          className="font-light text-[var(--text-orange)] hover:text-[var(--text-orange)]"
          onClick={handleMoreClick}
        >
          More
        </Button>
      </div>
    </div>
  );
}
