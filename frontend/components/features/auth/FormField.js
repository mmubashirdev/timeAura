"use client";

import { forwardRef } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

/**
 * A labeled input with optional left icon and inline error.
 * Uses shadcn's Input + Label under the hood.
 */
const FormField = forwardRef(function FormField(
  { id, label, icon: Icon, error, className, children, ...props },
  ref,
) {
  const inputEl = children ?? (
    <Input
      id={id}
      ref={ref}
      aria-invalid={!!error}
      aria-describedby={error ? `${id}-error` : undefined}
      className={cn("h-[46px] rounded-2xl", Icon && "pl-10", className)}
      {...props}
    />
  );

  return (
    <div className="flex flex-col gap-2">
      <Label
        htmlFor={id}
        className="text-[11px] font-semibold tracking-[0.15em] uppercase text-neutral-800"
      >
        {label}
      </Label>
      <div className="relative">
        {Icon && (
          <Icon
            className="absolute left-3 top-1/2 -translate-y-1/2 w-[18px] h-[18px] text-neutral-400 z-10 pointer-events-none"
            strokeWidth={1.8}
            aria-hidden="true"
          />
        )}
        {inputEl}
      </div>
      {error && (
        <p
          id={`${id}-error`}
          role="alert"
          className="text-xs text-destructive pl-1"
        >
          {error}
        </p>
      )}
    </div>
  );
});

export default FormField;
