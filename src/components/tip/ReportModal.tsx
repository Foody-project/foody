"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Warning } from "@phosphor-icons/react";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";

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

export function ReportModal() {
  const [other, setOther] = useState(false);

  const displayTextarea = (): void => {
    if (other === true) {
      setOther(false);
    } else {
      setOther(true);
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant="link"
          style={{ color: "var(--text-basic)", fontWeight: 400 }}
        >
          <Warning size={32} color="var(--icon-basic)" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="text-[var(-text-basic)] bg-[var(--background)]">
        <AlertDialogHeader>
          <AlertDialogTitle>
            <div className="space-y-1">
              <div className="bg-yellow-500 p-3 rounded-lg inline-flex shadow-[0_0_10px_2px_#f7d881]">
                <Warning size={25} className="text-white" />
              </div>
              <h4 className="leading-none font-medium text-xl pt-2">
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
                  className="w-4 h-4
             data-[state=checked]:bg-yellow-600 
             data-[state=checked]:border-yellow-600
             data-[state=checked]:text-white"
                />
                <Label htmlFor="terms" className="text-sm font-thin">
                  This spot is closed
                </Label>
              </div>
              <div className="flex flex-row gap-2 items-center">
                <Checkbox
                  id="other"
                  onClick={() => displayTextarea()}
                  className="w-4 h-4
                        data-[state=checked]:bg-yellow-600 
                        data-[state=checked]:border-yellow-600
                        data-[state=checked]:text-white"
                />
                <Label htmlFor="terms" className="text-sm font-thin">
                  Other
                </Label>
              </div>
              {other === true && (
                <Textarea
                  placeholder="Describe the reason here."
                  className="mt-4 placeholder:font-thin placeholder:text-[0.85rem]"
                />
              )}
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction className="bg-yellow-500 border-yellow-500 border-2 font-normal hover:bg-yellow-600">
            Report
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
