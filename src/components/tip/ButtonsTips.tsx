"use client";

import { Export, Pencil, Heart, Warning } from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";
import { ShareModal } from "./ShareModal";
import { useState, useRef, useEffect } from "react";
import { useAddFavorite } from "@/hooks/places/useSavePlace";
import { useDeleteFavorite } from "@/hooks/places/useDeleteSavingPlace";
import { Toast } from "../Toast";
import { Place } from "@/types";
import { ReportModal } from "./ReportModal";
import { useState } from "react";

export default function ButtonTips({ place }: { place: Place }) {
  const { mutate: addFavorite } = useAddFavorite();
  const { mutate: deleteFavorite } = useDeleteFavorite();

  const [saved, setSaved] = useState(false);
  const [displayToast, setDisplayToast] = useState(false);
  const [toastType, setToastType] = useState<"success" | "cancelled">(
    "success"
  );

  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const showToast = (type: "success" | "cancelled") => {
    setToastType(type);
    setDisplayToast(true);

    if (toastTimer.current) {
      clearTimeout(toastTimer.current);
    }

    toastTimer.current = setTimeout(() => {
      setDisplayToast(false);
    }, 5000);
  };

  const handleClick = () => {
    if (!saved) {
      addFavorite({ userId: 1, placeId: place.id });
      setSaved(true);
      showToast("success");
    } else {
      deleteFavorite({ userId: 1, placeId: place.id });
      setSaved(false);
      showToast("cancelled");
    }
  };

  useEffect(() => {
    return () => {
      if (toastTimer.current) {
        clearTimeout(toastTimer.current);
      }
    };
  }, []);

  return (
    <div className="flex gap-3">
      <ReportModal />
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

      {displayToast && (
        <Toast
          label={toastType === "success" ? "Spot saved" : "Spot removed"}
          subLabel={
            toastType === "success"
              ? "You can find it again later"
              : "You are no longer saving this spot"
          }
          type={toastType}
        />
      )}
    </div>
  );
}
