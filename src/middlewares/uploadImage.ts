import { v2 as cloudinary } from 'cloudinary';
import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import { httpError } from 'helpers/httpError';
import type { IRequest } from '../types';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

const avatarStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: (req: IRequest) => {
    return {
      folder: 'avatars',
      allowedFormats: ['jpg', 'jpeg', 'png'],
      public_id: `${req.user._id}`,
      transformation: [
        { width: 250, height: 250, crop: 'limit' },
        { quality: 100 },
        { fetch_format: 'auto' },
        { format: 'jpg', filename: `${req.user._id}` },
      ],
    };
  },
});

// const recipeStorage = new CloudinaryStorage({
//   cloudinary: cloudinary,
//   params: {
//     folder: 'recipes',
//     allowedFormats: ['jpg', 'png'],
//     transformation: [{ width: 600, height: 600, crop: 'limit' }],
//   },
// });

const fileFilter = (_req, file, cb) => {
  const [type] = file.mimetype.split('/');

  if (type !== 'image') {
    return cb(httpError(400, 'You can upload only the image file'));
  }

  cb(null, true);
};

// Avatar multer
export const avatarImage = multer({
  storage: avatarStorage,
  fileFilter,
});

// Recipe multer
// const recipeImage = multer({
//   storage: recipeStorage,
//   fileFilter,
// });
