import React, { ChangeEvent, FC, useState } from "react";
import styles from "./PaginationBlock.module.css";

type PropsType = {
  totalItemsCount: number;
  pagesRangeSize: number;
  currentPage: number;
  itemsCountPerPage: number;
  itemsName: string;
  onChangeCurrentPage: (page: number) => void;
  onChangeItemsCountPerPage: (itemsCountPerPage: number) => void;
};

export const PaginationBlock: FC<PropsType> = ({
  totalItemsCount,
  pagesRangeSize,
  currentPage,
  itemsCountPerPage,
  itemsName,
  onChangeCurrentPage,
  onChangeItemsCountPerPage,
}) => {
  const [pagesRangeNumber, setPagesRangeNumber] = useState(1);

  const pagesCount = Math.ceil(totalItemsCount / itemsCountPerPage);

  const pages = [];
  for (let i = 1; i <= pagesCount; i++) {
    pages.push(i);
  }

  const pagesRangesCount = Math.ceil(pagesCount / pagesRangeSize);
  const firstRangePageNumber = (pagesRangeNumber - 1) * pagesRangeSize + 1;
  const lastRangePageNumber = pagesRangeNumber * pagesRangeSize;

  const handleChangeCurrentPage = (page: number) => {
    onChangeCurrentPage(page);
  };

  const handleChangeItemsCountPerPage = (e: ChangeEvent<HTMLSelectElement>) => {
    onChangeItemsCountPerPage(+e.currentTarget.value);
    onChangeCurrentPage(1);
  };

  const handleDecreasePagesRangeNumber = () => {
    setPagesRangeNumber(pagesRangeNumber - 1);
  };

  const handleIncreasePagesRangeNumber = () => {
    setPagesRangeNumber(pagesRangeNumber + 1);
  };

  const handleDecreaseCurrentPage = () => {
    onChangeCurrentPage(currentPage - 1);
  };

  const handleIncreaseCurrentPage = () => {
    onChangeCurrentPage(currentPage + 1);
  };

  const handleSetFirstPageAsCurrent = () => {
    onChangeCurrentPage(1);
  };

  const handleSetLastPageAsCurrent = () => {
    onChangeCurrentPage(pagesCount);
  };

  return (
    <div className={styles.paginationBlock}>
      <div className={styles.pages}>
        <button disabled={pagesRangeNumber === 1} onClick={handleDecreasePagesRangeNumber}>
          &#11164;
        </button>
        <button disabled={currentPage === 1} onClick={handleDecreaseCurrentPage}>
          &#60;
        </button>
        {firstRangePageNumber !== 1 && (
          <div className={styles.firstPage}>
            <button
              className={currentPage === 1 ? `${styles.page} ${styles.selectedPage}` : styles.page}
              onClick={handleSetFirstPageAsCurrent}
            >
              {1}
            </button>
            <span>&#8230;</span>
          </div>
        )}
        {currentPage < firstRangePageNumber && currentPage !== 1 && (
          <div className={styles.firstPage}>
            <button className={`${styles.page} ${styles.selectedPage}`}>{currentPage}</button>
            <span>&#8230;</span>
          </div>
        )}
        {pages
          .filter((page) => page >= firstRangePageNumber && page <= lastRangePageNumber)
          .map((page) => (
            <button
              className={
                page === currentPage ? `${styles.page} ${styles.selectedPage}` : styles.page
              }
              onClick={() => handleChangeCurrentPage(page)}
            >
              {page}
            </button>
          ))}
        {currentPage > lastRangePageNumber && currentPage !== pagesCount && (
          <div className={styles.firstPage}>
            <span>&#8230;</span>
            <button className={`${styles.page} ${styles.selectedPage}`}>{currentPage}</button>
          </div>
        )}
        {lastRangePageNumber !== pagesCount && (
          <div className={styles.lastPage}>
            <span>&#8230;</span>
            <button
              className={
                currentPage === pagesCount ? `${styles.page} ${styles.selectedPage}` : styles.page
              }
              onClick={handleSetLastPageAsCurrent}
            >
              {pagesCount}
            </button>
          </div>
        )}
        <button disabled={currentPage === pagesCount} onClick={handleIncreaseCurrentPage}>
          &#62;
        </button>
        <button
          disabled={pagesRangeNumber === pagesRangesCount}
          onClick={handleIncreasePagesRangeNumber}
        >
          &#11166;
        </button>
      </div>
      <div>
        <span>Show </span>
        <select value={itemsCountPerPage} onChange={handleChangeItemsCountPerPage}>
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={25}>25</option>
          <option value={50}>50</option>
          <option value={100}>100</option>
        </select>
        <span> {itemsName} per page</span>
      </div>
    </div>
  );
};
