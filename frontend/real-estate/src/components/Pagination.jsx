import React from 'react';
import "../pagination.css";

const Pagination = ({ totalPages, currentPage, setCurrentPage }) => {
  const handleClick = (e, page) => {
    e.preventDefault();
    setCurrentPage(page);
  };

  return (
    <div>
      {Array.from({ length: Math.ceil(totalPages / 6)}, (_, i) => (
        <button
          key={`pagination-number${i + 1}`}
          className={`pagination-number ${
            i + 1 === currentPage ? 'active' : ''
          }`}
          onClick={e => handleClick(e, i + 1)}
        >
          {i + 1}
        </button>
      ))}
    </div>
  );
};

export default Pagination;