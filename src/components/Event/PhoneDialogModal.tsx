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
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { Phone } from 'lucide-react';

interface PhoneDialogModalProps {
  phoneNumber: string;
}

export function PhoneDialogModal({ phoneNumber }: PhoneDialogModalProps) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Phone size={16}/>
      </AlertDialogTrigger>
        <AlertDialogContent className="bg-[#121212] shadow-md drop-shadow-[0_0_10px_rgba(255,255,255,0.05)]">
        <AlertDialogHeader>
          <AlertDialogTitle className="sr-only"></AlertDialogTitle>
          <Input disabled placeholder={phoneNumber} />
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction className="bg-[#774c87] text-gray-300 font-normal">Close</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}