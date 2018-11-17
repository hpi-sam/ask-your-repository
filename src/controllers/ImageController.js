// @flow
import uuidv4 from 'uuid/v4';
import type { $Request as Request, $Response as Response } from 'express';
import ImageService from '../services/ImageService';

export default {
  async upload(req: Request, res: Response) {
    try {
      const id = uuidv4();
      const path = `${process.env.FILE_SERVER}/${req.file.filename}`;
      await ImageService.create(id, '', path);
      res.status(200).send({ id, path });
    } catch (err) {
      console.log(err);
      res.status(500).send({ messages: ['ERROR!'] });
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
      res.status(500).send({ messages: ['Internal Error'] });
    }
  },
};
