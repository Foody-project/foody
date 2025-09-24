"use client";
import "../../globals.css";
import { useSearchParams } from "next/navigation";

import Navbar from "@/components/Navbar/Navbar";
import { BreadcrumbWithCustomSeparator } from "@/components/BreadCrumb";
import Header from "@/components/tip/Header";
import Loader from "@/components/PreviewCards/Loader";
import TabDescription from "@/components/tip/TabDescription";
import Footer from "@/components/Footer/Footer";

import { getAllPlaces } from "@/hooks/places/useAllPlaces";
import { Lexend } from "next/font/google";

const lexend = Lexend({
  weight: ["300", "400", "500", "600", "700", "800"],
  subsets: ["latin"],
  display: "swap",
});

export default function ItemPage() {
  const searchParams = useSearchParams();
  const idString = searchParams ? searchParams.get("extraInfo") : "";
  const idNumber = idString ? parseInt(idString, 10) : 0;

  const { data: places = [], isLoading } = getAllPlaces();

  const place = places.find((p) => p.id === idNumber);

  const itemsBreadcrumb = [
    { label: "Home", href: "/" },
    { label: "Restaurants", href: "/Restaurants" },
    { label: place?.name || "" },
  ];

  return (
    <div className={`${lexend.className} w-4/5 mx-auto`}>
      <Navbar />
      <div className="pb-3">
        {isLoading && <Loader />}
        {!isLoading && (
          <BreadcrumbWithCustomSeparator items={itemsBreadcrumb} />
        )}
      </div>

      {place && (
        <div>
          <Header place={place} />
          <TabDescription place={place} />
        </div>
      )}
      <Footer />
    </div>
  );
}
