"use client";

import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { Check } from "@phosphor-icons/react";

interface CardLandingProps {
  type: "User" | "Professionnal";
  gradient?: string;
  title: string;
  color?: string;
  textes: string[];
}

export default function CardLanding({
  type,
  gradient,
  title,
  color,
  textes,
}: CardLandingProps) {
  const router = useRouter();
  const colorButtons = color ? color : "#000000";

  return (
    <div className="relative w-[40%] h-[600px] flex flex-col justify-center items-center rounded-2xl overflow-hidden [box-shadow:0px_0px_26px_rgba(0,0,0,0.4)]">
      {gradient && (
        <div
          className="absolute inset-0 opacity-60 animate-gradient"
          style={{
            backgroundImage: gradient,
            backgroundRepeat: "no-repeat",
            backgroundSize: "200% 200%",
            backgroundPosition: "0% 50%",
          }}
        />
      )}

      {type === "User" ? (
        <div className="relative z-10 flex flex-col items-center text-center gap-6 px-10">
          <span className="text-white font-medium text-2xl">{title}</span>

          <div className="flex flex-row flex-wrap justify-center gap-4">
            {textes.map((item, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                className="text-black font-normal text-[0.75rem] shadow shadow-black transition-shadow hover:text-gray-800 hover:!bg-input/30"
              >
                <Check className="mr-2" color={colorButtons} /> {item}
              </Button>
            ))}
          </div>

          <Button
            variant="default"
            className="mt-5 font-normal cursor-pointer shadow shadow-black transition-shadow bg-white/70 text-black hover:bg-white/90"
            onClick={() => router.push("/register")}
          >
            Register
          </Button>
        </div>
      ) : (
        <div className="relative z-10 flex flex-col items-center text-center gap-6 px-10">
          <span className="text-black font-medium text-2xl">{title}</span>

          <div className="flex flex-row flex-wrap justify-center gap-4">
            {textes.map((item, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                className="text-[var(--text-orange)] font-normal text-[0.75rem] shadow shadow-black transition-shadow hover:text-[var(--text-orange)] hover:!bg-input/30"
              >
                <Check className="mr-2" color={"var(--text-orange)"} /> {item}
              </Button>
            ))}
          </div>

          <Button
            variant="outline"
            className="mt-5 text-white font-normal cursor-pointer [background-image:var(--background-button)] [box-shadow:0px_0px_26px_rgba(0,0,0,0.4)]"
          >
            Register as professional
          </Button>
        </div>
      )}
    </div>
  );
}
