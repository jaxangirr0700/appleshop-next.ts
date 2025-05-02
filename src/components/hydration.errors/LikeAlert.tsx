import React from "react";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { Info } from "lucide-react";
import { ProductType } from "@/types";

function LikeAlert({ likeItems }: { likeItems: ProductType[] }) {
  return (
    likeItems.length === 0 && (
      <Alert variant="default">
        <Info className="h-5 w-5" />
        <AlertTitle>Sevimli mahsulotlar yo{"'"}q</AlertTitle>
        <AlertDescription>
          Hozircha siz hech qanday mahsulotni sevimlilarga qo{"'"}shmagansiz.
        </AlertDescription>
      </Alert>
    )
  );
}

export default LikeAlert;
