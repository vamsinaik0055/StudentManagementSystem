import { ChevronLeft, ChevronRight } from "lucide-react";

function Pagination({ page, totalPages, onPageChange }) {
  if (totalPages <= 1) return null;

  return (
    <div className="pagination">
      <button
        disabled={page === 0}
        onClick={() => onPageChange(page - 1)}
      >
        <ChevronLeft size={17} />
        Previous
      </button>

      <div className="page-numbers">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            className={page === index ? "active-page" : ""}
            onClick={() => onPageChange(index)}
          >
            {index + 1}
          </button>
        ))}
      </div>

      <button
        disabled={page === totalPages - 1}
        onClick={() => onPageChange(page + 1)}
      >
        Next
        <ChevronRight size={17} />
      </button>
    </div>
  );
}

export default Pagination;