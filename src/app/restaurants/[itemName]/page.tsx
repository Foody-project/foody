"use client";

import React from "react";
import "../../globals.css";
import { useSearchParams } from "next/navigation";
import { clsx } from "clsx";

import Navbar from "@/components/Navbar/Navbar";
import { BreadcrumbWithCustomSeparator } from "@/components/BreadCrumb";
import Header from "@/components/tip/Header";
import Loader from "@/components/PreviewCards/Loader";
import TabDescription from "@/components/tip/TabDescription";
import Footer from "@/components/Footer/Footer";
import { Rating, RatingButton } from "@/components/ui/shadcn-io/rating";
import { getAllPlaces } from "@/hooks/places/useAllPlaces";
import { Lexend } from "next/font/google";

const lexend = Lexend({
  weight: ["300", "400", "500", "600", "700", "800"],
  subsets: ["latin"],
  display: "swap",
});

export default function ItemPage() {
  const searchParams = useSearchParams();
  const idString = searchParams ? searchParams.get("extraInfo") : "";
  const idNumber = idString ? parseInt(idString, 10) : 0;

  const { data: places = [], isLoading } = getAllPlaces();
  const place = places.find((p) => p.id === idNumber);

  const itemsBreadcrumb = [
    { label: "Home", href: "/" },
    { label: "Restaurants", href: "/Restaurants" },
    { label: place?.name || "" },
  ];

  const [isSticky, setIsSticky] = React.useState(false);
  const sentinelRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsSticky(!entry.isIntersecting),
      { rootMargin: "0px", threshold: 0 }
    );

    const sentinel = sentinelRef.current;
    if (sentinel) observer.observe(sentinel);

    return () => {
      if (sentinel) observer.unobserve(sentinel);
    };
  }, []);

  if (isLoading) return <Loader />;

  return (
    <div className={`${lexend.className} sm:w-4/5 mx-auto`}>
      <Navbar />
      <div className="lg:pb-3">
        {!isLoading && (
          <BreadcrumbWithCustomSeparator items={itemsBreadcrumb} />
        )}
      </div>

      {place && (
        <div className="lg:p-3 pl-3 pr-3 pt-0 sm:pd-0">
          <div ref={sentinelRef} className="h-1" />

          <div
            className={clsx(
              "top-0 z-50 w-full px-0 py-4 flex flex-row items-end justify-between transition-all duration-300",
              isSticky && "bg-white/20 backdrop-blur-md rounded-md"
            )}
          >
            <div className="flex flex-row items-end gap-3">
              <span className="uppercase font-bold text-4xl text-[var(--text-basic)]">
                {place.name}
              </span>
              <Rating
                defaultValue={place.stars}
                number={place.totalNotation}
                readOnly
              >
                {Array.from({ length: 5 }).map((_, index) => (
                  <RatingButton
                    key={index}
                    className="w-[1rem] h-6 text-[var(--text-orange)]"
                  />
                ))}
              </Rating>
            </div>
          </div>

          <Header place={place} />
          <TabDescription place={place} />
        </div>
      )}

      <Footer />
    </div>
  );
}
