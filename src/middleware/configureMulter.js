// @flow
import multer from 'multer';
import mkdirp from 'mkdirp';

function configureMulter() {
  const storage = multer.diskStorage({
    destination: (req, file, callback) => {
      const { UPLOAD_PATH } = process.env;
      // configuring the path as recommended in issue:
      // https://github.com/expressjs/multer/issues/287
      mkdirp(UPLOAD_PATH, error => callback(error, UPLOAD_PATH));
    },
    filename: (req, file, callback) => {
      callback(null, `${Date.now()}_${file.originalname}`);
    },
  });

  return multer({ storage });
}

export default configureMulter;
