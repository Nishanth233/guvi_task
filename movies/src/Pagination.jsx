import React from "react";

const Pagination = ({ currentPage, totalPages, onPageChange }) => (
  <div className="flex justify-center space-x-2 my-4">
    {currentPage > 1 && (
      <button
        className="bg-blue-500 text-white px-3 py-1 rounded"
        onClick={() => onPageChange(currentPage - 1)}
      >
        Previous
      </button>
    )}
    {Array.from({ length: totalPages }, (_, index) => (
      <button
        key={index}
        className={`px-3 py-1 rounded ${
          index + 1 === currentPage
            ? "bg-blue-500 text-white"
            : "bg-gray-300 text-black"
        }`}
        onClick={() => onPageChange(index + 1)}
      >
        {index + 1}
      </button>
    ))}
    {currentPage < totalPages && (
      <button
        className="bg-blue-500 text-white px-3 py-1 rounded"
        onClick={() => onPageChange(currentPage + 1)}
      >
        Next
      </button>
    )}
  </div>
);

export default Pagination;
