"use client";

import { useRouter } from "next/navigation";

import { Lexend } from "next/font/google";

const lexend = Lexend({
  weight: ["300", "400", "500", "600", "700", "800"],
  subsets: ["latin"],
  display: "swap",
});

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
          FOODY
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
            className={`${lexend.className} bg-white hover:bg-white text-gray-700 cursor-pointer [box-shadow:4px_4px_6px_rgba(0,0,0,0.1)] font-[300]`}
            onClick={() => router.replace("/login")}
          >
            Login
          </Button>
        </div>
        <SubMenuRedirection />
      </div>
    </nav>
  );
}
