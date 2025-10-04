"use client";

import "../../globals.css";
import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar/Navbar";
import { BreadcrumbWithCustomSeparator } from "@/components/BreadCrumb";
import Loader from "@/components/PreviewCards/Loader";
import Footer from "@/components/Footer/Footer";
import { motion } from "framer-motion";
import { Place } from "@/types";
import { Card } from "@/components/PreviewCards/Card";
import { FiltersModal } from "@/components/tip/FiltersModal";
import { getAllPlaces } from "@/hooks/places/useAllPlaces";
import { Lexend } from "next/font/google";
import Error from "@/components/Error";

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

const lexend = Lexend({
  weight: ["300", "400", "500", "600", "700", "800"],
  subsets: ["latin"],
  display: "swap",
});

const slugify = (label: string) =>
  label
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

export default function DistrictPage() {
  const router = useRouter();
  const params = useParams();
  const districtSlug =
    typeof params?.districtName === "string" ? params.districtName : "";

  const { data: places = [], isLoading, isError } = getAllPlaces();

  const [placesAfterFilters, setPlacesAfterFilters] = useState<Place[]>([]);
  const [activeFilters, setActiveFilters] = useState<Filters>({
    districts: [],
    cuisines: [],
    price: 0,
    stars: 0,
  });

  const allDistricts = Array.from(
    new Set(places.map((p) => p.district).filter(Boolean))
  );

  const slugMap = allDistricts.map((d) => ({
    original: d,
    slugified: slugify(d),
  }));

  const matchingDistrict = slugMap.find(
    (entry) => entry.slugified === districtSlug
  );

  // ✅ Redirection si le district est inconnu
  useEffect(() => {
    if (!isLoading && places.length > 0 && !matchingDistrict) {
      router.replace("/error");
    }
  }, [isLoading, places, matchingDistrict, router]);

  if (isLoading || places.length === 0) return <Loader />;
  if (isError) return <Error />;

  const districtLabel =
    matchingDistrict?.original.replace(/\s*\/\s*/g, " - ") ??
    districtSlug.replace(/-/g, " ");

  const filteredPlaces = matchingDistrict
    ? places.filter((p) => p.district === matchingDistrict.original)
    : [];

  const handleFiltersApply = (filters: Filters) => {
    setActiveFilters(filters);

    const filtered = filteredPlaces.filter((place) => {
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

    setPlacesAfterFilters(filtered);
  };

  const displayPlaces =
    placesAfterFilters.length > 0 ? placesAfterFilters : filteredPlaces;

  const itemsBreadcrumb = [
    { label: "Home", href: "/" },
    { label: "Restaurants", href: "/restaurants" },
    { label: districtLabel },
  ];

  return (
    <div className={`${lexend.className}`}>
      <main className="flex-grow w-4/5 mx-auto">
        <Navbar />
        <div className="pb-3 pl-0">
          <BreadcrumbWithCustomSeparator items={itemsBreadcrumb} />
        </div>

        <section className="flex flex-row justify-between">
          <div className="flex flex-col">
            <h1
              className="uppercase font-bold text-3xl bg-clip-text text-transparent"
              style={{ backgroundImage: "var(--background-linear-texte)" }}
            >
              {districtLabel}
            </h1>

            <div className="flex flex-row gap-1 items-center mt-2">
              <h4 className="text-gray-500 text-sm font-normal">
                <span>{displayPlaces.length} deals to discover</span>
              </h4>
            </div>
          </div>

          <FiltersModal
            key={JSON.stringify(activeFilters)}
            places={filteredPlaces}
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
            className="flex flex-row flex-wrap justify-start gap-x-15 gap-y-5 w-full"
          >
            {displayPlaces.map((place: Place, index: number) => (
              <Card key={index} id={place.id} />
            ))}
          </motion.div>
        </section>
        <Footer />
      </main>
    </div>
  );
}
