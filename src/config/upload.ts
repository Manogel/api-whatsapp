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
        console.log(_file, 'ddddd', _req);
        const filehash = crypto.randomBytes(10).toString('hex');
        const fname = _file.originalname;
        const filename = `${filehash}-${Date.now()}.${fname.slice(
          ((fname.lastIndexOf('.') - 1) >>> 0) + 2,
        )}`;

        return cb(null, filename);
      },
    }),
  },
};

export default uploadConfig;
