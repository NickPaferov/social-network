import React, { ChangeEvent, FC, useEffect, useState } from "react";
import styles from "./PaginationBlock.module.css";
import { useAppSelector } from "../../../bll/store";
import { selectRequestProcessingStatus } from "../../../utils/selectors";

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
  const isRequestProcessing = useAppSelector(selectRequestProcessingStatus);

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

  useEffect(() => {
    setPagesRangeNumber(Math.ceil(currentPage / pagesRangeSize));
  }, [currentPage, pagesRangeSize]);

  return (
    <div className={styles.paginationBlock}>
      <div className={styles.pages}>
        <button
          disabled={isRequestProcessing || pagesRangeNumber === 1}
          onClick={handleDecreasePagesRangeNumber}
        >
          &#11164;
        </button>
        <button
          disabled={isRequestProcessing || currentPage === 1}
          onClick={handleDecreaseCurrentPage}
        >
          &#60;
        </button>
        {pagesRangeNumber !== 1 && (
          <div className={styles.firstPage}>
            <button
              className={currentPage === 1 ? `${styles.page} ${styles.selectedPage}` : styles.page}
              disabled={isRequestProcessing}
              onClick={handleSetFirstPageAsCurrent}
            >
              {1}
            </button>
            {currentPage !== 2 && <span>&#8230;</span>}
          </div>
        )}
        {currentPage < firstRangePageNumber && currentPage !== 1 && (
          <div className={styles.firstPage}>
            <button
              className={`${styles.page} ${styles.selectedPage}`}
              disabled={isRequestProcessing}
            >
              {currentPage}
            </button>
            <span>&#8230;</span>
          </div>
        )}
        {pages
          .filter((page) => page >= firstRangePageNumber && page <= lastRangePageNumber)
          .map((page, index) => (
            <button
              key={index}
              className={
                page === currentPage ? `${styles.page} ${styles.selectedPage}` : styles.page
              }
              disabled={isRequestProcessing}
              onClick={() => handleChangeCurrentPage(page)}
            >
              {page}
            </button>
          ))}
        {currentPage > lastRangePageNumber && currentPage !== pagesCount && (
          <div className={styles.firstPage}>
            <span>&#8230;</span>
            <button
              className={`${styles.page} ${styles.selectedPage}`}
              disabled={isRequestProcessing}
            >
              {currentPage}
            </button>
          </div>
        )}
        {pagesRangeNumber !== pagesRangesCount && (
          <div className={styles.lastPage}>
            {currentPage !== pagesCount - 1 && <span>&#8230;</span>}
            <button
              className={
                currentPage === pagesCount ? `${styles.page} ${styles.selectedPage}` : styles.page
              }
              disabled={isRequestProcessing}
              onClick={handleSetLastPageAsCurrent}
            >
              {pagesCount}
            </button>
          </div>
        )}
        <button
          disabled={isRequestProcessing || currentPage === pagesCount}
          onClick={handleIncreaseCurrentPage}
        >
          &#62;
        </button>
        <button
          disabled={isRequestProcessing || pagesRangeNumber === pagesRangesCount}
          onClick={handleIncreasePagesRangeNumber}
        >
          &#11166;
        </button>
      </div>
      <div>
        <span>Show </span>
        <select
          disabled={isRequestProcessing}
          value={itemsCountPerPage}
          onChange={handleChangeItemsCountPerPage}
        >
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
