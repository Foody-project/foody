import { CheckCircle2Icon } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface ToastProps {
  label: string;
  subLabel: string;
  type: "success" | "cancelled" | "error" | "default";
}

export function Toast({ label, subLabel, type }: ToastProps) {
  const color =
    type === "success"
      ? "#22c55e"
      : type === "cancelled" || type === "error"
      ? "#ef4444"
      : "#000000";

  return (
    <div
      className="fixed bottom-6 right-6 z-50 w-[20rem] rounded-xl animate-fade-in-out"
      style={{
        boxShadow: `0 0 12px 1px ${color}`,
      }}
    >
      <Alert className="flex items-start gap-3 border-0 bg-white/70">
        <CheckCircle2Icon style={{ color }} />
        <div>
          <AlertTitle style={{ color }} className="font-semibold">
            {label}
          </AlertTitle>
          <AlertDescription className="text-[var(--text-basic)] font-thin text-[0.8rem]">
            {subLabel}
          </AlertDescription>
        </div>
      </Alert>
    </div>
  );
}
