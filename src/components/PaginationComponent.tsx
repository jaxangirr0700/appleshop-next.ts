import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
} from "@/components/ui/pagination";
import { useRouter } from "next/router";

type Props = {
  currentPage: number;
  totalPages: number;
  basePath: string;
  limit: number;
};

const PaginationComponent = ({
  currentPage,
  totalPages,
  basePath,
  limit,
}: Props) => {
  const router = useRouter();

  const goToPage = (page: number, newLimit = limit) => {
    router.push({
      pathname: basePath,
      query: {
        page,
        limit: newLimit,
      },
    });
  };

  const handleLimitChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newLimit = parseInt(e.target.value, 10);
    goToPage(1, newLimit);
  };

  return (
    <div className="flex flex-col items-center gap-4 mt-6">
      <Pagination className="font-mono font-bold">
        <PaginationContent>
          {currentPage > 1 && (
            <PaginationItem>
              <button onClick={() => goToPage(currentPage - 1)}>
                <PaginationPrevious />
              </button>
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
                  <button
                    onClick={() => goToPage(num)}
                    className={`px-2 ${
                      currentPage === num
                        ? "text-blue-600 underline"
                        : "hover:text-blue-500"
                    }`}
                  >
                    {num}
                  </button>
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
              <button onClick={() => goToPage(currentPage + 1)}>
                <PaginationNext />
              </button>
            </PaginationItem>
          )}
        </PaginationContent>
      </Pagination>

      <div className="flex items-center gap-2">
        <label className="text-sm font-medium">Sahifada ko‘rsatish:</label>
        <select
          onChange={handleLimitChange}
          value={limit}
          className="border px-3 py-1 rounded"
        >
          <option value="10">10 ta</option>
          <option value="20">20 ta</option>
          <option value="50">50 ta</option>
        </select>
      </div>
    </div>
  );
};

export default PaginationComponent;
