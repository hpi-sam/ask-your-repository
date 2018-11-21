import { check } from 'express-validator/check';
import validateuuid from 'uuid-validate';

// These middleware arrays validate request bodies and params.
export default {
  postImages: [],
  getImages: [],
  updateImages: [
    check('id').exists(),
    check('id').custom((id) => {
      if (!validateuuid(id, 4)) {
        throw new Error("uuid doesn't fit definition of uuid version 4");
      }
    },
    check('tags').isArray),
  ],
};
