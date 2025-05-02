import dynamic from "next/dynamic";
import Link from "next/link";
import { Button } from "../ui/button";
import {
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
} from "../ui/pagination";
const PaginationLink = dynamic(
  () => import("../hydration.errors/PaginationLink"),
  {
    ssr: false,
  }
);

function PagContent({
  currentPage,
  buildLink,
  totalPages,
}: {
  currentPage: number;
  buildLink: (page: number) => string;
  totalPages: number;
}) {
  return (
    <PaginationContent>
      {currentPage > 1 && (
        <PaginationItem>
          <Link href={buildLink(currentPage - 1)}>
            <Button variant={"outline"}>{"<"}Prew </Button>{" "}
          </Link>
        </PaginationItem>
      )}

      {[...Array(totalPages)].map((_, index) => {
        const num = index + 1;

        if (
          num === 1 ||
          num === currentPage - 1 ||
          num === currentPage ||
          num === currentPage + 1 ||
          num === totalPages
        ) {
          return (
            <PaginationItem key={num}>
              <PaginationLink
                currentPage={currentPage}
                num={num}
                buildLink={buildLink}
              />
            </PaginationItem>
          );
        }

        if (
          (num === 2 && currentPage > 3) ||
          (num === totalPages - 1 && currentPage < totalPages - 2)
        ) {
          return (
            <PaginationItem key={`ellipsis-${num}`}>
              <PaginationEllipsis />
            </PaginationItem>
          );
        }

        return null;
      })}

      {currentPage < totalPages && (
        <PaginationItem>
          <Link href={buildLink(currentPage + 1)}>
            <Button variant={"outline"}>Next {">"}</Button>{" "}
          </Link>
        </PaginationItem>
      )}
    </PaginationContent>
  );
}

export default PagContent;
