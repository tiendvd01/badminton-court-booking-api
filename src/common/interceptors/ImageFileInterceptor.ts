import { BadRequestException } from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';

export const ImageFileInterceptor = (fieldName: string, isMultiple = false, maxCount = 5) => {
  const fileFilter = (req, file, cb) => {
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
      return cb(
        new BadRequestException('Only image files are allowed!'),
        false,
      );
    }
    cb(null, true);
  };

  const limits = {
    fileSize: 5 * 1024 * 1024, // 5MB
  };

  if (isMultiple) {
    return FilesInterceptor(fieldName, maxCount, { fileFilter, limits });
  } else {
    return FileInterceptor(fieldName, { fileFilter, limits });
  }
};
