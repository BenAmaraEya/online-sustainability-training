import { Injectable } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Injectable()
export class MulterConfigService {
  static multerOptions() {
    return {
      storage: diskStorage({
        destination: './uploads/formation-images', // Folder to save the images
        filename: (req, file, cb) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
          cb(null, `${uniqueSuffix}${extname(file.originalname)}`); // Generate unique filename
        },
      }),
      fileFilter: (req, file, cb) => {
        if (file.mimetype.match(/\/(jpg|jpeg|png)$/)) {
          cb(null, true); // Accept file
        } else {
          cb(new Error('Only image files are allowed!'), false); // Reject non-image files
        }
      },
      limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB file size limit
    };
  }
}
