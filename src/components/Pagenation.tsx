interface PagenationProps {
  startBlockPage: number;
  endBlockPage: number;
  currentPage: number;
  isFirst: boolean;
  isLast: boolean;
  onChangePage: (page: number) => void;
}
export default function Pagenation({
  startBlockPage,
  endBlockPage,
  currentPage,
  isFirst,
  isLast,
  onChangePage,
}: PagenationProps) {
  return (
    <div className="flex items-center justify-center mb-3 join">
      <button
        className={`join-item btn ${!isFirst ? "btn-disabled" : ""}`}
        onClick={() => onChangePage(startBlockPage - 1)}
      >
        «
      </button>
      {Array.from(
        { length: endBlockPage - startBlockPage + 1 },
        (_, index) => startBlockPage + index
      ).map((number) => {
        return (
          <button
            className={`join-item btn btn-md ${
              number === currentPage ? "btn-active" : ""
            }`}
            onClick={() => onChangePage(number)}
          >
            {number + 1}
          </button>
        );
      })}
      <button
        className={`join-item btn ${!isLast ? "btn-disabled" : ""}`}
        onClick={() => onChangePage(endBlockPage + 1)}
      >
        »
      </button>
    </div>
  );
}
