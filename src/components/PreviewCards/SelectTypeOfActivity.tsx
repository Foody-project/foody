"use client"

import * as React from "react"
import { ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

type Option = {
  icon: string
  text: string
  category: string
}

type SelectTypeProps = {
  onSelect?: (opt: Option) => void
}

export function SelectTypeOfActivity({ onSelect }: SelectTypeProps) {
  const options: Option[] = [
    { icon: "🏛️", text: "Museums 🏛️", category: "museum" },
    { icon: "🪩", text: "Clubs 🪩", category: "club" },
    { icon: "🌳", text: "Parcs 🌳", category: "parc" },
  ]

  const [selected, setSelected] = React.useState<Option>(options[0])
  const [open, setOpen] = React.useState(false)

  const handleSelect = (opt: Option) => {
    setSelected(opt)
    setOpen(false)
    if (onSelect) onSelect(opt)
  }

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="secondary" size="sm" className="bg-gray flex items-center gap-2">
          {selected.icon} 
          <ChevronDown />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuGroup>
          {options.map((opt) => (
            <DropdownMenuItem key={opt.category} onSelect={() => handleSelect(opt)}>
              {opt.text}
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}