import { useState } from "react";
import { Separator } from "../ui/separator";
import { Comment } from "@/types";
import { Rating, RatingButton } from "@/components/ui/shadcn-io/rating";
import { Pen } from "lucide-react";
import { useUpdateComment } from "@/hooks/places/comments/useUpdateComment";
import { DeleteComment } from "./DeleteComment";
import { useAuth } from "@/contexts/AuthContext";
import Error from "../Error";

interface CommentProps {
  comment: Comment;
  onRefresh?: () => void;
}

export function CommentItem({ comment, onRefresh }: CommentProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedComment, setEditedComment] = useState(comment.comment);
  const [editedRating, setEditedRating] = useState(comment.rating);

  const { user } = useAuth();
  const isAuthor = user?.id === comment.author.id;

  const updateCommentMutation = useUpdateComment();

  const handleSave = () => {
    updateCommentMutation.mutate(
      {
        commentId: comment.id,
        userId: comment.author.id,
        placeId: comment.placeId,
        comment: editedComment,
        rating: editedRating,
      },
      {
        onSuccess: () => {
          setIsEditing(false);
          onRefresh?.();
        },
        onError: () => {
          <Error />;
        },
      }
    );
  };

  const formatName = (firstName: string, lastName: string): string => {
    return `${firstName} ${lastName.charAt(0)}.`;
  };

  const displayName = formatName(
    comment.author.first_name,
    comment.author.last_name
  );

  return (
    <section className="py-2 px-4">
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <div className="flex flex-row items-center">
            <div className="flex items-center gap-2">
              <div className="flex flex-row items-center justify-center bg-gray-300 w-10 h-10 rounded-full">
                <img
                  src={comment.author.avatar}
                  alt=""
                  className="rounded-full"
                />
              </div>
            </div>
            <div className="flex flex-col mt-2 ml-2 text-sm text-[var(--text-basic)] font-thin mb-2">
              <span className="text-[var(--text-basic)] font-medium">
                {displayName}
              </span>
              {isEditing ? (
                <div className="relative mt-1 w-[160%]">
                  <textarea
                    className="px-3 py-2 w-43 lg:w-full text-sm rounded-md border border-[var(--text-orange)] bg-gray-200 text-[var(--text-basic)] focus:outline-none focus:ring-2 focus:ring-[var(--text-orange)] focus:border-transparent transition-all duration-200 resize-none shadow-sm placeholder:text-[var(--text-basic)]/40"
                    value={editedComment}
                    onChange={(e) => setEditedComment(e.target.value)}
                    rows={3}
                    placeholder="Update your comment here..."
                  />
                  <div className="flex justify-end mt-2">
                    <button
                      className="text-xs px-3 py-1 bg-[var(--text-orange)] text-white rounded hover:bg-orange-500 transition-colors duration-200"
                      onClick={handleSave}
                    >
                      Enregistrer
                    </button>
                  </div>
                </div>
              ) : (
                <span>{comment.comment}</span>
              )}
            </div>
          </div>
          <div className="flex flex-col items-end">
            <div className="flex flex-row gap-2 pb-2">
              {isAuthor && !isEditing && (
                <button onClick={() => setIsEditing(true)}>
                  <Pen color="var(--icon-basic)" size={17} />
                </button>
              )}
              {isAuthor && (
                <DeleteComment comment={comment} onRefresh={onRefresh} />
              )}
            </div>
            <Rating
              defaultValue={editedRating}
              readOnly={!isEditing}
              onChange={(event) => {
                const value = Number(event.currentTarget.value);
                setEditedRating(value);
              }}
            >
              {Array.from({ length: 5 }).map((_, index) => (
                <RatingButton
                  key={index}
                  className="text-[var(--text-orange)]"
                />
              ))}
            </Rating>
            <span className="text-xs font-light text-[var(--text-basic)]/50 px-2 py-1">
              {new Date(comment.createdAt).toLocaleTimeString("fr-FR", {
                hour: "2-digit",
                minute: "2-digit",
                hour12: false,
              })}
            </span>
          </div>
        </div>
        <Separator />
      </div>
    </section>
  );
}
