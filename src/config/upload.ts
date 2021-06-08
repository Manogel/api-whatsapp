import crypto from 'crypto';
import { diskStorage } from 'multer';
import { resolve } from 'path';

const uploadsFolderPath = resolve(
  __dirname,
  '..',
  '..',
  '..',
  'tmp',
  'uploads',
);

const uploadConfig = {
  uploadsFolderPath,
  uploadsFolder: resolve(uploadsFolderPath, 'uploads'),
  multer: {
    storage: diskStorage({
      destination: uploadsFolderPath,
      filename(_req, _file, cb) {
        const filehash = crypto.randomBytes(10).toString('hex');
        const ext = _file.originalname.split('.').pop();
        const filename = `${filehash}-${Date.now()}.${ext}`;

        return cb(null, filename);
      },
    }),
  },
};

export default uploadConfig;
