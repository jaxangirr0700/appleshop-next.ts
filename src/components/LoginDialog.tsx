import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useState } from "react";
import { LoginForm } from "./dialogs/CustomForm";
import { useAppSelector } from "@/store/hooks";

export function LoginDialog() {
  const [open, setOpen] = useState<boolean>(false);
  const userName = useAppSelector((state) => state.auth.user?.name);

  return (
    <>
      {userName ? (
        <Button
          variant={"default"}
          onClick={() => {
            setOpen(true);
          }}
        >
          {userName}
        </Button>
      ) : (
        <Button
          variant={"outline"}
          onClick={() => {
            setOpen(true);
          }}
        >
          Login
        </Button>
      )}
      <Dialog
        open={open}
        onOpenChange={(open) => {
          console.log(open);

          setOpen(open);
        }}
      >
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Login</DialogTitle>
          </DialogHeader>
          <LoginForm
            onClose={(open) => {
              setOpen(open!);
            }}
          />
        </DialogContent>
      </Dialog>
    </>
  );
}
