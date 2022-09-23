import { Repository } from 'typeorm';

/**
 * Get all columns (including "{select: false}" ones)
 * Refer: https://github.com/typeorm/typeorm/issues/5816#issuecomment-787787989
 * @param repository
 * @returns all column keys
 */
export function getAllColumnKeys<T>(
  repository: Repository<T>,
  exclude: (keyof T)[] = null
): (keyof T)[] {
  return repository.metadata.columns
    .map((col) => col.propertyName as keyof T)
    .filter(
      (propertyName) => !exclude || !exclude.includes(propertyName)
    ) as (keyof T)[];
}
