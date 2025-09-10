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
            className="w-full rounded-md mt-5 mb-3 text-black font-[400] border border-[#807f7e] focus:border-[var(--text-orange)]"
          />
          <Input
            type="text"
            placeholder="Last name"
            className="w-full rounded-md mt-5 mb-3 text-black font-[400] border border-[#807f7e] focus:border-[var(--text-orange)]"
            name="lastName"
            value={formData.firstName}
            onChange={handleChange}
          />
          <Input
            type="email"
            placeholder="Email"
            className="w-full rounded-md mt-5 mb-3 text-black font-[400] border border-[#807f7e] focus:border-[var(--text-orange)]"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          <PasswordInput
            placeholder="Password"
            className="w-full rounded-md text-black font-[400] border border-[#807f7e] focus:border-[var(--text-orange)] mb-3"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
          <PasswordInput
            placeholder="Rewrite your password"
            className="w-full rounded-md text-black font-[400] border border-[#807f7e] focus:border-[var(--text-orange)]"
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
              className=" mt-5 [background-image:var(--background-button)] [box-shadow:4px_4px_6px_rgba(0,0,0,0.2)] text-white"
            >
              {loading ? "Signing up..." : "Sign up"}
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
      <Footer />
    </div>
  );
}
