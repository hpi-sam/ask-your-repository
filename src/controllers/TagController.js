// @flow
import type { $Request as Request, $Response as Response, Middleware } from 'express';
import { validationResult } from 'express-validator/check';
import Boom from 'boom';
import ImageService from '../services/ImageService';
import ErrorBuilder from '../errors/ErrorBuilder';

export default {
  async add(req: Request, res: Response, next: Middleware) {
    const validationErrors = validationResult(req);
    if (!validationErrors.isEmpty()) {
      return next(ErrorBuilder.buildValidationError(validationErrors));
    }
    const { id } = req.params;
    try {
      await ImageService.update(id, req.body.tags);
    } catch (err) {
      if (err.response !== undefined) {
        return next(ErrorBuilder.buildElijaError(err));
      }
      return next(new Boom('Database unavailable!', { statusCode: 503 }));
    }
    return res.status(200).send({ messages: ['Success!'] });
  },
};
