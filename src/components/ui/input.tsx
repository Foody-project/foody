import * as React from "react"
import { cn } from "@/lib/utils"

export interface InputProps extends React.ComponentProps<"input"> {
  icon?: React.ReactNode
}

function Input({ className, type, icon, ...props }: InputProps) {
  return (
    <div className="relative w-full">
      <input
        type={type}
        data-slot="input"
        className={cn(
          "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none md:text-sm",
          icon ? "pr-10" : "",
          "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
          "rounded-2xl",
          className
        )}
        {...props}
      />
      {icon && (
        <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
          {icon}
        </div>
      )}
    </div>
  )
}

export { Input }