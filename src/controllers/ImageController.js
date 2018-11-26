// @flow
import uuidv4 from 'uuid/v4';
import type { $Request as Request, $Response as Response } from 'express';
import ImageService from '../services/ImageService';
import logger from '../logger';

function formatIndex(elijaResponse) {
  return elijaResponse.results.map(image => ({
    id: image._id,
    url: image._source.file_url,
    tags: image._source.tags,
  }));
}

export default {
  async upload(req: Request, res: Response) {
    const id = uuidv4();
    const path = `${process.env.FILE_SERVER}/${req.file.filename}`;
    try {
      await ImageService.create(id, '', path);
    } catch (err) {
      logger.error(err);
      if (err.response !== undefined) {
        res.status(503).send({
          messages: ['Database Error!'],
          elija_response: {
            status: err.response.status,
            message: err.response.data,
          },
        });
      } else {
        res.status(503).send({
          messages: ['Database unavailable!'],
        });
      }
    }

    res.status(200).send({ id, path });
  },
  async index(req: Request, res: Response) {
    const searchTerm = req.params.search_term;
    let response;
    try {
      if (searchTerm === '' || searchTerm === undefined) {
        response = await ImageService.listAll();
      } else {
        response = await ImageService.find(req.params.search_term);
      }
    } catch (err) {
      if (err.response !== undefined) {
        return res.status(503).send({
          messages: ['Database Error!'],
          elija_response: {
            status: err.response.status,
            message: err.response.data,
          },
        });
      }
      return res.status(503).send({
        messages: ['Database unavailable!'],
      });
    }
    return res.status(200).send({
      images: formatIndex(response.data),
    });
  },
};
