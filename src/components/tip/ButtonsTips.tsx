"use client";

import { Export, Pencil, Heart, Warning } from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";
import { ShareModal } from "./ShareModal";
import { useState } from "react";
import { useAddFavorite } from "@/hooks/places/useSavePlace";
import { useDeleteFavorite } from "@/hooks/places/useDeleteSavingPlace";
import { Place } from "@/types";

export default function ButtonTips({ place }: { place: Place }) {
  const { mutate: addFavorite } = useAddFavorite();
  const { mutate: deleteFavorite } = useDeleteFavorite();

  const [saved, setSaved] = useState(false);

  const handleClick = () => {
    if (saved === false) {
      addFavorite({ userId: 1, placeId: place.id });
      setSaved(!saved);
    } else {
      deleteFavorite({ userId: 1, placeId: place.id });
      setSaved(!saved);
    }
  };

  return (
    <div className="flex gap-3">
      <Button variant="link">
        <Warning size={32} color="var(--icon-basic)" />
      </Button>
      <ShareModal />
      <Button
        variant="link"
        style={{ color: "var(--text-basic)", fontWeight: 400 }}
      >
        <Pencil size={32} color="var(--icon-basic)" /> Review
      </Button>
      <Button
        variant="outline"
        onClick={handleClick}
        className="hover:bg-red-200 flex items-center gap-2 font-[400] border-[var(--text-orange)]"
      >
        <Heart
          size={64}
          weight={saved ? "fill" : "regular"}
          color={saved ? "red" : "var(--icon-basic)"}
        />
        Save
      </Button>
    </div>
  );
}
