"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { ChevronDown } from "lucide-react"
import { Handshake } from "@phosphor-icons/react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function ComboboxDropdownMenu() {
  const [label, setLabel] = React.useState("feature")
  const [open, setOpen] = React.useState(false)

  const labels: Record<string, { name: string; img: string, link: string }> = {
    food: { name: "Food", img: "https://i.pinimg.com/736x/48/eb/b7/48ebb768778944678259f95fbf8e2e67.jpg", link: "/restaurants" },
    drinks: { name: "Drinks", img: "https://i.pinimg.com/1200x/cf/25/c9/cf25c980fc67d560572582087e1b0816.jpg", link: "/bars" },
    activities: { name: "Activities", img: "https://i.pinimg.com/736x/3a/64/2a/3a642a72958183aa85789e32da0368cd.jpg", link: "/activities" },
  }

  const router = useRouter();

  return (
    <div className="flex w-full flex-col items-start justify-between rounded-md px-4 py-3 sm:flex-row sm:items-center">
      <DropdownMenu open={open} onOpenChange={setOpen}>
        <DropdownMenuTrigger asChild>
          <Button variant="secondary" size="sm" className="text-white bg-black hover:bg-gray">
            Explore
            <ChevronDown />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-[200px] bg-black border-black">
          <DropdownMenuGroup>
            {Object.keys(labels).map((key) => (
              <DropdownMenuItem
                key={key}
                className="text-white"
                onClick={() => router.replace(labels[key].link)}
              >
                <img src={labels[key].img} className="w-10 h-10"/>
                <span className="pl-3">{labels[key].name}</span>
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator className="bg-[#8B5CF6]"/>
            <DropdownMenuItem className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-green-500 flex flex-row justify-between">
              <span>Deals</span>
              <Handshake size="17" color="#8B5CF6"/>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}