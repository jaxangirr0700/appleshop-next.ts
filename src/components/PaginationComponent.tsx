import { Pagination } from "@/components/ui/pagination";
import dynamic from "next/dynamic";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
const PagContent = dynamic(
  () => import("../components/hydration.errors/PagContent"),
  {
    ssr: true,
  }
);

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
        <PagContent
          currentPage={currentPage}
          totalPages={totalPages}
          buildLink={buildLink}
        />
      </Pagination>

      <div className="flex items-center gap-2">
        <label className="text-sm font-medium">Sahifada ko{"'"}rsatish:</label>
        <Select
          defaultValue={limit.toString()}
          onValueChange={(value) => {
            const newLimit = parseInt(value, 10);
            window.location.href = `${basePath}?page=1&limit=${newLimit}`;
          }}
        >
          <SelectTrigger>
            <SelectValue placeholder={`Ko‘rsatish: ${limit}`} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="10">10 ta</SelectItem>
            <SelectItem value="20">20 ta</SelectItem>
            <SelectItem value="50">50 ta</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default PaginationComponent;
