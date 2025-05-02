import React from "react";
import { Button } from "../ui/button";
import { HeartIcon } from "lucide-react";
import { LikeItemType } from "@/store/slices/like.slice";

function NavbarLikeButton({ likeItems }: { likeItems: LikeItemType[] }) {
  return (
    <Button
      variant="outline"
      className="relative flex items-center justify-center gap-1 text-sm"
    >
      <HeartIcon className="w-4 h-4" />
      <span className="hidden sm:inline"></span>
      {likeItems.length > 0 && (
        <span className="bg-slate-900 text-white px-2 py-1 rounded-full text-xs absolute -top-3 -right-3">
          {likeItems.length}
        </span>
      )}
    </Button>
  );
}

export default NavbarLikeButton;
