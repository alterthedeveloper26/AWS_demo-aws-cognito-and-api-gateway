import { ColumnOptions } from 'typeorm';

export const sensitiveFields = [
  'password',
  'newPin',
  'currentPin',
  'token',
  'newPassword',
  'currentPassword',
  'documentNumber'
];

/**
 * 2C2P constants
 */
export const tctpConst = {
  regex: {
    alpha: '[A-Za-z]+',
    alphaNumeric: '[A-Za-z0-9]+',
    yyyyMMdd_HHmmss:
      '^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1]) (2[0-3]|[01][0-9]):[0-5][0-9]:[0-5][0-9]$',
    ddMMyyyy:
      // eslint-disable-next-line no-octal-escape
      '^(0[1-9]|[1-2][0-9]|31(?!(?:0[2469]|11))|30(?!02))(0[1-9]|1[0-2])([12]d{3})$'
  },
  entityColumnOptions: {
    amount: {
      type: 'decimal',
      precision: 14,
      scale: 2
    } as ColumnOptions
  }
};

export const priceEntityColumnOptions = {
  basePrice: {
    type: 'decimal',
    scale: 2
  } as ColumnOptions
};
/**
 * Pagination Typings & Enums
 */
export enum PaginationSortingTypeEnum {
  ASCENDING = 'ASC',
  DESCENDING = 'DESC'
}
