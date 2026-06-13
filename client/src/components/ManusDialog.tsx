import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
} from "@/components/ui/dialog";

interface LoginDialogProps {
  title?: string;
  logo?: string;
  open?: boolean;
  onLogin: () => void;
  onOpenChange?: (open: boolean) => void;
  onClose?: () => void;
}

/**
 * LoginDialog — Generic authentication prompt dialog.
 * Previously named ManusDialog; Manus branding has been removed.
 */
export function LoginDialog({
  title,
  logo,
  open = false,
  onLogin,
  onOpenChange,
  onClose,
}: LoginDialogProps) {
  const [internalOpen, setInternalOpen] = useState(open);

  useEffect(() => {
    if (!onOpenChange) {
      setInternalOpen(open);
    }
  }, [open, onOpenChange]);

  const handleOpenChange = (nextOpen: boolean) => {
    if (onOpenChange) {
      onOpenChange(nextOpen);
    } else {
      setInternalOpen(nextOpen);
    }
    if (!nextOpen) {
      onClose?.();
    }
  };

  return (
    <Dialog
      open={onOpenChange ? open : internalOpen}
      onOpenChange={handleOpenChange}
    >
      <DialogContent className="py-5 bg-card rounded-2xl w-[400px] shadow-xl border border-border p-0 gap-0 text-center">
        <div className="flex flex-col items-center gap-2 p-5 pt-12">
          {logo ? (
            <div className="w-16 h-16 bg-background rounded-xl border border-border flex items-center justify-center">
              <img src={logo} alt="App logo" className="w-10 h-10 rounded-md" />
            </div>
          ) : null}

          {title ? (
            <DialogTitle className="text-xl font-semibold text-foreground leading-[26px]">
              {title}
            </DialogTitle>
          ) : null}

          <DialogDescription className="text-sm text-muted-foreground">
            Please sign in to continue.
          </DialogDescription>
        </div>

        <DialogFooter className="px-5 py-5">
          <Button
            onClick={onLogin}
            className="w-full h-10 bg-gradient-to-r from-cyan-400 to-sky-500 hover:opacity-90 text-white rounded-lg text-sm font-medium"
          >
            Sign In
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

/** @deprecated Use LoginDialog instead */
export const ManusDialog = LoginDialog;
export default LoginDialog;
