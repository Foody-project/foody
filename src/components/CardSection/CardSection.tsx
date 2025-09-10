"use client";

import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import CardLanding from "@/components/CardSection/CardLanding";

export default function CardSectionLanding() {
  const router = useRouter();

  return (
    <div>
      <div className="flex flex-col items-center">
        <span className="text-[var(--text-orange-secondary)] text-3xl font-bold uppercase">
          Don't want to miss anything in Paris ?
        </span>
        <Button
          variant="default"
          className="mt-5 cursor-pointer [background-image:var(--background-button)] [box-shadow:4px_4px_6px_rgba(0,0,0,0.2)]"
          onClick={() => {
            router.push("/register");
          }}
        >
          Login
        </Button>
      </div>
      <div className="flex flex-row justify-around mt-[100px]">
        <CardLanding
          type="User"
          gradient="linear-gradient(180deg, #CF0606 0%, #D11406 25%, #E53906 50%, #F27306 75%, #FF8C00 100%)"
          title="You want discover tips in Paris ?"
          color="#000000"
          textes={[
            "Amazing offers !",
            "Discover others cultures",
            "You'll know all about the coolest places in Paris !",
          ]}
        />
        <CardLanding
          type="Professionnal"
          title="You want to work with us ?"
          textes={[
            "You'll give your business a real boost with the community power !",
            "Unlimited new customers !",
            "Submit your own offers!",
          ]}
        />
      </div>
    </div>
  );
}
