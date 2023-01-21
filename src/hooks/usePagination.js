import { useEffect, useState } from 'react';

const usePagination = (
  items,
  searchedValue,
  itemsPerPage = 100,
  pageNumberLimit = 5
) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageStart, setPageStart] = useState(0);
  const [pageEnd, setPageEnd] = useState(pageNumberLimit);

  const pages = [];
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = items.slice(indexOfFirstItem, indexOfLastItem);

  for (let i = 1; i <= Math.ceil(items.length / itemsPerPage); i++) {
    pages.push(i);
  }

  useEffect(() => {
    if (searchedValue !== '') {
      setCurrentPage(1);
      setPageStart(0);
      setPageEnd(pageNumberLimit);
    }
  }, [searchedValue]);

  const handleClickPage = (e) => {
    setCurrentPage(Number(e.target.id));
  };

  const handleClickPrev = () => {
    setCurrentPage(currentPage - 1);

    if ((currentPage - 1) % pageNumberLimit === 0) {
      setPageStart(pageStart - pageNumberLimit);
      setPageEnd(pageEnd - pageNumberLimit);
    }
  };

  const handleClickNext = () => {
    setCurrentPage(currentPage + 1);
    if (currentPage + 1 > pageEnd) {
      setPageStart(pageStart + pageNumberLimit);
      setPageEnd(pageEnd + pageNumberLimit);
    }
  };

  return {
    rowsTotal: items.length,
    pages,
    currentPage,
    pageStart,
    pageEnd,
    currentItems,
    onClickPage: handleClickPage,
    onClickPrev: handleClickPrev,
    onClickNext: handleClickNext,
  };
};

export default usePagination;
