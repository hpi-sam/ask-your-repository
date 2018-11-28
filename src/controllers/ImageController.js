// @flow
import uuidv4 from 'uuid/v4';
import type { $Request as Request, $Response as Response, Middleware } from 'express';
import Boom from 'boom';
import ImageService from '../services/ImageService';
import ErrorBuilder from '../errors/ErrorBuilder';
import logger from '../logger';

function formatIndex(elijaResponse) {
  return elijaResponse.results.map(image => ({
    id: image._id,
    url: image._source.file_url,
    tags: image._source.tags,
  }));
}

function isTermEmpty(searchTerm) {
  return searchTerm === '' || searchTerm === undefined;
}

export default {
  async upload(req: Request, res: Response, next: Middleware) {
    const id = uuidv4();
    const path = `${process.env.FILE_SERVER}/${req.file.filename}`;
    try {
      await ImageService.create(id, '', path);
    } catch (err) {
      if (err.response !== undefined) {
        return next(ErrorBuilder.buildElijaError(err));
      }
      return next(new Boom('Database unavailable', { statusCode: 503 }));
    }

    return res.status(200).send({ id, path });
  },
  async index(req: Request, res: Response, next: Middleware) {
    const { searchTerm } = req.query;
    logger.info(`Search term is: ${searchTerm}`);
    let response;
    try {
      if (isTermEmpty(searchTerm)) {
        response = await ImageService.listAll();
      } else {
        response = await ImageService.find(searchTerm);
      }
    } catch (err) {
      if (err.response !== undefined) {
        return next(ErrorBuilder.buildElijaError(err));
      }
      return next(new Boom('Database unavailable', { statusCode: 503 }));
    }
    return res.status(200).send({
      images: formatIndex(response.data),
    });
  },
};
