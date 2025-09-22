"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Warning } from "@phosphor-icons/react";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { Toast } from "../Toast";
import { useReportPlace } from "@/hooks/places/useReportPlace";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export function ReportModal({
  userId,
  placeId,
}: {
  userId: number;
  placeId: number;
}) {
  const [otherChecked, setOtherChecked] = useState(false);
  const [motifDraft, setMotifDraft] = useState("");
  const [displayToast, setDisplayToast] = useState(false);
  const [toastType, setToastType] = useState<"success" | "cancelled">(
    "success"
  );
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const { mutate } = useReportPlace();

  const showToast = (type: "success" | "cancelled") => {
    setToastType(type);
    setDisplayToast(true);
    if (toastTimer.current) clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setDisplayToast(false), 5000);
  };

  const handleReport = () => {
    const motif = otherChecked ? motifDraft.trim() : "Closed";
    mutate(
      { userId, placeId, motif },
      {
        onSuccess: () => {
          showToast("success");
          setMotifDraft("");
          setOtherChecked(false);
        },
        onError: () => showToast("cancelled"),
      }
    );
  };

  useEffect(() => {
    return () => {
      if (toastTimer.current) clearTimeout(toastTimer.current);
    };
  }, []);

  return (
    <>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button
            variant="link"
            style={{ color: "var(--text-basic)", fontWeight: 400 }}
          >
            <Warning size={32} color="var(--icon-basic)" />
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent className="text-[var(-text-basic)] bg-[var(--background)] shadow-xl">
          <AlertDialogHeader>
            <AlertDialogTitle>
              <div className="space-y-1">
                <div className="bg-yellow-600 p-3 rounded-lg inline-flex shadow-[0_0_10px_2px_#f7d881]">
                  <Warning size={25} className="text-white" />
                </div>
                <h4 className="leading-none font-medium text-2xl pt-2">
                  Report this spot ?
                </h4>
                <p className="text-muted-foreground text-sm font-thin">
                  Tell us why...
                </p>
              </div>
            </AlertDialogTitle>
            <AlertDialogDescription>
              <div>
                <Separator />
                <div className="flex flex-row gap-2 items-center pt-4 pb-1">
                  <Checkbox
                    id="closed"
                    checked={!otherChecked}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setOtherChecked(false);
                        setMotifDraft("");
                      }
                    }}
                    className="w-4 h-4 border-yellow-700
                      data-[state=checked]:bg-yellow-600 
                      data-[state=checked]:border-yellow-600
                      data-[state=checked]:text-white"
                  />
                  <Label htmlFor="closed" className="text-sm font-thin">
                    This spot is closed
                  </Label>
                </div>
                <div className="flex flex-row gap-2 items-center">
                  <Checkbox
                    id="other"
                    checked={otherChecked}
                    onCheckedChange={(checked) => {
                      setOtherChecked(!!checked);
                      if (!checked) setMotifDraft("");
                    }}
                    className="w-4 h-4 border-yellow-700
                      data-[state=checked]:bg-yellow-600 
                      data-[state=checked]:border-yellow-600
                      data-[state=checked]:text-white"
                  />
                  <Label htmlFor="other" className="text-sm font-thin">
                    Other
                  </Label>
                </div>
                {otherChecked && (
                  <Textarea
                    value={motifDraft}
                    onChange={(e) => setMotifDraft(e.target.value)}
                    placeholder="Describe the reason here."
                    className="mt-2 placeholder:font-thin placeholder:text-[0.85rem]"
                  />
                )}
              </div>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction
              onClick={handleReport}
              disabled={otherChecked && motifDraft.trim() === ""}
              className="bg-yellow-600 border-yellow-500 border-2 font-normal hover:bg-yellow-600"
            >
              Report
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {displayToast && (
        <Toast
          label="Report sent"
          subLabel="Thanks for helping us improve Foody"
          type={toastType}
        />
      )}
    </>
  );
}
