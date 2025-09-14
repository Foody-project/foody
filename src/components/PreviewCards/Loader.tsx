"use client";

import React from "react";

export const Loader = () => {
  return (
    <>
      <div className="flex justify-center items-center min-h-screen">
        <div className="loader w-[8rem] h-[10rem] grid grid-cols-3 gap-[5px]">
          {[...Array(6)].map((_, i) => (
            <span
              key={i}
              className="loader-dot"
              style={{ animationDelay: `${i * 100}ms` }}
            />
          ))}
        </div>
      </div>

      <style jsx>{`
        .loader-dot {
          width: 2rem;
          height: 100%;
          background-color: var(--text-orange);
          animation: blink 0.6s alternate infinite linear;
        }

        @keyframes blink {
          0% {
            opacity: 0.3;
            transform: scale(0.5) rotate(5deg);
          }
          50% {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>
    </>
  );
};

export default Loader;
