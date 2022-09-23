import { PaginationSortingTypeEnum } from '~common/constants/etc';

/**
 * Generate TypeORM pagination
 * @param object
 * @returns object
 */
export const generatePagination = ({
  sortKey,
  sortType,
  page,
  pageSize
}: {
  sortKey: string;
  sortType: PaginationSortingTypeEnum;
  page: number;
  pageSize: number;
}): {
  order: Record<string, unknown>;
  take: number;
  skip: number;
} => ({
  order: sortKey
    ? {
        [sortKey]: sortType
      }
    : null,
  take: pageSize,
  skip: page * pageSize - pageSize
});
