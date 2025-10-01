import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { useDeleteComment } from "@/hooks/places/comments/useDeleteComment";
import { Comment } from "@/types";
import { Trash2 } from "lucide-react";

interface DeleteCommentProps {
  comment: Comment;
  onRefresh?: () => void;
}

export function DeleteComment({ comment, onRefresh }: DeleteCommentProps) {
  const deleteCommentMutation = useDeleteComment();

  const handleDelete = () => {
    deleteCommentMutation.mutate(
      {
        commentId: comment.id,
        placeId: comment.placeId,
      },
      {
        onSuccess: () => {
          onRefresh?.();
        },
      }
    );
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <button>
          <Trash2 color="var(--icon-basic)" size={17} />
        </button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="text-[var(--text-basic)]">
            Are you sure you want to delete your comment ?
          </AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete}>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
