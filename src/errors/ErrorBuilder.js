import Boom from 'boom';

export default {
  buildValidationError(validationErrors) {
    return new Boom('Validation Error!', {
      statusCode: 422,
      data: {
        messages: validationErrors.array().map(err => err.msg),
        errors: validationErrors.array(),
      },
    });
  },
  buildElijaError(err) {
    return Boom.boomify(err, {
      statusCode: 503,
      message: 'Database Error',
      data: {
        elija_response: {
          status: err.response.status,
          message: err.response.data,
        },
      },
    });
  },
};
