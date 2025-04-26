import React from "react";
import styles from "../../../assets/css/Instructor/Courses.module.css";

const Pagination = ({ page, totalPages, onPageChange }) => {
  const renderPageNumbers = () => {
    const pages = [];
    const maxPagesToShow = 5;
    let startPage = Math.max(1, page - Math.floor(maxPagesToShow / 2));
    let endPage = startPage + maxPagesToShow - 1;

    if (endPage > totalPages) {
      endPage = totalPages;
      startPage = Math.max(1, endPage - maxPagesToShow + 1);
    }

    if (startPage > 1) pages.push(1, "...");
    for (let i = startPage; i <= endPage; i++) pages.push(i);
    if (endPage < totalPages) pages.push("...", totalPages);

    return pages;
  };

  return (
    <>
      {totalPages > 1 && (
        <div className={styles.pagination}>
          <button
            className={`${styles.paginationButton} ${styles.paginationArrow}`}
            onClick={() => onPageChange(1)}
            disabled={page === 1}
          >
            «
          </button>
          <button
            className={`${styles.paginationButton} ${styles.paginationArrow}`}
            onClick={() => onPageChange(Math.max(1, page - 1))}
            disabled={page === 1}
          >
            ‹
          </button>

          {renderPageNumbers().map((number, index) =>
            number === "..." ? (
              <span key={index} className={styles.paginationEllipsis}>
                …
              </span>
            ) : (
              <button
                key={number}
                className={`${styles.paginationButton} ${
                  number === page ? styles.paginationActive : ""
                }`}
                onClick={() => onPageChange(number)}
              >
                {number}
              </button>
            )
          )}

          <button
            className={`${styles.paginationButton} ${styles.paginationArrow}`}
            onClick={() => onPageChange(Math.min(totalPages, page + 1))}
            disabled={page === totalPages}
          >
            ›
          </button>
          <button
            className={`${styles.paginationButton} ${styles.paginationArrow}`}
            onClick={() => onPageChange(totalPages)}
            disabled={page === totalPages}
          >
            »
          </button>
        </div>
      )}
    </>
  );
};

export default Pagination;
