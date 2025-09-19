"use client";

import * as React from "react";
import Navbar from "@/components/Navbar/Navbar";
import Header from "@/components/Header/Header";
import { useRouter } from "next/navigation";
import { Lexend } from "next/font/google";
import CardSectionLanding from "@/components/CardSection/CardSection";
import Footer from "@/components/Footer/Footer";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { CarouselSpacing } from "@/components/LandingPage/Carousel";
import { ChevronRight } from "lucide-react";

import { getAllPlaces } from "@/lib/hooks/places/useAllPlaces";
import Texts from "@/components/LandingPage/Texts";

const lexend = Lexend({
  weight: ["300", "400", "500", "600", "700", "800"],
  subsets: ["latin"],
  display: "swap",
});

export default function Home() {
  const router = useRouter();
  const { data: places = [] } = getAllPlaces();

  return (
    <div>
      <div className="w-4/5 mx-auto">
        <Navbar />
        {/*
        <Header />
        <CarouselSpacing places={places} />
        */}

        <div className="relative h-[60rem] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 z-0 flex items-center justify-center scale-[1.05] blur-[46px]">
            <div className="grid grid-cols-2 grid-rows-2 gap-2 w-[40rem] h-[40rem] animate-[spin_20s_linear_infinite]">
              <div className="bg-[var(--text-orange)]/80 rounded-[50rem] hover:scale-[1.5] transition-all duration-1000 ease-in-out"></div>
              <div className="bg-[var(--text-orange)]/0 rounded-lg"></div>
              <div className="bg-[var(--text-orange)]/0 rounded-lg"></div>
              <div className="bg-[var(--text-orange)]/80 rounded-[50rem] hover:scale-[1.5] transition-all duration-1000 ease-in-out"></div>
            </div>
          </div>

          <div className="relative z-10 flex flex-col items-center justify-center text-center px-4">
            <div className="font-bold">
              <span className="text-8xl uppercase text-[var(--text-basic)]">
                We love food
              </span>
              <span className="text-5xl font-medium rotate-[-10deg] text-[var(--text-basic)]/70">
                (y)
              </span>
            </div>
            <span className="text-2xl text-[var(--text-orange-third)] mt-2">
              and Paris is the city for it
            </span>
            <Button
              size="sm"
              className={`${lexend.className} text-white font-[300] w-30 h-10 text-md cursor-pointer flex items-center justify-center mt-5`}
              style={{
                background: "var(--background-button)",
                boxShadow: "4px 4px 6px rgba(0,0,0,0.1)",
              }}
              onClick={() => router.replace("/login")}
            >
              <span className="flex items-center gap-1">
                Discover
                <ChevronRight size={20} strokeWidth={2} />
              </span>
            </Button>
          </div>
        </div>
      </div>

      <div
        style={{
          backgroundImage:
            "linear-gradient(180deg, rgb(252, 246, 231) 0%, rgba(248, 188, 124, 1) 60%)",
        }}
        className="min-h-screen"
      >
        <div className="w-full pb-20">
          <Texts />
        </div>

        <div className="w-4/5 mx-auto">
          <CarouselSpacing places={places} />
          <Separator
            orientation="horizontal"
            className="mt-[100px] mb-[100px] !w-[500px] mx-auto [background:var(--background-button)]"
          />

          <CardSectionLanding />
          <Footer />
        </div>
      </div>
    </div>
  );
}
