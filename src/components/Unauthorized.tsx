"use client";

import { useRouter } from "next/navigation";

export default function Unauthorized() {
  const router = useRouter();
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[var(--text-basic)]">
      <div className="flex flex-col text-center">
        <span className="uppercase text-[5rem] font-bold text-[var(--text-orange)]">
          Unauthorized
        </span>
        <span className="text-lg font-thin text-white/60 mt-[-2rem]">
          You can't access this page
        </span>
        <span
          className="text-sm text-[var(--text-orange-secondary)]/80 italic cursor-pointer"
          onClick={(e) => {
            router.push("/");
          }}
        >
          Go back
        </span>
      </div>
    </div>
  );
}
