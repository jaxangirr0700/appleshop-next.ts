"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { LoginForm } from "./LoginForm";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { logout } from "@/store/slices/auth.slice";
import { useRouter } from "next/router";

export default function LoginDialog() {
  const [open, setOpen] = useState<boolean>(false);
  const [isClient, setIsClient] = useState<boolean>(false);
  const user = useAppSelector((state) => state.auth.user);
  const dispatch = useAppDispatch();
  const router = useRouter();

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <>
      {isClient && user ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="default" className="cursor-pointer">
              <p>{user?.email}</p>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuLabel className="font-bold">
              <p className="mb-2 text-xl "> Sozlamalar</p>{" "}
              <p> Ismi: {user.name}</p> <p> Roli: {user.role}</p>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuCheckboxItem
              onClick={() => {
                router.push("/user");
              }}
              className="cursor-pointer"
            >
              Shaxsiy kabinetim
            </DropdownMenuCheckboxItem>{" "}
            <DropdownMenuCheckboxItem
              onClick={() => {
                router.push("/user");
              }}
              className="cursor-pointer"
            >
              Maning to{"'"}lo{"'"}vlarim
            </DropdownMenuCheckboxItem>{" "}
            <DropdownMenuCheckboxItem
              onClick={() => {
                router.push("/user");
              }}
              className="cursor-pointer"
            >
              to{"'"}lo{"'"}vlar tarixi
            </DropdownMenuCheckboxItem>{" "}
            <DropdownMenuCheckboxItem
              onClick={() => {
                dispatch(logout());
                router.push("/");
              }}
              className="cursor-pointer"
            >
              Chiqish
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
