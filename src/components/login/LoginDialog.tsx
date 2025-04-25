"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { logout } from "@/store/slices/auth.slice";
import { useRouter } from "next/router";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { LoginForm } from "./LoginForm";

export default function LoginDialog() {
  const [open, setOpen] = useState<boolean>(false);
  const user = useAppSelector((state) => state.auth.user);
  const dispatch = useAppDispatch();
  const router = useRouter();

  return (
    <>
      {user ? (
        <>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="default" className="cursor-pointer">
                <p>{user?.name}</p>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel className="font-bold">
                <p className="mb-2 text-xl "> Sozlamalar</p>{" "}
                <p> Ismi: {user?.name}</p> <p> Roli: {user?.role}</p>
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
        </>
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
