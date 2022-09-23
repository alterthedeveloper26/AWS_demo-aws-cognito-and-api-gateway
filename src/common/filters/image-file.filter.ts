import { BadRequestException } from '@nestjs/common';

export interface FileFilter {
  fieldname: string;
  /** Name of the file on the user's computer */
  originalname: string;
  /** Encoding type of the file */
  encoding: string;
  /** Mime type of the file */
  mimetype: string;
  /** Size of the file in bytes */
  size: number;
  /** The folder to which the file has been saved (DiskStorage) */
  destination: string;
  /** The name of the file within the destination (DiskStorage) */
  filename: string;
  /** Location of the uploaded file (DiskStorage) */
  path: string;
  /** A Buffer of the entire file (MemoryStorage) */
  buffer: Buffer;
}

export const imageFileFilter = (
  _req,
  file: FileFilter,
  callback: (err: Error | null, acceptFile: boolean) => void
): void => {
  if (
    file.mimetype !== 'image/png' &&
    file.mimetype !== 'image/jpg' &&
    file.mimetype !== 'image/jpeg'
  ) {
    return callback(
      new BadRequestException({
        message: `File ${file.originalname} must be image!`
      }),
      false
    );
  }
  return callback(null, true);
};
