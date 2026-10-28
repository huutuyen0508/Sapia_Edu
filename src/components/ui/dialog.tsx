'use client';

import * as React from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

interface DialogProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  children: React.ReactNode;
}

const DialogContext = React.createContext<{
  open: boolean;
  onOpenChange: (open: boolean) => void;
}>({
  open: false,
  onOpenChange: () => {}
});

function Dialog({ open = false, onOpenChange = () => {}, children }: DialogProps) {
  React.useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [open]);

  return (
    <DialogContext.Provider value={{ open, onOpenChange }}>
      {children}
    </DialogContext.Provider>
  );
}

function DialogContent({
  children,
  className,
  onClose
}: {
  children: React.ReactNode;
  className?: string;
  onClose?: () => void;
}) {
  const { open, onOpenChange } = React.useContext(DialogContext);

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
    >
      {/* Scrim / Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity animate-in fade-in"
        onClick={() => {
          onClose?.();
          onOpenChange(false);
        }}
      />
      {/* Dialog Body */}
      <div
        className={cn(
          "relative z-10 w-full max-w-lg rounded-3xl bg-white p-6 sm:p-7 shadow-2xl border border-slate-200 animate-in zoom-in-95 duration-200",
          className
        )}
      >
        {children}
      </div>
    </div>
  );
}

function DialogHeader({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("flex flex-col space-y-1.5 text-center sm:text-left", className)}
      {...props}
    />
  );
}

function DialogTitle({
  className,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3
      className={cn(
        "font-serif-title text-xl sm:text-2xl font-black text-slate-900 tracking-tight",
        className
      )}
      {...props}
    />
  );
}

function DialogDescription({
  className,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      className={cn("text-xs sm:text-sm text-slate-600 leading-relaxed", className)}
      {...props}
    />
  );
}

function DialogClose({
  onClick,
  className
}: {
  onClick?: () => void;
  className?: string;
}) {
  const { onOpenChange } = React.useContext(DialogContext);
  return (
    <button
      type="button"
      onClick={() => {
        onClick?.();
        onOpenChange(false);
      }}
      className={cn(
        "absolute right-4 top-4 rounded-full p-2 bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors focus:outline-none",
        className
      )}
    >
      <X className="h-4 w-4" />
      <span className="sr-only">Close</span>
    </button>
  );
}

export {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose
};
