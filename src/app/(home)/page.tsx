"use client";

import * as React from "react";
import { useState } from "react";
import Navbar from "@/components/Navbar/Navbar";
import { useRouter } from "next/navigation";
import { Lexend } from "next/font/google";
import Footer from "@/components/Footer/Footer";
import { Button } from "@/components/ui/button";
import { CarouselSpacing } from "@/features/LandingPage/Carousel";
import { ChevronRight } from "lucide-react";

import Pizza from "../../../public/pizza.png";
import Burger from "../../../public/burger.png";
import Bol from "../../../public/bol.png";
import Poulet from "../../../public/poulet.png";
import Sushi from "../../../public/sushi.png";
import Frites from "../../../public/frites.png";

import { getAllPlaces } from "@/hooks/places/useAllPlaces";
import Texts from "@/features/LandingPage/Texts";
import Loader from "@/components/PreviewCards/Loader";

const lexend = Lexend({
  weight: ["300", "400", "500", "600", "700", "800"],
  subsets: ["latin"],
  display: "swap",
});

const password = process.env.NEXT_PUBLIC_PASSWORD_ENTER;

export default function Home() {
  const router = useRouter();
  const { data: places = [], isLoading } = getAllPlaces();

  const [accessGranted, setAccessGranted] = useState(false);
  const [input, setInput] = useState("");

  const handleSubmit = () => {
    if (input === password) {
      setAccessGranted(true);
    } else {
      alert("Incorrect password");
    }
  };

  if (!accessGranted) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white gap-4">
        <h1 className="text-xl font-bold">Enter password to access Foody</h1>
        <input
          type="password"
          value={input}
          placeholder="Write the password here..."
          onChange={(e) => setInput(e.target.value)}
          className="w-60 px-2 py-2 rounded text-black bg-white/50 text-sm placeholder:text-sm"
        />
        <button
          onClick={handleSubmit}
          className="px-4 py-2 bg-orange-500 rounded text-white"
        >
          Submit
        </button>
      </div>
    );
  }

  return (
    <div className="overflow-x-hidden">
      <div className="w-full sm:w-4/5 sm:mx-auto">
        <Navbar />
        <div className="relative h-[40rem] sm:h-[60rem] flex items-center justify-center overflow-hidden">
          {/* Ronds flous */}
          <div className="absolute inset-0 z-0 flex items-center justify-center scale-[1.025] blur-[36px]">
            <div className="grid grid-cols-2 grid-rows-2 gap-1 w-[20rem] h-[20rem] sm:w-[40rem] sm:h-[40rem] animate-[spin_20s_linear_infinite]">
              <div className="bg-[var(--text-orange)]/80 rounded-[50rem] hover:scale-[1.35] transition-all duration-1000 ease-in-out"></div>
              <div className="bg-[var(--text-orange)]/0 rounded-lg"></div>
              <div className="bg-[var(--text-orange)]/0 rounded-lg"></div>
              <div className="bg-[var(--text-orange)]/80 rounded-[50rem] hover:scale-[1.35] transition-all duration-1000 ease-in-out"></div>
            </div>
          </div>

          <div className="absolute inset-0 z-[0.5] pointer-events-none">
            <img
              src={Pizza.src}
              className="absolute wiggle w-[10rem] sm:w-[15rem] max-w-[30vw] top-[2%] left-[10%] sm:top-[10%] sm:left-[15%]"
              alt="Pizza"
            />
            <img
              src={Frites.src}
              className="absolute pulse-opacity w-[4rem] sm:w-[6rem] max-w-[20vw] top-[20%] right-[5%] sm:top-[25%] sm:right-[10%]"
              alt="Frites"
            />
            <img
              src={Poulet.src}
              className="absolute pulse-opacity rotate-[-25deg] w-[6rem] sm:w-[10rem] max-w-[25vw] bottom-[15%] left-[5%] sm:bottom-[20%] sm:left-[0%]"
              alt="Poulet"
            />
            <img
              src={Sushi.src}
              className="absolute wiggle w-[8rem] sm:w-[12rem] max-w-[25vw] bottom-[0%] right-[10%] sm:bottom-[10%] sm:right-[15%]"
              alt="Sushi"
            />
            <img
              src={Burger.src}
              className="absolute wiggle w-[12rem] sm:w-[20rem] max-w-[35vw] top-[30%] left-[15%] sm:top-[40%] sm:left-[25%] opacity-90"
              alt="Burger"
            />
            <img
              src={Bol.src}
              className="absolute wiggle w-[10rem] sm:w-[15rem] max-w-[30vw] top-[48%] right-[20%] sm:top-[25%] sm:right-[30%] opacity-60"
              alt="Bol"
            />
          </div>

          {/* Texte principal */}
          <div className="relative z-1 flex flex-col items-center justify-center text-center px-4">
            <div className="font-bold">
              <span className="text-7xl sm:text-8xl uppercase text-[var(--text-basic)]">
                We love food
              </span>
              <span className="text-3xl sm:text-5xl font-medium rotate-[-10deg] text-[var(--text-basic)]/70">
                (y)
              </span>
            </div>
            <span className="text-xl sm:text-2xl text-[var(--text-orange-third)] mt-2">
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
            "linear-gradient(180deg, rgb(252, 246, 231) 0%, rgba(247, 200, 150, 1) 60%)",
        }}
        className="min-h-screen"
      >
        <div className="w-full sm:pb-20">
          <Texts />
        </div>

        <div className="w-4/5 mx-auto">
          {isLoading ? <Loader /> : <CarouselSpacing places={places} />}
          <Footer />
        </div>
      </div>
    </div>
  );
}
