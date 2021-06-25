import crypto from 'crypto';

const generateFilenameHash = (ext: string) => {
  const filehash = crypto.randomBytes(10).toString('hex');
  const newFilename = `${Date.now()}-${filehash}.${ext}`;
  return newFilename;
};

export default generateFilenameHash;
