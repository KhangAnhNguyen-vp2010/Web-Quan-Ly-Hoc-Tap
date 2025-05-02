import { useState, useEffect } from "react";

export function useDetailCourse() {
  const [search, setSearch] = useState({ text: "", debounce: "" });
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [tabIndex, setTabIndex] = useState(0);

  useEffect(() => {
    const handler = setTimeout(() => {
      setSearch((prev) => ({ ...prev, debounce: prev.text }));
    }, 300);

    return () => clearTimeout(handler);
  }, [search.text]);

  const resetSearchAndPage = () => {
    setPage(1);
    setSearch({ text: "", debounce: "" });
  };

  return {
    search,
    setSearch,
    page,
    setPage,
    totalPages,
    setTotalPages,
    tabIndex,
    setTabIndex,
    resetSearchAndPage,
  };
}
