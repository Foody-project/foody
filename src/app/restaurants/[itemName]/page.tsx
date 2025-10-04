"use client";

import React, { useEffect, useRef, useState } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { getAllPlaces } from "@/hooks/places/useAllPlaces";
import Loader from "@/components/PreviewCards/Loader";
import Error from "@/components/Error";
import Header from "@/components/tip/Header";
import TabDescription from "@/components/tip/TabDescription";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import { Rating, RatingButton } from "@/components/ui/shadcn-io/rating";
import { BreadcrumbWithCustomSeparator } from "@/components/BreadCrumb";
import { clsx } from "clsx";

export default function ItemPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const idString = searchParams?.get("extraInfo");
  const idNumber = idString ? parseInt(idString, 10) : 0;

  const { data: places = [], isLoading, isError } = getAllPlaces();

  const slugify = (text: string) =>
    text
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "") // accents
      .replace(/\s+/g, "-") // espaces → tirets
      .replace(/[^\w\-]+/g, "") // caractères spéciaux
      .replace(/\-\-+/g, "-")
      .trim();

  const rawSlug = decodeURIComponent(pathname.split("/").pop() ?? "");
  const slugFromUrl = slugify(rawSlug);

  const placeById = places.find((p) => p.id === idNumber);
  const placeSlug = placeById ? slugify(placeById.name) : "";

  useEffect(() => {
    if (!isLoading && (!placeById || placeSlug !== slugFromUrl)) {
      router.replace("/error");
    }
  }, [isLoading, placeById, placeSlug, slugFromUrl, router]);

  if (isLoading) return <Loader />;
  if (isError) return <Error />;
  if (!placeById) return null;

  const itemsBreadcrumb = [
    { label: "Home", href: "/" },
    { label: "Restaurants", href: "/restaurants" },
    { label: placeById.name },
  ];

  return (
    <div className="sm:w-4/5 mx-auto">
      <Navbar />
      <div className="lg:pb-3">
        <BreadcrumbWithCustomSeparator items={itemsBreadcrumb} />
      </div>

      <div className="lg:p-3 pl-3 pr-3 pt-0 sm:pd-0">
        <div
          className={clsx(
            "top-0 z-50 w-full px-0 py-4 flex flex-row items-end justify-between transition-all duration-300"
          )}
        >
          <div className="flex flex-row items-end gap-3">
            <span className="uppercase font-bold text-4xl text-[var(--text-basic)]">
              {placeById.name}
            </span>
            <Rating
              defaultValue={placeById.stars}
              number={placeById.totalNotation}
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

        <Header place={placeById} />
        <TabDescription place={placeById} />
      </div>

      <Footer />
    </div>
  );
}
