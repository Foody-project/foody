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
import { useRouter } from "next/navigation";

import { useAuth } from "@/contexts/AuthContext";

import Toast from "@/features/Toasts/Toast";

import { Textarea } from "../ui/textarea";
import { useState } from "react";

export default function ReportAProblem() {
  const [reported, setReported] = useState(false);
  const router = useRouter();

  const { user } = useAuth();

  const redirectToLogin = () => {
    if (!user) {
      router.push("/login");
      return;
    }
  };

  return (
    <>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <span
            onClick={(e) => {
              if (!user) {
                e.preventDefault();
                router.push("/login");
              }
            }}
            className="hover:cursor-pointer"
          >
            Report a problem ?
          </span>
        </AlertDialogTrigger>
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
      {reported && <Toast title="Thanks for your report" type="Warning" />}
    </>
  );
}
