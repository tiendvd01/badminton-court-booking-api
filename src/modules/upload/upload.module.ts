import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { UploadController } from './upload.controller'; 
import { cloudinaryStorage } from 'configs/cloudinary';

@Module({
  imports: [
    MulterModule.register({
      storage: cloudinaryStorage,
    }),
  ],
  controllers: [UploadController],
  providers: [],
  exports: [],
})
export class UploadModule {}