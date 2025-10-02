"use client";

import "../../app/globals.css";
import { useState } from "react";
import { useRouter } from "next/navigation";

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

import { useDeleteUser } from "@/hooks/user/deleteUser";

import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

import Loader from "@/components/PreviewCards/Loader";
import Footer from "@/components/Footer/Footer";
import {
  LaptopMinimal,
  UtensilsCrossed,
  Trash2,
  Menu as MenuIcon,
} from "lucide-react";

import { Funnel_Display } from "next/font/google";
import { Separator } from "@/components/ui/separator";

import { getUserById } from "@/hooks/user/getUserById";
import Overview from "@/components/Settings/Overview";

const funnel = Funnel_Display({
  weight: ["300", "400", "500", "600", "700", "800"],
  subsets: ["latin"],
  display: "swap",
});

type Section = "overview" | "pro" | "delete" | null;

function SettingsMenu({
  user,
  setActiveSection,
  onClose,
}: {
  user: any;
  setActiveSection: (s: Section) => void;
  onClose?: () => void;
}) {
  const router = useRouter();
  const { mutate: deleteUser } = useDeleteUser();

  const handleDeleteUser = () => {
    if (!user?.id) return;

    deleteUser(
      { userId: user.id },
      {
        onSuccess: (data) => {
          console.log(data.message);
          router.push("/login");
        },
        onError: (err) => {
          console.error(err.message);
        },
      }
    );
  };

  return (
    <div className="flex flex-col gap-6 w-full">
      <div className="flex flex-row gap-5 items-center">
        <img
          src={user?.avatar}
          alt={`${user?.first_name}'s avatar`}
          className="rounded-full w-[60px] h-[60px] object-cover"
        />
        <div className="flex flex-col">
          <span className="text-xl font-semibold">{user?.first_name}</span>
          <span className="text-sm font-thin text-gray-500">{user?.email}</span>
        </div>
      </div>

      <div>
        <span className="text-sm text-[var(--text-secondary)]/70">
          Overview
        </span>
        <Separator className="my-1 bg-gray-300" />
        <div className="flex flex-col gap-2 mt-2">
          <button
            onClick={() => {
              setActiveSection("overview");
              onClose?.();
            }}
            className="text-md text-[var(--text-secondary)] flex items-center gap-2 cursor-pointer"
          >
            <LaptopMinimal size={16} />
            Overview
          </button>
          <button
            onClick={() => {
              setActiveSection("pro");
              onClose?.();
            }}
            className="text-md text-[var(--text-secondary)] flex items-center mb-2 gap-2 cursor-pointer text-left"
          >
            <UtensilsCrossed size={16} />
            Have a professional account
          </button>
        </div>

        <span className="text-sm text-red-700">Danger zone</span>
        <Separator className="my-2 bg-red-300" />
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <span className="text-md text-[var(--text-secondary)] flex flex-row items-center gap-2 cursor-pointer">
              <Trash2 size={16} />
              Delete my account
            </span>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete your
                account and remove your data from our servers.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                className="bg-red-500 text-white hover:bg-red-600"
                onClick={handleDeleteUser}
              >
                Continue
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
}

export default function ItemPage() {
  const userId = 1;

  const { data: user, isLoading } = getUserById(userId);

  const [activeSection, setActiveSection] = useState<Section>("overview");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  if (isLoading) return <Loader />;

  return (
    <div>
      <div
        className={`${funnel.className} max-w-screen-xl mx-auto min-h-193 lg:min-h-screen sm:px-0 px-5 flex items-center justify-center`}
      >
        <div className="flex flex-col lg:flex-row items-start gap-16 w-full">
          <section className="hidden lg:block lg:w-2/4 w-full">
            <SettingsMenu user={user} setActiveSection={setActiveSection} />
          </section>

          <section className="lg:hidden flex justify-end w-full mb-6 -mt-2 px-10">
            <Dialog open={isMenuOpen} onOpenChange={setIsMenuOpen}>
              <DialogTrigger asChild>
                <button className="p-2 rounded-lg">
                  <MenuIcon size={20} />
                </button>
              </DialogTrigger>
              <DialogContent className="max-w-sm">
                <SettingsMenu
                  user={user}
                  setActiveSection={setActiveSection}
                  onClose={() => setIsMenuOpen(false)}
                />
              </DialogContent>
            </Dialog>
          </section>

          <section className="flex flex-col lg:w-3/4 w-full gap-6 px-10 ">
            {activeSection === "overview" && <Overview user={user} />}

            {activeSection === "pro" && (
              <div className="relative w-full h-[280px] rounded-lg overflow-hidden -mt-4">
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="absolute inset-0 w-full h-full object-cover"
                >
                  <source src="/videos/cookingVideo.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>

                <div className="absolute inset-0 bg-black/40" />

                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-white text-3xl font-semibold">
                    Don't be in a hurry, it's coming soon 😉
                  </span>
                </div>
              </div>
            )}

            {activeSection === "delete" && (
              <>
                <h1 className="uppercase font-bold text-4xl text-red-700">
                  Account Deleted
                </h1>
                <p className="text-md text-gray-700">
                  Your account has been marked for deletion. If this was a
                  mistake, please contact support immediately.
                </p>
              </>
            )}
          </section>
        </div>
      </div>

      <div className="w-full flex justify-center">
        <div className="w-4/5">
          <Footer />
        </div>
      </div>
    </div>
  );
}
