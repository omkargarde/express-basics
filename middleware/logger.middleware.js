// logger.middleware.js
const loggerMiddleware = (req, res, next) => {
  req.time = new Date(Date.now()).toString(); // Assign timestamp to request object
  console.log(`${req.method} ${req.hostname} ${req.path} ${req.time}\n`);
  next();
};

export default loggerMiddleware;
