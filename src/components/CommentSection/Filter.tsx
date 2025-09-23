import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { SlidersHorizontal } from "lucide-react";

export default function Filters() {
  return (
    <Select>
      <SelectTrigger className="w-[auto] font-normal text-[var(--text-basic)] text-[0.9rem] ![box-shadow:4px_4px_6px_rgba(0,0,0,0)]">
        <SlidersHorizontal size={14} />
        <SelectValue placeholder="Default" />
      </SelectTrigger>
      <SelectContent className="font-thin text-[0.9rem] text-[var(--text-basic)]">
        <SelectGroup>
          <SelectItem value="default">Default</SelectItem>
          <SelectItem value="mostLiked">Most liked</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
