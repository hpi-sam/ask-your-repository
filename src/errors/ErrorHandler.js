import logger from '../logger';
// eslint disabled see: https://github.com/expressjs/generator/issues/78
export default function errorHandler(err, req, res, next) { // eslint-disable-line
  if (err.isServer) {
    logger.error(err);
  }
  res.status(err.output.statusCode).send({
    messages: [err.message].concat.apply([], err.data.messages), // merging arrays
    data: err.data,
  });
}
