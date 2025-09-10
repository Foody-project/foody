"use client";
import "../../globals.css";
import { useParams } from "next/navigation";
import { useSearchParams } from "next/navigation";

import Navbar from "@/components/Navbar/Navbar";
import { BreadcrumbWithCustomSeparator } from "@/components/BreadCrumb";
import { getRestaurantByID } from "@/lib/hooks/getRestaurantByID";
import Header from "@/components/tip/Header";

import { usePlaceByID } from "@/lib/hooks/places/usePlaceByID";

export default function ItemPage() {
  const searchParams = useSearchParams();

  const idString = searchParams ? searchParams.get("extraInfo") : "";

  const idNumber = idString ? parseInt(idString, 10) : 0;

  const { data: place } = usePlaceByID(idNumber);

  const itemsBreadcrumb = [
    { label: "Home", href: "/" },
    { label: "Restaurant", href: "/Restaurants" },
    { label: place?.name || "" },
  ];

  return (
    <div className="w-4/5 mx-auto">
      <Navbar />
      <div className="pb-3">
        <BreadcrumbWithCustomSeparator items={itemsBreadcrumb} />
      </div>

      <Header place={place || null} />
    </div>
  );
}
