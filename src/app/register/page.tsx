"use client";
import * as React from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { PasswordInput } from "@/features/Login/PasswordInput";
import Footer from "@/components/Footer/Footer";
import { CornerUpLeft } from "lucide-react";
import "../../app/globals.css";
import CircularProgress from "@mui/material/CircularProgress";

import { useRegister } from "@/hooks/register/useRegister";
import { Lexend } from "next/font/google";

const lexend = Lexend({
  weight: ["300", "400", "500", "600", "700", "800"],
  subsets: ["latin"],
  display: "swap",
});

export default function RegisterModal() {
  const router = useRouter();

  const { registerUser, loading, error, success } = useRegister();

  const [showAvatarSelection, setShowAvatarSelection] = useState(false);

  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [selectedLink, setSelectedLink] = useState("");

  const images = [
    "https://media.ouest-france.fr/v1/pictures/7ea2b00556db4e16afb296c1fb8d22e8-arthur-fils.jpg?client_id=cmsfront&sign=d940045f134d79a9180d01b30fffbb1117e3fc9b812764ceac55abce689f93b8",
    "https://images.unsplash.com/photo-1575936123452-b67c3203c357?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8fDA%3D",
    "https://media.ouest-france.fr/v1/pictures/7ea2b00556db4e16afb296c1fb8d22e8-arthur-fils.jpg?client_id=cmsfront&sign=d940045f134d79a9180d01b30fffbb1117e3fc9b812764ceac55abce689f93b8",
    "https://media.ouest-france.fr/v1/pictures/7ea2b00556db4e16afb296c1fb8d22e8-arthur-fils.jpg?client_id=cmsfront&sign=d940045f134d79a9180d01b30fffbb1117e3fc9b812764ceac55abce689f93b8",
    "https://letsenhance.io/static/73136da51c245e80edc6ccfe44888a99/396e9/MainBefore.jpg",
    "https://media.ouest-france.fr/v1/pictures/7ea2b00556db4e16afb296c1fb8d22e8-arthur-fils.jpg?client_id=cmsfront&sign=d940045f134d79a9180d01b30fffbb1117e3fc9b812764ceac55abce689f93b8",
  ];

  const [formData, setFormData] = React.useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    terms: false,
    newsletter: false,
    avatar: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (name: string, checked: boolean) => {
    setFormData((prev) => ({ ...prev, [name]: checked }));
  };

  const handleAvatarChange = (index: number) => {
    setSelectedIndex(index);
    setSelectedLink(images[index]);
    setFormData((prev) => ({ ...prev, avatar: images[index] }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    setShowAvatarSelection(true);
  };

  const handleStart = async () => {
    if (!formData.avatar) {
      const defaultAvatar = images[0];
      setFormData((prev) => ({ ...prev, avatar: defaultAvatar }));
    }

    await registerUser({ ...formData, avatar: formData.avatar || images[0] });
  };

  React.useEffect(() => {
    if (success) router.replace("/restaurants");
  }, [success, router]);

  return (
    <div className="w-4/5 mx-auto">
      {success && (
        <>
          <div className="w-2/5 h-screen flex flex-col justify-center mx-auto">
            <div className="w-full flex justify-start mb-6">
              <Button
                variant="outline"
                className="text-white font-normal flex items-center gap-2 !border-[var(--text-orange)]"
                onClick={() => router.replace("/")}
              >
                <CornerUpLeft size={18} color="black" />
              </Button>
            </div>
            <span className="uppercase font-bold text-3xl text-center text-[var(--text-orange)]">
              Register
            </span>
            <div className="mt-6 text-center">
              <p className="text-black/80">
                Registration successful — redirecting to login...
              </p>
            </div>
          </div>
          <Footer />
        </>
      )}

      {!showAvatarSelection && !success && (
        <div className="w-2/5 h-screen flex flex-col justify-center mx-auto">
          <div className="w-full flex justify-start mb-6">
            <Button
              variant="outline"
              className="text-white font-normal flex items-center gap-2 !border-[var(--text-orange)]"
              onClick={() => router.replace("/")}
            >
              <CornerUpLeft size={18} color="black" />
            </Button>
          </div>
          <span className="uppercase font-bold text-3xl text-center text-[var(--text-orange)]">
            Register
          </span>
          <form onSubmit={handleSubmit}>
            <Input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              placeholder="First name"
              className="w-full rounded-md mt-5 mb-3 text-black text-[0.8rem] font-[400] border border-[#807f7e] focus:border-[var(--text-orange)] placeholder:text-[0.8rem]"
            />
            <Input
              type="text"
              placeholder="Last name"
              className="w-full rounded-md mt-5 mb-3 text-black text-[0.8rem] font-[400] border border-[#807f7e] focus:border-[var(--text-orange)] placeholder:text-[0.8rem]"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
            />
            <Input
              type="email"
              placeholder="Email"
              className="w-full rounded-md mt-5 mb-3 text-black text-[0.8rem] font-[400] border border-[#807f7e] focus:border-[var(--text-orange)] placeholder:text-[0.8rem]"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
            <PasswordInput
              placeholder="Password"
              className="w-full rounded-md mt-5 mb-3 text-black text-[0.8rem] font-[400] border border-[#807f7e] focus:border-[var(--text-orange)] placeholder:text-[0.8rem]"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
            <PasswordInput
              placeholder="Rewrite your password"
              className="w-full rounded-md mt-5 mb-3 text-black text-[0.8rem] font-[400] border border-[#807f7e] focus:border-[var(--text-orange)] placeholder:text-[0.8rem]"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
            <div className="flex flex-col gap-2 mt-5">
              <div className="flex gap-3 items-center">
                <Checkbox
                  id="terms"
                  className="!border-[var(--text-orange)] data-[state=checked]:border-[var(--text-orange)]"
                  checked={formData.terms}
                  onCheckedChange={(checked) =>
                    handleCheckboxChange("terms", Boolean(checked))
                  }
                />
                <Label
                  htmlFor="terms"
                  className="text-black font-thin text-[0.85rem]"
                >
                  Accept terms and conditions
                </Label>
              </div>
              <div className="flex gap-3 items-center">
                <Checkbox
                  id="newsletter"
                  className="!border-[var(--text-orange)] data-[state=checked]:border-[var(--text-orange)]"
                  checked={formData.newsletter}
                  onCheckedChange={(checked) =>
                    handleCheckboxChange("newsletter", Boolean(checked))
                  }
                />
                <Label
                  htmlFor="newsletter"
                  className="text-black font-thin text-[0.85rem]"
                >
                  Accept to receive few mails (not many we promise)
                </Label>
              </div>
            </div>
            <div className="mt-5 flex flex-col justify-center items-center">
              <Button
                type="submit"
                variant="secondary"
                className={`${lexend.className} text-white [background-image:var(--background-button)] [box-shadow:4px_4px_6px_rgba(0,0,0,0.2)] font-[400] flex items-center justify-center gap-2`}
                disabled={loading}
              >
                <span className="relative flex items-center justify-center w-[5rem] h-[1.5rem]">
                  {loading && (
                    <CircularProgress
                      size={20}
                      sx={{ color: "white" }}
                      className="absolute"
                    />
                  )}
                  <span className={`${loading ? "invisible" : ""}`}>Login</span>
                </span>
              </Button>

              {error && <p className="text-red-500 mt-2">{error}</p>}
              <span
                className="block text-center mt-2 text-[12px] font-thin text-black cursor-pointer hover:underline"
                onClick={() => router.replace("/login")}
              >
                You have an account?
              </span>
            </div>
          </form>
        </div>
      )}

      {showAvatarSelection && !success && (
        <div className="flex flex-col gap-10 justify-center items-center h-screen">
          <div className="flex flex-col items-center">
            <span className="text-4xl font-bold">
              Welcome {formData.firstName || "User"},
            </span>
            <span className="text-xl font-normal text-black/70">
              choose an avatar
            </span>
          </div>
          <div className="flex flex-row justify-around gap-4 mt-4">
            {images.map((src, index) => (
              <img
                key={index}
                src={src}
                alt={`image-${index}`}
                onClick={() => handleAvatarChange(index)}
                className={`w-43 h-43 object-cover rounded-full border-4 cursor-pointer transition duration-300 ease-in-out transform hover:scale-105 ${
                  selectedIndex === index
                    ? "border-[var(--text-orange)] scale-110"
                    : "border-gray-300/0"
                }`}
              />
            ))}
          </div>
          <div className="flex flex-row justify-end mt-6">
            <Button
              variant="ghost"
              className="font-normal border-1 border-[var(--text-orange)]"
              disabled={loading}
              onClick={async () => {
                await handleStart();
                router.push("/restaurants");
              }}
            >
              Start
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
