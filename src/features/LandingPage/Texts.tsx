"use client";

import React from "react";
import Link from "next/link";
import ScrollBaseAnimation from "../../../components/uilayouts/scroll-text-marque";
import { getAllPlaces } from "@/hooks/places/useAllPlaces";

function Texts() {
  const { data: places = [] } = getAllPlaces();

  function formatSlug(name: string, id: number): string {
    const slugifiedName = name
      .toLowerCase()
      .replace(/\s+/g, "-") // espaces → tirets
      .replace(/[^\w-]/g, "") // supprime caractères spéciaux
      .replace(/-+/g, "-") // évite les tirets doublés
      .trim();

    return `${slugifiedName}?extraInfo=${id}`;
  }

  const topRestaurants = places.slice(0, 10).map((place) => ({
    name: place.name,
    itemName: formatSlug(place.name, place.id),
  }));

  return (
    <div className="h-[500px] w-full scale-[1.1] grid place-content-center rotate-[-10deg] py-2">
      <ScrollBaseAnimation
        delay={500}
        baseVelocity={-0.4}
        clasname="font-bold text-[6rem] tracking-[-0.07em] leading-[90%] text-[var(--text-orange-third)]"
      >
        {topRestaurants.map((place, index) => (
          <React.Fragment key={index}>
            <Link
              href={`/restaurants/${place.itemName}`}
              className="hover:text-[var(--text-orange)] duration-200"
            >
              {place.name}
            </Link>
            <span> - </span>
          </React.Fragment>
        ))}
      </ScrollBaseAnimation>

      <ScrollBaseAnimation
        delay={500}
        baseVelocity={0.6}
        clasname="font-medium tracking-[-0.07em] leading-[90%] sm:!text-[3vw]"
      >
        {topRestaurants.map((place, index) => (
          <React.Fragment key={index}>
            <Link
              href={`/restaurants/${place.itemName}`}
              className="hover:text-[var(--text-orange)] duration-200"
            >
              {place.name}
            </Link>
            <span> - </span>
          </React.Fragment>
        ))}
      </ScrollBaseAnimation>
    </div>
  );
}

export default Texts;
