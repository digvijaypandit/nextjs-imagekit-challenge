"use client";

import { cn } from "@/lib/utils";
import * as React from "react";

type SwitchProps = {
  checked?: boolean;
  defaultChecked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  disabled?: boolean;
  label?: string;
};

export function Switch({
  checked,
  defaultChecked,
  onCheckedChange,
  disabled,
  label,
}: SwitchProps) {
  const [internalChecked, setInternalChecked] = React.useState(defaultChecked || false);
  const isControlled = checked !== undefined;
  const current = isControlled ? checked : internalChecked;

  const toggle = () => {
    if (disabled) return;
    const newState = !current;
    if (!isControlled) setInternalChecked(newState);
    onCheckedChange?.(newState);
  };

  return (
    <div className="flex items-center gap-2">
      <button
        type="button"
        role="switch"
        aria-checked={current}
        onClick={toggle}
        disabled={disabled}
        className={cn(
          "relative pt-0.5 pl-0.5 inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500",
          current ? "bg-pink-500 dark:bg-pink-400" : "bg-gray-300 dark:bg-gray-600",
          disabled && "opacity-50 cursor-not-allowed"
        )}
      >
        <span
          className={cn(
            "pointer-events-none inline-block h-5 w-5 transform rounded-full bg-background shadow transition-transform",
            current ? "translate-x-5" : "translate-x-0"
          )}
        />
      </button>
      {label && <span className="text-xs text-foreground/70">{label}</span>}
    </div>
  );
}
