"use client";

import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import "../globals.css";

import Footer from "@/components/Footer/Footer";
import Navbar from "@/components/Navbar/Navbar";
import { Card } from "@/components/PreviewCards/Card";
import { BreadcrumbWithCustomSeparator } from "@/components/BreadCrumb";
import Loader from "@/components/PreviewCards/Loader";

import { getAllPlaces } from "@/hooks/places/useAllPlaces";
import type { Place } from "@/types";
import { FiltersModal } from "@/components/tip/FiltersModal";

type Filters = {
  districts: string[];
  cuisines: string[];
  price: number;
  stars: number;
};

const priceToLevel = (price: string): number => {
  if (price === "€") return 1;
  if (price === "€€") return 2;
  if (price === "€€€") return 3;
  return 0;
};

export default function ItemTypePage() {
  const params = useParams();
  const { itemType } = params;

  const { data: places = [], isLoading } = getAllPlaces();

  const itemTypeLabel =
    typeof itemType === "string"
      ? itemType.charAt(0).toUpperCase() + itemType.slice(1)
      : "Item";

  const itemsBreadcrumb = [
    { label: "Home", href: "/" },
    { label: itemTypeLabel },
  ];

  const [activeFilters, setActiveFilters] = useState<Filters>({
    districts: [],
    cuisines: [],
    price: 0,
    stars: 0,
  });

  const [filteredPlaces, setFilteredPlaces] = useState<Place[]>([]);

  useEffect(() => {
    if (places.length > 0) {
      setFilteredPlaces(places);
    }
  }, [places]);

  const handleFiltersApply = (filters: Filters) => {
    setActiveFilters(filters);

    const filtered = places.filter((place) => {
      const matchDistrict =
        filters.districts.length === 0 ||
        (place.district && filters.districts.includes(place.district));

      const cuisineLabel =
        place.flag && place.cuisine ? `${place.flag} | ${place.cuisine}` : "";

      const matchCuisine =
        filters.cuisines.length === 0 ||
        filters.cuisines.includes(cuisineLabel);

      const matchPrice =
        filters.price === 0 ||
        (place.price && priceToLevel(place.price) <= filters.price);

      const matchStars = filters.stars === 0 || place.stars === filters.stars;

      return matchDistrict && matchCuisine && matchPrice && matchStars;
    });

    setFilteredPlaces(filtered);
  };

  if (isLoading) return <Loader />;

  return (
    <div className="sm:w-4/5 mx-auto">
      <Navbar />

      <div className="mt-5 pl-3 sm:pl-0 pb-3">
        <BreadcrumbWithCustomSeparator items={itemsBreadcrumb} />
      </div>

      <section className="flex flex-row justify-between px-3 sm:px-0">
        <div>
          <h1
            className="uppercase font-bold text-3xl bg-clip-text text-transparent"
            style={{ backgroundImage: "var(--background-linear-texte)" }}
          >
            {itemTypeLabel} in Paris
          </h1>

          <div className="flex flex-row gap-1 items-center mt-2">
            <h4 className="text-gray-500 text-sm font-normal">
              <span>{filteredPlaces.length} deals to discover</span>
            </h4>
          </div>
        </div>

        <FiltersModal
          key={JSON.stringify(activeFilters)}
          places={places}
          onApply={handleFiltersApply}
          initialFilters={activeFilters}
        />
      </section>

      <section>
        <motion.div
          key="filtered-places"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          className="flex flex-row flex-wrap justify-start gap-x-15 gap-y-5 sm:gap-12 w-full px-3 sm:px-0"
        >
          {filteredPlaces.map((place: Place, index: number) => (
            <Card key={index} id={place.id} />
          ))}
        </motion.div>
      </section>
      <Footer />
    </div>
  );
}
