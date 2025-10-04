"use client";

import React, { useState, useEffect } from "react";
import { CaretLeftIcon, CaretRightIcon } from "@phosphor-icons/react";
import { getImagesByPlaceId } from "@/hooks/places/useImagesByID";
import { Place } from "@/types";

interface DiscoverMenuProps {
  readonly place?: Place;
}

export default function DiscoverMenu({ place }: DiscoverMenuProps) {
  if (!place?.id) return null;

  const { data: images } = getImagesByPlaceId(place.id);
  const menuUrls = Array.isArray(place.menu) ? place.menu : [];

  const [selectedMenuIndex, setSelectedMenuIndex] = useState<number | null>(
    null
  );
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(
    null
  );

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (selectedMenuIndex !== null && menuUrls.length > 0) {
        if (e.key === "Escape") setSelectedMenuIndex(null);
        if (e.key === "ArrowLeft")
          setSelectedMenuIndex(
            selectedMenuIndex === 0
              ? menuUrls.length - 1
              : selectedMenuIndex - 1
          );
        if (e.key === "ArrowRight")
          setSelectedMenuIndex(
            selectedMenuIndex === menuUrls.length - 1
              ? 0
              : selectedMenuIndex + 1
          );
      }

      if (selectedImageIndex !== null && images) {
        if (e.key === "Escape") setSelectedImageIndex(null);
        if (e.key === "ArrowLeft")
          setSelectedImageIndex(
            selectedImageIndex === 0
              ? images.length - 1
              : selectedImageIndex - 1
          );
        if (e.key === "ArrowRight")
          setSelectedImageIndex(
            selectedImageIndex === images.length - 1
              ? 0
              : selectedImageIndex + 1
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
  }, [selectedMenuIndex, selectedImageIndex, menuUrls, images]);

  const handlePrev = (type: "menu" | "image") => {
    if (type === "menu" && selectedMenuIndex !== null) {
      setSelectedMenuIndex(
        selectedMenuIndex === 0 ? menuUrls.length - 1 : selectedMenuIndex - 1
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
      setSelectedMenuIndex(
        selectedMenuIndex === menuUrls.length - 1 ? 0 : selectedMenuIndex + 1
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
      {menuUrls.length > 0 && (
        <span className="text-2xl uppercase font-bold pb-5 block text-[var(--text-basic)]">
          Discover the menu
        </span>
      )}

      <div className="flex flex-col md:flex-row flex-wrap lg:justify-start justify-center items-center gap-5 md:gap-10">
        {menuUrls.length > 0 && (
          <div className="flex flex-col cursor-pointer items-center">
            <img
              src={menuUrls[0]}
              alt="Menu preview"
              className="w-[20rem] h-[15rem] mb-2 object-cover rounded-lg shadow-md transform transition-transform duration-300 hover:scale-105"
              onClick={() => setSelectedMenuIndex(0)}
            />
            <span className="text-md text-[var(--text-basic)] text-center">
              Photos of the menu
            </span>
          </div>
        )}

        {images && images.length > 0 && (
          <div className="flex flex-col cursor-pointer items-center">
            <img
              src={images[0].url}
              className="w-[20rem] h-[15rem] mb-2 object-cover rounded-lg shadow-md transform transition-transform duration-300 hover:scale-105"
              onClick={() => setSelectedImageIndex(0)}
            />
            <span className="text-md text-[var(--text-basic)] text-center">
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
            src={menuUrls[selectedMenuIndex]}
            alt="Menu enlarged"
            className="w-[40vw] h-[60vh] rounded-xl shadow-2xl transform transition-transform duration-300 scale-100"
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
