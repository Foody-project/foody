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
import { getUserById } from "@/hooks/user/getUserById";
import { useConnectedUser } from "@/hooks/useIsAuthenticated";

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
    const keywordMatch =
      Array.isArray(place.keywords) &&
      place.keywords.some((kw) => kw.toLowerCase().includes(lowerQuery));

    return nameMatch || districtMatch || keywordMatch;
  });
};

import { useAuth } from "../../contexts/AuthContext";

export default function Navbar() {
  const { user } = useAuth();
  const { data: places } = getAllPlaces();
  const router = useRouter();
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [query, setQuery] = useState("");

  const filteredPlaces = getFilteredPlaces(query, places ?? []);
  const showSearch = isHovered || isFocused;

  return (
    <nav className="relative z-[9] w-full">
      <div className="flex flex-row gap-4 px-4 pt-5 pb-6 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center justify-between w-full">
          <a href="/" className="text-4xl font-bold text-[var(--text-orange)]">
            FOODY
          </a>
        </div>

        <div
          className="relative hidden sm:block flex-grow max-w-full"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <Search
            size={18}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-orange-500 pointer-events-none"
          />

          <div
            className={`transition-all duration-300 ease-in-out ${
              showSearch ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
          >
            <div
              className="rounded-full p-[2px] w-full md:w-[400px]"
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
                className="w-full h-11 pl-5 pr-4 rounded-full bg-white/85 text-gray-700 placeholder-gray-400 placeholder:font-thin placeholder:text-[0.95rem] focus:outline-none focus:ring-2 focus:ring-orange-300 transition-all duration-200"
              />
            </div>

            <div className="absolute mt-2 w-full md:w-[400px] max-h-[25rem] overflow-y-auto bg-white shadow-lg rounded-lg border border-gray-200 z-70">
              <SearchFirstStep
                items={filteredPlaces}
                query={query}
                onItemClick={() => setQuery("")}
              />
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          {user ? (
            <>
              <ConnectedIcon avatar={""} />
            </>
          ) : (
            <Button
              size="sm"
              className={`${lexend.className} text-white font-[300] w-25 h-10 text-md cursor-pointer flex items-center justify-center whitespace-nowrap`}
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
          )}
        </div>
      </div>

      <div
        className="relative flex-grow max-w-full block sm:hidden mx-4"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <Search
          size={18}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-orange-500 pointer-events-none"
        />

        <div
          className={`transition-all duration-300 ease-in-out ${
            showSearch ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        >
          <div
            className="w-full rounded-full p-[2px]"
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
              className="w-full h-11 pl-5 pr-4 rounded-full bg-white/85 text-gray-700 placeholder-gray-400 placeholder:font-thin placeholder:text-[0.95rem] focus:outline-none focus:ring-2 focus:ring-orange-300 transition-all duration-200"
            />
          </div>

          <div className="absolute mt-2 w-full max-h-[25rem] overflow-y-auto bg-white shadow-lg rounded-lg border border-gray-200 z-70">
            <SearchFirstStep
              items={filteredPlaces}
              query={query}
              onItemClick={() => setQuery("")}
            />
          </div>
        </div>
      </div>
    </nav>
  );
}
