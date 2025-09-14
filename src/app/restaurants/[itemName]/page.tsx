"use client";
import "../../globals.css";
import { useSearchParams } from "next/navigation";

import Navbar from "@/components/Navbar/Navbar";
import { BreadcrumbWithCustomSeparator } from "@/components/BreadCrumb";
import Header from "@/components/tip/Header";
import Loader from "@/components/PreviewCards/Loader";
import TabDescription from "@/components/tip/TabDescription";

import { usePlaceByID } from "@/lib/hooks/places/usePlaceByID";

export default function ItemPage() {
  const searchParams = useSearchParams();

  const idString = searchParams ? searchParams.get("extraInfo") : "";

  const idNumber = idString ? parseInt(idString, 10) : 0;

  const { data: place, isLoading } = usePlaceByID(idNumber);

  const itemsBreadcrumb = [
    { label: "Home", href: "/" },
    { label: "Restaurants", href: "/Restaurants" },
    { label: place?.name || "" },
  ];

  return (
    <div className="w-4/5 mx-auto">
      <Navbar />
      <div className="pb-3">
        {isLoading && <Loader />}
        {!isLoading && (
          <BreadcrumbWithCustomSeparator items={itemsBreadcrumb} />
        )}
      </div>

      <Header place={place || null} />
      <TabDescription place={place} />
    </div>
  );
}
