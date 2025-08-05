import React from "react";

interface PaginationBarProps {
  current: number;
  total: number;
  onPageChange: (page: number) => void;
}

export default function PaginationBar({ current, total, onPageChange }: PaginationBarProps) {
  if (total <= 1) return null;

  // Show up to 5 pages around the current page
  const pageNumbers = [];
  for (
    let i = Math.max(1, current - 2);
    i <= Math.min(total, current + 2);
    i++
  ) {
    pageNumbers.push(i);
  }

  return (
    <nav className="inline-flex items-center gap-1 bg-white p-2 rounded-xl shadow">
      <button
        className={`px-3 py-2 rounded-lg text-gray-600 ${current === 1 ? "opacity-40 cursor-not-allowed" : "hover:bg-gray-100"}`}
        onClick={() => current > 1 && onPageChange(current - 1)}
        aria-label="Previous page"
        disabled={current === 1}
        type="button"
      >
        &lt;
      </button>
      {pageNumbers.map(num => (
        <button
          key={num}
          className={`px-4 py-2 rounded-lg font-semibold border transition 
            ${num === current
              ? "bg-blue-600 border-blue-600 text-white"
              : "bg-white border-gray-300 text-gray-900 hover:bg-gray-100"}
          `}
          onClick={() => onPageChange(num)}
          aria-current={num === current ? "page" : undefined}
          type="button"
        >
          {num}
        </button>
      ))}
      <button
        className={`px-3 py-2 rounded-lg text-gray-600 ${current === total ? "opacity-40 cursor-not-allowed" : "hover:bg-gray-100"}`}
        onClick={() => current < total && onPageChange(current + 1)}
        aria-label="Next page"
        disabled={current === total}
        type="button"
      >
        &gt;
      </button>
    </nav>
  );
}

