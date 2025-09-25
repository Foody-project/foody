import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { Textarea } from "../ui/textarea";

export default function ReportAProblem() {
  return (
    <AlertDialog>
      <AlertDialogTrigger>Report a problem ?</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="text-2xl pb-3">
            Did you find a problem on Foody? Do you have a suggestion?
          </AlertDialogTitle>
          <AlertDialogDescription>
            <Textarea
              placeholder="Tell us everything"
              className="placeholder:font-thin"
            />
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="font-thin">Cancel</AlertDialogCancel>
          <AlertDialogAction
            style={{
              background: "var(--background-button)",
              boxShadow: "4px 4px 6px rgba(0,0,0,0.1)",
            }}
            className="font-normal"
          >
            Send
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
