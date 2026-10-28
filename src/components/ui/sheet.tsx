'use client';

import * as React from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

interface SheetProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  children: React.ReactNode;
}

const SheetContext = React.createContext<{
  open: boolean;
  onOpenChange: (open: boolean) => void;
}>({
  open: false,
  onOpenChange: () => {}
});

function Sheet({ open = false, onOpenChange = () => {}, children }: SheetProps) {
  return (
    <SheetContext.Provider value={{ open, onOpenChange }}>
      {children}
    </SheetContext.Provider>
  );
}

function SheetContent({
  side = "right",
  className,
  children
}: {
  side?: "left" | "right" | "bottom";
  className?: string;
  children: React.ReactNode;
}) {
  const { open, onOpenChange } = React.useContext(SheetContext);

  if (!open) return null;

  const sideClasses = {
    right: "inset-y-0 right-0 w-full sm:w-96 border-l",
    left: "inset-y-0 left-0 w-full sm:w-80 border-r",
    bottom: "inset-x-0 bottom-0 h-auto max-h-[85vh] border-t rounded-t-3xl"
  };

  return (
    <div className="fixed inset-0 z-50 flex">
      {/* Scrim */}
      <div
        className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity"
        onClick={() => onOpenChange(false)}
      />
      {/* Panel */}
      <div
        className={cn(
          "fixed z-50 bg-white shadow-2xl transition ease-in-out duration-300 flex flex-col border-slate-200",
          sideClasses[side],
          className
        )}
      >
        {children}
      </div>
    </div>
  );
}

function SheetClose({
  className,
  onClick
}: {
  className?: string;
  onClick?: () => void;
}) {
  const { onOpenChange } = React.useContext(SheetContext);
  return (
    <button
      type="button"
      onClick={() => {
        onClick?.();
        onOpenChange(false);
      }}
      className={cn(
        "rounded-lg p-1.5 bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors",
        className
      )}
    >
      <X className="h-4 w-4" />
      <span className="sr-only">Close</span>
    </button>
  );
}

export { Sheet, SheetContent, SheetClose };
