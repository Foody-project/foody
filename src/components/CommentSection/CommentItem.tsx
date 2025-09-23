import { Separator } from "../ui/separator";
import { Comment } from "@/types";
interface CommentProps {
  comment: Comment;
}

export function CommentItem({ comment }: CommentProps) {
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
                <span className="font-thin text-[0.7rem] text-center">CD</span>
              </div>
            </div>
            <div className="flex flex-col mt-2 ml-2 text-sm text-[var(--text-basic)] font-thin mb-2">
              <span className="text-[var(--text-basic)] font-medium">
                {displayName}
              </span>
              <span>{comment.comment}</span>
            </div>
          </div>
          <span className="text-xs font-light text-[var(--text-basic)]/50 px-2 py-1">
            {new Date(comment.createdAt).toLocaleTimeString("fr-FR", {
              hour: "2-digit",
              minute: "2-digit",
              hour12: false,
            })}
          </span>
        </div>
        <Separator />
      </div>
    </section>
  );
}
