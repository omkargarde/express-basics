import { APP_ERROR_MESSAGE } from "../constants/constants.js";
function errorMiddleware(error, request, response, next) {
  const status = error.status ? error.status : 500;
  const message =
    status === 500 ? APP_ERROR_MESSAGE.serverError : error.message;
  const errors = error.error;
  response.status(status).send({ status, message, error: errors });
  next();
}

export default errorMiddleware;
