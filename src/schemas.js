import { check } from 'express-validator/check';
import validateuuid from 'uuid-validate';

// These middleware arrays validate request bodies and params.
export default {
  postImages: [],
  getImages: [
    check('limit').optional().isNumeric().withMessage('must be numeric'),
    check('offset').optional().isNumeric().withMessage('must be numeric'),
  ],
  updateImages: [
    check('id').exists(),
    check('id').custom((id) => {
      if (!validateuuid(id, 4)) {
        throw new Error("uuid doesn't fit definition of uuid version 4");
      } else {
        return true;
      }
    },
    check('tags').isArray),
  ],
};
