"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Export, Copy } from "@phosphor-icons/react"
import Snackbar from "@mui/material/Snackbar"

export function ShareModal() {
  const [url, setUrl] = useState("")
  const [openSnackbar, setOpenSnackbar] = useState(false)

  useEffect(() => {
    if (typeof window !== "undefined") {
      setUrl(window.location.href)
    }
  }, [])

  function copyToClipboard(inputId: string) {
    const input = document.getElementById(inputId) as HTMLInputElement | null
    if (!input) return

    if (navigator.clipboard?.writeText) {
      navigator.clipboard.writeText(input.value)
    } else {
      input.select()
      document.execCommand("copy")
    }

    setOpenSnackbar(true)
  }

  const handleCloseSnackbar = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") return
    setOpenSnackbar(false)
  }

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

        <PopoverContent className="w-90 bg-white/40 backdrop-blur-md shadow-none rounded-md [box-shadow:0_0_10px_2px_rgba(0,0,0,0.2)]">
          <div className="grid gap-4">
            <div className="space-y-1">
              <h4 className="leading-none font-medium text-xl">Share this spot to a friend !</h4>
              <p className="text-muted-foreground text-sm font-thin">
                That way he can enjoy it too!
              </p>
            </div>

            <div className="flex w-full items-center bg-[var(--text-orange)]/70 rounded-md px-3 py-2 [box-shadow:4px_4px_6px_rgba(0,0,0,0.1)]">
              <Label htmlFor="link" className="sr-only">
                Link
              </Label>
              <input
                id="link"
                type="text"
                readOnly
                value={url}
                className="flex-1 bg-transparent text-[var(--text-basic)] font-thin outline-none"
                aria-label="Share link"
              />
              <Button
                type="button"
                variant="ghost"
                onClick={() => copyToClipboard("link")}
                className="text-[var(--basic-icon)] hover:bg-white/10 p-2 ml-2"
                aria-label="Copy link"
              >
                <Copy size={18} />
              </Button>
            </div>
          </div>
        </PopoverContent>
      </Popover>

      {/* Snackbar avec fond noir + blur */}
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
  )
}