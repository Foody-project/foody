import { useState } from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "../ui/separator";
import { ThumbsUp, ThumbsDown } from "lucide-react";

export function CommentItem() {
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);

  const handleLike = () => {
    setLiked(!liked);
    if (disliked) setDisliked(false);
  };

  const handleDislike = () => {
    setDisliked(!disliked);
    if (liked) setLiked(false);
  };

  return (
    <section className="p-4">
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Avatar>
              <AvatarImage
                src="https://github.com/evilrabbit.png"
                alt="@evilrabbit"
              />
              <AvatarFallback>CD</AvatarFallback>
            </Avatar>
            <span className="text-[var(--text-basic)] font-medium">
              Corentin D.
            </span>
          </div>
          <span className="text-xs font-light text-[var(--text-basic)]/50 px-2 py-1">
            54 minutes ago
          </span>
        </div>
        <Separator />
        <div className="text-sm text-[var(--text-basic)] font-thin">
          It is a long established fact that a reader will be distracted by the
          readable content of a page when looking at its layout.
        </div>
      </div>

      <div className="flex flex-row gap-2 mt-2">
        <button
          onClick={handleLike}
          className="flex flex-row gap-2 items-center"
        >
          <ThumbsUp
            size={16}
            fill={liked ? "#22c55e" : "none"}
            stroke={liked ? "#15803d" : "#9ca3af"}
          />
          <span className="text-[var(--text-basic)]/80 text-[0.8rem]">54</span>
        </button>
        <button
          onClick={handleDislike}
          className="flex flex-row gap-2 items-center"
        >
          <ThumbsDown
            size={16}
            fill={disliked ? "#ef4444" : "none"}
            stroke={disliked ? "#991b1b" : "#9ca3af"}
          />
          <span className="text-[var(--text-basic)]/80 text-[0.8rem]">4</span>
        </button>
      </div>
    </section>
  );
}
