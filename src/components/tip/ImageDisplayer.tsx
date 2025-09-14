"use client";

import React, { useState, useRef, useEffect } from "react";
import { CaretLeftIcon, CaretRightIcon } from "@phosphor-icons/react";

interface Image {
  url: string;
}

interface ImageDisplayerProps {
  images: Image[];
  place: { name: string };
}

export default function ImageDisplayer({ images, place }: ImageDisplayerProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const mainImageRef = useRef<HTMLImageElement>(null);
  const [columnHeight, setColumnHeight] = useState<number>(0);

  useEffect(() => {
    if (mainImageRef.current) {
      setColumnHeight(mainImageRef.current.offsetHeight);
    }
  }, [images]);

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedIndex !== null) {
      setSelectedIndex(
        selectedIndex === 0 ? images.length - 1 : selectedIndex - 1
      );
    }
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedIndex !== null) {
      setSelectedIndex(
        selectedIndex === images.length - 1 ? 0 : selectedIndex + 1
      );
    }
  };

  return (
    <>
      <div className="flex flex-row gap-4">
        {images.length > 0 && (
          <img
            ref={mainImageRef}
            src={images[0].url}
            alt={place.name}
            className="w-[86rem] h-[30rem] rounded-xl shadow-[0px_0px_26px_rgba(0,0,0,0.4)] cursor-pointer object-cover"
            onClick={() => setSelectedIndex(0)}
          />
        )}

        {images.length > 1 && columnHeight > 0 && (
          <div
            className="flex flex-col flex-1 gap-3"
            style={{ height: `${columnHeight}px` }}
          >
            {images.slice(1, 5).map((img, index) => {
              const isLast = index === 3 && images.length > 5;
              return (
                <div
                  key={index}
                  className="relative cursor-pointer flex-1"
                  onClick={() => setSelectedIndex(index + 1)}
                >
                  <img
                    src={img.url}
                    alt={`${place.name} - ${index + 1}`}
                    className={`w-[9.5rem] h-[6.85rem] object-cover rounded-lg shadow-md hover:scale-105 duration-300 ${
                      isLast ? "opacity-60" : ""
                    }`}
                  />
                  {isLast && (
                    <span className="absolute h-[6.85rem] inset-0 flex items-center justify-center text-white text-xl font-bold">
                      +{images.length - 5}
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>

      {selectedIndex !== null && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 transition-opacity duration-300"
          onClick={() => setSelectedIndex(null)}
        >
          <button className="absolute left-4 z-50" onClick={handlePrev}>
            <CaretLeftIcon
              size={32}
              color="white"
              className="[text-shadow:4px_4px_6px_rgba(0,0,0,0.2)]"
            />
          </button>

          <img
            src={images[selectedIndex].url}
            alt="Agrandie"
            className="w-[40vw] h-[40vh] rounded-xl shadow-2xl transform transition-all duration-300 scale-100"
            onClick={(e) => e.stopPropagation()}
          />

          <button className="absolute right-4 z-50" onClick={handleNext}>
            <CaretRightIcon
              size={32}
              color="white"
              className="[text-shadow:4px_4px_6px_rgba(0,0,0,0.2)]"
            />
          </button>
        </div>
      )}
    </>
  );
}
