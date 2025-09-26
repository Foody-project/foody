import { useState } from "react";
import { CommentItem } from "./CommentItem";
import { Button } from "../ui/button";
import Filters from "./Filter";
import { ChevronDown } from "lucide-react";
import { getAllComments } from "@/hooks/places/comments/useAllComments";
import { Textarea } from "@/components/ui/textarea";
import { Place } from "@/types";
import { Rating, RatingButton } from "@/components/ui/shadcn-io/rating";
import { useCreateComment } from "@/hooks/places/comments/useCreateComment";
import Label from "../Label";

export default function CommentSection({ place }: { place: Place }) {
  const { mutate, isPending } = useCreateComment();
  const { data: comments = [], refetch } = getAllComments();

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [visibleCount, setVisibleCount] = useState(3);

  const placeholderReview = `What did you think of ${place.name} ?`;
  const placeId = place.id;
  const userId = 1;

  const handleSubmit = () => {
    if (comment.trim() === "") return;

    mutate(
      { userId, placeId, comment, rating },
      {
        onSuccess: () => {
          refetch();
          setComment("");
          setRating(0);
        },
      }
    );
  };

  return (
    <section className="w-full">
      <div className="flex flex-row justify-between items-center pb-3">
        <div className="flex flex-row gap-2 items-center">
          <span className="text-2xl">Comments</span>
          <div>
            <Label label={comments.length.toString()} color="red-500" />
          </div>
        </div>
        {/**
         * <div className="p-2 rounded-md">
          <Filters />
        </div>
         */}
      </div>

      <div className="w-full flex flex-col gap-2 h-[15rem] p-5 bg-[var(--background-secondary)] [box-shadow:4px_4px_6px_rgba(0,0,0,0.05)] rounded-lg">
        <span className="text-xl text-[var(--text-basic)]">Add a review</span>
        <Textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder={placeholderReview}
          className="placeholder:font-thin border border-black/25"
        />
        <span className="text-[var(--text-basic)]">Assign a rating</span>
        <Rating onValueChange={(value) => setRating(value)}>
          {Array.from({ length: 5 }).map((_, index) => (
            <RatingButton key={index} className="text-[var(--text-orange)]" />
          ))}
        </Rating>
        <div className="w-full flex flex-row justify-end">
          <Button
            onClick={handleSubmit}
            disabled={isPending || comment.trim() === ""}
            size="sm"
            className="text-white font-[300] w-20 h-10 text-sm cursor-pointer flex items-center justify-center"
            style={{
              background: "var(--background-button)",
              boxShadow: "4px 4px 6px rgba(0,0,0,0.1)",
              opacity: isPending ? 0.6 : 1,
            }}
          >
            <span className="flex items-center gap-1">Send</span>
          </Button>
        </div>
      </div>

      <div className="flex flex-col gap-1 mt-3">
        {comments
          .filter((c) => c.placeId === place.id)
          .slice(0, visibleCount)
          .map((comment) => (
            <CommentItem key={comment.id} comment={comment} />
          ))}
      </div>

      {visibleCount < 6 ? (
        <div className="flex justify-center w-full">
          <Button
            onClick={() => setVisibleCount((prev) => prev + 3)}
            size="lg"
            variant="ghost"
            className="font-light flex items-center gap-1 text-[0.8rem] text-[var(--text-orange)] hover:text-[var(--text-orange)] px-3 !py-0 hover:bg-[var(--text-orange)]/20 transition duration-200 ease-in-out"
          >
            Load more
            <ChevronDown />
          </Button>
        </div>
      ) : (
        <div className="flex justify-end w-full">
          <span className="text-[0.8rem] font-thin text-muted-foreground mt-3">
            And some others...
          </span>
        </div>
      )}
    </section>
  );
}
