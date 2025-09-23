import { CommentItem } from "./CommentItem";
import { Button } from "../ui/button";
import Filters from "./Filter";
import { ChevronDown } from "lucide-react";
import { getAllComments } from "@/hooks/places/comments/useAllComments";
import { Textarea } from "@/components/ui/textarea";

export default function CommentSection() {
  const { data: comments } = getAllComments();

  return (
    <section className="w-full">
      <div className="flex flex-row justify-between items-center pb-3">
        <div className="flex flex-row gap-2 items-center">
          <span className="text-2xl">Comments</span>
          <div>
            <span className="p-2 bg-red-500 text-sm rounded-xl text-white">
              {comments?.length}
            </span>
          </div>
        </div>
        <div className="p-2 rounded-md">
          <Filters />
        </div>
      </div>

      <div className="w-full h-[15rem] bg-red-800 rounded-lg">
        <span className="text-xl">Add a review</span>
        <Textarea placeholder="Type your message here." />
      </div>

      <div className="flex flex-col gap-1 mt-3">
        {comments?.slice(0, 3).map((comment) => (
          <CommentItem key={comment.id} comment={comment} />
        ))}
      </div>

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
