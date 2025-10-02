"use client";

import React from "react";
import Link from "next/link";
import ScrollBaseAnimation from "../../../components/uilayouts/scroll-text-marque";
import { getAllPlaces } from "@/hooks/places/useAllPlaces";

function Texts() {
  const { data: places = [] } = getAllPlaces();

  const topRestaurants = places.slice(0, 10).map((place) => ({
    name: place.name,
    slug: place.name,
  }));

  return (
    <div className="h-[500px] w-full scale-[1.055] grid place-content-center rotate-[-10deg]">
      <ScrollBaseAnimation
        delay={500}
        baseVelocity={-0.4}
        clasname="font-bold text-[6rem] tracking-[-0.07em] leading-[90%] text-[var(--text-orange-third)]"
      >
        {topRestaurants.map((place, index) => (
          <React.Fragment key={index}>
            <Link
              href={`/restaurant/${place.slug}`}
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
        baseVelocity={3}
        clasname="font-medium tracking-[-0.07em] leading-[90%] sm:!text-[5vw]"
      >
        You can only find it here.
      </ScrollBaseAnimation>
    </div>
  );
}

export default Texts;
