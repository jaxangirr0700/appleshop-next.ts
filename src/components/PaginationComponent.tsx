import { Pagination } from "@/components/ui/pagination";
import dynamic from "next/dynamic";
const PaginContent = dynamic(() => import("./hydration.errors/PaginContent"), {
  ssr: false,
});

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
  const buildLink = (page: number) => {
    return `${basePath}?page=${page}&limit=${2}`;
  };

  return (
    <div className="flex flex-col items-center gap-4 mt-6">
      <Pagination className="font-mono font-bold">
        <PaginContent
          currentPage={currentPage}
          totalPages={totalPages}
          buildLink={buildLink}
        />
      </Pagination>

      <div className="flex items-center gap-2">
        <label className="text-sm font-medium">Sahifada ko{"'"}rsatish:</label>
        <select
          className="border px-3 py-1 rounded"
          value={limit}
          onChange={(e) => {
            const newLimit = parseInt(e.target.value, 10);
            window.location.href = `${basePath}?page=1&limit=${newLimit}`;
          }}
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
