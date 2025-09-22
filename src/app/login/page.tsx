"use client";
import * as React from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PasswordInput } from "@/features/Login/PasswordInput";
import Footer from "@/components/Footer/Footer";
import { CornerUpLeft } from "lucide-react";
import "../../app/globals.css";
import CircularProgress from "@mui/material/CircularProgress";

import { Lexend } from "next/font/google";

const lexend = Lexend({
  weight: ["300", "400", "500", "600", "700", "800"],
  subsets: ["latin"],
  display: "swap",
});

export default function LoginModal() {
  const router = useRouter();
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [success, setSuccess] = React.useState(false);
  const [user, setUser] = React.useState<any>(null);
  const [formData, setFormData] = React.useState({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        "https://foody-api-production-b7f6.up.railway.app/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.message || "Something went wrong");
      }
      setUser(result.user || null);
      setSuccess(true);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    if (success) router.replace("/");
  }, [success, router]);

  return (
    <div className="w-4/5 mx-auto">
      <div className="w-2/5 h-screen flex flex-col justify-center items-center mx-auto">
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
          Login
        </span>
        <Input
          name="email"
          type="email"
          placeholder="Email"
          className="w-full rounded-md mt-5 mb-3 text-black font-[400] border border-[#807f7e] focus:border-[var(--text-orange)]"
          onChange={handleChange}
        />
        <PasswordInput
          name="password"
          placeholder="Password"
          className="w-full rounded-md text-black font-[400] border border-[#807f7e] focus:border-[var(--text-orange)]"
          onChange={handleChange}
        />
        <div className="w-full flex justify-end">
          <span className="mt-2 text-[10px] font-thin text-black cursor-pointer hover:underline">
            Password forgotten ?
          </span>
        </div>
        <div className="mt-5 flex flex-col justify-center items-center">
          <Button
            variant="secondary"
            className={`${lexend.className} text-white [background-image:var(--background-button)] [box-shadow:4px_4px_6px_rgba(0,0,0,0.2)] font-[400] flex items-center justify-center gap-2`}
            onClick={handleSubmit}
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
          <span
            className="block text-center mt-2 text-[12px] font-thin text-black cursor-pointer hover:underline"
            onClick={() => router.replace("/register")}
          >
            Don't have an account yet? Sign up !
          </span>
        </div>
      </div>
      <Footer />
    </div>
  );
}
