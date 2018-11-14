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
  index(req: Request, res: Response) {
    res.status(200).send({
      images: [
        {
          id: '1',
          url: 'https://preview.redd.it/6uv0qqwsi5y11.png?width=960&crop=smart&auto=webp&s=191d8414edb4dd089e923eff4c40ac6f56bb8163',
        },
      ],
    });
  },
};
