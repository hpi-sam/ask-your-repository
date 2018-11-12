// @flow
import uuidv4 from 'uuid/v4';
import type { $Request as Request, $Response as Response } from 'express';

export default {
  upload(req: Request, res: Response) {
    res.status(200).send({
      id: uuidv4(),
      path: `${process.env.FILE_SERVER}/${req.file.path}`,
    });
  },
};
