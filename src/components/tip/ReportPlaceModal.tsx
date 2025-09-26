"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Warning } from "@phosphor-icons/react";
import { useState } from "react";
import { useReportPlace } from "@/hooks/places/useReportPlace";

interface ReportPlaceModalProps {
  userId: number;
  placeId: number;
}

export function ReportPlaceModal({ userId, placeId }: ReportPlaceModalProps) {
  const [selectedReason, setSelectedReason] = useState<
    "close" | "other" | null
  >(null);
  const [otherText, setOtherText] = useState("");

  const { mutate: reportPlace, isPending } = useReportPlace();

  const handleSelect = (reason: "close" | "other") => {
    setSelectedReason((prev) => (prev === reason ? null : reason));
    if (reason !== "other") setOtherText("");
  };

  const handleReport = () => {
    const reasonToSend = selectedReason === "close" ? "Close" : otherText;
    reportPlace({ userId, placeId, motif: reasonToSend });
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="link">
          <Warning size={32} color="var(--icon-basic)" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="text-2xl">
            Report this spot ?
          </AlertDialogTitle>
          <AlertDialogDescription className="font-thin">
            Tell us why this place should no longer be on Foody ?
          </AlertDialogDescription>
        </AlertDialogHeader>

        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-3">
            <Checkbox
              checked={selectedReason === "close"}
              onCheckedChange={() => handleSelect("close")}
              id="close"
              className="border-[var(--text-orange)] data-[state=checked]:bg-[var(--text-orange)] data-[state=checked]:border-[var(--text-orange)]"
            />
            <Label htmlFor="close" className="font-normal">
              It's definitively closed.
            </Label>
          </div>

          <div className="flex items-center gap-3">
            <Checkbox
              checked={selectedReason === "other"}
              onCheckedChange={() => handleSelect("other")}
              id="other"
              className="border-[var(--text-orange)] data-[state=checked]:bg-[var(--text-orange)] data-[state=checked]:border-[var(--text-orange)]"
            />
            <Label htmlFor="other" className="font-normal">
              Other
            </Label>
          </div>

          {selectedReason === "other" && (
            <Textarea
              placeholder="Tell us more..."
              value={otherText}
              onChange={(e) => setOtherText(e.target.value)}
              className="mt-2 w-full min-h-16 px-3 py-2 text-base rounded-md border bg-transparent focus:outline-none focus:ring-0 shadow-none font-thin"
            />
          )}
        </div>

        <AlertDialogFooter>
          <AlertDialogCancel className="font-thin">Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleReport}
            disabled={
              isPending ||
              !selectedReason ||
              (selectedReason === "other" && otherText.trim() === "")
            }
            style={{
              background: "var(--background-button)",
              boxShadow: "4px 4px 6px rgba(0,0,0,0.1)",
            }}
            className="font-normal"
          >
            Report
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
