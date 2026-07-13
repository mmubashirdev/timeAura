"use client";

import { forwardRef } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

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
      className={cn("h-11 rounded-xl text-sm", Icon && "pl-9", className)}
      {...props}
    />
  );

  return (
    <div className="flex flex-col gap-1.5">
      <Label
        htmlFor={id}
        className="text-[10px] font-semibold tracking-[0.15em] uppercase text-neutral-800"
      >
        {label}
      </Label>
      <div className="relative">
        {Icon && (
          <Icon
            className="absolute left-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400 z-10 pointer-events-none"
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
          className="text-[11px] text-destructive pl-1"
        >
          {error}
        </p>
      )}
    </div>
  );
});

export default FormField;
