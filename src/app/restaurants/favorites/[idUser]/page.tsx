"use client";
import "../../../globals.css";
import { useSearchParams } from "next/navigation";

import Navbar from "@/components/Navbar/Navbar";
import { BreadcrumbWithCustomSeparator } from "@/components/BreadCrumb";
import Loader from "@/components/PreviewCards/Loader";
import Footer from "@/components/Footer/Footer";
import { motion } from "framer-motion";
import { Card } from "@/components/PreviewCards/Card";

import { Lexend } from "next/font/google";
import { getFavoritesPlaces } from "@/hooks/places/useFavoritesPlace";

import { Place } from "@/types";

const lexend = Lexend({
  weight: ["300", "400", "500", "600", "700", "800"],
  subsets: ["latin"],
  display: "swap",
});

export default function ItemPage() {
  const searchParams = useSearchParams();
  const idString = searchParams ? searchParams.get("extraInfo") : "";
  const userId = 1;

  const { data, isLoading } = getFavoritesPlaces(userId);
  const favoritesPlace = (data ?? []) as Place[];


  const itemsBreadcrumb = [
    { label: "Home", href: "/" },
    { label: "Profile" },
    { label: "Favorites"},
  ];

  if (isLoading) return <Loader />;

  console.log('FAVORITES', favoritesPlace)

  return (
    <div className={`${lexend.className} sm:w-4/5 mx-auto`}>
      <Navbar />
      <div className="pb-3">
        {isLoading && <Loader />}
        {!isLoading && (
          <BreadcrumbWithCustomSeparator items={itemsBreadcrumb} />
        )}
      </div>

      <div className='flex flex-col'>
        <span className="uppercase font-bold text-4xl text-[var(--text-basic)]">Your favorites</span>
        <span className="font-thin text-sm">You saved {favoritesPlace.length} spot(s)!</span>
      </div>

      <section>
        <motion.div
          key="filtered-places"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          className="flex flex-row flex-wrap justify-start gap-x-15 gap-y-5 sm:gap-12 w-full px-3 sm:px-0"
        >
          {favoritesPlace.map((place: Place, index: number) => (
            <Card key={index} id={place.id} />
          ))}
        </motion.div>
      </section>

      <Footer />
    </div>
  );
}