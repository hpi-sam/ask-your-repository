// @flow
import type { $Request as Request, $Response as Response } from 'express';
import ImageService from '../services/ImageService';

export default {
  async add(req: Request, res: Response) {
    try {
      const { id } = req.params;
      await ImageService.update(id, req.body.tags);
      res.status(200).send({ messages: ['Success!'] });
    } catch (err) {
      console.log(err);
      res.status(500).send({ messages: ['ERROR!'] });
    }
  },
};
