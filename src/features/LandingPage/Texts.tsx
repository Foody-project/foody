import React from "react";
import ScrollBaseAnimation from "../../../components/uilayouts/scroll-text-marque";

function Texts() {
  return (
    <>
      <div className="h-[500px] w-[100%] scale-[1.055] grid place-content-center rotate-[-10deg]">
        <ScrollBaseAnimation
          delay={500}
          baseVelocity={-3}
          clasname="font-bold text-[6rem] tracking-[-0.07em] leading-[90%] text-[var(--text-orange-third)]"
        >
          Great spots - Better food - Awesome times -
        </ScrollBaseAnimation>
        <ScrollBaseAnimation
          delay={500}
          baseVelocity={3}
          clasname="font-medium tracking-[-0.07em] leading-[90%] sm:!text-[5vw]"
        >
          You can only find it here.
        </ScrollBaseAnimation>
      </div>
    </>
  );
}

export default Texts;
