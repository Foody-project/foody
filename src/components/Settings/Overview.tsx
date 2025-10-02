"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "../ui/button";
import { User } from "@/types";
import { Pencil } from "lucide-react";
import { useUpdateUser } from "@/hooks/user/updateUser";
import { useUpdatePassword } from "@/hooks/user/updatePassword";
import { useDeleteUser } from "@/hooks/user/deleteUser";
import { useRouter } from "next/navigation";

import Toast from "@/features/Toasts/Toast";

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface OverviewProps {
  user?: User;
}

export default function Overview({ user }: OverviewProps) {
  const [newEmail, setNewEmail] = useState(user?.email);
  const [errorMessage, setErrorMessage] = useState("");

  const [isEmailDialogOpen, setIsEmailDialogOpen] = useState(false);
  const [isPasswordDialogOpen, setIsPasswordDialogOpen] = useState(false);

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const [successMessage, setSuccessMessage] = useState(false);

  const { mutate: updateUser, isPending } = useUpdateUser();
  const { mutate: updatePassword, isPending: isPasswordPending } =
    useUpdatePassword();

  const handleEmailUpdate = () => {
    if (!user?.id || !newEmail) return;

    updateUser(
      { userId: user.id, data: { email: newEmail } },
      {
        onSuccess: () => {
          setIsEmailDialogOpen(false);
          setErrorMessage("");
          setSuccessMessage(true);
          setTimeout(() => {
            setSuccessMessage(false);
          }, 1500);
        },
        onError: (error) => {
          setErrorMessage(error.message);
        },
      }
    );
  };

  const handlePasswordUpdate = () => {
    if (!user?.id || !currentPassword || !newPassword || !confirmPassword) {
      setPasswordError("Tous les champs sont requis");
      return;
    }

    if (newPassword !== confirmPassword) {
      setPasswordError("Les mots de passe ne correspondent pas");
      return;
    }

    updatePassword(
      { userId: user.id, currentPassword, newPassword },
      {
        onSuccess: () => {
          setIsPasswordDialogOpen(false);
          setPasswordError("");
          setCurrentPassword("");
          setNewPassword("");
          setConfirmPassword("");
          setSuccessMessage(true);
          setTimeout(() => {
            setSuccessMessage(false);
          }, 1500);
        },
        onError: (error) => {
          setPasswordError(error.message);
        },
      }
    );
  };

  return (
    <div>
      <span className="text-xl text-gray-500">Overview</span>
      <section className="py-3">
        <div className="flex flex-row gap-5 py-2">
          <div className="grid w-full max-w-sm items-center gap-2">
            <Label htmlFor="first_name" className="text-gray-500 font-thin">
              First name
            </Label>
            <Input
              type="text"
              id="first_name"
              placeholder={user?.first_name}
              className="border !border-gray-300 rounded-sm placeholder:font-thin placeholder:text-gray-500/80"
              readOnly
            />
          </div>
          <div className="grid w-full max-w-sm items-center gap-2">
            <Label htmlFor="last_name" className="text-gray-500 font-thin">
              Last name
            </Label>
            <Input
              type="text"
              id="last_name"
              placeholder={user?.last_name}
              className="border !border-gray-300 rounded-sm placeholder:font-thin placeholder:text-gray-500/80"
              readOnly
            />
          </div>
        </div>

        <div className="flex flex-row items-end gap-5 py-2">
          <div className="grid w-full max-w-sm items-center gap-2">
            <div className="flex flex-row justify-between">
              <Label htmlFor="email" className="text-gray-500 font-thin">
                Email
              </Label>
              <AlertDialog
                open={isEmailDialogOpen}
                onOpenChange={setIsEmailDialogOpen}
              >
                <AlertDialogTrigger asChild>
                  <Pencil
                    size={14}
                    color="gray"
                    onClick={() => setIsEmailDialogOpen(true)}
                  />
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle className="text-2xl">
                      You want to update your email?
                    </AlertDialogTitle>
                    <AlertDialogDescription className="flex flex-col gap-2">
                      <div>
                        <span>Current</span>
                        <Input
                          type="email"
                          placeholder={user?.email}
                          readOnly
                          className="border !border-gray-300 rounded-sm placeholder:font-thin placeholder:text-[var(--text-basic)]/70"
                        />
                      </div>
                      <div>
                        <span>New</span>
                        <Input
                          type="email"
                          placeholder="New email"
                          value={newEmail}
                          onChange={(e) => setNewEmail(e.target.value)}
                          className="border !border-gray-300 rounded-sm placeholder:font-thin placeholder:text-[var(--text-basic)]"
                        />
                      </div>
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel
                      onClick={() => setIsEmailDialogOpen(false)}
                    >
                      Cancel
                    </AlertDialogCancel>
                    <Button
                      className="bg-[var(--text-orange)] text-white"
                      onClick={handleEmailUpdate}
                      disabled={isPending}
                    >
                      {isPending ? "Updating..." : "Update"}
                    </Button>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>

            <Input
              type="email"
              placeholder={user?.email}
              readOnly
              className="border !border-gray-300 rounded-sm placeholder:font-thin placeholder:text-[var(--text-basic)]"
            />
          </div>
          {passwordError && (
            <div className="fixed bottom-4 right-4 z-[9999]">
              <Toast title={passwordError} type="Error" />
            </div>
          )}
          {successMessage && (
            <div className="fixed bottom-4 right-4 z-[9999]">
              <Toast title="Success" type="Success" />
            </div>
          )}

          <div>
            <AlertDialog
              open={isPasswordDialogOpen}
              onOpenChange={setIsPasswordDialogOpen}
            >
              <AlertDialogTrigger asChild>
                <Button
                  variant="secondary"
                  className="text-white font-thin hover:bg-[var(--text-orange-secondary)] bg-[var(--text-orange)] cursor-pointer"
                  onClick={() => setIsPasswordDialogOpen(true)}
                >
                  Update password
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle className="text-2xl">
                    You want to update your password?
                  </AlertDialogTitle>
                  <AlertDialogDescription className="flex flex-col gap-2">
                    <div>
                      <span>Current</span>
                      <Input
                        type="password"
                        placeholder="Write your current password"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        className="border !border-gray-300 rounded-sm placeholder:font-thin placeholder:text-[var(--text-basic)]/70"
                      />
                    </div>
                    <div>
                      <span>New</span>
                      <div className="flex flex-col gap-2">
                        <Input
                          type="password"
                          placeholder="Write your new password"
                          value={newPassword}
                          onChange={(e) => {
                            setNewPassword(e.target.value);
                          }}
                          className="border !border-gray-300 rounded-sm placeholder:font-thin placeholder:text-[var(--text-basic)]"
                        />
                        <Input
                          type="password"
                          placeholder="Confirm new password"
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          className="border !border-gray-300 rounded-sm placeholder:font-thin placeholder:text-[var(--text-basic)]"
                        />
                      </div>
                    </div>
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel
                    onClick={() => setIsPasswordDialogOpen(false)}
                  >
                    Cancel
                  </AlertDialogCancel>
                  <Button
                    className="bg-[var(--text-orange)] text-white"
                    onClick={handlePasswordUpdate}
                    disabled={isPasswordPending}
                  >
                    {isPasswordPending ? "Updating..." : "Update"}
                  </Button>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
          {errorMessage && (
            <div className="fixed bottom-4 right-4 z-[9999]">
              <Toast title={errorMessage} type="Error" />
            </div>
          )}
          {successMessage && (
            <div className="fixed bottom-4 right-4 z-[9999]">
              <Toast title="Success" type="Success" />
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
