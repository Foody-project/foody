"use client";
import "../../globals.css";
import { useSearchParams } from "next/navigation";

import Navbar from "@/components/Navbar/Navbar";
import { BreadcrumbWithCustomSeparator } from "@/components/BreadCrumb";
import Header from "@/components/tip/Header";
import Loader from "@/components/PreviewCards/Loader";
import TabDescription from "@/components/tip/TabDescription";
import Footer from "@/components/Footer/Footer";
import { Rating, RatingButton } from "@/components/ui/shadcn-io/rating";
import ButtonTips from "@/components/tip/ButtonsTips";
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

  const userId = 1;

  if (isLoading) return <Loader />;

  return (
    <div className={`${lexend.className} sm:w-4/5 mx-auto`}>
      <Navbar />
      <div className="pb-3">
        {isLoading && <Loader />}
        {!isLoading && (
          <BreadcrumbWithCustomSeparator items={itemsBreadcrumb} />
        )}
      </div>

      {place && (
        <div className="p-3 sm:pd-0">
          <div className="sticky top-0 z-50 rounded-md bg-white/20 backdrop-blur-md px-2 py-4 flex flex-row items-end justify-between">
            <div className="flex flex-row items-end gap-3">
              <span className="uppercase font-bold text-4xl text-[var(--text-basic)]">
                {place.name}
              </span>
              <Rating
                defaultValue={place.stars}
                number={place.totalNotation}
                readOnly
              >
                {Array.from({ length: 5 }).map((_, index) => (
                  <RatingButton
                    key={index}
                    className="w-[1rem] h-6 text-[var(--text-orange)]"
                  />
                ))}
              </Rating>
            </div>

            <ButtonTips
              userId={userId}
              placeId={place.id}
              placeName={place.name}
            />
          </div>
          <Header place={place} />
          <TabDescription place={place} />
        </div>
      )}
      <Footer />
    </div>
  );
}
