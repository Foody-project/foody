"use client";

import * as React from "react";
import Navbar from "@/components/Navbar/Navbar";
import Header from "@/components/Header/Header";
import CardSection from "@/components/PreviewCards/CardSection";
import CardSectionLanding from "@/components/CardSection/CardSection";
import Footer from "@/components/Footer/Footer";
import { Separator } from "@/components/ui/separator";

import { useAllPlaces } from "@/lib/hooks/places/useAllPlaces";

export default function Home() {
  const isHomePage = true;
  const { data: places = [] } = useAllPlaces();

  console.log(useAllPlaces());

  return (
    <div className="w-4/5 mx-auto">
      <Navbar />
      <Header />

      <CardSection isHomePage={isHomePage} data={places} />

      <Separator
        orientation="horizontal"
        className="mt-[100px] mb-[100px] !w-[500px] mx-auto [background:var(--background-button)]"
      />

      <CardSectionLanding />
      <Footer />
    </div>
  );
}
