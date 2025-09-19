import { Button } from "../ui/button";

import { Check } from "@phosphor-icons/react";

export default function Header() {
  return (
    <section
      className="relative w-full h-80 bg-cover bg-center bg-no-repeat rounded-lg border-gray border-2"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1692873754518-f5715507dc41?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
      }}
    >
      <div className="absolute inset-0 bg-black/55 rounded-lg"></div>

      <div className="relative z-10 flex flex-col items-start justify-center h-full text-left text-white px-8 [box-shadow:4px_4px_30px_rgba(0,0,0,0.4)] rounded-lg">
        <h1 className="scroll-m-20 text-4xl font-bold tracking-tight text-balance">
          The best spots in Paris, at your fingertips !
        </h1>
        <div className="flex gap-2 mt-5">
          <Button
            variant="outline"
            size="sm"
            className="text-[var(--text-orange-secondary)] font-light text-[0.75rem] hover:!text-[var(--text-orange-secondary)] hover:!bg-input/30"
          >
            <Check color="var(--text-orange)" /> International food
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="text-[var(--text-orange-secondary)] font-light text-[0.75rem] hover:!text-[var(--text-orange-secondary)] hover:!bg-input/30"
          >
            <Check color="var(--text-orange)" /> Offers
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="text-[var(--text-orange-secondary)] font-light text-[0.75rem] hover:!text-[var(--text-orange-secondary)] hover:!bg-input/30"
          >
            <Check color="var(--text-orange)" /> Unforgettable moments
          </Button>
        </div>
      </div>
    </section>
  );
}
