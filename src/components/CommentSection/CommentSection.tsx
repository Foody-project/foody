import { CommentItem } from "./CommentItem";
import { Button } from "../ui/button";
import Filters from "./Filter";
import { ChevronDown } from "lucide-react";

export default function CommentSection() {
  return (
    <section className="w-full">
      <div className="flex flex-row justify-between items-center pb-3">
        <div className="flex flex-row gap-2 items-center">
          <span className="text-2xl">Comments</span>
          <div>
            <span className="p-2 bg-red-500 text-sm rounded-xl text-white">
              45
            </span>
          </div>
        </div>
        <div className="p-2 rounded-md">
          <Filters />
        </div>
      </div>
      <CommentItem />
      <CommentItem />
      <CommentItem />

      <div className="flex justify-center w-full">
        <Button
          size="lg"
          variant="ghost"
          className="font-light flex items-center gap-1 text-[0.8rem] text-[var(--text-orange)] hover:text-[var(--text-orange)] px-3 !py-0 hover:bg-[var(--text-orange)]/20 transition duration-200 ease-in-out"
        >
          Load more
          <ChevronDown />
        </Button>
      </div>
    </section>
  );
}
