import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useEffect, useState } from "react";
import { useAppDispatch } from "@/store/hooks";
import { LoginForm } from "./LoginForm";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { logout, UserType } from "@/store/slices/auth.slice";

export function LoginDialog() {
  const [open, setOpen] = useState<boolean>(false);
  const [authState, setAuthState] = useState<UserType>();
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (typeof window !== "undefined") {
      const lsAuth = localStorage.getItem("auth");
      if (lsAuth) {
        try {
          const auth = JSON.parse(lsAuth);
          setAuthState(auth.user);
        } catch (error) {
          console.error(error);
        }
      }
    }
  }, []);

  return (
    <>
      {authState ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="default" className="cursor-pointer">
              {authState.name}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuLabel>Sozlamalar</DropdownMenuLabel>
            <DropdownMenuSeparator />

            <DropdownMenuCheckboxItem
              onClick={() => {
                dispatch(logout());
              }}
              className="cursor-pointer"
            >
              Logout
            </DropdownMenuCheckboxItem>
          </DropdownMenuContent>
        </DropdownMenu>
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
