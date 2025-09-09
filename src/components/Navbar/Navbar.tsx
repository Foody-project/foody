'use client';

import { useRouter } from 'next/navigation'

import { Input } from "../ui/input";
import { Button } from '../ui/button';
import { ComboboxDropdownMenu } from "../PreviewCards/ComboboxDropdownMenu";
import { SubMenuRedirection } from './SubMenuRedirection';

import { Search } from "lucide-react"

export default function Navbar() {
  const router = useRouter();

  return (
    <nav>
      <div className="flex items-center justify-between p-4 max-w-7xl mx-auto gap-4">
        <a href="/" className="text-3xl font-bold text-white">FIND</a>

        <div className="flex-1 mx-4">
          <Input
            type="text"
            placeholder="Search..."
            icon={<Search size={16} color="white"/>}
            className="w-full focus:outline-none caret-white"
          />
        </div>

        <div className="flex items-center gap-2">
          <ComboboxDropdownMenu />
          <Button size="sm" className="bg-white hover:bg-white text-black cursor-pointer" onClick={() => router.replace("/login")}>
            Login / Register
          </Button>
        </div>
        <SubMenuRedirection />
      </div>
    </nav>
  );
}