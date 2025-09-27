"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Lexend } from "next/font/google";

import { Button } from "../ui/button";
import { Search, ChevronRight } from "lucide-react";
import SearchFirstStep from "./SearchFirstStep";
import { Place } from "@/types";
import { ConnectedIcon } from "@/features/ConnectedIcon/ConnectedIcon";

import "../../app/globals.css";

import { getAllPlaces } from "@/hooks/places/useAllPlaces";

const lexend = Lexend({
  weight: ["300", "400", "500", "600", "700", "800"],
  subsets: ["latin"],
  display: "swap",
});

const getFilteredPlaces = (query: string, items: Place[]): Place[] => {
  if (!query) return items;

  const lowerQuery = query.toLowerCase();

  return items.filter((place: Place) => {
    const nameMatch = place.name?.toLowerCase().includes(lowerQuery);
    const districtMatch = place.district?.toLowerCase().includes(lowerQuery);
    const keywordMatch = place.keywords?.some((kw) =>
      kw.name?.toLowerCase().includes(lowerQuery)
    );

    return nameMatch || districtMatch || keywordMatch;
  });
};

export default function Navbar() {
  const { data: places } = getAllPlaces();
  const router = useRouter();
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [query, setQuery] = useState<string>("");

  const filteredPlaces = getFilteredPlaces(query, places ?? []);
  const showSearch: boolean = isHovered || isFocused;

  return (
    <nav className="relative z-[9]">
      <div className="flex items-center justify-between pt-5 pb-10 px-6">
        <a href="/" className="text-4xl font-bold text-[var(--text-orange)]">
          FOODY
        </a>

        <div className="flex items-center gap-6 relative">
          <div
            className="relative"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <Search
              size={20}
              className="text-[var(--text-orange)] cursor-pointer transition-transform duration-200 hover:scale-110"
            />

            <div
              className={`absolute top-1/2 -translate-y-1/2 right-0 transition-all duration-300 ease-in-out ${
                showSearch
                  ? "opacity-100 translate-x-4"
                  : "opacity-0 translate-x-0 pointer-events-none"
              }`}
            >
              <div
                className="relative z-[9999]"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                <div
                  className="w-[30rem] rounded-full p-[2px]"
                  style={{
                    background:
                      "linear-gradient(90deg, rgba(207,6,6,0.5) 0%, rgba(255,140,0,0.5) 100%)",
                  }}
                >
                  <input
                    type="text"
                    placeholder="Search a spot"
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    onChange={(e) => setQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 rounded-full bg-white/85 text-gray-700 placeholder-gray-400 placeholder:font-thin placeholder:text-[0.95rem] focus:outline-none focus:ring-2 focus:ring-orange-300 transition-all duration-200"
                  />
                  <Search
                    size={18}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-orange-500 pointer-events-none"
                  />
                </div>
                <div className="absolute mt-2 w-[30rem] max-h-[25rem] overflow-y-auto bg-white shadow-lg rounded-lg border border-gray-200">
                  <SearchFirstStep
                    items={filteredPlaces}
                    query={query}
                    onItemClick={() => setQuery("")}
                  />
                </div>
              </div>
            </div>
          </div>

          <ConnectedIcon />

          <Button
            size="sm"
            className={`${lexend.className} text-white font-[300] w-25 h-10 text-md cursor-pointer flex items-center justify-center`}
            style={{
              background: "var(--background-button)",
              boxShadow: "4px 4px 6px rgba(0,0,0,0.1)",
            }}
            onClick={() => router.replace("/login")}
          >
            <span className="flex items-center gap-1">
              Login
              <ChevronRight size={20} strokeWidth={2} />
            </span>
          </Button>
        </div>
      </div>
    </nav>
  );
}
