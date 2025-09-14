"use client";

import { Export, Pencil, Heart, Warning } from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function ButtonTips() {
  const [saved, setSaved] = useState(false);

  const toggleSaved = () => setSaved(!saved);

  return (
    <div className="flex gap-3">
      <Button variant="link" className="font-[400]">
        <Warning size={32} color="grey" />
      </Button>
      <Button variant="link" className="font-[400]">
        <Export size={32} /> Share
      </Button>
      <Button variant="link" className="font-[400]">
        <Pencil size={32} /> Review
      </Button>
      <Button
        variant="outline"
        onClick={toggleSaved}
        className="hover:bg-red-200 flex items-center gap-2 font-[600] border-[var(--text-orange)]"
      >
        <Heart
          size={64}
          weight={saved ? "fill" : "regular"}
          color={saved ? "red" : "currentColor"}
        />
        Save
      </Button>
    </div>
  );
}
