"use client";

import "../../../globals.css";
import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar/Navbar";
import { BreadcrumbWithCustomSeparator } from "@/components/BreadCrumb";
import Loader from "@/components/PreviewCards/Loader";
import Footer from "@/components/Footer/Footer";
import { motion } from "framer-motion";
import { Card } from "@/components/PreviewCards/Card";
import { Funnel_Display } from "next/font/google";
import { getFavoritesPlaces } from "@/hooks/places/useFavoritesPlace";
import { Place } from "@/types";
import Error from "@/components/Error";
import { useAuth } from "@/contexts/AuthContext";

const funnel = Funnel_Display({
  weight: ["300", "400", "500", "600", "700", "800"],
  subsets: ["latin"],
  display: "swap",
});

export default function ItemPage() {
  const { user } = useAuth();
  const userId = user?.id;

  const [waiting, setWaiting] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setWaiting(false);
    }, 10000);

    return () => clearTimeout(timer);
  }, []);

  const { data, isLoading, isError } = getFavoritesPlaces(userId);
  const favoritesPlace = (data ?? []) as Place[];

  const itemsBreadcrumb = [
    { label: "Home", href: "/" },
    { label: "Profile" },
    { label: "Favorites" },
  ];

  if (!userId && waiting) {
    return <Loader />;
  }

  if (!userId && !waiting) {
    return <Error />;
  }

  if (isLoading) {
    return <Loader />;
  }

  if (isError) return <Error />;

  return (
    <div className={`${funnel.className} sm:w-4/5 mx-auto`}>
      <Navbar />
      <div className="mt-5 pl-3 sm:pl-0 pb-3">
        <BreadcrumbWithCustomSeparator items={itemsBreadcrumb} />
      </div>

      <section className="flex flex-row justify-between px-3 sm:px-0">
        <div>
          <h1
            className="uppercase font-bold text-4xl bg-clip-text text-transparent"
            style={{ backgroundImage: "var(--background-linear-texte)" }}
          >
            Favorites
          </h1>

          <div className="flex flex-row gap-1 items-center mt-2">
            <h4 className="text-gray-500 text-sm font-normal">
              <span>{favoritesPlace.length} spots saved !</span>
            </h4>
          </div>
        </div>
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
          {favoritesPlace.map((place: Place, index: number) => (
            <Card key={index} id={place.id} />
          ))}
        </motion.div>
      </section>

      <Footer />
    </div>
  );
}
