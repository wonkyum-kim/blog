export const generatePagination = (
  currentPage: number,
  totalPages: number,
  md: boolean
) => {
  if (!md) {
    let min = Math.floor(currentPage / 4);
    if (currentPage % 4 == 0) {
      min -= 1;
    }

    return Array.from(
      { length: Math.min(4, 4 - (4 * (min + 1) - totalPages)) },
      (_, i) => {
        return 4 * min + i + 1;
      }
    );
  }

  // 1,2,3,4 -> 1,2,3,4
  // 5,6,7,8 => 5,6,7,8

  // If the total number of pages is 7 or less,
  // display all pages without any ellipsis.
  if (totalPages <= 7 && md) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  // If the current page is among the first 3 pages,
  // show the first 3, an ellipsis, and the last 2 pages.
  if (currentPage <= 3) {
    return [1, 2, 3, '...', totalPages - 1, totalPages];
  }

  // If the current page is among the last 3 pages,
  // show the first 2, an ellipsis, and the last 3 pages.
  if (currentPage >= totalPages - 2) {
    return [1, 2, '...', totalPages - 2, totalPages - 1, totalPages];
  }

  // If the current page is somewhere in the middle,
  // show the first page, an ellipsis, the current page and its neighbors,
  // another ellipsis, and the last page.
  return [
    1,
    '...',
    currentPage - 1,
    currentPage,
    currentPage + 1,
    '...',
    totalPages,
  ];
};
