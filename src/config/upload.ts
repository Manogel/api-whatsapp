import crypto from 'crypto';
import { diskStorage } from 'multer';
import { resolve } from 'path';

const tmpFolder = resolve(__dirname, '..', '..', '..', 'tmp');

const uploadConfig = {
  tmpFolder,
  uploadsFolder: resolve(tmpFolder, 'uploads'),
  multer: {
    storage: diskStorage({
      destination: tmpFolder,
      filename(_req, _file, cb) {
        const filehash = crypto.randomBytes(10).toString('hex');
        const filename = `${filehash}-${Date.now()}.png`;

        return cb(null, filename);
      },
    }),
  },
};

export default uploadConfig;
