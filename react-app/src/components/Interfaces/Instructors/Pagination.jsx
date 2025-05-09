import styles from "../../../assets/css/Instructor/Courses.module.css";

const Pagination = ({ page, totalPages, onPageChange }) => {
  const renderPageNumbers = () => {
    const pages = [];
    const maxPagesToShow = 3;

    if (totalPages <= maxPagesToShow + 2) {
      // Nếu tổng số trang nhỏ hơn giới hạn thì hiển thị hết
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
      return pages;
    }

    // Luôn có trang đầu tiên
    pages.push(1);

    let startPage = Math.max(2, page - Math.floor(maxPagesToShow / 2));
    let endPage = Math.min(
      totalPages - 1,
      page + Math.floor(maxPagesToShow / 2)
    );

    // Điều chỉnh khi gần đầu hoặc gần cuối
    if (page <= Math.floor(maxPagesToShow / 2)) {
      startPage = 2;
      endPage = maxPagesToShow;
    } else if (page >= totalPages - Math.floor(maxPagesToShow / 2)) {
      endPage = totalPages - 1;
      startPage = totalPages - maxPagesToShow + 1;
    }

    // Thêm dấu "..." nếu cần
    if (startPage > 2) pages.push("...");

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    if (endPage < totalPages - 1) pages.push("...");

    // Luôn có trang cuối cùng
    pages.push(totalPages);

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
              <span
                key={`ellipsis-${index}`}
                className={styles.paginationEllipsis}
              >
                …
              </span>
            ) : (
              <button
                key={`page-${number}`}
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
