import generateFilenameHash from '@utils/generateFilenameHash';
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
  uploadsFolder: uploadsFolderPath,
  multer: {
    storage: diskStorage({
      destination: uploadsFolderPath,
      filename(_req, _file, cb) {
        const ext = _file.originalname.split('.').pop();
        const filename = generateFilenameHash(ext);
        return cb(null, filename);
      },
    }),
  },
};

export default uploadConfig;
