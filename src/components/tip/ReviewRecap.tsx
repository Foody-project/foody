import ProgressBarCircle from "./ProgressionBarCircle";
import { Place } from "@/interfaces";

interface ReviewRecapProps {
  place?: Place;
}

export default function ReviewRecap({ place }: ReviewRecapProps) {
  return (
    <div>
      <span className="text-2xl uppercase font-bold mt-7 mb-3 block text-[var(--text-basic)]">
        Review
      </span>
      <ProgressBarCircle place={place} />
    </div>
  );
}
