import { useEffect, useState } from "react";
import { CheckCircle2Icon, XCircleIcon, AlertTriangleIcon } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

type ToastType = "Success" | "Error" | "Warning";

interface ToastProps {
  title: string;
  subtitle?: string;
  type?: ToastType;
}

export default function Toast({
  title,
  subtitle,
  type = "Success",
}: ToastProps) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  const getColor = () => {
    switch (type) {
      case "Success":
        return "text-green-600 border-green-600";
      case "Error":
        return "text-red-600 border-red-600";
      case "Warning":
        return "text-yellow-500 border-yellow-500";
      default:
        return "text-gray-600 border-gray-400";
    }
  };

  const getIcon = () => {
    switch (type) {
      case "Success":
        return <CheckCircle2Icon className="stroke-green-600" />;
      case "Error":
        return <XCircleIcon className="stroke-red-600" />;
      case "Warning":
        return <AlertTriangleIcon className="stroke-yellow-500" />;
      default:
        return null;
    }
  };

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 lg:left-auto lg:right-6 lg:translate-x-0">
      <div
        className={`transition-all duration-700 ease-in-out ${
          visible ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className={`grid min-w-[20rem] items-start gap-4 p-4`}>
          <Alert className={`border ${getColor().split(" ")[1]}`}>
            {getIcon()}
            <AlertTitle className={getColor().split(" ")[0]}>
              {title}
            </AlertTitle>
            <AlertDescription className={getColor().split(" ")[0]}>
              {subtitle}
            </AlertDescription>
          </Alert>
        </div>
      </div>
    </div>
  );
}
