import React from "react";
import { Button } from "../ui/button";

function ModalButton({ children }: { children: React.ReactNode }) {
  return (
    <Button variant={"outline"} className="flex flex-col items-center">
      {children}
    </Button>
  );
}

export default ModalButton;
