"use client";

import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import "../globals.css";

import Footer from "@/components/Footer/Footer";

import type { Place } from "@/types";

import Navbar from "@/components/Navbar/Navbar";
import { Card } from "@/components/PreviewCards/Card";
import { BreadcrumbWithCustomSeparator } from "@/components/BreadCrumb";
import Loader from "@/components/PreviewCards/Loader";
import { Button } from "@/components/ui/button";
import { SlidersHorizontal } from "lucide-react";

import { getAllPlaces } from "@/hooks/places/useAllPlaces";

export default function ItemTypePage() {
  const params = useParams();
  const { itemType } = params;

  const { data: places = [], isLoading, error } = getAllPlaces();

  const itemTypeLabel =
    typeof itemType === "string"
      ? itemType.charAt(0).toUpperCase() + itemType.slice(1)
      : "Item";

  const itemsBreadcrumb = [
    { label: "Home", href: "/" },
    { label: itemTypeLabel },
  ];

  return (
    <div className="w-4/5 mx-auto">
      <Navbar />
      <div className="mt-5 pb-3">
        <BreadcrumbWithCustomSeparator items={itemsBreadcrumb} />
      </div>

      <section className="flex flex-row justify-between">
        <div>
          <h1
            className="uppercase font-bold text-3xl bg-clip-text text-transparent"
            style={{ backgroundImage: "var(--background-linear-texte)" }}
          >
            {itemTypeLabel} in Paris
          </h1>

          <div className="flex flex-rows gap-1 items-center mt-2">
            <h4 className="text-gray-500 text-sm font-normal">
              {!isLoading && <span>{places.length} deals to discover</span>}
            </h4>
          </div>
        </div>
        <Button variant="outline">
          <SlidersHorizontal size={12} color="var(--text-basic)" />
        </Button>
      </section>
      <section>
        {itemTypeLabel === "Restaurants" && (
          <>
            {isLoading && <Loader />}
            {error && <p>Erreur: {error?.message}</p>}
            {!isLoading && !error && (
              <motion.div
                key="restaurants"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
                className="flex flex-rows flex-wrap justify-between w-full"
              >
                {places.map((place: Place, index: number) => (
                  <Card key={index} id={place.id} />
                ))}
              </motion.div>
            )}
          </>
        )}
      </section>
      <Footer />
    </div>
  );
}
