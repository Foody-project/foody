"use client";

import { Heart, Warning } from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";
import { ShareModal } from "./ShareModal";
import { useState, useEffect } from "react";
import { useAddFavoritePlace } from "@/hooks/places/useAddFavoritePlace";
import { useRemoveFavoritePlace } from "@/hooks/places/useRemoveFavoritePlace";
import { useIsPlaceSaved } from "@/hooks/places/useIsSavedPlace";

import { ReportPlaceModal } from "./ReportPlaceModal";

interface ButtonTipsProps {
  userId: number;
  placeId: number;
}

export default function ButtonTips({ userId, placeId }: ButtonTipsProps) {
  const { isSaved, isLoading } = useIsPlaceSaved(userId, placeId);
  const { mutate: addFavorite, isPending: isAdding } = useAddFavoritePlace(
    userId,
    placeId
  );
  const { mutate: removeFavorite, isPending: isRemoving } =
    useRemoveFavoritePlace(userId, placeId);

  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (!isLoading) {
      setSaved(isSaved);
    }
  }, [isSaved, isLoading]);

  const toggleSaved = () => {
    if (saved) {
      removeFavorite();
    } else {
      addFavorite();
    }
    setSaved(!saved);
  };

  return (
    <div className="flex gap-3">
      <ReportPlaceModal placeId={placeId} userId={userId} />

      <ShareModal />

      <Button
        variant="outline"
        onClick={toggleSaved}
        disabled={isAdding || isRemoving}
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
