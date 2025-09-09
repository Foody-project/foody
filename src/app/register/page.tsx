"use client";
import * as React from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { PasswordInput } from "@/components/Login/PasswordInput";
import Footer from "@/components/Footer/Footer";
import { CornerUpLeft } from "lucide-react";
import "../../app/globals.css";

import { useRegister } from "../../lib/hooks/register/useRegister";

export default function RegisterModal() {
  const router = useRouter();

  const { registerUser, loading, error, success } = useRegister();

  const [formData, setFormData] = React.useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    terms: false,
    newsletter: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (name: string, checked: boolean) => {
    setFormData((prev) => ({ ...prev, [name]: checked }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    await registerUser(formData);
  };

  React.useEffect(() => {
    if (success) router.replace("/login");
  }, [success, router]);

  return (
    <div className="w-4/5 mx-auto">
      <div className="w-2/5 h-screen flex flex-col justify-center mx-auto">
        <div className="w-full flex justify-start mb-6">
          <Button
            variant="outline"
            className="text-white font-normal flex items-center gap-2"
            onClick={() => router.replace("/")}
          >
            <CornerUpLeft size={18} />
          </Button>
        </div>
        <span className="uppercase font-bold text-3xl text-center text-white">
          Register
        </span>
        <form onSubmit={handleSubmit}>
          <Input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            placeholder="First name"
            className="w-full rounded-md mt-5 mb-3 text-black font-[400] border border-[#807f7e] focus:border-purple-500"
          />
          <Input
            type="text"
            placeholder="Last name"
            className="w-full rounded-md mt-5 mb-3 text-black font-[400] border border-[#807f7e] focus:border-purple-500"
            name="lastName"
            value={formData.firstName}
            onChange={handleChange}
          />
          <Input
            type="email"
            placeholder="Email"
            className="w-full rounded-md mt-5 mb-3 text-black font-[400] border border-[#807f7e] focus:border-purple-500"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          <PasswordInput
            placeholder="Password"
            className="w-full rounded-md text-black font-[400] border border-[#807f7e] focus:border-purple-500 mb-3"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
          <PasswordInput
            placeholder="Rewrite your password"
            className="w-full rounded-md text-black font-[400] border border-[#807f7e] focus:border-purple-500"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
          />
          <div className="flex flex-col gap-2 mt-5">
            <div className="flex gap-3 items-center">
              <Checkbox
                id="terms"
                className="border-purple-400 data-[state=checked]:border-purple-500"
                checked={formData.terms}
                onCheckedChange={(checked) =>
                  handleCheckboxChange("terms", Boolean(checked))
                }
              />
              <Label htmlFor="terms" className="text-white/50 font-thin">
                Accept terms and conditions
              </Label>
            </div>
            <div className="flex gap-3 items-center">
              <Checkbox
                id="newsletter"
                className="border-purple-400 data-[state=checked]:border-purple-500"
                checked={formData.newsletter}
                onCheckedChange={(checked) =>
                  handleCheckboxChange("newsletter", Boolean(checked))
                }
              />
              <Label htmlFor="newsletter" className="text-white/50 font-thin">
                Accept to receive few mails (not many we promise)
              </Label>
            </div>
          </div>
          <div className="mt-5 w-full">
            <Button
              type="submit"
              variant="secondary"
              className="w-full mt-5 bg-white/20 text-purple-400"
            >
              {loading ? "Signing up..." : "Sign up"}
            </Button>

            {error && <p className="text-red-500 mt-2">{error}</p>}
            <span
              className="block text-center mt-2 text-[12px] font-thin text-gray-400 cursor-pointer hover:underline"
              onClick={() => router.replace("/login")}
            >
              You have an account?
            </span>
          </div>
        </form>
      </div>
      <Footer />
    </div>
  );
}
