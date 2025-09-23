"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Export, Copy } from "@phosphor-icons/react";
import { Send, Link2 } from "lucide-react";
import Snackbar from "@mui/material/Snackbar";

export function ShareModal() {
  const [url, setUrl] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setUrl(window.location.href);
    }
  }, []);

  function copyToClipboard(inputId: string) {
    const input = document.getElementById(inputId) as HTMLInputElement | null;
    if (!input) return;

    if (navigator.clipboard?.writeText) {
      navigator.clipboard.writeText(input.value);
    } else {
      input.select();
      document.execCommand("copy");
    }

    setOpenSnackbar(true);
  }

  const handleCloseSnackbar = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") return;
    setOpenSnackbar(false);
  };

  return (
    <>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="link"
            style={{ color: "var(--text-basic)", fontWeight: 400 }}
          >
            <Export size={32} color="var(--icon-basic)" /> Share
          </Button>
        </PopoverTrigger>

        <PopoverContent className="w-[22.5rem] rounded-md shadow-md shadow-[rgba(0,0,0,0.2)] bg-[#FCF6E7]">
          <div className="grid gap-4">
            <div className="space-y-1">
              <div className="bg-[var(--text-orange-third)] p-3 rounded-lg inline-flex shadow-[0_0_10px_2px_rgba(150,112,98,0.8)]">
                <Send size={25} className="text-white" />
              </div>
              <h4 className="leading-none font-medium text-2xl pt-2">
                Share this spot to a friend !
              </h4>
              <p className="text-muted-foreground text-sm font-thin">
                That way he can enjoy it too !
              </p>
            </div>

            <div className="flex items-center w-full px-2 py-1 bg-white/90 rounded-md">
              <div className="px-2 mr-2 inline-flex border-r border-gray-300">
                <Link2 size={20} className="rotate-[-35deg]" />
              </div>
              <Label htmlFor="link" className="sr-only">
                Link
              </Label>
              <input
                id="link"
                type="text"
                readOnly
                value={url}
                className="flex-1 bg-transparent text-[var(--text-basic)]/70 font-thin text-[0.9rem] outline-none"
                aria-label="Share link"
              />
              <Button
                type="button"
                variant="ghost"
                onClick={() => copyToClipboard("link")}
                className="text-[var(--basic-icon)] hover:bg-white/10 p-2 ml-2 rounded-full"
                aria-label="Copy link"
              >
                <Copy size={18} />
              </Button>
            </div>
          </div>
        </PopoverContent>
      </Popover>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        message="Link copied to clipboard!"
        ContentProps={{
          sx: {
            backgroundColor: "rgba(0,0,0,0.7)",
            backdropFilter: "blur(8px)",
            color: "white",
            borderRadius: "0.5rem",
          },
        }}
      />
    </>
  );
}
