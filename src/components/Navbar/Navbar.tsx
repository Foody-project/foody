"use client";

import { useRouter } from "next/navigation";

import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { ComboboxDropdownMenu } from "../PreviewCards/ComboboxDropdownMenu";
import { SubMenuRedirection } from "./SubMenuRedirection";

import { Search } from "lucide-react";
import "../../app/globals.css";

export default function Navbar() {
  const router = useRouter();

  return (
    <nav>
      <div className="flex items-center justify-between p-4 max-w-7xl mx-auto gap-4">
        <a href="/" className="text-3xl font-bold text-[var(--text-orange)]">
          FIND
        </a>

        <div className="flex-1 mx-4">
          <Input
            type="text"
            placeholder="Search..."
            icon={<Search size={16} color="var(--text-orange)" />}
            className="w-full focus:outline-none [box-shadow:0px_0px_26px_rgba(0,0,0,0.15)]"
          />
        </div>

        <div className="flex items-center gap-2">
          <ComboboxDropdownMenu />
          <Button
            size="sm"
            className="bg-white hover:bg-white text-black cursor-pointer [box-shadow:4px_4px_6px_rgba(0,0,0,0.1)]"
            onClick={() => router.replace("/login")}
          >
            Login / Register
          </Button>
        </div>
        <SubMenuRedirection />
      </div>
    </nav>
  );
}
