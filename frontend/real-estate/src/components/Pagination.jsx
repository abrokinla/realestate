import React from "react";

const Pagination = ({ totalPages, currentPage, setCurrentPage }) => {
    const handleClick = (e, page) => {
        e.preventDefault();
        setCurrentPage(page);
      };
      if(totalPages <= 5) {
        return (
        <div>
            {Array.from({ length: totalPages }, (_, i) => (
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
    } else {
      return (
        <div>
            {Array.from({ length: Math.ceil(totalPages) }, (_, i) => (
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
    );}
};

export default Pagination;