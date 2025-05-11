import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Create Cloudinary storage for Multer
const cloudinaryStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    public_id: (req, file) => {
      return `avatars/${file.originalname}_${new Date().toISOString()}`;
    },
  },
});

export { cloudinary, cloudinaryStorage };
