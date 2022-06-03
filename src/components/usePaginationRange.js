import React, { useMemo } from "react";
export const DOTS = "...";

const range = (start, end) => {
  let length = end - start + 1;

  return Array.from({ length }, (_, index) => index + start);
};

const usePaginationRange = (totalPageCount) => {
  const paginationRange = useMemo(() => {
    const totalPageNumbers =
      totalPageCount.buttonConst + 2 + totalPageCount.siblingCount;

    if (totalPageNumbers >= totalPageCount.totalPageCount) {
      return range(1, totalPageCount.totalPageCount);
    }

    const leftSiblingIndex = Math.max(
      totalPageCount.currentPage - totalPageCount.siblingCount,
      1
    );
    const rightSiblingIndex = Math.min(
      totalPageCount.currentPage + totalPageCount.siblingCount,
      totalPageCount.totalPageCount
    );

    const shouldShowLeftDots = leftSiblingIndex > 2;
    const shouldShowRightDots =
      rightSiblingIndex <= totalPageCount.totalPageCount - 2;

    const firstPageIndex = 1;
    const lastPageIndex = totalPageCount.totalPageCount;
    if (!shouldShowLeftDots && shouldShowRightDots) {
      let leftItemCount = 3 + 2 * totalPageCount.siblingCount;
      let leftRange = range(1, leftItemCount);

      return [...leftRange, DOTS, totalPageCount.totalPageCount];
    }

    if (shouldShowLeftDots && !shouldShowRightDots) {
      let rightItemCount = 3 + 2 * totalPageCount.siblingCount;
      let rightRange = range(
        totalPageCount.totalPageCount - rightItemCount + 1,
        totalPageCount.totalPageCount
      );

      return [firstPageIndex, DOTS, ...rightRange];
    }

    if (shouldShowLeftDots && shouldShowRightDots) {
      let middleRange = range(leftSiblingIndex, rightSiblingIndex);
      return [firstPageIndex, DOTS, ...middleRange, DOTS, lastPageIndex];
    }
  }, [
    totalPageCount.totalPageCount,
    totalPageCount.siblingCount,
    totalPageCount.currentPage,
    totalPageCount.buttonConst,
  ]);
  return paginationRange;
};

export default usePaginationRange;
