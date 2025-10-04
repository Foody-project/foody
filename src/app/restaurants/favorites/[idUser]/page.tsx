"use client";

import "../../../globals.css";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Navbar from "@/components/Navbar/Navbar";
import { BreadcrumbWithCustomSeparator } from "@/components/BreadCrumb";
import Loader from "@/components/PreviewCards/Loader";
import Footer from "@/components/Footer/Footer";
import { motion } from "framer-motion";
import { Card } from "@/components/PreviewCards/Card";
import { Funnel_Display } from "next/font/google";
import { getFavoritesPlaces } from "@/hooks/places/useFavoritesPlace";
import { Place } from "@/types";
import { useAuth } from "@/contexts/AuthContext";
import Unauthorized from "@/components/Unauthorized";

const funnel = Funnel_Display({
  weight: ["300", "400", "500", "600", "700", "800"],
  subsets: ["latin"],
  display: "swap",
});

export default function ItemPage() {
  const router = useRouter();
  const params = useParams();
  const rawId = params?.idUser;
  const urlUserId = typeof rawId === "string" ? parseInt(rawId, 10) : null;

  const { user } = useAuth();
  const userId = typeof user?.id === "number" ? user.id : null;

  const [authReady, setAuthReady] = useState(false);

  // ✅ Attend que l'auth soit prête avant de vérifier
  useEffect(() => {
    if (userId !== null) {
      setAuthReady(true);
    }
  }, [userId]);

  useEffect(() => {
    if (
      authReady &&
      urlUserId !== null &&
      userId !== null &&
      urlUserId !== userId
    ) {
      router.replace("/unauthorized");
    }
  }, [authReady, urlUserId, userId, router]);

  const { data, isLoading, isError } = getFavoritesPlaces(user?.id);
  const favoritesPlace = (data ?? []) as Place[];

  const itemsBreadcrumb = [
    { label: "Home", href: "/" },
    { label: "Profile" },
    { label: "Favorites" },
  ];

  if (!authReady || urlUserId === null) return <Loader />;
  if (urlUserId !== userId) return <Unauthorized />;
  if (isLoading) return <Loader />;
  if (isError) return <Unauthorized />;

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
