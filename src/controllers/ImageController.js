// @flow
import uuidv4 from 'uuid/v4';
import type { $Request as Request, $Response as Response } from 'express';
import ImageService from '../services/ImageService';
import logger from '../logger';

export default {
  async upload(req: Request, res: Response) {
    const id = uuidv4();
    const path = `${process.env.FILE_SERVER}/${req.file.filename}`;
    try {
      await ImageService.create(id, '', path);
      res.status(200).send({ id, path });
    } catch (err) {
      logger.error(err);
      if (err.response !== undefined) {
        res.status(503).send({
          messages: ['Database Error!'],
          elija_response: {
            status: err.response.status,
            message: err.response.body,
          },
        });
      } else {
        res.status(500).send({
          messages: ['Internal Error!'],
        });
      }
    }
  },
  async index(req: Request, res: Response) {
    try {
      const searchTerm = req.params.search_term;
      let response;
      if (searchTerm === '' || searchTerm === undefined) {
        response = await ImageService.listAll();
      } else {
        response = await ImageService.find(req.params.search_term);
      }
      res.status(200).send({
        images: response.body,
      });
    } catch (err) {
      logger.error(err);
      if (err.response !== undefined) {
        res.status(503).send({
          messages: ['Database Error!'],
          elija_response: {
            status: err.response.status,
            message: err.response.body,
          },
        });
      } else {
        res.status(500).send({
          messages: ['Internal Error!'],
        });
      }
    }
  },
};
