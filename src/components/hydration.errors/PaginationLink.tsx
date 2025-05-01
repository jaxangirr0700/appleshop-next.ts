import Link from "next/link";
import React from "react";

function PaginationLink({
  buildLink,
  num,
  currentPage,
}: {
  buildLink: (page: number) => string;
  num: number;
  currentPage: number;
}) {
  return (
    <Link
      href={buildLink(num)}
      className={`px-2 ${
        currentPage === num ? "text-blue-600 underline" : "hover:text-blue-500"
      }`}
    >
      {num}
    </Link>
  );
}

export default PaginationLink;
