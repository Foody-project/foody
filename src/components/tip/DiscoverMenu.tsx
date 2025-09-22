"use client";

import React, { useState, useEffect } from "react";
import { CaretLeftIcon, CaretRightIcon } from "@phosphor-icons/react";

import { useMenusByPlaceId } from "@/hooks/places/useMenuByID";
import { getImagesByPlaceId } from "@/hooks/places/useImagesByID";
import { Place } from "@/types";

interface DiscoverMenuProps {
  readonly place?: Place;
}

export default function DiscoverMenu({ place }: DiscoverMenuProps) {
  if (!place?.id) return null;

  const { data: menus, isLoading, error } = useMenusByPlaceId(place.id);
  const { data: images } = getImagesByPlaceId(place.id);

  const [selectedMenuIndex, setSelectedMenuIndex] = useState<number | null>(
    null
  );
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(
    null
  );

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (selectedMenuIndex !== null && menus?.[0]?.urls) {
        const urls = menus[0].urls;
        if (e.key === "Escape") setSelectedMenuIndex(null);
        if (e.key === "ArrowLeft")
          setSelectedMenuIndex(
            selectedMenuIndex === 0 ? urls.length - 1 : selectedMenuIndex - 1
          );
        if (e.key === "ArrowRight")
          setSelectedMenuIndex(
            selectedMenuIndex === urls.length - 1 ? 0 : selectedMenuIndex + 1
          );
      }

      if (selectedImageIndex !== null && images) {
        const imgs = images;
        if (e.key === "Escape") setSelectedImageIndex(null);
        if (e.key === "ArrowLeft")
          setSelectedImageIndex(
            selectedImageIndex === 0 ? imgs.length - 1 : selectedImageIndex - 1
          );
        if (e.key === "ArrowRight")
          setSelectedImageIndex(
            selectedImageIndex === imgs.length - 1 ? 0 : selectedImageIndex + 1
          );
      }
    };

    document.addEventListener("keydown", handleKey);
    if (selectedMenuIndex !== null || selectedImageIndex !== null) {
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "auto";
    };
  }, [selectedMenuIndex, selectedImageIndex, menus, images]);

  if (isLoading) return <span>Loading...</span>;
  if (error) return <span>Erreur lors du chargement</span>;
  if (!menus || menus.length === 0 || menus[0].urls.length === 0)
    return <span>No menu available</span>;

  const menu = menus[0];

  const handlePrev = (type: "menu" | "image") => {
    if (type === "menu" && selectedMenuIndex !== null) {
      const urls = menu.urls;
      setSelectedMenuIndex(
        selectedMenuIndex === 0 ? urls.length - 1 : selectedMenuIndex - 1
      );
    }
    if (type === "image" && selectedImageIndex !== null && images) {
      setSelectedImageIndex(
        selectedImageIndex === 0 ? images.length - 1 : selectedImageIndex - 1
      );
    }
  };

  const handleNext = (type: "menu" | "image") => {
    if (type === "menu" && selectedMenuIndex !== null) {
      const urls = menu.urls;
      setSelectedMenuIndex(
        selectedMenuIndex === urls.length - 1 ? 0 : selectedMenuIndex + 1
      );
    }
    if (type === "image" && selectedImageIndex !== null && images) {
      setSelectedImageIndex(
        selectedImageIndex === images.length - 1 ? 0 : selectedImageIndex + 1
      );
    }
  };

  return (
    <div>
      <span className="text-2xl uppercase font-bold pb-5 block text-[var(--text-basic)]">
        Discover the menu
      </span>

      <div className="flex flex-row gap-10">
        <div className="flex flex-col cursor-pointer">
          <img
            src={menu.urls[0]}
            alt={menu.title}
            className="w-[20rem] h-[15rem] mb-2 object-cover rounded-lg shadow-md transform transition-transform duration-300 hover:scale-105"
            onClick={() => setSelectedMenuIndex(0)}
          />
          <span className="text-md text-[var(--text-basic)]">
            Photos of the menu
          </span>
        </div>

        {images && images.length > 0 && (
          <div className="flex flex-col cursor-pointer">
            <img
              src={images[0].url}
              className="w-[20rem] h-[15rem] mb-2 object-cover rounded-lg shadow-md transform transition-transform duration-300 hover:scale-105"
              onClick={() => setSelectedImageIndex(0)}
            />
            <span className="text-md text-[var(--text-basic)]">
              Other photos
            </span>
          </div>
        )}
      </div>

      {selectedMenuIndex !== null && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 transition-opacity duration-300"
          onClick={() => setSelectedMenuIndex(null)}
        >
          <button
            className="absolute left-4 z-50"
            onClick={(e) => {
              e.stopPropagation();
              handlePrev("menu");
            }}
          >
            <CaretLeftIcon size={32} color="white" />
          </button>

          <img
            src={menu.urls[selectedMenuIndex]}
            alt={`${menu.title} enlarged`}
            className="w-[40vw] h-[40vh] rounded-xl shadow-2xl transform transition-transform duration-300 scale-100"
            onClick={(e) => e.stopPropagation()}
          />

          <button
            className="absolute right-4 z-50"
            onClick={(e) => {
              e.stopPropagation();
              handleNext("menu");
            }}
          >
            <CaretRightIcon size={32} color="white" />
          </button>
        </div>
      )}

      {selectedImageIndex !== null && images && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 transition-opacity duration-300"
          onClick={() => setSelectedImageIndex(null)}
        >
          <button
            className="absolute left-4 z-50"
            onClick={(e) => {
              e.stopPropagation();
              handlePrev("image");
            }}
          >
            <CaretLeftIcon size={32} color="white" />
          </button>

          <img
            src={images[selectedImageIndex].url}
            className="w-[40vw] h-[40vh] rounded-xl shadow-2xl transform transition-transform duration-300 scale-100"
            onClick={(e) => e.stopPropagation()}
          />

          <button
            className="absolute right-4 z-50"
            onClick={(e) => {
              e.stopPropagation();
              handleNext("image");
            }}
          >
            <CaretRightIcon size={32} color="white" />
          </button>
        </div>
      )}
    </div>
  );
}
